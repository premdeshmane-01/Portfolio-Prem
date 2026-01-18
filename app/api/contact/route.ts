import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message, company, timestamp, token } = await req.json();

    // 1. Honeypot check (bot detected via hidden field)
    if (company) {
      // Return fake success so bots don't know they failed
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. CLOUDFLARE TURNSTILE VERIFICATION
    if (!token) {
      return NextResponse.json({ error: "Captcha verification missing" }, { status: 400 });
    }

    const secretKey = process.env.CLOUDFLARE_SECRET_KEY;

    if (!secretKey) {
        console.error("ERROR: Missing CLOUDFLARE_SECRET_KEY in .env file");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    // Optional: Pass the user's IP if available, but often hard in serverless/edge
    // formData.append("remoteip", ip); 

    const turnstileRes = await fetch(verifyUrl, {
      method: "POST",
      body: formData,
    });

    const turnstileData = await turnstileRes.json();

    if (!turnstileData.success) {
      console.error("Captcha verification failed:", turnstileData);
      return NextResponse.json(
        { error: "Captcha verification failed. Please try again." },
        { status: 400 }
      );
    }

    // 3. Send Email (Only if captcha passes)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `
--------------------------------------------------
NEW PORTFOLIO INQUIRY
--------------------------------------------------
Name: ${name}
Email: ${email}
Time: ${timestamp}

Message:
${message}
--------------------------------------------------
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}