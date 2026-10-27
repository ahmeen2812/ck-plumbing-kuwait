"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { HeroMobile } from "./hero/HeroMobile";
import { animateHeroEntrance } from "./hero/hero.animations";
import { PhoneCall, Wrench, ArrowRight, ArrowLeft } from "lucide-react";

export function Hero() {
  const { locale, isRtl, content } = useLanguage();

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = animateHeroEntrance({
      container: containerRef.current,
      heading: headingRef.current,
      description: descriptionRef.current,
      ctaPrimary: ctaPrimaryRef.current,
      ctaSecondary: ctaSecondaryRef.current,
      imageWrapper: imageWrapperRef.current,
    });

    return () => {
      tl?.kill();
    };
  }, [locale]);

  return (
    <section className="relative w-full bg-[#F7F5F0] border-b border-[#D8DDDD] overflow-hidden">
      <div className="site-container">
        {/* Dedicated Modular Mobile Layout (< lg) */}
        <HeroMobile />

        {/* Dedicated Desktop Two-Column Layout (>= lg) */}
        <div
          ref={containerRef}
          className="hidden lg:grid grid-cols-12 gap-12 xl:gap-16 items-center py-16 xl:py-24"
        >
          {/* Column 1: Typography and CTAs */}
          <div className="col-span-7 flex flex-col items-start">
            <h1
              ref={headingRef}
              className="text-4xl xl:text-5xl font-bold text-[#132E3C] tracking-tight leading-[1.18] mb-6"
            >
              {content.hero.title}
            </h1>

            <p
              ref={descriptionRef}
              className="text-lg text-[#1E2933] leading-relaxed max-w-xl mb-8"
            >
              {content.hero.description}
            </p>

            <div className="flex items-center gap-4">
              <Link
                ref={ctaPrimaryRef}
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 bg-[#132E3C] hover:bg-[#B45C31] text-white text-sm font-bold px-6 py-3.5 transition-colors border border-[#132E3C] hover:border-[#B45C31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>{content.hero.primaryCta}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4 shrink-0 ml-1 rtl:ml-0 rtl:mr-1" />
                ) : (
                  <ArrowRight className="w-4 h-4 shrink-0 ml-1 rtl:ml-0 rtl:mr-1" />
                )}
              </Link>

              <Link
                ref={ctaSecondaryRef}
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#EFECE5] text-[#132E3C] text-sm font-bold px-6 py-3.5 transition-colors border border-[#BAC3C3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
              >
                <Wrench className="w-4 h-4 text-[#536270] shrink-0" />
                <span>{content.hero.secondaryCta}</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Uncluttered Structural Photograph */}
          <div className="col-span-5 w-full">
            <div
              ref={imageWrapperRef}
              className="relative w-full aspect-[5/4] bg-[#EFECE6] border border-[#D8DDDD] overflow-hidden"
            >
              <Image
                src="/images/hero-plumbing-kuwait.webp"
                alt={
                  locale === "ar"
                    ? "فني صحي سباكة معتمد في دولة الكويت"
                    : "Professional plumbing technician in the State of Kuwait"
                }
                fill
                priority
                sizes="(max-width: 1280px) 42vw, 520px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}