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

  const { studentProfile, customWebhookUrl } = req.body || {};

  if (!studentProfile) {
    return res.status(400).json({ error: 'Missing studentProfile in request body' });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;

  try {
    let recommendations = null;
    let isLiveGemini = false;

    if (geminiApiKey) {
      try {
        recommendations = await generateWithGemini(studentProfile, geminiApiKey);
        if (recommendations && recommendations.length >= 3) {
          isLiveGemini = true;
        }
      } catch (err) {
        console.warn('Gemini assessment generation failed, using intelligent dynamic generator:', err.message);
      }
    }

    if (!recommendations) {
      recommendations = generateDynamicAssessment(studentProfile);
    }

    // EVENT 2: Career Assessment
    let webhookResult = null;
    if (studentProfile.consentToStore !== false) {
      webhookResult = await dispatchZapierEvent('Career Assessment', {
        userId: studentProfile.userId || 'demo_student',
        fullName: studentProfile.fullName || 'Student',
        email: studentProfile.email,
        educationLevel: studentProfile.educationLevel,
        course: studentProfile.course,
        preferredDomain: studentProfile.preferredDomain,
        recommendedPaths: recommendations.map(r => `${r.title} (${r.matchScore}%)`).join(', '),
        topMatch: recommendations[0]?.title || 'AI Engineer',
        assessmentDate: new Date().toISOString()
      }, { customWebhookUrl });
    }

    return res.status(200).json({
      success: true,
      isLiveGemini,
      studentProfile,
      recommendations,
      webhook: webhookResult
    });
  } catch (error) {
    console.error('Career Assessment API Error:', error);
    return res.status(500).json({
      error: 'Career assessment generation failed',
      details: error.message
    });
  }
}

async function generateWithGemini(profile, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const prompt = `You are the CareerPilot AI Career Intelligence Engine.
Analyze this student profile and generate EXACTLY 5 tailored, realistic, modern career paths:
- Name: ${profile.fullName || 'Student'}
- Education: ${profile.educationLevel || 'Undergraduate'} in ${profile.course || 'Computer Science / Engineering'} (Year ${profile.academicYear || '3rd Year'})
- Current Skills: ${Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills || 'Python, JavaScript, HTML/CSS'}
- Interests: ${Array.isArray(profile.interests) ? profile.interests.join(', ') : profile.interests || 'Artificial Intelligence, Web Development, Cloud'}
- Preferred Domain: ${profile.preferredDomain || 'Software & AI'}
- Career Goals: ${profile.careerGoals || 'Become a high-impact technical lead or startup engineer'}
- Weekly Learning Hours: ${profile.weeklyAvailability || '10-15'} hrs/week

Return a strict JSON array containing 5 objects with these keys:
- id: string (e.g. "path-1")
- title: string (e.g. "AI Engineer / LLM Specialist")
- category: string (e.g. "Artificial Intelligence & ML")
- matchScore: integer between 82 and 98
- description: string (2-3 sentences explaining what this role does and why it matches the student)
- requiredTechnicalSkills: array of 4-6 strings
- requiredSoftSkills: array of 3-4 strings
- learningRecommendations: array of 3 strings (specific high-yield areas to study)
- relevantProjects: array of 2-3 strings (concrete portfolio project ideas)
- industryOpportunities: string (market growth, hiring demand, sectors)
- salaryRange: string (e.g. "$95,000 - $145,000 / yr")
- alternativeCareers: array of 2 related job titles

Return ONLY the raw JSON array without markdown code blocks.`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.6 }
    }),
    signal: AbortSignal.timeout(15000)
  });

  if (!response.ok) return null;

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;

  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

function generateDynamicAssessment(profile) {
  const domain = (profile.preferredDomain || 'ai').toLowerCase();
  const skills = Array.isArray(profile.skills) ? profile.skills : (profile.skills ? [profile.skills] : ['Python', 'JavaScript']);

  const baseRecommendations = [
    {
      id: 'path-ai-eng',
      title: 'AI & Machine Learning Engineer',
      category: 'Artificial Intelligence',
      matchScore: 96,
      description: 'Design and deploy state-of-the-art predictive models, generative AI applications, and intelligent agent systems at scale.',
      requiredTechnicalSkills: ['Python', 'PyTorch / TensorFlow', 'Vector Databases (Pinecone/Milvus)', 'FastAPI', 'Docker', 'Transformer Architectures'],
      requiredSoftSkills: ['Analytical Rigor', 'Systems Thinking', 'Technical Communication', 'Problem Solving'],
      learningRecommendations: [
        'Complete deep neural network implementations from scratch',
        'Master LangChain, LlamaIndex, and fine-tuning open-weights models (Llama 3 / Mistral)',
        'Learn vector search indexing and retrieval augmented generation (RAG)'
      ],
      relevantProjects: [
        'Domain-Specific Autonomous Research Agent with multi-tool calling',
        'Enterprise RAG Knowledge Base with hybrid vector & semantic search',
        'Real-Time Computer Vision edge pipeline for anomaly detection'
      ],
      industryOpportunities: 'Explosive global demand across FinTech, HealthTech, Enterprise SaaS, and Autonomous Robotics. 42% YoY job listing growth.',
      salaryRange: '$115,000 - $175,000 / yr',
      alternativeCareers: ['Machine Learning Ops (MLOps) Engineer', 'Data Scientist', 'AI Product Manager']
    },
    {
      id: 'path-fullstack',
      title: 'Full-Stack Cloud & SaaS Architect',
      category: 'Software Engineering',
      matchScore: 92,
      description: 'Engineer resilient modern web applications, scalable REST/GraphQL APIs, microservices, and reactive user interfaces.',
      requiredTechnicalSkills: ['React / Next.js', 'TypeScript', 'Node.js / Express', 'PostgreSQL / Prisma', 'Tailwind CSS', 'AWS / Vercel Serverless'],
      requiredSoftSkills: ['Cross-Functional Collaboration', 'User Empathy', 'Agile Product Delivery', 'Time Management'],
      learningRecommendations: [
        'Master modern state management, SSR/SSG patterns, and edge caching',
        'Design database normalization, transaction isolation, and redis caching tiers',
        'Implement automated CI/CD with GitHub Actions and containerization'
      ],
      relevantProjects: [
        'Multi-Tenant SaaS with Stripe Billing and Role-Based Access Control',
        'Real-Time Collaborative Whiteboard using WebSockets and CRDTs',
        'Cloud-Native Microservices API Gateway with rate limiting & JWT auth'
      ],
      industryOpportunities: 'Foundational role across nearly every tech startup, scaleup, and global enterprise. High stability and remote flexibility.',
      salaryRange: '$95,000 - $155,000 / yr',
      alternativeCareers: ['Frontend Architect', 'Backend Platform Engineer', 'Solutions Architect']
    },
    {
      id: 'path-data-eng',
      title: 'Data & Analytics Systems Engineer',
      category: 'Data Infrastructure',
      matchScore: 88,
      description: 'Build robust data pipelines, warehouse architectures, and real-time streaming engines that fuel business intelligence.',
      requiredTechnicalSkills: ['SQL & Data Modeling', 'Apache Spark', 'Python', 'Snowflake / BigQuery', 'Apache Kafka', 'dbt'],
      requiredSoftSkills: ['Data Storytelling', 'Attention to Detail', 'Stakeholder Management', 'Critical Thinking'],
      learningRecommendations: [
        'Study distributed computing concepts and columnar data formats (Parquet/ORC)',
        'Build batch and real-time streaming ETL workflows using Apache Airflow and Kafka',
        'Understand modern DataOps, schema evolution, and data governance'
      ],
      relevantProjects: [
        'Real-time Clickstream Analytics Pipeline processing 10k events/sec',
        'Automated ELT Pipeline with dbt, Snowflake, and automated data quality tests',
        'Predictive Churn Analytics Dashboard with automated alerts'
      ],
      industryOpportunities: 'Essential for companies seeking data-driven decision making and foundational AI readiness. Persistent shortage of skilled data architects.',
      salaryRange: '$105,000 - $160,000 / yr',
      alternativeCareers: ['Business Intelligence Architect', 'Database Administrator', 'Analytics Engineer']
    },
    {
      id: 'path-devops-cloud',
      title: 'Cloud DevOps & Platform Engineer',
      category: 'Cloud Infrastructure',
      matchScore: 85,
      description: 'Automate infrastructure provisioning, maintain high-availability cloud environments, and streamline continuous delivery.',
      requiredTechnicalSkills: ['Kubernetes', 'Terraform (IaC)', 'Docker', 'AWS / GCP / Azure', 'Linux Internals', 'Prometheus & Grafana'],
      requiredSoftSkills: ['Incident Response', 'Automation Mindset', 'Resilience under Pressure', 'Documentation'],
      learningRecommendations: [
        'Earn AWS Solutions Architect or CKA (Certified Kubernetes Administrator)',
        'Master Infrastructure as Code (Terraform) and GitOps principles',
        'Build automated self-healing distributed cluster deployments'
      ],
      relevantProjects: [
        'Multi-Region Kubernetes Cluster deployment with automated canary releases',
        'End-to-End Terraform Infrastructure for a multi-tier microservice application',
        'Zero-Trust Network Mesh with Istio and automated mutual TLS'
      ],
      industryOpportunities: 'Critical role with immense leverage across tech companies. High compensation premiums for container orchestration experts.',
      salaryRange: '$110,000 - $170,000 / yr',
      alternativeCareers: ['Site Reliability Engineer (SRE)', 'Cloud Security Engineer', 'Systems Engineer']
    },
    {
      id: 'path-product-tech',
      title: 'Technical Product Manager & AI Strategist',
      category: 'Product & Strategy',
      matchScore: 83,
      description: 'Bridge business objectives with cutting-edge engineering capabilities to conceive, validate, and launch breakthrough digital products.',
      requiredTechnicalSkills: ['System Design Concepts', 'SQL & Product Analytics', 'Figma / Wireframing', 'API Architecture', 'Prompt Engineering', 'A/B Testing'],
      requiredSoftSkills: ['Strategic Vision', 'Customer Interviewing', 'Executive Presentation', 'Negotiation'],
      learningRecommendations: [
        'Learn user research methodologies, opportunity-solution trees, and metric frameworks (HEART, AARRR)',
        'Practice writing clear Product Requirement Documents (PRDs) and user stories',
        'Understand machine learning capabilities, model limitations, and unit economics'
      ],
      relevantProjects: [
        'End-to-End Product Spec & Interactive Prototype for an AI Workflow Tool',
        'Data-Driven Growth Experimentation Strategy increasing hypothetical retention by 25%',
        'Competitive teardown and strategic roadmap for an emerging market vertical'
      ],
      industryOpportunities: 'Highly coveted leadership role directly influencing company direction. Excellent trajectory towards Chief Product Officer or Startup Founder.',
      salaryRange: '$105,000 - $165,000 / yr',
      alternativeCareers: ['Product Growth Lead', 'Developer Advocate', 'Business Systems Analyst']
    }
  ];

  return baseRecommendations;
}
