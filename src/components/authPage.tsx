"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LucideLayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-mobile"
import { Toaster } from "./ui/sonner"
import { toast } from "sonner"

export default function AuthPage() {
  const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<"login" | "register">("login")
  const [showPassword, setShowPassword] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,email, password }),
      })

      if (res.ok) {
        // get token
        const data = await res.json()
        console.log(data);
        if(!data.token) {
          toast.error("Invalid Token : please try again")
          return
        }
        sessionStorage.setItem('authToken', data?.token)
        sessionStorage.setItem('userId',data?.userId)
        sessionStorage.setItem('name',data?.name)
        router.push("/dashboard")
      } else {
        const data = await res.json()
        toast.error(data.error || "Something went wrong")
      }
    } catch  {
      alert("An error occurred. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F7F5FE]">
      {/* Illustration Section - Hidden on Mobile */}
      {!isMobile && (
        <div className="hidden w-1/2 flex-col items-center justify-center bg-[#F7F5FE] p-10 md:flex">
          <div className="flex flex-col items-center justify-center">
            <LucideLayoutDashboard className="mb-4 h-16 w-16 text-[#6551F3]" />
            <h1 className="mb-6 text-3xl font-bold text-gray-900">DarshBoard</h1>
            <div className="relative h-[400px] w-full max-w-md">
              <DashboardIllustration />
            </div>
            <p className="mt-6 max-w-md text-center text-gray-600">
              A dynamic, customizable, and funky baked dashboard for your
               needs, created by Darsh S Kumar.
            </p>
          </div>
        </div>
      )}

      {/* Auth Form Section */}
      <div className={cn("flex w-full flex-col items-center justify-center p-6 md:p-10", !isMobile && "w-1/2")}>
        <Toaster />
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-gray-500">
              {mode === "login"
                ? "Enter your credentials to access your account"
                : "Enter your information to create an account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
         {mode === "register" && <div className="space-y-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-300 focus-visible:ring-[#6551F3]"
              />
            </div>}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300 focus-visible:ring-[#6551F3]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-300 pr-10 focus-visible:ring-[#6551F3]"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#6551F3] hover:bg-[#5344d1]">
              {mode === "login" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="text-center text-sm">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button
              variant="link"
              className="h-auto p-0 text-[#6551F3]"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="400" height="300" rx="8" fill="#F7F5FE" />

      {/* Dashboard Header */}
      <rect x="40" y="30" width="320" height="40" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
      <rect x="50" y="42" width="100" height="16" rx="2" fill="#6551F3" opacity="0.7" />
      <circle cx="340" cy="50" r="10" fill="#6551F3" />

      {/* Sidebar */}
      <rect x="40" y="80" width="80" height="190" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
      <rect x="50" y="100" width="60" height="8" rx="2" fill="#6551F3" opacity="0.6" />
      <rect x="50" y="120" width="60" height="8" rx="2" fill="#CBD5E0" />
      <rect x="50" y="140" width="60" height="8" rx="2" fill="#CBD5E0" />
      <rect x="50" y="160" width="60" height="8" rx="2" fill="#CBD5E0" />
      <rect x="50" y="180" width="60" height="8" rx="2" fill="#CBD5E0" />

      {/* Main Content */}
      <rect x="130" y="80" width="230" height="90" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
      <rect x="145" y="95" width="80" height="10" rx="2" fill="#2D3748" />
      <rect x="145" y="115" width="200" height="40" rx="2" fill="#6551F3" opacity="0.1" />
      <rect x="155" y="125" width="120" height="20" rx="2" fill="#6551F3" opacity="0.7" />

      {/* Charts */}
      <rect x="130" y="180" width="110" height="90" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
      <circle cx="185" cy="225" r="30" fill="transparent" stroke="#6551F3" strokeWidth="10" strokeDasharray="120 188" />
      <circle cx="185" cy="225" r="30" fill="transparent" stroke="#CBD5E0" strokeWidth="10" />

      <rect x="250" y="180" width="110" height="90" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
      <rect x="260" y="200" width="90" height="5" rx="1" fill="#CBD5E0" />
      <rect x="260" y="215" width="70" height="5" rx="1" fill="#6551F3" opacity="0.7" />
      <rect x="260" y="230" width="50" height="5" rx="1" fill="#6551F3" />
      <rect x="260" y="245" width="80" height="5" rx="1" fill="#CBD5E0" />
    </svg>
  )
}
