"""Application configuration via environment variables."""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # ─── Environment ───
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # ─── Database ───
    DATABASE_URL: str = "postgresql+asyncpg://reel2real:reel2real_dev@postgres:5432/reel2real"
    DATABASE_URL_SYNC: str = "postgresql://reel2real:reel2real_dev@postgres:5432/reel2real"

    # ─── Redis ───
    REDIS_URL: str = "redis://redis:6379/0"

    # ─── API Keys ───
    GEMINI_API_KEY: str = ""
    SARVAM_API_KEY: str = ""
    TAVILY_API_KEY: str = ""

    # ─── CORS ───
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "ignore",
    }


@lru_cache
def get_settings() -> Settings:
    """Cached settings instance."""
    return Settings()
