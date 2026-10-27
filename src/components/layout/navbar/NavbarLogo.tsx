// src/components/layout/navbar/NavbarLogo.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { NAVBAR_CONFIG } from "./navbar.config";

export function NavbarLogo() {
  const { locale } = useLanguage();
  const brandName =
    locale === "ar" ? NAVBAR_CONFIG.brandNameAr : NAVBAR_CONFIG.brandNameEn;

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31] group"
      aria-label={brandName}
    >
      {/* Precision Geometric Monogram Emblem */}
      <div className="relative flex items-center justify-center w-9 h-9 bg-[#132E3C] text-white border border-[#132E3C] transition-colors duration-200 group-hover:bg-[#B45C31] group-hover:border-[#B45C31]">
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          aria-hidden="true"
        >
          {/* Engineering valve & mechanical pipe intersection mark */}
          <path d="M4 12h16" />
          <path d="M12 4v16" />
          <circle cx="12" cy="12" r="3" fill="#B45C31" stroke="none" />
        </svg>
      </div>

      {/* Strictly Single-Line Typography */}
      <span className="text-sm md:text-base font-bold text-[#132E3C] tracking-tight whitespace-nowrap select-none">
        {brandName}
      </span>
    </Link>
  );
}