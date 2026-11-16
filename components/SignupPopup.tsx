"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Errors = { name?: string; email?: string; age?: string };

export default function SignupPopup({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const formViewRef = useRef<HTMLDivElement>(null);
  const successViewRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const prevOpen = useRef(false);

  const [values, setValues] = useState({ name: "", email: "", age: "" });
  const [errors, setErrors] = useState<Errors>({});

  const handleClose = useCallback(() => {
    const modal = modalRef.current;
    if (!modal) return;
    gsap.to(modal, {
      opacity: 0,
      y: 30,
      scale: 0.96,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        onClose();
        gsap.set(modal, { clearProps: "all" });
        setTimeout(() => {
          setValues({ name: "", email: "", age: "" });
          setErrors({});
          if (formViewRef.current) {
            formViewRef.current.style.display = "block";
            formViewRef.current.style.opacity = "1";
          }
          if (successViewRef.current) {
            successViewRef.current.style.display = "none";
          }
        }, 50);
      },
    });
  }, [onClose]);

  useEffect(() => {
    if (open && !prevOpen.current) {
      const modal = modalRef.current;
      if (modal) {
        gsap.fromTo(
          modal,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
        );
        setTimeout(() => nameRef.current?.focus(), 400);
      }
    }
    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);
  const validate = () => {
    const next: Errors = {};
    const name = values.name.trim();
    const email = values.email.trim();
    const ageNum = Number(values.age);
    if (name.length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 120)
      next.age = "Please enter an age between 1 and 120.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      if (modalRef.current) {
        gsap.fromTo(modalRef.current, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1, .3)" });
      }
      return;
    }
    const data = {
      name: values.name.trim(),
      email: values.email.trim(),
      age: Number(values.age),
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error("Could not send form data:", err);
    }

    setValues({ name: "", email: "", age: "" });
    if (formViewRef.current && successViewRef.current) {
      gsap.to(formViewRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (formViewRef.current) formViewRef.current.style.display = "none";
          if (successViewRef.current) {
            successViewRef.current.style.display = "block";
            gsap.fromTo(successViewRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
          }
        },
      });
    }

    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5 backdrop-blur-[6px]"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        className="relative w-full max-w-[460px] border border-white bg-black px-10 py-12 max-sm:px-6"
      >
        <button
          className="absolute right-4 top-3 bg-transparent text-[2rem] leading-none text-white hover:text-grey"
          onClick={handleClose}
          aria-label="Close"
          type="button"
        >
          &times;
        </button>

        <div ref={formViewRef}>
          <p className="eyebrow">Adiclub Membership</p>
          <h2 id="modalTitle" className="mb-2.5 font-display text-[3.2rem] font-normal leading-[0.95]">
            Get 500 Points
          </h2>
          <p className="mb-[30px] text-[0.9rem] text-grey">
            Tell us a little about you and we will be in touch.
          </p>
          <form onSubmit={onSubmit} noValidate>
            <div className="mb-[22px]">
              <label
                htmlFor="name"
                className="mb-2 block text-[0.68rem] uppercase tracking-[0.2em] text-grey"
              >
                Full name
              </label>
              <input
                ref={nameRef}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                value={values.name}
                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                className={`w-full border-b bg-transparent py-2.5 text-base text-white outline-none transition-colors placeholder:text-grey/60 focus:border-white ${
                  errors.name ? "border-[#ff6b6b]" : "border-line"
                }`}
              />
              <span className="mt-1.5 block min-h-4 text-[0.75rem] text-[#ff6b6b]">{errors.name}</span>
            </div>
            <div className="mb-[22px]">
              <label
                htmlFor="email"
                className="mb-2 block text-[0.68rem] uppercase tracking-[0.2em] text-grey"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                className={`w-full border-b bg-transparent py-2.5 text-base text-white outline-none transition-colors placeholder:text-grey/60 focus:border-white ${
                  errors.email ? "border-[#ff6b6b]" : "border-line"
                }`}
              />
              <span className="mt-1.5 block min-h-4 text-[0.75rem] text-[#ff6b6b]">{errors.email}</span>
            </div>
            <div className="mb-[22px]">
              <label
                htmlFor="age"
                className="mb-2 block text-[0.68rem] uppercase tracking-[0.2em] text-grey"
              >
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min={1}
                max={120}
                placeholder="25"
                value={values.age}
                onChange={(e) => setValues((v) => ({ ...v, age: e.target.value }))}
                className={`w-full border-b bg-transparent py-2.5 text-base text-white outline-none transition-colors placeholder:text-grey/60 focus:border-white ${
                  errors.age ? "border-[#ff6b6b]" : "border-line"
                }`}
              />
              <span className="mt-1.5 block min-h-4 text-[0.75rem] text-[#ff6b6b]">{errors.age}</span>
            </div>
            <button type="submit" className="btn solid mt-2 w-full py-[18px]">
              Submit
            </button>
          </form>
        </div>

        <div ref={successViewRef} className="py-5 text-center" style={{ display: "none" }}>
          <p className="eyebrow">Welcome</p>
          <h2 className="mb-3.5 font-display text-[3.2rem] font-normal leading-[0.95]">You&apos;re In</h2>
          <p className="text-[0.9rem] text-grey">Check your inbox for your welcome points.</p>
        </div>
      </div>
    </div>
  );
}
