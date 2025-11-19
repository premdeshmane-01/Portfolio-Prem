import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "@/lib/systemPrompt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. HARDCODE YOUR KEY HERE (Keep the quote marks!)
    const apiKey = AIzaSyAJh0qYuFePySUHYvoOysIIDjZvrmPOml0; 

    // 2. Initialize Google AI
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 3. Use the standard model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const body = await req.json();
    const { messages } = body;
    const userMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Who are you?" }],
        },
        {
          role: "model",
          parts: [{ text: "I am the AI persona of Premsagar Deshmane." }],
        },
      ],
    });

    const result = await chat.sendMessage(`${systemPrompt}\n\nUser: ${userMessage}`);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ reply: "I am updating my servers. Please try again in a moment." }, { status: 500 });
  }
}