// src/components/layout/navbar/MobileMenu.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { NAVBAR_CONFIG } from "./navbar.config";
import { animateMobileMenuEntrance } from "./navbar.animations";
import { PhoneCall, Globe, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { locale, isRtl, toggleLocale } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Lock background scrolling while drawer is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const validLinks = linksRef.current.filter(
        (el): el is HTMLAnchorElement => el !== null
      );
      animateMobileMenuEntrance(drawerRef.current, validLinks);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 top-[72px] z-50 bg-[#132E3C]/40 backdrop-none lg:hidden"
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        className="w-full bg-[#F7F5F0] border-b border-[#D8DDDD] p-6 shadow-none flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Links List */}
        <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
          {NAVBAR_CONFIG.links.map((link, idx) => {
            const label = locale === "ar" ? link.labelAr : link.labelEn;
            return (
              <Link
                key={link.id}
                href={link.href}
                ref={(el) => {
                  linksRef.current[idx] = el;
                }}
                onClick={onClose}
                className="py-3 px-2 text-base font-semibold text-[#132E3C] hover:text-[#B45C31] border-b border-[#D8DDDD]/60 transition-colors"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Lower Action Suite: Language Switcher + Call CTA */}
        <div className="pt-6 mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Language Switcher Button */}
          <button
            type="button"
            onClick={() => {
              toggleLocale();
              onClose();
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FFFFFF] border border-[#D8DDDD] text-[#132E3C] text-xs font-bold hover:bg-[#EFECE5] transition-colors"
          >
            <Globe className="w-4 h-4 text-[#536270]" />
            <span>
              {locale === "ar"
                ? NAVBAR_CONFIG.languageToggle.labelAr
                : NAVBAR_CONFIG.languageToggle.labelEn}
            </span>
          </button>

          {/* Primary Action Button */}
          <Link
            href={NAVBAR_CONFIG.cta.href}
            onClick={onClose}
            className="flex items-center justify-center gap-2 bg-[#132E3C] hover:bg-[#B45C31] text-white text-xs font-bold px-6 py-3 transition-colors border border-[#132E3C] hover:border-[#B45C31]"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>
              {locale === "ar"
                ? NAVBAR_CONFIG.cta.labelAr
                : NAVBAR_CONFIG.cta.labelEn}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}