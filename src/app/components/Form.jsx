"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getLeadErrorMessage } from "../lib/lead-errors";
import { FiCheck, FiX } from "react-icons/fi";
import styles from "./Form.module.css";

const OPEN_POPUP_EVENT = "open-dholera-popup-form";
const FORM_CONFIG = {
  title: "Reserve Your Seat for the Dholera Investors Meet",
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
      window.removeEventListener("scroll", handleScroll);
      previousFocusRef.current = event.detail?.trigger || document.activeElement;
      setShowThankYou(false);
      setErrorMessage("");
      setIsOpen(true);
    };

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight > 0 && window.scrollY >= scrollableHeight * 0.5) {
        openPopup({});
      }
    };

    window.addEventListener(OPEN_POPUP_EVENT, openPopup);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener(OPEN_POPUP_EVENT, openPopup);
      window.removeEventListener("scroll", handleScroll);
    };
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
    const nextValue = name === "mobileNumber" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setFormData((currentData) => ({ ...currentData, [name]: nextValue }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.mobileNumber.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
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
        signal: AbortSignal.timeout(25000),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== true) {
        throw new Error(result.error || "Error submitting form");
      }

      setFormData({ fullName: "", mobileNumber: "" });
      setShowThankYou(true);
      toast.success("Thank you! Your details have been submitted. Our team will contact you shortly.");

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: FORM_CONFIG.dataLayerEvent });

      successTimerRef.current = window.setTimeout(closePopup, 3_000);
    } catch (error) {
      console.error("Form submission error:", error);
      const message = getLeadErrorMessage(error);
      setErrorMessage(message);
      toast.error(message);
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
    <div className={styles.backdrop} onMouseDown={(event) => {
      if (event.target === event.currentTarget) closePopup();
    }}>
      <div role="dialog" aria-modal="true" aria-labelledby="popup-form-title" className={styles.dialog}>
        <button type="button" onClick={closePopup} aria-label="Close form" className={styles.close}>
          <FiX aria-hidden="true" />
        </button>
        {showThankYou ? (
          <div className={styles.success} aria-live="polite">
            <FiCheck aria-hidden="true" />
            <h2 id="popup-form-title" className={styles.title}>Thank You</h2>
            <p>We will contact you shortly.</p>
          </div>
        ) : (
          <>
            <h2 id="popup-form-title" className={styles.title}>{FORM_CONFIG.title}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              {errorMessage && <p role="alert" className={styles.error}>{errorMessage}</p>}
              <div className={styles.field}>
                <label htmlFor="popup-full-name" className="sr-only">Full name</label>
                <div className={styles.inputGroup}>
                  <input ref={firstInputRef} id="popup-full-name" name="fullName" type="text"
                    autoComplete="name" value={formData.fullName} onChange={handleChange} required
                    placeholder="Full name" />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="popup-mobile-number" className="sr-only">Mobile number</label>
                <div className={styles.inputGroup}>
                  <input id="popup-mobile-number" name="mobileNumber" type="tel" inputMode="numeric"
                    autoComplete="tel-national" value={formData.mobileNumber} onChange={handleChange}
                    maxLength={10} pattern="[0-9]{10}" title="Please enter a 10-digit mobile number without the country code."
                    required placeholder="Mobile number" />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className={styles.submit}>
                {isLoading ? "Submitting..." : "Register Now"}
              </button>
            </form>
            <p className={styles.availability}>Limited seats available</p>
          </>
        )}
      </div>
    </div>
  );
}
