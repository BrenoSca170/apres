"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { Sidebar } from "@/components/sidebar"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login")
    }
  }, [user, isLoading, router, pathname])

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and not on auth pages, don't render anything
  // (useEffect will redirect)
  if (!user && pathname !== "/login" && pathname !== "/signup") {
    return null
  }

  // If on auth pages and authenticated, redirect to dashboard
  if (user && (pathname === "/login" || pathname === "/signup")) {
    router.push("/")
    return null
  }

  // If on auth pages, render without sidebar
  if (pathname === "/login" || pathname === "/signup") {
    return <>{children}</>
  }

  // If authenticated and on protected pages, render with sidebar
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
