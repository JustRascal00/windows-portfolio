import React, { ReactNode } from 'react';
import Draggable from 'react-draggable';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  position: { top: number; left: number }; // Ensure this is included
  zIndex: number; // Ensure this is included
}

const Window: React.FC<WindowProps> = ({ title, onClose, children, position, zIndex }) => (
  <Draggable
    bounds="body"
  >
    <div
      className="absolute w-1/2 h-1/2 max-w-full max-h-full"
      style={{ top: position.top, left: position.left, zIndex }}
    >
      <Card className="w-full h-full shadow-xl relative">
        <div className="bg-primary text-primary-foreground p-2 flex justify-between items-center cursor-move">
          <span>{title}</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon"><Minus className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Square className="h-4 w-4" /></Button>
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
