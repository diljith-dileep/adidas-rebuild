"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".hero-bg-img", { scale: 1.25, duration: 2.6, ease: "power2.out" })
        .from(
          "nav .font-display, nav .md\\:flex a, nav .nav-cta",
          { opacity: 0, y: -20, duration: 0.9, stagger: 0.1 },
          "-=2.2"
        )
        .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.8 }, "-=1.4")
        .from(".hero-line span", { yPercent: 110, duration: 1.2, stagger: 0.12 }, "-=0.6")
        .from(
          ".hero-text, .hero-actions .btn",
          { opacity: 0, y: 30, duration: 0.9, stagger: 0.12 },
          "-=0.7"
        )
        .from(".scroll-hint", { opacity: 0, duration: 1 }, "-=0.5");

      gsap.to(".hero-bg-wrap", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={rootRef}
      className="hero relative flex min-h-[640px] h-screen flex-col justify-center overflow-hidden px-[5vw]"
    >
      <div className="hero-bg-wrap absolute inset-x-0 -inset-y-[10%] z-0">
        <Image
          src="https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/40dc4676a3b74a258e0dfef79e5f9b1c_9366/BADBO_1.0_Grey_LC5290_01_00_standard.jpg"
          alt="BADBO 1.0 Grey"
          fill
          priority
          sizes="100vw"
          className="hero-bg-img object-cover grayscale contrast-[1.1] brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 from-[10%] to-black/20 to-[70%]" />
      </div>

      <div className="relative z-10 max-w-[900px]">
        <p className="hero-eyebrow eyebrow">New Season · Sport Keeps Us Fit</p>
        <h1 className="font-display text-[clamp(5rem,16vw,15rem)] font-normal leading-[0.85] tracking-[0.01em]">
          <span className="hero-line block overflow-hidden">
            <span className="inline-block">Move</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="inline-block">Beyond</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="inline-block">Limits</span>
          </span>
        </h1>
        <p className="hero-text mt-7 max-w-[460px] text-base text-[#c8c8c8]">
          Performance footwear and apparel built for training, running and everything in between.
          Black. White. No compromise.
        </p>
        <div className="hero-actions mt-10 flex flex-wrap gap-4">
          <a href="#products" className="btn solid">
            Shop Now
          </a>
          <a href="#features" className="btn">
            Explore
          </a>
        </div>
      </div>
      <div className="scroll-hint absolute bottom-[8vh] right-[5vw] z-10 text-[0.7rem] tracking-[0.3em] text-grey">
        SCROLL
      </div>
    </header>
  );
}
