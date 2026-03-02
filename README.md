# REEL2REAL

> Turn Instagram Reels into credible, bias-free learning roadmaps.

Reel2Real is an AI-powered web application that takes an Instagram Reel URL and transforms it into a structured learning roadmap. It strips hype, detects exaggerated claims, fills knowledge gaps, and builds honest learning paths backed by authoritative resources.

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Zustand (state management)
- TanStack Query (async data fetching)
- Framer Motion (animations)

### Backend
- Python + FastAPI
- Celery + Redis (task queue)
- yt-dlp (reel extraction)
- Sarvam AI (audio transcription)
- PaddleOCR (on-screen text extraction)
- Google Gemini API (content analysis, bias detection, roadmap generation)
- Tavily API (resource discovery)
- PostgreSQL + SQLModel (database)

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- API Keys: `GEMINI_API_KEY`, `SARVAM_API_KEY`, `TAVILY_API_KEY`

### Setup

```bash
# Clone the repo
git clone <repo-url>
cd Reel2Real

# Copy environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your API keys

# Start all services
docker compose up --build -d

# Start frontend dev server
cd frontend
npm install
npm run dev
```

### Services
| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost:5173   |
| API      | http://localhost:8000   |
| API Docs | http://localhost:8000/docs |

## Project Structure

```
Reel2Real/
├── frontend/          # React + Vite frontend
├── backend/           # FastAPI backend
│   ├── app/
│   │   ├── api/       # Route handlers
│   │   ├── models/    # SQLModel database models
│   │   ├── services/  # Business logic (extraction, transcription, AI)
│   │   ├── tasks/     # Celery background tasks
│   │   ├── config.py  # Settings & env vars
│   │   ├── db.py      # Database setup
│   │   ├── celery_app.py
│   │   └── main.py    # FastAPI entry point
│   ├── Dockerfile
│   └── pyproject.toml
├── docker-compose.yml
└── README.md
```

## License

MIT
