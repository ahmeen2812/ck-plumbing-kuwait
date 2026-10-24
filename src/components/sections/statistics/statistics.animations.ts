import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface StatBlockElement {
  card: HTMLElement;
  numberEl: HTMLElement;
  targetNumber?: number;
  suffix?: string;
  staticValue?: string;
}

export function initStatisticsAnimations(
  sectionEl: HTMLElement | null,
  statBlocks: StatBlockElement[]
): () => void {
  if (!sectionEl || statBlocks.length === 0) return () => {};

  if (prefersReducedMotion()) {
    statBlocks.forEach((block) => {
      gsap.set(block.card, { opacity: 1, y: 0, clearProps: "all" });
      if (block.targetNumber !== undefined) {
        block.numberEl.textContent = `${block.targetNumber}${block.suffix || ""}`;
      } else if (block.staticValue) {
        block.numberEl.textContent = block.staticValue;
      }
    });
    return () => {};
  }

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top 82%",
        end: "bottom top",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
      defaults: { ease: "power3.out" },
    });

    tl.fromTo(
      statBlocks.map((b) => b.card),
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
      }
    );

    statBlocks.forEach((block) => {
      if (block.targetNumber !== undefined) {
        const counter = { val: 0 };
        block.numberEl.textContent = `0${block.suffix || ""}`;

        tl.to(
          counter,
          {
            val: block.targetNumber,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              block.numberEl.textContent = `${Math.floor(counter.val)}${block.suffix || ""}`;
            },
          },
          "-=0.4"
        );
      } else if (block.staticValue) {
        tl.fromTo(
          block.numberEl,
          { opacity: 0, scale: 0.88 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          "-=0.4"
        );
      }
    });
  }, sectionEl);

  if (typeof document !== "undefined" && document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }

  return () => {
    ctx.revert();
  };
}