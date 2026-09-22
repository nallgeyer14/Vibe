from typing import TYPE_CHECKING
from datetime import datetime

from sqlalchemy import Integer, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

if TYPE_CHECKING:
    from app.models.user import User


class UserSettings(Base):
    __tablename__ = "user_settings"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True
    )

    location_enabled: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    show_interests: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    private_profile: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    new_matches_notifications: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    message_notifications: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    activity_updates_notifications: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    nearby_activities_notifications: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    user: Mapped["User"] = relationship(
        "User",
        back_populates="settings"
    )