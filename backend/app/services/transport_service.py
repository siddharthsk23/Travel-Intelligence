from app.schemas.transport import TransportRequest


AVERAGE_SPEED_KMPH = {
    "Bike": 45,
    "Car": 55,
    "Public Transport": 42,
    "Flight": 650,
}

FLIGHT_FIXED_OVERHEAD_HOURS = 3
OPERATING_COST_BUFFER_RATE = {
    "Bike": 0.15,
    "Car": 0.2,
}
GENERIC_VEHICLE_COST_PER_KM = {
    "Bike": 4.5,
    "Car": 9.5,
}
PUBLIC_TRANSPORT_BASE_COST = 150
PUBLIC_TRANSPORT_COST_PER_KM = 2.25
FLIGHT_DISTANCE_BANDS = [
    (500, 3500),
    (1500, 6500),
    (3000, 9500),
]
FLIGHT_LONG_DISTANCE_COST = 12500


def _round_money(value: float):
    return round(value, 2)


def _round_quantity(value: float):
    return round(value, 2)


def _estimate_time(mode: str, distance_km: float):
    travel_time = distance_km / AVERAGE_SPEED_KMPH[mode]

    if mode == "Flight":
        travel_time += FLIGHT_FIXED_OVERHEAD_HOURS

    return _round_quantity(travel_time)


def _estimate_flight_cost(distance_km: float):
    for max_distance, cost in FLIGHT_DISTANCE_BANDS:
        if distance_km <= max_distance:
            return cost

    return FLIGHT_LONG_DISTANCE_COST


def _vehicle_mode_result(mode: str, request: TransportRequest):
    notes = [
        f"{mode} travel time is a deterministic planning estimate.",
    ]
    estimated_time_hours = _estimate_time(mode, request.distance_km)
    is_selected_mode = request.selected_mode == mode

    if is_selected_mode:
        notes.append("This is the selected mode.")

    if not is_selected_mode:
        notes.append(
            f"No {mode} vehicle details were supplied for this comparison."
        )
        notes.append(
            f"Estimated transport cost uses a generic {mode.lower()} per-km planning estimate."
        )

        return {
            "mode": mode,
            "available": True,
            "estimated_time_hours": estimated_time_hours,
            "fuel_required_liters": None,
            "fuel_cost": None,
            "estimated_transport_cost": _round_money(
                request.distance_km * GENERIC_VEHICLE_COST_PER_KM[mode]
            ),
            "notes": notes,
        }

    if request.vehicle_model:
        notes.append(f"Vehicle model: {request.vehicle_model}.")

    if request.fuel_tank_liters:
        tank_range = request.fuel_tank_liters * request.mileage_kmpl if request.mileage_kmpl else None
        if tank_range:
            notes.append(f"Estimated full-tank range is {_round_quantity(tank_range)} km.")

    if request.mileage_kmpl is None or request.fuel_price_per_liter is None:
        notes.append("Provide mileage and fuel price to calculate fuel cost.")
        return {
            "mode": mode,
            "available": False,
            "estimated_time_hours": estimated_time_hours,
            "fuel_required_liters": None,
            "fuel_cost": None,
            "estimated_transport_cost": None,
            "notes": notes,
        }

    fuel_required = request.distance_km / request.mileage_kmpl
    fuel_cost = fuel_required * request.fuel_price_per_liter
    estimated_transport_cost = fuel_cost * (1 + OPERATING_COST_BUFFER_RATE[mode])

    notes.append(
        f"Fuel required and fuel cost are calculated from supplied mileage and fuel price."
    )
    notes.append(
        f"Estimated transport cost includes a {int(OPERATING_COST_BUFFER_RATE[mode] * 100)}% operating-cost buffer."
    )

    return {
        "mode": mode,
        "available": True,
        "estimated_time_hours": estimated_time_hours,
        "fuel_required_liters": _round_quantity(fuel_required),
        "fuel_cost": _round_money(fuel_cost),
        "estimated_transport_cost": _round_money(estimated_transport_cost),
        "notes": notes,
    }


def _public_transport_result(request: TransportRequest):
    notes = [
        "Public transport travel time is a deterministic planning estimate.",
        "Estimated transport cost is not a live fare.",
    ]

    if request.selected_mode == "Public Transport":
        notes.append("This is the selected mode.")

    estimated_cost = (
        PUBLIC_TRANSPORT_BASE_COST
        + request.distance_km * PUBLIC_TRANSPORT_COST_PER_KM
    )

    return {
        "mode": "Public Transport",
        "available": True,
        "estimated_time_hours": _estimate_time("Public Transport", request.distance_km),
        "fuel_required_liters": None,
        "fuel_cost": None,
        "estimated_transport_cost": _round_money(estimated_cost),
        "notes": notes,
    }


def _flight_result(request: TransportRequest):
    notes = [
        "Flight travel time includes a fixed airport overhead estimate.",
        "Estimated transport cost is a deterministic distance-band estimate, not a live fare.",
    ]

    if request.selected_mode == "Flight":
        notes.append("This is the selected mode.")

    return {
        "mode": "Flight",
        "available": True,
        "estimated_time_hours": _estimate_time("Flight", request.distance_km),
        "fuel_required_liters": None,
        "fuel_cost": None,
        "estimated_transport_cost": _round_money(_estimate_flight_cost(request.distance_km)),
        "notes": notes,
    }


def _mode_result(mode: str, request: TransportRequest):
    if mode in ("Bike", "Car"):
        return _vehicle_mode_result(mode, request)

    if mode == "Public Transport":
        return _public_transport_result(request)

    return _flight_result(request)


def _recommend_mode(mode_results: list[dict]):
    available_modes = [
        mode
        for mode in mode_results
        if mode["available"] and mode["estimated_transport_cost"] is not None
    ]

    if not available_modes:
        return None

    max_cost = max(mode["estimated_transport_cost"] for mode in available_modes) or 1
    max_time = max(mode["estimated_time_hours"] for mode in available_modes) or 1

    ranked_modes = sorted(
        available_modes,
        key=lambda mode: (
            (mode["estimated_transport_cost"] / max_cost) * 0.7
            + (mode["estimated_time_hours"] / max_time) * 0.3,
            mode["mode"],
        ),
    )

    return ranked_modes[0]["mode"]


def _add_selection_and_recommendation_notes(
    mode_results: list[dict],
    selected_mode: str,
    recommended_mode: str | None,
):
    for mode in mode_results:
        if mode["mode"] == selected_mode:
            mode["notes"].append(
                f"User selected {selected_mode}; this is preserved separately from the recommendation."
            )

            if recommended_mode and recommended_mode != selected_mode:
                mode["notes"].append(
                    f"Recommended mode is {recommended_mode} based on deterministic cost/time scoring."
                )

        if recommended_mode and mode["mode"] == recommended_mode:
            mode["notes"].append(
                "This is the recommended mode based on deterministic cost/time scoring."
            )

            if recommended_mode != selected_mode:
                mode["notes"].append(
                    f"It differs from the selected mode ({selected_mode}) because it scored better on cost/time."
                )


def analyze_transport(request: TransportRequest):
    mode_results = [
        _mode_result(mode, request)
        for mode in request.transport_modes
    ]
    recommended_mode = _recommend_mode(mode_results)

    _add_selection_and_recommendation_notes(
        mode_results,
        request.selected_mode,
        recommended_mode,
    )

    return {
        "source": request.source,
        "destination": request.destination,
        "distance_km": _round_quantity(request.distance_km),
        "modes": mode_results,
        "recommended_mode": recommended_mode,
    }
