"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Linkedin, Github, Check, Copy, ArrowRight } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string; // honeypot
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
  token?: string;
};

type StatusState = { ok: boolean; msg: string } | null;

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    company: "",
  });

  const [token, setToken] = useState<string>("");
  const turnstileRef = useRef<any>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const validate = () => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    if (!token) e.token = "Please complete the verification check";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((s) => ({ ...s, [field]: e.target.value }));
    
    if (field !== "company") {
       setErrors((prev) => ({ 
         ...prev, 
         [field as keyof FormErrors]: undefined 
       }));
    }
    setStatus(null);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          company: form.company,
          token: token,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      setForm({ name: "", email: "", message: "", company: "" });
      setToken("");
      turnstileRef.current?.reset();
      
      setStatus({ ok: true, msg: "Message sent! I'll be in touch." });
      setTimeout(() => setStatus(null), 5000);
    } catch (err: any) {
      setStatus({ ok: false, msg: err.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("premdeshmane01@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section 
      id="contact" 
      className="relative z-10 bg-[#DEDEDE] py-12 md:py-20 px-4 md:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block space-y-10"
          >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-black/5 backdrop-blur-md mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/70">
                  Contact
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-medium text-black tracking-tight leading-[1.1] mb-6">
                Ready to build <br />
                <span className="text-gray-400 font-light italic">the future?</span>
              </h2>

              <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                I’m currently looking for <span className="font-semibold text-black">internships</span> and <span className="font-semibold text-black">collaborations</span>. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="space-y-10">
               <div className="group">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Email</p>
                  <button 
                    type="button" 
                    onClick={copyEmail}
                    className="flex items-center gap-4 text-xl md:text-2xl font-medium text-black hover:text-emerald-600 transition-colors text-left"
                  >
                    premdeshmane01@gmail.com
                    <div className="relative w-9 h-9 flex items-center justify-center">
                        <AnimatePresence mode='wait'>
                          {emailCopied ? (
                            <motion.div 
                              key="check"
                              initial={{ scale: 0, opacity: 0 }} 
                              animate={{ scale: 1, opacity: 1 }} 
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute inset-0 flex items-center justify-center p-2 bg-emerald-100 text-emerald-600 rounded-full"
                            >
                              <Check size={16} />
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="copy"
                              initial={{ scale: 0, opacity: 0 }} 
                              animate={{ scale: 1, opacity: 1 }} 
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute inset-0 flex items-center justify-center p-2 bg-gray-100 text-gray-500 rounded-full group-hover:bg-black group-hover:text-white transition-colors"
                            >
                              <Copy size={16} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                    </div>
                  </button>
               </div>
               
               <div>
                 <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Location</p>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-black/60">
                        <MapPin size={18} />
                    </div>
                    <span className="text-lg md:text-xl font-medium text-black">Maharashtra, India</span>
                 </div>
               </div>

               <div>
                 <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 ml-1">Socials</p>
                 <div className="flex gap-3">
                    <SocialBtn href="https://linkedin.com/in/prem-deshmane01" icon={Linkedin} />
                    <SocialBtn href="https://github.com/premdeshmane-01" icon={Github} />
                 </div>
               </div>
              </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-black/[0.03] border border-black/5"
          >
             <div className="lg:hidden mb-6 text-center">
                <h2 className="text-2xl font-bold text-black mb-2">Get in touch</h2>
                <p className="text-sm text-gray-500">Drop a message and I'll get back to you.</p>
             </div>

             <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-5">
                <input type="text" name="company" value={form.company} onChange={handleChange("company")} className="hidden" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Name</label>
                    <input 
                      value={form.name} 
                      onChange={handleChange("name")} 
                      className={`w-full px-4 py-3 bg-gray-50 border ${errors.name ? "border-red-400 bg-red-50" : "border-gray-100 focus:border-black focus:bg-white"} rounded-xl outline-none transition-all duration-300 placeholder:text-gray-400`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-[10px] text-red-500 ml-1 font-medium">{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email</label>
                    <input 
                      value={form.email} 
                      onChange={handleChange("email")} 
                      className={`w-full px-4 py-3 bg-gray-50 border ${errors.email ? "border-red-400 bg-red-50" : "border-gray-100 focus:border-black focus:bg-white"} rounded-xl outline-none transition-all duration-300 placeholder:text-gray-400`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-[10px] text-red-500 ml-1 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Message</label>
                  <textarea 
                    rows={4}
                    value={form.message} 
                    onChange={handleChange("message")} 
                    className={`w-full px-4 py-3 bg-gray-50 border ${errors.message ? "border-red-400 bg-red-50" : "border-gray-100 focus:border-black focus:bg-white"} rounded-xl outline-none transition-all duration-300 resize-none placeholder:text-gray-400`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-[10px] text-red-500 ml-1 font-medium">{errors.message}</p>}
                </div>

                {/* TURNSTILE WIDGET UPDATED */}
                <div className="w-full overflow-hidden">
                    <Turnstile 
                       ref={turnstileRef}
                       siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || ""} // 👈 This links to your .env file
                       onSuccess={(token) => {
                           setToken(token);
                           setErrors((prev) => ({ ...prev, token: undefined }));
                       }}
                       onError={() => setErrors((prev) => ({ ...prev, token: "Verification failed" }))}
                       onExpire={() => setToken("")}
                       className="w-full"
                    />
                    {errors.token && <p className="text-[10px] text-red-500 ml-1 font-medium mt-1">{errors.token}</p>}
                </div>

                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="group w-full py-4 bg-black text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:bg-black shadow-lg shadow-black/10 hover:shadow-emerald-500/20"
                >
                   {loading ? (
                     <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   ) : (
                     <>
                       Send Message <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </>
                   )}
                </button>

                <AnimatePresence>
                  {status && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`text-center text-sm font-medium ${status.ok ? "text-emerald-600" : "text-red-500"}`}
                    >
                      {status.msg}
                    </motion.div>
                  )}
                </AnimatePresence>
             </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function SocialBtn({ href, icon: Icon }: { href: string, icon: any }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
    >
      <Icon size={20} />
    </a>
  );
}