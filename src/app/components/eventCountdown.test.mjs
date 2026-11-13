import test from "node:test";
import assert from "node:assert/strict";
import { getCountdown, SESSIONS } from "./eventCountdown.mjs";

const at = (time) => getCountdown(Date.parse(time));

test("IST sessions correspond to 03:30–14:30 UTC on both days", () => {
  assert.deepEqual(SESSIONS.map(({ start, end }) => [new Date(start).toISOString(), new Date(end).toISOString()]), [
    ["2026-11-21T03:30:00.000Z", "2026-11-21T14:30:00.000Z"],
    ["2026-11-22T03:30:00.000Z", "2026-11-22T14:30:00.000Z"],
  ]);
});

test("countdown rolls days, hours, minutes and seconds without going negative", () => {
  assert.deepEqual(at("2026-11-20T09:00:00+05:30").values, ["01", "00", "00", "00"]);
  assert.deepEqual(at("2026-11-20T09:00:01+05:30").values, ["00", "23", "59", "59"]);
  assert.deepEqual(at("2026-11-21T08:59:00+05:30").values, ["00", "00", "01", "00"]);
  assert.equal(at("2026-11-21T08:59:59.999+05:30").remaining, 1);
});

for (const day of [21, 22]) {
  test(`November ${day}: first instant of session is live through the final millisecond`, () => {
    const start = at(`2026-11-${day}T09:00:00+05:30`);
    assert.equal(start.phase, "live");
    assert.deepEqual(start.values, ["00", "11", "00", "00"]);
    const last = at(`2026-11-${day}T19:59:59.999+05:30`);
    assert.equal(last.phase, "live");
    assert.equal(last.remaining, 1);
  });
}

test("overnight break starts at 8 PM and targets 9 AM the next day", () => {
  const evening = at("2026-11-21T20:00:00+05:30");
  assert.equal(evening.phase, "break");
  assert.equal(evening.status, "Next session starts in");
  assert.deepEqual(evening.values, ["00", "13", "00", "00"]);
  assert.deepEqual(at("2026-11-22T00:00:00+05:30").values, ["00", "09", "00", "00"]);
  const morning = at("2026-11-22T08:59:59+05:30");
  assert.equal(morning.phase, "break");
  assert.equal(morning.remaining, 1);
});

test("event ends exactly at 8 PM on day two, and stays at zero", () => {
  for (const time of ["2026-11-22T20:00:00+05:30", "2026-12-01T00:00:00Z"]) {
    const result = at(time);
    assert.equal(result.phase, "ended");
    assert.deepEqual(result.values, ["00", "00", "00", "00"]);
    assert.equal(result.announcement, "Event has ended.");
  }
});

test("equivalent visitor timezones give identical countdowns", () => {
  assert.deepEqual(at("2026-11-21T03:00:00Z"), at("2026-11-20T22:00:00-05:00"));
});

test("announcements stay quiet between minute changes and report phase transitions", () => {
  assert.equal(at("2026-11-20T09:00:01+05:30").announcement, at("2026-11-20T09:00:45+05:30").announcement);
  assert.match(at("2026-11-21T08:59:59+05:30").announcement, /less than one minute/);
  assert.match(at("2026-11-21T09:00:00+05:30").announcement, /Session live/);
});
