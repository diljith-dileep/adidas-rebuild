"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  { title: "Train", text: "Gear designed for strength, stability and everyday sessions." },
  { title: "Run", text: "Lightweight cushioning that keeps up with your pace." },
  { title: "Style", text: "Originals and collaborations that move from court to street." },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="px-[5vw] py-[130px] max-md:py-[100px]">
      <div className="grid grid-cols-2 items-center gap-20 max-lg:grid-cols-1 max-lg:gap-[50px]">
        <div className="feature-img reveal group relative aspect-[4/5] overflow-hidden bg-[#111]">
          <Image
            src="https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/13c32c741e43456fa4864d9489fa0772_9366/BADBO_1.1_Low_Brown_LM5057_01_00_standard.jpg"
            alt="BADBO 1.1 Low"
            fill
            sizes="(max-width: 1000px) 100vw, 50vw"
            className="object-cover grayscale contrast-[1.05] transition-transform duration-[1200ms] group-hover:scale-105"
          />
        </div>
        <div>
          <p className="eyebrow reveal">Why Adidas</p>
          <h2 className="display reveal">Built to perform</h2>
          <div className="mt-10 grid">
            {rows.map((row, i) => (
              <div
                key={row.title}
                className={`reveal flex items-baseline justify-between gap-5 py-[26px] max-md:flex-col max-md:items-start ${
                  i === 0 ? "border-t border-line" : "border-t border-line"
                } ${i === rows.length - 1 ? "border-b border-line" : ""}`}
              >
                <h3 className="font-display text-[2rem] font-normal tracking-[0.02em]">{row.title}</h3>
                <p className="max-w-[280px] text-right text-[0.9rem] text-grey max-md:text-left">
                  {row.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
