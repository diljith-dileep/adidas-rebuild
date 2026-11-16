"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Products from "@/components/Products";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import SignupPopup from "@/components/SignupPopup";

export default function Home() {
  const [popupOpen, setPopupOpen] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissedRef.current) setPopupOpen(true);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  const openPopup = useCallback(() => {
    dismissedRef.current = false;
    setPopupOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    dismissedRef.current = true;
    setPopupOpen(false);
  }, []);

  return (
    <main>
      <Navbar onJoinClick={openPopup} />
      <Hero />
      <Marquee />
      <Products />
      <Features />
      <Stats />
      <CallToAction onSignupClick={openPopup} />
      <Footer />
      <SignupPopup open={popupOpen} onClose={closePopup} />
    </main>
  );
}
