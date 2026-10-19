"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Review, ReviewStats } from "./reviews.types";
import { RatingSummary } from "./RatingSummary";
import { ReviewCard } from "./ReviewCard";
import { ReviewModal } from "./ReviewModal";
import { initReviewsSectionAnimations } from "./reviews.animations";
import { MessageSquarePlus } from "lucide-react";

export function Reviews() {
  const { content } = useLanguage();
  const t = content.reviewsSection;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    distribution: [
      { star: 5, count: 0, percentage: 0 },
      { star: 4, count: 0, percentage: 0 },
      { star: 3, count: 0, percentage: 0 },
      { star: 2, count: 0, percentage: 0 },
      { star: 1, count: 0, percentage: 0 },
    ],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const headingWrapperRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLHRElement>(null);
  const summaryCardRef = useRef<HTMLDivElement>(null);
  const progressBarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reviewCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        if (data.success) {
          setReviews(data.reviews);
          setStats(data.stats);
        }
      } catch (err) {
        console.error("Failed to fetch customer reviews:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadReviews();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const validProgressBars = progressBarsRef.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    const validCards = reviewCardsRef.current.filter(
      (el): el is HTMLDivElement => el !== null
    );

    const cleanup = initReviewsSectionAnimations({
      sectionEl: sectionRef.current,
      headingWrapper: headingWrapperRef.current,
      divider: dividerRef.current,
      summaryCard: summaryCardRef.current,
      progressBars: validProgressBars,
      reviewCards: validCards,
    });

    return () => {
      cleanup();
    };
  }, [isLoading, reviews]);

  const handleReviewCreated = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    const updatedTotal = stats.totalReviews + 1;
    const updatedSum =
      stats.averageRating * stats.totalReviews + newReview.rating;
    const updatedAvg = Number((updatedSum / updatedTotal).toFixed(1));

    const updatedDist = stats.distribution.map((d) => {
      const isTarget = d.star === newReview.rating;
      const count = isTarget ? d.count + 1 : d.count;
      const percentage = Math.round((count / updatedTotal) * 100);
      return { ...d, count, percentage };
    });

    setStats({
      totalReviews: updatedTotal,
      averageRating: updatedAvg,
      distribution: updatedDist,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="w-full bg-[#FFFFFF] border-b border-[#D8DDDD] py-16 sm:py-20 lg:py-28"
      aria-label="Customer Reviews"
    >
      <div className="site-container">
        {/* Section Header */}
        <div ref={headingWrapperRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132E3C] tracking-tight leading-tight mb-3">
              {t.title}
            </h2>
            <p className="text-base sm:text-lg text-[#536270] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2.5 bg-[#132E3C] hover:bg-[#B45C31] text-white text-sm font-bold px-6 py-3.5 transition-colors border border-[#132E3C] hover:border-[#B45C31] shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{t.writeReviewBtn}</span>
          </button>
        </div>

        {/* Clean Architectural Horizontal Divider */}
        <hr ref={dividerRef} className="border-t border-[#D8DDDD] mb-12 origin-left" />

        {/* Dynamic Rating Summary and Progress Bars */}
        <div ref={summaryCardRef}>
          <RatingSummary stats={stats} progressRefs={progressBarsRef} />
        </div>

        {/* Review Cards Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {reviews.map((review, idx) => (
              <div
                key={review.id}
                ref={(el) => {
                  reviewCardsRef.current[idx] = el;
                }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="p-8 text-center bg-[#F7F5F0] border border-[#D8DDDD] text-sm text-[#536270]">
              {t.noReviewsYet}
            </div>
          )
        )}

        {/* Dynamic Modal Dialog */}
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onReviewCreated={handleReviewCreated}
        />
      </div>
    </section>
  );
}

export default Reviews;