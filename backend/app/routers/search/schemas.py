#!/usr/bin/python3
"""Module that defines orm schemas for tables"""

from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime


class SearchRequest(BaseModel):
    keyword: str

class SearchOutput(BaseModel):
    output: str

class SearchLogOut(BaseModel):
    id: UUID
    user_id: int
    keyword: str
    match_count: int
    decrypted: bool
    timestamp: datetime

    class Config:
        from_attributes = True
