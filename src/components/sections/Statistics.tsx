"use client";

import React, { useRef, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG, type StatisticItem } from "@/config/site";
import {
  initStatisticsAnimations,
  type StatBlockElement,
} from "@/components/sections/statistics/statistics.animations";
import { ShieldCheck } from "lucide-react";

const FALLBACK_STATISTICS: StatisticItem[] = [
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
];

export function Statistics() {
  const { locale, content } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const statsList = SITE_CONFIG.statistics?.length
    ? SITE_CONFIG.statistics
    : FALLBACK_STATISTICS;

  useEffect(() => {
    const blocks: StatBlockElement[] = [];

    statsList.forEach((stat, index) => {
      const card = cardRefs.current[index];
      const numberEl = numberRefs.current[index];

      if (card && numberEl) {
        blocks.push({
          card,
          numberEl,
          targetNumber: stat.targetNumber,
          suffix: stat.suffix,
          staticValue: stat.displayValue,
        });
      }
    });

    const cleanup = initStatisticsAnimations(sectionRef.current, blocks);

    return () => {
      cleanup();
    };
  }, [statsList]);

  const eyebrow =
    content.statisticsSection?.eyebrow ||
    (locale === "ar" ? "نطاق العمليات" : "Operational Scale");
  const title =
    content.statisticsSection?.title ||
    (locale === "ar"
      ? "سجل الإنجاز والجاهزية الفنية"
      : "Documented Service Track Record");
  const subtitle =
    content.statisticsSection?.subtitle ||
    (locale === "ar"
      ? "خدمات ميدانية موثوقة تلبي احتياجات المباني في دولة الكويت."
      : "Measurable service delivery for residential and commercial properties throughout Kuwait.");
  const disclaimer =
    content.statisticsSection?.disclaimer ||
    (locale === "ar"
      ? "الأرقام تمثل مؤشرات تشغيلية خاضعة للاعتماد الرسمي وتغطي كافة محافظات الكويت."
      : "Figures reflect client-reported service volume across all Kuwait governorates.");

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FFFFFF] border-b border-[#D8DDDD] py-14 sm:py-16 lg:py-20"
      aria-label="Key Operational Statistics"
    >
      <div className="site-container">
        <div className="max-w-2xl mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F5F0] border border-[#D8DDDD] text-[#132E3C] text-[11px] sm:text-xs font-bold mb-3">
            <span className="w-2 h-2 bg-[#B45C31]"></span>
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#132E3C] tracking-tight leading-tight mb-3">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-[#536270] leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {statsList.map((stat: StatisticItem, index: number) => {
            const label = locale === "ar" ? stat.labelAr : stat.labelEn;
            const note = locale === "ar" ? stat.noteAr : stat.noteEn;

            return (
              <div
                key={stat.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="flex flex-col justify-between bg-[#F7F5F0] border border-[#D8DDDD] p-7 sm:p-8 hover:border-[#132E3C] transition-colors duration-200"
              >
                <div>
                  <p
                    ref={(el) => {
                      numberRefs.current[index] = el;
                    }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#132E3C] tracking-tight mb-3 select-none"
                  >
                    {stat.displayValue}
                  </p>

                  <h3 className="text-base sm:text-lg font-bold text-[#1E2933] leading-snug mb-2">
                    {label}
                  </h3>

                  <p className="text-xs text-[#536270] leading-relaxed">
                    {note}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#D8DDDD]/80 flex items-center justify-between text-[11px] text-[#536270]">
                  <span className="uppercase tracking-wider font-mono">
                    STAT-0{index + 1}
                  </span>
                  <span className="inline-block w-1.5 h-1.5 bg-[#B45C31]"></span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-[#D8DDDD] flex items-center gap-2.5 text-xs text-[#536270]">
          <ShieldCheck className="w-4 h-4 text-[#B45C31] shrink-0" />
          <p className="leading-normal">{disclaimer}</p>
        </div>
      </div>
    </section>
  );
}

export default Statistics;