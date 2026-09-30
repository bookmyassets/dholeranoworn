"use client";

import Image from "next/image";
import { useRef } from "react";
import heroimg from "@/assets/bgImg.webp";
import { PopupFormButton } from "@/app/components/Form";

const countdownItems = [
  { label: "Days", value: "00" },
  { label: "Hours", value: "00" },
  { label: "Minutes", value: "00" },
  { label: "Seconds", value: "00" },
];

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

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[90rem] grid-cols-1 items-center px-[clamp(1rem,0.5rem+4vw,4rem)] pt-[clamp(7rem,6rem+4vw,10rem)] pb-[clamp(3rem,2rem+4vw,6rem)]">
        <div className="max-w-[52rem]">
          <h1 className="max-w-[12ch] font-heading text-[length:var(--fs-h1)] py-2 md:py-0 leading-18 font-bold tracking-[-0.04em]">
            Dholera <br /> Now or Never
          </h1>

          <div className="mt-[clamp(2rem,1.25rem+2.5vw,4rem)]">
            <p className="mb-[clamp(1rem,0.75rem+1vw,1.5rem)] font-special text-[length:var(--fs-p-special)] tracking-[0.08em] uppercase">
              Event countdown
            </p>

            <div
              className="grid max-w-[40rem] grid-cols-4 gap-[clamp(0.75rem,0.4rem+1.2vw,1.5rem)]"
              aria-label="Event countdown"
              role="timer"
            >
              {countdownItems.map(({ label, value }, index) => (
                <div
                  key={label}
                  className="event-clock-item relative flex aspect-square w-[clamp(5.5rem,9vw,7.5rem)] flex-col items-center justify-center rounded-full border-[clamp(0.2rem,0.15rem+0.15vw,0.3rem)] border-accent bg-ink after:absolute after:-top-[clamp(0.25rem,0.15rem+0.3vw,0.5rem)] after:left-1/2 after:h-[clamp(0.6rem,0.45rem+0.3vw,0.85rem)] after:w-[clamp(0.6rem,0.45rem+0.3vw,0.85rem)] after:-translate-x-1/2 after:rounded-full after:bg-accent"
                  style={{ "--clock-index": index }}
                >
                  <span className="event-clock-value font-special text-[clamp(1.4rem,1rem+1.4vw,2.25rem)] leading-none">
                    {value}
                  </span>
                  <span className="mt-[clamp(0.25rem,0.15rem+0.25vw,0.5rem)] font-body text-[clamp(0.675rem,0.63rem+0.18vw,0.8rem)] font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <PopupFormButton className="mt-[clamp(1.75rem,1.25rem+1.6vw,3rem)] inline-flex min-h-[clamp(2.75rem,2.4rem+1vw,3.5rem)] items-center justify-center rounded-full border border-accent bg-accent px-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] font-special text-[length:var(--fs-special)] text-[var(--color-base)] transition-colors hover:bg-base hover:text-accent focus-visible:bg-base focus-visible:text-accent">
              Reserve a Free Seat Today
            </PopupFormButton>
          </div>
        </div>

      </div>
    </section>
  );
}
