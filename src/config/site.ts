export interface GovernorateCoverage {
  id: string;
  nameEn: string;
  nameAr: string;
  areas: { en: string; ar: string }[];
}

export interface ServiceDefinition {
  id: string;
  slug: string;
  layout: "text-left" | "image-left";
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
    isAddressVerified: true,
    address: {
      formatted:
        "apartment, Pantai Indah, 56000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
      street: "apartment, Pantai Indah",
      postalCode: "56000",
      city: "Kuala Lumpur",
      territory: "Wilayah Persekutuan Kuala Lumpur",
      country: "Malaysia",
      isMalaysiaAddress: true,
      note: "Registered business location in Malaysia; service delivery focused on Kuwait market.",
    },
    pendingClientConfirmation: {
      commercialRegistrationNumber: "Pending client verification",
      mociLicenceNumber: "Pending client verification",
      registeredPhysicalAddress:
        "apartment, Pantai Indah, 56000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
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
      noteEn: "Client-reported project completion figure",
      noteAr: "مؤشر إنجاز المشاريع المعتمد لدى العميل",
    },
    {
      id: "service-availability",
      displayValue: "24/7",
      labelEn: "Service Availability",
      labelAr: "جاهزية الخدمة",
      noteEn: "Direct dispatch availability upon schedule",
      noteAr: "جاهزية الاستجابة والجدولة الميدانية",
    },
    {
      id: "core-specializations",
      targetNumber: 4,
      displayValue: "4",
      suffix: "",
      labelEn: "Core Service Specializations",
      labelAr: "تخصصات خدمات أساسية",
      noteEn: "Repairs, leak detection, drainage, heaters & pumps",
      noteAr: "السباكة العامة، كشف الخرير، الصرف، والسخانات والمضخات",
    },
  ] as StatisticItem[],

  services: [
    {
      id: "plumbing-repairs",
      slug: "plumbing-repairs-installations",
      layout: "text-left",
      titleEn: "Plumbing Repairs & Installations",
      titleAr: "إصلاح وتمديد شبكات السباكة",
      shortDescriptionEn:
        "Engineered pipe replacements, supply line overhauls, and sanitary fixture fittings for residential and commercial premises.",
      shortDescriptionAr:
        "إصلاح وتمديد شبكات المياه، وتركيب الأدوات الصحية والخلاطات، وصيانة تمديدات المطابخ والحمامات بدقة واحترافية.",
      detailedDescriptionEn:
        "Comprehensive plumbing maintenance resolving water pressure drops, deteriorated pipes, and fixture wear across residential villas and commercial facilities in Kuwait. Executed with premium copper and heavy-duty PPR pipe systems.",
      detailedDescriptionAr:
        "خدمات سباكة متكاملة لمعالجة تلف شبكات المياه وتراجع الضغط في الفلل والمنشآت التجارية في الكويت. نعتمد خامات PPR ونحاس مطابقة للمعايير الهندسية لضمان قوة التغذية وسلامة التمديدات.",
      imagePath: "/images/services/plumbing-repairs.webp",
      imageAltEn: "Plumbing repairs and sanitary pipe installation in Kuwait",
      imageAltAr: "أعمال إصلاح السباكة وتمديد خطوط الأنابيب في الكويت",
      scopeEn: [
        "Pipe repairs and structural replacements",
        "Kitchen and bathroom plumbing maintenance",
        "Tap, mixer, toilet, and sanitary fixture installations",
      ],
      scopeAr: [
        "إصلاح وتبديل أنابيب المياه التالفة وتجديد التمديدات",
        "تمديد وصيانة خطوط سباكة المطابخ والحمامات",
        "تركيب الخلاطات، المغاسل، المراحيض، وأطقم الأدوات الصحية",
      ],
    },
    {
      id: "water-leak-detection",
      slug: "water-leak-detection-repair",
      layout: "image-left",
      titleEn: "Water Leak Detection & Repair",
      titleAr: "كشف وإصلاح خرير المياه",
      shortDescriptionEn:
        "Acoustic and thermal detection of concealed pipe fractures and targeted repair without disruptive wall or floor demolition.",
      shortDescriptionAr:
        "تحديد مواضع الخرير غير المرئية داخل الجدران والأرضيات وإصلاح الشروخ وتلف التمديدات دون تكسير عشوائي في السيراميك.",
      detailedDescriptionEn:
        "Hidden water seepage causes silent structural decay, concrete spalling, and inflated municipal water charges. We pinpoint the exact breach within pressurized potable lines and overhead water tank connections to conduct localized, durable repairs.",
      detailedDescriptionAr:
        "يؤدي تسريب المياه الخفي إلى تآكل حديد التسليح وتلف الأصباغ وارتفاع فواتير المياه. نحدد الموضع الدقيق للخلل في شبكات التغذية وخزانات المياه لتقديم حلول إصلاح مباشرة ومستدامة.",
      imagePath: "/images/services/water-leak-detection.webp",
      imageAltEn: "Non-destructive hidden water leak detection and diagnostic inspection",
      imageAltAr: "فحص وتشخيص خرير المياه غير المرئي في المباني",
      scopeEn: [
        "Hidden water leak detection behind tiles",
        "Leaking pipes and loose pressure fittings",
        "Water tank and bathroom leakage repairs",
      ],
      scopeAr: [
        "كشف مواضع خرير المياه غير المرئية خلف السيراميك",
        "إصلاح تسريبات الأنابيب والوصلات المضغوطة",
        "معالجة تسريبات خزانات المياه وأرضيات الحمامات",
      ],
    },
    {
      id: "drain-cleaning",
      slug: "drain-cleaning-pipe-maintenance",
      layout: "text-left",
      titleEn: "Drain Cleaning & Pipe Maintenance",
      titleAr: "تسليك المجاري وصيانة خطوط الصرف",
      shortDescriptionEn:
        "Mechanical clearing and descaling of obstructed branch traps, main sewer stacks, and external inspection manholes.",
      shortDescriptionAr:
        "تسليك وتطهير مجاري الصرف المسدودة في المطابخ والحمامات، وتنظيف غرف التفتيش الخارجية (المناهيل) لضمان انسياب الصرف.",
      detailedDescriptionEn:
        "Persistent drain blockages caused by grease buildup, calcified minerals, and solid residues are cleared using industrial rotary spring augers. We restore full wastewater flow while eliminating sewer odors and backflow risks.",
      detailedDescriptionAr:
        "نعالج انسدادات خطوط الصرف وغرف التفتيش المستعصية الناتجة عن تراكم الدهون والترسبات الكلسية بمعدات السبرنج الميكانيكية الموجهة، لمنع ارتداد مياه الصرف والقضاء التام على الروائح الكريهة.",
      imagePath: "/images/services/drain-cleaning.webp",
      imageAltEn: "Drain pipe clearing and sewer cleaning maintenance in Kuwait",
      imageAltAr: "تسليك مجاري الصرف الصحي وتنظيف خطوط الصرف في الكويت",
      scopeEn: [
        "Blocked kitchen and bathroom drains",
        "Drainage and sewer pipe cleaning",
        "Drainage line inspection and maintenance",
      ],
      scopeAr: [
        "تسليك انسدادات بالوعات المطابخ ومصارف الحمامات",
        "تنظيف وتطهير أنابيب الصرف والمجاري الرئيسية",
        "معاينة وصيانة غرف التفتيش الخارجية (المناهيل)",
      ],
    },
    {
      id: "water-heaters-pumps",
      slug: "water-heaters-boilers-pumps",
      layout: "image-left",
      titleEn: "Water Heaters & Pumps",
      titleAr: "السخانات المركزية ومضخات المياه",
      shortDescriptionEn:
        "Maintenance, element replacement, and pressure calibration for central water boilers, single heaters, and booster pumps.",
      shortDescriptionAr:
        "تركيب وصيانة السخانات المركزية والفردية، واستبدال الشمعات وصمامات الأمان، وتركيب مضخات رفع وضغط المياه.",
      detailedDescriptionEn:
        "Ensuring safe hot water delivery and stable household water pressure throughout all seasons. We inspect heating elements, calibrate temperature-pressure safety valves, and service automated roof booster pumps.",
      detailedDescriptionAr:
        "نوفر حلولاً متكاملة لاستقرار ضغط المياه وتأمين التدفئة المائية الآمنة في المنازل والفلل. نتولى فحص شمعات وثرموستات السخانات المركزية واستبدال التالف منها، مع ضبط وتركيب مضخات تقوية المياه.",
      imagePath: "/images/services/water-heaters-pumps.webp",
      imageAltEn: "Central water heater maintenance and pressure booster pump service",
      imageAltAr: "صيانة وتركيب السخانات المركزية ومضخات تقوية ضغط المياه",
      scopeEn: [
        "Water heater installation and repair",
        "Central water heater maintenance",
        "Water pressure booster pump installation and repair",
      ],
      scopeAr: [
        "تركيب وصيانة السخانات الفردية والمركزية",
        "تبديل شمعات السخان وفحص صمامات الأمان",
        "تركيب وصيانة مضخات تقوية وتدوير ضغط المياه",
      ],
    },
  ] as ServiceDefinition[],

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
};