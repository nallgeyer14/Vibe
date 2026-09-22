from pydantic import BaseModel

class InterestCreate(BaseModel):
    name: str

class UserInterestCreate(BaseModel):
    interest_ids: list[int]

class InterestResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True