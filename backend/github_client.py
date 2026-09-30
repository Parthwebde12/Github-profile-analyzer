from typing import Optional

import httpx
from fastapi import HTTPException

GITHUB_API = "https://api.github.com"
HEADERS = {"Accept": "application/vnd.github+json"}


async def _get(path: str, username: str, params: Optional[dict] = None):
    try:
        async with httpx.AsyncClient(headers=HEADERS, timeout=10) as client:
            response = await client.get(f"{GITHUB_API}{path}", params=params)
    except httpx.RequestError:
        raise HTTPException(status_code=502, detail="Could not reach GitHub")

    if response.status_code == 404:
        raise HTTPException(status_code=404, detail=f"GitHub user '{username}' not found")
    if response.status_code == 403:
        raise HTTPException(status_code=429, detail="GitHub rate limit reached. Try again later.")
    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="Unexpected response from GitHub")

    return response.json()


async def get_user(username: str) -> dict:
    return await _get(f"/users/{username}", username)


async def get_repos(username: str) -> list:
    return await _get(
        f"/users/{username}/repos",
        username,
        {"per_page": 100, "sort": "updated"},
    )