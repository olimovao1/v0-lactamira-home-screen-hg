export type Language = "en" | "ru" | "uz"

export interface Translations {
  // Common
  common: {
    loading: string
    save: string
    cancel: string
    edit: string
    delete: string
    add: string
    next: string
    previous: string
    submit: string
    close: string
    yes: string
    no: string
    today: string
    yesterday: string
    week: string
    month: string
    year: string
  }

  // Navigation
  nav: {
    home: string
    feeding: string
    growth: string
    cycle: string
    profile: string
    about: string
    documents: string
    nutrition: string
    settings: string
  }

  // Greetings
  greetings: {
    morning: string
    afternoon: string
    evening: string
    welcome: string
  }

  // Home page
  home: {
    title: string
    subtitle: string
    todayImportant: string
    sessionsToday: string
    viewAll: string
    logNewSession: string
    babyGrowthTracker: string
    name: string
    age: string
    weight: string
    height: string
    percentile: string
    viewFullChart: string
    hydrationTracker: string
    todayIntake: string
    goal: string
    dailyGoal: string
    addWater: string
    nutritionTip: string
    ironRichFoods: string
    ironDescription: string
    viewNutritionGuide: string
    cycleTracker: string
    currentCycleDay: string
    nextPeriod: string
    inDays: string
    viewCycleDetails: string
    todayReminders: string
    addNewReminder: string
    dailyMotivation: string
    motivationalQuote: string
  }

  // Onboarding
  onboarding: {
    welcome: string
    step: string
    of: string
    tellAboutYourself: string
    personalizeExperience: string
    yearOfBirth: string
    currentAge: string
    preferredLanguage: string
    familyInformation: string
    understandSituation: string
    currentStatus: string
    selectStatus: string
    pregnant: string
    postpartum: string
    breastfeeding: string
    planning: string
    numberOfChildren: string
    childAge: string
    aboutBaby: string
    personalizeBaby: string
    babyName: string
    breastfeedingStatus: string
    exclusively: string
    combination: string
    formula: string
    weaning: string
    notApplicable: string
    healthConcerns: string
    bestGuidance: string
    healthConcernsOptional: string
    privacyNotice: string
    privacyText: string
    completeSetup: string
    generatingGuide: string
    personalizedGuide: string
    profileSummary: string
    status: string
    children: string
    personalizedGuidance: string
    startUsing: string
    updateProfile: string
  }

  // Breastfeeding
  breastfeeding: {
    title: string
    overview: string
    sessions: string
    totalTime: string
    minutes: string
    leftSide: string
    rightSide: string
    logNewSession: string
    feedingHistory: string
    side: string
  }

  // Growth
  growth: {
    title: string
    currentAge: string
    latestMeasurements: string
    measuredOn: string
    growthCharts: string
    weightForAge: string
    lengthForAge: string
    addNewMeasurement: string
    measurementHistory: string
    edit: string
  }

  // Period/Cycle
  period: {
    title: string
    cycleOverview: string
    currentDay: string
    cycleLength: string
    days: string
    periodLength: string
    nextPeriod: string
    daysAway: string
    period: string
    fertileWindow: string
    follicularPhase: string
    lutealPhase: string
    logPeriod: string
    upcomingDates: string
    estimatedStart: string
    highestChance: string
    nextOvulation: string
    estimatedDate: string
  }

  // Nutrition
  nutrition: {
    title: string
    searchFoods: string
    forMother: string
    forBaby: string
    breastfeedingNutrition: string
    recommendedIntake: string
    nutritionDescription: string
    protein: string
    calcium: string
    iron: string
    daily: string
    ironRichFoods: string
    ironDescription: string
    calciumRichFoods: string
    calciumDescription: string
    proteinRichFoods: string
    proteinDescription: string
    babyNutrition: string
    ageAppropriate: string
    firstFoods: string
    firstFoodsDescription: string
    months7to8: string
    months7to8Description: string
    months9to12: string
    months9to12Description: string
    remember: string
    oneNewFood: string
    watchAllergies: string
    avoidHoney: string
    avoidSaltSugar: string
  }

  // Profile
  profile: {
    title: string
    personal: string
    health: string
    pregnancyBaby: string
    preferences: string
    personalInformation: string
    fullName: string
    dateOfBirth: string
    email: string
    phone: string
    bloodType: string
    healthInformation: string
    height: string
    allergies: string
    medicalConditions: string
    medications: string
    pregnancyBabyInformation: string
    babyDateOfBirth: string
    currentlyBreastfeeding: string
    pregnancyHistory: string
    notes: string
    appPreferences: string
    enableNotifications: string
    enableReminders: string
    dataSharing: string
    theme: string
    language: string
    enabled: string
    disabled: string
    light: string
    dark: string
    system: string
  }

  // Documents
  documents: {
    title: string
    searchDocuments: string
    all: string
    medicalRecords: string
    testResults: string
    prescriptions: string
    babyDocuments: string
    insurance: string
    uploadNew: string
    storage: string
    used: string
    encrypted: string
    yourDocuments: string
    noDocuments: string
    adjustFilters: string
    download: string
    share: string
  }

  // About
  about: {
    title: string
    originalPrompt: string
    implementationNotes: string
    appFeatures: string
    homeDashboard: string
    homeDashboardDesc: string
    babyGrowthTracking: string
    babyGrowthDesc: string
    cycleTracking: string
    cycleTrackingDesc: string
    nutritionGuide: string
    nutritionGuideDesc: string
    breastfeedingTracker: string
    breastfeedingTrackerDesc: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      add: "Add",
      next: "Next",
      previous: "Previous",
      submit: "Submit",
      close: "Close",
      yes: "Yes",
      no: "No",
      today: "Today",
      yesterday: "Yesterday",
      week: "Week",
      month: "Month",
      year: "Year",
    },
    nav: {
      home: "Home",
      feeding: "Feeding",
      growth: "Growth",
      cycle: "Cycle",
      profile: "Profile",
      about: "About",
      documents: "Documents",
      nutrition: "Nutrition",
      settings: "Settings",
    },
    greetings: {
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening",
      welcome: "Welcome",
    },
    home: {
      title: "Lactamira",
      subtitle: "Your maternal health companion",
      todayImportant: "Here's what's important today for you and your baby",
      sessionsToday: "sessions today",
      viewAll: "View All",
      logNewSession: "Log New Session",
      babyGrowthTracker: "Baby Growth Tracker",
      name: "Name",
      age: "Age",
      weight: "Weight",
      height: "Height",
      percentile: "percentile",
      viewFullChart: "View Full Growth Chart",
      hydrationTracker: "Hydration Tracker",
      todayIntake: "Today's intake",
      goal: "Goal",
      dailyGoal: "of daily goal",
      addWater: "+ Add Water",
      nutritionTip: "Nutrition Tip",
      ironRichFoods: "Iron-Rich Foods for Breastfeeding",
      ironDescription:
        "Include these iron-rich foods in your diet today to support your milk production and baby's development:",
      viewNutritionGuide: "View Nutrition Guide →",
      cycleTracker: "Cycle Tracker",
      currentCycleDay: "Current Cycle Day",
      nextPeriod: "Next Period",
      inDays: "in {days} days",
      viewCycleDetails: "View Cycle Details",
      todayReminders: "Today's Reminders",
      addNewReminder: "Add New Reminder",
      dailyMotivation: "Daily Motivation",
      motivationalQuote:
        "You're doing amazing! Every moment you spend nurturing your baby is building a foundation of love and security that will last a lifetime.",
    },
    onboarding: {
      welcome: "Welcome to Lactamira",
      step: "Step",
      of: "of",
      tellAboutYourself: "Tell us about yourself",
      personalizeExperience: "This helps us personalize your experience",
      yearOfBirth: "Year of Birth",
      currentAge: "Current Age",
      preferredLanguage: "Preferred Language",
      familyInformation: "Family Information",
      understandSituation: "Help us understand your current situation",
      currentStatus: "Current Status",
      selectStatus: "Select Status",
      pregnant: "Currently Pregnant",
      postpartum: "Postpartum (After Birth)",
      breastfeeding: "Breastfeeding",
      planning: "Planning Pregnancy",
      numberOfChildren: "Number of Children",
      childAge: "Child's Age (if applicable)",
      aboutBaby: "About Your Baby",
      personalizeBaby: "Let's personalize the app for your little one",
      babyName: "Baby's Name",
      breastfeedingStatus: "Breastfeeding Status",
      exclusively: "Exclusively Breastfeeding",
      combination: "Combination (Breast + Formula)",
      formula: "Formula Feeding",
      weaning: "Currently Weaning",
      notApplicable: "Not Applicable",
      healthConcerns: "Health & Concerns",
      bestGuidance: "Help us provide the best guidance for you",
      healthConcernsOptional: "Health Concerns or Questions (Optional)",
      privacyNotice: "Privacy Notice",
      privacyText:
        "Your information is encrypted and stored securely. We use this data only to personalize your experience and provide relevant health guidance.",
      completeSetup: "Complete Setup",
      generatingGuide: "Generating Your Guide...",
      personalizedGuide: "Your Personalized Guide",
      profileSummary: "Your Profile Summary",
      status: "Status",
      children: "Children",
      personalizedGuidance: "Your Personalized Guidance",
      startUsing: "Start Using Lactamira",
      updateProfile: "Update Profile",
    },
    breastfeeding: {
      title: "Breastfeeding Tracker",
      overview: "Breastfeeding Overview",
      sessions: "Sessions",
      totalTime: "Total Time",
      minutes: "Minutes",
      leftSide: "Left Side",
      rightSide: "Right Side",
      logNewSession: "Log New Feeding Session",
      feedingHistory: "Feeding History",
      side: "Side",
    },
    growth: {
      title: "Baby Growth Tracker",
      currentAge: "Current Age",
      latestMeasurements: "Latest Measurements",
      measuredOn: "Measured on",
      growthCharts: "Growth Charts",
      weightForAge: "Weight-for-age",
      lengthForAge: "Length-for-age",
      addNewMeasurement: "Add New Measurement",
      measurementHistory: "Measurement History",
      edit: "Edit",
    },
    period: {
      title: "Cycle Tracker",
      cycleOverview: "Cycle Overview",
      currentDay: "Current Day",
      cycleLength: "Cycle Length",
      days: "days",
      periodLength: "Period Length",
      nextPeriod: "Next Period",
      daysAway: "days away",
      period: "Period",
      fertileWindow: "Fertile Window",
      follicularPhase: "Follicular Phase",
      lutealPhase: "Luteal Phase",
      logPeriod: "Log Period or Symptoms",
      upcomingDates: "Upcoming Cycle Dates",
      estimatedStart: "Estimated start date",
      highestChance: "Highest chance of conception",
      nextOvulation: "Next Ovulation",
      estimatedDate: "Estimated date",
    },
    nutrition: {
      title: "Nutrition Guide",
      searchFoods: "Search for foods or nutrients...",
      forMother: "For Mother",
      forBaby: "For Baby",
      breastfeedingNutrition: "Breastfeeding Nutrition",
      recommendedIntake: "Recommended daily intake: 2300-2500 calories",
      nutritionDescription:
        "While breastfeeding, your body needs additional nutrients to support milk production and your own recovery. Focus on nutrient-dense foods and stay well hydrated.",
      protein: "Protein",
      calcium: "Calcium",
      iron: "Iron",
      daily: "daily",
      ironRichFoods: "Iron-Rich Foods",
      ironDescription: "Essential for preventing anemia during breastfeeding",
      calciumRichFoods: "Calcium-Rich Foods",
      calciumDescription: "Important for your bone health and baby's development",
      proteinRichFoods: "Protein-Rich Foods",
      proteinDescription: "Helps with recovery and milk production",
      babyNutrition: "Baby Nutrition",
      ageAppropriate: "Age-appropriate food recommendations",
      firstFoods: "First Foods (6 months)",
      firstFoodsDescription: "Single-ingredient purees to introduce solids",
      months7to8: "7-8 Months",
      months7to8Description: "Thicker textures and combination foods",
      months9to12: "9-12 Months",
      months9to12Description: "Finger foods and more complex textures",
      remember: "Remember:",
      oneNewFood: "Introduce one new food at a time (wait 3-5 days between new foods)",
      watchAllergies: "Watch for allergic reactions",
      avoidHoney: "Avoid honey until after 12 months",
      avoidSaltSugar: "Avoid added salt and sugar",
    },
    profile: {
      title: "Maternal Profile",
      personal: "Personal",
      health: "Health",
      pregnancyBaby: "Pregnancy & Baby",
      preferences: "Preferences",
      personalInformation: "Personal Information",
      fullName: "Full Name",
      dateOfBirth: "Date of Birth",
      email: "Email",
      phone: "Phone",
      bloodType: "Blood Type",
      healthInformation: "Health Information",
      height: "Height",
      allergies: "Allergies",
      medicalConditions: "Medical Conditions",
      medications: "Medications",
      pregnancyBabyInformation: "Pregnancy & Baby Information",
      babyDateOfBirth: "Baby's Date of Birth",
      currentlyBreastfeeding: "Currently Breastfeeding",
      pregnancyHistory: "Pregnancy History",
      notes: "Notes",
      appPreferences: "App Preferences",
      enableNotifications: "Enable Notifications",
      enableReminders: "Enable Reminders",
      dataSharing: "Data Sharing with Healthcare Providers",
      theme: "Theme",
      language: "Language",
      enabled: "Enabled",
      disabled: "Disabled",
      light: "Light",
      dark: "Dark",
      system: "System",
    },
    documents: {
      title: "Medical Documents",
      searchDocuments: "Search documents...",
      all: "All",
      medicalRecords: "Medical Records",
      testResults: "Test Results",
      prescriptions: "Prescriptions",
      babyDocuments: "Baby Documents",
      insurance: "Insurance",
      uploadNew: "Upload New Document",
      storage: "Storage",
      used: "Used",
      encrypted: "Your documents are encrypted and stored securely",
      yourDocuments: "Your Documents",
      noDocuments: "No documents found",
      adjustFilters: "Try adjusting your search or filters",
      download: "Download",
      share: "Share",
    },
    about: {
      title: "About Lactamira",
      originalPrompt: "Original Design Prompt",
      implementationNotes: "Implementation Notes",
      appFeatures: "App Features",
      homeDashboard: "Home Dashboard",
      homeDashboardDesc: "Personalized welcome, daily overview, and quick access to key features",
      babyGrowthTracking: "Baby Growth Tracking",
      babyGrowthDesc: "Monitor weight, height, and developmental milestones with percentile indicators",
      cycleTracking: "Cycle Tracking",
      cycleTrackingDesc: "Track menstrual cycles with ovulation prediction and fertility windows",
      nutritionGuide: "Nutrition Guide",
      nutritionGuideDesc: "Personalized nutrition recommendations for mother and baby",
      breastfeedingTracker: "Breastfeeding Tracker",
      breastfeedingTrackerDesc: "Log feeding sessions with duration, side, and pattern analysis",
    },
  },

  ru: {
    common: {
      loading: "Загрузка...",
      save: "Сохранить",
      cancel: "Отмена",
      edit: "Редактировать",
      delete: "Удалить",
      add: "Добавить",
      next: "Далее",
      previous: "Назад",
      submit: "Отправить",
      close: "Закрыть",
      yes: "Да",
      no: "Нет",
      today: "Сегодня",
      yesterday: "Вчера",
      week: "Неделя",
      month: "Месяц",
      year: "Год",
    },
    nav: {
      home: "Главная",
      feeding: "Кормление",
      growth: "Рост",
      cycle: "Цикл",
      profile: "Профиль",
      about: "О приложении",
      documents: "Документы",
      nutrition: "Питание",
      settings: "Настройки",
    },
    greetings: {
      morning: "Доброе утро",
      afternoon: "Добрый день",
      evening: "Добрый вечер",
      welcome: "Добро пожаловать",
    },
    home: {
      title: "Лактамира",
      subtitle: "Ваш помощник по материнскому здоровью",
      todayImportant: "Вот что важно сегодня для вас и вашего малыша",
      sessionsToday: "сеансов сегодня",
      viewAll: "Посмотреть все",
      logNewSession: "Записать новый сеанс",
      babyGrowthTracker: "Трекер роста малыша",
      name: "Имя",
      age: "Возраст",
      weight: "Вес",
      height: "Рост",
      percentile: "перцентиль",
      viewFullChart: "Посмотреть полную диаграмму роста",
      hydrationTracker: "Трекер гидратации",
      todayIntake: "Сегодняшнее потребление",
      goal: "Цель",
      dailyGoal: "от дневной нормы",
      addWater: "+ Добавить воду",
      nutritionTip: "Совет по питанию",
      ironRichFoods: "Продукты, богатые железом для кормящих",
      ironDescription:
        "Включите эти продукты, богатые железом, в свой рацион сегодня для поддержки выработки молока и развития малыша:",
      viewNutritionGuide: "Посмотреть руководство по питанию →",
      cycleTracker: "Трекер цикла",
      currentCycleDay: "Текущий день цикла",
      nextPeriod: "Следующие месячные",
      inDays: "через {days} дней",
      viewCycleDetails: "Посмотреть детали цикла",
      todayReminders: "Напоминания на сегодня",
      addNewReminder: "Добавить новое напоминание",
      dailyMotivation: "Ежедневная мотивация",
      motivationalQuote:
        "Вы делаете потрясающую работу! Каждый момент, который вы проводите, заботясь о своем малыше, создает основу любви и безопасности, которая останется на всю жизнь.",
    },
    onboarding: {
      welcome: "Добро пожаловать в Лактамиру",
      step: "Шаг",
      of: "из",
      tellAboutYourself: "Расскажите нам о себе",
      personalizeExperience: "Это поможет нам персонализировать ваш опыт",
      yearOfBirth: "Год рождения",
      currentAge: "Текущий возраст",
      preferredLanguage: "Предпочитаемый язык",
      familyInformation: "Информация о семье",
      understandSituation: "Помогите нам понять вашу текущую ситуацию",
      currentStatus: "Текущий статус",
      selectStatus: "Выберите статус",
      pregnant: "В настоящее время беременна",
      postpartum: "Послеродовой период",
      breastfeeding: "Кормлю грудью",
      planning: "Планирую беременность",
      numberOfChildren: "Количество детей",
      childAge: "Возраст ребенка (если применимо)",
      aboutBaby: "О вашем малыше",
      personalizeBaby: "Давайте персонализируем приложение для вашего малыша",
      babyName: "Имя малыша",
      breastfeedingStatus: "Статус грудного вскармливания",
      exclusively: "Исключительно грудное вскармливание",
      combination: "Комбинированное (грудь + смесь)",
      formula: "Искусственное вскармливание",
      weaning: "В процессе отлучения",
      notApplicable: "Не применимо",
      healthConcerns: "Здоровье и проблемы",
      bestGuidance: "Помогите нам предоставить лучшие рекомендации для вас",
      healthConcernsOptional: "Проблемы со здоровьем или вопросы (необязательно)",
      privacyNotice: "Уведомление о конфиденциальности",
      privacyText:
        "Ваша информация зашифрована и хранится безопасно. Мы используем эти данные только для персонализации вашего опыта и предоставления соответствующих рекомендаций по здоровью.",
      completeSetup: "Завершить настройку",
      generatingGuide: "Создаем ваше руководство...",
      personalizedGuide: "Ваше персональное руководство",
      profileSummary: "Сводка вашего профиля",
      status: "Статус",
      children: "Дети",
      personalizedGuidance: "Ваши персональные рекомендации",
      startUsing: "Начать использовать Лактамиру",
      updateProfile: "Обновить профиль",
    },
    breastfeeding: {
      title: "Трекер грудного вскармливания",
      overview: "Обзор грудного вскармливания",
      sessions: "Сеансы",
      totalTime: "Общее время",
      minutes: "Минуты",
      leftSide: "Левая грудь",
      rightSide: "Правая грудь",
      logNewSession: "Записать новый сеанс кормления",
      feedingHistory: "История кормлений",
      side: "Сторона",
    },
    growth: {
      title: "Трекер роста малыша",
      currentAge: "Текущий возраст",
      latestMeasurements: "Последние измерения",
      measuredOn: "Измерено",
      growthCharts: "Диаграммы роста",
      weightForAge: "Вес по возрасту",
      lengthForAge: "Рост по возрасту",
      addNewMeasurement: "Добавить новое измерение",
      measurementHistory: "История измерений",
      edit: "Редактировать",
    },
    period: {
      title: "Трекер цикла",
      cycleOverview: "Обзор цикла",
      currentDay: "Текущий день",
      cycleLength: "Длина цикла",
      days: "дней",
      periodLength: "Длина месячных",
      nextPeriod: "Следующие месячные",
      daysAway: "дней до",
      period: "Месячные",
      fertileWindow: "Фертильное окно",
      follicularPhase: "Фолликулярная фаза",
      lutealPhase: "Лютеиновая фаза",
      logPeriod: "Записать месячные или симптомы",
      upcomingDates: "Предстоящие даты цикла",
      estimatedStart: "Предполагаемая дата начала",
      highestChance: "Наивысшая вероятность зачатия",
      nextOvulation: "Следующая овуляция",
      estimatedDate: "Предполагаемая дата",
    },
    nutrition: {
      title: "Руководство по питанию",
      searchFoods: "Поиск продуктов или питательных веществ...",
      forMother: "Для мамы",
      forBaby: "Для малыша",
      breastfeedingNutrition: "Питание при грудном вскармливании",
      recommendedIntake: "Рекомендуемое ежедневное потребление: 2300-2500 калорий",
      nutritionDescription:
        "Во время грудного вскармливания вашему организму нужны дополнительные питательные вещества для поддержки выработки молока и вашего собственного восстановления. Сосредоточьтесь на питательных продуктах и поддерживайте хорошую гидратацию.",
      protein: "Белок",
      calcium: "Кальций",
      iron: "Железо",
      daily: "в день",
      ironRichFoods: "Продукты, богатые железом",
      ironDescription: "Необходимы для предотвращения анемии во время грудного вскармливания",
      calciumRichFoods: "Продукты, богатые кальцием",
      calciumDescription: "Важны для здоровья ваших костей и развития малыша",
      proteinRichFoods: "Продукты, богатые белком",
      proteinDescription: "Помогают с восстановлением и выработкой молока",
      babyNutrition: "Питание малыша",
      ageAppropriate: "Рекомендации по питанию в соответствии с возрастом",
      firstFoods: "Первые продукты (6 месяцев)",
      firstFoodsDescription: "Однокомпонентные пюре для введения твердой пищи",
      months7to8: "7-8 месяцев",
      months7to8Description: "Более густые текстуры и комбинированные продукты",
      months9to12: "9-12 месяцев",
      months9to12Description: "Пища для самостоятельного употребления и более сложные текстуры",
      remember: "Помните:",
      oneNewFood: "Вводите по одному новому продукту за раз (ждите 3-5 дней между новыми продуктами)",
      watchAllergies: "Следите за аллергическими реакциями",
      avoidHoney: "Избегайте меда до 12 месяцев",
      avoidSaltSugar: "Избегайте добавленной соли и сахара",
    },
    profile: {
      title: "Материнский профиль",
      personal: "Личное",
      health: "Здоровье",
      pregnancyBaby: "Беременность и малыш",
      preferences: "Предпочтения",
      personalInformation: "Личная информация",
      fullName: "Полное имя",
      dateOfBirth: "Дата рождения",
      email: "Электронная почта",
      phone: "Телефон",
      bloodType: "Группа крови",
      healthInformation: "Информация о здоровье",
      height: "Рост",
      allergies: "Аллергии",
      medicalConditions: "Медицинские состояния",
      medications: "Лекарства",
      pregnancyBabyInformation: "Информация о беременности и малыше",
      babyDateOfBirth: "Дата рождения малыша",
      currentlyBreastfeeding: "В настоящее время кормлю грудью",
      pregnancyHistory: "История беременности",
      notes: "Заметки",
      appPreferences: "Настройки приложения",
      enableNotifications: "Включить уведомления",
      enableReminders: "Включить напоминания",
      dataSharing: "Обмен данными с медицинскими работниками",
      theme: "Тема",
      language: "Язык",
      enabled: "Включено",
      disabled: "Отключено",
      light: "Светлая",
      dark: "Темная",
      system: "Системная",
    },
    documents: {
      title: "Медицинские документы",
      searchDocuments: "Поиск документов...",
      all: "Все",
      medicalRecords: "Медицинские записи",
      testResults: "Результаты анализов",
      prescriptions: "Рецепты",
      babyDocuments: "Документы малыша",
      insurance: "Страхование",
      uploadNew: "Загрузить новый документ",
      storage: "Хранилище",
      used: "Использовано",
      encrypted: "Ваши документы зашифрованы и хранятся безопасно",
      yourDocuments: "Ваши документы",
      noDocuments: "Документы не найдены",
      adjustFilters: "Попробуйте изменить поиск или фильтры",
      download: "Скачать",
      share: "Поделиться",
    },
    about: {
      title: "О Лактамире",
      originalPrompt: "Оригинальное техническое задание",
      implementationNotes: "Заметки по реализации",
      appFeatures: "Функции приложения",
      homeDashboard: "Главная панель",
      homeDashboardDesc: "Персонализированное приветствие, ежедневный обзор и быстрый доступ к ключевым функциям",
      babyGrowthTracking: "Отслеживание роста малыша",
      babyGrowthDesc: "Мониторинг веса, роста и этапов развития с индикаторами перцентилей",
      cycleTracking: "Отслеживание цикла",
      cycleTrackingDesc: "Отслеживание менструального цикла с прогнозом овуляции и фертильных окон",
      nutritionGuide: "Руководство по питанию",
      nutritionGuideDesc: "Персонализированные рекомендации по питанию для мамы и малыша",
      breastfeedingTracker: "Трекер грудного вскармливания",
      breastfeedingTrackerDesc: "Запись сеансов кормления с продолжительностью, стороной и анализом паттернов",
    },
  },

  uz: {
    common: {
      loading: "Yuklanmoqda...",
      save: "Saqlash",
      cancel: "Bekor qilish",
      edit: "Tahrirlash",
      delete: "O'chirish",
      add: "Qo'shish",
      next: "Keyingi",
      previous: "Oldingi",
      submit: "Yuborish",
      close: "Yopish",
      yes: "Ha",
      no: "Yo'q",
      today: "Bugun",
      yesterday: "Kecha",
      week: "Hafta",
      month: "Oy",
      year: "Yil",
    },
    nav: {
      home: "Bosh sahifa",
      feeding: "Emizish",
      growth: "O'sish",
      cycle: "Tsikl",
      profile: "Profil",
      about: "Dastur haqida",
      documents: "Hujjatlar",
      nutrition: "Ovqatlanish",
      settings: "Sozlamalar",
    },
    greetings: {
      morning: "Xayrli tong",
      afternoon: "Xayrli kun",
      evening: "Xayrli kech",
      welcome: "Xush kelibsiz",
    },
    home: {
      title: "Laktamira",
      subtitle: "Sizning onalik salomatligi yordamchingiz",
      todayImportant: "Bugun siz va chaqaloqingiz uchun muhim narsalar",
      sessionsToday: "bugungi seanslar",
      viewAll: "Barchasini ko'rish",
      logNewSession: "Yangi seansni yozish",
      babyGrowthTracker: "Chaqaloq o'sish kuzatuvchisi",
      name: "Ism",
      age: "Yosh",
      weight: "Vazn",
      height: "Bo'y",
      percentile: "protsentil",
      viewFullChart: "To'liq o'sish jadvalini ko'rish",
      hydrationTracker: "Suv ichish kuzatuvchisi",
      todayIntake: "Bugungi iste'mol",
      goal: "Maqsad",
      dailyGoal: "kunlik me'yordan",
      addWater: "+ Suv qo'shish",
      nutritionTip: "Ovqatlanish maslahati",
      ironRichFoods: "Emizayotgan onalar uchun temirga boy ovqatlar",
      ironDescription:
        "Sut ishlab chiqarishni qo'llab-quvvatlash va chaqaloqning rivojlanishi uchun bugun ratsioningizga temirga boy ovqatlarni kiriting:",
      viewNutritionGuide: "Ovqatlanish bo'yicha qo'llanmani ko'rish →",
      cycleTracker: "Tsikl kuzatuvchisi",
      currentCycleDay: "Joriy tsikl kuni",
      nextPeriod: "Keyingi hayz",
      inDays: "{days} kundan keyin",
      viewCycleDetails: "Tsikl tafsilotlarini ko'rish",
      todayReminders: "Bugungi eslatmalar",
      addNewReminder: "Yangi eslatma qo'shish",
      dailyMotivation: "Kunlik motivatsiya",
      motivationalQuote:
        "Siz ajoyib ish qilyapsiz! Chaqaloqingizni parvarish qilish uchun sarflagan har bir daqiqangiz umr bo'yi davom etadigan sevgi va xavfsizlik asosini yaratmoqda.",
    },
    onboarding: {
      welcome: "Laktamiraga xush kelibsiz",
      step: "Qadam",
      of: "dan",
      tellAboutYourself: "O'zingiz haqida gapirib bering",
      personalizeExperience: "Bu bizga tajribangizni shaxsiylashtirish uchun yordam beradi",
      yearOfBirth: "Tug'ilgan yil",
      currentAge: "Joriy yosh",
      preferredLanguage: "Afzal ko'rgan til",
      familyInformation: "Oila ma'lumotlari",
      understandSituation: "Joriy vaziyatingizni tushunishga yordam bering",
      currentStatus: "Joriy holat",
      selectStatus: "Holatni tanlang",
      pregnant: "Hozir homilador",
      postpartum: "Tug'ruqdan keyingi davr",
      breastfeeding: "Emizish",
      planning: "Homiladorlikni rejalashtirish",
      numberOfChildren: "Bolalar soni",
      childAge: "Bolaning yoshi (agar tegishli bo'lsa)",
      aboutBaby: "Chaqaloqingiz haqida",
      personalizeBaby: "Keling, dasturni chaqaloqingiz uchun shaxsiylashtiraylık",
      babyName: "Chaqaloq ismi",
      breastfeedingStatus: "Emizish holati",
      exclusively: "Faqat ko'krak suti bilan",
      combination: "Aralash (ko'krak + aralashma)",
      formula: "Sun'iy ovqatlantirish",
      weaning: "Hozir ajratish jarayonida",
      notApplicable: "Tegishli emas",
      healthConcerns: "Salomatlik va tashvishlar",
      bestGuidance: "Siz uchun eng yaxshi yo'l-yo'riq berishga yordam bering",
      healthConcernsOptional: "Salomatlik muammolari yoki savollar (ixtiyoriy)",
      privacyNotice: "Maxfiylik haqida xabar",
      privacyText:
        "Sizning ma'lumotlaringiz shifrlangan va xavfsiz saqlanadi. Biz bu ma'lumotlarni faqat tajribangizni shaxsiylashtirish va tegishli salomatlik bo'yicha maslahatlar berish uchun ishlatamiz.",
      completeSetup: "Sozlashni yakunlash",
      generatingGuide: "Qo'llanmangizni yaratmoqdamiz...",
      personalizedGuide: "Sizning shaxsiy qo'llanmangiz",
      profileSummary: "Profil xulosasi",
      status: "Holat",
      children: "Bolalar",
      personalizedGuidance: "Sizning shaxsiy maslahatlaringiz",
      startUsing: "Laktamiradan foydalanishni boshlash",
      updateProfile: "Profilni yangilash",
    },
    breastfeeding: {
      title: "Emizish kuzatuvchisi",
      overview: "Emizish umumiy ko'rinishi",
      sessions: "Seanslar",
      totalTime: "Umumiy vaqt",
      minutes: "Daqiqalar",
      leftSide: "Chap ko'krak",
      rightSide: "O'ng ko'krak",
      logNewSession: "Yangi emizish seansini yozish",
      feedingHistory: "Emizish tarixi",
      side: "Tomon",
    },
    growth: {
      title: "Chaqaloq o'sish kuzatuvchisi",
      currentAge: "Joriy yosh",
      latestMeasurements: "So'nggi o'lchovlar",
      measuredOn: "O'lchangan sana",
      growthCharts: "O'sish jadvallari",
      weightForAge: "Yoshga nisbatan vazn",
      lengthForAge: "Yoshga nisbatan bo'y",
      addNewMeasurement: "Yangi o'lchov qo'shish",
      measurementHistory: "O'lchov tarixi",
      edit: "Tahrirlash",
    },
    period: {
      title: "Tsikl kuzatuvchisi",
      cycleOverview: "Tsikl umumiy ko'rinishi",
      currentDay: "Joriy kun",
      cycleLength: "Tsikl uzunligi",
      days: "kun",
      periodLength: "Hayz uzunligi",
      nextPeriod: "Keyingi hayz",
      daysAway: "kun qoldi",
      period: "Hayz",
      fertileWindow: "Unumdorlik oynasi",
      follicularPhase: "Follikulyar faza",
      lutealPhase: "Luteal faza",
      logPeriod: "Hayz yoki alomatlarni yozish",
      upcomingDates: "Kelgusi tsikl sanalari",
      estimatedStart: "Taxminiy boshlanish sanasi",
      highestChance: "Homiladorlikning eng yuqori ehtimoli",
      nextOvulation: "Keyingi ovulyatsiya",
      estimatedDate: "Taxminiy sana",
    },
    nutrition: {
      title: "Ovqatlanish bo'yicha qo'llanma",
      searchFoods: "Ovqat yoki ozuqa moddalarini qidirish...",
      forMother: "Ona uchun",
      forBaby: "Chaqaloq uchun",
      breastfeedingNutrition: "Emizish davrida ovqatlanish",
      recommendedIntake: "Tavsiya etilgan kunlik iste'mol: 2300-2500 kaloriya",
      nutritionDescription:
        "Emizish paytida tanangizga sut ishlab chiqarishni qo'llab-quvvatlash va o'zingizning tiklanishingiz uchun qo'shimcha ozuqa moddalar kerak. Ozuqa moddalarga boy ovqatlarga e'tibor bering va yaxshi gidratatsiyani saqlang.",
      protein: "Oqsil",
      calcium: "Kaltsiy",
      iron: "Temir",
      daily: "kuniga",
      ironRichFoods: "Temirga boy ovqatlar",
      ironDescription: "Emizish paytida anemiyaning oldini olish uchun zarur",
      calciumRichFoods: "Kaltsiyga boy ovqatlar",
      calciumDescription: "Sizning suyak salomatligingiz va chaqaloqning rivojlanishi uchun muhim",
      proteinRichFoods: "Oqsilga boy ovqatlar",
      proteinDescription: "Tiklanish va sut ishlab chiqarishga yordam beradi",
      babyNutrition: "Chaqaloq ovqatlanishi",
      ageAppropriate: "Yoshga mos ovqatlanish tavsiyalari",
      firstFoods: "Birinchi ovqatlar (6 oy)",
      firstFoodsDescription: "Qattiq ovqatlarni kiritish uchun bir komponentli pyureler",
      months7to8: "7-8 oy",
      months7to8Description: "Qalinroq teksturalar va aralash ovqatlar",
      months9to12: "9-12 oy",
      months9to12Description: "Barmoq ovqatlari va murakkabroq teksturalar",
      remember: "Eslab qoling:",
      oneNewFood: "Bir vaqtda bitta yangi ovqat kiriting (yangi ovqatlar orasida 3-5 kun kuting)",
      watchAllergies: "Allergik reaktsiyalarni kuzating",
      avoidHoney: "12 oydan keyin asalni oldini oling",
      avoidSaltSugar: "Qo'shilgan tuz va shakardan saqlaning",
    },
    profile: {
      title: "Onalik profili",
      personal: "Shaxsiy",
      health: "Salomatlik",
      pregnancyBaby: "Homiladorlik va chaqaloq",
      preferences: "Afzalliklar",
      personalInformation: "Shaxsiy ma'lumotlar",
      fullName: "To'liq ism",
      dateOfBirth: "Tug'ilgan sana",
      email: "Elektron pochta",
      phone: "Telefon",
      bloodType: "Qon guruhi",
      healthInformation: "Salomatlik ma'lumotlari",
      height: "Bo'y",
      allergies: "Allergiyalar",
      medicalConditions: "Tibbiy holatlar",
      medications: "Dorilar",
      pregnancyBabyInformation: "Homiladorlik va chaqaloq ma'lumotlari",
      babyDateOfBirth: "Chaqaloqning tug'ilgan sanasi",
      currentlyBreastfeeding: "Hozir emizmoqda",
      pregnancyHistory: "Homiladorlik tarixi",
      notes: "Eslatmalar",
      appPreferences: "Dastur sozlamalari",
      enableNotifications: "Bildirishnomalarni yoqish",
      enableReminders: "Eslatmalarni yoqish",
      dataSharing: "Tibbiy xodimlar bilan ma'lumot almashish",
      theme: "Mavzu",
      language: "Til",
      enabled: "Yoqilgan",
      disabled: "O'chirilgan",
      light: "Yorug'",
      dark: "Qorong'u",
      system: "Tizim",
    },
    documents: {
      title: "Tibbiy hujjatlar",
      searchDocuments: "Hujjatlarni qidirish...",
      all: "Barchasi",
      medicalRecords: "Tibbiy yozuvlar",
      testResults: "Tahlil natijalari",
      prescriptions: "Retseptlar",
      babyDocuments: "Chaqaloq hujjatlari",
      insurance: "Sug'urta",
      uploadNew: "Yangi hujjat yuklash",
      storage: "Saqlash",
      used: "Ishlatilgan",
      encrypted: "Sizning hujjatlaringiz shifrlangan va xavfsiz saqlanadi",
      yourDocuments: "Sizning hujjatlaringiz",
      noDocuments: "Hujjatlar topilmadi",
      adjustFilters: "Qidiruv yoki filtrlarni o'zgartirib ko'ring",
      download: "Yuklab olish",
      share: "Ulashish",
    },
    about: {
      title: "Laktamira haqida",
      originalPrompt: "Asl dizayn topshirig'i",
      implementationNotes: "Amalga oshirish eslatmalari",
      appFeatures: "Dastur xususiyatlari",
      homeDashboard: "Bosh panel",
      homeDashboardDesc: "Shaxsiylashtirilgan salomlashish, kunlik sharh va asosiy xususiyatlarga tez kirish",
      babyGrowthTracking: "Chaqaloq o'sishini kuzatish",
      babyGrowthDesc: "Protsentil ko'rsatkichlari bilan vazn, bo'y va rivojlanish bosqichlarini kuzatish",
      cycleTracking: "Tsiklni kuzatish",
      cycleTrackingDesc: "Ovulyatsiya prognozi va unumdorlik oynalari bilan hayz tsiklini kuzatish",
      nutritionGuide: "Ovqatlanish bo'yicha qo'llanma",
      nutritionGuideDesc: "Ona va chaqaloq uchun shaxsiylashtirilgan ovqatlanish tavsiyalari",
      breastfeedingTracker: "Emizish kuzatuvchisi",
      breastfeedingTrackerDesc: "Davomiyligi, tomoni va naqsh tahlili bilan emizish seanslarini yozish",
    },
  },
}

export function useTranslation(language: Language = "en") {
  return translations[language] || translations.en
}
