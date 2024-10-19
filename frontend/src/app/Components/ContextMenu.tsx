'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Properties from './Properties'

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
  onOpenWindow: (component: React.ReactNode, title: string) => void
  onRefresh: () => void
  onOpenProperties: () => void
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onOpenWindow, onRefresh, onOpenProperties }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.context-menu')) {
        onClose()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [onClose])

  return (
    <Card className="absolute bg-primary/80 text-primary-foreground rounded shadow-lg backdrop-blur-sm" style={{ top: y, left: x }}>
      <CardContent className="p-2">
        <Button variant="ghost" className="w-full justify-start" onClick={() => onOpenWindow(<div>New Folder</div>, "New Folder")}>New Folder</Button>
        <Button variant="ghost" className="w-full justify-start" onClick={onRefresh}>Refresh</Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={() => {
            onOpenProperties();
            onClose();
          }}
        >
          Properties
        </Button>
      </CardContent>
    </Card>
  )
}

export default ContextMenu