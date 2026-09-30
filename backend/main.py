from fastapi import FastAPI

app = FastAPI()


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