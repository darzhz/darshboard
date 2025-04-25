"use client"

import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, LucideIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const iconMap: { [key: string]: LucideIcon } = {
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  "dollar-sign": DollarSign,
  users: Users,
  "shopping-cart": ShoppingCart,
}

export function KpiCard({ title = "Total Sales", value = "₹1,24,000", icon = "trending-up" }) {
  const Icon = iconMap[icon] || TrendingUp
  const containerRef = useRef<HTMLDivElement>(null)
  const [iconSize, setIconSize] = useState(32) // default size in px

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateIconSize = () => {
      const height = container.offsetHeight
      // Icon size is 25% of container height, but clamped
      const newSize = Math.max(60, Math.min(100, height * 0.25))
      setIconSize(newSize)
    }

    updateIconSize()

    const observer = new ResizeObserver(() => {
      updateIconSize()
    })

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [])
  return (
    <div className="flex h-full flex-col justify-between"  ref={containerRef}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold">{value}</span>
        <div className="rounded-full bg-[#6551F3]/10 p-2 text-[#6551F3]"   style={{
            width: iconSize + 16,
            height: iconSize + 16,
          }}>
          <Icon className="opacity-15" style={{ width: iconSize, height: iconSize }} />
        </div>
      </div>
    </div>
  )
}
