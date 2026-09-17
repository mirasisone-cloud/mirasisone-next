"use client";

import { useEffect, useRef } from "react";
import "./home-intro.css";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ramp = (value: number, start: number, end: number) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

export function HomeIntro() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const compact = window.matchMedia("(max-width: 768px), (max-width: 1024px) and (max-height: 520px)").matches;
      const reduced = preference.matches || window.innerHeight <= 520;
      root.dataset.motion = reduced || compact ? "off" : "on";
      if (reduced || compact) {
        const video = videoRef.current;
        const rect = stage.getBoundingClientRect();
        if (video && (preference.matches || rect.bottom <= 0 || rect.top >= window.innerHeight)) video.pause();
        else if (video?.paused) void video.play().catch(() => {});
        if (firstRef.current) firstRef.current.inert = false;
        return;
      }
      const rect = root.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(1, root.offsetHeight - stage.offsetHeight));
      const firstIn = ramp(progress, .08, .48);
      root.style.setProperty("--film-intro", String(1 - ramp(progress, .02, .14)));
      root.style.setProperty("--film-first", String(firstIn));
      root.style.setProperty("--film-first-y", `${(1 - firstIn) * 90}px`);
      root.style.setProperty("--film-dim", String(.15 * (1 - firstIn)));
      root.style.setProperty("--film-scale", String(1.06 - progress * .06));
      root.style.setProperty("--film-progress", String(progress));
      root.dataset.scene = progress < .14 ? "film" : "message";
      if (firstRef.current) firstRef.current.inert = firstIn < .8;
      const video = videoRef.current;
      if (video && (rect.bottom <= 0 || rect.top >= window.innerHeight)) video.pause();
      else if (video?.paused) void video.play().catch(() => {});
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section id="home-intro" ref={rootRef} data-motion="on" aria-label="MIRASISONEの空間演出">
        <div className="film-stage" ref={stageRef}>
          <div className="film-media">
            <video ref={videoRef} className="film-video" width={1280} height={720} autoPlay muted loop playsInline poster="/top-hero-pm-poster.webp" aria-label="テーブルへのプロジェクションマッピング事例">
              <source src="/top-hero-pm.mp4" type="video/mp4" />
            </video>
            <div className="film-shade" aria-hidden="true" />
          </div>
          <div className="film-opening">
            <p className="film-eyebrow">MIRASISONE — SPATIAL EXPERIENCE STUDIO</p>
          </div>
          <div className="film-panel film-panel-first" ref={firstRef}>
            <p className="film-eyebrow">LIGHT. SPACE. EXPERIENCE.</p>
            <h1><span><em>光</em>で、空間を。</span><span><em>体験</em>で、心を。</span></h1>
            <p className="film-caption">光と映像で、日常の空間を特別な体験へ。</p>
          </div>
          <div className="film-scroll" aria-hidden="true"><span>SCROLL TO EXPLORE</span><span className="film-scroll-line" /></div>
          <div className="film-progress" aria-hidden="true"><span /></div>
        </div>
      </section>
    </>
  );
}
