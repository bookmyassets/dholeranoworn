import { NextResponse } from "next/server";

function normalizePhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const { fullName, mobileNumber, source } = body || {};
    const name = typeof fullName === "string" ? fullName.trim() : "";
    const phone = typeof mobileNumber === "string" ? normalizePhone(mobileNumber) : "";

    if (!name || name.length > 100 || !/^\d{10,15}$/.test(phone)) {
      return NextResponse.json(
        { error: "Please enter valid contact details." },
        { status: 400 },
      );
    }

    const apiKey = process.env.TELECRM_API_KEY;
    const enterpriseId = process.env.TELECRM_ENTERPRISE_ID;

    if (!apiKey || !enterpriseId) {
      console.error("TeleCRM credentials are not configured.");
      return NextResponse.json(
        { error: "Lead service is not configured." },
        { status: 503 },
      );
    }

    const response = await fetch(
      `https://next-api.telecrm.in/enterprise/${encodeURIComponent(enterpriseId)}/autoupdatelead`,
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
            source: typeof source === "string" && source.trim()
              ? source.trim().slice(0, 100)
              : "Dholera NoN",
          },
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(20000),
      },
    );

    if (!response.ok) {
      console.error(`TeleCRM submission failed with status ${response.status}.`);
      return NextResponse.json(
        { error: "Unable to submit the form." },
        { status: 502 },
      );
    }

    const responseText = (await response.text()).trim();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = null;
    }
    const accepted = result
      ? ["Created", "Updated"].includes(result.status) && !result.errorMessage
      : /^(ok|success)$/i.test(responseText);
    if (!accepted) {
      console.error("TeleCRM did not confirm lead acceptance.");
      return NextResponse.json({ error: "Unable to submit the form." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const networkCode = error.cause?.code;
    const timedOut = error.name === "TimeoutError" || error.name === "AbortError";
    console.error("Lead submission error:", JSON.stringify({
      name: error.name,
      code: networkCode,
      connectionCodes: error.cause?.errors?.map((cause) => cause.code),
    }));
    const connectionFailed = error.name === "TypeError" && Boolean(error.cause);
    return NextResponse.json(
      {
        error: timedOut
          ? "The lead service timed out. Please try again shortly."
          : connectionFailed
            ? "Unable to connect to the lead service. Please try again shortly."
            : "Unable to submit the form.",
      },
      { status: timedOut ? 504 : connectionFailed ? 502 : 500 },
    );
  }
}
