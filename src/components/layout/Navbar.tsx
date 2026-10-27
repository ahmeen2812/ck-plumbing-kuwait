// src/components/layout/Navbar.tsx
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

  const navContainerRef = useRef<HTMLElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const actionsWrapperRef = useRef<HTMLDivElement>(null);

  // Run orchestrated GSAP entrance once on mount
  useEffect(() => {
    const validLinks = navLinksRef.current.filter(
      (el): el is HTMLAnchorElement => el !== null
    );
    animateNavbarEntrance(
      navContainerRef.current,
      logoWrapperRef.current,
      validLinks,
      actionsWrapperRef.current
    );
  }, []);

  return (
    <>
      <header
        ref={navContainerRef}
        className="sticky top-0 z-50 w-full bg-[#F7F5F0] border-b border-[#D8DDDD]"
      >
        <div className="site-container">
          <div className="flex h-[72px] items-center justify-between gap-6">
            {/* 1. Brand Logo + Company Name on ONE Line Only */}
            <div ref={logoWrapperRef} className="shrink-0">
              <NavbarLogo />
            </div>

            {/* 2. Exactly 5 Navigation Links (Desktop) */}
            <nav
              className="hidden lg:flex items-center gap-8"
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
                    className="text-sm font-semibold text-[#1E2933] hover:text-[#B45C31] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B45C31]"
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* 3. Action Group: Language Switcher + [Request a Call] Button */}
            <div
              ref={actionsWrapperRef}
              className="hidden lg:flex items-center gap-3 shrink-0"
            >
              {/* Refined Language Switcher Toggle */}
              <button
                type="button"
                onClick={toggleLocale}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#132E3C] bg-[#FFFFFF] border border-[#D8DDDD] hover:bg-[#EFECE5] hover:border-[#BAC3C3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
                aria-label={`Switch language to ${
                  locale === "ar"
                    ? NAVBAR_CONFIG.languageToggle.labelAr
                    : NAVBAR_CONFIG.languageToggle.labelEn
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-[#536270]" />
                <span>
                  {locale === "ar"
                    ? NAVBAR_CONFIG.languageToggle.labelAr
                    : NAVBAR_CONFIG.languageToggle.labelEn}
                </span>
              </button>

              {/* Prominent 'Request a Call' Button */}
              <Link
                href={NAVBAR_CONFIG.cta.href}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#132E3C] hover:bg-[#B45C31] text-white text-xs font-bold transition-colors border border-[#132E3C] hover:border-[#B45C31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>
                  {locale === "ar"
                    ? NAVBAR_CONFIG.cta.labelAr
                    : NAVBAR_CONFIG.cta.labelEn}
                </span>
              </Link>
            </div>

            {/* Mobile Controls (Language Quick Toggle + Hamburger Trigger) */}
            <div className="flex lg:hidden items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={toggleLocale}
                className="px-2.5 py-1.5 text-xs font-bold text-[#132E3C] bg-white border border-[#D8DDDD]"
                aria-label="Toggle language"
              >
                {locale === "ar" ? "EN" : "عربي"}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#132E3C] bg-white border border-[#D8DDDD] hover:bg-[#EFECE5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
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

      {/* Accessible Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}