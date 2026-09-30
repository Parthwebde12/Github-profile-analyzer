from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


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