"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPaused(preference.matches);
    apply();
    preference.addEventListener("change", apply);
    return () => preference.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let visible = true;
    const apply = () => {
      if (paused || document.hidden || !visible) element.pause();
      else element.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; apply(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", apply);
    apply();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", apply); };
  }, [paused]);

  return (
    <>
      <video className="heroVideo" src="/poo-crew-hero.mp4" aria-hidden="true" ref={video} loop muted playsInline preload="metadata" />
      <button className="heroMotion" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
        <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>{paused ? "Play background" : "Pause background"}
      </button>
    </>
  );
}
