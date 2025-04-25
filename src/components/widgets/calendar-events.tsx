"use client"

import { useState, useEffect } from "react"
import { CalendarIcon } from "lucide-react"

// Define the event type
interface Event {
  id: string
  title: string
  date: Date
  formattedTime: string
  formattedDate: string
}

// Generate random events for the week
const generateEvents = (): Event[] => {
  const events = [
    "Team Meeting",
    "Client Call",
    "Project Deadline",
    "Lunch with Team",
    "Product Demo",
    "Strategy Session",
    "Weekly Review",
    "Training Session",
  ]

  const today = new Date()
  const weekEvents: Event[] = []

  for (let i = 0; i < 5; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    const numEvents = Math.floor(Math.random() * 2) + 1

    for (let j = 0; j < numEvents; j++) {
      const hours = Math.floor(Math.random() * 8) + 9 // 9 AM to 5 PM
      const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)]

      date.setHours(hours, minutes)

      weekEvents.push({
        id: `${i}-${j}`,
        title: events[Math.floor(Math.random() * events.length)],
        date: new Date(date),
        formattedTime: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        formattedDate: date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }),
      })
    }
  }

  return weekEvents
}

export function CalendarEvents() {
  const [events, setEvents] = useState<Event[]>([]) // type the state for events
  const [view, setView] = useState<"today" | "week">("today") // type the view state

  useEffect(() => {
    setEvents(generateEvents())
  }, [])

  const today = new Date().toDateString()

  const filteredEvents = view === "today" ? events.filter((event) => event.date.toDateString() === today) : events

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">Calendar</h3>
        <select
          className="rounded border border-gray-200 px-2 py-1 text-xs"
          value={view}
          onChange={(e) => setView(e.target.value as "today" | "week")} // typecast the value
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
        </select>
      </div>
      <div className="flex-1 overflow-auto">
        {filteredEvents.length > 0 ? (
          <ul className="space-y-2">
            {filteredEvents.map((event) => (
              <li key={event.id} className="flex items-start gap-2 text-sm">
                <CalendarIcon className="mt-0.5 h-3 w-3 shrink-0 text-[#6551F3]" />
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-xs text-gray-400">
                    {view === "week" ? `${event.formattedDate}, ` : ""}
                    {event.formattedTime}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-gray-400">No events scheduled</p>
        )}
      </div>
    </div>
  )
}
