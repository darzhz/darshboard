"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

// Generate random activities
const generateActivities = () => {
  const activities = [
    "Updated dashboard layout",
    "Added new KPI widget",
    "Removed weather widget",
    "Changed theme settings",
    "Edited quick note",
    "Completed 3 tasks",
    "Rearranged widgets",
    "Added calendar events",
  ]

  const times = [
    "Just now",
    "5 minutes ago",
    "10 minutes ago",
    "30 minutes ago",
    "1 hour ago",
    "2 hours ago",
    "Yesterday",
    "2 days ago",
  ]

  return Array(4)
    .fill(0)
    .map((_, i) => ({
      id: i,
      activity: activities[Math.floor(Math.random() * activities.length)],
      time: times[Math.floor(Math.random() * times.length)],
    }))
}

export function RecentActivity() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    setActivities(generateActivities())
  }, [])

  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-2 text-sm font-medium text-gray-500">Recent Activity</h3>
      <div className="flex-1 overflow-auto">
        <ul className="space-y-2">
          {activities.map((item) => (
            <li key={item.id} className="flex items-start gap-2 text-sm">
              <Clock className="mt-0.5 h-3 w-3 shrink-0 text-gray-400" />
              <div>
                <p>{item.activity}</p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
