// src/components/layout/navbar/navbar.animations.ts
import { gsap } from "gsap";

/**
 * Checks whether the client has requested reduced motion.
 */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Orchestrates the initial entrance animation of the desktop and mobile navigation header.
 */
export function animateNavbarEntrance(
  navContainer: HTMLElement | null,
  logoEl: HTMLElement | null,
  navLinks: HTMLElement[],
  actionsEl: HTMLElement | null
): gsap.core.Timeline | null {
  if (!navContainer || prefersReducedMotion()) {
    if (navContainer) {
      navContainer.style.opacity = "1";
      navContainer.style.transform = "none";
    }
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  tl.fromTo(
    navContainer,
    { y: -16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45 }
  );

  if (logoEl) {
    tl.fromTo(
      logoEl,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.35 },
      "-=0.2"
    );
  }

  if (navLinks.length > 0) {
    tl.fromTo(
      navLinks,
      { opacity: 0, y: -6 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 },
      "-=0.2"
    );
  }

  if (actionsEl) {
    tl.fromTo(
      actionsEl,
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.35 },
      "-=0.2"
    );
  }

  return tl;
}

/**
 * Smooth entrance animation for the mobile menu drawer.
 */
export function animateMobileMenuEntrance(
  drawerEl: HTMLElement | null,
  linksEl: HTMLElement[]
): gsap.core.Timeline | null {
  if (!drawerEl || prefersReducedMotion()) {
    if (drawerEl) drawerEl.style.opacity = "1";
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    drawerEl,
    { opacity: 0, y: -12 },
    { opacity: 1, y: 0, duration: 0.3 }
  );

  if (linksEl.length > 0) {
    tl.fromTo(
      linksEl,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.25, stagger: 0.04 },
      "-=0.15"
    );
  }

  return tl;
}