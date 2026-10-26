// src/components/layout/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG } from "@/config/site";
import { Globe, Menu, X, PhoneCall, ShieldCheck, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const { locale, isRtl, content, toggleLocale } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "#services", label: content.nav.services },
    { href: "#about", label: content.nav.about },
    { href: "#process", label: content.nav.process },
    { href: "#coverage", label: content.nav.serviceAreas },
    { href: "#faq", label: content.nav.faq },
    { href: "#contact", label: content.nav.contact },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
          isScrolled
            ? "bg-[#F7F5F0] border-b border-[#D8DDDD] shadow-[0_1px_0_0_#D8DDDD]"
            : "bg-[#F7F5F0] border-b border-[#D8DDDD]"
        }`}
      >
        <div className="site-container">
          <div className="flex h-20 items-center justify-between">
            {/* Architectural Brand Identity */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
              aria-label={SITE_CONFIG.brand.nameEn}
            >
              {/* Solid Engineering Monogram Badge */}
              <div className="flex h-11 w-11 items-center justify-center bg-[#132E3C] text-white font-bold text-lg tracking-wider border border-[#132E3C] transition-colors group-hover:bg-[#B45C31] group-hover:border-[#B45C31]">
                CK
              </div>

              <div className="flex flex-col">
                <span className="text-base font-bold text-[#132E3C] leading-tight">
                  {locale === "ar" ? SITE_CONFIG.brand.nameAr : SITE_CONFIG.brand.nameEn}
                </span>
                <span className="text-xs font-medium text-[#536270] flex items-center gap-1.5 mt-0.5">
                  <span className="inline-block w-1.5 h-1.5 bg-[#B45C31]"></span>
                  {locale === "ar" ? "خدمات السباكة الهندسية — دولة الكويت" : "Engineering Plumbing — State of Kuwait"}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-[#1E2933] hover:text-[#B45C31] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B45C31]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Controls: Language Switcher & Service CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLocale}
                className="flex items-center gap-1.5 text-xs font-bold text-[#132E3C] px-3 py-2 border border-[#D8DDDD] bg-[#FFFFFF] hover:bg-[#EFECE5] hover:border-[#BAC3C3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
                aria-label={`Switch to ${content.common.languageSwitcher}`}
              >
                <Globe className="w-3.5 h-3.5 text-[#536270]" />
                <span>{content.common.languageSwitcher}</span>
              </button>

              {/* Direct Booking CTA */}
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#132E3C] text-white text-xs font-bold px-4 py-2.5 hover:bg-[#B45C31] transition-colors border border-[#132E3C] hover:border-[#B45C31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{content.common.requestService}</span>
              </Link>
            </div>

            {/* Mobile Menu & Language Toggle */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={toggleLocale}
                className="flex items-center justify-center p-2 text-xs font-bold text-[#132E3C] border border-[#D8DDDD] bg-white"
                aria-label="Toggle language"
              >
                {locale === "ar" ? "EN" : "عربي"}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#132E3C] border border-[#D8DDDD] bg-white hover:bg-[#EFECE5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Solid Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-20 z-40 bg-[#132E3C]/40 backdrop-none lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={`absolute top-0 bottom-0 w-full max-w-sm bg-[#F7F5F0] border-t border-[#D8DDDD] p-6 shadow-none flex flex-col justify-between ${
              isRtl ? "right-0 border-l" : "left-0 border-r"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-3">
              <div className="pb-3 border-b border-[#D8DDDD]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#536270]">
                  {locale === "ar" ? "أقسام الموقع" : "Navigation"}
                </p>
              </div>

              <nav className="flex flex-col space-y-2 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 text-base font-semibold text-[#132E3C] hover:text-[#B45C31] border-b border-[#D8DDDD]/50"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#536270]" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Footer Area with Regulatory & Contact Info */}
            <div className="pt-6 border-t border-[#D8DDDD] space-y-3">
              <div className="bg-white p-3.5 border border-[#D8DDDD]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#132E3C] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#B45C31]" />
                  <span>{locale === "ar" ? "نطاق العمل: دولة الكويت" : "Jurisdiction: State of Kuwait"}</span>
                </div>
                <p className="text-xs text-[#536270] leading-relaxed">
                  {content.common.operatingSchedule}
                </p>
              </div>

              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#132E3C] text-white font-bold py-3 text-sm hover:bg-[#B45C31] transition-colors border border-[#132E3C]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{content.common.requestService}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}