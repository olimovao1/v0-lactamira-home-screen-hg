"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Baby, Calendar, Heart, User, Loader2, Bot, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { useTranslation } from "@/lib/translations"
import { LanguageSelector } from "@/components/language-selector"
import { AIProviderSelector } from "@/components/ai-provider-selector"
import { formatAIResponse, getLanguageSpecificGreeting } from "@/lib/ai-helpers"

interface UserProfile {
  yearOfBirth: string
  pregnancyStatus: string
  numberOfChildren: string
  childAge: string
  healthConcerns: string
  preferredLanguage: string
  babyName: string
  breastfeedingStatus: string
  aiProvider: "openai" | "gemini"
  selectedGuidanceAreas: string[]
}

export default function OnboardingPage() {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const t = useTranslation(language)

  const [currentStep, setCurrentStep] = useState(1)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    yearOfBirth: "",
    pregnancyStatus: "",
    numberOfChildren: "",
    childAge: "",
    healthConcerns: "",
    preferredLanguage: language,
    babyName: "",
    breastfeedingStatus: "",
    aiProvider: "gemini",
    selectedGuidanceAreas: ["Emizish", "Ovqatlanish", "Chaqaloq rivojlanishi", "Hayz tsiklini kuzatish"],
  })
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const [error, setError] = useState("")

  // Check if user has completed onboarding
  useEffect(() => {
    const existingData = localStorage.getItem("userProfile")
    const existingGuidance = localStorage.getItem("personalizedGuidance")

    if (existingData && existingGuidance) {
      setIsFirstVisit(false)
      setAiResponse(existingGuidance)
      setUserProfile(JSON.parse(existingData))
    } else {
      setIsFirstVisit(true)
    }
  }, [])

  // Update language when user changes it
  useEffect(() => {
    setUserProfile((prev) => ({ ...prev, preferredLanguage: language }))
  }, [language])

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile))
    setLoading(true)
    setError("")

    try {
      // Choose API endpoint based on selected provider
      const endpoint = userProfile.aiProvider === "gemini" ? "/api/generate-guidance-gemini" : "/api/generate-guidance"

      console.log("Submitting to endpoint:", endpoint)
      console.log("User profile:", userProfile)

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userProfile }),
      })

      console.log("Response status:", res.status)

      if (!res.ok) {
        const errorText = await res.text()
        console.error("API Error:", res.status, errorText)
        throw new Error(`API Error: ${res.status} - ${errorText}`)
      }

      const data = await res.json()
      console.log("Received data:", data)

      if (data.result) {
        localStorage.setItem("personalizedGuidance", data.result)
        localStorage.setItem("selectedAIProvider", userProfile.aiProvider)
        setAiResponse(data.result)
        setIsFirstVisit(false)

        // Show success message if fallback was used
        if (data.fallback) {
          setError("AI service temporarily unavailable. Using backup guidance.")
        }
      } else {
        throw new Error("No guidance received from API")
      }
    } catch (error) {
      console.error("Error generating guidance:", error)
      setError(error.message || "Failed to generate guidance")

      // Language-specific fallback guidance
      const fallbackGuidance = {
        en: `${t.greetings.welcome}! Based on your profile, here are some general recommendations:

1. **${t.nav.feeding}**: Aim for 8-12 feeding sessions per day for newborns
2. **${t.nav.nutrition}**: Focus on iron-rich foods, calcium, and staying hydrated
3. **Rest**: Sleep when your baby sleeps to aid recovery
4. **Support**: Don't hesitate to reach out to healthcare providers with questions

We're here to support you on your maternal health journey!`,

        ru: `${t.greetings.welcome}! На основе вашего профиля, вот несколько общих рекомендаций:

1. **${t.nav.feeding}**: Стремитесь к 8-12 сеансам кормления в день для новорожденных
2. **${t.nav.nutrition}**: Сосредоточьтесь на продуктах, богатых железом, кальции и поддержании гидратации
3. **Отдых**: Спите, когда спит ваш малыш, для восстановления
4. **Поддержка**: Не стесняйтесь обращаться к медицинским работникам с вопросами

Мы здесь, чтобы поддержать вас на пути материнского здоровья!`,

        uz: `${t.greetings.welcome}! Profilingiz asosida, umumiy tavsiyalar:

1. **${t.nav.feeding}**: Yangi tug'ilgan chaqaloqlar uchun kuniga 8-12 ta emizish seansiga intiling
2. **${t.nav.nutrition}**: Temirga boy ovqatlar, kaltsiy va gidratatsiyani saqlashga e'tibor bering
3. **Dam olish**: Tiklanish uchun chaqaloqingiz uxlayotganda uxlang
4. **Qo'llab-quvvatlash**: Savollar bilan tibbiy xodimlarga murojaat qilishdan tortinmang

Biz sizni onalik salomatligi yo'lida qo'llab-quvvatlash uchun shu yerdamiz!`,
      }

      const selectedFallback = fallbackGuidance[language] || fallbackGuidance.en
      localStorage.setItem("personalizedGuidance", selectedFallback)
      setAiResponse(selectedFallback)
      setIsFirstVisit(false)
    } finally {
      setLoading(false)
    }
  }

  const calculateAge = (yearOfBirth: string): number => {
    if (!yearOfBirth) return 0
    const currentYear = new Date().getFullYear()
    return currentYear - Number.parseInt(yearOfBirth)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return userProfile.yearOfBirth
      case 2:
        return userProfile.pregnancyStatus && userProfile.numberOfChildren
      case 3:
        return userProfile.babyName
      case 4:
        return userProfile.selectedGuidanceAreas.length > 0
      case 5:
        return true // AI provider selection is optional
      case 6:
        return true // Health concerns are optional
      default:
        return false
    }
  }

  // Show personalized guidance if user has completed onboarding
  if (!isFirstVisit && aiResponse) {
    return (
      <div className="min-h-screen bg-pink-50">
        <header className="bg-white shadow-md p-4 sticky top-0 z-10">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="mr-4">
                  <ArrowLeft className="w-6 h-6 text-pink-600" />
                </Link>
                <h1 className="text-xl font-bold text-pink-800">{t.onboarding.personalizedGuide}</h1>
              </div>
              <LanguageSelector />
            </div>
          </div>
        </header>

        <main className="container mx-auto p-4">
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <Heart className="w-5 h-5" />
              </div>
              {getLanguageSpecificGreeting(language, userProfile.babyName)}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-yellow-800 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="bg-pink-50 p-4 rounded-xl">
                <h3 className="font-semibold text-pink-800 mb-2">{t.onboarding.profileSummary}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">{t.home.age}:</span> {calculateAge(userProfile.yearOfBirth)}
                  </div>
                  <div>
                    <span className="text-gray-600">{t.onboarding.status}:</span> {userProfile.pregnancyStatus}
                  </div>
                  <div>
                    <span className="text-gray-600">{t.onboarding.children}:</span> {userProfile.numberOfChildren}
                  </div>
                  <div>
                    <span className="text-gray-600">AI:</span>{" "}
                    {userProfile.aiProvider === "gemini" ? "Google Gemini" : "OpenAI GPT-4"}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-pink-800 mb-3">{t.onboarding.personalizedGuidance}</h3>
                <div className="bg-white p-4 rounded-xl border border-pink-100 whitespace-pre-wrap text-gray-700">
                  {formatAIResponse(aiResponse, language)}
                </div>
              </div>

              <div className="flex space-x-3">
                <button onClick={() => router.push("/")} className="btn-primary flex-1">
                  {t.onboarding.startUsing}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("userProfile")
                    localStorage.removeItem("personalizedGuidance")
                    localStorage.removeItem("selectedAIProvider")
                    setIsFirstVisit(true)
                    setCurrentStep(1)
                    setError("")
                  }}
                  className="btn-secondary"
                >
                  {t.onboarding.updateProfile}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Show onboarding flow for first-time users
  return (
    <div className="min-h-screen bg-pink-50">
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {currentStep > 1 && (
                <button onClick={handlePrevious} className="mr-4">
                  <ArrowLeft className="w-6 h-6 text-pink-600" />
                </button>
              )}
              <h1 className="text-xl font-bold text-pink-800">{t.onboarding.welcome}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <div className="text-sm text-pink-600">
                {t.onboarding.step} {currentStep} {t.onboarding.of} 6
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-pink-200 rounded-full h-2">
            <div
              className="bg-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <div>
              <p className="text-red-800 font-medium">Error generating guidance</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="card">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="p-4 rounded-full bg-pink-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <User className="w-8 h-8 text-pink-600" />
                </div>
                <h2 className="text-xl font-bold text-pink-800 mb-2">{t.onboarding.tellAboutYourself}</h2>
                <p className="text-gray-600">{t.onboarding.personalizeExperience}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t.onboarding.yearOfBirth}</label>
                  <input
                    type="number"
                    placeholder="e.g., 1990"
                    className="input-field"
                    value={userProfile.yearOfBirth}
                    onChange={(e) => setUserProfile({ ...userProfile, yearOfBirth: e.target.value })}
                    required
                    min="1950"
                    max={new Date().getFullYear()}
                  />
                  {userProfile.yearOfBirth && (
                    <p className="text-sm text-gray-600 mt-1">
                      {t.onboarding.currentAge}: {calculateAge(userProfile.yearOfBirth)}{" "}
                      {language === "en" ? "years old" : language === "ru" ? "лет" : "yosh"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t.onboarding.preferredLanguage}</label>
                  <select className="input-field" value={language} onChange={(e) => setLanguage(e.target.value as any)}>
                    <option value="en">English</option>
                    <option value="ru">Русский</option>
                    <option value="uz">O'zbek</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Pregnancy & Family Status */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="p-4 rounded-full bg-pink-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Baby className="w-8 h-8 text-pink-600" />
                </div>
                <h2 className="text-xl font-bold text-pink-800 mb-2">{t.onboarding.familyInformation}</h2>
                <p className="text-gray-600">{t.onboarding.understandSituation}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t.onboarding.currentStatus}</label>
                  <select
                    className="input-field"
                    value={userProfile.pregnancyStatus}
                    onChange={(e) => setUserProfile({ ...userProfile, pregnancyStatus: e.target.value })}
                    required
                  >
                    <option value="">{t.onboarding.selectStatus}</option>
                    <option value="pregnant">{t.onboarding.pregnant}</option>
                    <option value="postpartum">{t.onboarding.postpartum}</option>
                    <option value="breastfeeding">{t.onboarding.breastfeeding}</option>
                    <option value="planning">{t.onboarding.planning}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t.onboarding.numberOfChildren}</label>
                  <input
                    type="number"
                    placeholder="e.g., 1"
                    className="input-field"
                    value={userProfile.numberOfChildren}
                    onChange={(e) => setUserProfile({ ...userProfile, numberOfChildren: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t.onboarding.childAge}</label>
                  <input
                    type="text"
                    placeholder="e.g., 4 months, newborn"
                    className="input-field"
                    value={userProfile.childAge}
                    onChange={(e) => setUserProfile({ ...userProfile, childAge: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Baby Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="p-4 rounded-full bg-pink-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <h2 className="text-xl font-bold text-pink-800 mb-2">{t.onboarding.aboutBaby}</h2>
                <p className="text-gray-600">{t.onboarding.personalizeBaby}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t.onboarding.babyName}</label>
                  <input
                    type="text"
                    placeholder="e.g., Ali"
                    className="input-field"
                    value={userProfile.babyName}
                    onChange={(e) => setUserProfile({ ...userProfile, babyName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t.onboarding.breastfeedingStatus}</label>
                  <select
                    className="input-field"
                    value={userProfile.breastfeedingStatus}
                    onChange={(e) => setUserProfile({ ...userProfile, breastfeedingStatus: e.target.value })}
                  >
                    <option value="">{t.onboarding.selectStatus}</option>
                    <option value="exclusively">{t.onboarding.exclusively}</option>
                    <option value="combination">{t.onboarding.combination}</option>
                    <option value="formula">{t.onboarding.formula}</option>
                    <option value="weaning">{t.onboarding.weaning}</option>
                    <option value="not-applicable">{t.onboarding.notApplicable}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Guidance Area Selection */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="p-4 rounded-full bg-pink-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <h2 className="text-xl font-bold text-pink-800 mb-2">
                  {language === "en" && "Choose Your Guidance Areas"}
                  {language === "ru" && "Выберите области руководства"}
                  {language === "uz" && "Yo'riqnoma sohalarini tanlang"}
                </h2>
                <p className="text-gray-600">
                  {language === "en" && "Select the areas where you'd like personalized support and advice"}
                  {language === "ru" && "Выберите области, где вы хотели бы получить персональную поддержку и советы"}
                  {language === "uz" && "Shaxsiy yordam va maslahat olishni istagan sohalarni tanlang"}
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: "breastfeeding",
                    name: { en: "Breastfeeding", ru: "Грудное вскармливание", uz: "Emizish" },
                    description: {
                      en: "Positioning, milk supply, feeding schedules",
                      ru: "Позиционирование, лактация, режим кормления",
                      uz: "To'g'ri tutish, sut ko'paytirish, emizish jadvali",
                    },
                    icon: "🤱",
                  },
                  {
                    id: "nutrition",
                    name: { en: "Nutrition", ru: "Питание", uz: "Ovqatlanish" },
                    description: {
                      en: "Healthy meals, hydration, vitamins",
                      ru: "Здоровое питание, гидратация, витамины",
                      uz: "Sog'lom ovqatlar, suv ichish, vitaminlar",
                    },
                    icon: "🥗",
                  },
                  {
                    id: "development",
                    name: { en: "Baby Development", ru: "Развитие ребенка", uz: "Chaqaloq rivojlanishi" },
                    description: {
                      en: "Milestones, growth signs, bonding activities",
                      ru: "Этапы развития, признаки роста, связь",
                      uz: "Rivojlanish bosqichlari, o'sish belgilari, bog'lanish",
                    },
                    icon: "👶",
                  },
                  {
                    id: "cycle",
                    name: { en: "Cycle Tracking", ru: "Отслеживание цикла", uz: "Hayz tsiklini kuzatish" },
                    description: {
                      en: "Menstruation return, hormonal changes",
                      ru: "Возвращение менструации, гормональные изменения",
                      uz: "Hayz qaytishi, gormonal o'zgarishlar",
                    },
                    icon: "📅",
                  },
                ].map((area) => {
                  const isSelected = userProfile.selectedGuidanceAreas.includes(area.name[language])
                  return (
                    <div
                      key={area.id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected ? "border-pink-500 bg-pink-50" : "border-gray-200 bg-white hover:border-pink-300"
                      }`}
                      onClick={() => {
                        const areaName = area.name[language]
                        const newAreas = isSelected
                          ? userProfile.selectedGuidanceAreas.filter((a) => a !== areaName)
                          : [...userProfile.selectedGuidanceAreas, areaName]
                        setUserProfile({ ...userProfile, selectedGuidanceAreas: newAreas })
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{area.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{area.name[language]}</h4>
                          <p className="text-sm text-gray-600">{area.description[language]}</p>
                        </div>
                        {isSelected && (
                          <div className="text-pink-600">
                            <span className="text-xl">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-blue-800 text-sm">
                  {language === "en" &&
                    "💡 You can select multiple areas. We recommend choosing at least 2-3 areas for comprehensive support."}
                  {language === "ru" &&
                    "💡 Вы можете выбрать несколько областей. Мы рекомендуем выбрать как минимум 2-3 области для всесторонней поддержки."}
                  {language === "uz" &&
                    "💡 Bir nechta sohani tanlashingiz mumkin. Keng qamrovli yordam uchun kamida 2-3 ta sohani tanlashni tavsiya qilamiz."}
                </p>
              </div>
            </div>
          )}

          {/* Step 5: AI Provider Selection */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="p-4 rounded-full bg-pink-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-pink-600" />
                </div>
                <h2 className="text-xl font-bold text-pink-800 mb-2">
                  {language === "en" && "Choose Your AI Assistant"}
                  {language === "ru" && "Выберите вашего ИИ-помощника"}
                  {language === "uz" && "AI yordamchingizni tanlang"}
                </h2>
                <p className="text-gray-600">
                  {language === "en" && "Select the AI that will provide your personalized guidance"}
                  {language === "ru" && "Выберите ИИ, который будет предоставлять персональные рекомендации"}
                  {language === "uz" && "Shaxsiy maslahatlar beradigan AIni tanlang"}
                </p>
              </div>

              <AIProviderSelector
                selectedProvider={userProfile.aiProvider}
                onProviderChange={(provider) => setUserProfile({ ...userProfile, aiProvider: provider })}
              />

              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-blue-800 text-sm">
                  {language === "en" &&
                    "💡 Tip: Google Gemini is recommended for Uzbek language support and cultural context."}
                  {language === "ru" &&
                    "💡 Совет: Google Gemini рекомендуется для поддержки узбекского языка и культурного контекста."}
                  {language === "uz" &&
                    "💡 Maslahat: Google Gemini o'zbek tili va madaniy kontekst uchun tavsiya etiladi."}
                </p>
              </div>
            </div>
          )}

          {/* Step 6: Health & Preferences */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="p-4 rounded-full bg-pink-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-pink-600" />
                </div>
                <h2 className="text-xl font-bold text-pink-800 mb-2">{t.onboarding.healthConcerns}</h2>
                <p className="text-gray-600">{t.onboarding.bestGuidance}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t.onboarding.healthConcernsOptional}</label>
                  <textarea
                    placeholder="e.g., low milk supply, sleep issues, postpartum recovery..."
                    className="input-field"
                    rows={4}
                    value={userProfile.healthConcerns}
                    onChange={(e) => setUserProfile({ ...userProfile, healthConcerns: e.target.value })}
                  />
                </div>

                <div className="bg-pink-50 p-4 rounded-xl">
                  <h3 className="font-medium text-pink-800 mb-2">{t.onboarding.privacyNotice}</h3>
                  <p className="text-sm text-gray-600">{t.onboarding.privacyText}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button onClick={handlePrevious} className={`btn-secondary ${currentStep === 1 ? "invisible" : ""}`}>
              {t.common.previous}
            </button>

            {currentStep < 6 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.common.next}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t.onboarding.generatingGuide}
                  </>
                ) : (
                  t.onboarding.completeSetup
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
