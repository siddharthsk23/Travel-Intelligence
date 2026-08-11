from pydantic import BaseModel, Field, field_validator, model_validator


SUPPORTED_TRANSPORT_MODES = {
    "bike": "Bike",
    "car": "Car",
    "public transport": "Public Transport",
    "flight": "Flight",
}


def canonical_transport_mode(value: str):
    if not isinstance(value, str):
        raise ValueError("Transport mode must be text")

    mode = SUPPORTED_TRANSPORT_MODES.get(value.strip().lower())
    if not mode:
        raise ValueError("Unsupported transport mode")

    return mode


class TransportRequest(BaseModel):
    source: str
    destination: str
    distance_km: float = Field(gt=0, allow_inf_nan=False)
    transport_modes: list[str] = Field(min_length=1)
    selected_mode: str
    vehicle_model: str | None = None
    mileage_kmpl: float | None = Field(default=None, gt=0, allow_inf_nan=False)
    fuel_tank_liters: float | None = Field(default=None, gt=0, allow_inf_nan=False)
    fuel_price_per_liter: float | None = Field(default=None, ge=0, allow_inf_nan=False)
    riders: int | None = Field(default=None, ge=1)
    pillion: bool | None = None
    luggage_kg: float | None = Field(default=None, ge=0, allow_inf_nan=False)

    @field_validator("source", "destination")
    @classmethod
    def require_text(cls, value: str):
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Field cannot be empty")
        return cleaned

    @field_validator("transport_modes")
    @classmethod
    def normalize_transport_modes(cls, value: list[str]):
        return list(dict.fromkeys(canonical_transport_mode(mode) for mode in value))

    @field_validator("selected_mode")
    @classmethod
    def normalize_selected_mode(cls, value: str):
        return canonical_transport_mode(value)

    @model_validator(mode="after")
    def selected_mode_must_be_requested(self):
        if self.selected_mode not in self.transport_modes:
            raise ValueError("selected_mode must be included in transport_modes")
        return self


class TransportModeResult(BaseModel):
    mode: str
    available: bool
    estimated_time_hours: float
    fuel_required_liters: float | None
    fuel_cost: float | None
    estimated_transport_cost: float | None
    notes: list[str]


class TransportResponse(BaseModel):
    source: str
    destination: str
    distance_km: float
    modes: list[TransportModeResult]
    recommended_mode: str | None
