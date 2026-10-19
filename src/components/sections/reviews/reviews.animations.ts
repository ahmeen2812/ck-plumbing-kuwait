import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface ReviewsAnimationTargets {
  sectionEl: HTMLElement | null;
  headingWrapper: HTMLElement | null;
  divider: HTMLElement | null;
  summaryCard: HTMLElement | null;
  progressBars: HTMLElement[];
  reviewCards: HTMLElement[];
}

export function initReviewsSectionAnimations(targets: ReviewsAnimationTargets): () => void {
  const { sectionEl, headingWrapper, divider, summaryCard, progressBars, reviewCards } = targets;

  if (!sectionEl) return () => {};

  if (prefersReducedMotion()) {
    gsap.set(
      [headingWrapper, divider, summaryCard, ...reviewCards].filter(Boolean),
      { opacity: 1, y: 0, clearProps: "all" }
    );
    progressBars.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-percentage") || "0";
      bar.style.width = `${targetWidth}%`;
    });
    return () => {};
  }

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top 78%",
        end: "bottom top",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
      defaults: { ease: "power3.out" },
    });

    if (headingWrapper) {
      tl.fromTo(
        headingWrapper,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }

    if (divider) {
      tl.fromTo(
        divider,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.inOut" },
        "-=0.35"
      );
    }

    if (summaryCard) {
      tl.fromTo(
        summaryCard,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55 },
        "-=0.25"
      );
    }

    progressBars.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-percentage") || "0";
      tl.fromTo(
        bar,
        { width: "0%" },
        {
          width: `${targetWidth}%`,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );
    });

    if (reviewCards.length > 0) {
      tl.fromTo(
        reviewCards,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }
  }, sectionEl);

  return () => {
    ctx.revert();
  };
}

export function animateModalOpen(overlayEl: HTMLElement | null, modalEl: HTMLElement | null): void {
  if (!overlayEl || !modalEl) return;

  if (prefersReducedMotion()) {
    gsap.set([overlayEl, modalEl], { opacity: 1 });
    return;
  }

  gsap.fromTo(
    overlayEl,
    { opacity: 0 },
    { opacity: 1, duration: 0.25, ease: "power2.out" }
  );

  gsap.fromTo(
    modalEl,
    { opacity: 0, y: 20, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
  );
}

export function animateModalClose(
  overlayEl: HTMLElement | null,
  modalEl: HTMLElement | null,
  onComplete: () => void
): void {
  if (!overlayEl || !modalEl || prefersReducedMotion()) {
    onComplete();
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: "power2.in" },
    onComplete,
  });

  tl.to(modalEl, { opacity: 0, y: 15, scale: 0.97, duration: 0.2 }).to(
    overlayEl,
    { opacity: 0, duration: 0.18 },
    "-=0.1"
  );
}