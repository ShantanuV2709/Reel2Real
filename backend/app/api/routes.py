"""API route handlers."""

import logging
from fastapi import APIRouter, HTTPException

from app.api.schemas import (
    AnalyzeRequest,
    AnalyzeResponse,
    TestExtractResponse,
    HealthResponse,
)
from app.config import get_settings
from app.services.extractor import ReelExtractor
from app.services.transcriber import Transcriber, MockTranscriber

logger = logging.getLogger(__name__)
router = APIRouter()
settings = get_settings()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Check the health of all services."""
    services = {
        "api": "ok",
        "gemini_api": "configured" if settings.GEMINI_API_KEY else "missing",
        "sarvam_api": "configured" if settings.SARVAM_API_KEY else "missing",
        "tavily_api": "configured" if settings.TAVILY_API_KEY else "missing",
    }

    return HealthResponse(
        status="ok",
        environment=settings.ENVIRONMENT,
        services=services,
    )


@router.post("/test/extract", response_model=TestExtractResponse)
async def test_extract(request: AnalyzeRequest):
    """
    Test endpoint: extract audio and transcribe a reel URL.
    
    This is a synchronous test endpoint for Phase 0 verification.
    The full async pipeline (POST /analyze) is built in Phase 1.
    """
    url = request.url.strip()

    if not url:
        raise HTTPException(status_code=400, detail="URL is required")

    # Validate it looks like an Instagram URL
    if "instagram.com" not in url and "instagr.am" not in url:
        raise HTTPException(
            status_code=400,
            detail="Please provide a valid Instagram Reel URL"
        )

    extractor = ReelExtractor()
    try:
        # Step 1: Extract audio and metadata
        logger.info(f"Extracting reel: {url}")
        reel_data = extractor.extract(url)

        # Step 2: Transcribe audio
        logger.info("Transcribing audio...")
        sarvam_key = settings.SARVAM_API_KEY
        if sarvam_key and sarvam_key != "your_sarvam_api_key_here":
            transcriber = Transcriber(api_key=sarvam_key)
        else:
            logger.warning("No Sarvam API key configured, using mock transcriber")
            transcriber = MockTranscriber()

        result = transcriber.transcribe(reel_data.audio_path)

        return TestExtractResponse(
            url=url,
            transcript=result.transcript,
            caption=reel_data.caption,
            creator_handle=reel_data.creator_handle,
            hashtags=reel_data.hashtags,
            duration_seconds=reel_data.duration_seconds,
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        logger.error(f"Extraction failed: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred during extraction"
        )
    finally:
        extractor.cleanup()


# ─── Phase 1 Endpoints (placeholders) ───

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_reel(request: AnalyzeRequest):
    """
    Submit a reel URL for full pipeline analysis.
    Returns a job ID for polling the result.
    (Implemented in Phase 1)
    """
    raise HTTPException(
        status_code=501,
        detail="Full pipeline not yet implemented. Use /test/extract for Phase 0."
    )


@router.get("/result/{job_id}")
async def get_result(job_id: str):
    """
    Poll for the result of an analysis job.
    (Implemented in Phase 1)
    """
    raise HTTPException(
        status_code=501,
        detail="Result polling not yet implemented."
    )
