import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userProfile } = await req.json()
    const language = userProfile.preferredLanguage || "en"

    // Enhanced Uzbek prompt based on your implementation
    const uzbekPrompt = `Siz Lactamira - onalar va ularning chaqaloqlari uchun g'amxo'r AI yordamchisiz.

Quyidagi profil asosida to'liq shaxsiylashtirilgan, madaniy jihatdan sezgir va amaliy qo'llanma yarating. Aniq o'zbek tilida yozing.

👩 Ona profili:
- Tug'ilgan yili: ${userProfile.yearOfBirth}
- Yoshi: ${new Date().getFullYear() - Number.parseInt(userProfile.yearOfBirth)} yosh
- Holati: ${userProfile.pregnancyStatus}
- Farzandlar soni: ${userProfile.numberOfChildren}
- Bolaning yoshi: ${userProfile.childAge || "belgilanmagan"}
- Sog'lik muammolari: ${userProfile.healthConcerns || "yo'q"}

📌 Foydalanuvchi quyidagi yo'nalishlar bo'yicha yordam so'radi:
${userProfile.selectedGuidanceAreas ? userProfile.selectedGuidanceAreas.map((area, index) => `${index + 1}. ${area}`).join("\n") : "1. Emizish\n2. Ovqatlanish\n3. Chaqaloq rivojlanishi\n4. Hayz tsiklini kuzatish"}

Har bir tanlangan yo'nalish uchun alohida, aniq tuzilgan bo'lim bering.

Ohangni iliq, hurmatli va hamdard qiling - onaga gaplashgandek.
Foydali bo'lgan joylarda real hayotdan misollar keltiring. Umumiy maslahatlardan saqlaning. E'tibor bering:

- **Emizish**: To'g'ri tutish, sut ko'paytirish maslahatlari, og'riqni kamaytirish usullari, emizish jadvali
- **Ovqatlanish**: Tug'ruqdan keyingi onalar uchun sog'lom ovqatlar, suv ichish, sutni ko'paytiradigan ovqatlar, vitaminlar
- **Chaqaloq rivojlanishi**: Chaqaloq yoshi uchun rivojlanish bosqichlari, sog'lom o'sish belgilari, ota-ona va bola o'rtasidagi bog'lanish mashqlari
- **Hayz tsiklini kuzatish**: Hayz qachon qaytishini kutish, gormonal o'zgarishlar, jismoniy va hissiy belgilar

**Oddiy, ravon o'zbek tilida** javob bering. Paragraflar, nuqtalar ro'yxati va iliq rag'batlantirishdan foydalaning. Zarur bo'lmasa, tibbiy atamalardan saqlaning.

Javobni 400-500 so'z atrofida bering.`

    const russianPrompt = `Вы квалифицированный ИИ-помощник по материнскому и детскому здоровью, уходу и психологической поддержке.

На основе следующего профиля пользователя составьте персонализированные, теплые, понятные и полезные рекомендации:

👩 Профиль матери:
- Год рождения: ${userProfile.yearOfBirth}
- Возраст: ${new Date().getFullYear() - Number.parseInt(userProfile.yearOfBirth)} лет
- Статус: ${userProfile.pregnancyStatus}
- Количество детей: ${userProfile.numberOfChildren}
- Возраст ребенка: ${userProfile.childAge || "не указан"}
- Имя ребенка: ${userProfile.babyName || "не указано"}
- Статус грудного вскармливания: ${userProfile.breastfeedingStatus || "не указан"}
- Проблемы со здоровьем: ${userProfile.healthConcerns || "нет"}
- Язык: ${userProfile.preferredLanguage}

📋 Рекомендации должны включать следующие направления:

1. **Рекомендации по грудному вскармливанию**: увеличение лактации, правильное прикладывание, уход за грудью, режим кормления.

2. **Питание матери**: полезные продукты, витамины, напитки для восстановления, продукты богатые железом, источники кальция.

3. **Развитие ребенка**: нормальные этапы для ребенка возраста ${userProfile.childAge || "новорожденного"}, показатели роста.

4. **Психическое и физическое восстановление**: режим сна, борьба со стрессом, легкие упражнения, способы отдыха.

5. **Восстановление менструального цикла**: нормальные сроки, причины нарушений, рекомендации по наблюдению.

6. **Дополнительные советы**: социальная поддержка, помощь близких, уход за ребенком, использование приложения Lactamira.

Пожалуйста, изложите каждый раздел в отдельных параграфах. Пишите рекомендации простым, основанным на доказательствах и теплым стилем. Ответ должен быть около 400-500 слов.`

    const englishPrompt = `You are a qualified AI assistant for maternal and child health, care, and psychological support.

Based on the following user profile, create personalized, warm, understandable, and helpful recommendations:

👩 Mother's Profile:
- Year of Birth: ${userProfile.yearOfBirth}
- Age: ${new Date().getFullYear() - Number.parseInt(userProfile.yearOfBirth)} years old
- Status: ${userProfile.pregnancyStatus}
- Number of Children: ${userProfile.numberOfChildren}
- Child's Age: ${userProfile.childAge || "not specified"}
- Baby's Name: ${userProfile.babyName || "not specified"}
- Breastfeeding Status: ${userProfile.breastfeedingStatus || "not specified"}
- Health Concerns: ${userProfile.healthConcerns || "none"}
- Language: ${userProfile.preferredLanguage}

📋 Recommendations should include the following areas:

1. **Breastfeeding Recommendations**: increasing milk supply, proper latching, breast care, feeding schedule.

2. **Mother's Nutrition**: beneficial foods, vitamins, recovery drinks, iron-rich foods, calcium sources.

3. **Child Development**: normal stages for a ${userProfile.childAge || "newborn"} child, growth indicators.

4. **Mental and Physical Recovery**: sleep routine, stress management, light exercises, rest methods.

5. **Menstrual Cycle Recovery**: normal timing, causes of disruptions, monitoring recommendations.

6. **Additional Advice**: social support, help from loved ones, childcare, using the Lactamira app.

Please present each section in separate paragraphs. Write recommendations in a simple, evidence-based, and warm style. Response should be around 400-500 words.`

    // Select prompt based on language
    let prompt = englishPrompt
    if (language === "uz") {
      prompt = uzbekPrompt
    } else if (language === "ru") {
      prompt = russianPrompt
    }

    // Use Gemini API
    const geminiApiKey = process.env.GEMINI_API_KEY

    if (!geminiApiKey) {
      throw new Error("Gemini API key not configured")
    }

    const aiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      },
    )

    if (!aiRes.ok) {
      throw new Error(`Gemini API error: ${aiRes.status}`)
    }

    const aiData = await aiRes.json()
    const result = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "Tavsiyalarni olishda xatolik yuz berdi"

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error generating guidance with Gemini:", error)

    // Return language-specific fallback guidance
    const { userProfile } = await req.json()
    const language = userProfile?.preferredLanguage || "en"

    const fallbackGuidance = {
      en: `Welcome to Lactamira! 🌸

Thank you for joining our maternal health community. Here are some essential tips to get you started:

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

You're doing an amazing job! 💕`,

      ru: `Добро пожаловать в Лактамиру! 🌸

Спасибо, что присоединились к нашему сообществу материнского здоровья. Вот несколько важных советов для начала:

**🤱 Поддержка грудного вскармливания**
- Стремитесь к 8-12 сеансам кормления в день для новорожденных
- Следите за признаками голода: поисковые движения, сосательные движения
- Обеспечьте правильное прикладывание для комфортного кормления

**🥗 Фокус на питании**
- Поддерживайте гидратацию: стремитесь к 8-10 стаканам воды в день
- Включайте продукты, богатые железом: шпинат, чечевицу, нежирное мясо
- Не забывайте о кальции: молочные продукты, листовая зелень

**😴 Отдых и восстановление**
- Спите, когда спит ваш малыш
- Принимайте помощь от семьи и друзей
- Легкие движения, когда почувствуете готовность

**📱 Использование Лактамиры**
- Отслеживайте сеансы кормления для выявления закономерностей
- Мониторьте этапы роста вашего малыша

Вы делаете потрясающую работу! 💕`,

      uz: `Lactamiraga xush kelibsiz! 🌸

Onalik salomatligi jamiyatimizga qo'shilganingiz uchun rahmat. Boshlash uchun bir nechta muhim maslahatlar:

**🤱 Emizishni qo'llab-quvvatlash**
- Yangi tug'ilgan chaqaloqlar uchun kuniga 8-12 ta emizish seansiga intiling
- Ochlik belgilarini kuzating: qidiruv harakatlari, so'rish harakatlari
- Qulay emizish uchun to'g'ri tutishni ta'minlang

**🥗 Ovqatlanishga e'tibor**
- Gidratatsiyani saqlang: kuniga 8-10 stakan suvga intiling
- Temirga boy ovqatlarni kiriting: ismaloq, yasmiq, yog'siz go'sht
- Kaltsiyni unutmang: sut mahsulotlari, bargli sabzavotlar

**😴 Dam olish va tiklanish**
- Chaqaloqingiz uxlayotganda uxlang
- Oila va do'stlardan yordam qabul qiling
- Tayyor bo'lganingizda engil harakatlar

**📱 Lactamiradan foydalanish**
- Naqshlarni aniqlash uchun emizish seanslarini kuzating
- Chaqaloqingizning o'sish bosqichlarini kuzating

Siz ajoyib ish qilyapsiz! 💕`,
    }

    return NextResponse.json({ result: fallbackGuidance[language] || fallbackGuidance.en })
  }
}
