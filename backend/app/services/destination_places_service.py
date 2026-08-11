from app.schemas.destination_places import (
    DestinationPlace,
    DestinationPlacesResponse,
    DestinationPlacesPlanResponse,
    DestinationPlacesDayPlan,
)


DESTINATION_PLACES = {
    "ladakh": {
        "destination": "Ladakh",
        "places": [
            {
                "name": "Leh Palace",
                "categories": ["History", "Photography"],
                "description": "A historic royal palace overlooking Leh with wide views of the town and mountains.",
                "visit_duration_hours": 2.0,
            },
            {
                "name": "Shanti Stupa",
                "categories": ["Sunrise", "Photography", "Nature"],
                "description": "A white-domed Buddhist stupa known for sunrise, sunset, and panoramic views over Leh.",
                "visit_duration_hours": 1.5,
            },
            {
                "name": "Pangong Lake",
                "categories": ["Nature", "Photography", "Road Trips"],
                "description": "A high-altitude lake famous for shifting blue tones and a scenic drive from Leh.",
                "visit_duration_hours": 4.0,
            },
            {
                "name": "Nubra Valley",
                "categories": ["Adventure", "Nature", "Road Trips"],
                "description": "A dramatic valley with dunes, villages, and mountain landscapes north of Leh.",
                "visit_duration_hours": 6.0,
            },
            {
                "name": "Khardung La",
                "categories": ["Adventure", "Road Trips", "Photography"],
                "description": "One of the most iconic high mountain passes in the region, popular for road travel and views.",
                "visit_duration_hours": 2.5,
            },
            {
                "name": "Leh Market",
                "categories": ["Food", "Photography", "Culture"],
                "description": "The main market area in Leh for local food, souvenirs, and everyday town life.",
                "visit_duration_hours": 2.0,
            },
        ],
    },
    "jaipur": {
        "destination": "Jaipur",
        "places": [
            {
                "name": "Amber Fort",
                "categories": ["History", "Photography", "Adventure"],
                "description": "A landmark fort complex with hilltop views, courtyards, and classic Rajput architecture.",
                "visit_duration_hours": 3.0,
            },
            {
                "name": "Hawa Mahal",
                "categories": ["History", "Photography"],
                "description": "The iconic palace facade known for its lattice windows and old-city views.",
                "visit_duration_hours": 1.5,
            },
            {
                "name": "Jantar Mantar",
                "categories": ["History", "Photography"],
                "description": "A historic astronomical observatory with large stone instruments.",
                "visit_duration_hours": 2.0,
            },
            {
                "name": "Johari Bazaar",
                "categories": ["Food", "Photography", "Culture"],
                "description": "A classic Jaipur market for textiles, jewelry, snacks, and street scenes.",
                "visit_duration_hours": 2.5,
            },
        ],
    },
    "spiti": {
        "destination": "Spiti",
        "places": [
            {
                "name": "Key Monastery",
                "categories": ["History", "Photography", "Nature"],
                "description": "A striking hilltop monastery overlooking the Spiti valley and surrounding mountains.",
                "visit_duration_hours": 2.0,
            },
            {
                "name": "Kibber Village",
                "categories": ["Nature", "Road Trips", "Photography"],
                "description": "A high-altitude village known for wide landscapes, traditional homes, and quiet valley views.",
                "visit_duration_hours": 2.5,
            },
            {
                "name": "Hikkim",
                "categories": ["Nature", "Road Trips", "Photography"],
                "description": "A remote village famous for its post office and open mountain views.",
                "visit_duration_hours": 1.5,
            },
            {
                "name": "Komic",
                "categories": ["Nature", "Road Trips", "Photography"],
                "description": "One of the world's highest villages, offering dramatic road-trip scenery and crisp mountain air.",
                "visit_duration_hours": 2.0,
            },
            {
                "name": "Chandratal Lake",
                "categories": ["Nature", "Adventure", "Photography", "Sunrise"],
                "description": "A crescent-shaped high-altitude lake admired for camping, reflections, and sunrise light.",
                "visit_duration_hours": 4.0,
            },
            {
                "name": "Dhankar Monastery",
                "categories": ["History", "Photography", "Adventure"],
                "description": "A cliffside monastery with sweeping valley views and a strong sense of Spiti's heritage.",
                "visit_duration_hours": 2.0,
            },
            {
                "name": "Pin Valley National Park",
                "categories": ["Nature", "Adventure", "Road Trips"],
                "description": "A cold desert valley with wildlife, trails, and scenic routes into the inner Himalayas.",
                "visit_duration_hours": 5.0,
            },
            {
                "name": "Tabo Monastery",
                "categories": ["History", "Photography"],
                "description": "A historic monastery complex known for its murals, heritage, and quiet spiritual atmosphere.",
                "visit_duration_hours": 2.0,
            },
            {
                "name": "Kunzum Pass",
                "categories": ["Adventure", "Road Trips", "Photography"],
                "description": "A high mountain pass connecting valleys with wide views and dramatic road travel.",
                "visit_duration_hours": 2.5,
            },
            {
                "name": "Langza",
                "categories": ["Nature", "Photography", "History"],
                "description": "A remote fossil village with sweeping views of the valley and a peaceful high-altitude setting.",
                "visit_duration_hours": 1.5,
            },
            {
                "name": "Losar",
                "categories": ["Nature", "Road Trips"],
                "description": "A quiet last village on the road into the Spiti valley, useful for scenic travel staging.",
                "visit_duration_hours": 1.0,
            },
        ],
    },
    "manali": {
        "destination": "Manali",
        "places": [
            {
                "name": "Hadimba Devi Temple",
                "categories": ["History", "Photography", "Nature"],
                "description": "A forest-set temple known for its cedar surroundings and distinctive wooden architecture.",
                "visit_duration_hours": 1.5,
            },
            {
                "name": "Solang Valley",
                "categories": ["Adventure", "Nature", "Photography"],
                "description": "A classic adventure valley for scenic mountain views and outdoor activities.",
                "visit_duration_hours": 3.0,
            },
            {
                "name": "Old Manali",
                "categories": ["Food", "Nightlife", "Photography"],
                "description": "A laid-back neighborhood with cafes, live music, and a strong traveler vibe.",
                "visit_duration_hours": 2.5,
            },
            {
                "name": "Mall Road",
                "categories": ["Food", "Nightlife", "Photography"],
                "description": "The main promenade for shopping, snacks, evening walks, and local activity.",
                "visit_duration_hours": 2.0,
            },
            {
                "name": "Vashisht Hot Springs",
                "categories": ["Nature", "History", "Photography"],
                "description": "A village stop known for natural hot springs and a quiet local setting.",
                "visit_duration_hours": 1.5,
            },
            {
                "name": "Jogini Waterfall",
                "categories": ["Adventure", "Nature", "Road Trips"],
                "description": "A popular short trek from the Manali side to a scenic waterfall setting.",
                "visit_duration_hours": 3.5,
            },
            {
                "name": "Naggar Castle",
                "categories": ["History", "Photography", "Nature"],
                "description": "A historic castle overlooking the valley with views and heritage architecture.",
                "visit_duration_hours": 2.0,
            },
            {
                "name": "Atal Tunnel",
                "categories": ["Adventure", "Road Trips"],
                "description": "A major mountain tunnel used for scenic road journeys and access to the higher valleys.",
                "visit_duration_hours": 1.0,
            },
            {
                "name": "Beas River",
                "categories": ["Nature", "Photography"],
                "description": "The river corridor around Manali that offers calm views, riverside stops, and mountain scenery.",
                "visit_duration_hours": 1.5,
            },
            {
                "name": "Manu Temple",
                "categories": ["History", "Photography"],
                "description": "A small historic temple in Old Manali with local cultural significance and valley views.",
                "visit_duration_hours": 1.0,
            },
        ],
    },
}


def _clean_interests(interests: list[str]) -> list[str]:
    cleaned = []
    for interest in interests or []:
        if isinstance(interest, str):
            value = interest.strip()
            if value:
                cleaned.append(value.lower())
    return list(dict.fromkeys(cleaned))


def _score_place(place: dict, interests: list[str]) -> int:
    categories = {category.lower() for category in place["categories"]}
    return sum(1 for interest in interests if interest in categories)


def _rank_places(dataset: dict, interests: list[str]) -> list[dict]:
    normalized_interests = _clean_interests(interests)
    ranked = []

    for index, place in enumerate(dataset["places"]):
        score = _score_place(place, normalized_interests) if normalized_interests else 0
        ranked.append((score, index, place))

    ranked.sort(key=lambda item: (-item[0], item[1]))
    return [place for _, _, place in ranked]


def get_places(destination: str, interests: list[str], max_places: int):
    destination_key = destination.strip().lower()
    dataset = DESTINATION_PLACES.get(destination_key)

    if not dataset:
        return DestinationPlacesResponse(
            destination=destination.strip(),
            interests=interests or [],
            max_places=max_places,
            places=[],
        )

    ordered_places = _rank_places(dataset, interests)

    unique_places = []
    seen_names = set()

    for place in ordered_places:
        place_name = place["name"].lower()
        if place_name in seen_names:
            continue
        seen_names.add(place_name)
        unique_places.append(
            DestinationPlace(
                name=place["name"],
                destination=dataset["destination"],
                categories=place["categories"],
                description=place["description"],
                visit_duration_hours=place.get("visit_duration_hours"),
            )
        )
        if len(unique_places) >= max_places:
            break

    return DestinationPlacesResponse(
        destination=dataset["destination"],
        interests=interests or [],
        max_places=max_places,
        places=unique_places,
    )


def plan_places(destination: str, interests: list[str], days: int, places_per_day: int):
    destination_key = destination.strip().lower()
    dataset = DESTINATION_PLACES.get(destination_key)

    if not dataset:
        return DestinationPlacesPlanResponse(
            destination=destination.strip(),
            days=days,
            interests=interests or [],
            places_per_day=places_per_day,
            itinerary_places=[
                DestinationPlacesDayPlan(day=day, places=[])
                for day in range(1, days + 1)
            ],
        )

    ranked_places = _rank_places(dataset, interests)
    seen_names = set()
    unique_places = []

    for place in ranked_places:
        place_name = place["name"].lower()
        if place_name in seen_names:
            continue
        seen_names.add(place_name)
        unique_places.append(
            DestinationPlace(
                name=place["name"],
                destination=dataset["destination"],
                categories=place["categories"],
                description=place["description"],
                visit_duration_hours=place.get("visit_duration_hours"),
            )
        )

    day_slots = [[] for _ in range(days)]
    max_slots = days * places_per_day
    selected_places = unique_places[:max_slots]

    for index, place in enumerate(selected_places):
        start_day = index % days
        assigned = False

        for offset in range(days):
            day_index = (start_day + offset) % days
            if len(day_slots[day_index]) < places_per_day:
                day_slots[day_index].append(place)
                assigned = True
                break

        if not assigned:
            break

    return DestinationPlacesPlanResponse(
        destination=dataset["destination"],
        days=days,
        interests=interests or [],
        places_per_day=places_per_day,
        itinerary_places=[
            DestinationPlacesDayPlan(day=index + 1, places=places)
            for index, places in enumerate(day_slots)
        ],
    )
