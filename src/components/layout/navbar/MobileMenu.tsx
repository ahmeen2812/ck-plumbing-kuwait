"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { NAVBAR_CONFIG } from "./navbar.config";
import {
  animateMobileMenuOpen,
  animateMobileMenuClose,
} from "./navbar.animations";
import { PhoneCall, Globe } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { locale, toggleLocale } = useLanguage();
  const [shouldRender, setShouldRender] = useState(isOpen);
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!shouldRender) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      const validItems = itemsRef.current.filter(
        (el): el is HTMLElement => el !== null
      );
      animateMobileMenuOpen(drawerRef.current, backdropRef.current, validItems);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, shouldRender]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    animateMobileMenuClose(drawerRef.current, backdropRef.current, () => {
      setShouldRender(false);
      onClose();
    });
  };

  if (!shouldRender) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 top-[72px] sm:top-[84px] z-50 bg-[#132E3C]/45 lg:hidden overflow-y-auto"
      onClick={handleDismiss}
    >
      <div
        ref={drawerRef}
        className="w-full max-h-[calc(100dvh-72px)] sm:max-h-[calc(100dvh-84px)] overflow-y-auto bg-[#F7F5F0] border-b border-[#D8DDDD] px-4 py-6 sm:px-6 sm:py-8 shadow-none flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
          {NAVBAR_CONFIG.links.map((link, idx) => {
            const label = locale === "ar" ? link.labelAr : link.labelEn;
            return (
              <Link
                key={link.id}
                href={link.href}
                ref={(el) => {
                  itemsRef.current[idx] = el;
                }}
                onClick={handleDismiss}
                className="py-3 px-2 text-base sm:text-lg font-semibold text-[#132E3C] hover:text-[#B45C31] border-b border-[#D8DDDD]/60 transition-colors duration-200"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div
          ref={(el) => {
            itemsRef.current[NAVBAR_CONFIG.links.length] = el;
          }}
          className="pt-6 sm:pt-8 mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5"
        >
          <button
            type="button"
            onClick={() => {
              toggleLocale();
              handleDismiss();
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 bg-[#FFFFFF] border border-[#D8DDDD] text-[#132E3C] text-xs sm:text-sm font-bold hover:bg-[#EFECE5] hover:border-[#BAC3C3] transition-colors duration-200"
          >
            <Globe className="w-4 h-4 text-[#536270]" />
            <span>
              {locale === "ar"
                ? NAVBAR_CONFIG.languageToggle.labelAr
                : NAVBAR_CONFIG.languageToggle.labelEn}
            </span>
          </button>

          <Link
            href={NAVBAR_CONFIG.cta.href}
            onClick={handleDismiss}
            className="flex items-center justify-center gap-2.5 bg-[#132E3C] hover:bg-[#B45C31] text-white text-xs sm:text-sm font-bold px-5 py-3 sm:px-6 sm:py-3.5 transition-colors duration-200 border border-[#132E3C] hover:border-[#B45C31]"
          >
            <PhoneCall className="w-4 h-4" />
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