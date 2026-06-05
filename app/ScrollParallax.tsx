"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ScrollParallax() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      return;
    }

    let frame = 0;
    let elements: HTMLElement[] = [];
    let revealObserver: IntersectionObserver | undefined;

    const collectElements = () => {
      elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".pageShell > section > *:not(.heroVideo)",
        ),
      );

      elements.forEach((element, index) => {
        element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 180)}ms`);
        revealObserver?.observe(element);
      });
    };

    const updateParallax = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || 1;
      const viewportCenter = viewportHeight / 2;

      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = clamp(
          (elementCenter - viewportCenter) / viewportHeight,
          -1,
          1,
        );
        const horizontalDirection = index % 2 === 0 ? 1 : -1;
        const x = distanceFromCenter * horizontalDirection * 8;
        const y = distanceFromCenter * 26;
        const scale = 1 - Math.abs(distanceFromCenter) * 0.012;

        element.style.setProperty("--motion-x", `${x.toFixed(2)}px`);
        element.style.setProperty("--motion-y", `${y.toFixed(2)}px`);
        element.style.setProperty("--motion-scale", scale.toFixed(4));
      });
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateParallax);
    };

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      },
    );

    document.documentElement.classList.add("motionReady");
    collectElements();
    requestUpdate();

    const mutationObserver = new MutationObserver(() => {
      collectElements();
      requestUpdate();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      revealObserver?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      document.documentElement.classList.remove("motionReady");
      elements.forEach((element) => {
        element.classList.remove("is-visible");
        element.style.removeProperty("--motion-x");
        element.style.removeProperty("--motion-y");
        element.style.removeProperty("--motion-scale");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
