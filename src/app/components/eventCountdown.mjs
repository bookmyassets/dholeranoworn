export const SESSIONS = [
  { start: Date.parse("2026-11-21T09:00:00+05:30"), end: Date.parse("2026-11-21T20:00:00+05:30") },
  { start: Date.parse("2026-11-22T09:00:00+05:30"), end: Date.parse("2026-11-22T20:00:00+05:30") },
];

export function getCountdown(now) {
  const active = SESSIONS.find(({ start, end }) => now >= start && now < end);
  const next = SESSIONS.find(({ start }) => now < start);
  const phase = active ? "live" : next ? (now < SESSIONS[0].start ? "upcoming" : "break") : "ended";
  const target = active?.end ?? next?.start ?? null;
  const remaining = target === null ? 0 : Math.max(0, Math.ceil((target - now) / 1000));
  const status = {
    upcoming: "Event starts in",
    live: "Session live · ends in",
    break: "Next session starts in",
    ended: "Event has ended",
  }[phase];
  const values = [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
  const announcement = `${status}${phase === "ended" ? "." : `: ${values[0]} days, ${values[1]} hours, ${values[2]} minutes${remaining < 60 ? ", less than one minute" : ""}.`}`;
  return { phase, status, remaining, announcement, values: values.map((value) => String(value).padStart(2, "0")) };
}
