"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";

const OPEN_POPUP_EVENT = "open-dholera-popup-form";
const FORM_CONFIG = {
  title: "Join the Dholera Investors Meet",
  dataLayerEvent: "lead_form",
};

export function PopupFormButton({
  children,
  className = "",
  onClick,
  ...props
}) {
  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    window.dispatchEvent(
      new CustomEvent(OPEN_POPUP_EVENT, {
        detail: { trigger: event.currentTarget },
      }),
    );
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

function getLeadSource() {
  const params = new URLSearchParams(window.location.search);

  if (params.has("twclid") || params.has("paid")) {
    return "Dholera NoN Twitter Ads";
  }

  if (params.has("fbclid")) {
    return params.get("utm_source")?.toLowerCase() === "instagram"
      ? "Dholera NoN Meta IG"
      : "Dholera NoN Meta FB";
  }

  if (params.has("gad_source")) return "Dholera NoN Google Ads";

  return "Dholera NoN";
}

export default function PopupLeadForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const firstInputRef = useRef(null);
  const previousFocusRef = useRef(null);
  const successTimerRef = useRef(null);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    setShowThankYou(false);
    setErrorMessage("");

    window.requestAnimationFrame(() => {
      previousFocusRef.current?.focus?.();
    });
  }, []);

  useEffect(() => {
    const openPopup = (event) => {
      previousFocusRef.current = event.detail?.trigger || document.activeElement;
      setShowThankYou(false);
      setErrorMessage("");
      setIsOpen(true);
    };

    window.addEventListener(OPEN_POPUP_EVENT, openPopup);
    return () => window.removeEventListener(OPEN_POPUP_EVENT, openPopup);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") closePopup();
    };

    document.addEventListener("keydown", handleEscape);
    window.requestAnimationFrame(() => firstInputRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closePopup, isOpen]);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.mobileNumber.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.mobileNumber.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid mobile number.");
      return false;
    }

    return true;
  };

  const submitLead = async () => {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          mobileNumber: formData.mobileNumber,
          source: getLeadSource(),
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Error submitting form");
      }

      setFormData({ fullName: "", mobileNumber: "" });
      setShowThankYou(true);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: FORM_CONFIG.dataLayerEvent });

      successTimerRef.current = window.setTimeout(closePopup, 3_000);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("Unable to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    setIsLoading(true);
    submitLead();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-[clamp(1rem,0.5rem+2vw,2rem)]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-form-title"
        className="relative max-h-[90vh] w-full max-w-[32rem] overflow-y-auto rounded-[clamp(1.25rem,0.9rem+1vw,2rem)] border border-ink bg-base p-[clamp(1.5rem,1rem+2vw,2.75rem)] text-ink"
      >
        <div className="absolute inset-x-0 top-0 h-[clamp(0.3rem,0.2rem+0.25vw,0.5rem)] bg-accent" />

        <button
          type="button"
          onClick={closePopup}
          aria-label="Close form"
          className="absolute top-[clamp(0.75rem,0.6rem+0.5vw,1rem)] right-[clamp(0.75rem,0.6rem+0.5vw,1rem)] flex h-[clamp(2.25rem,2rem+0.75vw,2.75rem)] w-[clamp(2.25rem,2rem+0.75vw,2.75rem)] items-center justify-center rounded-full border border-accent bg-accent font-special text-[clamp(1.25rem,1rem+0.8vw,1.6rem)] leading-none text-[var(--color-base)] transition-colors hover:bg-base hover:text-accent focus-visible:bg-base focus-visible:text-accent"
        >
          ×
        </button>

        {showThankYou ? (
          <div
            className="flex min-h-[clamp(18rem,14rem+15vw,24rem)] flex-col items-center justify-center text-center"
            aria-live="polite"
          >
            <div className="flex h-[clamp(4rem,3rem+3vw,5.5rem)] w-[clamp(4rem,3rem+3vw,5.5rem)] items-center justify-center rounded-full bg-accent font-special text-[clamp(1.75rem,1.25rem+1.5vw,2.5rem)] text-[var(--color-base)]">
              ✓
            </div>
            <h2 className="mt-[clamp(1rem,0.75rem+0.8vw,1.5rem)] font-heading text-[length:var(--fs-h2)] font-bold">
              Thank You
            </h2>
            <p className="mt-[clamp(0.5rem,0.35rem+0.4vw,0.75rem)] font-body text-[length:var(--fs-p-body)]">
              We will contact you shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="pr-[clamp(2.5rem,2rem+2vw,4rem)]">
              <Image
                src={logo}
                alt="Dholera Now or Never"
                className="h-auto w-[clamp(4.5rem,3.5rem+3vw,6.5rem)]"
                priority
              />
             
              <h2
                id="popup-form-title"
                className="mt-[clamp(0.4rem,0.25rem+0.4vw,0.65rem)] font-heading text-[length:var(--fs-h2)] leading-tight font-bold"
              >
                {FORM_CONFIG.title}
              </h2>
              <p className="mt-[clamp(0.6rem,0.4rem+0.5vw,0.9rem)] font-body text-[length:var(--fs-p-body)] leading-relaxed">
                Share your details and our team will get in touch.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-[clamp(1.5rem,1rem+1.5vw,2.5rem)]"
            >
              {errorMessage && (
                <p
                  role="alert"
                  className="mb-[clamp(0.75rem,0.5rem+0.6vw,1rem)] rounded-[clamp(0.5rem,0.4rem+0.3vw,0.75rem)] border border-accent p-[clamp(0.75rem,0.55rem+0.5vw,1rem)] font-body text-[length:var(--fs-p-small)] text-accent"
                >
                  {errorMessage}
                </p>
              )}

              <div className="space-y-[clamp(1rem,0.75rem+0.8vw,1.5rem)]">
                <div>
                  <label
                    htmlFor="popup-full-name"
                    className="mb-[clamp(0.4rem,0.3rem+0.25vw,0.6rem)] block font-body text-[clamp(0.875rem,0.82rem+0.2vw,1rem)] font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    ref={firstInputRef}
                    id="popup-full-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-[clamp(0.5rem,0.4rem+0.3vw,0.75rem)] border border-ink bg-base px-[clamp(0.9rem,0.7rem+0.6vw,1.25rem)] py-[clamp(0.75rem,0.6rem+0.45vw,1rem)] font-body text-[length:var(--fs-body)] outline-none transition-colors placeholder:text-ink focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="popup-mobile-number"
                    className="mb-[clamp(0.4rem,0.3rem+0.25vw,0.6rem)] block font-body text-[clamp(0.875rem,0.82rem+0.2vw,1rem)] font-medium"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="popup-mobile-number"
                    name="mobileNumber"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter your mobile number"
                    className="w-full rounded-[clamp(0.5rem,0.4rem+0.3vw,0.75rem)] border border-ink bg-base px-[clamp(0.9rem,0.7rem+0.6vw,1.25rem)] py-[clamp(0.75rem,0.6rem+0.45vw,1rem)] font-body text-[length:var(--fs-body)] outline-none transition-colors placeholder:text-ink focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-[clamp(1.25rem,0.9rem+1vw,1.75rem)] inline-flex min-h-[clamp(3rem,2.6rem+1vw,3.75rem)] w-full items-center justify-center rounded-full border border-accent bg-accent px-[clamp(1.25rem,1rem+0.8vw,1.75rem)] font-special text-[length:var(--fs-special)] text-[var(--color-base)] transition-colors hover:bg-base hover:text-accent focus-visible:bg-base focus-visible:text-accent disabled:cursor-not-allowed disabled:border-ink disabled:bg-ink"
              >
                {isLoading ? "Submitting…" : "Register For Free"}
              </button>

              <p className="mt-[clamp(0.75rem,0.55rem+0.5vw,1rem)] text-center font-body text-[length:var(--fs-p-small)]">
                Your details are kept private and secure.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
