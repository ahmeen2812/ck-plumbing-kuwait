// src/components/sections/Hero.tsx
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG } from "@/config/site";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  PhoneCall, 
  Activity, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Wrench 
} from "lucide-react";

export function Hero() {
  const { locale, isRtl, content } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect user's accessibility preferences
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: -15,
        duration: 0.5,
      })
        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.2"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".hero-cta-group",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          ".hero-metrics-item",
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.2"
        )
        .from(
          ".hero-visual-card",
          {
            opacity: 0,
            scale: 0.98,
            duration: 0.8,
          },
          "-=0.6"
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-[#F7F5F0] border-b border-[#D8DDDD] overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left / Primary Column (7 cols): Editorial Typography & Direct CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Architectural Status Tag */}
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] border border-[#D8DDDD] text-[#132E3C] text-xs font-bold mb-6">
              <span className="w-2 h-2 bg-[#B45C31]"></span>
              <span>{content.hero.eyebrow}</span>
            </div>

            {/* Disciplined Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#132E3C] tracking-tight leading-[1.18] mb-6">
              <span className="hero-title-line block">{content.hero.titleLine1}</span>
              <span className="hero-title-line block text-[#B45C31] mt-1">
                {content.hero.titleLine2}
              </span>
            </h1>

            {/* Editorial Lead Description */}
            <p className="hero-description text-base sm:text-lg text-[#1E2933] leading-relaxed max-w-2xl mb-8">
              {content.hero.description}
            </p>

            {/* Primary Action Suite */}
            <div className="hero-cta-group flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#132E3C] hover:bg-[#B45C31] text-white text-sm font-bold px-6 py-3.5 transition-colors border border-[#132E3C] hover:border-[#B45C31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{content.hero.primaryCta}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4 ml-1" />
                ) : (
                  <ArrowRight className="w-4 h-4 ml-1" />
                )}
              </Link>

              <Link
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#EFECE5] text-[#132E3C] text-sm font-bold px-6 py-3.5 transition-colors border border-[#BAC3C3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
              >
                <Wrench className="w-4 h-4 text-[#536270]" />
                <span>{content.hero.secondaryCta}</span>
              </Link>
            </div>

            {/* Kuwait Technical Highlights / Specification Bar */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#D8DDDD]">
              {content.hero.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="hero-metrics-item bg-white p-3.5 border border-[#D8DDDD]"
                >
                  <p className="text-[11px] font-bold text-[#536270] uppercase tracking-wide mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-[#132E3C] leading-snug">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right / Secondary Column (5 cols): Diagnostic Card & Visual Composition */}
          <div className="lg:col-span-5 w-full">
            <div className="hero-visual-card bg-white border border-[#D8DDDD] p-2">
              {/* Image Frame with Architectural Fallback */}
              <div className="relative w-full h-[320px] sm:h-[400px] bg-[#132E3C] overflow-hidden border border-[#D8DDDD]">
                <Image
                  src="/images/hero-plumbing-kuwait.webp"
                  alt={
                    locale === "ar"
                      ? "فني صحي معتمد في الكويت يجري فحصاً لشبكة تمديدات المياه"
                      : "Licensed plumbing technician inspecting water distribution manifold in Kuwait"
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                  onError={(e) => {
                    // Graceful solid fallback frame if the static file is not yet dropped
                    e.currentTarget.style.display = "none";
                  }}
                />

                {/* Technical blueprint overlay fallback inside image container */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none text-white/90">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest uppercase bg-[#132E3C] px-2.5 py-1 border border-white/20">
                      SYS-REF: KW-HYD-2026
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold bg-[#B45C31] px-2.5 py-1">
                      <Activity className="w-3.5 h-3.5" />
                      {locale === "ar" ? "فحص نشط" : "ACTIVE DIAGNOSTIC"}
                    </span>
                  </div>

                  <div className="bg-[#132E3C]/95 p-4 border border-white/15">
                    <p className="text-xs font-bold text-white mb-1">
                      {locale === "ar"
                        ? "منظومة فحص الضغط الهيدروليكي"
                        : "Hydrostatic Pressure Testing Protocol"}
                    </p>
                    <p className="text-[11px] text-gray-300 leading-normal">
                      {locale === "ar"
                        ? "معايرة شبكات المياه العذبة حتى 16 بار لمنع الخرير في الفلل والمباني."
                        : "Pressurized manifold diagnostics up to 16-bar tolerance to prevent concealed pipe rupture."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Location & Operating Context Box */}
              <div className="p-4 bg-[#F7F5F0] border-t border-[#D8DDDD] space-y-2 mt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B45C31] shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-[#1E2933]">
                    <strong className="font-bold text-[#132E3C]">
                      {locale === "ar" ? "نطاق العمل: " : "Deployment Reach: "}
                    </strong>
                    {locale === "ar"
                      ? "محافظة العاصمة، حولي، الفروانية، مبارك الكبير، الأحمدي، والجهراء."
                      : "Capital, Hawalli, Farwaniya, Mubarak Al-Kabeer, Ahmadi, & Jahra."}
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#536270] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#536270]">
                    {content.common.operatingSchedule}
                  </p>
                </div>
              </div>
            </div>

            {/* Kuwait Regulatory Disclaimer Badge */}
            <div className="mt-3 p-3 bg-white border border-[#D8DDDD] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#132E3C] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#536270] leading-snug">
                {content.hero.complianceNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}