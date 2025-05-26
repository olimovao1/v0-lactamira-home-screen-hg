"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Save, RefreshCw, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useTranslation } from "@/lib/translations"
import { LanguageSelector } from "@/components/language-selector"
import { AIProviderSelector } from "@/components/ai-provider-selector"

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

export default function SettingsPage() {
  const { language } = useLanguage()
  const t = useTranslation(language)

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
    selectedGuidanceAreas: [],
  })

  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle")
  const [regeneratingGuidance, setRegeneratingGuidance] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [originalProfile, setOriginalProfile] = useState<UserProfile | null>(null)

  // Load user profile on component mount
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile")
    if (storedProfile) {
      const profile = JSON.parse(storedProfile)
      setUserProfile(profile)
      setOriginalProfile(profile)
    }
  }, [])

  // Track changes
  useEffect(() => {
    if (originalProfile) {
      const hasProfileChanges = JSON.stringify(userProfile) !== JSON.stringify(originalProfile)
      setHasChanges(hasProfileChanges)
    }
  }, [userProfile, originalProfile])

  const guidanceAreas = [
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
    {
      id: "mental-health",
      name: { en: "Mental Health", ru: "Психическое здоровье", uz: "Ruhiy salomatlik" },
      description: {
        en: "Postpartum emotions, stress management",
        ru: "Послеродовые эмоции, управление стрессом",
        uz: "Tug'ruqdan keyingi hissiyotlar, stress boshqaruvi",
      },
      icon: "🧠",
    },
    {
      id: "sleep",
      name: { en: "Sleep & Rest", ru: "Сон и отдых", uz: "Uyqu va dam olish" },
      description: {
        en: "Sleep patterns, rest strategies",
        ru: "Режим сна, стратегии отдыха",
        uz: "Uyqu tartibi, dam olish strategiyalari",
      },
      icon: "😴",
    },
  ]

  const handleSaveProfile = async () => {
    setSaveStatus("saving")
    setLoading(true)

    try {
      // Save to localStorage
      localStorage.setItem("userProfile", JSON.stringify(userProfile))
      setOriginalProfile({ ...userProfile })
      setHasChanges(false)
      setSaveStatus("success")

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSaveStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Error saving profile:", error)
      setSaveStatus("error")
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerateGuidance = async () => {
    setRegeneratingGuidance(true)

    try {
      // First save the current profile
      localStorage.setItem("userProfile", JSON.stringify(userProfile))

      // Choose API endpoint based on selected provider
      const endpoint = userProfile.aiProvider === "gemini" ? "/api/generate-guidance-gemini" : "/api/generate-guidance"

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userProfile }),
      })

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`)
      }

      const data = await res.json()

      if (data.result) {
        localStorage.setItem("personalizedGuidance", data.result)
        localStorage.setItem("selectedAIProvider", userProfile.aiProvider)
        setSaveStatus("success")

        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSaveStatus("idle")
        }, 3000)
      } else {
        throw new Error("No guidance received from API")
      }
    } catch (error) {
      console.error("Error regenerating guidance:", error)
      setSaveStatus("error")
    } finally {
      setRegeneratingGuidance(false)
    }
  }

  const toggleGuidanceArea = (areaName: string) => {
    const isSelected = userProfile.selectedGuidanceAreas.includes(areaName)
    const newAreas = isSelected
      ? userProfile.selectedGuidanceAreas.filter((a) => a !== areaName)
      : [...userProfile.selectedGuidanceAreas, areaName]

    setUserProfile({ ...userProfile, selectedGuidanceAreas: newAreas })
  }

  return (
    <div className="min-h-screen bg-pink-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <ArrowLeft className="w-6 h-6 text-pink-600" />
              </Link>
              <h1 className="text-xl font-bold text-pink-800">
                {language === "en" && "Guidance Settings"}
                {language === "ru" && "Настройки руководства"}
                {language === "uz" && "Yo'riqnoma sozlamalari"}
              </h1>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Status Messages */}
        {saveStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <p className="text-green-800 font-medium">
                {language === "en" && "Settings saved successfully!"}
                {language === "ru" && "Настройки успешно сохранены!"}
                {language === "uz" && "Sozlamalar muvaffaqiyatli saqlandi!"}
              </p>
              <p className="text-green-700 text-sm">
                {language === "en" && "Your personalized guidance has been updated."}
                {language === "ru" && "Ваши персональные рекомендации обновлены."}
                {language === "uz" && "Shaxsiy tavsiyalaringiz yangilandi."}
              </p>
            </div>
          </div>
        )}

        {saveStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <div>
              <p className="text-red-800 font-medium">
                {language === "en" && "Error saving settings"}
                {language === "ru" && "Ошибка сохранения настроек"}
                {language === "uz" && "Sozlamalarni saqlashda xatolik"}
              </p>
              <p className="text-red-700 text-sm">
                {language === "en" && "Please try again or contact support."}
                {language === "ru" && "Попробуйте еще раз или обратитесь в поддержку."}
                {language === "uz" && "Qayta urinib ko'ring yoki qo'llab-quvvatlash xizmatiga murojaat qiling."}
              </p>
            </div>
          </div>
        )}

        {/* Guidance Areas Selection */}
        <section className="mb-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-pink-800 mb-4">
              {language === "en" && "Your Guidance Areas"}
              {language === "ru" && "Ваши области руководства"}
              {language === "uz" && "Sizning yo'riqnoma sohalaringiz"}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === "en" && "Select the areas where you'd like to receive personalized advice and support."}
              {language === "ru" && "Выберите области, где вы хотели бы получать персональные советы и поддержку."}
              {language === "uz" && "Shaxsiy maslahat va yordam olishni istagan sohalarni tanlang."}
            </p>

            <div className="space-y-3">
              {guidanceAreas.map((area) => {
                const isSelected = userProfile.selectedGuidanceAreas.includes(area.name[language])
                return (
                  <div
                    key={area.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected ? "border-pink-500 bg-pink-50" : "border-gray-200 bg-white hover:border-pink-300"
                    }`}
                    onClick={() => toggleGuidanceArea(area.name[language])}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{area.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{area.name[language]}</h4>
                        <p className="text-sm text-gray-600">{area.description[language]}</p>
                      </div>
                      {isSelected && (
                        <div className="text-pink-600">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-xl">
              <p className="text-blue-800 text-sm">
                {language === "en" &&
                  `💡 You have selected ${userProfile.selectedGuidanceAreas.length} areas. We recommend choosing at least 2-3 areas for comprehensive support.`}
                {language === "ru" &&
                  `💡 Вы выбрали ${userProfile.selectedGuidanceAreas.length} областей. Мы рекомендуем выбрать как минимум 2-3 области для всесторонней поддержки.`}
                {language === "uz" &&
                  `💡 Siz ${userProfile.selectedGuidanceAreas.length} ta sohani tanladingiz. Keng qamrovli yordam uchun kamida 2-3 ta sohani tanlashni tavsiya qilamiz.`}
              </p>
            </div>
          </div>
        </section>

        {/* AI Provider Selection */}
        <section className="mb-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-pink-800 mb-4">
              {language === "en" && "AI Assistant Preference"}
              {language === "ru" && "Предпочтение ИИ-помощника"}
              {language === "uz" && "AI yordamchi afzalligi"}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === "en" && "Choose which AI will provide your personalized guidance."}
              {language === "ru" && "Выберите, какой ИИ будет предоставлять ваши персональные рекомендации."}
              {language === "uz" && "Shaxsiy maslahatlaringizni qaysi AI berishi kerakligini tanlang."}
            </p>

            <AIProviderSelector
              selectedProvider={userProfile.aiProvider}
              onProviderChange={(provider) => setUserProfile({ ...userProfile, aiProvider: provider })}
            />
          </div>
        </section>

        {/* Basic Profile Information */}
        <section className="mb-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-pink-800 mb-4">
              {language === "en" && "Profile Information"}
              {language === "ru" && "Информация профиля"}
              {language === "uz" && "Profil ma'lumotlari"}
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {language === "en" && "Baby's Name"}
                    {language === "ru" && "Имя ребенка"}
                    {language === "uz" && "Chaqaloq ismi"}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={userProfile.babyName}
                    onChange={(e) => setUserProfile({ ...userProfile, babyName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {language === "en" && "Child's Age"}
                    {language === "ru" && "Возраст ребенка"}
                    {language === "uz" && "Bolaning yoshi"}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={userProfile.childAge}
                    onChange={(e) => setUserProfile({ ...userProfile, childAge: e.target.value })}
                    placeholder={
                      language === "en" ? "e.g., 4 months" : language === "ru" ? "например, 4 месяца" : "masalan, 4 oy"
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {language === "en" && "Current Status"}
                  {language === "ru" && "Текущий статус"}
                  {language === "uz" && "Joriy holat"}
                </label>
                <select
                  className="input-field"
                  value={userProfile.pregnancyStatus}
                  onChange={(e) => setUserProfile({ ...userProfile, pregnancyStatus: e.target.value })}
                >
                  <option value="">
                    {language === "en" && "Select Status"}
                    {language === "ru" && "Выберите статус"}
                    {language === "uz" && "Holatni tanlang"}
                  </option>
                  <option value="pregnant">
                    {language === "en" && "Currently Pregnant"}
                    {language === "ru" && "В настоящее время беременна"}
                    {language === "uz" && "Hozir homilador"}
                  </option>
                  <option value="postpartum">
                    {language === "en" && "Postpartum (After Birth)"}
                    {language === "ru" && "Послеродовой период"}
                    {language === "uz" && "Tug'ruqdan keyingi davr"}
                  </option>
                  <option value="breastfeeding">
                    {language === "en" && "Breastfeeding"}
                    {language === "ru" && "Кормлю грудью"}
                    {language === "uz" && "Emizish"}
                  </option>
                  <option value="planning">
                    {language === "en" && "Planning Pregnancy"}
                    {language === "ru" && "Планирую беременность"}
                    {language === "uz" && "Homiladorlikni rejalashtirish"}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {language === "en" && "Breastfeeding Status"}
                  {language === "ru" && "Статус грудного вскармливания"}
                  {language === "uz" && "Emizish holati"}
                </label>
                <select
                  className="input-field"
                  value={userProfile.breastfeedingStatus}
                  onChange={(e) => setUserProfile({ ...userProfile, breastfeedingStatus: e.target.value })}
                >
                  <option value="">
                    {language === "en" && "Select Status"}
                    {language === "ru" && "Выберите статус"}
                    {language === "uz" && "Holatni tanlang"}
                  </option>
                  <option value="exclusively">
                    {language === "en" && "Exclusively Breastfeeding"}
                    {language === "ru" && "Исключительно грудное вскармливание"}
                    {language === "uz" && "Faqat ko'krak suti bilan"}
                  </option>
                  <option value="combination">
                    {language === "en" && "Combination (Breast + Formula)"}
                    {language === "ru" && "Комбинированное (грудь + смесь)"}
                    {language === "uz" && "Aralash (ko'krak + aralashma)"}
                  </option>
                  <option value="formula">
                    {language === "en" && "Formula Feeding"}
                    {language === "ru" && "Искусственное вскармливание"}
                    {language === "uz" && "Sun'iy ovqatlantirish"}
                  </option>
                  <option value="weaning">
                    {language === "en" && "Currently Weaning"}
                    {language === "ru" && "В процессе отлучения"}
                    {language === "uz" && "Hozir ajratish jarayonida"}
                  </option>
                  <option value="not-applicable">
                    {language === "en" && "Not Applicable"}
                    {language === "ru" && "Не применимо"}
                    {language === "uz" && "Tegishli emas"}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {language === "en" && "Health Concerns or Questions (Optional)"}
                  {language === "ru" && "Проблемы со здоровьем или вопросы (необязательно)"}
                  {language === "uz" && "Salomatlik muammolari yoki savollar (ixtiyoriy)"}
                </label>
                <textarea
                  className="input-field"
                  rows={3}
                  value={userProfile.healthConcerns}
                  onChange={(e) => setUserProfile({ ...userProfile, healthConcerns: e.target.value })}
                  placeholder={
                    language === "en"
                      ? "e.g., low milk supply, sleep issues, postpartum recovery..."
                      : language === "ru"
                        ? "например, недостаток молока, проблемы со сном, послеродовое восстановление..."
                        : "masalan, sut kamayishi, uyqu muammolari, tug'ruqdan keyingi tiklanish..."
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleSaveProfile}
              disabled={loading || !hasChanges}
              className="btn-primary flex-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === "en" && "Saving..."}
                  {language === "ru" && "Сохранение..."}
                  {language === "uz" && "Saqlanmoqda..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {language === "en" && "Save Changes"}
                  {language === "ru" && "Сохранить изменения"}
                  {language === "uz" && "O'zgarishlarni saqlash"}
                </>
              )}
            </button>

            <button
              onClick={handleRegenerateGuidance}
              disabled={regeneratingGuidance || userProfile.selectedGuidanceAreas.length === 0}
              className="btn-secondary flex-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {regeneratingGuidance ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === "en" && "Regenerating..."}
                  {language === "ru" && "Генерация..."}
                  {language === "uz" && "Qayta yaratilmoqda..."}
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {language === "en" && "Update Guidance"}
                  {language === "ru" && "Обновить руководство"}
                  {language === "uz" && "Yo'riqnomani yangilash"}
                </>
              )}
            </button>
          </div>

          {!hasChanges && (
            <div className="text-center text-gray-500 text-sm">
              {language === "en" && "No changes to save"}
              {language === "ru" && "Нет изменений для сохранения"}
              {language === "uz" && "Saqlash uchun o'zgarishlar yo'q"}
            </div>
          )}

          <div className="bg-amber-50 p-4 rounded-xl">
            <p className="text-amber-800 text-sm">
              {language === "en" &&
                "💡 Tip: After making changes, click 'Update Guidance' to regenerate your personalized advice based on your new preferences."}
              {language === "ru" &&
                "💡 Совет: После внесения изменений нажмите 'Обновить руководство', чтобы сгенерировать персональные советы на основе ваших новых предпочтений."}
              {language === "uz" &&
                "💡 Maslahat: O'zgarishlar kiritgandan so'ng, yangi afzalliklaringiz asosida shaxsiy maslahatlarni qayta yaratish uchun 'Yo'riqnomani yangilash' tugmasini bosing."}
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
