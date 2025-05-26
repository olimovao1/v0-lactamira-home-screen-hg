"use client"
import { Bot, Sparkles } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useTranslation } from "@/lib/translations"

interface AIProviderSelectorProps {
  onProviderChange: (provider: "openai" | "gemini") => void
  selectedProvider: "openai" | "gemini"
}

export function AIProviderSelector({ onProviderChange, selectedProvider }: AIProviderSelectorProps) {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const providers = [
    {
      id: "openai" as const,
      name: "OpenAI GPT-4",
      icon: <Bot className="w-5 h-5" />,
      description: {
        en: "Advanced AI with comprehensive medical knowledge",
        ru: "Продвинутый ИИ с обширными медицинскими знаниями",
        uz: "Keng tibbiy bilimga ega ilg'or sun'iy intellekt",
      },
      features: {
        en: ["Global medical standards", "Detailed explanations", "Evidence-based advice"],
        ru: ["Глобальные медицинские стандарты", "Подробные объяснения", "Советы на основе доказательств"],
        uz: ["Global tibbiy standartlar", "Batafsil tushuntirishlar", "Dalillarga asoslangan maslahatlar"],
      },
    },
    {
      id: "gemini" as const,
      name: "Google Gemini",
      icon: <Sparkles className="w-5 h-5" />,
      description: {
        en: "Culturally-aware AI optimized for Central Asian mothers",
        ru: "Культурно-адаптированный ИИ для матерей Центральной Азии",
        uz: "Markaziy Osiyo onalari uchun madaniy jihatdan moslashtirilgan AI",
      },
      features: {
        en: ["Regional cultural context", "Traditional practices integration", "Local health considerations"],
        ru: ["Региональный культурный контекст", "Интеграция традиционных практик", "Местные особенности здоровья"],
        uz: [
          "Mintaqaviy madaniy kontekst",
          "An'anaviy amaliyotlarni birlashtirish",
          "Mahalliy salomatlik xususiyatlari",
        ],
      },
    },
  ]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-pink-800 mb-2">
          {language === "en" && "Choose Your AI Assistant"}
          {language === "ru" && "Выберите вашего ИИ-помощника"}
          {language === "uz" && "AI yordamchingizni tanlang"}
        </h3>
        <p className="text-gray-600 text-sm">
          {language === "en" && "Select the AI that best fits your needs and cultural background"}
          {language === "ru" && "Выберите ИИ, который лучше всего подходит вашим потребностям и культурному фону"}
          {language === "uz" && "Ehtiyojlaringiz va madaniy foniga eng mos keladigan AIni tanlang"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedProvider === provider.id
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 bg-white hover:border-pink-300"
            }`}
            onClick={() => onProviderChange(provider.id)}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                className={`p-2 rounded-full ${
                  selectedProvider === provider.id ? "bg-pink-100 text-pink-600" : "bg-gray-100 text-gray-600"
                }`}
              >
                {provider.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{provider.name}</h4>
                <p className="text-sm text-gray-600">{provider.description[language]}</p>
              </div>
            </div>

            <ul className="space-y-1">
              {provider.features[language].map((feature, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>

            {selectedProvider === provider.id && (
              <div className="mt-3 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                  {language === "en" && "Selected"}
                  {language === "ru" && "Выбрано"}
                  {language === "uz" && "Tanlangan"}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
