from fastapi import APIRouter

from app.schemas.destination_places import (
    DestinationPlacesRequest,
    DestinationPlacesResponse,
    DestinationPlacesPlanRequest,
    DestinationPlacesPlanResponse,
)
from app.services.destination_places_service import get_places, plan_places


router = APIRouter(
    prefix="/destination",
    tags=["Destination Places"],
)


@router.post("/places", response_model=DestinationPlacesResponse)
def get_destination_places(request: DestinationPlacesRequest):
    return get_places(request.destination, request.interests, request.max_places)


@router.post("/plan", response_model=DestinationPlacesPlanResponse)
def plan_destination_places(request: DestinationPlacesPlanRequest):
    return plan_places(
        request.destination,
        request.interests,
        request.days,
        request.places_per_day,
    )
