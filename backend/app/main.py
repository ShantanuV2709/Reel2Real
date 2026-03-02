"""FastAPI application entry point."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.db import init_db
from app.api.routes import router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown events."""
    # Startup
    logger.info("=" * 60)
    logger.info("REEL2REAL API Starting...")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    logger.info("=" * 60)

    # Initialize database tables
    await init_db()
    logger.info("Database tables initialized")

    yield

    # Shutdown
    logger.info("REEL2REAL API Shutting down...")


app = FastAPI(
    title="Reel2Real API",
    description=(
        "AI-powered pipeline that transforms Instagram Reels "
        "into credible, bias-free learning roadmaps."
    ),
    version="0.1.0",
    lifespan=lifespan,
)

# CORS middleware for frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router, prefix="/api")

# Root redirect to docs
@app.get("/")
async def root():
    return {
        "app": "Reel2Real API",
        "version": "0.1.0",
        "docs": "/docs",
        "health": "/api/health",
    }
