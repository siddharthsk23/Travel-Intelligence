from fastapi import FastAPI

app = FastAPI(
    title="Travel Intelligence API",
    version="0.1.0",
    description="Backend API for the Travel Intelligence platform."
)


@app.get("/")
def root():
    return {
        "message": "Welcome to Travel Intelligence API"
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "Travel Intelligence API",
        "version": "0.1.0"
    }


