"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { NAVBAR_CONFIG } from "./navbar/navbar.config";
import { NavbarLogo } from "./navbar/NavbarLogo";
import { MobileMenu } from "./navbar/MobileMenu";
import { animateNavbarEntrance } from "./navbar/navbar.animations";
import { Globe, PhoneCall, Menu, X } from "lucide-react";

export function Navbar() {
  const { locale, toggleLocale } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const logoEmblemRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const languageBtnRef = useRef<HTMLButtonElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const validLinks = navLinksRef.current.filter(
      (el): el is HTMLAnchorElement => el !== null
    );

    const tl = animateNavbarEntrance({
      header: headerRef.current,
      logoEmblem: logoEmblemRef.current,
      logoText: logoTextRef.current,
      navLinks: validLinks,
      languageBtn: languageBtnRef.current,
      ctaBtn: ctaBtnRef.current,
      mobileTrigger: mobileTriggerRef.current,
    });

    return () => {
      tl?.kill();
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full bg-[#F7F5F0] border-b border-[#D8DDDD]"
      >
        <div className="site-container">
          <div className="flex h-[78px] sm:h-[84px] items-center justify-between gap-6 lg:gap-10">
            <NavbarLogo
              emblemRef={logoEmblemRef}
              textRef={logoTextRef}
            />

            <nav
              className="hidden lg:flex items-center gap-8 xl:gap-10"
              aria-label="Main Navigation"
            >
              {NAVBAR_CONFIG.links.map((link, idx) => {
                const label = locale === "ar" ? link.labelAr : link.labelEn;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    ref={(el) => {
                      navLinksRef.current[idx] = el;
                    }}
                    className="relative group py-2 text-[15px] font-semibold text-[#1E2933] hover:text-[#B45C31] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B45C31]"
                  >
                    <span>{label}</span>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 w-0 h-[2px] bg-[#B45C31] transition-all duration-300 ease-out group-hover:w-full"
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3.5 shrink-0">
              <button
                ref={languageBtnRef}
                type="button"
                onClick={toggleLocale}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold text-[#132E3C] bg-[#FFFFFF] border border-[#D8DDDD] hover:bg-[#EFECE5] hover:border-[#BAC3C3] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
                aria-label={`Switch language to ${
                  locale === "ar"
                    ? NAVBAR_CONFIG.languageToggle.labelAr
                    : NAVBAR_CONFIG.languageToggle.labelEn
                }`}
              >
                <Globe className="w-4 h-4 text-[#536270]" />
                <span>
                  {locale === "ar"
                    ? NAVBAR_CONFIG.languageToggle.labelAr
                    : NAVBAR_CONFIG.languageToggle.labelEn}
                </span>
              </button>

              <Link
                ref={ctaBtnRef}
                href={NAVBAR_CONFIG.cta.href}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#132E3C] hover:bg-[#B45C31] text-white text-xs sm:text-sm font-bold transition-all duration-200 border border-[#132E3C] hover:border-[#B45C31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>
                  {locale === "ar"
                    ? NAVBAR_CONFIG.cta.labelAr
                    : NAVBAR_CONFIG.cta.labelEn}
                </span>
              </Link>
            </div>

            <div className="flex lg:hidden items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={toggleLocale}
                className="px-3 py-2 text-xs font-bold text-[#132E3C] bg-white border border-[#D8DDDD] hover:bg-[#EFECE5] transition-colors"
                aria-label="Toggle language"
              >
                {locale === "ar" ? "EN" : "عربي"}
              </button>

              <button
                ref={mobileTriggerRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-[#132E3C] bg-white border border-[#D8DDDD] hover:bg-[#EFECE5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}