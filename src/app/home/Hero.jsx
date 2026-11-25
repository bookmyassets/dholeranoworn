"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import heroimg from "@/assets/bgImg.webp";
import mobileHeroimg from "@/assets/bgImg-mobile.webp";
import HeroRegistrationForm from "@/app/components/HeroRegistrationForm";
import EventCountdown, { useEventCountdown } from "@/app/components/EventCountdown";
import { getEventSchedule } from "@/app/components/eventCountdown.mjs";
import { FiCalendar, FiClock } from "react-icons/fi";
import styles from "./Hero.module.css";

const { dates, timings } = getEventSchedule();

function HeroEventSchedule() {
  const countdown = useEventCountdown();

  return (
    <>
      <div className={styles.countdown}>
        <EventCountdown countdown={countdown} />
      </div>

      {countdown && countdown.phase !== "ended" && (
        <div className={styles.schedule} role="group" aria-label="Event dates and timings">
          <div className={styles.detail}>
            <span className={styles.icon}><FiCalendar aria-hidden="true" /></span>
            <dl className={styles.detailText}>
              <dt>Event dates</dt>
              <dd className={styles.value}>
                {dates.map(({ date, label }, index) => (
                  <Fragment key={date}>
                    {index > 0 && (index === dates.length - 1 ? " & " : ", ")}
                    <time dateTime={date}>{label}</time>
                  </Fragment>
                ))}
              </dd>
            </dl>
          </div>
          <div className={styles.detail}>
            <span className={styles.icon}><FiClock aria-hidden="true" /></span>
            <dl className={styles.detailText}>
              <dt>Event timings</dt>
              {timings.map(({ date, label, range }) => (
                <dd key={`${date ?? ""}-${range}`} className={styles.value}>
                  {label && <><time dateTime={date}>{label}</time>{": "}</>}
                  <span className={styles.timeRange}>{range}</span>
                </dd>
              ))}
            </dl>
          </div>
        </div>
      )}
    </>
  );
}

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
        <picture>
          {/* One small portrait request on mobile; no competing desktop preload. */}
          <source
            media="(max-width: 47.999rem)"
            srcSet={`${mobileHeroimg.src} ${mobileHeroimg.width}w`}
            sizes="106vw"
          />
          <Image
            src={heroimg}
            alt=""
            fill
            className="scale-105 object-cover"
            loading="eager"
            fetchPriority="high"
            sizes="106vw"
          />
        </picture>
      </div>

      <div className="absolute inset-0 bg-ink/80" />

      <div className="hero-layout relative z-10 mx-auto grid min-h-screen w-full max-w-[90rem] grid-cols-1 items-center px-[clamp(1rem,0.5rem+4vw,4rem)] pt-[clamp(8rem,6rem+4vw,10rem)] pb-[clamp(3rem,2rem+4vw,6rem)]">
        <div className={`min-w-0 ${styles.content}`}>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>Dholera's biggest</span>{" "}
            <span className={styles.titleLine}>investor meetup in <span className="text-accent">Gurgaon</span></span>
          </h1>
          <p className={styles.subtitle}>
            Understand Dholera Before You Invest
          </p>

          <HeroEventSchedule />
        </div>
        <HeroRegistrationForm />
      </div>
    </section>
  );
}
