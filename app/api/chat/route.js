export const runtime = "nodejs";

export async function POST(req) {
  // If running on Vercel (production)
  if (process.env.VERCEL) {
    return new Response(
      JSON.stringify({
        reply:
          "PremBot runs locally for now. The full AI version is available during demos and development.",
      }),
      { status: 200 }
    );
  }

  // Local development with Ollama
  try {
    const { message } = await req.json();

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: `
You are PremBot, the official assistant on Prem Deshmane’s portfolio website.

Rules:
- Answer about Prem using resume facts only
- Be concise (3–5 lines max)
- Never invent achievements
- Friendly, lightly witty tone

User: ${message}
PremBot:
        `,
        stream: false,
      }),
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({ reply: data.response }),
      { status: 200 }
    );
  } catch {
    return new Response(
      JSON.stringify({
        reply:
          "Local AI is not responding. Make sure Ollama is running.",
      }),
      { status: 200 }
    );
  }
}
