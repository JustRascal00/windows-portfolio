'use client'

import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, SkipForward, SkipBack, Search, Volume2 } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  artist: string;
}

export default function YouTubePlayer() {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState(1); // State for volume control
  const playerRef = useRef<any>(null); // Ref to store the YouTube player

  // Load the YouTube Player API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Function to search tracks using the backend YouTube API
  const handleYouTubeSearch = async () => {
    if (!searchQuery) return;

    const response = await fetch(`http://localhost:8000/youtube/search/?query=${encodeURIComponent(searchQuery)}`);
    
    if (!response.ok) {
      console.error("Error fetching data from YouTube:", response.status, response.statusText);
      return;
    }

    const data = await response.json();

    const tracks = data.items.map((item: any) => ({
      id: item.id.videoId,
      name: item.snippet.title,
      artist: item.snippet.channelTitle,
    }));

    setPlaylist(tracks);
  };

  // Function to play a selected track
  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);

    // Ensure the YouTube Player API is loaded
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: track.id,
        playerVars: { 
          autoplay: 1, 
          controls: 0,  // Hide controls
          modestbranding: 1,  // Minimal YouTube branding
          showinfo: 0,  // Hide video info
          rel: 0,  // Disable related videos at the end
          loop: 1,  // Loop the video (optional)
          playsinline: 1,  // Play inline on mobile devices
        },
        height: '0',  // Hide video by setting height and width to 0
        width: '0',   // Hide video by setting height and width to 0
        events: {
          onReady: (event: any) => {
            event.target.setVolume(volume * 100); // Set the volume when track starts
          }
        }
      });
    }
  };

  // Function to play the next track in the playlist
  const playNext = () => {
    if (currentTrack) {
      const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
      const nextTrack = playlist[currentIndex + 1] || playlist[0];
      playTrack(nextTrack);
    }
  };

  // Function to play the previous track in the playlist
  const playPrevious = () => {
    if (currentTrack) {
      const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
      const previousTrack = playlist[currentIndex - 1] || playlist[playlist.length - 1];
      playTrack(previousTrack);
    }
  };

  // Volume change handler
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(e.target.value);
    setVolume(volumeValue);

    // Adjust the YouTube player volume if the player exists
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(volumeValue * 100); // YouTube API expects volume between 0 and 100
    }
  };

  return (
    <Card className="w-full h-full bg-gradient-to-br from-[#1e1e1e] to-[#272727] border border-white/10 shadow-lg rounded-lg">
      <CardContent className="p-4 flex flex-col h-full">
        {/* Search Bar */}
        <div className="mb-4 flex items-center">
          <Input
            placeholder="Search for an artist or song"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mr-2 text-white"
          />
          <Button onClick={handleYouTubeSearch} className="bg-[#60a5fa] hover:bg-[#3b82f6]">
            <Search className="w-5 h-5 text-white" />
          </Button>
        </div>

        {/* Media Controls */}
        <div className="flex justify-between items-center mb-4">
          <Button size="icon" onClick={playPrevious} className="bg-[#60a5fa] hover:bg-[#3b82f6]"><SkipBack /></Button>
          <Button size="icon" onClick={() => setIsPlaying(!isPlaying)} className="bg-[#60a5fa] hover:bg-[#3b82f6]">
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button size="icon" onClick={playNext} className="bg-[#60a5fa] hover:bg-[#3b82f6]"><SkipForward /></Button>
        </div>

        {/* Currently Playing Track */}
        <div className="text-center mb-4 text-white">
          {currentTrack ? `${currentTrack.name} by ${currentTrack.artist}` : 'No track selected'}
        </div>

        {/* Playlist */}
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

        {/* Volume Control */}
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

        {/* Hidden YouTube IFrame for Audio-only */}
        <div id="youtube-player"></div> {/* Placeholder for YouTube API Player */}
      </CardContent>
    </Card>
  );
}
