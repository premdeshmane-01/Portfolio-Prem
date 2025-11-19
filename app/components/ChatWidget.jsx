"use client";
import { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Premsagar's AI. Ask me about his skills or projects! 🚀" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans text-gray-900">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white w-80 h-96 rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden"
          >
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <span className="font-bold text-sm">Premsagar AI</span>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`p-3 rounded-lg text-sm max-w-[85%] ${msg.role === "user" ? "bg-blue-600 text-white ml-auto" : "bg-white border border-gray-200 mr-auto"}`}>
                  {msg.content}
                </div>
              ))}
              {isLoading && <div className="text-xs text-gray-400 ml-2">Thinking...</div>}
            </div>
            <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask me..." 
                className="flex-1 text-sm outline-none"
              />
              <button onClick={sendMessage} className="bg-blue-600 text-white p-2 rounded-full"><Send size={16} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700">
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}