// src/components/ScrollingName.tsx
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";

type Props = {
  text: string;
  /** pixels per second (default: 40) */
  speed?: number;
  className?: string;
};

export default function ScrollingName({ text, speed = 40, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scrollNeeded, setScrollNeeded] = useState(false);
  const [overflow, setOverflow] = useState(0);

  // Measure text overflow
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const measure = () => {
      const wrapWidth = wrap.clientWidth;
      const textWidth = inner.scrollWidth;
      const overflowPx = Math.max(0, textWidth - wrapWidth);
      const needsScroll = overflowPx > 2; // 2px threshold

      setOverflow(overflowPx);
      setScrollNeeded(needsScroll);

      // Center text if no scroll needed
      wrap.style.justifyContent = needsScroll ? "flex-start" : "center";
      inner.style.willChange = needsScroll ? 'transform' : 'auto';
      if (!needsScroll) inner.style.transform = "translate3d(0,0,0)";
    };

    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    ro.observe(inner);

    // Measure after fonts load
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(measure));
    }
    measure();

    return () => ro.disconnect();
  }, [text]);

  // Ping-pong animation (scroll left ↔ right)
  useEffect(() => {
    if (!scrollNeeded || overflow <= 0) return;

    const inner = innerRef.current;
    if (!inner) return;

    // Note: Ignoring prefers-reduced-motion for name scrolling
    // as it's informational, not decorative

    // Dynamic speed based on overflow (longer names scroll faster)
    const baseSpeed = 25;   // Minimum speed for short names
    const maxSpeed = 70;    // Maximum speed for very long names
    const scaleFactor = 0.15; // How quickly speed increases with length
    const dynamicSpeed = Math.min(maxSpeed, baseSpeed + overflow * scaleFactor);

    let raf = 0;
    let last = performance.now();
    let x = 0;
    let dir = -1; // Start scrolling left

    const step = (now: number) => {
      const dt = (now - last) / 1000; // Delta time in seconds
      last = now;

      // Move text with dynamic speed
      x += dir * dynamicSpeed * dt;

      // Bounce at end (reached max left)
      if (x < -overflow) {
        x = -overflow;
        dir = +1; // Reverse to right
      }

      // Bounce at start (reached max right)
      if (x > 0) {
        x = 0;
        dir = -1; // Reverse to left
      }

      inner.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame((n) => {
      last = n;
      step(n);
    });

    return () => cancelAnimationFrame(raf);
  }, [scrollNeeded, overflow]);

  return (
    <div ref={wrapRef} className={`scrolling-name ${className}`} title={text} aria-label={text}>
      <div ref={innerRef} className="scrolling-name__inner">{text}</div>
    </div>
  );
}
