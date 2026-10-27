// src/components/layout/navbar/navbar.config.ts

export interface NavLinkItem {
  id: string;
  href: string;
  labelEn: string;
  labelAr: string;
}

export interface NavbarConfig {
  brandNameEn: string;
  brandNameAr: string;
  links: NavLinkItem[];
  cta: {
    labelEn: string;
    labelAr: string;
    href: string;
  };
  languageToggle: {
    labelEn: string;
    labelAr: string;
  };
}

export const NAVBAR_CONFIG: NavbarConfig = {
  brandNameEn: "CK Plumbing & Electrical Services",
  brandNameAr: "سي كيه لخدمات السباكة والكهرباء",

  // Strictly 5 essential navigation destinations
  links: [
    {
      id: "home",
      href: "/",
      labelEn: "Home",
      labelAr: "الرئيسية",
    },
    {
      id: "services",
      href: "#services",
      labelEn: "Services",
      labelAr: "خدماتنا",
    },
    {
      id: "about",
      href: "#about",
      labelEn: "About",
      labelAr: "عن الشركة",
    },
    {
      id: "service-areas",
      href: "#coverage",
      labelEn: "Service Areas",
      labelAr: "مناطق التغطية",
    },
    {
      id: "contact",
      href: "#contact",
      labelEn: "Contact",
      labelAr: "الاتصال",
    },
  ],

  cta: {
    labelEn: "Request a Call",
    labelAr: "طلب اتصال",
    href: "#contact",
  },

  languageToggle: {
    labelEn: "العربية",
    labelAr: "English",
  },
};