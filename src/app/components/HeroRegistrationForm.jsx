"use client";

import { useState } from "react";
import { FiArrowRight, FiCalendar, FiPhone, FiUser } from "react-icons/fi";

export default function HeroRegistrationForm() {

  return (
    <section
      id="hero-registration"
      aria-labelledby="hero-registration-title"
      className="hero-registration"
    >
      <div className="hero-registration-heading">
        <span className="hero-registration-icon" aria-hidden="true">
          <FiCalendar />
        </span>
        <div>
          <h2 id="hero-registration-title">Reserve Your Spot</h2>
          <p>Share your details and our team will contact you.</p>
        </div>
      </div>

      <div className="hero-registration-rule" aria-hidden="true" />

      <form onChange={() => setPreviewMessage("")}>
        <div className="hero-registration-field">
          <label htmlFor="hero-full-name">Full Name</label>
          <div className="hero-registration-input">
            <FiUser aria-hidden="true" />
            <input
              id="hero-full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              pattern=".*\S.*"
              title="Please enter your full name."
              maxLength={100}
              required
            />
          </div>
        </div>

        <div className="hero-registration-field">
          <label htmlFor="hero-mobile-number">Mobile Number</label>
          <div className="hero-registration-input">
            <span className="hero-registration-prefix" aria-label="India, country code plus 91">
              <FiPhone aria-hidden="true" />
              +91
            </span>
            <input
              id="hero-mobile-number"
              name="mobileNumber"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="Enter your mobile number"
              aria-describedby="hero-mobile-hint"
              pattern="[0-9]{10}"
              title="Please enter a 10-digit mobile number without the country code."
              maxLength={10}
              required
            />
          </div>
        </div>

        <button type="submit" className="hero-registration-submit">
          Submit <FiArrowRight aria-hidden="true" />
        </button>
        
      </form>
    </section>
  );
}
