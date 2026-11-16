"use client";

import Image from "next/image";

export type Product = {
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  alt: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="reveal-card flex flex-col bg-black">
      <div className="group relative aspect-square overflow-hidden bg-[#111]">
        {product.discount && (
          <span className="absolute left-4 top-4 z-10 bg-white px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-black">
            {product.discount}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 25vw"
          className="object-cover grayscale transition duration-[800ms] group-hover:scale-[1.06] group-hover:grayscale-0"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-[22px] pb-7 pt-6">
        <h3 className="font-display text-[1.7rem] font-normal leading-none tracking-[0.03em]">
          {product.name}
        </h3>
        <p className="text-[0.75rem] uppercase tracking-[0.08em] text-grey">{product.category}</p>
        <p className="mt-auto pt-3.5 text-base font-medium">
          {product.price}
          {product.originalPrice && (
            <s className="ml-2 text-[0.85rem] font-normal text-grey">{product.originalPrice}</s>
          )}
          {product.discount && (
            <span className="ml-2 border border-white px-1.5 py-0.5 text-[0.7rem] tracking-[0.08em]">
              {product.discount}
            </span>
          )}
        </p>
        <button className="add mt-3.5 border border-white bg-transparent p-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-black">
          Add to Cart
        </button>
      </div>
    </article>
  );
}
