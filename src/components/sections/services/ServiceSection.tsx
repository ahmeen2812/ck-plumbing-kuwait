"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG, type ServiceDefinition } from "@/config/site";
import { initServiceSectionAnimation } from "./services.animations";
import { PhoneCall, Mail, Check } from "lucide-react";

interface ServiceSectionProps {
  service: ServiceDefinition;
  index: number;
}

export function ServiceSection({ service, index }: ServiceSectionProps) {
  const { locale, content } = useLanguage();

  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const scopeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);

  const isTextLeft = service.layout === "text-left";
  const isAltBg = index % 2 === 1;

  useEffect(() => {
    const validScopes = scopeRefs.current.filter(
      (el): el is HTMLLIElement => el !== null
    );

    const cleanup = initServiceSectionAnimation({
      container: containerRef.current,
      imageWrapper: imageWrapperRef.current,
      title: titleRef.current,
      description: descriptionRef.current,
      scopeItems: validScopes,
      ctaPrimary: ctaPrimaryRef.current,
      ctaSecondary: ctaSecondaryRef.current,
      layout: service.layout,
    });

    return () => {
      cleanup();
    };
  }, [service.layout]);

  const handleEnquiryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("service", service.id);
      window.history.replaceState({}, "", url.toString());
      window.dispatchEvent(
        new CustomEvent("ck:select-service", {
          detail: { serviceId: service.id },
        })
      );
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const title = locale === "ar" ? service.titleAr : service.titleEn;
  const detailedDesc =
    locale === "ar" ? service.detailedDescriptionAr : service.detailedDescriptionEn;
  const scopeList = locale === "ar" ? service.scopeAr : service.scopeEn;
  const imageAlt = locale === "ar" ? service.imageAltAr : service.imageAltEn;

  return (
    <section
      ref={containerRef}
      id={service.slug}
      className={`w-full border-b border-[#D8DDDD] py-16 sm:py-20 lg:py-28 min-h-[60vh] lg:min-h-[72vh] flex items-center ${
        isAltBg ? "bg-[#F7F5F0]" : "bg-[#FFFFFF]"
      }`}
      aria-label={title}
    >
      <div className="site-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* Mobile Order: IMAGE always renders first on mobile */}
          <div
            ref={imageWrapperRef}
            className={`w-full order-1 ${
              isTextLeft
                ? "lg:col-span-6 lg:order-2"
                : "lg:col-span-6 lg:order-1"
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

          {/* Text Content Column */}
          <div
            className={`flex flex-col items-start w-full order-2 ${
              isTextLeft
                ? "lg:col-span-6 lg:order-1"
                : "lg:col-span-6 lg:order-2"
            }`}
          >
            <h3
              ref={titleRef}
              className="text-2xl sm:text-3xl lg:text-[2.35rem] xl:text-[2.65rem] font-bold text-[#132E3C] tracking-tight leading-[1.2] mb-4"
            >
              {title}
            </h3>

            <p
              ref={descriptionRef}
              className="text-base sm:text-lg text-[#1E2933] leading-relaxed mb-6 max-w-xl"
            >
              {detailedDesc}
            </p>

            <div className="w-full border-t border-[#D8DDDD] pt-5 mb-8 max-w-xl">
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
                    className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#1E2933] leading-snug"
                  >
                    <Check className="w-4 h-4 text-[#B45C31] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dual Action Suite: Call Us + Send Enquiry */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                ref={ctaPrimaryRef}
                href={SITE_CONFIG.contact.phoneTel}
                className="inline-flex items-center justify-center gap-2.5 bg-[#132E3C] hover:bg-[#B45C31] text-white text-sm font-bold px-6 py-3.5 transition-colors border border-[#132E3C] hover:border-[#B45C31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>{content.servicesSection.callCta}</span>
              </a>

              <a
                ref={ctaSecondaryRef}
                href={`#contact?service=${service.id}`}
                onClick={handleEnquiryClick}
                className="inline-flex items-center justify-center gap-2.5 bg-[#FFFFFF] hover:bg-[#EFECE5] text-[#132E3C] text-sm font-bold px-6 py-3.5 transition-colors border border-[#BAC3C3] hover:border-[#132E3C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
              >
                <Mail className="w-4 h-4 text-[#B45C31] shrink-0" />
                <span>{content.servicesSection.enquiryCta}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceSection;