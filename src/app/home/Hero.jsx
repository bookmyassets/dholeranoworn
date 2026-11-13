"use client";

import Image from "next/image";
import { useRef } from "react";
import heroimg from "@/assets/bgImg.webp";
import HeroRegistrationForm from "@/app/components/HeroRegistrationForm";
import EventCountdown from "@/app/components/EventCountdown";

export default function Hero() {
  const heroRef = useRef(null);
  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    heroRef.current?.style.setProperty("--pointer-x", pointerX.toFixed(3));
    heroRef.current?.style.setProperty("--pointer-y", pointerY.toFixed(3));
  };

  const resetPointerPosition = () => {
    heroRef.current?.style.setProperty("--pointer-x", "0");
    heroRef.current?.style.setProperty("--pointer-y", "0");
  };

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerPosition}
      className="relative isolate min-h-screen w-full overflow-hidden bg-ink text-[var(--color-base)]"
      style={{ "--pointer-x": 0, "--pointer-y": 0 }}
    >
      <div
        className="absolute -inset-[3%] transition-transform duration-300 ease-out motion-reduce:!transform-none"
        style={{
          transform:
            "translate3d(calc(var(--pointer-x) * -10px), calc(var(--pointer-y) * -10px), 0)",
        }}
      >
        <Image
          src={heroimg}
          alt=""
          fill
          className="scale-105 object-cover"
          priority
          sizes="106vw"
        />
      </div>

      <div className="absolute inset-0 bg-ink/80" />

      <div className="hero-layout relative z-10 mx-auto grid min-h-screen w-full max-w-[90rem] grid-cols-1 items-center px-[clamp(1rem,0.5rem+4vw,4rem)] pt-[clamp(8rem,6rem+4vw,10rem)] pb-[clamp(3rem,2rem+4vw,6rem)]">
        <div className="min-w-0">
          <h1 className="max-w-[18ch] font-heading text-[length:var(--fs-h1)] leading-[1.08] font-bold tracking-[-0.04em] text-balance">
            Dholera Investor Event in Gurgaon
          </h1>
          <p className="mt-[clamp(1rem,0.75rem+0.8vw,1.5rem)] max-w-[36ch] font-body text-[length:var(--fs-lead)] leading-relaxed font-medium text-pretty">
            Understand Dholera Before You Invest.
          </p>

          <div className="mt-[clamp(2rem,1.25rem+2.5vw,4rem)]">
            <EventCountdown />

          </div>
        </div>
        <HeroRegistrationForm />
      </div>
    </section>
  );
}
