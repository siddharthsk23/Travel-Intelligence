from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.db.base import Base


class Itinerary(Base):
    __tablename__ = "itineraries"

    id = Column(Integer, primary_key=True, index=True)

    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)

    day = Column(Integer, nullable=False)

    destination = Column(String, nullable=False)

    start_time = Column(String, nullable=True)

    end_time = Column(String, nullable=True)

    activity = Column(String, nullable=False)

    notes = Column(Text, nullable=True)

    trip = relationship("Trip", back_populates="itineraries")