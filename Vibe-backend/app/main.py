from fastapi import FastAPI
from sqlalchemy import text
from app.database import engine
from app.routes.users import router as users_router
from app.routes.profiles import router as profiles_router
from app.routes.interests import router as interests_router
from app.routes.auth import router as auth_router
from app.routes.settings import router as settings_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Vibe API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8443"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(profiles_router)
app.include_router(interests_router)
app.include_router(settings_router)

@app.get("/")
def root():
    return {"message": "Welcome to the Vibe API!"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/test-db")
def database_test():
    # Test database connection
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            return {"database" : result.scalar() == 1}
