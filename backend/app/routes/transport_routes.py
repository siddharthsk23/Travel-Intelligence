from fastapi import APIRouter

from app.schemas.transport import TransportRequest, TransportResponse
from app.services.transport_service import analyze_transport


router = APIRouter(
    prefix="/transport",
    tags=["Transport"],
)


@router.post("/analyze", response_model=TransportResponse)
def analyze_transport_options(request: TransportRequest):
    return analyze_transport(request)
