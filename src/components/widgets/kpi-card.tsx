"use client"

import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart } from "lucide-react"

const iconMap = {
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  "dollar-sign": DollarSign,
  users: Users,
  "shopping-cart": ShoppingCart,
}

export function KpiCard({ title = "Total Sales", value = "₹1,24,000", icon = "trending-up" }) {
  const Icon = iconMap[icon] || TrendingUp

  return (
    <div className="flex h-full flex-col justify-between">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold">{value}</span>
        <div className="rounded-full bg-[#6551F3]/10 p-2 text-[#6551F3]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
