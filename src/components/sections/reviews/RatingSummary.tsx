"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { ReviewStats } from "./reviews.types";
import { ReviewStars } from "./ReviewStars";

interface RatingSummaryProps {
  stats: ReviewStats;
  progressRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function RatingSummary({ stats, progressRefs }: RatingSummaryProps) {
  const { locale, content } = useLanguage();
  const t = content.reviewsSection;

  return (
    <div className="w-full bg-[#F7F5F0] border border-[#D8DDDD] p-6 sm:p-8 lg:p-10 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Score & Stars Display */}
        <div className="lg:col-span-5 flex flex-col items-start lg:border-r rtl:lg:border-r-0 rtl:lg:border-l border-[#D8DDDD] lg:pe-10">
          <p className="text-xs font-bold text-[#536270] uppercase tracking-wider mb-2">
            {t.overallRating}
          </p>

          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-5xl sm:text-6xl font-extrabold text-[#132E3C] tracking-tight">
              {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : "0.0"}
            </span>
            <span className="text-xl font-bold text-[#536270]">/ 5.0</span>
          </div>

          <div className="mb-3">
            <ReviewStars rating={Math.round(stats.averageRating)} size="lg" />
          </div>

          <p className="text-xs text-[#536270]">
            {t.basedOn.replace("{count}", stats.totalReviews.toString())}
          </p>
        </div>

        {/* Rating Breakdown Progress Bars */}
        <div className="lg:col-span-7 flex flex-col space-y-2.5">
          {stats.distribution.map((item, index) => (
            <div key={item.star} className="flex items-center gap-3 text-xs">
              <span className="w-12 font-bold text-[#132E3C] shrink-0">
                {item.star} {t.starsLabel}
              </span>

              <div className="flex-1 h-2.5 bg-[#EFECE5] border border-[#D8DDDD] overflow-hidden">
                <div
                  ref={(el) => {
                    progressRefs.current[index] = el;
                  }}
                  data-percentage={item.percentage}
                  className="h-full bg-[#B45C31]"
                  style={{ width: "0%" }}
                />
              </div>

              <span className="w-12 text-end font-mono text-[#536270] shrink-0">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}