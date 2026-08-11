from pydantic import BaseModel, Field, field_validator


class RouteAnalyzeRequest(BaseModel):
    destination: str
    places: list[str] = Field(default_factory=list)

    @field_validator("destination")
    @classmethod
    def require_destination(cls, value: str):
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("destination cannot be empty")
        return cleaned

    @field_validator("places", mode="before")
    @classmethod
    def normalize_places(cls, value):
        if value is None:
            return []
        return value

    @field_validator("places")
    @classmethod
    def validate_places(cls, value: list[str]):
        cleaned = []
        for place in value:
            if not isinstance(place, str):
                raise ValueError("places must be strings")
            stripped = place.strip()
            if not stripped:
                raise ValueError("places cannot contain empty values")
            cleaned.append(stripped)
        return cleaned


class RouteEntry(BaseModel):
    order: int
    place: str
    distance_from_previous_km: float
    estimated_travel_time_hours: float
    notes: list[str] = Field(default_factory=list)


class RouteAnalyzeResponse(BaseModel):
    destination: str
    route: list[RouteEntry]
    total_distance_km: float
    total_travel_time_hours: float
