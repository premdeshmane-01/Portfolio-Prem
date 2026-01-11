'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I can help you learn about Prem's work. Try asking about projects, skills, or experience.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    const newUserMessage: Message = {
      text: userMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          sessionId: sessionId 
        })
      });

      const data = await response.json();

      const botMessage: Message = {
        text: data.reply,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      const errorMessage: Message = {
        text: "Something went wrong. Please try again.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Re-focus input after message is sent
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Minimal Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-5 right-5 z-[9999] transition-all duration-200 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Open chat"
      >
        <div className="bg-white text-zinc-900 p-3.5 rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </button>

      {/* Clean Chat Window */}
      <div
        className={`fixed bottom-5 right-5 z-[9999] w-full max-w-[400px] transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(100vh - 40px)' }}
      >
        <div className="bg-white rounded-lg shadow-2xl border border-zinc-200 overflow-hidden flex flex-col h-[580px] max-h-[calc(100vh-40px)]">
          
          {/* Simple Header */}
          <div className="bg-white border-b border-zinc-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-zinc-900 text-sm">Chat</h3>
                  <p className="text-xs text-zinc-500">Ask me anything</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-2.5 ${
                    message.isUser
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white text-zinc-900 border border-zinc-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.text}
                  </p>
                  <span className={`text-[10px] mt-1 block ${
                    message.isUser ? 'text-zinc-400' : 'text-zinc-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-zinc-200 rounded-lg px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-zinc-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-zinc-900 placeholder-zinc-400 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Clean scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #d4d4d8;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a1a1aa;
        }
      `}</style>
    </>
  );
}