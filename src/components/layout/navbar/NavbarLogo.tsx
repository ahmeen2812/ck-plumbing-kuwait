"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { NAVBAR_CONFIG } from "./navbar.config";

interface NavbarLogoProps {
  emblemRef?: React.Ref<HTMLDivElement>;
  textRef?: React.Ref<HTMLSpanElement>;
}

export const NavbarLogo = forwardRef<HTMLAnchorElement, NavbarLogoProps>(
  ({ emblemRef, textRef }, ref) => {
    const { locale } = useLanguage();
    const brandName =
      locale === "ar" ? NAVBAR_CONFIG.brandNameAr : NAVBAR_CONFIG.brandNameEn;

    return (
      <Link
        ref={ref}
        href="/"
        className="inline-flex items-center gap-3.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31] group py-1"
        aria-label={brandName}
      >
        <div
          ref={emblemRef}
          className="relative flex items-center justify-center w-11 h-11 bg-[#132E3C] text-white border border-[#132E3C] transition-colors duration-300 group-hover:bg-[#B45C31] group-hover:border-[#B45C31]"
        >
          <svg
            className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            aria-hidden="true"
          >
            <path d="M4 12h16" />
            <path d="M12 4v16" />
            <circle cx="12" cy="12" r="3" fill="#B45C31" stroke="none" />
          </svg>
        </div>

        <span
          ref={textRef}
          className="text-base sm:text-[1.075rem] lg:text-[1.125rem] font-bold text-[#132E3C] tracking-tight whitespace-nowrap select-none transition-colors duration-200 group-hover:text-[#B45C31]"
        >
          {brandName}
        </span>
      </Link>
    );
  }
);

NavbarLogo.displayName = "NavbarLogo";