from fastapi import FastAPI, HTTPException, Request
import os
from dotenv import load_dotenv
import requests
from base64 import b64encode
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()  # Load environment variables from .env file

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed for security; "*" allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")  # Make sure to set this in your .env file

# Function to get access token using Authorization Code Flow
@app.post("/getSpotifyAccessToken")
async def get_spotify_access_token(request: Request):
    body = await request.json()
    code = body.get('code')
    
    if not code:
        raise HTTPException(status_code=400, detail="Authorization code is required")
    
    token_url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode(),
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }

    response = requests.post(token_url, headers=headers, data=data)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching access token")

    token_data = response.json()
    return {"access_token": token_data["access_token"], "refresh_token": token_data["refresh_token"], "expires_in": token_data["expires_in"]}

# Function to get access token for search (client_credentials)
def get_access_token():
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()
    }
    data = {
        "grant_type": "client_credentials"
    }
    response = requests.post(url, headers=headers, data=data)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching access token")
    return response.json()["access_token"]

# Endpoint to search for tracks on Spotify using client_credentials
@app.get("/search/")
def search_tracks(query: str):
    token = get_access_token()
    search_url = f"https://api.spotify.com/v1/search?q={query}&type=track"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(search_url, headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error searching tracks")
    return response.json()
