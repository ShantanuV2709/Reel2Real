"""API request and response schemas."""

from typing import Optional
from pydantic import BaseModel, HttpUrl


class AnalyzeRequest(BaseModel):
    """Request body for submitting a reel URL for analysis."""
    url: str  # Instagram Reel URL


class AnalyzeResponse(BaseModel):
    """Response after submitting a reel for analysis."""
    job_id: str
    status: str
    message: str


class JobStatusResponse(BaseModel):
    """Response for checking job status."""
    job_id: str
    status: str
    progress: Optional[dict] = None
    result: Optional[dict] = None
    error: Optional[str] = None


class TestExtractResponse(BaseModel):
    """Response from the test extraction endpoint."""
    url: str
    transcript: str
    caption: Optional[str] = None
    creator_handle: Optional[str] = None
    hashtags: list[str] = []
    duration_seconds: Optional[float] = None


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    environment: str
    services: dict
