"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

const statusTypes = {
  online: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
  warning: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-50" },
  offline: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
}

const generateSystemStatus = () => {
  const statuses = ["online", "warning", "offline"]

  return [
    {
      id: 1,
      name: "Database",
      status: statuses[Math.floor(Math.random() * 2)], // Mostly online or warning
      metric: "CPU: 27%",
    },
    {
      id: 2,
      name: "API Server",
      status: statuses[Math.floor(Math.random() * 2)],
      metric: "Response: 120ms",
    },
    {
      id: 3,
      name: "Web Server",
      status: statuses[Math.floor(Math.random() * 2)],
      metric: "Load: 42%",
    },
    {
      id: 4,
      name: "Storage",
      status: statuses[Math.floor(Math.random() * 3)],
      metric: "Usage: 68%",
    },
  ]
}

export function SystemStatus() {
  const [systems, setSystems] = useState([])

  useEffect(() => {
    setSystems(generateSystemStatus())

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      setSystems(generateSystemStatus())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-2 text-sm font-medium text-gray-500">System Status</h3>
      <div className="flex-1 overflow-auto">
        <ul className="space-y-2">
          {systems.map((system) => {
            const { icon: StatusIcon, color, bg } = statusTypes[system.status]

            return (
              <li key={system.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <StatusIcon className={`h-4 w-4 ${color}`} />
                  <span>{system.name}</span>
                </div>
                <span className={`rounded px-2 py-0.5 text-xs ${bg} ${color}`}>{system.metric}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
