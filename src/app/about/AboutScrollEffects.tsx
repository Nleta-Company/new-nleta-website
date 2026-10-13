"use client";

import { useEffect } from "react";

export default function AboutScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const progress = document.createElement("div");
    progress.className = "nleta-scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.appendChild(progress);

    const updateProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const value = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      progress.style.setProperty(
        "--scroll-progress",
        String(Math.min(1, Math.max(0, value)))
      );
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    const selectors = [
      ".about-section",
      ".about-section h2",
      ".about-section h3",
      ".about-section p",
      ".about-section article",
      ".about-section ul",
      ".about-section li",
      ".about-section table",
      ".about-section thead th",
      ".about-section tbody tr",
      ".about-section a",
      ".about-section button",
    ].join(",");

    const targets = [
      ...new Set(
        document.querySelectorAll<HTMLElement>(selectors)
      ),
    ];

    let observer: IntersectionObserver | undefined;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("is-visible"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -30px 0px",
        }
      );

      targets.forEach((element) => observer?.observe(element));
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      progress.remove();
    };
  }, []);

  return null;
}