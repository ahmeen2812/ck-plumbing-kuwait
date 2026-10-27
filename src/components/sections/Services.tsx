// src/components/sections/Services.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG, type ServiceDefinition } from "@/config/site";
import { Check, ArrowRight, ArrowLeft, Wrench, ShieldAlert } from "lucide-react";

export function Services() {
  const { locale, isRtl, content } = useLanguage();

  return (
    <section id="services" className="w-full bg-[#FFFFFF] border-b border-[#D8DDDD] py-16 lg:py-24">
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F5F0] border border-[#D8DDDD] text-[#132E3C] text-xs font-bold mb-4">
            <span className="w-2 h-2 bg-[#B45C31]"></span>
            <span>{content.servicesSection.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#132E3C] tracking-tight leading-tight mb-4">
            {content.servicesSection.title}
          </h2>

          <p className="text-base text-[#536270] leading-relaxed">
            {content.servicesSection.subtitle}
          </p>
        </div>

        {/* 6 Disciplined Technical Service Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SITE_CONFIG.services.map((service: ServiceDefinition) => {
            const title = locale === "ar" ? service.titleAr : service.titleEn;
            const shortDesc =
              locale === "ar" ? service.shortDescriptionAr : service.shortDescriptionEn;
            const detailedDesc =
              locale === "ar" ? service.detailedDescriptionAr : service.detailedDescriptionEn;
            const scopeList = locale === "ar" ? service.scopeAr : service.scopeEn;
            const imageAlt = locale === "ar" ? service.imageAltAr : service.imageAltEn;

            return (
              <div
                key={service.id}
                className="flex flex-col justify-between bg-[#F7F5F0] border border-[#D8DDDD] hover:border-[#132E3C] transition-colors p-6 group"
              >
                <div>
                  {/* Service Graphic Container */}
                  <div className="relative w-full h-48 bg-[#132E3C] border border-[#D8DDDD] overflow-hidden mb-6">
                    <Image
                      src={service.imagePath}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    {/* Industrial schematic fallback frame */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none text-white/90">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-wider bg-[#132E3C] px-2 py-0.5 border border-white/20">
                          {service.id.toUpperCase()}
                        </span>
                        <Wrench className="w-4 h-4 text-[#B45C31]" />
                      </div>

                      <div className="bg-[#132E3C]/90 p-2.5 border border-white/10">
                        <span className="text-xs font-bold text-white block truncate">
                          {title}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Service Heading & Overview */}
                  <h3 className="text-xl font-bold text-[#132E3C] mb-3 group-hover:text-[#B45C31] transition-colors">
                    {title}
                  </h3>

                  <p className="text-sm font-semibold text-[#1E2933] mb-3 leading-snug">
                    {shortDesc}
                  </p>

                  <p className="text-xs text-[#536270] leading-relaxed mb-6">
                    {detailedDesc}
                  </p>

                  {/* Standard Execution Scope Checklist */}
                  <div className="border-t border-[#D8DDDD] pt-4 mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#132E3C] mb-3">
                      {content.servicesSection.scopeHeading}
                    </p>
                    <ul className="space-y-2">
                      {scopeList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#1E2933]">
                          <Check className="w-3.5 h-3.5 text-[#132E3C] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-4 border-t border-[#D8DDDD]">
                  <Link
                    href={`#contact?service=${encodeURIComponent(service.id)}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#132E3C] hover:text-[#B45C31] transition-colors"
                  >
                    <span>
                      {locale === "ar"
                        ? "طلب فحص لهذه الخدمة"
                        : "Request Inspection for this Service"}
                    </span>
                    {isRtl ? (
                      <ArrowLeft className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Notice Banner */}
        <div className="mt-12 p-4 bg-[#F7F5F0] border border-[#D8DDDD] flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-[#B45C31] shrink-0" />
          <p className="text-xs text-[#536270] leading-relaxed">
            {locale === "ar"
              ? "ملاحظة فنية: تخضع أعمال تمديد الشبكات لاختبارات الضغط بالبار المعتمد وفق الكود الصحي الكويتي قبل إتمام التسليم."
              : "Technical notice: Pressurized supply line installations undergo calibrated bar hydrostatic testing according to Kuwait sanitary codes before completion."}
          </p>
        </div>
      </div>
    </section>
  );
}