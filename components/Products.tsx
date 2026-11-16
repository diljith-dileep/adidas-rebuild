"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard, { type Product } from "./ProductCard";

gsap.registerPlugin(ScrollTrigger);

const products: Product[] = [
  {
    name: "Taekwondo Lace Shoes",
    category: "Originals · White",
    price: "₹6,299.50",
    originalPrice: "₹8,999.00",
    discount: "-30%",
    image:
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/fd17d39b6d3d49cb9b2585cdc21a64ee_9366/Taekwondo_Lace_Shoes_White_JS1194_01_standard.jpg",
    alt: "Taekwondo Lace Shoes",
  },
  {
    name: "BADBO 1.1 Low",
    category: "Bad Bunny · Brown",
    price: "₹11,999.00",
    image:
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/13c32c741e43456fa4864d9489fa0772_9366/BADBO_1.1_Low_Brown_LM5057_01_00_standard.jpg",
    alt: "BADBO 1.1 Low Brown",
  },
  {
    name: "BADBO 1.1 Low",
    category: "Bad Bunny · White",
    price: "₹11,999.00",
    image:
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/4387c7d646274aa4b179d7242244fc32_9366/BADBO_1.1_Low_White_LC5466_01_00_standard.jpg",
    alt: "BADBO 1.1 Low White",
  },
  {
    name: "BADBO 1.0",
    category: "Bad Bunny · Grey",
    price: "₹15,999.00",
    image:
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/40dc4676a3b74a258e0dfef79e5f9b1c_9366/BADBO_1.0_Grey_LC5290_01_00_standard.jpg",
    alt: "BADBO 1.0 Grey",
  },
];

export default function Products() {
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
      gsap.utils.toArray<HTMLElement>(".reveal-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          duration: 1,
          delay: (i % 4) * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="px-[5vw] py-[130px] max-md:py-[100px]">
      <div className="mb-[70px] flex flex-wrap items-end justify-between gap-5">
        <h2 className="display reveal">Shop Footwear</h2>
        <p className="reveal max-w-[420px] text-[0.95rem] text-grey">
          Trainers and sneakers engineered for movement, from the court to the street.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-[2px] bg-line max-lg:grid-cols-2 max-md:grid-cols-1">
        {products.map((p, i) => (
          <ProductCard key={`${p.name}-${i}`} product={p} />
        ))}
      </div>
    </section>
  );
}
