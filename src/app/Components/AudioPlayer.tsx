'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, SkipForward, SkipBack, Upload } from 'lucide-react'

interface Track {
    id: string;
    name: string;
    url: string;
  }

export default function AudioPlayer() {
  const [playlist, setPlaylist] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const savedPlaylist = localStorage.getItem('audioPlaylist')
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('audioPlaylist', JSON.stringify(playlist))
  }, [playlist])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newTrack: Track = {
        id: Date.now().toString(),
        name: file.name,
        url: URL.createObjectURL(file)
      }
      setPlaylist(prev => [...prev, newTrack])
    }
  }

  const playTrack = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.src = track.url
      audioRef.current.play()
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const playNext = () => {
    if (currentTrack) {
      const currentIndex = playlist.findIndex(track => track.id === currentTrack.id)
      const nextTrack = playlist[currentIndex + 1] || playlist[0]
      playTrack(nextTrack)
    }
  }

  const playPrevious = () => {
    if (currentTrack) {
      const currentIndex = playlist.findIndex(track => track.id === currentTrack.id)
      const previousTrack = playlist[currentIndex - 1] || playlist[playlist.length - 1]
      playTrack(previousTrack)
    }
  }

  return (
    <Card className="w-full h-full bg-gradient-to-br from-[#1e1e1e] to-[#272727] border border-white/10 shadow-lg">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="mb-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex items-center justify-center p-2 bg-[#60a5fa] text-white rounded-md hover:bg-[#3b82f6] transition-colors">
              <Upload className="w-5 h-5 mr-2" />
              <span>Upload Audio</span>
            </div>
            <Input id="file-upload" type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
        <div className="flex justify-between items-center mb-4">
          <Button size="icon" onClick={playPrevious} className="bg-[#60a5fa] hover:bg-[#3b82f6]"><SkipBack /></Button>
          <Button size="icon" onClick={togglePlayPause} className="bg-[#60a5fa] hover:bg-[#3b82f6]">
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button size="icon" onClick={playNext} className="bg-[#60a5fa] hover:bg-[#3b82f6]"><SkipForward /></Button>
        </div>
        <div className="text-center mb-4 text-white">
          {currentTrack ? currentTrack.name : 'No track selected'}
        </div>
        <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-[#60a5fa] scrollbar-track-transparent">
          {playlist.map(track => (
            <div 
              key={track.id} 
              className="cursor-pointer p-2 hover:bg-black/20 text-white/80"
              onClick={() => playTrack(track)}
            >
              {track.name}
            </div>
          ))}
        </div>
        <audio ref={audioRef} onEnded={playNext} />
      </CardContent>
    </Card>
  )
}