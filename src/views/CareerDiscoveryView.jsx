import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Layers,
  Award,
  BookOpen,
  DollarSign,
  Briefcase,
  Columns,
  X,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export default function CareerDiscoveryView() {
  const {
    studentProfile,
    careerRecommendations,
    runCareerAssessment,
    isAssessing,
    generateRoadmap,
    setStudentProfile,
    setActiveTab,
    showToast
  } = useApp();

  const [selectedCareerDetail, setSelectedCareerDetail] = useState(null);
  const [comparingCareers, setComparingCareers] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // If no recommendations exist yet, run assessment or use current profile
  const handleTriggerAssessment = async () => {
    await runCareerAssessment(studentProfile);
  };

  const handleSelectCareer = async (career) => {
    setStudentProfile(prev => ({ ...prev, targetCareer: career.title }));
    showToast('Active Career Selected', `Set target to ${career.title}. Generating curriculum roadmap...`, 'success');
    await generateRoadmap(career.title);
    setActiveTab('roadmap');
  };

  const toggleCompare = (career) => {
    if (comparingCareers.some(c => c.id === career.id)) {
      setComparingCareers(prev => prev.filter(c => c.id !== career.id));
    } else {
      if (comparingCareers.length >= 3) {
        showToast('Limit Reached', 'You can compare up to 3 career paths simultaneously.', 'info');
        return;
      }
      setComparingCareers(prev => [...prev, career]);
    }
  };

  const paths = careerRecommendations.length > 0 ? careerRecommendations : [
    {
      id: 'path-ai-eng',
      title: 'AI & Machine Learning Engineer',
      category: 'Artificial Intelligence & ML',
      matchScore: 96,
      description: 'Design and deploy state-of-the-art predictive models, generative AI applications, and intelligent agent systems at scale.',
      requiredTechnicalSkills: ['Python', 'PyTorch / TensorFlow', 'Vector Databases (Pinecone)', 'FastAPI', 'Docker', 'Transformer Architectures'],
      requiredSoftSkills: ['Analytical Rigor', 'Systems Thinking', 'Technical Communication', 'Problem Solving'],
      learningRecommendations: [
        'Complete deep neural network implementations from scratch',
        'Master LangChain, LlamaIndex, and fine-tuning open-weights models',
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

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Assessment Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Career Discovery & Pathways</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dynamic AI assessment synthesizing 5 calibrated pathways matched to your strengths and goals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {comparingCareers.length > 0 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all flex items-center gap-2"
            >
              <Columns className="w-4 h-4 text-purple-400" />
              <span>Compare Selected ({comparingCareers.length})</span>
            </button>
          )}

          <button
            onClick={handleTriggerAssessment}
            disabled={isAssessing}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-600 hover:from-sky-500 hover:to-indigo-700 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAssessing ? 'animate-spin' : ''}`} />
            <span>{isAssessing ? 'Generating with Gemini...' : 'Re-Run Assessment'}</span>
          </button>
        </div>
      </div>

      {/* 5 Career Paths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((career, idx) => {
          const isCurrentActive = studentProfile.targetCareer === career.title;
          const isComparing = comparingCareers.some(c => c.id === career.id);

          return (
            <div
              key={career.id || idx}
              className={`p-6 rounded-3xl glass-panel border transition-all duration-300 flex flex-col justify-between relative group ${
                isCurrentActive
                  ? 'border-indigo-500/60 bg-gradient-to-b from-indigo-950/40 to-[#0F0F1E] shadow-glow-md'
                  : 'border-white/10 hover:border-indigo-500/30'
              }`}
            >
              {isCurrentActive && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  ★ Active Target Career
                </div>
              )}

              <div>
                {/* Header: Score & Category */}
                <div className="flex items-center justify-between mb-3 mt-1">
                  <span className="text-[11px] font-semibold text-slate-400">{career.category}</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{career.matchScore}% Match</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {career.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {career.description}
                </p>

                {/* Salary & Demand preview */}
                <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Avg Salary</span>
                    <span className="font-semibold text-white">{career.salaryRange}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-sky-400" /> Market Demand</span>
                    <span className="font-semibold text-sky-300">High Growth</span>
                  </div>
                </div>

                {/* Technical Skills Preview */}
                <div className="mt-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Key Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {career.requiredTechnicalSkills.slice(0, 4).map((skill) => (
                      <span key={skill} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                        {skill}
                      </span>
                    ))}
                    {career.requiredTechnicalSkills.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-slate-500">
                        +{career.requiredTechnicalSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCareerDetail(career)}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold transition-colors text-center"
                  >
                    Deep Dive Details
                  </button>
                  <button
                    onClick={() => toggleCompare(career)}
                    className={`p-2 rounded-xl border text-xs transition-colors ${
                      isComparing
                        ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                        : 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                    title={isComparing ? 'Remove from comparison' : 'Add to compare'}
                  >
                    <Columns className="w-4 h-4" />
                  </button>
                </div>

                {!isCurrentActive ? (
                  <button
                    onClick={() => handleSelectCareer(career)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Set as Active Career & Generate Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="py-2 text-center text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Currently Active Roadmap</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive Career Modal */}
      {selectedCareerDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCareerDetail(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-1">
              <span>{selectedCareerDetail.category}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">{selectedCareerDetail.matchScore}% Student Match</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{selectedCareerDetail.title}</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">{selectedCareerDetail.description}</p>

            <div className="mt-6 space-y-5">
              {/* Technical & Soft Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">Required Technical Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCareerDetail.requiredTechnicalSkills.map(s => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Essential Soft Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCareerDetail.requiredSoftSkills.map(s => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learning Recommendations */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">AI Learning Recommendations</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedCareerDetail.learningRecommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Capstone Projects */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Recommended Capstone Projects</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedCareerDetail.relevantProjects.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Industry Outlook & Alternatives */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Industry Outlook</span>
                  <p className="text-slate-300 leading-relaxed">{selectedCareerDetail.industryOpportunities}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Alternative Careers</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedCareerDetail.alternativeCareers.map(ac => (
                      <span key={ac} className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-300">
                        {ac}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCareerDetail(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSelectCareer(selectedCareerDetail);
                  setSelectedCareerDetail(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md flex items-center gap-2"
              >
                <span>Select & Switch Target</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-5xl glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Side-by-Side Career Comparison</h3>
                <p className="text-xs text-slate-400 mt-0.5">Evaluating {comparingCareers.length} selected career paths</p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparingCareers.map(c => (
                <div key={c.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-400">{c.matchScore}% Match</span>
                    <h4 className="text-base font-bold text-white mt-1">{c.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-2">{c.salaryRange}</p>

                    <div className="mt-4 pt-3 border-t border-white/10">
                      <span className="text-[10px] font-bold text-sky-400 uppercase">Top Skills</span>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {c.requiredTechnicalSkills.slice(0, 4).map(s => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10">
                      <span className="text-[10px] font-bold text-purple-400 uppercase">Flagship Project Idea</span>
                      <p className="text-xs text-slate-300 mt-1">{c.relevantProjects[0]}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleSelectCareer(c);
                      setIsCompareModalOpen(false);
                    }}
                    className="mt-6 w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
                  >
                    Select This Career
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
