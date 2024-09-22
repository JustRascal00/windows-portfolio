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
}

const Window: React.FC<WindowProps> = ({
  title, onClose, onMinimize, onMaximize, isMaximized, isMinimized,
  content, position, zIndex, fixedSize = false, width = 950, height = 480
}) => {
  const [windowSize, setWindowSize] = useState({ width, height });
  const [windowPosition, setWindowPosition] = useState(position);
  const contentRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const resizingRef = useRef<string | null>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMaximized) {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      setWindowPosition({ top: 0, left: 0 });
    } else {
      let newWidth = width;
      let newHeight = height;

      if (contentRef.current) {
        const contentWidth = contentRef.current.scrollWidth;
        const contentHeight = contentRef.current.scrollHeight;
        newWidth = Math.min(Math.max(contentWidth + 40, 300), window.innerWidth - 100);
        newHeight = Math.min(Math.max(contentHeight + 100, 200), window.innerHeight - 100);
      }

      if (newWidth < 300 || newHeight < 200) {
        newWidth = 300;
        newHeight = 200;
      }

      setWindowSize({ width: newWidth, height: newHeight });
      setWindowPosition(position);
    }
  }, [isMaximized, width, height, position, content]);

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
    if (!isMaximized && !fixedSize && resizingRef.current) {
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
        setWindowPosition(prev => ({
          left: prev.left + dx,
          top: prev.top + dy
        }));
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
          className="absolute"
          style={{
            width: windowSize.width,
            height: windowSize.height,
            top: windowPosition.top,
            left: windowPosition.left,
            zIndex
          }}
          initial="closed"
          animate="open"
          exit={isMinimized ? "minimized" : "closed"}
          variants={variants}
        >
          <Card className="h-full shadow-lg rounded-3xl border border-gray-700 bg-gray-800/80 backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-2xl flex flex-col">
            <motion.div
              ref={titleBarRef}
              className="window-title bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-100 p-4 flex justify-between items-center rounded-t-3xl shadow-md cursor-move"
              onMouseDown={handleMouseDown}
              whileHover={{ backgroundColor: 'rgba(75, 85, 99, 0.9)' }}
            >
              <span className="font-semibold text-xl tracking-wide">{title}</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={onMinimize} className="text-gray-100 hover:bg-gray-700/50 rounded-full transition-colors duration-200">
                  <Minus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onMaximize} className="text-gray-100 hover:bg-gray-700/50 rounded-full transition-colors duration-200">
                  <Square className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-100 hover:bg-red-500/50 rounded-full transition-colors duration-200">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
            <CardContent className="p-0 flex-grow overflow-hidden bg-gray-900/80 text-gray-200 rounded-b-3xl custom-scrollbar">
              <motion.div
                ref={contentRef}
                className="h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {typeof content === 'string' ? (
                  <iframe
                    src={content}
                    title={title}
                    className="w-full h-full"
                    style={{ border: 'none' }}
                    allowFullScreen
                  />
                ) : (
                  content
                )}
              </motion.div>
            </CardContent>
          </Card>
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