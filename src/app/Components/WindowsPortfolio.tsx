'use client'

import React, { useState, ReactNode, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import Resume from './Resume/Resume'
import AboutMe from './AboutMe'
import Projects from './Projects'
import Contact from './Contact'
import ErrorBoundary from './ErrorBoundary'
import styles from './WindowsPortfolio.module.css'
import Calculator from './Calculator/Calculator'
import Clock from './Clock'
import ContextMenu from './ContextMenu'
import Notepad from './Notepad'
import SearchBrowser from './SearchBrowser'

interface WindowState {
  content: ReactNode;
  title: string;
  position: { top: number; left: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
}

interface DesktopIconData {
  icon: string;
  label: string;
  component: ReactNode;
}

export default function WindowsPortfolio() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [zIndex, setZIndex] = useState<number>(1);
  const [minimizedWindows, setMinimizedWindows] = useState<WindowState[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [notepadCounter, setNotepadCounter] = useState(0);
  const [isLocked, setIsLocked] = useState(true);

  const [desktopIcons, setDesktopIcons] = useState<DesktopIconData[]>([
    { icon: "📄", label: "Resume", component: <Resume /> },
    { icon: "👤", label: "About Me", component: <AboutMe /> },
    { icon: "💼", label: "Projects", component: <Projects /> },
    { icon: "📞", label: "Contact", component: <Contact /> },
    { icon: "🧮", label: "Calculator", component: <Calculator /> },
    { icon: "🔍", label: "Search Browser", component: <SearchBrowser /> },
    { icon: "📝", label: "Notepad", component: null },
  ]);

  useEffect(() => {
    const storedCounter = localStorage.getItem('notepadCounter');
    if (storedCounter) {
      setNotepadCounter(parseInt(storedCounter, 10));
    }

    const handleUnlock = () => {
      setIsLocked(false);
    };

    window.addEventListener('click', handleUnlock);
    window.addEventListener('keydown', handleUnlock);

    return () => {
      window.removeEventListener('click', handleUnlock);
      window.removeEventListener('keydown', handleUnlock);
    };
  }, []);

  const openWindow = useCallback((content: ReactNode, title: string) => {
    setOpenWindows(prev => {
      const offset = 50; // Increased from 30 to 50
      const lastWindow = prev[prev.length - 1];
      let newTop, newLeft;

      if (lastWindow) {
        newTop = lastWindow.position.top + offset;
        newLeft = lastWindow.position.left + offset;

        // If the new position would push the window too far, reset to initial position
        if (newTop > window.innerHeight - 300 || newLeft > window.innerWidth - 500) {
          newTop = 50;
          newLeft = 50;
        }
      } else {
        newTop = 50;
        newLeft = 50;
      }

      const newPosition = {
        top: newTop,
        left: newLeft
      };

      return [
        ...prev,
        { content, title, position: newPosition, zIndex, isMinimized: false, isMaximized: false }
      ];
    });
    setZIndex(prev => prev + 1);
  }, [zIndex]);

  const openNotepad = useCallback(() => {
    openWindow(<Notepad onOpenNotepad={openNotepad} />, "Notepad");
  }, [openWindow]);

  const closeWindow = useCallback((index: number) => {
    setOpenWindows(prev => prev.filter((_, i) => i !== index));
  }, []);

  const minimizeWindow = useCallback((index: number) => {
    setOpenWindows(prev => {
      const updatedWindows = [...prev];
      updatedWindows[index].isMinimized = true;
      setMinimizedWindows([...minimizedWindows, updatedWindows[index]]);
      return updatedWindows;
    });
  }, [minimizedWindows]);

  const maximizeWindow = useCallback((index: number) => {
    setOpenWindows(prev => {
      const updatedWindows = [...prev];
      updatedWindows[index].isMaximized = !updatedWindows[index].isMaximized;
      return updatedWindows;
    });
  }, []);

  const restoreWindow = useCallback((index: number) => {
    setOpenWindows(prev => {
      const updatedWindows = [...prev];
      updatedWindows[index].isMinimized = false;
      setMinimizedWindows(minimizedWindows.filter((_, i) => i !== index));
      return updatedWindows;
    });
  }, [minimizedWindows]);

  const toggleStartMenu = useCallback(() => {
    setIsStartMenuOpen(prev => !prev);
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const handleRefresh = useCallback(() => {
    
    setOpenWindows([]);
    setMinimizedWindows([]);
    setZIndex(1);
    setIsStartMenuOpen(false);
    closeContextMenu();

    const desktop = document.querySelector(`.${styles.parentContainer}`);
    if (desktop) {
      desktop.classList.add('refreshing');
      setTimeout(() => desktop.classList.remove('refreshing'), 500);
    }
  }, [closeContextMenu]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .refreshing {
        animation: refresh 0.5s ease-in-out;
      }
      @keyframes refresh {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (isLocked) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-white text-2xl cursor-pointer">
        <div className="text-center">
          <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/2048px-Windows_logo_-_2012.svg.png" 
            alt="Windows Logo"
            width={100}
            height={100}
            className="mb-4 mx-auto"
          />
          <p>Click anywhere or press any key to unlock</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div 
        className={`${styles.parentContainer} h-screen w-full bg-[url('https://4kwallpapers.com/images/wallpapers/windows-11-windows-10-blue-stock-official-3840x2400-5630.jpg')] bg-cover bg-center flex flex-col`}
        onContextMenu={handleContextMenu}
      >
        <div className="flex-grow p-4 relative">
          <div className={`${styles.desktopGrid} absolute top-0 left-0 grid gap-2`}>
            {desktopIcons.map((icon, index) => (
              <DesktopIcon
                key={index}
                icon={icon.icon}
                label={icon.label}
                onClick={icon.label === "Notepad" ? openNotepad : () => openWindow(icon.component, icon.label)}
              />
            ))}
          </div>

          {openWindows.map((window, index) => (
            !window.isMinimized && (
              <Window
                key={index}
                title={window.title}
                onClose={() => closeWindow(index)}
                onMinimize={() => minimizeWindow(index)}
                onMaximize={() => maximizeWindow(index)}
                isMaximized={window.isMaximized}
                position={window.position}
                zIndex={window.zIndex}
                fixedSize={window.title === "Calculator"}
                width={window.title === "Calculator" ? 320 : undefined}
                height={window.title === "Calculator" ? 400 : undefined}
                content={window.content}
              />
            )
          ))}

          {contextMenu && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              onClose={closeContextMenu}
              onOpenWindow={openWindow}
              onRefresh={handleRefresh}
            />
          )}
        </div>

        <div className="bg-primary/80 text-primary-foreground p-2 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleStartMenu} className="mr-4">
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/2048px-Windows_logo_-_2012.svg.png" 
                alt="Windows Start"
                width={24}
                height={24}
              />
            </Button>
            {openWindows.map((window, index) => (
              <Button key={index} variant="secondary" size="sm" className="mr-2" onClick={() => restoreWindow(index)}>
                {window.title}
              </Button>
            ))}
          </div>
          <Clock />
        </div>

        {isStartMenuOpen && (
          <Card className="absolute bottom-12 left-0 w-64 bg-primary/80 text-primary-foreground rounded-tr-lg shadow-lg backdrop-blur-sm">
            <CardContent className="p-4">
              <h3 className="mb-2 font-bold">Start Menu</h3>
              {desktopIcons.map((icon, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => {
                    if (icon.label === "Notepad") {
                      openNotepad();
                    } else {
                      openWindow(icon.component, icon.label);
                    }
                    setIsStartMenuOpen(false);
                  }}
                >
                  {icon.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </ErrorBoundary>
  );
}