from app.schemas.planner import PlannerRequest
from app.services.destination_places_service import plan_places
from app.services.route_service import analyze_route


ACTIVITY_POOLS = {
    "adventure": {
        "morning": ["Start with a guided trail ride around {destination}", "Take an early mountain pass route near {destination}", "Try a beginner-friendly adventure activity in {destination}"],
        "afternoon": ["Visit a high-altitude viewpoint and nearby villages in {destination}", "Explore rugged backroads and scenic stops around {destination}", "Spend time at an adventure base camp near {destination}"],
        "evening": ["Unwind with a bonfire-style local dinner in {destination}", "Review the route and prepare for the next day's ride in {destination}", "Relax at a traveler cafe and swap route stories in {destination}"],
    },
    "nature": {
        "morning": ["Watch sunrise over the natural landscapes of {destination}", "Walk through a quiet valley or lakeside trail in {destination}", "Visit a peaceful nature viewpoint in {destination}"],
        "afternoon": ["Spend the afternoon by a lake, meadow or river near {destination}", "Explore scenic villages surrounded by nature in {destination}", "Take a slow landscape drive through {destination}"],
        "evening": ["Enjoy sunset from a calm viewpoint in {destination}", "Have dinner with views of the surrounding landscape in {destination}", "Take a relaxed evening walk under clear skies in {destination}"],
    },
    "photography": {
        "morning": ["Capture golden-hour shots around {destination}", "Photograph local streets and morning life in {destination}", "Visit a viewpoint for wide landscape photos of {destination}"],
        "afternoon": ["Shoot architecture, markets and road scenes in {destination}", "Find colorful village frames and portrait spots in {destination}", "Visit a scenic landmark for afternoon photography in {destination}"],
        "evening": ["Capture sunset and blue-hour scenes in {destination}", "Try night-sky or low-light photography around {destination}", "Review photos over dinner in {destination}"],
    },
    "history": {
        "morning": ["Visit an important monastery, fort or heritage site in {destination}", "Explore an old settlement and its stories in {destination}", "Start with a local cultural landmark in {destination}"],
        "afternoon": ["Tour a museum or heritage center in {destination}", "Meet local guides and learn regional history in {destination}", "Visit traditional craft or cultural spaces in {destination}"],
        "evening": ["Attend a cultural performance or local gathering in {destination}", "Try a traditional dinner while learning local stories in {destination}", "Walk through a historic market area in {destination}"],
    },
    "food": {
        "morning": ["Begin with a local breakfast crawl in {destination}", "Visit a morning market for regional flavors in {destination}", "Try a popular local tea and snack spot in {destination}"],
        "afternoon": ["Have lunch at a well-known local eatery in {destination}", "Join a simple cooking or tasting experience in {destination}", "Explore cafes and regional dishes around {destination}"],
        "evening": ["End with a local dinner trail in {destination}", "Try street food or homestyle dishes in {destination}", "Visit a relaxed cafe for dessert and tea in {destination}"],
    },
    "road trips": {
        "morning": ["Start with a scenic road stretch around {destination}", "Take an early drive through a memorable route near {destination}", "Begin with roadside viewpoints and short stops in {destination}"],
        "afternoon": ["Continue through local routes with lunch stops in {destination}", "Visit viewpoints and roadside villages around {destination}", "Spend the afternoon on an easy loop route near {destination}"],
        "evening": ["Park up for sunset and dinner in {destination}", "Review the route and rest after the day's travel in {destination}", "End with a relaxed roadside cafe stop in {destination}"],
    },
    "nightlife": {
        "morning": ["Start slow with a relaxed neighborhood walk in {destination}", "Visit a popular daytime hangout in {destination}", "Explore local cafes and easy sights in {destination}"],
        "afternoon": ["Keep the afternoon light with markets and casual food in {destination}", "Explore social spots and local shopping areas in {destination}", "Rest before an active evening in {destination}"],
        "evening": ["Visit a lively local cafe or music spot in {destination}", "Spend the evening at a popular hangout area in {destination}", "Try a relaxed dinner spot with a good evening atmosphere in {destination}"],
    },
    "general": {
        "morning": ["Explore a signature area of {destination}", "Start with a relaxed orientation walk in {destination}", "Visit a popular local landmark in {destination}", "Begin with a slow-paced local discovery walk in {destination}"],
        "afternoon": ["Enjoy lunch and sightseeing in a different part of {destination}", "Take a scenic route with short stops around {destination}", "Visit local markets and viewpoints in {destination}", "Spend time at an easy cultural or nature stop in {destination}"],
        "evening": ["Enjoy local food and a relaxed evening in {destination}", "Watch sunset from a nearby viewpoint in {destination}", "Spend the evening shopping and resting in {destination}", "Close the day with a quiet dinner and short walk in {destination}"],
    },
}

TRANSPORT_ACTIVITIES = {
    "bike": ["Use the bike for flexible short hops between viewpoints in {destination}", "Keep the route light today with fuel, rest and photo stops around {destination}", "Plan a controlled ride with buffer time for terrain and weather in {destination}"],
    "car": ["Use the car for a comfortable scenic loop around {destination}", "Plan a relaxed drive with stops for food and viewpoints in {destination}", "Keep extra time for parking, breaks and local detours in {destination}"],
    "public transport": ["Use local transport for the easiest connected sights in {destination}", "Keep the day centered around accessible routes and walkable areas in {destination}", "Plan around public transport timings and nearby food stops in {destination}"],
}

DESTINATION_COST_FACTORS = {"ladakh": 1.2, "leh": 1.2, "spiti": 1.18, "andaman": 1.18, "goa": 1.05, "rishikesh": 0.95}
TRANSPORT_COST_FACTORS = {"bike": 0.9, "car": 1.15, "public transport": 0.75}
INTEREST_COST_FACTORS = {"adventure": 1.12, "photography": 1.04, "food": 1.08, "road trips": 1.06, "nightlife": 1.05}


def _clean_interests(interests):
    if not interests:
        return []
    cleaned = []
    for interest in interests:
        if isinstance(interest, str) and interest.strip():
            cleaned.append(interest.strip())
    return list(dict.fromkeys(cleaned))


def _activity_options(interests, time_of_day):
    options = []
    for interest in interests:
        pool = ACTIVITY_POOLS.get(interest.lower())
        if pool:
            options.extend(pool[time_of_day])
    options.extend(ACTIVITY_POOLS["general"][time_of_day])
    return list(dict.fromkeys(options))


def _transport_options(transport):
    return TRANSPORT_ACTIVITIES.get(transport.lower(), ["Keep travel time realistic between stops in {destination}", "Use the most practical local transport option in {destination}", "Leave buffer time for transfers and rest in {destination}"])


def _estimate_cost(destination, days, budget, transport, interests):
    base_daily_cost = 2600
    destination_factor = DESTINATION_COST_FACTORS.get(destination.lower(), 1)
    transport_factor = TRANSPORT_COST_FACTORS.get(transport.lower(), 1)
    interest_factor = 1
    for interest in interests:
        interest_factor *= INTEREST_COST_FACTORS.get(interest.lower(), 1)
    planned_cost = base_daily_cost * days * destination_factor * transport_factor * interest_factor
    if budget <= 0:
        return round(planned_cost, 2)
    lower_bound = budget * 0.55
    upper_bound = budget * 1.05
    return round(max(lower_bound, min(planned_cost, upper_bound)), 2)


def _generic_day_entry(day, destination, transport_note):
    return {"day": day, "places": [], "morning": f"Explore {destination}", "afternoon": f"Lunch and sightseeing in {destination}", "evening": f"Local food, shopping and relaxation in {destination}", "transport_note": transport_note, "route_distance_km": 0.0, "route_travel_time_hours": 0.0}


def _place_day_entry(day, destination, places, transport_note):
    if not places:
        return _generic_day_entry(day, destination, transport_note)
    first_place = places[0]
    second_place = places[1] if len(places) > 1 else None
    route_summary = analyze_route(destination, [place.name for place in places])
    morning = f"Start at {first_place.name}. {first_place.description}" if first_place.description else f"Start at {first_place.name}."
    if second_place:
        afternoon = f"Continue to {second_place.name}. {second_place.description}" if second_place.description else f"Continue to {second_place.name}."
        evening = f"Relax in {destination} after visiting {first_place.name} and {second_place.name}."
    else:
        afternoon = f"Spend the afternoon around {first_place.name}."
        evening = f"Relax in {destination} after visiting {first_place.name}."
    return {"day": day, "places": [place.name for place in places], "morning": morning, "afternoon": afternoon, "evening": evening, "transport_note": transport_note, "route_distance_km": route_summary.total_distance_km, "route_travel_time_hours": route_summary.total_travel_time_hours}


def generate_trip_plan(request: PlannerRequest):
    itinerary = []
    interests = _clean_interests(request.interests)
    transport_options = _transport_options(request.transport)
    places_plan = plan_places(request.destination, interests, request.days, 2)
    places_by_day = {day_plan.day: day_plan.places for day_plan in places_plan.itinerary_places}
    supported_destination = any(day_plan.places for day_plan in places_plan.itinerary_places)

    for day in range(1, request.days + 1):
        transport_note = transport_options[(day - 1) % len(transport_options)].format(destination=request.destination)
        if supported_destination:
            itinerary.append(_place_day_entry(day, request.destination, places_by_day.get(day, []), transport_note))
        else:
            itinerary.append(_generic_day_entry(day, request.destination, transport_note))

    return {
        "source": request.source,
        "destination": request.destination,
        "trip_name": f"{request.source} → {request.destination} Trip",
        "estimated_cost": _estimate_cost(request.destination, request.days, request.budget, request.transport, interests),
        "itinerary": itinerary,
    }
