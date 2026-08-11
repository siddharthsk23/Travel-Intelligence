from app.schemas.route import RouteAnalyzeResponse, RouteEntry
from app.services.destination_places_service import DESTINATION_PLACES


AVERAGE_PLANNING_SPEED_KMPH = 30.0
FALLBACK_PAIR_DISTANCE_KM = 12.0

ROUTE_DISTANCE_DATA = {
    "ladakh": {
        ("leh palace", "leh market"): 3.0,
        ("leh market", "shanti stupa"): 3.0,
        ("leh palace", "shanti stupa"): 2.0,
        ("leh palace", "khardung la"): 40.0,
        ("khardung la", "nubra valley"): 80.0,
        ("nubra valley", "pangong lake"): 160.0,
        ("pangong lake", "shanti stupa"): 220.0,
        ("pangong lake", "leh market"): 223.0,
        ("shanti stupa", "nubra valley"): 122.0,
        ("leh palace", "nubra valley"): 120.0,
    },
    "spiti": {
        ("key monastery", "kibber village"): 20.0,
        ("kibber village", "hikkim"): 12.0,
        ("hikkim", "komic"): 10.0,
        ("komic", "langza"): 12.0,
        ("langza", "tabo monastery"): 24.0,
        ("tabo monastery", "dhankar monastery"): 32.0,
        ("dhankar monastery", "pin valley national park"): 28.0,
        ("pin valley national park", "chandratal lake"): 60.0,
        ("chandratal lake", "kunzum pass"): 14.0,
        ("kunzum pass", "losar"): 18.0,
        ("key monastery", "tabo monastery"): 45.0,
    },
    "manali": {
        ("hadimba devi temple", "mall road"): 2.0,
        ("mall road", "old manali"): 1.0,
        ("old manali", "manu temple"): 1.0,
        ("manu temple", "vashisht hot springs"): 4.0,
        ("vashisht hot springs", "solang valley"): 14.0,
        ("solang valley", "jogini waterfall"): 8.0,
        ("jogini waterfall", "naggar castle"): 24.0,
        ("naggar castle", "atal tunnel"): 38.0,
        ("atal tunnel", "beas river"): 12.0,
        ("beas river", "mall road"): 4.0,
        ("hadimba devi temple", "beas river"): 5.0,
    },
}


def _clean_destination(destination: str) -> str:
    return destination.strip()


def _normalize_place_name(place: str) -> str:
    return place.strip().lower()


def _canonical_place_map(destination_key: str) -> dict[str, str]:
    dataset = DESTINATION_PLACES.get(destination_key, {})
    places = dataset.get("places", [])
    return {
        place["name"].strip().lower(): place["name"]
        for place in places
    }


def _distance_lookup(destination_key: str, previous_place: str, current_place: str):
    dataset = ROUTE_DISTANCE_DATA.get(destination_key, {})
    direct_key = (previous_place, current_place)
    reverse_key = (current_place, previous_place)
    return dataset.get(direct_key) or dataset.get(reverse_key)


def _estimate_time(distance_km: float) -> float:
    return round(distance_km / AVERAGE_PLANNING_SPEED_KMPH, 2)


def _build_unique_places(request_places: list[str], canonical_map: dict[str, str]):
    unique_places = []
    seen = set()

    for place in request_places:
        normalized = _normalize_place_name(place)
        if normalized in seen:
            continue
        seen.add(normalized)
        unique_places.append(canonical_map.get(normalized, place.strip()))

    return unique_places


def analyze_route(destination: str, places: list[str]):
    destination_key = destination.strip().lower()
    destination_dataset = DESTINATION_PLACES.get(destination_key)

    if not destination_dataset or destination_key not in ROUTE_DISTANCE_DATA:
        return RouteAnalyzeResponse(
            destination=_clean_destination(destination),
            route=[],
            total_distance_km=0.0,
            total_travel_time_hours=0.0,
        )

    canonical_destination = destination_dataset["destination"]
    canonical_map = _canonical_place_map(destination_key)
    ordered_places = _build_unique_places(places, canonical_map)

    route = []
    total_distance_km = 0.0
    total_travel_time_hours = 0.0

    for index, place in enumerate(ordered_places):
        notes = []
        distance = 0.0

        if index == 0:
            if _normalize_place_name(place) not in canonical_map:
                notes.append(
                    "Place not found in the curated route dataset; subsequent legs may use fallback estimates."
                )
        else:
            previous_place = ordered_places[index - 1]
            previous_key = _normalize_place_name(previous_place)
            current_key = _normalize_place_name(place)
            distance = _distance_lookup(destination_key, previous_key, current_key)

            if distance is None:
                distance = FALLBACK_PAIR_DISTANCE_KM
                notes.append(
                    "Fallback route estimate used because this pair is not in the curated distance dataset."
                )

            if previous_key not in canonical_map or current_key not in canonical_map:
                notes.append(
                    "One or more places are not in the curated route dataset."
                )

        travel_time = 0.0 if index == 0 else _estimate_time(distance)

        route.append(
            RouteEntry(
                order=index + 1,
                place=place,
                distance_from_previous_km=round(distance, 2),
                estimated_travel_time_hours=travel_time,
                notes=notes,
            )
        )
        total_distance_km += distance
        total_travel_time_hours += travel_time

    return RouteAnalyzeResponse(
        destination=canonical_destination,
        route=route,
        total_distance_km=round(total_distance_km, 2),
        total_travel_time_hours=round(total_travel_time_hours, 2),
    )
