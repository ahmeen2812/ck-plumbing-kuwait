"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG, type ServiceDefinition } from "@/config/site";
import { ServiceSection } from "@/components/sections/services/ServiceSection";

export function Services() {
  const { content } = useLanguage();

  return (
    <div id="services" className="w-full">
      <div className="w-full bg-[#FFFFFF] border-b border-[#D8DDDD] pt-14 pb-4 sm:pt-16 sm:pb-6">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132E3C] tracking-tight leading-tight mb-3">
              {content.servicesSection.title}
            </h2>
            <p className="text-base sm:text-lg text-[#536270] leading-relaxed">
              {content.servicesSection.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        {SITE_CONFIG.services.map((service: ServiceDefinition, index: number) => (
          <ServiceSection
            key={service.id}
            service={service}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Services;