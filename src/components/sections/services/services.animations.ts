import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface ServiceAnimationTargets {
  container: HTMLElement | null;
  imageWrapper: HTMLElement | null;
  title: HTMLElement | null;
  description: HTMLElement | null;
  scopeItems: HTMLElement[];
  ctaPrimary: HTMLElement | null;
  ctaSecondary: HTMLElement | null;
  layout: "text-left" | "image-left";
}

export function initServiceSectionAnimation(
  targets: ServiceAnimationTargets
): () => void {
  const {
    container,
    imageWrapper,
    title,
    description,
    scopeItems,
    ctaPrimary,
    ctaSecondary,
    layout,
  } = targets;

  if (!container) return () => {};

  if (prefersReducedMotion()) {
    gsap.set(
      [
        imageWrapper,
        title,
        description,
        scopeItems,
        ctaPrimary,
        ctaSecondary,
      ].filter(Boolean),
      { opacity: 1, x: 0, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)", clearProps: "all" }
    );
    return () => {};
  }

  const isTextLeft = layout === "text-left";
  const imageSlideX = isTextLeft ? 28 : -28;
  const textSlideX = isTextLeft ? -28 : 28;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 78%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
    defaults: { ease: "power2.out" },
  });

  if (imageWrapper) {
    tl.fromTo(
      imageWrapper,
      {
        opacity: 0,
        x: imageSlideX,
        clipPath: isTextLeft
          ? "inset(0% 100% 0% 0%)"
          : "inset(0% 0% 0% 100%)",
      },
      {
        opacity: 1,
        x: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.75,
        ease: "power3.out",
      }
    );
  }

  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, x: textSlideX, y: 16 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.55,
      },
      "-=0.55"
    );
  }

  if (description) {
    tl.fromTo(
      description,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.4"
    );
  }

  if (scopeItems.length > 0) {
    tl.fromTo(
      scopeItems,
      { opacity: 0, x: textSlideX * 0.4, y: 10 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
      },
      "-=0.3"
    );
  }

  const ctaButtons = [ctaPrimary, ctaSecondary].filter(
    (el): el is HTMLElement => el !== null
  );

  if (ctaButtons.length > 0) {
    tl.fromTo(
      ctaButtons,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.08,
      },
      "-=0.25"
    );
  }

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}