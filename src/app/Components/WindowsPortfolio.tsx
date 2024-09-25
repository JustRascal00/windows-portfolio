'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import Resume from './Resume/Resume'
import AboutMe from './AboutMe'
import Projects from './Projects/Projects'
import Contact from './Contact'
import ErrorBoundary from './ErrorBoundary'
import styles from './WindowsPortfolio.module.css'
import Calculator from './Calculator/Calculator'
import Clock from './Clock'
import ContextMenu from './ContextMenu'
import Notepad from './Notepad'
import SearchBrowser from './SearchBrowser'
import Properties from './Properties'
import Github from './Github/Github';

interface WindowConfig {
  position: { top: number; left: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
}

interface WindowState {
  content: React.ReactNode;
  title: string;
  position: { top: number; left: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
}

interface DesktopIconData {
  icon: string;
  label: string;
  component: React.ReactNode;
}

const WindowsPortfolio: React.FC = () => {
  const [windows, setWindows] = useState<Array<{
    id: number;
    title: string;
    content: React.ReactNode;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    size: { width: number; height: number };
    position: { top: number; left: number };
    fixedSize?: boolean;
  }>>([]);

  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [zIndex, setZIndex] = useState<number>(1);
  const [minimizedWindows, setMinimizedWindows] = useState<WindowState[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [notepadCounter, setNotepadCounter] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [windowConfigs, setWindowConfigs] = useState<Record<string, WindowConfig>>({});
  const [wallpaper, setWallpaper] = useState<string>('https://4kwallpapers.com/images/wallpapers/windows-11-windows-10-blue-stock-official-3840x2400-5630.jpg');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [desktopIcons, setDesktopIcons] = useState<DesktopIconData[]>([
    { icon: "📄", label: "Resume", component: <Resume /> },
    { icon: "👤", label: "About Me", component: <AboutMe /> },
    { icon: "💼", label: "Projects", component: <Projects /> },
    { icon: "📞", label: "Contact", component: <Contact /> },
    { icon: "🧮", label: "Calculator", component: <Calculator /> },
    { icon: "🔍", label: "Search Browser", component: <SearchBrowser /> },
    { icon: "github", label: "GitHub", component: <Github /> }, // {{ edit_1 }}
    { icon: "📝", label: "Notepad", component: null },
  ]);

  const [wallpapers, setWallpapers] = useState<string[]>([
    'https://4kwallpapers.com/images/wallpapers/windows-11-windows-10-blue-stock-official-3840x2400-5630.jpg',
    'https://wallpaperaccess.com/full/1124103.jpg',
    'https://wallpaperaccess.com/full/12480.jpg',
    'https://wallpaperaccess.com/full/307140.jpg'
  ]);

  React.useEffect(() => {
    const storedConfigs = localStorage.getItem('windowConfigs');
    if (storedConfigs) {
      setWindowConfigs(JSON.parse(storedConfigs));
    }

    const storedWallpaper = localStorage.getItem('wallpaper');
    if (storedWallpaper) {
      setWallpaper(storedWallpaper);
    }

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

  const createWindow = (title: string, content: React.ReactNode) => {
    const newWindow = {
      id: Date.now(),
      title,
      content,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      size: title === "GitHub" ? { width: 715, height: 768 } : (title === "Calculator" ? { width: 240, height: 320 } : { width: 800, height: 600 }),
      position: title === "GitHub" ? { top: 11, left: 118 } : { 
        top: 100 + windows.length * 40,
        left: 100 + windows.length * 40 
      },
      fixedSize: title === "Calculator",
    };
    setWindows(prevWindows => [...prevWindows, newWindow]);
  };
  

  const closeWindow = (id: number) => {
    setWindows(prevWindows => prevWindows.filter(window => window.id !== id));
  };

  const toggleMinimize = (id: number) => {
    setWindows(prevWindows => prevWindows.map(window => 
      window.id === id ? { ...window, isMinimized: !window.isMinimized } : window
    ));
  };

  const toggleMaximize = (id: number) => {
    setWindows(prevWindows => prevWindows.map(window => 
      window.id === id ? { ...window, isMaximized: !window.isMaximized } : window
    ));
  };

  const updateWindowConfig = React.useCallback((title: string, config: Partial<WindowConfig>) => {
    setWindowConfigs(prev => {
      const newConfigs = {
        ...prev,
        [title]: { ...prev[title], ...config }
      };
      localStorage.setItem('windowConfigs', JSON.stringify(newConfigs));
      return newConfigs;
    });
  }, []);

  const toggleStartMenu = React.useCallback(() => {
    setIsStartMenuOpen(prev => !prev);
  }, []);

  const handleContextMenu = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = React.useCallback(() => {
    setContextMenu(null);
  }, []);

  const handleRefresh = React.useCallback(() => {
    
    setWindows([]);
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

  const openNotepad = React.useCallback(() => {
    createWindow("Notepad", <Notepad onOpenNotepad={openNotepad} />);
  }, [createWindow]);

  const handleWallpaperChange = React.useCallback((newWallpaper: string) => {
    setWallpaper(newWallpaper);
    localStorage.setItem('wallpaper', newWallpaper);
  }, []);

  const handleWallpaperUpload = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setWallpapers(prev => [...prev, result]);
        handleWallpaperChange(result);
      };
      reader.readAsDataURL(file);
    }
  }, [handleWallpaperChange]);

  const openWallpaperDialog = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const openProperties = React.useCallback(() => {
    createWindow(
      "Properties",
      <Properties
        wallpapers={wallpapers}
        currentWallpaper={wallpaper}
        onWallpaperChange={handleWallpaperChange}
        onWallpaperUpload={handleWallpaperUpload}
      />
    );
  }, [wallpapers, wallpaper, handleWallpaperChange, handleWallpaperUpload, createWindow]);

  const updateWindowSize = React.useCallback((id: number, newSize: { width: number; height: number }) => {
    setWindows(prevWindows => prevWindows.map(window => 
      window.id === id ? { ...window, size: newSize } : window
    ));
  }, []);

  const updateWindowPosition = React.useCallback((id: number, newPosition: { top: number; left: number }) => {
    setWindows(prevWindows => prevWindows.map(window => 
      window.id === id ? { ...window, position: newPosition } : window
    ));
  }, []);

  React.useEffect(() => {
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
        className={`${styles.parentContainer} h-screen w-full bg-cover bg-center flex flex-col`}
        style={{ backgroundImage: `url(${wallpaper})` }}
        onContextMenu={handleContextMenu}
      >
        <div className="flex-grow p-4 relative">
          <div className={`${styles.desktopGrid} absolute top-0 left-0 grid gap-2`}>
            {desktopIcons.map((icon, index) => (
              <DesktopIcon
                key={index}
                icon={icon.icon}
                label={icon.label}
                onClick={icon.label === "Notepad" ? openNotepad : () => createWindow(icon.label, icon.component)}
              />
            ))}
          </div>

          {windows.map((window, index) => (
            <Window
              key={window.id}
              title={window.title}
              content={window.content}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => toggleMinimize(window.id)}
              onMaximize={() => toggleMaximize(window.id)}
              isMaximized={window.isMaximized}
              isMinimized={window.isMinimized}
              position={window.position}
              size={window.size}
              zIndex={100 + index}
              windowIndex={index}
              onResize={(newSize) => updateWindowSize(window.id, newSize)}
              onMove={(newPosition) => updateWindowPosition(window.id, newPosition)}
              fixedSize={window.fixedSize}
            />
          ))}

          {contextMenu && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              onClose={closeContextMenu}
              onOpenWindow={(content, title) => createWindow(title, content)}
              onRefresh={handleRefresh}
              onOpenProperties={openProperties}
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
            {windows.map((window, index) => (
              <Button key={index} variant="secondary" size="sm" className="mr-2" onClick={() => toggleMinimize(window.id)}>
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
                      createWindow(icon.label, icon.component);
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

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleWallpaperUpload}
          accept="image/*"
        />
      </div>
    </ErrorBoundary>
  );
};

export default WindowsPortfolio;