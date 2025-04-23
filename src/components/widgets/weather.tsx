"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, CloudSun, CloudSnow } from "lucide-react"

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  "partly-cloudy": CloudSun,
  rainy: CloudRain,
  snowy: CloudSnow,
}

const weatherConditions = [
  { type: "sunny", temp: 28, location: "Mumbai", description: "Sunny" },
  { type: "cloudy", temp: 18, location: "Delhi", description: "Cloudy" },
  { type: "partly-cloudy", temp: 22, location: "Bangalore", description: "Partly Cloudy" },
  { type: "rainy", temp: 16, location: "Kolkata", description: "Light Rain" },
  { type: "snowy", temp: 2, location: "Shimla", description: "Light Snow" },
]

export function Weather() {
  const [weather, setWeather] = useState(weatherConditions[0])
  const [location, setLocation] = useState("Mumbai")

  useEffect(() => {
    // Simulate fetching weather data
    const selectedLocation = weatherConditions.find((w) => w.location === location) || weatherConditions[0]
    setWeather(selectedLocation)
  }, [location])

  const WeatherIcon = weatherIcons[weather.type]

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">Weather</h3>
        <select
          className="rounded border border-gray-200 px-2 py-1 text-xs"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {weatherConditions.map((w) => (
            <option key={w.location} value={w.location}>
              {w.location}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <WeatherIcon className="mb-2 h-10 w-10 text-[#6551F3]" />
        <p className="text-2xl font-bold">{weather.temp}°C</p>
        <p className="text-sm text-gray-500">{weather.description}</p>
        <p className="text-xs text-gray-400">{weather.location}</p>
      </div>
    </div>
  )
}
