# GitHub Profile Analyzer

A small full-stack app that analyzes any public GitHub profile: profile info, repositories, stars/forks, and a language breakdown. You can also compare two users side by side.

## Tech stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Backend:** FastAPI (Python), httpx
- **Data source:** GitHub REST API (no database needed)

## Project structure
```text
github-profile-analyzer/
├── frontend/   # Next.js app (UI)
└── backend/    # FastAPI app (calls GitHub, computes stats)
```

## Run locally

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\Activate.ps1        # Windows PowerShell
# source venv/bin/activate       # macOS / Linux
python -m pip install -r requirements.txt
python -m fastapi dev main.py
```
Runs at http://127.0.0.1:8000 (API docs at `/docs`).

### Frontend
Create `frontend/.env.local`:
```text
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```
Then:
```bash
cd frontend
npm install
npm run dev
```
Runs at http://localhost:3000.

## API endpoints
| Endpoint | Description |
|---|---|
| `GET /api/health` | Health check |
| `GET /api/profile/{username}` | Profile info |
| `GET /api/repos/{username}` | Repositories + computed stats |

## Environment variables
| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | frontend | Backend base URL |
| `ALLOWED_ORIGINS` | backend | Comma-separated frontend URLs allowed by CORS (default `http://localhost:3000`) |

## Limitations
- Unauthenticated GitHub API limit: 60 requests/hour per IP (each search uses 2, each comparison 4).
- Only the 100 most recently updated repositories are analyzed.
- Private repository counts are not available for other users through the GitHub API.