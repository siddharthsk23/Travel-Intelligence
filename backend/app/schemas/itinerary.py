from pydantic import BaseModel, ConfigDict


class ItineraryBase(BaseModel):
    trip_id: int
    day: int
    destination: str
    start_time: str | None = None
    end_time: str | None = None
    activity: str
    notes: str | None = None

    model_config = ConfigDict(from_attributes=True)


class ItineraryCreate(ItineraryBase):
    pass


class ItineraryUpdate(BaseModel):
    day: int | None = None
    destination: str | None = None
    start_time: str | None = None
    end_time: str | None = None
    activity: str | None = None
    notes: str | None = None

    model_config = ConfigDict(from_attributes=True)


class ItineraryResponse(BaseModel):
    id: int
    trip_id: int
    day: int
    destination: str
    start_time: str | None = None
    end_time: str | None = None
    activity: str
    notes: str | None = None

    model_config = ConfigDict(from_attributes=True)
    