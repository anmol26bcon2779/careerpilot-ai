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

  const { targetCareer, currentSkills = [], weeklyAvailability = '10-15', studentProfile = {}, customWebhookUrl } = req.body || {};

  if (!targetCareer) {
    return res.status(400).json({ error: 'Target career is required' });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;

  try {
    let roadmapData = null;
    let isLiveGemini = false;

    if (geminiApiKey) {
      try {
        roadmapData = await generateRoadmapWithGemini(targetCareer, currentSkills, weeklyAvailability, geminiApiKey);
        if (roadmapData && roadmapData.milestones && roadmapData.milestones.length >= 6) {
          isLiveGemini = true;
        }
      } catch (e) {
        console.warn('Gemini roadmap generation fallback:', e.message);
      }
    }

    if (!roadmapData) {
      roadmapData = generateDynamicRoadmap(targetCareer, currentSkills, weeklyAvailability);
    }

    // EVENT 3: Roadmap Generated
    let webhookResult = null;
    if (studentProfile.consentToStore !== false) {
      webhookResult = await dispatchZapierEvent('Roadmap Generated', {
        userId: studentProfile.userId || 'demo_student',
        studentName: studentProfile.fullName || 'Student',
        email: studentProfile.email || 'student@example.com',
        roadmapTitle: roadmapData.title,
        targetCareer,
        totalMilestones: roadmapData.milestones.length,
        estimatedTotalWeeks: roadmapData.estimatedTotalWeeks,
        milestonesList: roadmapData.milestones.map(m => m.title).join(' -> '),
        generatedAt: new Date().toISOString()
      }, { customWebhookUrl });
    }

    return res.status(200).json({
      success: true,
      isLiveGemini,
      roadmap: roadmapData,
      webhook: webhookResult
    });
  } catch (error) {
    console.error('Roadmap API error:', error);
    return res.status(500).json({
      error: 'Roadmap generation failed',
      details: error.message
    });
  }
}

async function generateRoadmapWithGemini(targetCareer, currentSkills, weeklyAvailability, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const prompt = `You are the Lead Curriculum Architect at CareerPilot AI.
Generate a comprehensive, structured learning roadmap for a student aiming to become: "${targetCareer}".
Current skills: ${Array.isArray(currentSkills) ? currentSkills.join(', ') : currentSkills || 'Beginner fundamentals'}
Weekly study capacity: ${weeklyAvailability} hours per week.

Return a strict JSON object with:
- title: string (e.g. "${targetCareer} Mastery Roadmap")
- targetCareer: string
- estimatedTotalWeeks: integer (e.g. 24)
- description: string (motivational summary of the curriculum)
- milestones: array of 8-9 sequential milestones. Each milestone object must have:
  - id: string ("ms-1", "ms-2", etc.)
  - stageNumber: integer (1 to 9)
  - stageName: string (e.g. "Programming Fundamentals", "Data Structures", "Core Frameworks", "Production Architecture", "Capstone Project", "Internship Prep")
  - title: string
  - description: string
  - estimatedDuration: string (e.g. "2-3 Weeks")
  - practicalTasks: array of 3 strings (hands-on coding tasks)
  - projectIdeas: string (concrete mini-project to build)
  - learningResources: array of 2-3 objects with { title: string, url: string, type: string ("Documentation"|"Interactive Course"|"Video"|"Book") }
  - completed: false
  - completedAt: null

Return ONLY raw valid JSON. Do not wrap in markdown quotes.`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.5 }
    }),
    signal: AbortSignal.timeout(16000)
  });

  if (!response.ok) return null;

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;

  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

function generateDynamicRoadmap(targetCareer, currentSkills, weeklyAvailability) {
  const career = targetCareer || 'AI Engineer';

  const stagesAI = [
    {
      id: 'ms-1',
      stageNumber: 1,
      stageName: 'Programming Fundamentals & Git',
      title: 'Python Core & Clean Code Architecture',
      description: 'Master advanced Python paradigms, object-oriented design, type hints, virtual environments, and production Git workflows.',
      estimatedDuration: '2 Weeks',
      practicalTasks: [
        'Implement clean OOP classes with dunder methods and dataclasses',
        'Write unit tests using pytest with 90%+ code coverage',
        'Configure Git branch protection rules and automated GitHub Actions CI'
      ],
      projectIdeas: 'CLI Task & Expense Engine with SQLite persistence and automated test suite',
      learningResources: [
        { title: 'Official Python 3.12 Documentation', url: 'https://docs.python.org/3/', type: 'Documentation' },
        { title: 'Real Python Core Tutorials', url: 'https://realpython.com/', type: 'Interactive Course' }
      ],
      completed: true,
      completedAt: new Date(Date.now() - 14 * 86400000).toISOString()
    },
    {
      id: 'ms-2',
      stageNumber: 2,
      stageName: 'Data Structures & Algorithms',
      title: 'Algorithmic Problem Solving for Engineers',
      description: 'Master core computational complexity, dynamic arrays, hash maps, binary trees, graph traversals (BFS/DFS), and algorithmic optimizations.',
      estimatedDuration: '3 Weeks',
      practicalTasks: [
        'Solve 40 targeted LeetCode medium problems on arrays, hash tables, and graphs',
        'Implement Dijkstra and A* search algorithms from scratch',
        'Analyze and optimize time/space complexity across data structures'
      ],
      projectIdeas: 'Interactive Graph Traversal & Pathfinding Visualizer in the browser',
      learningResources: [
        { title: 'Algorithms Specialization - Stanford', url: 'https://www.coursera.org/specializations/algorithms', type: 'Interactive Course' },
        { title: 'NeetCode DSA Roadmap', url: 'https://neetcode.io/roadmap', type: 'Interactive Course' }
      ],
      completed: true,
      completedAt: new Date(Date.now() - 7 * 86400000).toISOString()
    },
    {
      id: 'ms-3',
      stageNumber: 3,
      stageName: 'Mathematics for AI',
      title: 'Linear Algebra, Calculus & Probability',
      description: 'Grasp the mathematical foundations underpinning gradient descent, tensor transformations, eigenvalues, and Bayesian probability.',
      estimatedDuration: '3 Weeks',
      practicalTasks: [
        'Perform matrix decomposition and SVD using NumPy without high-level ML libs',
        'Derive backpropagation gradients analytically for a multi-layer perceptron',
        'Simulate probability distributions and compute Bayes rule inferences'
      ],
      projectIdeas: 'Numpy-Only Neural Network with customizable layer activations and cross-entropy loss',
      learningResources: [
        { title: '3Blue1Brown Essence of Linear Algebra', url: 'https://www.3blue1brown.com/topics/linear-algebra', type: 'Video' },
        { title: 'Mathematics for Machine Learning - Deisenroth', url: 'https://mml-book.github.io/', type: 'Book' }
      ],
      completed: false,
      completedAt: null
    },
    {
      id: 'ms-4',
      stageNumber: 4,
      stageName: 'Machine Learning Foundations',
      title: 'Supervised & Unsupervised ML with Scikit-Learn',
      description: 'Build predictive regression, classification, clustering, cross-validation, hyperparameter tuning, and model evaluation pipelines.',
      estimatedDuration: '3 Weeks',
      practicalTasks: [
        'Preprocess messy real-world datasets with feature scaling, imputation, and encoding',
        'Train and compare Random Forests, XGBoost, and SVM models with ROC-AUC metrics',
        'Prevent data leakage using Scikit-Learn Pipeline and ColumnTransformer'
      ],
      projectIdeas: 'Customer Churn & Credit Risk Predictor with automated feature importance dashboard',
      learningResources: [
        { title: 'Scikit-Learn Machine Learning in Python', url: 'https://scikit-learn.org/stable/', type: 'Documentation' },
        { title: 'Hands-On Machine Learning with Scikit-Learn and TensorFlow', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/', type: 'Book' }
      ],
      completed: false,
      completedAt: null
    },
    {
      id: 'ms-5',
      stageNumber: 5,
      stageName: 'Deep Learning & Neural Networks',
      title: 'PyTorch Deep Learning & Computer Vision',
      description: 'Implement convolutional neural networks (CNNs), residual networks (ResNet), transfer learning, and GPU training acceleration in PyTorch.',
      estimatedDuration: '4 Weeks',
      practicalTasks: [
        'Build custom PyTorch Dataset and DataLoader with data augmentation',
        'Fine-tune pre-trained vision models for multi-class classification',
        'Profile GPU memory allocation and batch size throughput'
      ],
      projectIdeas: 'Medical Imaging Classifier detecting lung anomalies with Grad-CAM visualization',
      learningResources: [
        { title: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials/', type: 'Documentation' },
        { title: 'Deep Learning Specialization - Andrew Ng', url: 'https://www.deeplearning.ai/courses/deep-learning-specialization/', type: 'Interactive Course' }
      ],
      completed: false,
      completedAt: null
    },
    {
      id: 'ms-6',
      stageNumber: 6,
      stageName: 'Modern Generative AI & LLMs',
      title: 'Transformer Architectures, RAG & AI Agents',
      description: 'Master attention mechanisms, tokenization, Hugging Face transformers, vector databases (Chroma/Pinecone), RAG pipelines, and LLM orchestration.',
      estimatedDuration: '4 Weeks',
      practicalTasks: [
        'Build a semantic search and Retrieval-Augmented Generation (RAG) system with hybrid ranking',
        'Implement structured tool calling and autonomous agent loops using LangChain / LlamaIndex',
        'Quantize and run local open-weights models (Ollama / vLLM)'
      ],
      projectIdeas: 'Enterprise Knowledge Assistant that answers questions over 500+ PDF documents with source citations',
      learningResources: [
        { title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course', type: 'Interactive Course' },
        { title: 'LangChain Documentation & Guides', url: 'https://python.langchain.com/docs/', type: 'Documentation' }
      ],
      completed: false,
      completedAt: null
    },
    {
      id: 'ms-7',
      stageNumber: 7,
      stageName: 'Production MLOps & API Deployment',
      title: 'FastAPI, Docker & Cloud Serving at Scale',
      description: 'Containerize AI models, create low-latency asynchronous REST APIs, manage model registries, and implement rate-limiting.',
      estimatedDuration: '3 Weeks',
      practicalTasks: [
        'Build asynchronous FastAPI inference server with Pydantic request validation',
        'Create multi-stage Dockerfile minimizing image size to under 500MB',
        'Deploy microservice on AWS ECS or Google Cloud Run with autoscaling'
      ],
      projectIdeas: 'Production Model Inference Gateway with token usage tracking and Prometheus latency metrics',
      learningResources: [
        { title: 'FastAPI High Performance Web API Framework', url: 'https://fastapi.tiangolo.com/', type: 'Documentation' },
        { title: 'Full Stack Deep Learning Course', url: 'https://fullstackdeeplearning.com/', type: 'Interactive Course' }
      ],
      completed: false,
      completedAt: null
    },
    {
      id: 'ms-8',
      stageNumber: 8,
      stageName: 'Portfolio & Capstone Showcase',
      title: 'Production Capstone & Public Live Deployment',
      description: 'Synthesize your skills into an end-to-end production AI application with a responsive user interface, authentication, and live cloud link.',
      estimatedDuration: '2 Weeks',
      practicalTasks: [
        'Connect full-stack frontend (React/Vite) to live backend model inference API',
        'Record a 3-minute technical demo video explaining architecture decisions',
        'Draft a comprehensive GitHub README with architecture diagrams and API docs'
      ],
      projectIdeas: 'Flagship Autonomous Multi-Agent Research Assistant deployed live on Vercel & GCP',
      learningResources: [
        { title: 'Designing Machine Learning Systems - Chip Huyen', url: 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/', type: 'Book' },
        { title: 'GitHub Portfolio Best Practices Guide', url: 'https://github.com/readme/guides', type: 'Documentation' }
      ],
      completed: false,
      completedAt: null
    },
    {
      id: 'ms-9',
      stageNumber: 9,
      stageName: 'Internship & Technical Interview Prep',
      title: 'LeetCode Grinding, System Design & Behavioral STAR',
      description: 'Simulate high-stakes coding interviews, refine your technical resume, and prepare compelling narratives for hiring managers.',
      estimatedDuration: '2 Weeks',
      practicalTasks: [
        'Complete 5 live peer mock interviews on Pramp or Interviewing.io',
        'Practice ML System Design questions (e.g. "Design YouTube Recommendation Engine")',
        'Submit tailored applications to 20 vetted software/AI internship openings'
      ],
      projectIdeas: 'Interactive Personal Portfolio & Tech Blog featuring interactive live demos',
      learningResources: [
        { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'Documentation' },
        { title: 'Cracking the Coding Interview', url: 'https://www.crackingthecodinginterview.com/', type: 'Book' }
      ],
      completed: false,
      completedAt: null
    }
  ];

  return {
    title: `${career} Mastery Roadmap`,
    targetCareer: career,
    estimatedTotalWeeks: 26,
    description: `A battle-tested, end-to-end curriculum designed to take you from foundational competencies to production-grade engineering in ${career}. Tailored for ${weeklyAvailability} hours of weekly focused study.`,
    milestones: stagesAI
  };
}
