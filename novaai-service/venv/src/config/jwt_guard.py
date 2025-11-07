import os 
import requests
from fastapi import Request, HttpException

AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://localhost:4001")

async def verify_jwt(request:Request):
    """verify jwt token by calling auth service url """
    auth_header = requests.header.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer"):
        raise HttpException(status_code=401, detail="Missing Authrization error")

    token = auth_header_split(" ")[1]

    try:
        response = requests.post(f"{AUTH_SERVICE_URL}/auth/validate", json={"token":token})
        if response.status_code !=200:
            raise HttpException(status_code=401, detail"Invalid token")
        return response.json()["data"]["user"]
    except Exception:
        raise HttpException(status_code=401, detail="Token validation detail")