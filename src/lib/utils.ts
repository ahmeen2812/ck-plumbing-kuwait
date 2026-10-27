// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names and resolves conflicting Tailwind CSS rules.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a raw phone string into an international display format.
 */
export function formatKuwaitPhone(phone: string): string {
  const clean = phone.replace(/[^\d+]/g, "");
  if (clean.startsWith("+965")) {
    const local = clean.slice(4);
    if (local.length === 8) {
      return `+965 ${local.slice(0, 4)} ${local.slice(4)}`;
    }
  }
  return clean;
}