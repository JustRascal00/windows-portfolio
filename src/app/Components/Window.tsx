import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  isMinimized: boolean;
  content: ReactNode | string;
  position: { top: number; left: number };
  zIndex: number;
  fixedSize?: boolean;
  width?: number;
  height?: number;
  onResize: (size: { width: number; height: number }) => void;
  onMove: (position: { top: number; left: number }) => void;
  size: { width: number; height: number };
  windowIndex: number; // Add this new prop
}

const Window: React.FC<WindowProps> = ({
  title, onClose, onMinimize, onMaximize, isMaximized, isMinimized,
  content, position, zIndex, windowIndex, size, fixedSize = false
}) => {
  const [windowSize, setWindowSize] = useState(size);
  const [windowPosition, setWindowPosition] = useState(position);
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const resizingRef = useRef<string | null>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMaximized && !fixedSize) {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      setWindowPosition({ top: 0, left: 0 });
    } else {
      setWindowSize(size);
      setWindowPosition(position);
    }
  }, [isMaximized, position, size, fixedSize]);

  // Set specific size for Contact window
  useEffect(() => {
    if (title === "Contact") {
      setWindowSize({ width: 800, height: 582 });
    }
  }, [title]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (titleBarRef.current && !isMaximized) {
      titleBarRef.current.dataset.dragging = 'true';
      startPosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleResizeStart = (direction: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isMaximized && !fixedSize) {
      resizingRef.current = direction;
      startPosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleResize = (e: MouseEvent) => {
    if (!isMaximized && resizingRef.current && !fixedSize) {
      const dx = e.clientX - startPosRef.current.x;
      const dy = e.clientY - startPosRef.current.y;

      setWindowSize(prev => {
        let newWidth = prev.width;
        let newHeight = prev.height;

        if (resizingRef.current?.includes('e')) newWidth += dx;
        if (resizingRef.current?.includes('s')) newHeight += dy;
        if (resizingRef.current?.includes('w')) newWidth -= dx;
        if (resizingRef.current?.includes('n')) newHeight -= dy;

        return {
          width: Math.max(newWidth, 300),
          height: Math.max(newHeight, 200)
        };
      });

      setWindowPosition(prev => {
        let newTop = prev.top;
        let newLeft = prev.left;

        if (resizingRef.current?.includes('w')) newLeft += dx;
        if (resizingRef.current?.includes('n')) newTop += dy;

        return { top: newTop, left: newLeft };
      });

      startPosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (titleBarRef.current && titleBarRef.current.dataset.dragging === 'true') {
        const dx = e.clientX - startPosRef.current.x;
        const dy = e.clientY - startPosRef.current.y;

        setWindowPosition(prev => {
          const newLeft = Math.min(Math.max(prev.left + dx, 0), window.innerWidth - windowSize.width); 
          const newTop = Math.min(Math.max(prev.top + dy, 0), window.innerHeight - windowSize.height); 
          return { left: newLeft, top: newTop };
        });

        startPosRef.current = { x: e.clientX, y: e.clientY };
      } else if (resizingRef.current) {
        handleResize(e);
      }
    };

    const handleMouseUp = () => {
      if (titleBarRef.current) {
        titleBarRef.current.dataset.dragging = 'false';
      }
      resizingRef.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const variants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    },
    minimized: {
      opacity: 0,
      scale: 0.5,
      y: 100,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          ref={windowRef}
          className={`absolute rounded-lg overflow-hidden ${title === "Contact" ? "custom-contact-window" : ""}`} // Add custom class for Contact
          style={{
            width: windowSize.width,
            height: windowSize.height,
            top: windowPosition.top,
            left: windowPosition.left,
            zIndex,
          }}
          initial="closed"
          animate="open"
          exit={isMinimized ? "minimized" : "closed"}
          variants={variants}
        >
          <div className="flex flex-col h-full bg-[#1e1e1e] text-white">
            <div
              ref={titleBarRef}
              className="bg-[#2d2d2d] p-2 flex justify-between items-center cursor-move"
              onMouseDown={handleMouseDown}
            >
              <span className="font-semibold">{title}</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={onMinimize} className="text-gray-300 hover:bg-gray-700">
                  <Minus className="h-4 w-4" />
                </Button>
                {!fixedSize && (
                  <Button variant="ghost" size="sm" onClick={onMaximize} className="text-gray-300 hover:bg-gray-700">
                    <Square className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-300 hover:bg-red-600">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-grow overflow-hidden">
              {content}
            </div>
          </div>
          {!isMaximized && !fixedSize && (
            <>
              <div className="absolute top-0 left-0 right-0 h-1 cursor-n-resize" onMouseDown={handleResizeStart('n')} />
              <div className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize" onMouseDown={handleResizeStart('s')} />
              <div className="absolute top-0 left-0 bottom-0 w-1 cursor-w-resize" onMouseDown={handleResizeStart('w')} />
              <div className="absolute top-0 right-0 bottom-0 w-1 cursor-e-resize" onMouseDown={handleResizeStart('e')} />
              <div className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize" onMouseDown={handleResizeStart('nw')} />
              <div className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize" onMouseDown={handleResizeStart('ne')} />
              <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize" onMouseDown={handleResizeStart('sw')} />
              <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" onMouseDown={handleResizeStart('se')} />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;