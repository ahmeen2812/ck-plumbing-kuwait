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

  const triggers: ScrollTrigger[] = [];

  const mainTrigger = ScrollTrigger.create({
    trigger: sectionEl,
    start: "top 82%",
    once: true,
    onEnter: () => {
      gsap.fromTo(
        statBlocks.map((b) => b.card),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );

      statBlocks.forEach((block) => {
        if (block.targetNumber !== undefined) {
          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: block.targetNumber,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              block.numberEl.textContent = `${Math.floor(counterObj.val)}${block.suffix || ""}`;
            },
            onComplete: () => {
              block.numberEl.textContent = `${block.targetNumber}${block.suffix || ""}`;
            },
          });
        } else if (block.staticValue) {
          gsap.fromTo(
            block.numberEl,
            { opacity: 0, scale: 0.94 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.2)",
              clearProps: "all",
            }
          );
        }
      });
    },
  });

  triggers.push(mainTrigger);

  return () => {
    triggers.forEach((t) => t.kill());
  };
}