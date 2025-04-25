"use client"

import { useState, useEffect } from "react"
// import { Responsive, WidthProvider } from "react-grid-layout"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import { Plus, Edit, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { KpiCard } from "@/components/widgets/kpi-card"
import { MiniTrendGraph } from "@/components/widgets/mini-trend-graph"
import { ConversionRate } from "@/components/widgets/conversion-rate"
import { QuickNote } from "@/components/widgets/quick-note"
import { QuoteOfTheDay } from "@/components/widgets/quote-of-the-day"
import { RecentActivity } from "@/components/widgets/recent-activity"
import Clock  from "@/components/widgets/clock"
// const Clock :JSX.Element  = dynamic(()=> import("@/components/widgets/clock"),{ ssr: false });
import { CalendarEvents } from "@/components/widgets/calendar-events"
import { Weather } from "@/components/widgets/weather"
import { TaskChecklist } from "@/components/widgets/task-checklist"
import { SystemStatus } from "@/components/widgets/system-status"
import { WidgetSelector } from "@/components/widget-selector"
import { WidgetSettings } from "@/components/widget-settings"
import { widget, WidgetInfo, widgetLayout } from "@/types/widgets"
import dynamic from "next/dynamic"
import type { ResponsiveProps } from "react-grid-layout";
import { getLayout, upsertLayout } from "@/service/settings"
const ResponsiveReactGridLayout = dynamic<ResponsiveProps>(
  () => import("@/components/ResponsiveGridLayout"),
  { ssr: false }
);


// Define widget types
const widgetTypes: Record<string, React.FC<WidgetInfo>> = {
  kpiCard: KpiCard,
  // miniTrendGraph: MiniTrendGraph,
  // conversionRate: ConversionRate,
  // quickNote: QuickNote,
  quoteOfTheDay: QuoteOfTheDay,
  recentActivity: RecentActivity,
  clock: Clock,
  calendarEvents: CalendarEvents,
  weather: Weather,
  taskChecklist: TaskChecklist,
  systemStatus: SystemStatus,
}



// Default layouts for different screen sizes
const defaultLayouts: widgetLayout = {
  lg: [
    {
      i: "kpiCard-1",
      x: 0,
      y: 0,
      w: 3,
      h: 2,
      type: "kpiCard",
      title: "Total Sales",
      value: "₹1,24,000",
      icon: "trending-up",
    },
    { i: "miniTrendGraph-1", x: 3, y: 0, w: 3, h: 2, type: "miniTrendGraph", title: "Daily Visitors" },
    {
      i: "conversionRate-1",
      x: 6,
      y: 0,
      w: 3,
      h: 2,
      type: "conversionRate",
      title: "Conversion Rate",
      value: 3.2,
      trend: "up",
      comparedTo: "last week",
    },
    { i: "quickNote-1", x: 9, y: 0, w: 3, h: 2, type: "quickNote", content: "Meeting with team at 3 PM" },
    { i: "quoteOfTheDay-1", x: 0, y: 2, w: 3, h: 2, type: "quoteOfTheDay" },
    { i: "recentActivity-1", x: 3, y: 2, w: 3, h: 2, type: "recentActivity" },
    { i: "clock-1", x: 6, y: 2, w: 3, h: 2, type: "clock" },
    { i: "calendarEvents-1", x: 9, y: 2, w: 3, h: 2, type: "calendarEvents" },
    { i: "weather-1", x: 0, y: 4, w: 3, h: 2, type: "weather" },
    { i: "taskChecklist-1", x: 3, y: 4, w: 3, h: 2, type: "taskChecklist" },
    { i: "systemStatus-1", x: 6, y: 4, w: 3, h: 2, type: "systemStatus" },
  ],
  md: [
    {
      i: "kpiCard-1",
      x: 0,
      y: 0,
      w: 3,
      h: 2,
      type: "kpiCard",
      title: "Total Sales",
      value: "₹1,24,000",
      icon: "trending-up",
    },
    { i: "miniTrendGraph-1", x: 3, y: 0, w: 3, h: 2, type: "miniTrendGraph", title: "Daily Visitors" },
    {
      i: "conversionRate-1",
      x: 0,
      y: 2,
      w: 3,
      h: 2,
      type: "conversionRate",
      title: "Conversion Rate",
      value: 3.2,
      trend: "up",
      comparedTo: "last week",
    },
    { i: "quickNote-1", x: 3, y: 2, w: 3, h: 2, type: "quickNote", content: "Meeting with team at 3 PM" },
    { i: "quoteOfTheDay-1", x: 0, y: 4, w: 3, h: 2, type: "quoteOfTheDay" },
    { i: "recentActivity-1", x: 3, y: 4, w: 3, h: 2, type: "recentActivity" },
    { i: "clock-1", x: 0, y: 6, w: 3, h: 2, type: "clock" },
    { i: "calendarEvents-1", x: 3, y: 6, w: 3, h: 2, type: "calendarEvents" },
    { i: "weather-1", x: 0, y: 8, w: 3, h: 2, type: "weather" },
    { i: "taskChecklist-1", x: 3, y: 8, w: 3, h: 2, type: "taskChecklist" },
    { i: "systemStatus-1", x: 0, y: 10, w: 3, h: 2, type: "systemStatus" },
  ],
  sm: [
    {
      i: "kpiCard-1",
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      type: "kpiCard",
      title: "Total Sales",
      value: "₹1,24,000",
      icon: "trending-up",
    },
    { i: "miniTrendGraph-1", x: 0, y: 2, w: 2, h: 2, type: "miniTrendGraph", title: "Daily Visitors" },
    {
      i: "conversionRate-1",
      x: 0,
      y: 4,
      w: 2,
      h: 2,
      type: "conversionRate",
      title: "Conversion Rate",
      value: 3.2,
      trend: "up",
      comparedTo: "last week",
    },
    { i: "quickNote-1", x: 0, y: 6, w: 2, h: 2, type: "quickNote", content: "Meeting with team at 3 PM" },
    { i: "quoteOfTheDay-1", x: 0, y: 8, w: 2, h: 2, type: "quoteOfTheDay" },
    { i: "recentActivity-1", x: 0, y: 10, w: 2, h: 2, type: "recentActivity" },
    { i: "clock-1", x: 0, y: 12, w: 2, h: 2, type: "clock" },
    { i: "calendarEvents-1", x: 0, y: 14, w: 2, h: 2, type: "calendarEvents" },
    { i: "weather-1", x: 0, y: 16, w: 2, h: 2, type: "weather" },
    { i: "taskChecklist-1", x: 0, y: 18, w: 2, h: 2, type: "taskChecklist" },
    { i: "systemStatus-1", x: 0, y: 20, w: 2, h: 2, type: "systemStatus" },
  ],
  xs: [
    {
      i: "kpiCard-1",
      x: 0,
      y: 0,
      w: 1,
      h: 2,
      type: "kpiCard",
      title: "Total Sales",
      value: "₹1,24,000",
      icon: "trending-up",
    },
    { i: "miniTrendGraph-1", x: 0, y: 2, w: 1, h: 2, type: "miniTrendGraph", title: "Daily Visitors" },
    {
      i: "conversionRate-1",
      x: 0,
      y: 4,
      w: 1,
      h: 2,
      type: "conversionRate",
      title: "Conversion Rate",
      value: 3.2,
      trend: "up",
      comparedTo: "last week",
    },
    { i: "quickNote-1", x: 0, y: 6, w: 1, h: 2, type: "quickNote", content: "Meeting with team at 3 PM" },
    { i: "quoteOfTheDay-1", x: 0, y: 8, w: 1, h: 2, type: "quoteOfTheDay" },
    { i: "recentActivity-1", x: 0, y: 10, w: 1, h: 2, type: "recentActivity" },
    { i: "clock-1", x: 0, y: 12, w: 1, h: 2, type: "clock" },
    { i: "calendarEvents-1", x: 0, y: 14, w: 1, h: 2, type: "calendarEvents" },
    { i: "weather-1", x: 0, y: 16, w: 1, h: 2, type: "weather" },
    { i: "taskChecklist-1", x: 0, y: 18, w: 1, h: 2, type: "taskChecklist" },
    { i: "systemStatus-1", x: 0, y: 20, w: 1, h: 2, type: "systemStatus" },
  ],
}

export default function Dashboard() {
  const [layouts, setLayouts] = useState(() => {
    if (typeof window !== "undefined") {
      const savedLayouts = localStorage.getItem("dashboard-layouts")
      return savedLayouts ? JSON.parse(savedLayouts) : defaultLayouts
    }
    return defaultLayouts
  })


  const [widgets, setWidgets] = useState<widget[]>(() => {
      if (typeof window !== "undefined") {
        const savedWidgets = localStorage.getItem("dashboard-widgets")
        return savedWidgets ? JSON.parse(savedWidgets) : layouts.lg
      }
      return layouts.lg
    })

  const [showWidgetSelector, setShowWidgetSelector] = useState<boolean>(false)
  const [selectedWidget, setSelectedWidget] = useState<widget|null>(null)
  const [widgetOpacity, setWidgetOpacity] = useState(() => {
    if (typeof window !== "undefined") {
      const savedOpacity = localStorage.getItem("widget-opacity")
      return savedOpacity ? JSON.parse(savedOpacity) : {}
    }
    return {}
  })

  // Add edit mode state
  const [editMode, setEditMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dashboard-edit-mode") === "true"
    }
    return false
  })
  useEffect(()=>{
    getLayoutFromCacheOrDb()
  },[])

  // #TODO MAKE THIS WOKR SOMEHOW
  const getLayoutFromCacheOrDb = async () => {
    if (typeof window !== "undefined") {
      // const savedLayouts = localStorage.getItem("dashboard-layouts")
      // if (savedLayouts) {
      //   return JSON.parse(savedLayouts)
      // }

      try {
        // const response = await fetch("/api/dashboard-layouts")
        // const data = await response.json()
        // localStorage.setItem("dashboard-layouts", JSON.stringify(data))
        const responce = getLayout();
        console.log(responce);
      } catch (error) {
        console.error(error)
        return defaultLayouts
      }
    }
    return defaultLayouts
  }

  useEffect(() => {
    localStorage.setItem("dashboard-layouts", JSON.stringify(layouts))
  }, [layouts])

  useEffect(() => {
    localStorage.setItem("dashboard-widgets", JSON.stringify(widgets))
  }, [widgets])

  useEffect(() => {
    localStorage.setItem("widget-opacity", JSON.stringify(widgetOpacity))
  }, [widgetOpacity])

  useEffect(() => {
    localStorage.setItem("dashboard-edit-mode", editMode.toString())
  }, [editMode])

  const handleLayoutChange = (currentLayout: widgetLayout, allLayouts: widgetLayout) => {
    setLayouts(allLayouts)
  }

  const addWidget = (type: string) => {
    const newId = `${type}-${Date.now()}`
    const newWidget: widget = {
      i: newId,
      x: 0,
      y: 0,
      w: 3,
      h: 2,
      type,
    }

    setWidgets([...widgets, newWidget])
    setShowWidgetSelector(false)
  }

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((widget: { i: string }) => widget.i !== id))
  }

  const updateWidgetOpacity = (id: string, opacity: any) => {
    setWidgetOpacity({
      ...widgetOpacity,
      [id]: opacity.toString(),
    })
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const renderWidget = (widget: widget) => {
    const WidgetComponent = widgetTypes[widget?.type]
    if (!WidgetComponent) return null

    const opacity = widgetOpacity[widget?.i] || 1

    return (
      <div key={widget.i} className={`relative ${editMode ? "widget-edit-mode" : ""}`} style={{ opacity }}>
        {editMode && (
          <div className="absolute top-2 right-2 z-10 flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full bg-white/80 hover:bg-white"
              onClick={() => setSelectedWidget(widget)}
            >
              <span className="sr-only">Settings</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation()
                removeWidget(widget.i)
              }}
            >
              <span className="sr-only">Remove</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </Button>
          </div>
        )}
        <div
          className={`h-full w-full overflow-hidden rounded-lg bg-white p-4 shadow-md ${editMode ? "border-2 border-dashed border-[#6551F3]/40" : ""}`}
        >
          <WidgetComponent name={widgetTypes[widget.type].name} description={""} icon={""} />
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 mx-auto py-6  h-full flex-1  bg-white bg-[radial-gradient(#6551F3_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl  text-gray-900 font-extralight">Hey, Darsh</h1>
        <div className="flex gap-2">
          <Button
            onClick={toggleEditMode}
            className={`h-10 w-10 rounded-full ${editMode ? "bg-green-600 hover:bg-green-700" : "bg-[#6551F3]/40 hover:bg-[#5440e0]"}`}
          >
            {editMode ? (
              <>
                <Save className=" h-4 w-4" />
              </>
            ) : (
              <>
                <Edit className=" h-4 w-4" />
              </>
            )}
          </Button>
          {editMode && (
            <Button onClick={() => setShowWidgetSelector(true)} className="bg-[#6551F3] hover:bg-[#5440e0]">
              <Plus className="mr-2 h-4 w-4" />
              Add Widget
            </Button>
          )}
        </div>
      </div>

      <ResponsiveReactGridLayout
        className="layout flex flex-1"
        layouts={layouts}
        breakpoints={{ lg: 1100, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 6, sm: 2, xs: 1 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        isDraggable={editMode}
        isResizable={editMode}
        margin={[16, 16]}
        compactType="vertical"
        preventCollision={false}
      >
        {widgets.map(renderWidget)}
      </ResponsiveReactGridLayout>

      {showWidgetSelector && (
        <WidgetSelector
          onClose={() => setShowWidgetSelector(false)}
          onSelect={addWidget}
          widgetTypes={Object.keys(widgetTypes)}
        />
      )}

      {selectedWidget && (
        <WidgetSettings
          widget={selectedWidget}
          opacity={widgetOpacity[selectedWidget.i] || 1}
          onClose={() => setSelectedWidget(null)}
          onOpacityChange={(opacity: any) => updateWidgetOpacity(selectedWidget.i, opacity)}
        />
      )}
    </div>
  )
}
