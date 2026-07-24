"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import heroimg from "@/assets/bgImg.webp";
import cityCentreImage from "@/assets/abcd.png";
import solarPanelIcon from "@/assets/icons/solar-panel.png";
import chipIcon from "@/assets/icons/chip.png";
import freight from "@/assets/icons/train-cargo.png"
import airport from "@/assets/icons/airplane.png"
import { PopupFormButton } from "@/app/components/Form";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";

const EVENT_DATE = "2026-08-08T00:00:00+05:30";
const EMPTY_COUNTDOWN = {
  days: "--",
  hours: "--",
  minutes: "--",
  seconds: "--",
};

function getTimeLeft() {
  const distance = Math.max(new Date(EVENT_DATE).getTime() - Date.now(), 0);

  return {
    days: String(Math.floor(distance / 86_400_000)).padStart(2, "0"),
    hours: String(Math.floor((distance / 3_600_000) % 24)).padStart(2, "0"),
    minutes: String(Math.floor((distance / 60_000) % 60)).padStart(2, "0"),
    seconds: String(Math.floor((distance / 1_000) % 60)).padStart(2, "0"),
  };
}

export default function Hero() {
  const heroRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(EMPTY_COUNTDOWN);

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(getTimeLeft());

    updateCountdown();
    const countdownInterval = window.setInterval(updateCountdown, 1_000);

    return () => window.clearInterval(countdownInterval);
  }, []);

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX =
      ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const pointerY =
      ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    heroRef.current?.style.setProperty("--pointer-x", pointerX.toFixed(3));
    heroRef.current?.style.setProperty("--pointer-y", pointerY.toFixed(3));
  };

  const resetPointerPosition = () => {
    heroRef.current?.style.setProperty("--pointer-x", "0");
    heroRef.current?.style.setProperty("--pointer-y", "0");
  };

  const countdownItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

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

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[90rem] items-center gap-[clamp(2.5rem,1rem+4vw,6rem)] px-[clamp(1rem,0.5rem+4vw,4rem)] pt-[clamp(8rem,7rem+4vw,11rem)] pb-[clamp(3rem,2rem+4vw,7rem)] lg:grid-cols-[1.2fr_0.8fr]">
        <div className="max-w-[52rem]">
          <h1 className="max-w-[12ch] font-heading text-[length:var(--fs-h1)] py-4 md:py-0 leading-18 font-bold tracking-[-0.04em]">
            Dholera <br /> Now or Never
          </h1>

          <div className="mt-[clamp(1rem,0.75rem+0.8vw,1.5rem)] flex flex-wrap items-center gap-[clamp(0.625rem,0.5rem+0.4vw,1rem)]">
            <time
              dateTime="2026-08-08"
              className="inline-flex min-h-[clamp(2.5rem,2.25rem+0.6vw,2.875rem)] items-center gap-[clamp(0.5rem,0.4rem+0.3vw,0.75rem)] rounded-full bg-accent px-[clamp(1rem,0.8rem+0.6vw,1.375rem)] py-[clamp(0.5rem,0.4rem+0.25vw,0.625rem)] font-special text-[length:var(--fs-special)] tracking-[0.12em] text-base uppercase"
            >
              <FaCalendarDays aria-hidden="true" className="shrink-0" />
              <span>08 August 2026</span>
            </time>

            <p className="inline-flex min-h-[clamp(2.5rem,2.25rem+0.6vw,2.875rem)] items-center gap-[clamp(0.5rem,0.4rem+0.3vw,0.75rem)] rounded-full bg-accent px-[clamp(1rem,0.8rem+0.6vw,1.375rem)] py-[clamp(0.5rem,0.4rem+0.25vw,0.625rem)] font-special text-[length:var(--fs-p-special)] tracking-[0.12em] text-base uppercase">
              <FaLocationDot aria-hidden="true" className="shrink-0" />
              <span>Location</span>
            </p>
          </div>

          <div className="mt-[clamp(2rem,1.25rem+2.5vw,4rem)]">
            <p className="mb-[clamp(1rem,0.75rem+1vw,1.5rem)] font-special text-[length:var(--fs-p-special)] tracking-[0.08em] uppercase">
              Event begins in
            </p>

            <div
              className="grid max-w-[40rem] gap-[clamp(0.75rem,0.4rem+1.2vw,1.5rem)] grid-cols-4"
              aria-label="Countdown to 8 August 2026"
              role="timer"
            >
              {countdownItems.map(({ label, value }) => (
                <div
                  key={label}
                  className="relative flex aspect-square w-[clamp(5.5rem,9vw,7.5rem)] flex-col items-center justify-center rounded-full border-[clamp(0.2rem,0.15rem+0.15vw,0.3rem)] border-accent bg-ink after:absolute after:-top-[clamp(0.25rem,0.15rem+0.3vw,0.5rem)] after:left-1/2 after:h-[clamp(0.6rem,0.45rem+0.3vw,0.85rem)] after:w-[clamp(0.6rem,0.45rem+0.3vw,0.85rem)] after:-translate-x-1/2 after:rounded-full after:bg-accent"
                >
                  <span className="font-special text-[clamp(1.4rem,1rem+1.4vw,2.25rem)] leading-none">
                    {value}
                  </span>
                  <span className="mt-[clamp(0.25rem,0.15rem+0.25vw,0.5rem)] font-body text-[clamp(0.675rem,0.63rem+0.18vw,0.8rem)] font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <PopupFormButton className="mt-[clamp(1.75rem,1.25rem+1.6vw,3rem)] inline-flex min-h-[clamp(2.75rem,2.4rem+1vw,3.5rem)] items-center justify-center rounded-full border border-accent bg-accent px-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] font-special text-[length:var(--fs-special)] text-[var(--color-base)] transition-colors hover:bg-base hover:text-accent focus-visible:bg-base focus-visible:text-accent">
              Reserve a Free Seat
            </PopupFormButton>
          </div>
        </div>

        <div className="relative mx-auto -mb-[clamp(3rem,2rem+4vw,7rem)] h-[clamp(29rem,48vw,46rem)] w-full max-w-[34rem] self-end hidden md:block">
          <div
            className="absolute inset-x-[clamp(2rem,1rem+4vw,5rem)] bottom-0 transition-transform duration-200 ease-out motion-reduce:!transform-none"
            style={{
              transform:
                "translate3d(calc(var(--pointer-x) * 24px), calc(var(--pointer-y) * 24px), 0)",
            }}
          >
            <div className="overflow-hidden shadow-2xl">
              <Image
                src={cityCentreImage}
                alt="Dholera City Centre development"
                className="h-auto w-full rounded-[clamp(1.2rem,0.8rem+1.2vw,2.5rem)]"
                sizes="(min-width: 1024px) 28vw, 70vw"
              />
            </div>
          </div>

          <div
            className="absolute top-[15%] left-0 z-10 transition-transform duration-200 ease-out motion-reduce:!transform-none"
            style={{
              transform:
                "translate3d(calc(var(--pointer-x) * -36px), calc(var(--pointer-y) * -36px), 0)",
            }}
          >
            <div className="flex items-center gap-[clamp(0.5rem,0.35rem+0.4vw,0.75rem)] rounded-full border border-accent bg-base p-[clamp(0.4rem,0.3rem+0.25vw,0.6rem)] pr-[clamp(0.85rem,0.65rem+0.6vw,1.25rem)] shadow-2xl">
              <span className="flex h-[clamp(2.75rem,4vw,3.5rem)] w-[clamp(2.75rem,4vw,3.5rem)] shrink-0 items-center justify-center rounded-full bg-accent">
                <Image
                  src={solarPanelIcon}
                  alt=""
                  className="h-[58%] w-[58%] object-contain invert"
                />
              </span>
              <span className="font-special text-[length:var(--fs-special)] whitespace-nowrap text-ink">
                Green Energy
              </span>
            </div>
          </div>

          <div
            className="absolute top-[42%] right-0 z-10 transition-transform duration-200 ease-out motion-reduce:!transform-none"
            style={{
              transform:
                "translate3d(calc(var(--pointer-x) * 42px), calc(var(--pointer-y) * 42px), 0)",
            }}
          >
            <div className="flex items-center gap-[clamp(0.5rem,0.35rem+0.4vw,0.75rem)] rounded-full border border-accent bg-base p-[clamp(0.4rem,0.3rem+0.25vw,0.6rem)] pr-[clamp(0.85rem,0.65rem+0.6vw,1.25rem)] shadow-2xl">
              <span className="flex h-[clamp(2.75rem,4vw,3.5rem)] w-[clamp(2.75rem,4vw,3.5rem)] shrink-0 items-center justify-center rounded-full bg-accent">
                <Image
                  src={chipIcon}
                  alt=""
                  className="h-[58%] w-[58%] object-contain invert"
                />
              </span>
              <span className="font-special text-[length:var(--fs-special)] whitespace-nowrap text-ink">
                Semiconductor
              </span>
            </div>
          </div>

          <div
            className="absolute bottom-[34%] left-0 z-10 transition-transform duration-200 ease-out motion-reduce:!transform-none"
            style={{
              transform:
                "translate3d(calc(var(--pointer-x) * -46px), calc(var(--pointer-y) * -46px), 0)",
            }}
          >
            <div className="flex items-center gap-[clamp(0.5rem,0.35rem+0.4vw,0.75rem)] rounded-full border border-accent bg-base p-[clamp(0.4rem,0.3rem+0.25vw,0.6rem)] pr-[clamp(0.85rem,0.65rem+0.6vw,1.25rem)] shadow-2xl">
              <span
                aria-hidden="true"
                className="flex h-[clamp(2.75rem,4vw,3.5rem)] w-[clamp(2.75rem,4vw,3.5rem)] shrink-0 items-center justify-center rounded-full bg-accent font-special text-[clamp(0.75rem,0.68rem+0.25vw,0.95rem)] text-[var(--color-base)]"
              >
                <Image
                  src={freight}
                  alt=""
                  className="h-[58%] w-[58%] object-contain invert"
                />
              </span>
              <span className="font-special text-[length:var(--fs-special)] whitespace-nowrap text-ink">
                Freight Corridor
              </span>
            </div>
          </div>
          <div
            className="absolute right-0 bottom-[8%] transition-transform duration-200 ease-out motion-reduce:!transform-none"
            style={{
              transform:
                "translate3d(calc(var(--pointer-x) * 42px), calc(var(--pointer-y) * 42px), 0)",
            }}
          >
             <div className="flex items-center gap-[clamp(0.5rem,0.35rem+0.4vw,0.75rem)] rounded-full border border-accent bg-base p-[clamp(0.4rem,0.3rem+0.25vw,0.6rem)] pr-[clamp(0.85rem,0.65rem+0.6vw,1.25rem)] shadow-2xl">
              <span className="flex h-[clamp(2.75rem,4vw,3.5rem)] w-[clamp(2.75rem,4vw,3.5rem)] shrink-0 items-center justify-center rounded-full bg-accent">
                <Image
                  src={airport}
                  alt=""
                  className="h-[58%] w-[58%] object-contain invert"
                />
              </span>
              <span className="font-special text-[length:var(--fs-special)] whitespace-nowrap text-ink">
                International Airport
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
