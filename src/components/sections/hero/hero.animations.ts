import { gsap } from "gsap";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface HeroAnimationElements {
  container: HTMLElement | null;
  heading: HTMLElement | null;
  description: HTMLElement | null;
  ctaPrimary: HTMLElement | null;
  ctaSecondary: HTMLElement | null;
  imageWrapper: HTMLElement | null;
}

export function animateHeroEntrance(
  elements: HeroAnimationElements
): gsap.core.Timeline | null {
  const {
    container,
    heading,
    description,
    ctaPrimary,
    ctaSecondary,
    imageWrapper,
  } = elements;

  if (!container) return null;

  if (prefersReducedMotion()) {
    gsap.set(
      [heading, description, ctaPrimary, ctaSecondary, imageWrapper],
      { opacity: 1, y: 0, scale: 1, clearProps: "all" }
    );
    return null;
  }

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  if (heading) {
    tl.fromTo(
      heading,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, clearProps: "transform,opacity" }
    );
  }

  if (description) {
    tl.fromTo(
      description,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, clearProps: "transform,opacity" },
      "-=0.3"
    );
  }

  const ctaButtons = [ctaPrimary, ctaSecondary].filter(
    (el): el is HTMLElement => el !== null
  );

  if (ctaButtons.length > 0) {
    tl.fromTo(
      ctaButtons,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, clearProps: "transform,opacity" },
      "-=0.25"
    );
  }

  if (imageWrapper) {
    tl.fromTo(
      imageWrapper,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", clearProps: "transform,opacity" },
      "-=0.35"
    );
  }

  return tl;
}9