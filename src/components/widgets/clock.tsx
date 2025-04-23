"use client"

import { useState, useEffect } from "react"
import { ClockIcon } from "lucide-react"

export default function Clock() {
  const [time, setTime] = useState(new Date())
  const [timezone, setTimezone] = useState("local")

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = () => {
    if (timezone === "local") {
      return time.toLocaleTimeString()
    } else {
      return time.toLocaleTimeString([], { timeZone: timezone })
    }
  }

  const formatDate = () => {
    return time.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-2 text-sm font-medium text-gray-500">Clock</h3>
      <div className="flex flex-1 flex-col items-center justify-center">
        <ClockIcon className="mb-2 h-6 w-6 text-[#6551F3]" />
        <p className="text-2xl font-bold">{formatTime()}</p>
        <p className="text-xs text-gray-500">{formatDate()}</p>
        <select
          className="mt-2 rounded border border-gray-200 px-2 py-1 text-xs"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        >
          <option value="local">Local Time</option>
          <option value="America/New_York">New York</option>
          <option value="America/Los_Angeles">Los Angeles</option>
          <option value="Europe/London">London</option>
          <option value="Asia/Tokyo">Tokyo</option>
          <option value="Australia/Sydney">Sydney</option>
        </select>
      </div>
    </div>
  )
}
