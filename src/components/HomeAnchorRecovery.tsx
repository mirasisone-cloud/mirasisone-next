"use client";

import { useEffect } from "react";

/** Keep incoming section links aligned while the imported homepage initializes. */
export function HomeAnchorRecovery() {
  useEffect(() => {
    if (!window.location.hash) return;
    let id: string;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    const page = document.getElementById("home-page");
    if (!target || !page) return;
    let stopped = false;
    let frame = 0;
    const align = () => {
      frame = 0;
      if (stopped) return;
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const delta = target.getBoundingClientRect().top - margin;
      if (Math.abs(delta) > 4) window.scrollTo({ top: window.scrollY + delta, behavior: "instant" });
    };
    const schedule = () => { if (!stopped && !frame) frame = requestAnimationFrame(align); };
    const observer = new ResizeObserver(schedule);
    const stop = () => { stopped = true; observer.disconnect(); cancelAnimationFrame(frame); };
    observer.observe(page);
    const intro = document.getElementById("home-intro");
    if (intro) observer.observe(intro);
    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    events.forEach((event) => window.addEventListener(event, stop, { passive: true, once: true }));
    window.addEventListener("load", schedule, { once: true });
    void document.fonts.ready.then(schedule);
    schedule();
    const timeout = window.setTimeout(stop, 4000);
    return () => {
      stop();
      clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, stop));
      window.removeEventListener("load", schedule);
    };
  }, []);
  return null;
}
