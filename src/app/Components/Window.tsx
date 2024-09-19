import React, { ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Minus, Square } from 'lucide-react'

interface WindowProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const Window: React.FC<WindowProps> = ({ title, onClose, children }) => (
  <Card className="absolute w-2/3 h-2/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl">
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
)

export default Window