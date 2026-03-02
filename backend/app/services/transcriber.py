"""Audio transcription service using Sarvam AI API."""

import os
import base64
import logging
from dataclasses import dataclass
from typing import Optional

import httpx

from app.config import get_settings

logger = logging.getLogger(__name__)

SARVAM_API_URL = "https://api.sarvam.ai/speech-to-text-translate"


@dataclass
class TranscriptionResult:
    """Result from audio transcription."""
    transcript: str
    language_code: Optional[str] = None
    confidence: Optional[float] = None


class Transcriber:
    """Transcribes audio files using Sarvam AI's speech-to-text API."""

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or get_settings().SARVAM_API_KEY

    def transcribe(self, audio_path: str) -> TranscriptionResult:
        """
        Transcribe an audio file using Sarvam AI.

        Args:
            audio_path: Path to the audio file (WAV format recommended)

        Returns:
            TranscriptionResult with the transcript text

        Raises:
            ValueError: If the API key is missing or the file doesn't exist
            RuntimeError: If the API call fails
        """
        if not self.api_key or self.api_key == "your_sarvam_api_key_here":
            raise ValueError(
                "Sarvam AI API key is not configured. "
                "Please set SARVAM_API_KEY in your .env file."
            )

        if not os.path.exists(audio_path):
            raise FileNotFoundError(f"Audio file not found: {audio_path}")

        logger.info(f"Transcribing audio: {audio_path}")

        # Read and send the audio file
        with open(audio_path, "rb") as audio_file:
            files = {
                "file": ("audio.wav", audio_file, "audio/wav"),
            }
            data = {
                "model": "saarika:v2",
                "with_timestamps": "false",
            }
            headers = {
                "api-subscription-key": self.api_key,
            }

            try:
                with httpx.Client(timeout=120.0) as client:
                    response = client.post(
                        SARVAM_API_URL,
                        files=files,
                        data=data,
                        headers=headers,
                    )
                    response.raise_for_status()
                    result = response.json()

                    transcript = result.get("transcript", "")
                    language = result.get("language_code", "unknown")

                    logger.info(
                        f"Transcription complete: {len(transcript)} chars, "
                        f"language={language}"
                    )

                    return TranscriptionResult(
                        transcript=transcript,
                        language_code=language,
                    )

            except httpx.HTTPStatusError as e:
                error_detail = ""
                try:
                    error_detail = e.response.json().get("message", "")
                except Exception:
                    error_detail = e.response.text[:200]
                    
                raise RuntimeError(
                    f"Sarvam AI API error ({e.response.status_code}): {error_detail}"
                ) from e

            except httpx.RequestError as e:
                raise RuntimeError(
                    f"Failed to connect to Sarvam AI API: {str(e)}"
                ) from e


class MockTranscriber:
    """Mock transcriber for testing without API calls."""

    def transcribe(self, audio_path: str) -> TranscriptionResult:
        return TranscriptionResult(
            transcript=(
                "Hey guys, today I'm going to show you how to learn machine learning "
                "in just 30 days. First, you need to learn Python, which you can do "
                "in a weekend. Then just use ChatGPT to write all your code. "
                "This one course is all you need. Everyone is hiring ML engineers "
                "right now, and you don't even need math for ML. "
                "Trust me, I went from zero to ML engineer in one month."
            ),
            language_code="en",
            confidence=0.95,
        )
