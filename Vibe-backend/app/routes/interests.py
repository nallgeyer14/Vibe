from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database import get_db
from app.models import Interest, User, user_interests
from app.schemas.interest import (
    InterestCreate,
    InterestResponse,
    UserInterestCreate,
)

router = APIRouter(prefix="/interests", tags=["Interests"])


@router.post("/", response_model=InterestResponse)
def create_interest(
    interest_data: InterestCreate,
    db: Session = Depends(get_db),
):
    existing_interest = (
        db.query(Interest)
        .filter(Interest.name == interest_data.name)
        .first()
    )

    if existing_interest:
        raise HTTPException(
            status_code=400,
            detail="Interest already exists",
        )

    interest = Interest(name=interest_data.name)

    db.add(interest)
    db.commit()
    db.refresh(interest)

    return interest


@router.get("/", response_model=list[InterestResponse])
def get_interests(
    db: Session = Depends(get_db),
):
    return db.query(Interest).order_by(Interest.name).all()


@router.post("/me")
def set_user_interests(
    interest_data: UserInterestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    interests = (
        db.query(Interest)
        .filter(Interest.id.in_(interest_data.interest_ids))
        .all()
    )

    if len(interests) != len(set(interest_data.interest_ids)):
        raise HTTPException(
            status_code=400,
            detail="One or more interests do not exist",
        )

    db.execute(
        delete(user_interests).where(
            user_interests.c.user_id == current_user.id
        )
    )

    for interest_id in interest_data.interest_ids:
        db.execute(
            user_interests.insert().values(
                user_id=current_user.id,
                interest_id=interest_id,
            )
        )

    db.commit()

    return {
        "user_id": current_user.id,
        "interest_ids": interest_data.interest_ids,
    }


@router.get("/me", response_model=list[InterestResponse])
def get_user_interests(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    result = db.execute(
        select(Interest)
        .join(
            user_interests,
            Interest.id == user_interests.c.interest_id,
        )
        .where(user_interests.c.user_id == current_user.id)
        .order_by(Interest.name)
    )

    return result.scalars().all()