
"use client";

import { useEffect, useState, type CSSProperties } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const documentHeight =
          document.documentElement.scrollHeight;

        const scrollableHeight =
          documentHeight - window.innerHeight;

        const nextProgress =
          scrollableHeight > 0
            ? window.scrollY / scrollableHeight
            : 0;

        setProgress(Math.min(1, Math.max(0, nextProgress)));
        ticking = false;
      });
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const progressStyle = {
    "--scroll-progress": progress,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className="nleta-scroll-progress"
      style={progressStyle}
    />
  );
}
