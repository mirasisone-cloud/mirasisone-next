"use client";

import { useEffect } from "react";

/** A short entrance, once per item. Content stays readable if motion or JS is unavailable. */
export function HomeMotion() {
  useEffect(() => {
    const page = document.getElementById("home-page");
    if (!page || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches) continue;
        const animation = entry.target.animate(
          [{ opacity: .35, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 600, easing: "cubic-bezier(.2,.65,.3,1)" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: .12 });

    page.querySelectorAll(".refined-heading, .why-editorial-head, .why-editorial-card, .svc-new-card, .news-card, .mobile-flow li, .about-ceo-img-wrap").forEach(item => observer.observe(item));
    const stopMotion = () => {
      if (!preference.matches) return;
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stopMotion);
      animations.forEach(animation => animation.cancel());
    };
  }, []);
  return null;
}
