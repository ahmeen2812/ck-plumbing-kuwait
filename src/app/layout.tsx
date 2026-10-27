import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Manrope, IBM_Plex_Sans_Arabic } from "next/font/google";
import { SITE_CONFIG } from "@/config/site";
import { LanguageProvider, type Locale } from "@/lib/LanguageContext";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#132E3C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.meta.baseUrl),
  title: {
    default: SITE_CONFIG.meta.defaultTitleAr,
    template: `%s | ${SITE_CONFIG.brand.nameAr}`,
  },
  description: SITE_CONFIG.meta.defaultDescriptionAr,
  keywords: [
    "سباك صحي الكويت",
    "فني صحي الكويت",
    "كشف خرير المياه",
    "تسليك مجاري الكويت",
    "صيانة سخانات مركزية",
    "تركيب مضخات مياه",
    "Plumbing service Kuwait",
    "Leak detection Kuwait",
    "Drainage clearing Kuwait",
  ],
  authors: [{ name: SITE_CONFIG.brand.nameEn }],
  creator: SITE_CONFIG.brand.nameEn,
  publisher: SITE_CONFIG.brand.nameEn,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      ar: "/?lang=ar",
      en: "/?lang=en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_KW",
    alternateLocale: "en_KW",
    url: SITE_CONFIG.meta.baseUrl,
    title: SITE_CONFIG.meta.defaultTitleAr,
    description: SITE_CONFIG.meta.defaultDescriptionAr,
    siteName: SITE_CONFIG.brand.nameAr,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("ck_locale")?.value;
  const initialLocale: Locale = rawLocale === "en" ? "en" : "ar";
  const initialDir = initialLocale === "ar" ? "rtl" : "ltr";

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "PlumbingService",
    name: SITE_CONFIG.brand.nameEn,
    alternateName: SITE_CONFIG.brand.nameAr,
    description: SITE_CONFIG.meta.defaultDescriptionEn,
    url: SITE_CONFIG.meta.baseUrl,
    email: SITE_CONFIG.contact.email,
    priceRange: "KWD",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KW",
      addressLocality: "Kuwait City",
      streetAddress: SITE_CONFIG.contact.pendingClientConfirmation.registeredPhysicalAddress,
    },
    areaServed: SITE_CONFIG.serviceGovernorates.map((gov) => ({
      "@type": "AdministrativeArea",
      name: `${gov.nameEn} (${gov.nameAr})`,
    })),
    currenciesAccepted: "KWD",
    paymentAccepted: "Cash, Cheque, Bank Transfer (Online checkout disabled)",
  };

  return (
    <html
      lang={initialLocale}
      dir={initialDir}
      translate="no"
      className={`notranslate ${manrope.variable} ${ibmPlexSansArabic.variable}`}
    >
      <head>
        <meta name="google" content="notranslate" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#F7F5F0] text-[#1E2933] antialiased selection:bg-[#132E3C] selection:text-white">
        <LanguageProvider initialLocale={initialLocale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}