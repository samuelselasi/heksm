#!/usr/bin/python3
"""Module to initialize routers and endpoints"""

from pathlib import Path
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, Request
from app.routers.auth import main as auth
from app.routers.user import main as user
from app.routers.search import main as search
from app.routers.user.models import User
from app.routers.search.models import SearchLog
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(debug=True)

app.include_router(auth.router, tags=["Authentication"])
app.include_router(user.router, tags=["Users"])
app.include_router(search.router, tags=["Search Log"])


@app.get("/")
async def root():
    """Function that returns a default message when the root url is hit"""

    return {"message": "Homomorphic Encryption-based Keyword Search Mechanism. Hit /docs for swagger"}
