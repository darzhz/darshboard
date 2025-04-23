"use client"

import { useState, useEffect } from "react"

export function QuickNote({ content: initialContent = "Add a note here..." }) {
  const [content, setContent] = useState(initialContent)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Save to localStorage when content changes
    if (content !== initialContent) {
      localStorage.setItem(`note-${Date.now()}`, content)
    }
  }, [content, initialContent])

  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-2 text-sm font-medium text-gray-500">Quick Note</h3>
      {isEditing ? (
        <textarea
          className="flex-1 resize-none rounded border border-gray-200 p-2 text-sm focus:border-[#6551F3] focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <div className="flex-1 cursor-pointer overflow-auto text-sm" onClick={() => setIsEditing(true)}>
          {content}
        </div>
      )}
    </div>
  )
}
