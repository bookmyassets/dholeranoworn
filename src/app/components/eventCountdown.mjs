export const SESSIONS = [
  { start: Date.parse("2026-11-21T09:00:00+05:30"), end: Date.parse("2026-11-21T20:00:00+05:30") },
  { start: Date.parse("2026-11-22T09:00:00+05:30"), end: Date.parse("2026-11-22T20:00:00+05:30") },
];

const eventTimeZone = { timeZone: "Asia/Kolkata" };
const dateParts = new Intl.DateTimeFormat("en-GB", {
  ...eventTimeZone, year: "numeric", month: "2-digit", day: "2-digit",
});
const dateLabel = new Intl.DateTimeFormat("en-GB", { ...eventTimeZone, dateStyle: "long" });
const timeLabel = new Intl.DateTimeFormat("en-US", {
  ...eventTimeZone, hour: "numeric", minute: "2-digit", hour12: true,
});

export function getEventSchedule(sessions = SESSIONS) {
  const datesByDay = new Map();
  const timings = sessions.map(({ start, end }) => {
    const parts = Object.fromEntries(dateParts.formatToParts(start).map(({ type, value }) => [type, value]));
    const date = `${parts.year}-${parts.month}-${parts.day}`;
    const label = dateLabel.format(start);
    datesByDay.set(date, label);
    return { date, label, range: `${timeLabel.format(start)} – ${timeLabel.format(end)}` };
  });
  const dates = Array.from(datesByDay, ([date, label]) => ({ date, label }));
  const [firstTiming] = timings;

  return {
    dates: dates.map(({ date, label }, index) => ({
      date,
      label: date.slice(0, 7) === dates[index + 1]?.date.slice(0, 7) ? label.split(" ")[0] : label,
    })),
    timings: firstTiming && timings.every(({ range }) => range === firstTiming.range)
      ? [{ range: firstTiming.range }]
      : timings,
  };
}

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
