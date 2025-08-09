import React, { useLayoutEffect, useRef, useState, useEffect } from "react";

type Props = {
  text: string;
  speed?: number;      // pixels/seconde
  className?: string;  // ex: "player-name"
};

export default function ScrollingName({ text, speed = 40, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scrollNeeded, setScrollNeeded] = useState(false);

  // Mesures robustes (sans padding)
  useLayoutEffect(() => {
    const wrap = wrapRef.current, inner = innerRef.current;
    if (!wrap || !inner) return;
    const measure = () => {
      const cs = getComputedStyle(wrap);
      const padX = parseFloat(cs.paddingLeft || "0") + parseFloat(cs.paddingRight || "0");
      const w = (wrap.clientWidth || 0) - padX;    // largeur visible
      const t = inner.scrollWidth || 0;            // largeur intrinsèque du texte
      const overflow = Math.max(0, t - w);
      const need = overflow > 1;
      setScrollNeeded(need);
      wrap.style.setProperty("--shift", `${overflow}px`);
      // durée indicative (pas utilisée directement par JS mais utile si tu veux revenir au CSS)
      wrap.style.setProperty("--duration", `${Math.max(overflow / speed, 0.001)}s`);
      inner.classList.toggle("is-scrolling", need);
      const isRight = !!wrap.closest(".name.right"); // ou ton sélecteur actuel côté P2
      wrap.style.justifyContent = need ? (isRight ? "flex-end" : "flex-start") : "center";
    };
    const ro = new ResizeObserver(measure);
    ro.observe(wrap); ro.observe(inner);
    // @ts-ignore
    document.fonts?.ready?.then(() => requestAnimationFrame(measure));
    measure();
    return () => ro.disconnect();
  }, [text, speed]);

  // Animation ping-pong en JS (rAF), uniquement si nécessaire
  useEffect(() => {
    const prefersReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const wrap = wrapRef.current, inner = innerRef.current;
    if (!wrap || !inner || prefersReduce) return;

    let raf = 0;
    let last = performance.now();
    let x = 0;          // position courante (px)
    let dir = -1;       // -1 = va vers la gauche, +1 = vers la droite

    const step = (now: number) => {
      const shift = parseFloat(getComputedStyle(wrap).getPropertyValue("--shift")) || 0;
      if (!scrollNeeded || shift <= 0) {
        // pas de scroll -> rester centré
        inner.style.transform = "translate3d(0,0,0)";
      } else {
        const dt = (now - last) / 1000;
        last = now;
        x += dir * speed * dt;
        if (x < -shift) { x = -shift; dir = +1; }
        if (x > 0)      { x = 0;      dir = -1; }
        inner.style.transform = `translate3d(${x}px,0,0)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame((n) => { last = n; step(n); });
    return () => cancelAnimationFrame(raf);
  }, [scrollNeeded, speed, text]);

  return (
    <div ref={wrapRef} className={`scrolling-name ${className}`} title={text} aria-label={text}>
      <div ref={innerRef} className="scrolling-name__inner">{text}</div>
    </div>
  );
}