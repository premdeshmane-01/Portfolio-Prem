import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Your portfolio knowledge base
const PORTFOLIO_CONTEXT = `
You are a helpful AI assistant for Premsagar Deshmane's portfolio. Answer questions about him professionally and concisely.

PERSONAL INFO:
- Name: Premsagar Deshmane
- Role: Computer Engineering Student, Full Stack & AI Engineer
- Education: BE Computer Engineering at SNJB College (SPPU), SGPA: 8.8/10, Graduating: 2027
- Location: Maharashtra, India
- Email: premdeshmane01@gmail.com
- LinkedIn: linkedin.com/in/prem-deshmane01
- GitHub: github.com/premdeshmane-01
- Portfolio: portfolio-prem-4m65.vercel.app
- Phone: +91-9699082017

EXPERIENCE:
1. Syntine Pvt. Ltd. (Jul-Oct 2025) - Frontend Intern
   - Built real-time Inventory Management System (MERN stack)
   - Improved UI load performance by 20%
   - Integrated RESTful APIs and created reusable components
   - Team collaboration and code reviews

2. AICTE × Google (Jul-Sept 2024) - AI/ML Intern
   - Evaluated LLMs (LLaMA, Falcon) across 40+ prompts
   - Built RAG pipeline with LangChain
   - Automated 60% of comparison workflow
   - Improved retrieval relevancy by 25%

PROJECTS:
1. Sundown Studio - Team collaboration, GSAP animations, Locomotive Scroll, 15% better interaction accuracy
2. Lazarev Digital Agency - Led 4-member team, smooth scrolling, interactive UI
3. Sidcup Family Golf - Custom cursor interactions, scroll animations, video integration
4. Real-Time Inventory System - MERN stack, real-time updates, asset tracking

SKILLS:
Frontend: React, Next.js, JavaScript, TypeScript, HTML/CSS, Tailwind, GSAP, Three.js
Backend: Node.js, Express, MongoDB, SQL, Java, Spring Boot
AI/ML: Python (NumPy, Pandas), LLM Evaluation, RAG Pipelines, LangChain
Tools: Git, GitHub

ACHIEVEMENTS:
- Smart India Hackathon (SIH) 2026 - Team Lead, National Level Selection
- 1st Runner-Up - PBL Project Competition 2024
- Core Member - SNJB Code Club

CERTIFICATIONS:
- Web Development Bootcamp (ACKVK)
- AI/ML Virtual Internship (AICTE × Google)
- Google Cloud Engineering Certificate
- AR/VR Application Development (CDAC)

AVAILABILITY:
Open to internships, part-time projects, and full-time roles (post-2027 graduation). Remote work and relocation options available.

RESPONSE GUIDELINES:
- Be concise and professional
- Use bullet points for lists
- Include relevant emojis sparingly
- Always provide contact info when asked
- If you don't know something, suggest contacting Prem directly
- Keep responses under 200 words unless detailed explanation is needed
`;

interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Store conversation history (in production, use Redis or database)
const conversationHistory = new Map<string, ConversationMessage[]>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = (body.message || '').trim();
    const sessionId = body.sessionId || 'default';

    if (!userMessage) {
      return NextResponse.json({ 
        reply: "I didn't catch that. What would you like to know about Prem?" 
      });
    }

    // Get or create conversation history
    let history = conversationHistory.get(sessionId);
    if (!history) {
      history = [
        {
          role: 'system',
          content: PORTFOLIO_CONTEXT
        }
      ];
      conversationHistory.set(sessionId, history);
    }

    // Add user message to history
    history.push({
      role: 'user',
      content: userMessage
    });

    // Keep only last 10 messages to avoid token limits
    if (history.length > 11) { // 1 system + 10 messages
      history = [history[0], ...history.slice(-10)];
      conversationHistory.set(sessionId, history);
    }

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: history,
      model: 'llama-3.3-70b-versatile', // Fast and free
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      stream: false
    });

    const assistantMessage = completion.choices[0]?.message?.content || 
      "I couldn't process that. Please try again!";

    // Add assistant response to history
    history.push({
      role: 'assistant',
      content: assistantMessage
    });

    // Cleanup old sessions (keep last 100)
    if (conversationHistory.size > 100) {
      const firstKey = conversationHistory.keys().next().value;
      if (firstKey) conversationHistory.delete(firstKey);
    }

    return NextResponse.json({ reply: assistantMessage });

  } catch (error: any) {
    console.error('Groq API Error:', error);
    
    // Fallback response
    return NextResponse.json({
      reply: "I'm having trouble connecting right now. Please try asking about Prem's projects, skills, or experience. You can also reach him at premdeshmane01@gmail.com"
    });
  }
}