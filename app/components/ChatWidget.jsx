"use client";




import { useState } from "react";




export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! I’m PremBot. Ask me about Prem, his projects, or anything else—I’ll try to be helpful and only mildly sarcastic.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: input }),
});

if (!res.ok) {
  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content:
        "Hey, I’m PremBot. Curious about Prem’s projects, skills, or why he likes clean UI? Ask away.",
    },
  ]);
  setLoading(false);
  return;
}

const data = await res.json();


    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);

    setLoading(false);
  }

  return (
    <>
      {/* Floating Bubble */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full bg-black text-white shadow-xl hover:scale-105 transition"
      >
        💬
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[9999] w-80 rounded-xl bg-[#0f0f0f] text-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="font-semibold">PremBot</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "user"
                    ? "text-right text-gray-300"
                    : "text-left text-white"
                }
              >
                <p className="inline-block bg-white/10 rounded-lg px-3 py-2">
                  {msg.content}
                </p>
              </div>
            ))}
            {loading && (
              <p className="text-gray-400 text-xs">PremBot is thinking…</p>
            )}
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
              className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 text-sm outline-none"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-white text-black px-3 rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
