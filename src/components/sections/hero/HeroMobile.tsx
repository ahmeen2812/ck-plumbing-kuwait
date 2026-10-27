"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG } from "@/config/site";
import { animateHeroEntrance } from "./hero.animations";
import { PhoneCall, Wrench, ArrowRight, ArrowLeft } from "lucide-react";

export function HeroMobile() {
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

  const headingText =
    content.hero.title ||
    (locale === "ar"
      ? "خدمات السباكة والهندسة الصحية المتخصصة في الكويت"
      : "Precision Plumbing Engineering & Maintenance in Kuwait");

  return (
    <div
      ref={containerRef}
      className="flex lg:hidden flex-col justify-center gap-5 py-8 sm:py-12 w-full max-w-full overflow-hidden"
    >
      <h1
        ref={headingRef}
        className="text-2xl min-[360px]:text-[1.85rem] font-bold text-[#132E3C] leading-[1.25] tracking-tight break-words"
      >
        {headingText}
      </h1>

      <p
        ref={descriptionRef}
        className="text-sm min-[360px]:text-base text-[#1E2933] leading-relaxed break-words"
      >
        {content.hero.description}
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full pt-1">
        <a
          ref={ctaPrimaryRef}
          href={SITE_CONFIG.contact.phoneTel}
          className="inline-flex items-center justify-center gap-2.5 bg-[#132E3C] hover:bg-[#B45C31] text-white text-sm font-bold px-5 py-3.5 transition-colors border border-[#132E3C] hover:border-[#B45C31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
        >
          <PhoneCall className="w-4 h-4 shrink-0" />
          <span>{content.hero.primaryCta}</span>
          {isRtl ? (
            <ArrowLeft className="w-4 h-4 shrink-0 ml-1 rtl:ml-0 rtl:mr-1" />
          ) : (
            <ArrowRight className="w-4 h-4 shrink-0 ml-1 rtl:ml-0 rtl:mr-1" />
          )}
        </a>

        <Link
          ref={ctaSecondaryRef}
          href="#services"
          className="inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#EFECE5] text-[#132E3C] text-sm font-bold px-5 py-3.5 transition-colors border border-[#BAC3C3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
        >
          <Wrench className="w-4 h-4 text-[#536270] shrink-0" />
          <span>{content.hero.secondaryCta}</span>
        </Link>
      </div>

      <div
        ref={imageWrapperRef}
        className="relative w-full aspect-[4/3] bg-[#EFECE6] border border-[#D8DDDD] overflow-hidden mt-3"
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
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}