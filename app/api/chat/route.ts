import { NextResponse } from 'next/server';

// ===========================
// TYPES
// ===========================
interface ConversationContext {
  lastTopic?: string;
  askedAbout: string[];
  conversationDepth: number;
  userName?: string;
}

interface KnowledgeCategory {
  patterns: RegExp[];
  responses: string[];
  followups?: string[];
  details?: Record<string, string>;
}

// ===========================
// CONVERSATION STATE
// ===========================
const conversationMemory = new Map<string, ConversationContext>();

// ===========================
// KNOWLEDGE BASE
// ===========================
const knowledgeBase: Record<string, KnowledgeCategory> = {
  // GREETINGS
  greeting: {
    patterns: [
      /^(hi|hello|hey|sup|yo|hola|namaste)$/i,
      /^(hi|hello|hey)\s+(there|bot)?$/i,
      /^what'?s up$/i,
      /^good\s+(morning|afternoon|evening)$/i
    ],
    responses: [
      "Hey! 👋 I'm here to tell you about Premsagar - a developer who ships real solutions. What brings you here?",
      "Hello! Ask me about Prem's projects, internships, or tech skills. What interests you?",
      "Hi there! Ready to explore Prem's work in Full Stack Development and AI/ML?"
    ],
    followups: [
      "Looking for something specific?",
      "Are you a recruiter or fellow developer?"
    ]
  },

  // IDENTITY
  identity: {
    patterns: [
      /who\s+(is|are)\s+(you|prem|premsagar)/i,
      /tell\s+me\s+about\s+(yourself|prem|you)/i,
      /(introduce|introduction|profile|bio)/i,
      /your\s+name/i
    ],
    responses: [
      "Premsagar Deshmane - BE Computer Engineering student (8.8 SGPA) specializing in Full Stack Development and AI/ML. He builds systems that solve real problems and moves projects from concept to execution.",
      "Prem bridges Frontend (React/Next.js) and AI (LLMs/Python). Currently at SNJB College, he's worked with companies like Syntine and AICTE, building everything from inventory systems to RAG pipelines.",
      "A developer who takes ownership of technical decisions and ships quality solutions. Prem's worked on real-time systems, AI models, and interactive web experiences."
    ],
    followups: [
      "Want to know about his projects?",
      "Curious about his internship experiences?"
    ]
  },

  // EXPERIENCE
  experience: {
    patterns: [
      /(experience|intern|internship|work|job|company)/i,
      /where\s+.*\s*work/i,
      /syntine|aicte|google/i,
      /(previous|past)\s+role/i
    ],
    responses: [
      "**Syntine Pvt. Ltd.** (Jul-Oct 2025) - Frontend Intern\n• Built real-time Inventory System (MERN)\n• 20% UI performance improvement\n\n**AICTE × Google** (Jul-Sept 2024) - AI/ML Intern\n• Evaluated LLMs (LLaMA, Falcon)\n• Built RAG pipeline with LangChain",
      "Hands-on experience at **Syntine** (web dev, MERN stack, performance optimization) and **AICTE** (AI/ML, LLM evaluation, automation). Real projects with measurable impact."
    ],
    followups: [
      "Want details about Syntine or AICTE?",
      "Interested in the tech stack he used?"
    ],
    details: {
      syntine: "**Syntine** (Jul-Oct 2025):\n• Real-time Inventory Management System (MERN)\n• 20% UI load performance boost\n• RESTful API integration\n• Reusable component architecture\n• Team collaboration & code reviews",
      aicte: "**AICTE × Google** (Jul-Sept 2024):\n• LLM evaluation (LLaMA, Falcon) across 40+ prompts\n• Built RAG pipeline with embeddings & LangChain\n• 60% workflow automation via Python scripts\n• 25% improvement in retrieval relevancy"
    }
  },

  // PROJECTS
  projects: {
    patterns: [
      /(project|built|made|create|develop|portfolio)/i,
      /what\s+.*\s*built/i,
      /show\s+.*\s*work/i,
      /sundown|lazarev|sidcup|inventory/i
    ],
    responses: [
      "**Top Projects:**\n\n🎨 Sundown Studio - GSAP animations, Locomotive Scroll, team collaboration\n🚀 Lazarev Agency - Led 4-member team, smooth scrolling, interactive UI\n⛳ Sidcup Golf - Custom cursor, scroll animations, video integration\n💼 Inventory System - Real-time MERN stack app",
      "From frontend showcases (Sundown, Lazarev, Sidcup) with advanced animations to full-stack systems (Inventory Management). All on GitHub: github.com/premdeshmane-01"
    ],
    followups: [
      "Want details on any specific project?",
      "Interested in the tech challenges solved?"
    ],
    details: {
      sundown: "**Sundown Studio** (Sept 2025):\n• 5-member team collaboration\n• GSAP animations + Locomotive Scroll\n• 15% better interaction accuracy\n• 12% engagement boost\n\nTech: JavaScript, GSAP, Swiper",
      lazarev: "**Lazarev Agency** (Aug 2025):\n• Led 4-member frontend team\n• Smooth scroll with ScrollTrigger\n• Enhanced cross-browser performance\n• Mobile-first responsive design\n\nTech: JavaScript, GSAP, Locomotive Scroll",
      sidcup: "**Sidcup Family Golf** (Apr 2025):\n• Multi-page promotional site\n• Custom cursor interactions\n• GSAP scroll-triggered animations\n• Background video loops\n\nTech: JavaScript, GSAP, ScrollTrigger",
      inventory: "**Inventory System** (Syntine):\n• Full MERN stack\n• Real-time asset tracking\n• RESTful APIs\n• 20% performance improvement\n• Production-ready features"
    }
  },

  // SKILLS
  skills: {
    patterns: [
      /(skill|stack|tech|technology|language|framework)/i,
      /what\s+.*\s*know/i,
      /proficient/i,
      /(react|next|javascript|python|node|java)/i,
      /programming/i
    ],
    responses: [
      "**Tech Stack:**\n\n💻 Frontend: React, Next.js, JavaScript, TypeScript, Tailwind, GSAP\n⚙️ Backend: Node.js, Express, MongoDB, SQL\n🤖 AI/ML: Python (NumPy, Pandas), LLM Evaluation, RAG, LangChain\n🛠️ Tools: Git, GitHub",
      "Full Stack + AI/ML combo:\n• Strong in React ecosystem & modern CSS\n• Backend with Node.js & databases\n• AI work with LLMs, RAG systems, Python\n• Proven through real projects & internships"
    ],
    followups: [
      "Want proficiency levels for specific tech?",
      "Curious about his AI/ML capabilities?"
    ],
    details: {
      frontend: "**Frontend:**\n🎯 React.js, Next.js, TypeScript\n🎨 Tailwind CSS, responsive design\n✨ GSAP, Three.js, Locomotive Scroll\n📱 Mobile-first, cross-browser\n\nProven via multiple production projects.",
      backend: "**Backend:**\n⚡ Node.js, Express.js\n🗄️ MongoDB, SQL\n☕ Java, Spring Boot\n🔌 RESTful API design\n\nBuilt full-stack apps combining these.",
      ai: "**AI/ML:**\n🐍 Python (NumPy, Pandas)\n🤖 LLM evaluation & integration\n🔍 RAG pipelines with LangChain\n📊 Prompt engineering, automation\n\nPractical experience from AICTE internship."
    }
  },

  // EDUCATION
  education: {
    patterns: [
      /(education|college|university|degree|study|student)/i,
      /snjb|sppu/i,
      /(sgpa|cgpa|marks|grade)/i,
      /when\s+.*\s*graduate/i
    ],
    responses: [
      "**BE Computer Engineering** at SNJB College (SPPU)\n• Current SGPA: 8.8/10\n• Graduation: 2027\n• Strong academics + practical experience\n\nPrevious: 84% HSC, 90.2% SSC",
      "Third-year Computer Engineering student at SNJB (NAAC A+). Maintaining 8.8 SGPA while doing internships and projects. Graduates in 2027."
    ]
  },

  // CONTACT
  contact: {
    patterns: [
      /(contact|email|mail|phone|reach|connect|hire)/i,
      /(linkedin|github)/i,
      /how\s+.*\s*contact/i,
      /get\s+in\s+touch/i,
      /(cv|resume)/i
    ],
    responses: [
      "**Connect with Prem:**\n\n📧 premdeshmane01@gmail.com\n🔗 linkedin.com/in/prem-deshmane01\n💻 github.com/premdeshmane-01\n📱 +91-9699082017\n🌐 portfolio-prem-4m65.vercel.app\n\nOpen to opportunities!",
      "Reach out via:\n• Email: premdeshmane01@gmail.com\n• LinkedIn: linkedin.com/in/prem-deshmane01\n• GitHub: github.com/premdeshmane-01\n• Phone: +91-9699082017\n\nBased in Maharashtra, India. Remote-friendly!"
    ]
  },

  // ACHIEVEMENTS
  achievements: {
    patterns: [
      /(achievement|award|win|competition|hackathon)/i,
      /smart\s+india|sih/i,
      /runner\s*up/i
    ],
    responses: [
      "🏆 **Smart India Hackathon 2026** - Team Lead, National Level Selection\n🥈 **1st Runner-Up** - PBL Project Competition 2024\n👥 **Core Member** - SNJB Code Club\n\nLeadership + Technical Excellence!",
      "Notable wins:\n• SIH 2026 national selection (Team Lead)\n• PBL Competition Runner-Up\n• Active in Code Club community\n\nCompetitive achievements backing his skills!"
    ]
  },

  // AVAILABILITY
  availability: {
    patterns: [
      /(available|looking|open\s+to|seeking)/i,
      /(job|opportunity|position|role)/i,
      /full\s*time|part\s*time|internship/i,
      /relocation|remote/i
    ],
    responses: [
      "**Open to:**\n✅ Internships\n✅ Part-time projects\n✅ Full-time roles (post-2027)\n✅ Remote work\n✅ Relocation for right opportunity\n\nContact: premdeshmane01@gmail.com",
      "Currently available for internships and part-time work. Graduating 2027 for full-time roles. Remote-friendly, open to relocation. Let's talk!"
    ]
  },

  // WHAT MAKES HIM UNIQUE
  unique: {
    patterns: [
      /(what\s+makes|why|unique|different|special|stand\s+out)/i,
      /why\s+.*\s*hire/i,
      /what\s+.*\s*offer/i,
      /strength/i
    ],
    responses: [
      "**What sets him apart:**\n\n🎯 Real Impact - 20% UI improvements, 60% automation, national hackathon\n🔄 Full Spectrum - Frontend + Backend + AI/ML\n🚀 Ownership - Concept to execution, technical decisions\n📊 Results-Driven - Every project has measurable outcomes",
      "Three things:\n1. Proven track record (measurable results)\n2. Full Stack + AI/ML (rare combo)\n3. Execution focus (ships quality, fast)\n\nBuilds systems that work, not just demos."
    ]
  },

  // GITHUB
  github_code: {
    patterns: [
      /(github|code|repo|repository)/i,
      /see\s+.*\s*code/i,
      /implementation/i
    ],
    responses: [
      "💻 **GitHub:** github.com/premdeshmane-01\n\nCheck out:\n• Project repositories\n• Actual code quality\n• Commit history\n• Implementation details\n\nCode speaks louder than words!",
      "All code is public on GitHub: github.com/premdeshmane-01\n\nSee clean code, proper Git workflows, and real implementations. Best way to evaluate a developer!"
    ]
  },

  // CERTIFICATIONS
  certifications: {
    patterns: [
      /(certification|certificate|course|bootcamp)/i,
      /ackvk|cdac|google\s+cloud/i
    ],
    responses: [
      "**Certified in:**\n✅ Web Dev Bootcamp (ACKVK)\n✅ AI/ML Internship (AICTE × Google)\n✅ Google Cloud Engineering\n✅ AR/VR Development (CDAC)\n\nContinuous learning mindset!",
      "Industry-recognized certs: Web Dev, AI/ML (AICTE-Google), Google Cloud, AR/VR. Theory + practical experience combined."
    ]
  },

  // LOCATION
  location: {
    patterns: [
      /(where|location|live|city|based|from)/i,
      /maharashtra|india/i
    ],
    responses: [
      "📍 Based in **Maharashtra, India**\n\nOpen to:\n• Remote work ✅\n• Relocation ✅\n• International opportunities ✅\n\nGeography isn't a barrier!",
      "Maharashtra, India (SNJB College, SPPU area). Flexible about work location - remote or willing to relocate!"
    ]
  },

  // WORK STYLE
  work_style: {
    patterns: [
      /(work\s+style|how\s+.*\s*work|approach|methodology)/i,
      /process/i
    ],
    responses: [
      "**Work Approach:**\n1. Break down problems\n2. Design workable solutions\n3. Take ownership of tech decisions\n4. Ship with consistency\n5. Ensure quality standards\n\nMetrics-driven, team-aligned, execution-focused.",
      "Prem's style: Thoughtful planning → Disciplined execution → Measurable results. Uses Git workflows, testing, and iterative development. Team player who leads when needed."
    ]
  },

  // WEAKNESSES
  weaknesses: {
    patterns: [
      /(weakness|weak|challenge|limitation|improve)/i,
      /what\s+.*\s*not\s+.*\s*good/i,
      /growth\s+area/i
    ],
    responses: [
      "**Honest growth areas:**\n\n📚 Still Learning: Cloud infrastructure at scale, advanced DevOps\n⏳ Limited: Years of production enterprise experience\n🎓 Student: Full-time available post-2027\n\nBut actively working on these. Growth mindset > false perfection!",
      "Learning: Backend at massive scale, comprehensive testing frameworks, advanced CI/CD. Important: He's upfront about learning vs. mastered skills. Honesty is valuable!"
    ]
  },

  // TECHNICAL DEPTH
  technical_depth: {
    patterns: [
      /(how\s+good|proficiency|level|expertise)/i,
      /rate\s+.*\s*skill/i,
      /beginner|intermediate|advanced/i
    ],
    responses: [
      "**Proficiency Levels:**\n\n🟢 Strong: React, JavaScript, Frontend, Git, UI/UX\n🟡 Solid: Node.js, MongoDB, APIs, Python, GSAP\n🟠 Foundation: AI/ML, TypeScript, Next.js, Java\n\nHonest self-assessment - no inflated claims!",
      "High confidence: Frontend, React ecosystem, animations, responsive design. Working knowledge: Backend (Node/Express), AI/ML (LLMs, RAG). 2-3 years intensive hands-on. Quality over quantity!"
    ]
  },

  // SALARY
  salary: {
    patterns: [
      /(salary|compensation|pay|ctc|package)/i,
      /how\s+much/i,
      /rate/i
    ],
    responses: [
      "Best discussed directly based on role and responsibilities. Prem focuses on opportunity quality + fair market compensation.\n\nReach out: premdeshmane01@gmail.com or +91-9699082017",
      "Compensation is negotiable! Contact Prem directly:\n📧 premdeshmane01@gmail.com\n📱 +91-9699082017\n\nHe's reasonable and values the opportunity."
    ]
  },

  // BOT META
  bot_meta: {
    patterns: [
      /(who\s+are\s+you|what\s+are\s+you)/i,
      /are\s+you\s+(real|human|bot|ai)/i,
      /how\s+.*\s*work/i
    ],
    responses: [
      "I'm a portfolio chatbot built by Prem! 🤖 Running on Next.js with pattern matching. My data about his work is 100% accurate.\n\nPretty meta - a dev building a bot to showcase his dev skills! What would you like to know?",
      "AI assistant created by Premsagar. I'm not human, but my knowledge about his projects, skills, and experience is real and current. Think of me as an interactive resume!"
    ]
  },

  // COMPLIMENTS
  praise: {
    patterns: [
      /(good|great|awesome|cool|amazing|nice|impressive|wow)/i,
      /love/i,
      /well\s+done/i
    ],
    responses: [
      "Thanks! 😊 Prem will appreciate that. He puts effort into quality work.\n\nAnything specific you'd like to explore?",
      "Glad you like it! I'll pass the compliment along. Want to know more about any specific project or skill?",
      "Appreciate it! Prem believes in shipping polished work. What else can I tell you?"
    ]
  },

  // THANKS
  thanks: {
    patterns: [
      /(thank|thanks|thx)/i,
      /appreciate/i
    ],
    responses: [
      "You're welcome! 😊 Anything else about Prem?",
      "Happy to help! Any other questions?",
      "My pleasure! What else are you curious about?"
    ]
  },

  // GOODBYE
  goodbye: {
    patterns: [
      /(bye|goodbye|see\s+you|later|gtg)/i,
      /talk\s+.*\s*later/i
    ],
    responses: [
      "Thanks for visiting! Connect with Prem: premdeshmane01@gmail.com. Take care! 👋",
      "Goodbye! Feel free to reach out anytime. Best wishes! ✌️",
      "See you! Don't forget to connect on LinkedIn: linkedin.com/in/prem-deshmane01 🚀"
    ]
  },

  // HOW ARE YOU
  howareyou: {
    patterns: [
      /how\s+(are|r)\s+(you|u)/i,
      /doing/i,
      /what'?s\s+up/i
    ],
    responses: [
      "I'm just code, but functioning perfectly! 😊 How can I help you learn about Prem?",
      "All systems operational! Ready to answer your questions about Premsagar.",
      "I'm excellent! 🤖 What brings you here today?"
    ]
  },

  // HELP
  help: {
    patterns: [
      /(help|confused|lost|what\s+can)/i,
      /options/i,
      /don'?t\s+know/i
    ],
    responses: [
      "**I can help with:**\n\n💼 Experience (Syntine, AICTE)\n🛠️ Projects (Sundown, Lazarev, etc.)\n⚡ Skills (React, Python, AI/ML)\n🎓 Education (SGPA, graduation)\n📞 Contact info\n🎯 Availability\n\nWhat interests you?",
      "Ask me about:\n• His work at Syntine or AICTE\n• Projects and tech used\n• What makes him unique\n• How to contact him\n• His availability\n\nJust ask naturally! 😊"
    ]
  },

  // JOKES
  humor: {
    patterns: [
      /(joke|funny|humor|laugh)/i,
      /make\s+me\s+laugh/i
    ],
    responses: [
      "I'm a chatbot, not a comedian! 😄 But here's one: Why do programmers prefer dark mode? Light attracts bugs! 🐛\n\nNow, what about Prem's work interests you?",
      "Dev joke: How many programmers does it take to change a lightbulb? None, that's a hardware problem! 💡\n\nAnyway, want to know about Prem's projects?",
      "Not my strong suit! 😅 But Prem's code is cleaner than my jokes. Want to see his GitHub?"
    ]
  }
};

// ===========================
// HELPER FUNCTIONS
// ===========================

// Fuzzy string matching for handling typos
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Common typo corrections
const typoMap: Record<string, string> = {
  'projct': 'project',
  'proyect': 'project',
  'projets': 'projects',
  'projekts': 'projects',
  'experiance': 'experience',
  'experince': 'experience',
  'expirience': 'experience',
  'skilz': 'skills',
  'skils': 'skills',
  'skillz': 'skills',
  'contac': 'contact',
  'cantact': 'contact',
  'contat': 'contact',
  'emial': 'email',
  'emal': 'email',
  'internshp': 'internship',
  'intership': 'internship',
  'internsip': 'internship',
  'educaton': 'education',
  'educaion': 'education',
  'achievment': 'achievement',
  'acheivement': 'achievement',
  'certficate': 'certificate',
  'certifcate': 'certificate',
  'availble': 'available',
  'availabe': 'available',
  'teh': 'the',
  'hte': 'the',
  'tehc': 'tech',
  'technolgy': 'technology',
  'tecnology': 'technology',
  'pythom': 'python',
  'pythn': 'python',
  'javascrpt': 'javascript',
  'javasript': 'javascript',
  'recat': 'react',
  'raect': 'react',
  'nextjs': 'next',
  'node.js': 'node',
  'nodejs': 'node',
  'mongodb': 'mongo',
  'githb': 'github',
  'gihub': 'github',
  'linkedin': 'linkedin',
  'linkdin': 'linkedin',
  'syntne': 'syntine',
  'aicte': 'aicte',
  'gogle': 'google',
  'googel': 'google',
  'prem': 'prem',
  'prm': 'prem',
  'premsagar': 'prem',
  'deshmane': 'prem',
  'sundown': 'sundown',
  'sndwn': 'sundown',
  'lazarev': 'lazarev',
  'sidcup': 'sidcup',
  'inventry': 'inventory',
  'inventroy': 'inventory',
  'expereince': 'experience',
  'wrk': 'work',
  'wrking': 'working',
  'bilt': 'built',
  'biult': 'built',
  'tel': 'tell',
  'abt': 'about',
  'abut': 'about',
  'wht': 'what',
  'wat': 'what',
  'hw': 'how',
  'hlp': 'help',
  'cntact': 'contact',
  'availibility': 'availability',
  'weaknes': 'weakness',
  'strenght': 'strength',
  'strenth': 'strength'
};

function correctTypos(message: string): string {
  let corrected = message;
  
  // Split into words and correct each
  const words = message.split(/\s+/);
  const correctedWords = words.map(word => {
    const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    return typoMap[cleanWord] || word;
  });
  
  corrected = correctedWords.join(' ');
  
  return corrected;
}

function findBestMatch(message: string): string | null {
  // First, correct common typos
  const correctedMessage = correctTypos(message);
  
  let bestMatch: string | null = null;
  let highestScore = 0;

  for (const [category, data] of Object.entries(knowledgeBase)) {
    for (const pattern of data.patterns) {
      // Try exact pattern match first
      if (pattern.test(correctedMessage)) {
        const score = pattern.source.length;
        if (score > highestScore) {
          highestScore = score;
          bestMatch = category;
        }
      }
    }
    
    // If no exact match, try fuzzy matching on keywords
    if (!bestMatch || highestScore < 10) {
      const keywords = data.patterns.map(p => 
        p.source.replace(/[^a-z\s|]/gi, '').split('|').map(k => k.trim())
      ).flat();
      
      for (const keyword of keywords) {
        const words = correctedMessage.split(/\s+/);
        for (const word of words) {
          const similarity = calculateSimilarity(word.toLowerCase(), keyword.toLowerCase());
          if (similarity > 0.75) { // 75% similarity threshold
            const score = similarity * keyword.length;
            if (score > highestScore) {
              highestScore = score;
              bestMatch = category;
            }
          }
        }
      }
    }
  }

  return bestMatch;
}

function generateResponse(category: string, context?: ConversationContext): string {
  const data = knowledgeBase[category];
  if (!data) return getDefaultFallback();

  const response = data.responses[Math.floor(Math.random() * data.responses.length)];

  // Add followup occasionally
  if (data.followups && Math.random() > 0.6 && context && context.conversationDepth < 3) {
    const followup = data.followups[Math.floor(Math.random() * data.followups.length)];
    return `${response}\n\n${followup}`;
  }

  return response;
}

function getDefaultFallback(): string {
  const fallbacks = [
    "I'm not quite sure about that! 🤔 Try asking:\n\n• 'What projects has Prem built?'\n• 'Tell me about his experience'\n• 'What are his skills?'\n• 'How can I contact him?'\n\nWhat interests you?",
    
    "Hmm, didn't catch that. I can tell you about:\n\n✅ Internships (Syntine, AICTE)\n✅ Projects (Sundown, Inventory System)\n✅ Skills (Full Stack + AI/ML)\n✅ Contact info\n\nWhat would you like to know?",
    
    "Not sure about that one! 🤷 But I'm loaded with info on:\n\n💼 Work experience\n🛠️ Projects & code\n⚡ Technical skills\n📞 How to reach him\n\nAsk away!",
    
    "Outside my knowledge base! I'm tuned for questions about Prem's professional work. Try:\n\n• 'What did he do at Syntine?'\n• 'Show me his projects'\n• 'What makes him unique?'\n\nWhat brings you here?"
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function getContextualResponse(message: string, sessionId: string): string {
  let context = conversationMemory.get(sessionId);
  if (!context) {
    context = {
      askedAbout: [],
      conversationDepth: 0
    };
    conversationMemory.set(sessionId, context);
  }

  // Memory cleanup
  if (conversationMemory.size > 100) {
    const firstKey = conversationMemory.keys().next().value;
    if (firstKey) conversationMemory.delete(firstKey);
  }

  // Extract username
  const nameMatch = message.match(/my\s+name\s+is\s+(\w+)|i'?m\s+(\w+)|call\s+me\s+(\w+)/i);
  if (nameMatch) {
    context.userName = nameMatch[1] || nameMatch[2] || nameMatch[3];
  }

  const match = findBestMatch(message);
  let response: string;

  if (match) {
    response = generateResponse(match, context);
    context.lastTopic = match;
    if (!context.askedAbout.includes(match)) {
      context.askedAbout.push(match);
    }
  } else {
    // Check for detail request
    if (context.lastTopic && (message.includes('more') || message.includes('detail'))) {
      const lastData = knowledgeBase[context.lastTopic];
      if (lastData?.details) {
        response = '';
        for (const [key, value] of Object.entries(lastData.details)) {
          if (message.toLowerCase().includes(key)) {
            response = value;
            break;
          }
        }
      }
    }
    
    if (!response!) {
      response = getDefaultFallback();
    }
  }

  // Personalize
  if (context.userName && Math.random() > 0.7) {
    response = `${context.userName}, ${response}`;
  }

  context.conversationDepth++;
  return response;
}

// ===========================
// API ENDPOINT
// ===========================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = (body.message || '').toLowerCase().trim();
    const sessionId = body.sessionId || 'default';

    if (!userMessage) {
      return NextResponse.json({ 
        reply: "I didn't catch that. What would you like to know?" 
      });
    }

    const reply = getContextualResponse(userMessage, sessionId);

    // Typing delay
    await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 600));

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Chat Error:', error);
    return NextResponse.json(
      { reply: "Oops! Something went wrong. Please try again! 🔧" }, 
      { status: 500 }
    );
  }
}