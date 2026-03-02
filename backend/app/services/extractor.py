"""Instagram Reel extraction service using yt-dlp."""

import os
import tempfile
import logging
from dataclasses import dataclass
from typing import Optional

import yt_dlp

logger = logging.getLogger(__name__)


@dataclass
class ReelData:
    """Extracted data from an Instagram Reel."""
    audio_path: str
    title: Optional[str] = None
    caption: Optional[str] = None
    creator_handle: Optional[str] = None
    hashtags: list[str] = None
    duration_seconds: Optional[float] = None
    thumbnail_url: Optional[str] = None

    def __post_init__(self):
        if self.hashtags is None:
            self.hashtags = []


class ReelExtractor:
    """Extracts audio and metadata from Instagram Reels using yt-dlp."""

    def __init__(self, output_dir: Optional[str] = None):
        self.output_dir = output_dir or tempfile.mkdtemp(prefix="reel2real_")

    def extract(self, url: str) -> ReelData:
        """
        Download audio and extract metadata from an Instagram Reel URL.
        
        Args:
            url: Instagram Reel URL
            
        Returns:
            ReelData with audio file path and metadata
            
        Raises:
            Exception: If extraction fails (private reel, invalid URL, etc.)
        """
        audio_path = os.path.join(self.output_dir, "audio.wav")

        ydl_opts = {
            "format": "bestaudio/best",
            "outtmpl": os.path.join(self.output_dir, "audio.%(ext)s"),
            "postprocessors": [{
                "key": "FFmpegExtractAudio",
                "preferredcodec": "wav",
                "preferredquality": "192",
            }],
            "quiet": True,
            "no_warnings": True,
            "extract_flat": False,
        }

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)

                # Extract metadata
                caption = info.get("description", "")
                creator = info.get("uploader", "") or info.get("channel", "")
                title = info.get("title", "")
                duration = info.get("duration", 0)
                thumbnail = info.get("thumbnail", "")

                # Extract hashtags from caption
                hashtags = []
                if caption:
                    hashtags = [
                        word.strip("#")
                        for word in caption.split()
                        if word.startswith("#")
                    ]

                logger.info(
                    f"Extracted reel: creator={creator}, "
                    f"duration={duration}s, hashtags={len(hashtags)}"
                )

                return ReelData(
                    audio_path=audio_path,
                    title=title,
                    caption=caption,
                    creator_handle=creator,
                    hashtags=hashtags,
                    duration_seconds=duration,
                    thumbnail_url=thumbnail,
                )

        except yt_dlp.utils.DownloadError as e:
            error_msg = str(e).lower()
            if "private" in error_msg or "login" in error_msg:
                raise ValueError(
                    "This reel is private or requires login. "
                    "Please use a public reel URL or provide the transcript manually."
                ) from e
            elif "not found" in error_msg or "404" in error_msg:
                raise ValueError(
                    "Reel not found. Please check the URL and try again."
                ) from e
            else:
                raise ValueError(
                    f"Failed to extract reel: {str(e)}"
                ) from e

    def cleanup(self):
        """Remove temporary audio files after processing."""
        import shutil
        if os.path.exists(self.output_dir):
            shutil.rmtree(self.output_dir, ignore_errors=True)
            logger.info(f"Cleaned up temp dir: {self.output_dir}")
