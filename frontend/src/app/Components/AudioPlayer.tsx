'use client';

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
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<any>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load the YouTube Player API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  const handleYouTubeSearch = async () => {
    if (!searchQuery) return;

    const response = await fetch(`https://windows-portfolio.onrender.com/youtube/search/?query=${encodeURIComponent(searchQuery)}`);
    
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

  // Define handleKeyPress inside the component
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleYouTubeSearch(); // Call the search function
    }
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);

    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: track.id,
        playerVars: { 
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          showinfo: 0,
          rel: 0,
          loop: 1,
          playsinline: 1,
        },
        height: '0',
        width: '0',
        events: {
          onReady: (event: any) => {
            event.target.setVolume(volume * 100);
            setDuration(event.target.getDuration());
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              if (progressInterval.current) clearInterval(progressInterval.current);
              progressInterval.current = setInterval(() => {
                setCurrentTime(event.target.getCurrentTime());
              }, 1000);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              if (progressInterval.current) clearInterval(progressInterval.current);
            }
          }
        }
      });
    }
  };

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (currentTrack) {
      const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
      const nextTrack = playlist[currentIndex + 1] || playlist[0];
      playTrack(nextTrack);
    }
  };

  const playPrevious = () => {
    if (currentTrack) {
      const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
      const previousTrack = playlist[currentIndex - 1] || playlist[playlist.length - 1];
      playTrack(previousTrack);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(e.target.value);
    setVolume(volumeValue);

    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(volumeValue * 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value) * duration;
    setCurrentTime(newTime);

    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(newTime, true);
    }
  };

  return (
    <Card className="w-full h-full bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border-none shadow-lg rounded-lg">
      <CardContent className="p-4 flex flex-col h-full">
        {/* Search Bar */}
        <div className="mb-4 flex items-center">
          <Input
            placeholder="Search for an artist or song"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress} // Add onKeyPress handler
            className="mr-2 bg-[#292929] text-white placeholder:text-gray-400 border-none rounded-full focus:ring-2 focus:ring-[#6b7280]"
          />
          <Button 
            onClick={handleYouTubeSearch} 
            className="bg-[#4b5563] hover:bg-[#374151] px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Search className="w-5 h-5 text-white" />
          </Button>
        </div>

        {/* Media Controls */}
        <div className="flex justify-between items-center mb-4">
          <Button size="icon" onClick={playPrevious} className="bg-[#4b5563] hover:bg-[#374151] p-2 rounded-full transition-transform transform hover:scale-105">
            <SkipBack />
          </Button>
          <Button size="icon" onClick={togglePlayPause} className="bg-[#4b5563] hover:bg-[#374151] p-2 rounded-full transition-transform transform hover:scale-105">
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button size="icon" onClick={playNext} className="bg-[#4b5563] hover:bg-[#374151] p-2 rounded-full transition-transform transform hover:scale-105">
            <SkipForward />
          </Button>
        </div>

        {/* Currently Playing Track */}
        <div className="text-center mb-4 text-zinc-300 text-xl font-semibold">
          {currentTrack ? `${currentTrack.name} by ${currentTrack.artist}` : 'No track selected'}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={duration ? currentTime / duration : 0} 
            onChange={handleProgressChange} 
            className="w-full cursor-pointer appearance-none h-2 bg-[#4b5563] rounded-full"
          />
        </div>

        {/* Playlist */}
        <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-[#4b5563] scrollbar-track-transparent">
          {playlist.map(track => (
            <div 
              key={track.id} 
              className="cursor-pointer p-3 mb-2 hover:bg-[#3c3c3c] bg-[#1f1f1f] rounded-md text-white/80 transition-all duration-200"
              onClick={() => playTrack(track)}
            >
              <div className="font-medium">{track.name}</div>
              <div className="text-xs text-gray-400">{track.artist}</div>
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
            className="w-full cursor-pointer"
          />
        </div>

        {/* Hidden YouTube IFrame for Audio-only */}
        <div id="youtube-player" style={{ display: 'none' }}></div>
      </CardContent>
    </Card>
  );
}
