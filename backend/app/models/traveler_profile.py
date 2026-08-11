from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, JSON, DateTime

from app.db.base import Base


class TravelerProfile(Base):
    __tablename__ = "traveler_profiles"

    id = Column(Integer, primary_key=True, index=True)

    # Unique identifier for the traveler.
    # For now this will come from the frontend.
    # Later it can be linked directly to the authenticated User.
    traveler_id = Column(
        String(100),
        unique=True,
        nullable=False,
        index=True
    )

    # General traveler personality
    travel_style = Column(String(100), nullable=True)
    preferred_pace = Column(String(100), nullable=True)

    # General preferences
    interests = Column(JSON, nullable=True)
    transport_preference = Column(String(100), nullable=True)
    food_preferences = Column(JSON, nullable=True)

    # Safety / comfort information
    allergies = Column(JSON, nullable=True)
    phobias = Column(JSON, nullable=True)

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )