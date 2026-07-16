from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.items import router as items_router

app = FastAPI(title="Angular + Playwright Demo API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items_router)


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "fastapi-demo"}
