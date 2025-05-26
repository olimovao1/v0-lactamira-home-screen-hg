"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function OnboardingCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  useEffect(() => {
    const checkOnboardingStatus = () => {
      const userProfile = localStorage.getItem("userProfile")
      const personalizedGuidance = localStorage.getItem("personalizedGuidance")

      if (userProfile && personalizedGuidance) {
        setHasCompletedOnboarding(true)
      } else {
        // Redirect to onboarding if not completed
        router.push("/onboarding")
        return
      }

      setIsChecking(false)
    }

    // Small delay to prevent flash
    const timer = setTimeout(checkOnboardingStatus, 100)
    return () => clearTimeout(timer)
  }, [router])

  if (isChecking) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-pink-600">Loading Lactamira...</p>
        </div>
      </div>
    )
  }

  if (!hasCompletedOnboarding) {
    return null // Will redirect to onboarding
  }

  return <>{children}</>
}
