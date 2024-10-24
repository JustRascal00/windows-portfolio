'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import Resume from './Resume/Resume'
import AboutMe from './AboutMe/AboutMe'
import Projects from './Projects/Projects'
import Contact from './Contact/Contact'
import ErrorBoundary from './ErrorBoundary'
import styles from './WindowsPortfolio.module.css'
import Calculator from './Calculator/Calculator'
import Clock from './Clock'
import ContextMenu from './ContextMenu'
import Notepad from './Notepad'
import SearchBrowser from './SearchBrowser'
import Properties from './Properties'
import Github from './Github/Github';
import AudioPlayer from './AudioPlayer/AudioPlayer'
import LanguageSelector from './LanguageSelector';
interface WindowConfig {
  position: { top: number; left: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
}

interface WindowState {
  id: number;
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  size: { width: number; height: number };
  position: { top: number; left: number };
  fixedSize?: boolean;
}

interface DesktopIconData {
  icon: string;
  label: string;
  component: React.ReactNode;
}

const WindowsPortfolio: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [zIndex, setZIndex] = useState<number>(1);
  const [minimizedWindows, setMinimizedWindows] = useState<WindowState[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [notepadCounter, setNotepadCounter] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [windowConfigs, setWindowConfigs] = useState<Record<string, WindowConfig>>({});
  const [wallpaper, setWallpaper] = useState<string>('https://4kwallpapers.com/images/wallpapers/windows-11-windows-10-blue-stock-official-3840x2400-5630.jpg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [desktopIcons, setDesktopIcons] = useState<DesktopIconData[]>([
    { icon: "📄", label: "Resume", component: <Resume /> },
    { icon: "👤", label: "About Me", component: <AboutMe /> },
    { icon: "💼", label: "Projects", component: <Projects /> },
    { icon: "📞", label: "Contact", component: <Contact /> },
    { icon: "🧮", label: "Calculator", component: <Calculator /> },
    { icon: "🔍", label: "Search Browser", component: <SearchBrowser /> },
    { icon: "github", label: "GitHub", component: <Github /> },
    { icon: "📝", label: "Notepad", component: null },
    { icon: "🎵", label: "Audio Player", component: <AudioPlayer /> },
  ]);

  const [wallpapers, setWallpapers] = useState<string[]>([
    'https://4kwallpapers.com/images/wallpapers/windows-11-windows-10-blue-stock-official-3840x2400-5630.jpg',
    'https://wallpaperaccess.com/full/1124103.jpg',
    'https://wallpaperaccess.com/full/12480.jpg',
    'https://wallpaperaccess.com/full/307140.jpg'
  ]);

  useEffect(() => {
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
      setIsUnlocking(true);
      setTimeout(() => {
        setIsLocked(false);
        setIsUnlocking(false);
      }, 1000);
    };

    if (isLocked && !isUnlocking) {
      window.addEventListener('click', handleUnlock);
      window.addEventListener('keydown', handleUnlock);
    }

    return () => {
      window.removeEventListener('click', handleUnlock);
      window.removeEventListener('keydown', handleUnlock);
    };
  }, [isLocked, isUnlocking]);

  const createWindow = useCallback((title: string, content: React.ReactNode) => {
    let windowSize = { width: 800, height: 600 };
    let fixedSize = false;

    if (title === "GitHub") {
      windowSize = { width: 715, height: 768 };
    } else if (title === "Calculator") {
      windowSize = { width: 240, height: 320 };
      fixedSize = true;
    } else if (title === "Audio Player") {
      windowSize = { width: 450, height: 550 };
      fixedSize = true;
    }

    const newWindow: WindowState = {
      id: Date.now(),
      title,
      content,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      size: windowSize,
      position: { 
        top: 100 + windows.length * 40,
        left: 100 + windows.length * 40 
      },
      fixedSize,
    };
    setWindows(prevWindows => [...prevWindows, newWindow]);
  }, [windows]);

  const closeWindow = useCallback((id: number) => {
    setWindows(prevWindows => prevWindows.filter(window => window.id !== id));
  }, []);

  const toggleMinimize = useCallback((id: number) => {
    setWindows(prevWindows => prevWindows.map(window => 
      window.id === id ? { ...window, isMinimized: !window.isMinimized } : window
    ));
  }, []);

  const toggleMaximize = useCallback((id: number) => {
    setWindows(prevWindows => prevWindows.map(window => 
      window.id === id ? { ...window, isMaximized: !window.isMaximized } : window
    ));
  }, []);

  const updateWindowConfig = useCallback((title: string, config: Partial<WindowConfig>) => {
    setWindowConfigs(prev => {
      const newConfigs = {
        ...prev,
        [title]: { ...prev[title], ...config }
      };
      localStorage.setItem('windowConfigs', JSON.stringify(newConfigs));
      return newConfigs;
    });
  }, []);

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

  const openNotepad = useCallback(() => {
    createWindow("Notepad", <Notepad onOpenNotepad={openNotepad} />);
  }, [createWindow]);

  const handleWallpaperChange = useCallback((newWallpaper: string) => {
    setWallpaper(newWallpaper);
    localStorage.setItem('wallpaper', newWallpaper);
  }, []);

  const handleWallpaperUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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

  const openProperties = useCallback(() => {
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

  const updateWindowSize = useCallback((id: number, newSize: { width: number; height: number }) => {
    setWindows(prevWindows => prevWindows.map(window => 
      window.id === id && !window.fixedSize ? { ...window, size: newSize } : window
    ));
  }, []);

  const updateWindowPosition = useCallback((id: number, newPosition: { top: number; left: number }) => {
    setWindows(prevWindows => prevWindows.map(window => 
      window.id === id ? { ...window, position: newPosition } : window
    ));
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body, html {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
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

  if (isLocked || isUnlocking) {
    return (
      <motion.div 
        className="fixed inset-0 bg-cover bg-center flex flex-col items-center justify-center text-white overflow-hidden"
        style={{ 
          backgroundImage: `url(${wallpaper})`,
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/2048px-Windows_logo_-_2012.svg.png" 
            alt="Windows Logo"
            width={100}
            height={100}
            className="mb-4 mx-auto"
          />
          <motion.h1 
            className="text-6xl font-bold mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </motion.h1>
          <motion.p
            className="text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </motion.p>
        </motion.div>
        {!isUnlocking && (
          <motion.p 
            className="absolute bottom-10 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            Click anywhere or press any key to unlock
          </motion.p>
        )}
        {isUnlocking && (
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </motion.div>
    );
  }

  return (
    <ErrorBoundary>
       <motion.div 
        className={`${styles.parentContainer} h-screen w-full bg-cover bg-center flex flex-col`}
        style={{ backgroundImage: `url(${wallpaper})` }}
        onContextMenu={handleContextMenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex-grow p-4 relative"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className={`${styles.desktopGrid} absolute top-0 left-0 grid gap-2`}>
            {desktopIcons.map((icon, index) => (
              <motion.div
                key={index}
                className={styles.desktopIcon}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <DesktopIcon
                  icon={icon.icon}
                  label={icon.label}
                  onClick={icon.label === "Notepad" ? openNotepad : () => createWindow(icon.label, icon.component)}
                />
              </motion.div>
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
        </motion.div>

        <motion.div 
          className="bg-primary/80 text-primary-foreground p-2 flex items-center justify-between backdrop-blur-sm"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
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
          <div className={styles.headerContainer}>
            <LanguageSelector />
            <Clock />
          </div>
        </motion.div>

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
      </motion.div>
    </ErrorBoundary>
  );
};

export default WindowsPortfolio;