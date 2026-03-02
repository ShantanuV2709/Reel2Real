"""Reel database model."""

import enum
import hashlib
from datetime import datetime, timezone
from typing import Optional
from sqlmodel import SQLModel, Field, Column
from sqlalchemy import Text, JSON


class ReelStatus(str, enum.Enum):
    """Pipeline processing status."""
    PENDING = "pending"
    EXTRACTING = "extracting"
    TRANSCRIBING = "transcribing"
    ANALYZING = "analyzing"
    DETECTING_BIAS = "detecting_bias"
    DISCOVERING_RESOURCES = "discovering_resources"
    BUILDING_ROADMAP = "building_roadmap"
    COMPLETED = "completed"
    FAILED = "failed"


class Reel(SQLModel, table=True):
    """Represents a submitted Instagram Reel and its analysis."""

    __tablename__ = "reels"

    id: Optional[int] = Field(default=None, primary_key=True)
    
    # ─── Input ───
    url: str = Field(index=True, max_length=2048)
    url_hash: str = Field(index=True, unique=True, max_length=64)
    
    # ─── Status ───
    status: ReelStatus = Field(default=ReelStatus.PENDING)
    celery_task_id: Optional[str] = Field(default=None, max_length=255)
    error_message: Optional[str] = Field(default=None, sa_column=Column(Text))
    
    # ─── Extracted Content ───
    transcript: Optional[str] = Field(default=None, sa_column=Column(Text))
    ocr_text: Optional[str] = Field(default=None, sa_column=Column(Text))
    caption: Optional[str] = Field(default=None, sa_column=Column(Text))
    creator_handle: Optional[str] = Field(default=None, max_length=255)
    hashtags: Optional[str] = Field(default=None, sa_column=Column(Text))
    duration_seconds: Optional[float] = Field(default=None)
    
    # ─── Analysis Results (stored as JSON) ───
    content_analysis: Optional[dict] = Field(default=None, sa_column=Column(JSON))
    bias_detection: Optional[dict] = Field(default=None, sa_column=Column(JSON))
    resources: Optional[dict] = Field(default=None, sa_column=Column(JSON))
    roadmap: Optional[dict] = Field(default=None, sa_column=Column(JSON))
    
    # ─── Computed ───
    hype_score: Optional[int] = Field(default=None)
    
    # ─── Timestamps ───
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    completed_at: Optional[datetime] = Field(default=None)

    @staticmethod
    def hash_url(url: str) -> str:
        """Generate a consistent hash for a reel URL to enable caching."""
        normalized = url.strip().lower().rstrip("/")
        return hashlib.sha256(normalized.encode()).hexdigest()
