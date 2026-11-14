"use client";

import Link from "next/link";
import { trackGtmEvent } from "../lib/gtm-events.mjs";

export default function TrackedCtaLink({
  children,
  gtmCtaName,
  gtmLocation,
  gtmDestination,
  onClick,
  ...props
}) {
  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    trackGtmEvent("cta_click", {
      cta_name: gtmCtaName,
      cta_location: gtmLocation,
      cta_destination: gtmDestination,
    });
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
