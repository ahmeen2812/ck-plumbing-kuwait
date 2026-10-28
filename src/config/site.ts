export interface GovernorateCoverage {
  id: string;
  nameEn: string;
  nameAr: string;
  areas: { en: string; ar: string }[];
}

export interface ServiceDefinition {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  detailedDescriptionEn: string;
  detailedDescriptionAr: string;
  imagePath: string;
  imageAltEn: string;
  imageAltAr: string;
  scopeEn: string[];
  scopeAr: string[];
}

export interface StatisticItem {
  id: string;
  targetNumber?: number;
  displayValue: string;
  suffix?: string;
  labelEn: string;
  labelAr: string;
  noteEn: string;
  noteAr: string;
}

export const SITE_CONFIG = {
  brand: {
    nameEn: "CK Plumbing & Electrical Service",
    nameAr: "سي كيه لخدمات السباكة والكهرباء",
    tradeName: "CK Technical Services",
    country: "State of Kuwait",
    countryCode: "KW",
    currency: {
      code: "KWD",
      symbolEn: "KD",
      symbolAr: "د.ك",
    },
    timezone: "Asia/Kuwait",
    defaultLocale: "ar",
    supportedLocales: ["ar", "en"] as const,
  },

  contact: {
    phoneRaw: "+601139318597",
    phoneTel: "tel:+601139318597",
    phoneDisplay: "+60 11-3931 8597",
    whatsappRaw: "+601139318597",
    email: "contact@ckplumbingkw.example",
    isPhoneVerified: true,
    isWhatsappVerified: true,
    isAddressVerified: false,
    pendingClientConfirmation: {
      commercialRegistrationNumber: "Pending client verification",
      mociLicenceNumber: "Pending client verification",
      registeredPhysicalAddress: "Kuwait City, State of Kuwait",
      operatingHours: "Saturday – Thursday: 08:00 – 20:00",
    },
  },

  meta: {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ckplumbingkw.com",
    titleTemplate: "%s | CK Plumbing & Electrical Kuwait",
    defaultTitleEn: "CK Plumbing & Electrical Service | Professional Engineering Maintenance Kuwait",
    defaultTitleAr: "سي كيه لخدمات السباكة والكهرباء | حلول هندسية وصيانة معتمدة في الكويت",
    defaultDescriptionEn:
      "Licensed commercial and residential plumbing engineering, leak detection, drainage clearing, and water systems maintenance across all Kuwait Governorates.",
    defaultDescriptionAr:
      "خدمات سباكة وصيانة فنية متكاملة للمباني السكنية والتجارية. كشف الخرير، تسليك وتطهير شبكات الصرف، وتركيب المضخات والسخانات المركزية في كافة محافظات الكويت.",
  },

  statistics: [
    {
      id: "projects-completed",
      targetNumber: 600,
      displayValue: "600+",
      suffix: "+",
      labelEn: "Projects Completed",
      labelAr: "مشروع منجز",
      noteEn: "Client operational figure across Kuwait governorates",
      noteAr: "مؤشر تشغيلي تقديري معتمد للمشاريع في الكويت",
    },
    {
      id: "service-availability",
      displayValue: "24/7",
      labelEn: "Service Availability",
      labelAr: "جاهزية الخدمة",
      noteEn: "Direct response dispatch subject to schedule",
      noteAr: "جاهزية الاستجابة الميدانية وفق الجدولة",
    },
    {
      id: "governorates-covered",
      targetNumber: 6,
      displayValue: "6",
      suffix: "",
      labelEn: "Kuwait Governorates Covered",
      labelAr: "محافظات كويتية مغطاة",
      noteEn: "Capital, Hawalli, Farwaniya, Ahmadi, Mubarak Al-Kabeer, Jahra",
      noteAr: "العاصمة، حولي، الفروانية، الأحمدي، مبارك الكبير، والجهراء",
    },
  ] as StatisticItem[],

  compliance: {
    applicableLaws: [
      {
        title: "Kuwait Electronic Transactions Law No. 20/2014",
        notes: "Governs electronic records, authentic inquiries, and secure electronic communications.",
      },
      {
        title: "Kuwait Consumer Protection Law No. 39/2014",
        notes: "Strict transparency of pricing, accurate quotation before work execution, and prohibition of deceptive warranties.",
      },
      {
        title: "Decree-Law No. 10/2026 on Digital Commerce",
        notes:
          "Mandates transparent commercial identification, verifiable contacts, and privacy compliance upon enactment and publication of executive regulations.",
      },
      {
        title: "CITRA Digital Data Guidelines",
        notes: "Respect of user data confidentiality without unsanctioned tracking or commercial reselling.",
      },
    ],
    onlinePaymentIntegrated: false,
    unsupportedClaimsPolicy:
      "We strictly do not advertise fabricated emergency response guarantees, unauthorized 24/7 claims, or unverified licensing certificates.",
  },

  serviceGovernorates: [
    {
      id: "capital",
      nameEn: "Capital (Al-Asimah)",
      nameAr: "محافظة العاصمة",
      areas: [
        { en: "Kuwait City", ar: "مدينة الكويت" },
        { en: "Sharq", ar: "شرق" },
        { en: "Dasman", ar: "دسمان" },
        { en: "Al-Mirgab", ar: "المرقاب" },
        { en: "Al-Salhiya", ar: "الصالحية" },
        { en: "Shamiya", ar: "الشامية" },
        { en: "Rawda", ar: "الروضة" },
        { en: "Adailiya", ar: "العديلية" },
        { en: "Khaldiya", ar: "الخالدية" },
        { en: "Kaifan", ar: "كيفان" },
        { en: "Shuwaikh Industrial", ar: "الشويخ الصناعية" },
      ],
    },
    {
      id: "hawalli",
      nameEn: "Hawalli Governorate",
      nameAr: "محافظة حولي",
      areas: [
        { en: "Hawalli", ar: "حولي" },
        { en: "Salmiya", ar: "السالمية" },
        { en: "Rumaithiya", ar: "الرميثية" },
        { en: "Jabriya", ar: "الجابرية" },
        { en: "Bayan", ar: "بيان" },
        { en: "Mishref", ar: "مشرف" },
        { en: "Salwa", ar: "سلوى" },
        { en: "Shaab", ar: "الشعب" },
      ],
    },
    {
      id: "farwaniya",
      nameEn: "Farwaniya Governorate",
      nameAr: "محافظة الفروانية",
      areas: [
        { en: "Farwaniya", ar: "الفروانية" },
        { en: "Khaitan", ar: "خيطان" },
        { en: "Al-Rai Industrial", ar: "الري الصناعية" },
        { en: "Ishbiliya", ar: "إشبيلية" },
        { en: "Sabah Al-Nasser", ar: "صباح الناصر" },
        { en: "Ardiya Industrial", ar: "العارضية الصناعية" },
        { en: "Jleeb Al-Shuyoukh", ar: "جليب الشيوخ" },
      ],
    },
    {
      id: "ahmadi",
      nameEn: "Ahmadi Governorate",
      nameAr: "محافظة الأحمدي",
      areas: [
        { en: "Fahaheel", ar: "الفحيحيل" },
        { en: "Mangaf", ar: "المنقف" },
        { en: "Mahboula", ar: "المهبولة" },
        { en: "Abu Halifa", ar: "أبو حليفة" },
        { en: "Egaila", ar: "العقيلة" },
        { en: "Sabah Al Ahmad", ar: "مدينة صباح الأحمد" },
        { en: "Khiran", ar: "الخيران" },
      ],
    },
    {
      id: "mubarak-al-kabeer",
      nameEn: "Mubarak Al-Kabeer Governorate",
      nameAr: "محافظة مبارك الكبير",
      areas: [
        { en: "Sabah Al-Salem", ar: "صباح السالم" },
        { en: "Al-Qurain", ar: "القرين" },
        { en: "Al-Qusour", ar: "القصور" },
        { en: "Al-Adan", ar: "العدان" },
        { en: "Abu Futaira", ar: "أبو فطيرة" },
        { en: "Al-Funitees", ar: "الفنيطيس" },
      ],
    },
    {
      id: "jahra",
      nameEn: "Jahra Governorate",
      nameAr: "محافظة الجهراء",
      areas: [
        { en: "Jahra City", ar: "مدينة الجهراء" },
        { en: "Saad Al-Abdullah", ar: "مدينة سعد العبدالله" },
        { en: "Oyoun", ar: "العيون" },
        { en: "Al-Naseem", ar: "النسيم" },
        { en: "Amghara Industrial", ar: "أمغرة الصناعية" },
      ],
    },
  ] as GovernorateCoverage[],

  services: [
    {
      id: "plumbing-repairs",
      slug: "plumbing-repairs-installations",
      titleEn: "Plumbing Repairs & Installations",
      titleAr: "إصلاح وتمديد شبكات السباكة",
      shortDescriptionEn:
        "Professional pipe repairs, sanitary fixture installations, and waterline fittings for residential and commercial properties.",
      shortDescriptionAr:
        "إصلاح وتمديد أنابيب المياه، تركيب وصيانة الأدوات الصحية والخلاطات، ومعالجة تمديدات المطابخ والحمامات بدقة واحترافية.",
      detailedDescriptionEn:
        "Complete plumbing solutions addressing pipe deterioration, pressure imbalances, and sanitary installations across villas and commercial premises in Kuwait. Executed with heavy-duty copper and PPR materials.",
      detailedDescriptionAr:
        "خدمات سباكة متكاملة لمعالجة مشاكل تمديدات المياه وتلف الأنابيب في فلل ومباني الكويت. نلتزم باستخدام خامات متينة ومحابس أصلية لضمان كفاءة التغذية المائية بدون تسريبات.",
      imagePath: "/images/services/plumbing-repairs.webp",
      imageAltEn: "Plumber repairing sanitary pipes and bathroom fittings in Kuwait",
      imageAltAr: "فني صحي يقوم بإصلاح وتمديد شبكات السباكة والأدوات الصحية في الكويت",
      scopeEn: [
        "Pipe repairs and structural replacements",
        "Kitchen and bathroom plumbing maintenance",
        "Tap, mixer, toilet, and sanitary fixture installations",
      ],
      scopeAr: [
        "إصلاح وتبديل أنابيب المياه التالفة",
        "تمديد وصيانة سباكة المطابخ والحمامات",
        "تركيب الخلاطات، المغاسل، المراحيض، والأدوات الصحية",
      ],
    },
    {
      id: "water-leak-detection",
      slug: "water-leak-detection-repair",
      titleEn: "Water Leak Detection & Repair",
      titleAr: "كشف وإصلاح خرير المياه",
      shortDescriptionEn:
        "Identification and engineered repair of concealed pipe leaks, ceiling moisture, and water tank seepages without unnecessary wall breaking.",
      shortDescriptionAr:
        "تحديد مواضع الخرير المخفية داخل الجدران والأسقف وإصلاح الشروخ وتلف التمديدات دون تكسير عشوائي في السيراميك.",
      detailedDescriptionEn:
        "Concealed leaks lead to high water bills and structural decay. We accurately isolate the root source of seepage in pressure lines, bathroom floors, and overhead tanks to perform targeted repairs.",
      detailedDescriptionAr:
        "يتسبب خرير المياه غير المرئي في تلف الخرسانة وارتفاع فواتير المياه. نعمل على تحديد مصدر التسريب بدقة في خطوط التغذية وأرضيات الحمامات وخزانات المياه لمعالجة الخلل بشكل جذري.",
      imagePath: "/images/services/water-leak-detection.webp",
      imageAltEn: "Diagnostic water leak detection and pipe inspection",
      imageAltAr: "كشف خرير المياه وفحص تسريب الأنابيب في المباني السكنية",
      scopeEn: [
        "Hidden water leak detection behind tiles",
        "Leaking pipes and loose pressure fittings",
        "Water tank and bathroom leakage repairs",
      ],
      scopeAr: [
        "كشف مواضع خرير المياه غير المرئية خلف السيراميك",
        "إصلاح تسريبات الأنابيب والوصلات المضغوطة",
        "معالجة تسريبات خزانات المياه وشبكات الصرف الداخلية",
      ],
    },
    {
      id: "drain-cleaning",
      slug: "drain-cleaning-pipe-maintenance",
      titleEn: "Drain Cleaning & Pipe Maintenance",
      titleAr: "تسليك المجاري وصيانة خطوط الصرف",
      shortDescriptionEn:
        "Comprehensive clearance of clogged drains, sewer pipes, and waste lines with complete maintenance of inspection chambers.",
      shortDescriptionAr:
        "تسليك وتطهير مجاري الصرف المسدودة في المطابخ والحمامات، وتنظيف غرف التفتيش الخارجية (المناهيل) لضمان انسياب الصرف.",
      detailedDescriptionEn:
        "Heavy blockages in kitchen branches and external sewer lines are mechanically cleared and flushed, eliminating grease sediment, foul odours, and recurring backflow into the property.",
      detailedDescriptionAr:
        "نعالج انسدادات شبكات الصرف الصحي المستعصية وغرف التفتيش الخارجية باستخدام أدوات التسليك الميكانيكية، مما يزيل الدهون والرواسب ويمنع ارتداد مياه الصرف والروائح الكريهة.",
      imagePath: "/images/services/drain-cleaning.webp",
      imageAltEn: "Sewer drain cleaning and pipeline maintenance in Kuwait",
      imageAltAr: "تسليك وتطهير شبكات الصرف الصحي وغرف التفتيش في الكويت",
      scopeEn: [
        "Blocked kitchen and bathroom drains",
        "Drainage and sewer pipe cleaning",
        "Drainage line inspection and maintenance",
      ],
      scopeAr: [
        "تسليك انسدادات بالوعات المطابخ والحمامات",
        "تنظيف وتطهير أنابيب الصرف والمجاري الرئيسية",
        "فحص وصيانة خطوط الصرف وغرف التفتيش الخارجية",
      ],
    },
    {
      id: "water-heaters-pumps",
      slug: "water-heaters-boilers-pumps",
      titleEn: "Water Heaters & Pumps",
      titleAr: "السخانات المركزية ومضخات المياه",
      shortDescriptionEn:
        "Installation, testing, and maintenance of central water heaters, single-unit boilers, and water pressure booster pumps.",
      shortDescriptionAr:
        "تركيب وصيانة السخانات المركزية والفردية، واستبدال الشمعات وصمامات الأمان، وتركيب مضخات رفع وضغط المياه.",
      detailedDescriptionEn:
        "Ensuring consistent hot water delivery and stable water pressure throughout high-demand villas. We maintain heating elements, thermostats, expansion valves, and roof-top pressure booster pumps.",
      detailedDescriptionAr:
        "نضمن استقرار ضغط المياه وتوفير المياه الساخنة بأمان في المباني والفلل. نقدم خدمات متكاملة لصيانة شمعات وثرموستات السخانات المركزية، إلى جانب ضبط وتركيب مضخات دفع المياه المنزلية.",
      imagePath: "/images/services/water-heaters-pumps.webp",
      imageAltEn: "Central water heater and water pressure booster pump service",
      imageAltAr: "صيانة وتركيب السخان المركزي ومضخات تقوية ضغط المياه في الكويت",
      scopeEn: [
        "Water heater installation and repair",
        "Central water heater maintenance",
        "Water pressure booster pump installation and repair",
      ],
      scopeAr: [
        "تركيب وصيانة السخانات العادية والمركزية",
        "تبديل شمعات السخان وفحص صمامات الأمان",
        "تركيب وصيانة مضخات تقوية وتدوير ضغط المياه",
      ],
    },
  ] as ServiceDefinition[],
};