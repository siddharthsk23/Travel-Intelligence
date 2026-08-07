from sqlalchemy import Column, Integer, String, Float

from app.db.base import Base


class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)

    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    category = Column(String, nullable=False)

    description = Column(String)

    best_season = Column(String)

    rating = Column(Float, default=0.0)

    image_url = Column(String)