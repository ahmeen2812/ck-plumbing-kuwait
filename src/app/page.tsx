"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Statistics } from "@/components/sections/Statistics";
import { Services } from "@/components/sections/Services";
import { useLanguage } from "@/lib/LanguageContext";
import { ShieldAlert } from "lucide-react";

export default function HomePage() {
  const { content } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#1E2933]">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Statistics />
        <Services />

        <section
          id="contact"
          className="w-full bg-[#132E3C] text-white py-16 border-t border-[#D8DDDD]"
        >
          <div className="site-container">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-xs font-bold mb-4 text-[#FFFFFF]">
                <span className="w-2 h-2 bg-[#B45C31]"></span>
                <span>{content.contactSection.eyebrow}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-white">
                {content.contactSection.title}
              </h2>

              <p className="text-sm text-gray-300 mb-8 leading-relaxed">
                {content.contactSection.subtitle}
              </p>

              <div className="p-4 bg-white/5 border border-white/15 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-200">
                  <ShieldAlert className="w-4 h-4 text-[#B45C31] shrink-0" />
                  <span>{content.contactSection.directContacts.statusNotice}</span>
                </div>

                <div className="pt-2 border-t border-white/10 flex flex-wrap gap-4 text-xs text-gray-300">
                  <span>
                    <strong>{content.common.workingHours}: </strong>
                    {content.common.operatingSchedule}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}