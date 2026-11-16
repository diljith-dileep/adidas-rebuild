"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const items = ["Run Faster", "Train Harder", "Go Further", "Feel Fast"];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  const renderItems = (keyPrefix: string) =>
    items.flatMap((text, i) => [
      <span key={`${keyPrefix}-t-${i}`}>{text}</span>,
      <span key={`${keyPrefix}-d-${i}`} className="text-grey">
        /
      </span>,
    ]);

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-line py-[22px]">
      <div
        ref={trackRef}
        className="inline-block will-change-transform font-display text-[2.6rem] tracking-[0.05em] [&>span]:mr-10"
      >
        {renderItems("a")}
        {renderItems("b")}
      </div>
    </div>
  );
}
