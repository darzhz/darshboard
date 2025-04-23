"use client"

import { useState, useEffect } from "react"
import { AreaChart, Area, ResponsiveContainer, XAxis } from "recharts"

// Generate random data for the past 7 days
const generateData = () => {
  const data = []
  const today = new Date()

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    data.push({
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
      value: Math.floor(Math.random() * 1000) + 500,
    })
  }

  return data
}

export function MiniTrendGraph({ title = "Daily Visitors" }) {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(generateData())
  }, [])

  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-2 text-sm font-medium text-gray-500">{title}</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6551F3" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6551F3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Area type="monotone" dataKey="value" stroke="#6551F3" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
