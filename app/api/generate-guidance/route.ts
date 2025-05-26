import { NextResponse } from "next/server"
import { getAIPromptTemplate } from "@/lib/ai-helpers"

export async function POST(req: Request) {
  try {
    const { userProfile } = await req.json()
    const language = userProfile.preferredLanguage || "en"

    // Get language-specific prompt template
    const languageInstruction = getAIPromptTemplate(language)

    // Enhanced prompt with better language-specific instructions
    const prompt = `You are Lactamira, a caring AI assistant for mothers and their babies.

Based on the profile below, generate a fully personalized, culturally sensitive, and practical guide in ${language === "en" ? "clear English" : language === "ru" ? "clear Russian" : "clear Uzbek"} language.

👩 Mother Profile:
- Year of Birth: ${userProfile.yearOfBirth}
- Current Age: ${new Date().getFullYear() - Number.parseInt(userProfile.yearOfBirth)} years
- Status: ${userProfile.pregnancyStatus}
- Number of Children: ${userProfile.numberOfChildren}
- Child's Age: ${userProfile.childAge || "Not specified"}
- Baby's Name: ${userProfile.babyName}
- Breastfeeding Status: ${userProfile.breastfeedingStatus || "Not specified"}
- Health Concerns: ${userProfile.healthConcerns || "None specified"}

📌 The user selected the following areas for support:
${userProfile.selectedGuidanceAreas ? userProfile.selectedGuidanceAreas.map((area, index) => `${index + 1}. ${area}`).join("\n") : "1. Breastfeeding\n2. Nutrition\n3. Baby Development\n4. Cycle Tracking"}

Please provide a separate, clearly structured section for each selected area.

Make the tone warm, respectful, and empathetic — like speaking to a mother.
Give real-life examples where helpful. Avoid generic advice. Focus on:

- **Breastfeeding**: Positioning, milk supply tips, pain relief methods, feeding schedule
- **Nutrition**: Healthy meals for postpartum moms, hydration, foods that increase milk, vitamins  
- **Baby Development**: Milestones for the baby's age, signs of healthy growth, parent-child bonding activities
- **Cycle Tracking**: When to expect menstruation to return, hormonal changes, physical and emotional signs

${language === "ru" ? "Отвечайте простым, понятным русским языком." : ""}
${language === "uz" ? "Oddiy, ravon o'zbek tilida javob bering." : ""}
${language === "en" ? "Respond in clear, supportive English." : ""}

Use paragraphs, bullet points, and warm encouragement. Avoid technical medical jargon unless necessary.
Response should be around 400-500 words.`

    // Use environment variable for API key
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      console.error("OpenAI API key not found in environment variables")
      throw new Error("OpenAI API key not configured")
    }

    // Validate API key format
    if (!apiKey.startsWith("sk-")) {
      console.error("Invalid OpenAI API key format")
      throw new Error("Invalid OpenAI API key format")
    }

    console.log("Making request to OpenAI API...")

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using more cost-effective model
        messages: [
          {
            role: "system",
            content: "You are a helpful maternal health assistant. Provide warm, evidence-based guidance for mothers.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    console.log("OpenAI API response status:", aiRes.status)

    if (!aiRes.ok) {
      const errorText = await aiRes.text()
      console.error("OpenAI API error:", aiRes.status, errorText)
      throw new Error(`OpenAI API error: ${aiRes.status} - ${errorText}`)
    }

    const aiData = await aiRes.json()
    const result = aiData.choices?.[0]?.message?.content

    if (!result) {
      console.error("No content in OpenAI response:", aiData)
      throw new Error("No content received from OpenAI")
    }

    console.log("Successfully generated guidance with OpenAI")
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error generating guidance:", error)

    // Return language-specific fallback guidance
    const { userProfile } = await req.json().catch(() => ({ preferredLanguage: "en" }))
    const language = userProfile?.preferredLanguage || "en"

    const fallbackGuidance = {
      en: `Welcome to Lactamira! 🌸

Thank you for joining our maternal health community. While we're setting up your personalized guidance, here are some essential tips to get you started:

**🤱 Breastfeeding Support**
- Aim for 8-12 feeding sessions per day for newborns
- Watch for hunger cues: rooting, sucking motions, hand-to-mouth movements
- Ensure proper latch for comfortable feeding

**🥗 Nutrition Focus**
- Stay hydrated: aim for 8-10 glasses of water daily
- Include iron-rich foods: spinach, lentils, lean meats
- Don't forget calcium: dairy, leafy greens, fortified foods

**😴 Rest & Recovery**
- Sleep when your baby sleeps
- Accept help from family and friends
- Gentle movement when you feel ready

**📱 Using Lactamira**
- Track feeding sessions to identify patterns
- Monitor your baby's growth milestones
- Set reminders for important tasks

Remember, every mother's journey is unique. Trust your instincts and don't hesitate to reach out to healthcare providers with any concerns.

You're doing an amazing job! 💕`,

      ru: `Добро пожаловать в Лактамиру! 🌸

Спасибо, что присоединились к нашему сообществу материнского здоровья. Пока мы настраиваем ваши персональные рекомендации, вот несколько важных советов для начала:

**🤱 Поддержка грудного вскармливания**
- Стремитесь к 8-12 сеансам кормления в день для новорожденных
- Следите за признаками голода: поисковые движения, сосательные движения, движения рука-ко-рту
- Обеспечьте правильное прикладывание для комфортного кормления

**🥗 Фокус на питании**
- Поддерживайте гидратацию: стремитесь к 8-10 стаканам воды в день
- Включайте продукты, богатые железом: шпинат, чечевицу, нежирное мясо
- Не забывайте о кальции: молочные продукты, листовая зелень, обогащенные продукты

**😴 Отдых и восстановление**
- Спите, когда спит ваш малыш
- Принимайте помощь от семьи и друзей
- Легкие движения, когда почувствуете готовность

**📱 Использование Лактамиры**
- Отслеживайте сеансы кормления для выявления закономерностей
- Мониторьте этапы роста вашего малыша
- Устанавливайте напоминания для важных задач

Помните, путь каждой матери уникален. Доверяйте своим инстинктам и не стесняйтесь обращаться к медицинским работникам с любыми вопросами.

Вы делаете потрясающую работу! 💕`,

      uz: `Laktamiraga xush kelibsiz! 🌸

Onalik salomatligi jamiyatimizga qo'shilganingiz uchun rahmat. Shaxsiy tavsiyalaringizni sozlayotgan vaqtda, boshlash uchun bir nechta muhim maslahatlar:

**🤱 Emizishni qo'llab-quvvatlash**
- Yangi tug'ilgan chaqaloqlar uchun kuniga 8-12 ta emizish seansiga intiling
- Ochlik belgilarini kuzating: qidiruv harakatlari, so'rish harakatlari, qo'l-og'izga harakatlar
- Qulay emizish uchun to'g'ri tutishni ta'minlang

**🥗 Ovqatlanishga e'tibor**
- Gidratatsiyani saqlang: kuniga 8-10 stakan suvga intiling
- Temirga boy ovqatlarni kiriting: ismaloq, yasmiq, yog'siz go'sht
- Kaltsiyni unutmang: sut mahsulotlari, bargli sabzavotlar, boyitilgan ovqatlar

**😴 Dam olish va tiklanish**
- Chaqaloqingiz uxlayotganda uxlang
- Oila va do'stlardan yordam qabul qiling
- Tayyor bo'lganingizda engil harakatlar

**📱 Laktamiradan foydalanish**
- Naqshlarni aniqlash uchun emizish seanslarini kuzating
- Chaqaloqingizning o'sish bosqichlarini kuzating
- Muhim vazifalar uchun eslatmalar o'rnating

Eslab qoling, har bir onaning yo'li noyobdir. O'z sezgilaringizga ishoning va har qanday savol bilan tibbiy xodimlarga murojaat qilishdan tortinmang.

Siz ajoyib ish qilyapsiz! 💕`,
    }

    console.log("Returning fallback guidance in language:", language)
    return NextResponse.json({
      result: fallbackGuidance[language] || fallbackGuidance.en,
      fallback: true,
    })
  }
}
