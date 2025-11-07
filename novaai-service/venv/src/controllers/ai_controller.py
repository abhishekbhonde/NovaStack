from fastapi import Request, HTTPException
from src.rag.retriever import query_ai

async def handle_query(request: Request):
    """Handle AI query request."""
    body = await request.json()
    question = body.get("query")
    if not question:
        raise HTTPException(status_code=400, detail="Missing 'query'")
    
    answer = query_ai(question)
    return {"success": True, "answer": answer}
