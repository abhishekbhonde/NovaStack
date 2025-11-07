from fastapi import APIRouter, Request, Depends
from src.controllers.ai_controller import handle_query
from src.config.jwt_guard import verify_jwt

router = APIRouter()

@router.post("/query")
async def query_route(request: Request, user=Depends(verify_jwt)):
    return await handle_query(request)
