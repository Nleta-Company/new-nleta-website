"use client";

import { useEffect, useRef, useState } from "react";

type StatsCounterProps = {
  value: number;
  showPlus?: boolean;
  duration?: number;
};

export default function StatsCounter({
  value,
  showPlus = true,
  duration = 1400,
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasStarted.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setCount(value);
      hasStarted.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted.current) return;
        hasStarted.current = true;
        observer.disconnect();

        const startTime = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          // Ease-out cubic: quick start, smooth finish.
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * easedProgress));

          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count.toLocaleString("en-IN")}
      {showPlus ? "+" : ""}
    </span>
  );
}
