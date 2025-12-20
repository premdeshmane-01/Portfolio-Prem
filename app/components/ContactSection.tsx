"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string; // honeypot
};

type FormErrors = Partial<Omit<FormState, "company">>;
type StatusState = { ok: boolean; msg: string } | null;

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>(null);

  const validate = () => {
    const e: FormErrors = {};

    if (!form.name.trim()) e.name = "Please enter your name";

    if (!form.email.trim()) e.email = "Please enter your email";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email.trim())) e.email = "Please enter a valid email";
    }

    if (!form.message.trim())
      e.message = "Please enter a message";
    else if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((s) => ({ ...s, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      setStatus(null);
    };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          company: form.company, // honeypot
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setForm({
        name: "",
        email: "",
        message: "",
        company: "",
      });

      setStatus({
        ok: true,
        msg: "Message sent successfully! I'll get back to you soon.",
      });

      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus({
        ok: false,
        msg: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-semibold mb-3 text-gray-900">
            Get In Touch
          </h2>
          <p className="text-gray-600">
            Have a project in mind? I'd love to hear from you.
          </p>
        </div>

        {/* Honeypot field (hidden) */}
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange("company")}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              value={form.name}
              onChange={handleChange("name")}
              className={`w-full px-4 py-2.5 border ${
                errors.name ? "border-red-400" : "border-gray-300"
              } rounded-lg focus:ring-1 focus:ring-gray-900`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              value={form.email}
              onChange={handleChange("email")}
              className={`w-full px-4 py-2.5 border ${
                errors.email ? "border-red-400" : "border-gray-300"
              } rounded-lg focus:ring-1 focus:ring-gray-900`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={handleChange("message")}
              className={`w-full px-4 py-2.5 border ${
                errors.message ? "border-red-400" : "border-gray-300"
              } rounded-lg focus:ring-1 focus:ring-gray-900 resize-none`}
              placeholder="Tell me about your project..."
            />
            {errors.message && (
              <p className="text-xs text-red-600 mt-1">{errors.message}</p>
            )}
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <span
                className={`text-sm ${
                  status.ok ? "text-green-600" : "text-red-600"
                }`}
              >
                {status.msg}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
