export function trackConfirmedRegistration() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "event_registration_confirmed",
    form_name: "dholera_event_registration",
  });
}

export function trackGtmEvent(eventName, parameters = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ...parameters, event: eventName });
}
