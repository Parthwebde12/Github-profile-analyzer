from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from github_client import get_repos, get_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "GitHub Profile Analyzer API is running"}


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/hello/{name}")
def hello(name: str, excited: bool = False):
    greeting = f"Hello, {name}"
    if excited:
        greeting += "!"
    return {"greeting": greeting}

@app.get("/api/profile/{username}")
async def profile(username: str):
    user = await get_user(username)
    return {
        "username": user["login"],
        "name": user["name"],
        "avatar_url": user["avatar_url"],
        "bio": user["bio"],
        "followers": user["followers"],
        "following": user["following"],
        "public_repos": user["public_repos"],
        "created_at": user["created_at"],
        "html_url": user["html_url"],
    }

@app.get("/api/repos/{username}")
async def repos(username: str):
    data = await get_repos(username)
    return [
        {
            "name": r["name"],
            "description": r["description"],
            "html_url": r["html_url"],
            "stars": r["stargazers_count"],
            "forks": r["forks_count"],
            "language": r["language"],
            "updated_at": r["updated_at"],
            "is_fork": r["fork"],
        }
        for r in data
    ]