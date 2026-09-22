from sqlalchemy import ForeignKey, String, Table, Column
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

user_interests = Table(
    "user_interests",
    Base.metadata,
    Column(
        "user_id",
        ForeignKey("users.id", ondelete="CASCADE"), 
        primary_key=True
    ),
    Column(
        "interest_id",
        ForeignKey("interests.id", ondelete="CASCADE"), 
        primary_key=True
    ),
)

class Interest(Base):
    __tablename__ = "interests"
    id: Mapped[int] = mapped_column(
        primary_key=True, 
        index=True
    ) 

    name: Mapped[str] = mapped_column(
        String(255), 
        unique=True, 
        nullable=False
    )
