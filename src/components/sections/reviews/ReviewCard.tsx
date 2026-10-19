"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Review } from "./reviews.types";
import { ReviewStars } from "./ReviewStars";
import { SITE_CONFIG } from "@/config/site";
import { MapPin, CheckCircle2 } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { locale, content } = useLanguage();
  const t = content.reviewsSection;

  const matchedService = SITE_CONFIG.services.find((s) => s.id === review.serviceId);
  const serviceTitle = matchedService
    ? locale === "ar"
      ? matchedService.titleAr
      : matchedService.titleEn
    : review.serviceId;

  const formattedDate = new Date(review.createdAt).toLocaleDateString(
    locale === "ar" ? "ar-KW" : "en-KW",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <article className="flex flex-col justify-between bg-[#FFFFFF] border border-[#D8DDDD] p-6 sm:p-7 hover:border-[#132E3C] transition-colors duration-200">
      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h4 className="text-base font-bold text-[#132E3C] leading-snug">
              {review.customerName}
            </h4>
            {review.maskedEmail && (
              <p className="text-xs font-mono text-[#536270] mt-0.5">
                {review.maskedEmail}
              </p>
            )}
            {review.customerRole && (
              <p className="text-[11px] text-[#B45C31] font-semibold mt-0.5">
                {review.customerRole}
              </p>
            )}
          </div>

          <div className="shrink-0">
            <ReviewStars rating={review.rating} size="sm" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-[#536270] mb-4 pb-3 border-b border-[#D8DDDD]">
          <span className="flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#B45C31] shrink-0" />
            <span>{review.city}</span>
          </span>

          <span className="text-[#D8DDDD]">•</span>

          <span className="font-semibold text-[#132E3C]">
            {serviceTitle}
          </span>
        </div>

        {review.message && (
          <p className="text-sm text-[#1E2933] leading-relaxed mb-6">
            &ldquo;{review.message}&rdquo;
          </p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-[#536270] pt-4 border-t border-[#D8DDDD]/70">
        <span className="flex items-center gap-1 text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#132E3C] shrink-0" />
          <span>{review.source === "google" ? t.sourceGoogle : t.sourceWebsite}</span>
        </span>

        <time dateTime={review.createdAt} className="font-mono text-[11px]">
          {formattedDate}
        </time>
      </div>
    </article>
  );
}