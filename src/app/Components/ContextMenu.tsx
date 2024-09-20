'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
  onOpenWindow: (component: React.ReactNode, title: string) => void
  onRefresh: () => void
}

export default function ContextMenu({ x, y, onClose, onOpenWindow, onRefresh }: ContextMenuProps) {
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
    <Card className="context-menu absolute bg-primary/80 text-primary-foreground rounded shadow-lg backdrop-blur-sm" style={{ top: y, left: x }}>
      <CardContent className="p-2">
        <Button variant="ghost" className="w-full justify-start" onClick={() => onOpenWindow(<div>New Folder</div>, "New Folder")}>New Folder</Button>
        <Button variant="ghost" className="w-full justify-start" onClick={onRefresh}>Refresh</Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => onOpenWindow(<div>Properties</div>, "Properties")}>Properties</Button>
      </CardContent>
    </Card>
  )
}