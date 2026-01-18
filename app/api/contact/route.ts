import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message, company, timestamp, token } = await req.json();

    // --- DEBUGGING LOGS (Check your VS Code Terminal when you click Send) ---
    console.log("--- CONTACT API DEBUG START ---");
    console.log("1. Email User exists:", !!process.env.EMAIL_USER);
    console.log("2. Secret Key exists:", !!process.env.CLOUDFLARE_SECRET_KEY);
    console.log("3. Secret Key Value (First 5 chars):", process.env.CLOUDFLARE_SECRET_KEY?.substring(0, 5));
    console.log("---------------------------------");
    // -----------------------------------------------------------------------

    // 1. Honeypot check
    if (company) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. CHECK ENV VAR
    const secretKey = process.env.CLOUDFLARE_SECRET_KEY;

    if (!secretKey) {
        // THIS IS THE ERROR YOU ARE SEEING
        console.error("CRITICAL ERROR: CLOUDFLARE_SECRET_KEY is undefined in process.env");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // 3. CLOUDFLARE VERIFICATION
    if (!token) {
      return NextResponse.json({ error: "Captcha verification missing" }, { status: 400 });
    }

    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);

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

    // 4. Send Email
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
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}