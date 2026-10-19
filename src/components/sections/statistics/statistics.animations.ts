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
      gsap.set(block.card, { opacity: 1, x: 0, y: 0, clearProps: "all" });
      if (block.targetNumber !== undefined) {
        block.numberEl.textContent = `${block.targetNumber}${block.suffix || ""}`;
      } else if (block.staticValue) {
        block.numberEl.textContent = block.staticValue;
      }
    });
    return () => {};
  }

  const isRtl = document.documentElement.dir === "rtl";
  const leftX = isRtl ? 45 : -45;
  const rightX = isRtl ? -45 : 45;

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

    // Box 1 (Left Entrance)
    if (statBlocks[0]) {
      tl.fromTo(
        statBlocks[0].card,
        { opacity: 0, x: leftX, y: 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.75, ease: "power3.out" },
        0
      );
    }

    // Box 2 (Upward Entrance from Below)
    if (statBlocks[1]) {
      tl.fromTo(
        statBlocks[1].card,
        { opacity: 0, x: 0, y: 45 },
        { opacity: 1, x: 0, y: 0, duration: 0.75, ease: "power3.out" },
        0
      );
    }

    // Box 3 (Right Entrance)
    if (statBlocks[2]) {
      tl.fromTo(
        statBlocks[2].card,
        { opacity: 0, x: rightX, y: 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.75, ease: "power3.out" },
        0
      );
    }

    // Simultaneous synchronized count-up starting at position 0
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
          0
        );
      } else if (block.staticValue) {
        tl.fromTo(
          block.numberEl,
          { opacity: 0, scale: 0.88 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.4)",
          },
          0.05
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