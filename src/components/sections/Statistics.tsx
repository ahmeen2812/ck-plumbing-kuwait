"use client";

import React, { useRef, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG, type StatisticItem } from "@/config/site";
import {
  initStatisticsAnimations,
  type StatBlockElement,
} from "@/components/sections/statistics/statistics.animations";

const DEFAULT_STATISTICS: StatisticItem[] = [
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
];

export function Statistics() {
  const { locale, content } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const statsList = SITE_CONFIG.statistics?.length
    ? SITE_CONFIG.statistics
    : DEFAULT_STATISTICS;

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

  const title =
    content.statisticsSection?.title ||
    (locale === "ar"
      ? "سجل الإنجاز والجاهزية الفنية"
      : "Documented Service Track Record");
  const subtitle =
    content.statisticsSection?.subtitle ||
    (locale === "ar"
      ? "خدمات موثوقة تلبي احتياجات الفلل والمجمعات السكنية والمنشآت التجارية في دولة الكويت."
      : "Measurable service delivery for villas, residential complexes, and commercial properties throughout Kuwait.");

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FFFFFF] border-b border-[#D8DDDD] py-10 sm:py-12 lg:py-14"
      aria-label="Key Statistics"
    >
      <div className="site-container">
        <div className="max-w-2xl mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-[#132E3C] tracking-tight leading-tight mb-2">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-[#536270] leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {statsList.map((stat: StatisticItem, index: number) => {
            const label = locale === "ar" ? stat.labelAr : stat.labelEn;
            const note = locale === "ar" ? stat.noteAr : stat.noteEn;

            return (
              <div
                key={stat.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="bg-[#F7F5F0] border border-[#D8DDDD] p-5 sm:p-6 hover:border-[#132E3C] transition-colors duration-200"
              >
                <p
                  ref={(el) => {
                    numberRefs.current[index] = el;
                  }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#132E3C] tracking-tight mb-2 select-none"
                >
                  {stat.displayValue}
                </p>

                <h3 className="text-sm sm:text-base font-bold text-[#1E2933] leading-snug mb-1">
                  {label}
                </h3>

                <p className="text-xs text-[#536270] leading-relaxed">
                  {note}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Statistics;