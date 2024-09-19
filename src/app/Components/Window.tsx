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
}

const Window: React.FC<WindowProps> = ({
  title, onClose, onMinimize, onMaximize, isMaximized,
  children, position, zIndex
}) => (
  <Draggable
    defaultPosition={{ x: position.left, y: position.top }}
    bounds="parent"
    disabled={isMaximized} // Disable dragging when maximized
  >
    <div
      className={`absolute ${isMaximized ? 'w-full h-full top-0 left-0' : 'w-1/2 h-1/2'}`}
      style={{ zIndex }}
    >
      <Card className="w-full h-full shadow-xl relative resize">
        <div className="bg-primary text-primary-foreground p-2 flex justify-between items-center cursor-move">
          <span>{title}</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={onMinimize}><Minus className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" onClick={onMaximize}><Square className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
          </div>
        </div>
        <CardContent className="p-4 h-[calc(100%-3rem)] overflow-auto">
          {children}
        </CardContent>
      </Card>
    </div>
  </Draggable>
);

export default Window;
