"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG, type ServiceDefinition } from "@/config/site";
import { initServiceItemAnimation } from "./services.animations";
import { PhoneCall, Check } from "lucide-react";

interface ServiceItemProps {
  service: ServiceDefinition;
  index: number;
}

export function ServiceItem({ service, index }: ServiceItemProps) {
  const { locale, isRtl, content } = useLanguage();

  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const scopeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const isEven = index % 2 === 0;
  const isImageLeft = isEven;

  useEffect(() => {
    const validScopes = scopeRefs.current.filter(
      (el): el is HTMLLIElement => el !== null
    );

    const cleanup = initServiceItemAnimation({
      container: containerRef.current,
      imageWrapper: imageWrapperRef.current,
      contentWrapper: contentWrapperRef.current,
      title: titleRef.current,
      description: descriptionRef.current,
      scopeItems: validScopes,
      ctaButton: ctaRef.current,
      isImageLeft,
    });

    return () => {
      cleanup();
    };
  }, [isImageLeft]);

  const title = locale === "ar" ? service.titleAr : service.titleEn;
  const detailedDesc =
    locale === "ar" ? service.detailedDescriptionAr : service.detailedDescriptionEn;
  const scopeList = locale === "ar" ? service.scopeAr : service.scopeEn;
  const imageAlt = locale === "ar" ? service.imageAltAr : service.imageAltEn;

  return (
    <article
      ref={containerRef}
      className="relative w-full border-b border-[#D8DDDD] last:border-b-0 py-16 sm:py-20 lg:py-28 first:pt-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
        <div
          ref={imageWrapperRef}
          className={`w-full ${
            isImageLeft
              ? "lg:col-span-6 lg:order-1"
              : "lg:col-span-6 lg:order-2"
          }`}
        >
          <div className="relative w-full aspect-[4/3] bg-[#EFECE6] border border-[#D8DDDD] overflow-hidden">
            <Image
              src={service.imagePath}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div
          ref={contentWrapperRef}
          className={`flex flex-col items-start ${
            isImageLeft
              ? "lg:col-span-6 lg:order-2"
              : "lg:col-span-6 lg:order-1"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#536270] uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 bg-[#B45C31]"></span>
            <span>SERVICE 0{index + 1}</span>
          </div>

          <h3
            ref={titleRef}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#132E3C] tracking-tight leading-[1.2] mb-4"
          >
            {title}
          </h3>

          <p
            ref={descriptionRef}
            className="text-base sm:text-lg text-[#1E2933] leading-relaxed mb-6"
          >
            {detailedDesc}
          </p>

          <div className="w-full border-t border-[#D8DDDD] pt-5 mb-8">
            <p className="text-xs font-bold text-[#132E3C] uppercase tracking-wider mb-3">
              {content.servicesSection.scopeHeading}
            </p>
            <ul className="space-y-2.5">
              {scopeList.map((item, idx) => (
                <li
                  key={idx}
                  ref={(el) => {
                    scopeRefs.current[idx] = el;
                  }}
                  className="flex items-start gap-2.5 text-sm text-[#1E2933] leading-snug"
                >
                  <Check className="w-4 h-4 text-[#B45C31] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            ref={ctaRef}
            href={SITE_CONFIG.contact.phoneTel}
            className="inline-flex items-center justify-center gap-2.5 bg-[#132E3C] hover:bg-[#B45C31] text-white text-sm font-bold px-6 py-3.5 transition-colors border border-[#132E3C] hover:border-[#B45C31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
          >
            <PhoneCall className="w-4 h-4 shrink-0" />
            <span>{content.servicesSection.callCta}</span>
          </a>
        </div>
      </div>
    </article>
  );
}