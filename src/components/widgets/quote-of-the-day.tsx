"use client"

import { useState, useEffect } from "react"
import { Quote } from "lucide-react"

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
]

export function QuoteOfTheDay() {
  const [quote, setQuote] = useState(quotes[0])

  useEffect(() => {
    // Get a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex])
  }, [])

  return (
    <div className="flex h-full flex-col justify-between">
      <h3 className="mb-2 text-sm font-medium text-gray-500">Quote of the Day</h3>
      <div className="flex flex-1 flex-col justify-center">
        <Quote className="mb-2 h-6 w-6 text-[#6551F3]" />
        <p className="text-sm italic">"{quote.text}"</p>
        <p className="mt-2 text-right text-xs font-medium">— {quote.author}</p>
      </div>
    </div>
  )
}
