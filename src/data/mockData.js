// Mock Data and Sample Content for CareerPilot AI
// NOTE: All sample data is clearly labelled in accordance with SaaS transparency standards.

export const SAMPLE_TESTIMONIALS = [
  {
    id: 1,
    name: 'Maya Patel',
    role: 'Incoming ML Engineering Intern',
    company: 'Scale AI',
    university: 'Stanford University (Sample Student Profile)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    content: 'CareerPilot AI transformed my vague interest in machine learning into a 24-week execution blueprint. The skill gap matrix pointed out my lack of PyTorch and vector databases, which allowed me to crack technical rounds at Scale AI.',
    verified: true,
    rating: 5
  },
  {
    id: 2,
    name: 'Rohan Sharma',
    role: 'Cloud Solutions Associate',
    company: 'Microsoft Cloud',
    university: 'IIT Delhi (Sample Student Profile)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'The milestone tracker kept me disciplined. Instead of random video tutorials, I built two end-to-end containerized projects that interviewers actually discussed for 30 minutes straight. Essential for any STEM student.',
    verified: true,
    rating: 5
  },
  {
    id: 3,
    name: 'Sophia Laurent',
    role: 'Full-Stack Developer Intern',
    company: 'Vercel Partner Lab',
    university: 'University of Waterloo (Sample Student Profile)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    content: 'The mock interview coach with Gemini AI was an absolute gamechanger. It graded my STAR-method answers in real time and suggested exact phrase improvements for trade-off questions.',
    verified: true,
    rating: 5
  }
];

export const DEMO_INTERNSHIPS = [
  {
    id: 'int-101',
    title: 'AI & Generative Systems Intern',
    company: 'Anthropic Labs (Partner Cohort)',
    location: 'San Francisco, CA / Remote Available',
    type: 'Remote Allowed',
    domain: 'AI & Machine Learning',
    stipend: '$55 - $70 / hr',
    duration: '12 Weeks (Summer 2027)',
    eligibility: 'Pursuing BS/MS in CS or related field; hands-on experience with PyTorch and LLMs.',
    description: 'Work with the alignment team to evaluate model interpretability benchmarks and synthesize synthetic evaluation datasets.',
    requirements: ['PyTorch or JAX', 'Python', 'Vector DBs', 'Git'],
    postedDate: '2 days ago',
    applicationUrl: 'https://anthropic.com/careers',
    isDemoListing: true
  },
  {
    id: 'int-102',
    title: 'Frontend Platform & Design Systems Intern',
    company: 'Vercel Ecosystem Labs',
    location: 'Remote (Worldwide)',
    type: '100% Remote',
    domain: 'Full-Stack Development',
    stipend: '$45 - $60 / hr',
    duration: '16 Weeks',
    eligibility: 'Demonstrated mastery of React, TypeScript, and modern CSS/Tailwind design systems.',
    description: 'Build accessible, high-performance UI components for developer tooling and web performance dashboards.',
    requirements: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    postedDate: 'Just now',
    applicationUrl: 'https://vercel.com/careers',
    isDemoListing: true
  },
  {
    id: 'int-103',
    title: 'Distributed Data Engineering Intern',
    company: 'Stripe Infrastructure',
    location: 'Seattle, WA / Hybrid',
    type: 'Hybrid',
    domain: 'Data Science & Systems',
    stipend: '$52 - $68 / hr',
    duration: '12 Weeks',
    eligibility: 'Solid understanding of distributed systems, SQL, Apache Spark, and database internals.',
    description: 'Help engineer real-time payment ledger streaming pipelines and automated anomaly detection queries.',
    requirements: ['SQL', 'Apache Spark', 'Python', 'Kafka', 'PostgreSQL'],
    postedDate: '3 days ago',
    applicationUrl: 'https://stripe.com/jobs',
    isDemoListing: true
  },
  {
    id: 'int-104',
    title: 'Cloud DevOps & Site Reliability Intern',
    company: 'Datadog Platforms',
    location: 'Boston, MA / Remote',
    type: 'Remote Allowed',
    domain: 'Cloud & DevOps',
    stipend: '$48 - $62 / hr',
    duration: '14 Weeks',
    eligibility: 'Familiarity with Linux systems, Docker containers, Kubernetes, and automated CI/CD pipelines.',
    description: 'Contribute to multi-region cloud cluster deployment tooling and telemetry alerting systems.',
    requirements: ['Docker', 'Kubernetes', 'Linux', 'Go or Python', 'Terraform'],
    postedDate: '5 days ago',
    applicationUrl: 'https://datadoghq.com/careers',
    isDemoListing: true
  },
  {
    id: 'int-105',
    title: 'Cybersecurity Threat Detection Intern',
    company: 'CrowdStrike Intelligence',
    location: 'Austin, TX / Hybrid',
    type: 'Hybrid',
    domain: 'Cybersecurity',
    stipend: '$46 - $58 / hr',
    duration: '12 Weeks',
    eligibility: 'Knowledge of network protocols, threat vectors, security telemetry, and reverse engineering basics.',
    description: 'Analyze telemetry feeds to classify novel adversary techniques and automate response rules.',
    requirements: ['Network Protocols', 'Python', 'OWASP Top 10', 'Linux Security'],
    postedDate: '1 week ago',
    applicationUrl: 'https://crowdstrike.com/careers',
    isDemoListing: true
  },
  {
    id: 'int-106',
    title: 'Machine Learning Research Fellow (Undergraduate)',
    company: 'DeepMind Academic Alliance',
    location: 'London / Remote Friendly',
    type: 'Remote Allowed',
    domain: 'AI & Machine Learning',
    stipend: '£3,800 / month stipend',
    duration: '10 Weeks',
    eligibility: 'Strong math background (Linear Algebra, Calculus, Statistics) with Python coding proficiency.',
    description: 'Assist research scientists in training foundation models for scientific discovery and mathematical problem solving.',
    requirements: ['Python', 'Linear Algebra', 'PyTorch', 'Research Writing'],
    postedDate: '4 days ago',
    applicationUrl: 'https://deepmind.google/careers',
    isDemoListing: true
  }
];

export const CAREER_DOMAINS = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    icon: 'Brain',
    demand: 'Explosive (+38%)',
    avgSalary: '$135,000',
    topSkills: ['Python', 'PyTorch', 'Transformers', 'Vector DBs', 'Docker'],
    description: 'Architecting neural intelligence, LLM systems, and automated predictive algorithms.'
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Software Engineering',
    icon: 'Layers',
    demand: 'Very High (+26%)',
    avgSalary: '$120,000',
    topSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
    description: 'Designing end-to-end web applications, modern APIs, and responsive digital products.'
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & Platform Engineering',
    icon: 'Cloud',
    demand: 'High (+25%)',
    avgSalary: '$128,000',
    topSkills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD'],
    description: 'Orchestrating resilient multi-cloud infrastructure and zero-downtime release pipelines.'
  },
  {
    id: 'data-eng',
    title: 'Data Science & Big Data Engineering',
    icon: 'Database',
    demand: 'High (+23%)',
    avgSalary: '$122,000',
    topSkills: ['SQL', 'Python', 'Spark', 'dbt', 'Snowflake'],
    description: 'Transforming petabyte-scale data lakes into real-time business intelligence streams.'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & AppSec Defense',
    icon: 'Shield',
    demand: 'High (+32%)',
    avgSalary: '$118,000',
    topSkills: ['OWASP', 'Penetration Testing', 'Linux', 'Cryptography', 'Python'],
    description: 'Protecting critical infrastructure, APIs, and networks from sophisticated threat actors.'
  },
  {
    id: 'product-design',
    title: 'Product Management & AI UX',
    icon: 'Sparkles',
    demand: 'Moderate (+18%)',
    avgSalary: '$115,000',
    topSkills: ['Product Strategy', 'Figma', 'User Research', 'Agile', 'Analytics'],
    description: 'Guiding cross-functional teams to build intuitive, user-delighting technology solutions.'
  }
];

export const DEFAULT_ROADMAP = {
  targetCareer: 'AI Engineer',
  estimatedWeeks: 24,
  difficulty: 'Comprehensive (Foundation to Industry-Ready)',
  stages: [
    {
      id: 'stage-1',
      stageNumber: 1,
      title: 'Programming Fundamentals',
      description: 'Master modular programming, type hints, clean architecture, and Git collaboration workflows.',
      estimatedDuration: '3 Weeks',
      learningResources: [
        { title: 'Harvard CS50x Computer Science', type: 'Course', url: 'https://cs50.harvard.edu' },
        { title: 'Clean Code Principles in Python', type: 'Docs', url: 'https://docs.python.org/3/tutorial/' }
      ],
      practicalTasks: [
        'Write modular programs conforming to PEP 8 style guidelines with strict type checking',
        'Master Git branch workflows, pull requests, and automated formatters',
        'Implement automated test suites with PyTest covering edge cases'
      ],
      projectIdeas: [
        'CLI File System Analyzer & Duplicate Detection Utility'
      ],
      completed: true
    },
    {
      id: 'stage-2',
      stageNumber: 2,
      title: 'Python Mastery',
      description: 'Deep dive into Python internals, generators, decorators, memory management, and asynchronous I/O.',
      estimatedDuration: '3 Weeks',
      learningResources: [
        { title: 'Fluent Python by Luciano Ramalho', type: 'Book', url: 'https://www.oreilly.com' },
        { title: 'RealPython Asynchronous Programming Guide', type: 'Tutorial', url: 'https://realpython.com' }
      ],
      practicalTasks: [
        'Implement custom context managers and function decorators',
        'Build asynchronous web scrapers using asyncio and aiohttp',
        'Profile memory allocation using tracemalloc and cProfile'
      ],
      projectIdeas: [
        'Async High-Throughput GitHub Repository Analytics Scanner'
      ],
      completed: true
    },
    {
      id: 'stage-3',
      stageNumber: 3,
      title: 'Data Structures & Algorithms',
      description: 'Master core algorithmic patterns, Big-O complexity, graphs, dynamic programming, and search trees.',
      estimatedDuration: '4 Weeks',
      learningResources: [
        { title: 'NeetCode 150 Pattern Roadmap', type: 'Practice', url: 'https://neetcode.io' },
        { title: 'Algorithms by Sedgewick & Wayne', type: 'Book', url: 'https://algs4.cs.princeton.edu' }
      ],
      practicalTasks: [
        'Solve 50 curated algorithmic problems across arrays, trees, and graphs',
        'Implement custom Heap, Trie, and Graph adjacency structures from scratch',
        'Analyze worst-case and amortized time/space complexities'
      ],
      projectIdeas: [
        'Interactive A* & Dijkstra Pathfinding Visualizer'
      ],
      completed: false
    },
    {
      id: 'stage-4',
      stageNumber: 4,
      title: 'Mathematics for AI',
      description: 'Cover linear algebra, vector spaces, eigenvalues, multivariable calculus, and probability distributions.',
      estimatedDuration: '3 Weeks',
      learningResources: [
        { title: '3Blue1Brown Essence of Linear Algebra', type: 'Video Series', url: 'https://3blue1brown.com' },
        { title: 'Mathematics for Machine Learning (Deisenroth)', type: 'Book', url: 'https://mml-book.com' }
      ],
      practicalTasks: [
        'Implement matrix multiplication, vector projections, and SVD in NumPy',
        'Compute partial derivatives and gradient vectors manually',
        'Calculate Bayesian probabilities and Gaussian distribution likelihoods'
      ],
      projectIdeas: [
        'NumPy-Only Linear Regression & Logistic Classification Engine'
      ],
      completed: false
    },
    {
      id: 'stage-5',
      stageNumber: 5,
      title: 'Machine Learning',
      description: 'Master classical machine learning, feature engineering, decision trees, XGBoost, and model evaluation.',
      estimatedDuration: '3 Weeks',
      learningResources: [
        { title: 'Fast.ai Practical Machine Learning', type: 'Course', url: 'https://course.fast.ai' },
        { title: 'Scikit-Learn Comprehensive User Guide', type: 'Docs', url: 'https://scikit-learn.org' }
      ],
      practicalTasks: [
        'Build data preprocessing pipelines with imputation and one-hot encoding',
        'Tune hyper-parameters using cross-validation with Optuna',
        'Plot ROC-AUC curves, confusion matrices, and feature importance charts'
      ],
      projectIdeas: [
        'Automated Loan Default Risk & Credit Scoring System'
      ],
      completed: false
    },
    {
      id: 'stage-6',
      stageNumber: 6,
      title: 'Deep Learning & Neural Networks',
      description: 'Build deep neural networks, CNNs, RNNs, and transformer architectures using PyTorch.',
      estimatedDuration: '4 Weeks',
      learningResources: [
        { title: 'Andrej Karpathy Neural Networks: Zero to Hero', type: 'Course', url: 'https://karpathy.ai' },
        { title: 'Official PyTorch Tutorials', type: 'Docs', url: 'https://pytorch.org/tutorials/' }
      ],
      practicalTasks: [
        'Train neural networks with GPU acceleration (CUDA) in PyTorch',
        'Implement self-attention and multi-head attention mechanisms from scratch',
        'Fine-tune vision models (ResNet/ViT) for custom image classification'
      ],
      projectIdeas: [
        'Deep Semantic Image Search Engine with Embeddings'
      ],
      completed: false
    },
    {
      id: 'stage-7',
      stageNumber: 7,
      title: 'AI Projects & LLM Engineering',
      description: 'Engineer production-grade LLM applications, RAG pipelines, vector search, and agentic workflows.',
      estimatedDuration: '3 Weeks',
      learningResources: [
        { title: 'DeepLearning.AI LangChain & LlamaIndex Courses', type: 'Course', url: 'https://deeplearning.ai' },
        { title: 'Pinecone Vector Architecture Guide', type: 'Docs', url: 'https://pinecone.io' }
      ],
      practicalTasks: [
        'Build chunking and embedding pipelines connected to a vector database',
        'Implement hybrid keyword/dense vector retrieval with reranking',
        'Deploy guardrails preventing hallucination and prompt injection'
      ],
      projectIdeas: [
        'Enterprise RAG Knowledge Assistant with Real-Time Citations'
      ],
      completed: false
    },
    {
      id: 'stage-8',
      stageNumber: 8,
      title: 'Portfolio & Public Showcase',
      description: 'Package your projects into high-polish public repositories, write engineering case studies, and deploy demos.',
      estimatedDuration: '2 Weeks',
      learningResources: [
        { title: 'GitHub Developer Showcase Guide', type: 'Docs', url: 'https://github.com' },
        { title: 'Vercel Deployment Best Practices', type: 'Docs', url: 'https://vercel.com/docs' }
      ],
      practicalTasks: [
        'Write READMEs with architecture diagrams, setup guides, and live demo links',
        'Set up automated GitHub Actions CI tests on every pull request',
        'Deploy public web demonstrations on Vercel or Hugging Face Spaces'
      ],
      projectIdeas: [
        'Live Interactive Portfolio with AI Project Playgrounds'
      ],
      completed: false
    },
    {
      id: 'stage-9',
      stageNumber: 9,
      title: 'Internship Preparation & Interview Coach',
      description: 'Tailor ATS-friendly resumes, practice technical interview coding challenges, and rehearse behavioral questions.',
      estimatedDuration: '2 Weeks',
      learningResources: [
        { title: 'Cracking the Coding Interview & System Design Primer', type: 'Guide', url: 'https://github.com/donnemartin/system-design-primer' },
        { title: 'CareerPilot AI Mock Interview Coach', type: 'Internal Tool', url: '#interview' }
      ],
      practicalTasks: [
        'Generate customized resume variants tailored to target job descriptions',
        'Complete 10 mock interviews in the CareerPilot AI Interview Coach',
        'Submit 20 tailored internship applications to vetted listings'
      ],
      projectIdeas: [
        'Targeted Internship Application Pipeline & Tracking Tracker'
      ],
      completed: false
    }
  ]
};

export const INTERVIEW_QUESTIONS = [
  {
    id: 'q-tech-1',
    category: 'Technical',
    domain: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    question: 'Explain the difference between L1 and L2 regularization in machine learning. How do they affect the model weights mathematically and practically?',
    hint: 'Think about sparsity, absolute values vs squares, and derivative behavior around zero.'
  },
  {
    id: 'q-tech-2',
    category: 'Technical',
    domain: 'AI & Machine Learning',
    difficulty: 'Advanced',
    question: 'How does the Attention mechanism in Transformers work? Why did it replace recurrence (RNNs/LSTMs) for sequential language processing?',
    hint: 'Discuss Query, Key, Value vectors, parallel training, and the vanishing gradient bottleneck.'
  },
  {
    id: 'q-tech-3',
    category: 'Technical',
    domain: 'Full-Stack Development',
    difficulty: 'Intermediate',
    question: 'What happens under the hood when a user visits a web application URL? Detail DNS resolution, TCP handshake, TLS negotiation, and DOM rendering.',
    hint: 'Walk through networking layers first, then the browser critical rendering path.'
  },
  {
    id: 'q-hr-1',
    category: 'HR & Behavioral',
    domain: 'General Engineering',
    difficulty: 'Foundational',
    question: 'Tell me about a time you encountered a severe roadblock in a software project or academic assignment. How did you diagnose the issue and find a resolution?',
    hint: 'Use the STAR method: Situation, Task, Action, and quantified Result.'
  },
  {
    id: 'q-hr-2',
    category: 'HR & Behavioral',
    domain: 'General Engineering',
    difficulty: 'Foundational',
    question: 'Describe a situation where you had to collaborate with a teammate who had a fundamentally different technical opinion or work style. How did you navigate the compromise?',
    hint: 'Focus on empathy, objective benchmarks, and keeping the project goal central.'
  },
  {
    id: 'q-career-1',
    category: 'Career-Specific',
    domain: 'AI Engineer',
    difficulty: 'Advanced',
    question: 'If you were designing a Retrieval-Augmented Generation (RAG) system for a sensitive enterprise domain (e.g. Healthcare or Legal), how would you minimize hallucinations and guarantee citation accuracy?',
    hint: 'Address embedding quality, hybrid search, rerankers, prompt constraints, and validation guardrails.'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How does CareerPilot AI differ from generic chat assistants like ChatGPT?',
    answer: 'CareerPilot AI is an interconnected career operating system. Rather than answering isolated questions, it synthesizes your academic background, current skill inventory, and goals into a dynamic digital twin. It continuously recalculates your progress based on actual completed milestones and connects directly to Google Sheets via automated Zapier webhooks.'
  },
  {
    question: 'How does the Google Sheets and Zapier integration work?',
    answer: 'CareerPilot AI emits structured application events (Registration, Career Assessment, Roadmap Generated, Milestone Completed, Internship Saved) to a configurable Zapier Webhook. In Zapier, a Catch Hook receives each payload and creates or updates rows across 8 dedicated Google Sheets tabs. You maintain full data sovereignty without paid database infrastructure.'
  },
  {
    question: 'Are my passwords and API keys secure?',
    answer: 'Yes. CareerPilot AI follows strict security architecture: Gemini API keys and Zapier secrets are strictly maintained server-side in Vercel Serverless Functions and never leaked to the browser. Furthermore, client-side demo authentication hashes credentials via SHA-256 before session creation—no plaintext passwords are ever stored or sent to Google Sheets.'
  },
  {
    question: 'How are roadmap progress percentages calculated?',
    answer: 'Progress is calculated strictly from verified, completed milestone tasks (e.g., 2 stages completed out of 9 = 22.2%). We never generate fake or arbitrary progress percentages, giving you an honest measurement of your career readiness.'
  },
  {
    question: 'Can I export my resume created in the Resume Builder?',
    answer: 'Yes! CareerPilot AI features an ATS-optimized live resume generator. You can use Gemini AI to generate impactful, metric-driven summary statements and bullet points, edit all fields live, and export directly as an ATS-compliant PDF.'
  }
];

export const PRICING_TIERS = [
  {
    name: 'Student Explorer',
    price: '$0',
    frequency: 'Always Free',
    tagline: 'Everything you need to discover your potential and build your roadmap.',
    popular: false,
    features: [
      'Personalized AI Career Assessment (5 career paths)',
      'Dynamic 8-Stage Learning Roadmap',
      'Interactive Milestone Completion Tracker',
      'AI Career Mentor Chat (powered by Gemini API)',
      'Basic Skill Gap Analysis matrix',
      'Google Sheets & Zapier sync integration',
      'Vetted demo internship board access'
    ],
    cta: 'Start Free Journey',
    buttonVariant: 'secondary'
  },
  {
    name: 'Career Pro',
    price: '$12',
    frequency: 'per month',
    tagline: 'Accelerate your career with advanced AI feedback and resume tools.',
    popular: true,
    badge: 'Most Popular',
    features: [
      'Everything in Student Explorer',
      'Unlimited Gemini AI Career Mentor queries',
      'Interactive Mock Interview Coach with AI scoring',
      'ATS Resume Builder with live PDF export',
      'Custom Milestone generation & editing',
      'Priority Zapier Webhook sync & event logging',
      'Application tracking & internship reminders'
    ],
    cta: 'Get Started with Pro',
    buttonVariant: 'primary'
  },
  {
    name: 'University & Campus',
    price: 'Custom',
    frequency: 'Institution Pricing',
    tagline: 'Empower entire engineering cohorts with enterprise career guidance.',
    popular: false,
    features: [
      'Everything in Career Pro',
      'University-wide Google Sheets & Zapier tenant',
      'Cohort-level skill analytics & placement metrics',
      'Faculty & career advisor supervisor portal',
      'Custom university curriculum roadmap templates',
      'Dedicated SLA & integration support'
    ],
    cta: 'Contact Campus Relations',
    buttonVariant: 'secondary'
  }
];
