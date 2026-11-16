"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 150, suffix: "k", label: "Members" },
  { target: 75, suffix: "", label: "Products Launched" },
  { target: 1949, suffix: "", label: "Since Year" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".counter").forEach((el) => {
        const target = Number(el.dataset.target || 0);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.val));
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="p-0">
      <div className="grid grid-cols-3 border-y border-line text-center max-md:grid-cols-1">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-5 py-[70px] ${i > 0 ? "border-l border-line max-md:border-l-0 max-md:border-t" : ""}`}
          >
            <div className="font-display text-[clamp(4.5rem,10vw,9rem)] leading-none">
              <span className="counter" data-target={s.target}>
                0
              </span>
              {s.suffix}
            </div>
            <p className="mt-2 text-[0.8rem] uppercase tracking-[0.2em] text-grey">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
