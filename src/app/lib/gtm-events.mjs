export function trackGtmEvent(eventName, parameters = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ...parameters, event: eventName });
}
