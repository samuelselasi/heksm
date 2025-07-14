#!/usr/bin/python3
"""Module that defines configuration settings"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Class that stores configuration items"""

    SECRET_KEY: str
    ALGORITHM: str
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_PORT: int
    MAIL_SERVER: str
    MAIL_STARTTLS: bool = False
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True
    ACCESS_TOKEN_DURATION_IN_MINUTES: float = 30.5
    REFRESH_TOKEN_DURATION_IN_MINUTES: float = 87000.5
    RESET_PASSWORD_SESSION_DURATION_IN_MINUTES: float = 1
    API_BASE_URL: str = 'http://0.0.0.0:8000'
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_DOMAIN: str

    class Config:
        title = 'Base Settings'
        env_file = '.env'


settings = Settings()
