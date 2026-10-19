"use client";

import React from "react";
import { Star } from "lucide-react";

interface ReviewStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function ReviewStars({
  rating,
  max = 5,
  size = "md",
  interactive = false,
  onRatingChange,
}: ReviewStarsProps) {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const starSizeClass =
    size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-6 h-6" : "w-4 h-4";

  const effectiveRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex items-center gap-1" role={interactive ? "radiogroup" : "img"}>
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= effectiveRating;

        if (interactive) {
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={starValue === rating}
              aria-label={`${starValue} Stars`}
              onClick={() => onRatingChange?.(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(null)}
              className="p-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B45C31] transition-transform hover:scale-110 cursor-pointer"
            >
              <Star
                className={`${starSizeClass} transition-colors ${
                  isFilled
                    ? "fill-[#B45C31] text-[#B45C31]"
                    : "fill-transparent text-[#BAC3C3]"
                }`}
              />
            </button>
          );
        }

        return (
          <Star
            key={i}
            className={`${starSizeClass} ${
              isFilled
                ? "fill-[#B45C31] text-[#B45C31]"
                : "fill-transparent text-[#D8DDDD]"
            }`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}