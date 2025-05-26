"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Language } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Load language from localStorage or user profile
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language
    const userProfile = localStorage.getItem("userProfile")

    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else if (userProfile) {
      const profile = JSON.parse(userProfile)
      if (profile.preferredLanguage) {
        setLanguage(profile.preferredLanguage)
      }
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("preferredLanguage", lang)

    // Also update user profile if it exists
    const userProfile = localStorage.getItem("userProfile")
    if (userProfile) {
      const profile = JSON.parse(userProfile)
      profile.preferredLanguage = lang
      localStorage.setItem("userProfile", JSON.stringify(profile))
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
