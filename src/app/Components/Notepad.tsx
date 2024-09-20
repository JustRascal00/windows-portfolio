'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NotepadProps {
  onOpenNotepad: () => void;
}

export default function Notepad({ onOpenNotepad }: NotepadProps) {
  const [notepadList, setNotepadList] = useState<string[]>([]);
  const [selectedNotepad, setSelectedNotepad] = useState<string | null>(null);
  const [content, setContent] = useState('')
  const [newNotepadName, setNewNotepadName] = useState('')

  useEffect(() => {
    const storedList = localStorage.getItem('notepadList');
    if (storedList) {
      setNotepadList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    if (selectedNotepad) {
      const savedContent = localStorage.getItem(`notepad-${selectedNotepad}`);
      if (savedContent) {
        setContent(savedContent);
      } else {
        setContent('');
      }
    }
  }, [selectedNotepad]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (selectedNotepad) {
      localStorage.setItem(`notepad-${selectedNotepad}`, newContent);
    }
  }

  const createNewNotepad = () => {
    if (newNotepadName) {
      const updatedList = [...notepadList, newNotepadName];
      setNotepadList(updatedList);
      localStorage.setItem('notepadList', JSON.stringify(updatedList));
      setSelectedNotepad(newNotepadName);
      setNewNotepadName('');
    }
  }

  const openNotepad = (name: string) => {
    setSelectedNotepad(name);
  }

  if (!selectedNotepad) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Notepads</h2>
        <ul className="mb-4">
          {notepadList.map((name, index) => (
            <li key={index} className="mb-2">
              <Button onClick={() => openNotepad(name)}>{name}</Button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Input
            value={newNotepadName}
            onChange={(e) => setNewNotepadName(e.target.value)}
            placeholder="New notepad name"
          />
          <Button onClick={createNewNotepad}>Create</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2 bg-gray-100">
        <span>{selectedNotepad}</span>
        <Button onClick={() => setSelectedNotepad(null)}>Back to List</Button>
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Type your notes here..."
        className="flex-grow resize-none p-2 focus:outline-none"
      />
    </div>
  )
}