from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
import os
import requests
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Add CORS middleware to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://windows-portfolio-bz2f.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# YouTube Data API key
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

# Root path route to handle requests to "/"
@app.get("/")
async def root():
    return {"message": "YouTube search API is running"}

# Endpoint to search for YouTube videos (tracks)
@app.get("/youtube/search/")
async def search_youtube(query: str):
    if not query:
        raise HTTPException(status_code=400, detail="Query parameter is required")

    # YouTube Data API search URL
    search_url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={query}&type=video&key={YOUTUBE_API_KEY}"
    
    response = requests.get(search_url)
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error searching YouTube")
    
    return response.json()

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))  # Use the PORT environment variable, default to 8000
    uvicorn.run(app, host="0.0.0.0", port=port)
