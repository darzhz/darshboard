"use client"

import { TrendingUp, TrendingDown } from "lucide-react"

export function ConversionRate({ title = "Conversion Rate", value = 3.2, trend = "up", comparedTo = "last week" }) {
  const Icon = trend === "up" ? TrendingUp : TrendingDown
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500"

  return (
    <div className="flex h-full flex-col justify-between">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{value}%</span>
          <div className={`flex items-center ${trendColor}`}>
            <Icon className="h-4 w-4" />
            <span className="text-xs">vs {comparedTo}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
