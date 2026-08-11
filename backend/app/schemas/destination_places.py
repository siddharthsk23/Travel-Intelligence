from pydantic import BaseModel, Field, field_validator


class DestinationPlacesRequest(BaseModel):
    destination: str
    interests: list[str] = Field(default_factory=list)
    max_places: int = Field(default=6, ge=1, le=20)

    @field_validator("destination")
    @classmethod
    def require_destination(cls, value: str):
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("destination cannot be empty")
        return cleaned

    @field_validator("interests", mode="before")
    @classmethod
    def normalize_interests(cls, value):
        if value is None:
            return []
        return value


class DestinationPlace(BaseModel):
    name: str
    destination: str
    categories: list[str]
    description: str
    visit_duration_hours: float | None = None


class DestinationPlacesResponse(BaseModel):
    destination: str
    interests: list[str]
    max_places: int
    places: list[DestinationPlace]


class DestinationPlacesPlanRequest(BaseModel):
    destination: str
    days: int = Field(default=1, ge=1, le=30)
    interests: list[str] = Field(default_factory=list)
    places_per_day: int = Field(default=2, ge=1, le=5)

    @field_validator("destination")
    @classmethod
    def require_plan_destination(cls, value: str):
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("destination cannot be empty")
        return cleaned

    @field_validator("interests", mode="before")
    @classmethod
    def normalize_plan_interests(cls, value):
        if value is None:
            return []
        return value


class DestinationPlacesDayPlan(BaseModel):
    day: int
    places: list[DestinationPlace]


class DestinationPlacesPlanResponse(BaseModel):
    destination: str
    days: int
    interests: list[str]
    places_per_day: int
    itinerary_places: list[DestinationPlacesDayPlan]
