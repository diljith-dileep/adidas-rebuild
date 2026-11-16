"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = { onSignupClick: () => void };

export default function CallToAction({ onSignupClick }: Props) {
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
    <section ref={sectionRef} className="px-[5vw] py-[170px] text-center">
      <p className="eyebrow reveal">Adiclub</p>
      <h2 className="display reveal mx-auto text-[clamp(4rem,11vw,11rem)]">Join the Team</h2>
      <p className="reveal mx-auto mt-[26px] max-w-[480px] text-grey">
        Sign up for free and earn 500 points to spend on rewards.
      </p>
      <button className="btn solid reveal mt-11 px-11 py-[18px] text-[0.8rem]" onClick={onSignupClick}>
        Sign Up for Free
      </button>
    </section>
  );
}
