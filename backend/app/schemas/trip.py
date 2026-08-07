from pydantic import BaseModel, ConfigDict


class TripBase(BaseModel):
    user_id: int
    source: str
    destination: str
    start_date: str
    end_date: str
    travel_mode: str
    budget: int | None = None

    model_config = ConfigDict(from_attributes=True)


class TripCreate(TripBase):
    pass


class TripUpdate(BaseModel):
    source: str | None = None
    destination: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    travel_mode: str | None = None
    budget: int | None = None
    status: str | None = None

    model_config = ConfigDict(from_attributes=True)


class TripResponse(BaseModel):
    id: int
    user_id: int
    source: str
    destination: str
    start_date: str
    end_date: str
    travel_mode: str
    budget: int | None = None
    status: str

    model_config = ConfigDict(from_attributes=True)