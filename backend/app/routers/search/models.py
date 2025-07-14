#!/usr/bin/python3
"""Module that defines tables"""

from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.routers.user.models import User
from datetime import datetime
from app.database import Base
from uuid import uuid4
from app import utils

class SearchLog(Base):
    __tablename__ = 'search_logs'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(Integer, ForeignKey("user.id"))
    keyword = Column(String, nullable=False)
    match_count = Column(Integer)
    decrypted = Column(Boolean, default=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
