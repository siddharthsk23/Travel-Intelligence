from pydantic import BaseModel, ConfigDict


class DestinationBase(BaseModel):
    name: str
    state: str
    country: str
    latitude: float
    longitude: float
    category: str
    description: str | None = None
    best_season: str | None = None
    rating: float = 0.0
    image_url: str | None = None

    model_config = ConfigDict(from_attributes=True)


class DestinationCreate(DestinationBase):
    pass


class DestinationUpdate(BaseModel):
    name: str | None = None
    state: str | None = None
    country: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    category: str | None = None
    description: str | None = None
    best_season: str | None = None
    rating: float | None = None
    image_url: str | None = None

    model_config = ConfigDict(from_attributes=True)


class DestinationResponse(DestinationBase):
    id: int

    model_config = ConfigDict(from_attributes=True)