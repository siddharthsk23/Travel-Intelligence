from fastapi import APIRouter

from app.schemas.route import RouteAnalyzeRequest, RouteAnalyzeResponse
from app.services.route_service import analyze_route


router = APIRouter(
    prefix="/route",
    tags=["Route Intelligence"],
)


@router.post("/analyze", response_model=RouteAnalyzeResponse)
def analyze_route_plan(request: RouteAnalyzeRequest):
    return analyze_route(request.destination, request.places)
