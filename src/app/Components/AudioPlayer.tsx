'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, SkipForward, SkipBack, Search, Volume2 } from 'lucide-react'

interface Track {
  id: string;
  name: string;
  url: string;
  artist: string;
}

export default function AudioPlayer() {
  const [playlist, setPlaylist] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [volume, setVolume] = useState(1); // State for volume control
  const audioRef = useRef<HTMLAudioElement>(null)

  const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    const savedPlaylist = localStorage.getItem('audioPlaylist')
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist))
    }
  }, [])

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
          },
          body: 'grant_type=client_credentials'
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to get access token:", errorData);
          return;
        }

        const data = await response.json();
        if (data.access_token) {
          setAccessToken(data.access_token);
        } else {
          console.error("Access token not found in response.");
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, [SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET])

  useEffect(() => {
    localStorage.setItem('audioPlaylist', JSON.stringify(playlist))
  }, [playlist])

  const handleSearch = async () => {
    if (!searchQuery) return;

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.error("Error fetching data from Spotify:", response.status, response.statusText);
      return;
    }

    const data = await response.json();

    if (data.tracks && data.tracks.items) {
      const tracks = data.tracks.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        url: item.preview_url, // Still preview
        artist: item.artists[0]?.name
      }));

      setPlaylist(tracks);
    } else {
      console.error("No tracks found in response.");
    }
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = track.url || '';
      audioRef.current.play();
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  const playNext = () => {
    if (currentTrack) {
      const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
      const nextTrack = playlist[currentIndex + 1] || playlist[0];
      playTrack(nextTrack);
    }
  }

  const playPrevious = () => {
    if (currentTrack) {
      const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
      const previousTrack = playlist[currentIndex - 1] || playlist[playlist.length - 1];
      playTrack(previousTrack);
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(e.target.value);
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  }

  return (
    <Card className="w-full h-full bg-gradient-to-br from-[#1e1e1e] to-[#272727] border border-white/10 shadow-lg rounded-lg">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="mb-4 flex items-center">
          <Input
            placeholder="Search for an artist or song"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mr-2 text-white"
          />
          <Button onClick={handleSearch} className="bg-[#60a5fa] hover:bg-[#3b82f6]">
            <Search className="w-5 h-5 text-white" />
          </Button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <Button size="icon" onClick={playPrevious} className="bg-[#60a5fa] hover:bg-[#3b82f6]"><SkipBack /></Button>
          <Button size="icon" onClick={togglePlayPause} className="bg-[#60a5fa] hover:bg-[#3b82f6]">
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button size="icon" onClick={playNext} className="bg-[#60a5fa] hover:bg-[#3b82f6]"><SkipForward /></Button>
        </div>
        <div className="text-center mb-4 text-white">
          {currentTrack ? `${currentTrack.name} by ${currentTrack.artist}` : 'No track selected'}
        </div>
        <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-[#60a5fa] scrollbar-track-transparent">
          {playlist.map(track => (
            <div 
              key={track.id} 
              className="cursor-pointer p-2 hover:bg-black/20 text-white/80"
              onClick={() => playTrack(track)}
            >
              {track.name} by {track.artist}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-4">
          <Volume2 className="mr-2 text-white" />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={handleVolumeChange} 
            className="w-full" 
          />
        </div>
        <audio ref={audioRef} onEnded={playNext} />
      </CardContent>
    </Card>
  )
}
