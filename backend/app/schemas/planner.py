from pydantic import BaseModel, Field, field_validator
from typing import List


class PlannerRequest(BaseModel):
    source: str
    destination: str
    days: int = Field(ge=1, le=30)
    budget: float = Field(ge=0, allow_inf_nan=False)
    transport: str
    interests: List[str] = Field(default_factory=list)

    @field_validator("source", "destination", "transport")
    @classmethod
    def require_text(cls, value: str):
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Field cannot be empty")
        return cleaned

    @field_validator("interests", mode="before")
    @classmethod
    def default_interests(cls, value):
        if value is None:
            return []
        return value


class PlannerResponse(BaseModel):
    source: str
    destination: str
    trip_name: str
    estimated_cost: float
    itinerary: List[dict]
