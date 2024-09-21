import React, { ReactNode } from 'react';
import Draggable from 'react-draggable';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  children: ReactNode;
  position: { top: number; left: number };
  zIndex: number;
  fixedSize?: boolean;
  width?: number;
  height?: number;
}

const Window: React.FC<WindowProps> = ({
  title, onClose, onMinimize, onMaximize, isMaximized,
  children, position, zIndex, fixedSize = false, width = 350, height = 480
}) => (
  <Draggable
    defaultPosition={{ x: position.left, y: position.top }}
    bounds="parent"
    disabled={isMaximized}
  >
    <div
      className={`absolute ${isMaximized ? 'w-full h-full top-0 left-0' : fixedSize ? `w-[${width}px] h-[${height}px]` : 'w-1/2 h-1/2'}`}
      style={{ zIndex, cursor: isMaximized ? 'default' : 'move' }}
    >
      <Card className={`relative shadow-lg rounded-3xl border border-transparent bg-gray-800 transition-all duration-300 hover:shadow-2xl ${fixedSize ? `w-[${width}px] h-[${height}px]` : 'w-full h-full'}`}>
        {/* Window header with subtle gradient and modern font */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 text-gray-100 p-4 flex justify-between items-center rounded-t-3xl shadow-md">
          <span className="font-semibold text-xl tracking-wide">{title}</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={onMinimize} className="text-gray-100 hover:bg-gray-600 rounded-full">
              <Minus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onMaximize} className="text-gray-100 hover:bg-gray-600 rounded-full">
              <Square className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-100 hover:bg-gray-600 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Window content */}
        <CardContent className="p-4 h-[calc(100%-4rem)] overflow-hidden bg-gray-900 text-gray-200 rounded-b-3xl">
          {children}
        </CardContent>
      </Card>
    </div>
  </Draggable>
);

export default Window;
