import { gsap } from "gsap";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface NavbarElements {
  header: HTMLElement | null;
  logoEmblem: HTMLElement | null;
  logoText: HTMLElement | null;
  navLinks: HTMLElement[];
  languageBtn: HTMLElement | null;
  ctaBtn: HTMLElement | null;
  mobileTrigger: HTMLElement | null;
}

export function animateNavbarEntrance(
  elements: NavbarElements
): gsap.core.Timeline | null {
  const {
    header,
    logoEmblem,
    logoText,
    navLinks,
    languageBtn,
    ctaBtn,
    mobileTrigger,
  } = elements;

  if (!header) return null;

  if (prefersReducedMotion()) {
    gsap.set(
      [
        header,
        logoEmblem,
        logoText,
        navLinks,
        languageBtn,
        ctaBtn,
        mobileTrigger,
      ],
      { opacity: 1, y: 0, x: 0, scale: 1, clearProps: "all" }
    );
    return null;
  }

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  tl.fromTo(
    header,
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
  );

  if (logoEmblem) {
    tl.fromTo(
      logoEmblem,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45 },
      "-=0.35"
    );
  }

  if (logoText) {
    tl.fromTo(
      logoText,
      { x: -12, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45 },
      "-=0.3"
    );
  }

  if (navLinks.length > 0) {
    tl.fromTo(
      navLinks,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 },
      "-=0.25"
    );
  }

  if (languageBtn) {
    tl.fromTo(
      languageBtn,
      { y: -8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35 },
      "-=0.2"
    );
  }

  if (ctaBtn) {
    tl.fromTo(
      ctaBtn,
      { scale: 0.94, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.4)" },
      "-=0.2"
    );
  }

  if (mobileTrigger) {
    tl.fromTo(
      mobileTrigger,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35 },
      "-=0.3"
    );
  }

  return tl;
}

export function animateMobileMenuOpen(
  drawerEl: HTMLElement | null,
  backdropEl: HTMLElement | null,
  itemsEl: HTMLElement[]
): gsap.core.Timeline | null {
  if (!drawerEl || !backdropEl) return null;

  if (prefersReducedMotion()) {
    gsap.set(backdropEl, { opacity: 1 });
    gsap.set(drawerEl, { opacity: 1, y: 0 });
    gsap.set(itemsEl, { opacity: 1, x: 0 });
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    backdropEl,
    { opacity: 0 },
    { opacity: 1, duration: 0.25 }
  ).fromTo(
    drawerEl,
    { y: -18, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.35 },
    "-=0.15"
  );

  if (itemsEl.length > 0) {
    tl.fromTo(
      itemsEl,
      { x: -14, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.28, stagger: 0.04 },
      "-=0.2"
    );
  }

  return tl;
}

export function animateMobileMenuClose(
  drawerEl: HTMLElement | null,
  backdropEl: HTMLElement | null,
  onComplete: () => void
): void {
  if (!drawerEl || !backdropEl || prefersReducedMotion()) {
    onComplete();
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: "power2.in" },
    onComplete,
  });

  tl.to(drawerEl, { y: -12, opacity: 0, duration: 0.2 }).to(
    backdropEl,
    { opacity: 0, duration: 0.18 },
    "-=0.1"
  );
}