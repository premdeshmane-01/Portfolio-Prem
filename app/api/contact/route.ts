// app/api/contact/route.ts
import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;

if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
  console.warn("Resend or contact email not configured.");
}

function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const payload = await req.json().catch(() => null);
    if (!payload) return NextResponse.json({ error: "Missing payload" }, { status: 400 });

    const { name, email, message } = payload;
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
      return NextResponse.json({ error: "Server not configured: missing RESEND_API_KEY or CONTACT_TO_EMAIL" }, { status: 500 });
    }

    const html = `
      <div style="font-family: system-ui, -apple-system, Roboto, Helvetica, Arial;">
        <h2>New contact message</h2>
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <hr />
        <div style="white-space:pre-wrap; margin-top:8px;">${escapeHtml(message)}</div>
      </div>
    `;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Website <no-reply@${CONTACT_TO_EMAIL.split("@")[1]}>`,
        to: CONTACT_TO_EMAIL,
        subject: `Website contact — ${name}`,
        html,
      }),
    });

    const body = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      console.error("Resend error:", resp.status, body);
      return NextResponse.json({ error: "Failed to send via Resend", details: body }, { status: 502 });
    }

    return NextResponse.json({ ok: true, message: "Email sent via Resend" });
  } catch (err: any) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
