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
      id: "pipe-repair",
      slug: "pipe-repair-maintenance",
      titleEn: "Pipe Repair & Pressure Lines",
      titleAr: "إصلاح وتمديد شبكات الأنابيب",
      shortDescriptionEn:
        "Engineered repair and installation of high-pressure PPR, PEX, and copper water distribution lines.",
      shortDescriptionAr:
        "تمديد وصيانة خطوط تغذية المياه المضغوطة بمواد PPR والبكس والنحاس وفق المعايير الهندسية.",
      detailedDescriptionEn:
        "Water distribution networks in Kuwait face extreme summer thermal cycles and high mineral loads. We conduct structural evaluations, isolate pipe stress fractures, and install robust, pressure-tested piping systems.",
      detailedDescriptionAr:
        "تتعرض شبكات المياه في الكويت لدرجات حرارة صيفية قصوى وأملاح عالية. نوفر فحوصات هندسية دقيقة لتحديد الشروخ واستبدال الخطوط التالفة بشبكات بولي بروبيلين مقاومة للضغط ومختبرة هيدروليكياً.",
      imagePath: "/images/service-pipe-repair.webp",
      imageAltEn: "High-grade copper and PPR pipe welding and installation in Kuwait",
      imageAltAr: "تركيب ولحام خطوط الأنابيب النحاسية والبولي بروبيلين في الكويت",
      scopeEn: [
        "PPR, PEX, and multi-layer pipe fusion",
        "Hydrostatic pressure testing before drywall closure",
        "Isolation valve replacement and manifold re-balancing",
        "Thermal expansion joint installation",
      ],
      scopeAr: [
        "لحام وتركيب شبكات PPR وبكس المعتمدة",
        "اختبار الضغط الهيدروليكي قبل إغلاق القواطع",
        "استبدال محابس العزل وتوازن موزعات المياه (Manifolds)",
        "معالجة فواصل التمدد الحراري لحماية التمديدات",
      ],
    },
    {
      id: "drainage-clearing",
      slug: "drainage-sewer-clearing",
      titleEn: "Drainage & Sewer Clearing",
      titleAr: "تسليك وتطهير شبكات الصرف",
      shortDescriptionEn:
        "Mechanical and high-pressure jetting solutions for obstructed main sewer lines and residential stacks.",
      shortDescriptionAr:
        "حلول هندسية وميكانيكية بالضغط العالي لتسليك خطوط الصرف الرئيسية وتطهير المجاري الداخلية.",
      detailedDescriptionEn:
        "Blockages in grease-laden kitchen branches and main inspection chambers are cleared using specialized mechanical rotary cables and pressure equipment without damaging underlying PVC or vitrified clay lines.",
      detailedDescriptionAr:
        "نعالج انسدادات غرف التفتيش وخطوط الصرف الممتلئة بالدهون والرواسب الصلبة باستخدام مكائن السبرنج الدوارة ومعدات ضغط المياه الموجه دون إلحاق الضرر بالأنابيب البلاستيكية أو الفخارية.",
      imagePath: "/images/service-drainage-clearing.webp",
      imageAltEn: "Professional mechanical drain jetting and obstruction removal",
      imageAltAr: "تسليك ميكانيكي لخطوط الصرف وغرف التفتيش في المباني",
      scopeEn: [
        "Mechanical rotary spring cable clearing",
        "Main inspection chamber (manhole) desilting",
        "Grease interceptor cleanout and stack venting",
        "Anti-backflow check valve installation",
      ],
      scopeAr: [
        "تسليك بالسبرنج الآلي الدوار للانسدادات المستعصية",
        "تنظيف وتطهير غرف التفتيش الخارجية (Manholes)",
        "معالجة انسدادات مصائد الزيوت وهوايات الصرف",
        "تركيب ردادات لمنع ارتداد مياه الصرف والقوارض",
      ],
    },
    {
      id: "water-heaters",
      slug: "water-heaters-boilers",
      titleEn: "Water Heaters & Central Boilers",
      titleAr: "سخانات المياه والأنظمة المركزية",
      shortDescriptionEn:
        "Installation, element testing, and safety valve commissioning for central and single-unit water heaters.",
      shortDescriptionAr:
        "تركيب وصيانة السخانات المركزية والفردية، فحص المقاومات الكهربائية، ومعايرة صمامات الأمان.",
      detailedDescriptionEn:
        "Complete diagnosis of scale accumulation, burnt heating elements, faulty thermostats, and temperature-pressure relief (TPR) valves to ensure safe, compliant domestic hot water operation.",
      detailedDescriptionAr:
        "تشخيص متكامل لمشاكل ترسب التكلسات، احتراق شمعات التسخين، وتلف الثرموستات. نقوم بتركيب واختبار صمامات الضغط والحرارة (TPR) لضمان التشغيل الآمن وتفادي أخطار الضغط الزائد.",
      imagePath: "/images/service-water-heaters.webp",
      imageAltEn: "Central water heater and boiler maintenance in Kuwait residential building",
      imageAltAr: "صيانة وضبط سخان مياه مركزي وفحص صمامات الأمان في الكويت",
      scopeEn: [
        "Central boiler element and thermostat replacement",
        "TPR safety valve inspection and discharge line testing",
        "Sacrificial magnesium anode replacement",
        "Single electric heater wall-mounting & pipe union fitting",
      ],
      scopeAr: [
        "استبدال شمعات السخان المركزي والثرموستات المعتمدة",
        "فحص صمام الأمان (رداد التنفيس) وخط التصريف",
        "استبدال عمود الماغنيسيوم لمقاومة الصدأ والتآكل",
        "تركيب وتوصيل السخانات الفردية بوصلات عزل متينة",
      ],
    },
    {
      id: "water-pumps",
      slug: "booster-submersible-pumps",
      titleEn: "Water Booster & Sump Pumps",
      titleAr: "مضخات رفع المياه ومضخات الغاطس",
      shortDescriptionEn:
        "Commissioning and service for variable-speed booster pumps, roof supply systems, and basement sump pumps.",
      shortDescriptionAr:
        "تركيب وبرمجة مضخات تعزيز الضغط الذكية، مضخات السطح، ومضخات السرداب الغاطسة.",
      detailedDescriptionEn:
        "Maintaining steady domestic water pressure requires properly calibrated booster pump controllers, expansion diaphragms, and reliable basement drainage pumps for unexpected groundwater ingress.",
      detailedDescriptionAr:
        "لضمان استقرار ضغط المياه في الأدوار العليا، نقوم بتركيب وضبط مضخات الدفع الذكية (Inverter) وفحص بلونات الضغط، إلى جانب صيانة مضخات السرداب الغاطسة وتجهيزها بمفاتيح العوامات التلقائية.",
      imagePath: "/images/service-water-pumps.webp",
      imageAltEn: "Booster water pump with electronic pressure controller",
      imageAltAr: "مضخة تعزيز ضغط المياه مع جهاز التحكم الإلكتروني الأوتوماتيكي",
      scopeEn: [
        "Variable speed constant-pressure pump installation",
        "Pressure tank (diaphragm) pre-charge inspection",
        "Basement sump pump wiring and dual float switch setup",
        "Pump mechanical seal and check-valve replacement",
      ],
      scopeAr: [
        "تركيب مضخات الضغط الذكية ذات السرعات المتغيرة",
        "فحص ضغط الهواء داخل بلونة الضغط واستبدال التالف منها",
        "تجهيز مضخات السرداب الغاطسة بعوامات الفصل والتشغيل",
        "استبدال مانع التسريب الميكانيكي ومحابس عدم الرجوع",
      ],
    },
    {
      id: "fixture-fitting",
      slug: "sanitary-fixtures-installations",
      titleEn: "Sanitary Fixture Installation",
      titleAr: "تركيب الأدوات الصحية والخلاطات",
      shortDescriptionEn:
        "Precision fitting of wall-hung toilets, concealed cisterns, thermostatic mixers, and water filtration units.",
      shortDescriptionAr:
        "تركيب وتثبيت المراحيض المعلقة، الصناديق المخفية، خلاطات الدش الثرموستاتية، وفلاتر المياه.",
      detailedDescriptionEn:
        "Installation of modern sanitary ware demands millimetric alignment, correct bracket loading, and watertight silicone sealing to prevent seepage into concrete subfloors.",
      detailedDescriptionAr:
        "يتطلب تثبيت الأدوات الصحية الحديثة دقة تامة ومحاذاة هندسية صحيحة للهيكل الحديدي للصناديق المدفونة، مع عزل السيليكون المعالج ضد الرطوبة والبكتيريا لحماية الأرضيات والخرسانة.",
      imagePath: "/images/service-fixture-fitting.webp",
      imageAltEn: "Precision sanitary ware and concealed cistern installation",
      imageAltAr: "تركيب دقيق للأدوات الصحية وخلاطات المياه المدمجة بالجدار",
      scopeEn: [
        "Concealed cistern frame anchorage and mechanism service",
        "Wall-hung WC pan installation and acoustic decoupling",
        "Thermostatic shower mixer cartridge adjustment",
        "Multi-stage domestic water filter installation",
      ],
      scopeAr: [
        "تثبيت شاسيه الصندوق المدفون وصيانة العوامة ومكبس التصريف",
        "تركيب المراحيض المعلقة واستخدام العوازل المانعة للاهتزاز",
        "معايرة خلاطات الدش الذكية واستبدال قلب الخلاط التالف",
        "توصيل فلاتر تنقية المياه المنزلية متعددة المراحل",
      ],
    },
    {
      id: "leak-detection",
      slug: "non-destructive-leak-detection",
      titleEn: "Diagnostic Leak Detection",
      titleAr: "كشف الخرير والفحص الهندسي",
      shortDescriptionEn:
        "Acoustic and thermal diagnosis of hidden pipe breaches behind ceramic tiling without destructive demolition.",
      shortDescriptionAr:
        "تحديد مواضع التسريب الخفية خلف السيراميك والخرسانة بأجهزة الفحص الصوتي والحراري دون تكسير عشوائي.",
      detailedDescriptionEn:
        "Hidden pipe fractures cause insidious structural degradation and inflated water utility charges. We deploy electro-acoustic listening discs and thermal imaging sensors to isolate the root source.",
      detailedDescriptionAr:
        "يؤدي تسريب المياه غير المرئي إلى تآكل حديد التسليح وتلف الأصباغ وارتفاع غير مبرر في فاتورة المياه. نعتمد أجهزة قياس الضغط وأجهزة التحسس الصوتي والكاميرات الحرارية لتحديد العطل بدقة متناهية.",
      imagePath: "/images/service-leak-detection.webp",
      imageAltEn: "Thermal imaging and electro-acoustic pipe leak diagnosis",
      imageAltAr: "جهاز فحص خرير المياه وكشف التسريبات بالموجات الصوتية والحرارية",
      scopeEn: [
        "Acoustic underground & wall pipe listening tests",
        "Thermal camera differential diagnosis of hot/cold lines",
        "Sectional pipe pressure isolation testing",
        "Written diagnostic report of fault location",
      ],
      scopeAr: [
        "فحص شبكات الأنابيب المدفونة بأجهزة الاستماع الكهرومغناطيسية",
        "استخدام الكاميرات الحرارية لتحديد فروق درجات حرارة المياه",
        "عزل واختبار ضغط المقاطع المستقلة لتأكيد مكان الخلل",
        "تقديم تقرير فني واضح عن موقع الخلل وخطة الإصلاح المناسبة",
      ],
    },
  ] as ServiceDefinition[],
};