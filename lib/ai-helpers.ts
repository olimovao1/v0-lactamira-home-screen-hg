import type { Language } from "./translations"

export function formatAIResponse(response: string, language: Language): string {
  // Clean up the response and ensure proper formatting
  let formatted = response.trim()

  // Language-specific formatting adjustments
  switch (language) {
    case "ru":
      // Ensure proper Russian punctuation and spacing
      formatted = formatted
        .replace(/\s+/g, " ") // Normalize spaces
        .replace(/([.!?])\s*([А-Я])/g, "$1 $2") // Proper spacing after sentences
        .replace(/\*\*([^*]+)\*\*/g, "**$1**") // Ensure bold formatting is preserved
      break

    case "uz":
      // Ensure proper Uzbek formatting
      formatted = formatted
        .replace(/\s+/g, " ") // Normalize spaces
        .replace(/([.!?])\s*([A-ZO'])/g, "$1 $2") // Proper spacing after sentences
        .replace(/\*\*([^*]+)\*\*/g, "**$1**") // Ensure bold formatting is preserved
      break

    case "en":
    default:
      // Standard English formatting
      formatted = formatted
        .replace(/\s+/g, " ") // Normalize spaces
        .replace(/([.!?])\s*([A-Z])/g, "$1 $2") // Proper spacing after sentences
      break
  }

  return formatted
}

export function getLanguageSpecificGreeting(language: Language, babyName?: string): string {
  const greetings = {
    en: babyName ? `Welcome, ${babyName}'s mom!` : "Welcome, mama!",
    ru: babyName ? `Добро пожаловать, мама ${babyName}!` : "Добро пожаловать, мама!",
    uz: babyName ? `Xush kelibsiz, ${babyName}ning onasi!` : "Xush kelibsiz, ona!",
  }

  return greetings[language] || greetings.en
}

export function getAIPromptTemplate(language: Language): string {
  const templates = {
    en: "Provide comprehensive maternal health guidance in English with a warm, supportive tone.",
    ru: "Предоставьте всестороннее руководство по материнскому здоровью на русском языке с теплым, поддерживающим тоном. Используйте медицинскую терминологию, понятную для русскоязычных матерей.",
    uz: "O'zbek tilida iliq, qo'llab-quvvatlovchi ohangda onalik salomatligi bo'yicha keng qamrovli yo'riqnoma bering. O'zbek onalari uchun tushunarli tibbiy terminologiyadan foydalaning.",
  }

  return templates[language] || templates.en
}
