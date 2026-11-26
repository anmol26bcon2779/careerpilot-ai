import { dispatchZapierEvent } from './webhook.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mode, prompt, context = {}, history = [], optInStorage = false, customWebhookUrl } = req.body || {};
  const geminiApiKey = process.env.GEMINI_API_KEY;

  try {
    let result = null;

    if (mode === 'chat') {
      result = await handleChat(prompt, context, history, geminiApiKey);
      
      // Store conversation history via Zapier integration ONLY when student explicitly opts in
      if (optInStorage && context.studentEmail) {
        await dispatchZapierEvent('AI Mentor Session Log', {
          email: context.studentEmail,
          targetCareer: context.targetCareer || 'General',
          userQuery: prompt.substring(0, 300),
          aiReplySummary: result.reply.substring(0, 300),
          timestamp: new Date().toISOString()
        }, { customWebhookUrl });
      }

      return res.status(200).json(result);
    } 
    
    else if (mode === 'resume-summary') {
      result = await handleResumeSummary(context, geminiApiKey);
      return res.status(200).json(result);
    } 
    
    else if (mode === 'interview-feedback') {
      result = await handleInterviewFeedback(req.body, geminiApiKey);
      return res.status(200).json(result);
    }

    return res.status(400).json({ error: 'Unknown mode. Supported modes: chat, resume-summary, interview-feedback' });
  } catch (error) {
    console.error('AI API error:', error);
    return res.status(500).json({
      error: 'AI processing failed',
      details: error.message
    });
  }
}

async function callGemini(systemInstruction, userContent, geminiApiKey) {
  if (!geminiApiKey) {
    return null;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `${systemInstruction}\n\nTask:\n${userContent}` }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000,
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(12000)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API returned ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || null;
}

// Handler for AI Mentor Chat
async function handleChat(prompt, context, history, geminiApiKey) {
  const targetCareer = context.targetCareer || 'Undecided / Tech Explorer';
  const skills = Array.isArray(context.skills) ? context.skills.join(', ') : 'Not specified';
  const education = context.education || 'Undergraduate student';

  const systemInstruction = `You are CareerPilot AI, an elite, empowering, and pragmatic career mentor for students and tech professionals.
Target Career: "${targetCareer}".
Student Skills: "${skills}".
Education/Background: "${education}".
Give clear, actionable, and encouraging advice. Avoid generic filler. Recommend concrete tools, specific libraries, real-world portfolio project ideas, and interview strategies. Use neat markdown with bullet points and bold highlights.`;

  if (geminiApiKey) {
    try {
      const historyContext = history.slice(-4).map(h => `${h.sender === 'user' ? 'Student' : 'CareerPilot'}: ${h.text}`).join('\n');
      const fullPrompt = `${historyContext ? `Recent conversation context:\n${historyContext}\n\n` : ''}Student Question: ${prompt}`;
      const liveReply = await callGemini(systemInstruction, fullPrompt, geminiApiKey);
      if (liveReply) {
        return {
          reply: liveReply,
          isLiveGemini: true,
          model: 'Gemini 1.5 Flash'
        };
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to heuristic mentor engine:', e.message);
    }
  }

  // High-quality contextual fallback when API key is not configured or offline
  const fallback = generateMentorFallback(prompt, targetCareer, skills);
  return {
    reply: fallback,
    isLiveGemini: false,
    model: 'CareerPilot Mentor Engine (Add GEMINI_API_KEY in .env for Live Gemini Flash)'
  };
}

// Fallback mentor intelligence
function generateMentorFallback(prompt, targetCareer, skills) {
  const q = prompt.toLowerCase();

  if (q.includes('learn next') || q.includes('what should i learn')) {
    return `### Next High-Impact Learning Steps for **${targetCareer}**

Based on your current profile (${skills}), here is your prioritized 30-day focus:

1. **Deepen Core Fundamentals**: Build an end-to-end project utilizing industry-standard patterns rather than isolated exercises.
2. **System Architecture**: Master how data flows from frontend UI down through cloud APIs and storage tiers.
3. **Automated Testing & CI/CD**: Write unit tests and configure automated GitHub Actions workflows.
4. **Targeted Gap**: Add Docker containerization and cloud deployment (e.g. Vercel / AWS) to showcase production readiness.

*Tip: Check out the **Learning Roadmap** tab for your full milestone breakdown!*`;
  }

  if (q.includes('interview') || q.includes('prepare')) {
    return `### Strategic Interview Roadmap for **${targetCareer}**

1. **The 3-Tier Technical Prep**:
   - **Data Structures & Algorithms**: Master Array, Hash Map, BFS/DFS, and Two-Pointer patterns.
   - **System Design & Architecture**: Understand API contracts, caching, rate limiting, and database indexing.
   - **Domain Deep Dive**: Be ready to explain tradeoffs made in your personal projects.
2. **Behavioral STAR Technique**: Prepare 3 solid stories (Conflict resolution, Technical challenge overcome, Ownership of failure).
3. **Mock Practice**: Use our **Interview Coach** tab to practice real-time technical and HR questions!`;
  }

  if (q.includes('project') || q.includes('portfolio') || q.includes('build')) {
    return `### 3 Standout Portfolio Projects for **${targetCareer}**

1. **Full-Stack SaaS with Real-Time Capabilities**:
   - Build a responsive dashboard solving an actual workflow friction point.
   - Stack: Modern React/Next.js, REST/GraphQL APIs, OAuth authentication, and automated webhooks.
2. **AI-Enhanced Microservice**:
   - Integrate an LLM with retrieval-augmented generation (RAG) or structured tool execution.
3. **Production DevOps Showcase**:
   - Implement Dockerized environments, environment variable segregation, and automated deployment pipelines.

*Make sure each project has an active live demo link and a clean, documented README on GitHub!*`;
  }

  if (q.includes('internship') || q.includes('resume')) {
    return `### Landing Top Internships in **${targetCareer}**

- **Resume Alignment**: Tailor your headline and bullet points with quantifiable impact (e.g. *"Optimized API latency by 35% using client-side memoization"*).
- **GitHub Hygiene**: Pin your best 3 repositories, write descriptive READMEs, and include live demo URLs.
- **Direct Networking**: Reach out directly to engineering managers and university recruiters on LinkedIn with a 3-sentence personalized pitch.
- **Explore Listings**: Head over to our **Internships** tab to browse vetted demo and partner opportunities.`;
  }

  return `### CareerPilot AI Advisory for **${targetCareer}**

Great question! For aspiring professionals in **${targetCareer}**, the key differentiator in today's competitive landscape is **shipping functional, user-facing software** rather than merely watching tutorials.

Here are 3 concrete action items for this week:
- **Audit your GitHub repository**: Ensure your projects have clean git commit histories and clear deployment links.
- **Practice Active Coding**: Dedicate 45 minutes daily to your next milestone in your CareerPilot Roadmap.
- **Engage with the Community**: Contribute to open source or write an architectural post about something new you learned.

Ask me about specific frameworks, interview question walkthroughs, or resume critiques!`;
}

// Handler for AI Resume Summary
async function handleResumeSummary(context, geminiApiKey) {
  const { role, skills = [], experience = '', education = '' } = context;

  const prompt = `Write a high-impact, modern 3-4 sentence professional summary for a resume.
Target Role: ${role || 'Software & Tech Professional'}
Key Skills: ${skills.join(', ')}
Background/Experience: ${experience || 'Academic and project-based experience'}
Education: ${education}
Requirements: Active voice, result-oriented, professional, ATS-friendly, no clichés.`;

  if (geminiApiKey) {
    try {
      const summary = await callGemini('You are an expert resume writer and technical recruiter.', prompt, geminiApiKey);
      if (summary) {
        return { summary: summary.trim().replace(/^"|"$/g, ''), isLiveGemini: true };
      }
    } catch (e) {
      console.warn('Gemini API call failed for resume summary:', e.message);
    }
  }

  // Dynamic fallback summary
  const skillList = skills.length > 0 ? skills.slice(0, 3).join(', ') : 'modern software engineering principles';
  return {
    summary: `Results-driven and adaptive ${role || 'Technology Specialist'} with a proven foundation in ${skillList}. Experienced in building responsive, scalable applications and translating complex technical requirements into user-centric solutions. Passionate about continuous skill development, engineering best practices, and driving tangible product impact.`,
    isLiveGemini: false
  };
}

// Handler for Interview Feedback
async function handleInterviewFeedback(body, geminiApiKey) {
  const { question, answer, role = 'Software Engineer', questionType = 'technical' } = body;

  const prompt = `Evaluate this student interview answer:
Target Role: ${role}
Question Type: ${questionType}
Question: "${question}"
Candidate Answer: "${answer}"

Provide a JSON response with:
- score: integer between 40 and 95
- verdict: "Strong", "Good", "Needs Improvement"
- strengths: array of 2 short strings
- weaknesses: array of 2 short strings
- suggestedAnswer: a polished, ideal answer using STAR or technical precision
Format as valid JSON only.`;

  if (geminiApiKey) {
    try {
      const responseText = await callGemini('You are an elite senior technical hiring manager. Return raw JSON only.', prompt, geminiApiKey);
      if (responseText) {
        const cleaned = responseText.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        return { ...parsed, isLiveGemini: true };
      }
    } catch (e) {
      console.warn('Gemini interview evaluation fallback:', e.message);
    }
  }

  // High-quality structured fallback
  const wordCount = (answer || '').trim().split(/\s+/).length;
  const score = Math.min(88, Math.max(58, Math.round(50 + (wordCount * 0.4))));

  return {
    score,
    verdict: score > 75 ? 'Good' : 'Needs Improvement',
    strengths: [
      'Addressed the core intent of the question directly',
      'Demonstrated foundational awareness of modern engineering terminology'
    ],
    weaknesses: [
      'Could cite specific measurable metrics or performance benchmarks',
      'Elaborate more on architectural tradeoffs and edge-case handling'
    ],
    suggestedAnswer: `In my previous work targeting ${role}, I approached this systematically: first validating the user requirements, architecting modular components, and measuring outcomes. Specifically, I maintained clear separation of concerns, implemented error boundaries, and monitored performance metrics to ensure high system reliability and swift user response times.`,
    isLiveGemini: false
  };
}
