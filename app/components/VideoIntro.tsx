// components/ContactSection.tsx
"use client";

import React, { useState } from "react";

type FormState = { name: string; email: string; message: string };

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email.trim())) e.email = "Please enter a valid email";
    }
    if (!form.message.trim()) e.message = "Please enter a message";
    else if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((s) => ({ ...s, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
    setStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // parse body safely
      let body;
      try {
        body = await res.json();
      } catch (parseErr) {
        body = null;
      }

      if (!res.ok) {
        // Show detailed server message if present
        const serverMsg = body?.error || body?.message || "Failed to send message";
        // If validation details present, format them
        const details = body?.details ? ` — ${JSON.stringify(body.details)}` : "";
        console.error("Contact API error:", res.status, body);
        throw new Error(serverMsg + details);
      }

      setForm({ name: "", email: "", message: "" });
      setStatus({ ok: true, msg: body?.message || "Message sent — thank you! I’ll reply soon." });
    } catch (err: any) {
      console.error("Send error:", err);
      setStatus({ ok: false, msg: err?.message || "Something went wrong. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-left">
        <h2 className="text-4xl font-bold mb-6 text-white">Get In Touch</h2>

        <form onSubmit={handleSubmit} className="bg-slate-900/60 p-6 rounded-2xl border border-white/10">
          <div className="grid gap-4">
            <label className="flex flex-col">
              <span className="text-sm text-white/80 mb-2">Name</span>
              <input
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Your name"
                className={`w-full rounded-md px-4 py-3 bg-white/5 border ${errors.name ? "border-rose-400" : "border-white/10"} text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400`}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <span id="name-error" className="text-xs text-rose-400 mt-1">{errors.name}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-white/80 mb-2">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="your.email@example.com"
                className={`w-full rounded-md px-4 py-3 bg-white/5 border ${errors.email ? "border-rose-400" : "border-white/10"} text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400`}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <span id="email-error" className="text-xs text-rose-400 mt-1">{errors.email}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-white/80 mb-2">Message</span>
              <textarea
                value={form.message}
                onChange={handleChange("message")}
                placeholder="Your message here..."
                rows={5}
                className={`w-full rounded-md px-4 py-3 bg-white/5 border ${errors.message ? "border-rose-400" : "border-white/10"} text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400`}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && <span id="message-error" className="text-xs text-rose-400 mt-1">{errors.message}</span>}
            </label>

            <div className="flex items-center gap-4 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white rounded-md font-semibold transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <div role="status" className={`text-sm ${status.ok ? "text-emerald-300" : "text-rose-300"}`}>
                  {status.msg}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
