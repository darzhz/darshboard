"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { WidgetInfo } from "@/types/widgets"



const widgetInfo: Record<string, WidgetInfo> = {
  kpiCard: {
    name: "KPI Card",
    description: "Title + large number with optional icon",
    icon: "📊",
  },
  miniTrendGraph: {
    name: "Mini Trend Graph",
    description: "Line chart for past 7 days",
    icon: "📈",
  },
  conversionRate: {
    name: "Conversion Rate",
    description: "Percentage with up/down icon",
    icon: "🔄",
  },
  quickNote: {
    name: "Quick Note",
    description: "Editable text area for notes",
    icon: "📝",
  },
  quoteOfTheDay: {
    name: "Quote of the Day",
    description: "Daily inspirational quote",
    icon: "💬",
  },
  recentActivity: {
    name: "Recent Activity",
    description: "List of recent activities",
    icon: "📋",
  },
  clock: {
    name: "Clock & Timezone",
    description: "Current time in selected zones",
    icon: "🕐",
  },
  calendarEvents: {
    name: "Calendar Events",
    description: "Today's or this week's events",
    icon: "📅",
  },
  weather: {
    name: "Weather",
    description: "Current location weather",
    icon: "🌦️",
  },
  taskChecklist: {
    name: "Task Checklist",
    description: "Small to-do list",
    icon: "✅",
  },
  systemStatus: {
    name: "System Status",
    description: "Health/status indicators",
    icon: "🖥️",
  },
}
interface WidgetSelectorProps {
  onClose: () => void
  onSelect: (widgetType: string) => void
  widgetTypes: string[]
}
export function WidgetSelector({ onClose, onSelect, widgetTypes }: WidgetSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredWidgets = widgetTypes.filter(
    (type) =>
      widgetInfo[type].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widgetInfo[type].description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search widgets..."
              className="w-full rounded-md border border-gray-300 p-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {filteredWidgets.map((type:any) => (
              <button
                key={type}
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 text-left hover:bg-gray-50"
                onClick={() => onSelect(type)}
              >
                <div className="text-2xl">{widgetInfo[type].icon}</div>
                <div>
                  <h3 className="font-medium">{widgetInfo[type].name}</h3>
                  <p className="text-sm text-gray-500">{widgetInfo[type].description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
