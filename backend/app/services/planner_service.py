from app.schemas.planner import PlannerRequest
from app.services.recommendation_service import recommend_places

def generate_trip_plan(request: PlannerRequest):

    recommended = recommend_places(request.interests)

    itinerary = []

    for day in range(1, request.days + 1):
        itinerary.append(
            {
                "day": day,
                "morning": f"Visit {recommended[0] if recommended else request.destination}",
                "afternoon": "Lunch and sightseeing",
                "evening": "Local shopping and dinner"
            }
        )

    return {
        "trip_name": f"{request.destination} Trip",
        "estimated_cost": request.budget * 0.9,
        "itinerary": itinerary
    }