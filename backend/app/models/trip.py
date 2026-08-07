from sqlalchemy import Column, Integer, String, ForeignKey

from app.db.base import Base


class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    source = Column(String, nullable=False)
    destination = Column(String, nullable=False)

    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=False)

    travel_mode = Column(String, nullable=False)
    budget = Column(Integer)

    status = Column(String, default="planned")