from fastapi import APIRouter

from app.schemas.planner import PlannerRequest, PlannerResponse
from app.services.planner_service import generate_trip_plan

router = APIRouter(
    prefix="/planner",
    tags=["Planner"]
)


@router.post("/generate", response_model=PlannerResponse)
def generate_plan(request: PlannerRequest):
    return generate_trip_plan(request)