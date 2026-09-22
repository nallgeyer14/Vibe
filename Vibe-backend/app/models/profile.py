from sqlalchemy import Integer, String, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    
    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )
    name: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )
    
    age: Mapped[int] = mapped_column(
        Integer,
        nullable=True
    )

    school: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )
    
    bio: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )
    
    profile_picture_url: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )  

    social_preferences: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )

    looking_for: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )

    user = relationship("User", back_populates="profile")