"use client";

import { useEffect, useState } from "react";
import { getCountdown } from "./eventCountdown.mjs";
import styles from "./EventCountdown.module.css";

const LABELS = ["Days", "Hours", "Minutes", "Seconds"];

function FlipDigit({ value }) {
  const [digits, setDigits] = useState({ current: value, previous: value });
  if (digits.current !== value) {
    setDigits({ current: value, previous: digits.current });
  }
  const animate = digits.previous !== "-" && digits.previous !== digits.current;
  return (
    <span className={styles.digit}>
      <span className={styles.number}>{value}</span>
      {animate && (
        <span key={value} className={styles.flip}>
          <span className={styles.top}><span>{digits.previous}</span></span>
          <span className={styles.bottom}><span>{value}</span></span>
        </span>
      )}
    </span>
  );
}

export default function EventCountdown() {
  // Identical server and initial client render; fixed tile geometry reserves space.
  const [countdown, setCountdown] = useState(null);
  useEffect(() => {
    let timer;
    const update = () => {
      setCountdown(getCountdown(Date.now()));
      timer = window.setTimeout(update, 1000 - (Date.now() % 1000));
    };
    const refresh = () => {
      window.clearTimeout(timer);
      update();
    };
    update();
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const values = countdown?.values ?? ["--", "--", "--", "--"];
  const timerLabel = countdown
    ? `${countdown.status}${countdown.phase === "ended" ? "" : `: ${values.map((value, index) => `${Number(value)} ${LABELS[index].toLowerCase()}`).join(", ")}`}`
    : "Loading event countdown";

  return (
    <div className={styles.countdown}>
      <p className={styles.status} aria-hidden="true">{countdown?.status ?? "Event starts in"}</p>
      <div className={styles.clock} role="timer" aria-live="off" aria-label={timerLabel}>
        {values.map((value, index) => (
          <div className={styles.unit} key={LABELS[index]} aria-hidden="true">
            <div className={styles.digits}>
              {Array.from(value, (digit, position) => <FlipDigit key={position} value={digit} />)}
            </div>
            <span className={styles.label}>{LABELS[index]}</span>
          </div>
        ))}
      </div>
      {/* Minute-level and phase announcements avoid speaking every second. */}
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {countdown?.announcement ?? "Loading event countdown"}
      </span>
    </div>
  );
}
