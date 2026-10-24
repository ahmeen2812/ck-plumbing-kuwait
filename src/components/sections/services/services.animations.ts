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
  const imageSlideX = isTextLeft ? 40 : -40;
  const textSlideX = isTextLeft ? -30 : 30;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 76%",
        end: "bottom top",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
      defaults: { ease: "power3.out" },
    });

    if (imageWrapper) {
      const innerImg = imageWrapper.querySelector("img");

      tl.fromTo(
        imageWrapper,
        {
          opacity: 0,
          x: imageSlideX,
          clipPath: isTextLeft
            ? "inset(0% 0% 0% 100%)"
            : "inset(0% 100% 0% 0%)",
        },
        {
          opacity: 1,
          x: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.85,
          ease: "power3.inOut",
        }
      );

      if (innerImg) {
        tl.fromTo(
          innerImg,
          { scale: 1.12 },
          { scale: 1, duration: 1.1, ease: "power2.out" },
          "-=0.85"
        );
      }
    }

    if (title) {
      tl.fromTo(
        title,
        { opacity: 0, y: 32, x: textSlideX },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.65,
        },
        "-=0.7"
      );
    }

    if (description) {
      tl.fromTo(
        description,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
        },
        "-=0.45"
      );
    }

    if (scopeItems.length > 0) {
      tl.fromTo(
        scopeItems,
        { opacity: 0, x: textSlideX * 0.5, y: 10 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.45,
          stagger: 0.09,
        },
        "-=0.35"
      );
    }

    const ctaButtons = [ctaPrimary, ctaSecondary].filter(
      (el): el is HTMLElement => el !== null
    );

    if (ctaButtons.length > 0) {
      tl.fromTo(
        ctaButtons,
        { opacity: 0, y: 16, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.1,
        },
        "-=0.25"
      );
    }
  }, container);

  if (typeof document !== "undefined" && document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }

  return () => {
    ctx.revert();
  };
}