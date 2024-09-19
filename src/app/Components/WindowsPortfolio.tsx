"use client"

import { useState, ReactNode, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import Resume from './Resume'
import AboutMe from './AboutMe'
import Projects from './Projects'
import Contact from './Contact'
import ErrorBoundary from './ErrorBoundary'

interface WindowState {
  component: ReactNode;
  title: string;
}

export default function WindowsPortfolio() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([])
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)

  const openWindow = useCallback((component: ReactNode, title: string) => {
    try {
      setOpenWindows(prev => [...prev, { component, title }])
    } catch (error) {
      console.error("Error opening window:", error)
    }
  }, [])

  const closeWindow = useCallback((index: number) => {
    try {
      setOpenWindows(prev => prev.filter((_, i) => i !== index))
    } catch (error) {
      console.error("Error closing window:", error)
    }
  }, [])

  const toggleStartMenu = useCallback(() => {
    try {
      setIsStartMenuOpen(prev => !prev)
    } catch (error) {
      console.error("Error toggling start menu:", error)
    }
  }, [])

  return (
    <ErrorBoundary>
      <div className="h-screen w-full bg-[url('https://4kwallpapers.com/images/wallpapers/windows-11-windows-10-blue-stock-official-3840x2400-5630.jpg')] bg-cover bg-center flex flex-col">
        <div className="flex-grow p-4 relative">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <DesktopIcon icon="📄" label="Resume" onClick={() => openWindow(<Resume />, "Resume")} />
            <DesktopIcon icon="👤" label="About Me" onClick={() => openWindow(<AboutMe />, "About Me")} />
            <DesktopIcon icon="💼" label="Projects" onClick={() => openWindow(<Projects />, "Projects")} />
            <DesktopIcon icon="📞" label="Contact" onClick={() => openWindow(<Contact />, "Contact")} />
          </div>

          {openWindows.map((window, index) => (
            <Window key={index} title={window.title} onClose={() => closeWindow(index)}>
              {window.component}
            </Window>
          ))}
        </div>

        <div className="bg-primary/80 text-primary-foreground p-2 flex items-center backdrop-blur-sm">
          <Button variant="ghost" size="icon" onClick={toggleStartMenu} className="mr-4">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/2048px-Windows_logo_-_2012.svg.png" 
              alt="Windows Start"
              width={24}
              height={24}
            />
          </Button>
          {openWindows.map((window, index) => (
            <Button key={index} variant="secondary" size="sm" className="mr-2">
              {window.title}
            </Button>
          ))}
        </div>

        {isStartMenuOpen && (
          <Card className="absolute bottom-12 left-0 w-64 bg-primary/80 text-primary-foreground rounded-tr-lg shadow-lg backdrop-blur-sm">
            <CardContent className="p-4">
              <h3 className="mb-2 font-bold">Start Menu</h3>
              <Button variant="ghost" className="w-full justify-start" onClick={() => openWindow(<Resume />, "Resume")}>Resume</Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => openWindow(<AboutMe />, "About Me")}>About Me</Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => openWindow(<Projects />, "Projects")}>Projects</Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => openWindow(<Contact />, "Contact")}>Contact</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </ErrorBoundary>
  )
}