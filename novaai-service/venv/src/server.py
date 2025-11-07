import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import ai_routes

load_dotenv()
PORT = int(os.getenv("PORT", 4010))

app = FastAPI(title="NovaAI Service", version="1.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Register routes
app.include_router(ai_routes.router, prefix="/ai", tags=["AI"])

@app.get("/health")
def health():
    return {"status": "ok", "service": "novaai-service"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
