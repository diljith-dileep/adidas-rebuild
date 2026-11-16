"use client";

type NavbarProps = {
  onJoinClick: () => void;
};

export default function Navbar({ onJoinClick }: NavbarProps) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-black/85 to-transparent px-[5vw] py-5">
      <a href="#" className="font-display text-[2.2rem] leading-none tracking-[0.08em]">
        ADIDAS
      </a>
      <div className="hidden items-center gap-8 text-[0.8rem] uppercase tracking-[0.12em] md:flex">
        <a href="#products" className="opacity-75 transition-opacity hover:opacity-100">
          Shop
        </a>
        <a href="#features" className="opacity-75 transition-opacity hover:opacity-100">
          Performance
        </a>
        <a href="#stats" className="opacity-75 transition-opacity hover:opacity-100">
          Community
        </a>
      </div>
      <div className="flex items-center gap-4">
        <button className="btn nav-cta" onClick={onJoinClick}>
          Join Now
        </button>
      </div>
    </nav>
  );
}
