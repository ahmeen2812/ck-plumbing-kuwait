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
  ctaButton: HTMLElement | null;
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
    ctaButton,
    layout,
  } = targets;

  if (!container) return () => {};

  if (prefersReducedMotion()) {
    gsap.set(
      [imageWrapper, title, description, scopeItems, ctaButton].filter(Boolean),
      { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "all" }
    );
    return () => {};
  }

  const isTextLeft = layout === "text-left";
  const imageSlideX = isTextLeft ? 24 : -24;
  const textSlideX = isTextLeft ? -24 : 24;

  const trigger = ScrollTrigger.create({
    trigger: container,
    start: "top 78%",
    once: true,
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (imageWrapper) {
        tl.fromTo(
          imageWrapper,
          { opacity: 0, x: imageSlideX, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.65,
            clearProps: "transform,opacity",
          }
        );
      }

      if (title) {
        tl.fromTo(
          title,
          { opacity: 0, x: textSlideX },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            clearProps: "transform,opacity",
          },
          "-=0.4"
        );
      }

      if (description) {
        tl.fromTo(
          description,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            clearProps: "transform,opacity",
          },
          "-=0.3"
        );
      }

      if (scopeItems.length > 0) {
        tl.fromTo(
          scopeItems,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.08,
            clearProps: "transform,opacity",
          },
          "-=0.25"
        );
      }

      if (ctaButton) {
        tl.fromTo(
          ctaButton,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            clearProps: "transform,opacity",
          },
          "-=0.2"
        );
      }
    },
  });

  return () => {
    trigger.kill();
  };
}