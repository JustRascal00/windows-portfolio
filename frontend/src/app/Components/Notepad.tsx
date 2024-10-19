'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, ChevronLeft } from 'lucide-react'

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

  const deleteNotepad = (name: string) => {
    const updatedList = notepadList.filter(item => item !== name);
    setNotepadList(updatedList);
    localStorage.setItem('notepadList', JSON.stringify(updatedList));
    localStorage.removeItem(`notepad-${name}`);
    if (selectedNotepad === name) {
      setSelectedNotepad(null);
      setContent('');
    }
  }

  const backToList = () => {
    setSelectedNotepad(null);
    setContent('');
  }

  if (!selectedNotepad) {
    return (
      <div className="p-4 h-full flex flex-col bg-gray-900 text-gray-100">
        <h2 className="text-lg font-bold mb-4">Notepads</h2>
        <div className="flex-grow overflow-auto mb-4">
          <ul className="space-y-2">
            {notepadList.map((name, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                <Button onClick={() => openNotepad(name)} variant="ghost" className="w-full justify-start text-gray-100 hover:text-gray-600">
                  {name}
                </Button>
                <Button onClick={() => deleteNotepad(name)} variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2">
          <Input
            value={newNotepadName}
            onChange={(e) => setNewNotepadName(e.target.value)}
            placeholder="New notepad name"
            className="bg-gray-800 text-gray-100 border-gray-700 focus:border-gray-500"
          />
          <Button onClick={createNewNotepad} className="bg-blue-600 hover:bg-blue-700 text-white">Create</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100">
      <div className="flex justify-between items-center p-2 bg-gray-800">
        <span className="font-semibold">{selectedNotepad}</span>
        <Button onClick={backToList} variant="ghost" className="text-gray-100 hover:text-gray-300">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Type your notes here..."
        className="flex-grow resize-none p-4 bg-gray-800 text-gray-100 focus:outline-none border-none"
        style={{ minHeight: '200px' }}
      />
    </div>
  )
}