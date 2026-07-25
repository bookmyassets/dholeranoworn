import { NextResponse } from "next/server";

const TELECRM_ENTERPRISE_ID =
  process.env.TELECRM_ENTERPRISE_ID || "67a30ac2989f94384137c2ff";

function normalizePhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

export async function POST(request) {
  try {
    const { fullName, mobileNumber, source } = await request.json();
    const name = fullName?.trim();
    const phone = normalizePhone(mobileNumber || "");

    if (!name || !/^\d{10,15}$/.test(phone)) {
      return NextResponse.json(
        { error: "Please enter valid contact details." },
        { status: 400 },
      );
    }

    const apiKey =
      process.env.TELECRM_API_KEY ||
      process.env.NEXT_PUBLIC_TELECRM_API_KEY;

    if (!apiKey) {
      console.error("TeleCRM API key is not configured.");
      return NextResponse.json(
        { error: "Lead service is not configured." },
        { status: 503 },
      );
    }

    const response = await fetch(
      `https://next-api.telecrm.in/enterprise/${TELECRM_ENTERPRISE_ID}/autoupdatelead`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            name,
            phone,
            source: source || "Dholera NoN",
          },
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const responseText = await response.text();
      console.error(
        `TeleCRM submission failed with status ${response.status}:`,
        responseText,
      );
      return NextResponse.json(
        { error: "Unable to submit the form." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Unable to submit the form." },
      { status: 500 },
    );
  }
}
