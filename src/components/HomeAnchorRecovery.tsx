"use client";

import { useEffect } from "react";

const mobileAliases: Record<string, string> = {
  "ss-p2": "about", "ss-p3": "about", "original-home-story": "about",
  "what-we-do": "services", "our-value": "why-us", "experience-value": "why-us",
  "value-shift": "why-us", spaces: "services",
};
const resolveAnchor = (id: string) => window.matchMedia("(max-width: 768px), (max-width: 1024px) and (max-height: 520px)").matches ? mobileAliases[id] || id : id;

/** Keep incoming section links aligned while the imported homepage initializes. */
export function HomeAnchorRecovery() {
  useEffect(() => {
    const follow = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!link || link.target === '_blank') return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      let id: string;
      try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
      const resolved = resolveAnchor(id);
      if (resolved === id) return;
      const target = document.getElementById(resolved);
      if (!target) return;
      event.preventDefault();
      // Leave the imported drawer's click handler free to close its menu.
      requestAnimationFrame(() => {
        history.replaceState(null, '', `#${resolved}`);
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
    };
    document.addEventListener('click', follow);
    return () => document.removeEventListener('click', follow);
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;
    let id: string;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(resolveAnchor(id));
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
