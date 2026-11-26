// Career Context for CareerPilot AI
// Central state management for Career Development, Real-Time Progress,
// Milestones, AI Assessment, Internships, Resume, and Zapier Event Dispatching.

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { DEFAULT_ROADMAP, DEMO_INTERNSHIPS } from '../data/mockData';
import { apiService } from '../services/apiService';
import { useAuth } from './AuthContext';

const CareerContext = createContext(null);

const STORAGE_ROADMAP_KEY = 'careerpilot_roadmap_v1';
const STORAGE_INTERNSHIPS_KEY = 'careerpilot_saved_internships_v1';
const STORAGE_ASSESSMENT_KEY = 'careerpilot_latest_assessment_v1';
const STORAGE_RESUME_KEY = 'careerpilot_resume_v1';
const STORAGE_CHAT_KEY = 'careerpilot_chat_history_v1';

export function CareerProvider({ children }) {
  const { user, updateProfile } = useAuth();

  // Roadmap State
  const [roadmap, setRoadmap] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ROADMAP_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_ROADMAP;
    } catch {
      return DEFAULT_ROADMAP;
    }
  });

  // Saved Internships State
  const [savedInternships, setSavedInternships] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_INTERNSHIPS_KEY);
      return saved ? JSON.parse(saved) : [DEMO_INTERNSHIPS[0]];
    } catch {
      return [DEMO_INTERNSHIPS[0]];
    }
  });

  // Latest Career Assessment State
  const [assessmentResult, setAssessmentResult] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ASSESSMENT_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Resume State
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_RESUME_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return {
      fullName: user?.name || 'Alex Chen',
      email: user?.email || 'alex.chen@university.edu',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/alexchen-tech',
      github: 'github.com/alexchen',
      portfolio: 'alexchen.dev',
      targetRole: user?.selectedCareer || 'AI & Machine Learning Engineer',
      summary: 'High-performing Computer Science student with proven foundation in machine learning, PyTorch, and distributed microservices. Creator of open-source AI tooling with focus on low-latency inference pipelines.',
      education: [
        {
          id: 'edu-1',
          school: 'University Institute of Technology',
          degree: 'Bachelor of Technology in Computer Science',
          dates: '2024 - Present',
          gpa: '3.89 / 4.0',
          highlights: 'Dean’s Honor List, Lead of AI & Robotics Student Chapter'
        }
      ],
      skills: ['Python', 'PyTorch', 'TypeScript', 'React', 'Docker', 'FastAPI', 'SQL', 'Git', 'Linux'],
      projects: [
        {
          id: 'proj-1',
          title: 'Distributed RAG Knowledge Assistant',
          technologies: 'Python, Pinecone, FastAPI, Docker',
          date: '2026',
          description: 'Engineered an enterprise RAG assistant indexing 40,000+ technical documents. Optimized vector query latency by 45% using hybrid dense/sparse retrieval and Cohere reranking.'
        },
        {
          id: 'proj-2',
          title: 'Real-Time Inference Telemetry Dashboard',
          technologies: 'React, Tailwind CSS, WebSockets, Prometheus',
          date: '2026',
          description: 'Constructed responsive monitoring dashboard displaying model latency rollups, token throughput, and automated drift alerts with sub-second WebSocket updates.'
        }
      ],
      experience: [
        {
          id: 'exp-1',
          company: 'Applied AI Innovation Lab',
          role: 'Undergraduate Research Assistant',
          dates: 'June 2026 - Present',
          description: 'Benchmarked transformer model fine-tuning with LoRA on limited-GPU clusters, achieving 94% accuracy parity with 60% reduced memory footprint.'
        }
      ]
    };
  });

  // AI Chat History State
  const [chatHistory, setChatHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CHAT_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return [
      {
        id: 'msg-welcome',
        role: 'model',
        content: `Welcome to **CareerPilot AI**! I am your AI Career Mentor. I've analyzed your academic profile targeting **${user?.selectedCareer || 'AI Engineer'}**. Ask me anything—from what projects to build next to interview preparation!`,
        timestamp: new Date().toISOString()
      }
    ];
  });

  // Persist State Changes
  useEffect(() => {
    localStorage.setItem(STORAGE_ROADMAP_KEY, JSON.stringify(roadmap));
  }, [roadmap]);

  useEffect(() => {
    localStorage.setItem(STORAGE_INTERNSHIPS_KEY, JSON.stringify(savedInternships));
  }, [savedInternships]);

  useEffect(() => {
    if (assessmentResult) {
      localStorage.setItem(STORAGE_ASSESSMENT_KEY, JSON.stringify(assessmentResult));
    }
  }, [assessmentResult]);

  useEffect(() => {
    localStorage.setItem(STORAGE_RESUME_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(chatHistory));
  }, [chatHistory]);

  // CRITICAL REQUIREMENT: Calculate progress strictly using actual completed tasks.
  // NEVER generate arbitrary progress percentages!
  const progressMetrics = useMemo(() => {
    const stages = roadmap?.stages || [];
    const totalStages = stages.length;
    if (totalStages === 0) {
      return { completedCount: 0, totalCount: 0, percentage: 0 };
    }
    const completedCount = stages.filter(s => s.completed || s.completionStatus === 'completed').length;
    const percentage = Math.round((completedCount / totalStages) * 100);
    return {
      completedCount,
      totalCount: totalStages,
      percentage
    };
  }, [roadmap]);

  /**
   * Toggle a milestone completion status
   * Triggers celebration confetti on completion + dispatches EVENT 4 to Zapier -> Google Sheets
   */
  const toggleMilestone = async (stageId) => {
    const stage = roadmap.stages.find(s => s.id === stageId);
    if (!stage) return;

    const willBeCompleted = !(stage.completed || stage.completionStatus === 'completed');

    const updatedStages = roadmap.stages.map(s => {
      if (s.id === stageId) {
        return {
          ...s,
          completed: willBeCompleted,
          completionStatus: willBeCompleted ? 'completed' : 'in_progress',
          completedAt: willBeCompleted ? new Date().toISOString() : null
        };
      }
      return s;
    });

    const newCompletedCount = updatedStages.filter(s => s.completed || s.completionStatus === 'completed').length;
    const newPercentage = Math.round((newCompletedCount / updatedStages.length) * 100);

    setRoadmap(prev => ({
      ...prev,
      stages: updatedStages
    }));

    if (willBeCompleted) {
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366F1', '#A855F7', '#38BDF8', '#10B981']
        });
      } catch (e) {
        // Fallback gracefully
      }

      // Dispatch EVENT 4: Milestone Completed to Zapier Webhook -> Google Sheets (Milestone Progress tab)
      await apiService.saveProgress('MILESTONE_COMPLETED', user, {
        milestoneId: stage.id,
        milestoneTitle: stage.title,
        stageNumber: stage.stageNumber,
        targetCareer: roadmap.targetCareer,
        completedTasksCount: newCompletedCount,
        actualProgressPercentage: newPercentage
      }, user?.consentToSync ?? true);
    }
  };

  /**
   * Add a custom milestone
   */
  const addCustomMilestone = (milestoneData) => {
    const newStage = {
      id: `custom-stage-${Date.now()}`,
      stageNumber: (roadmap.stages.length || 0) + 1,
      title: milestoneData.title || 'Specialized Topic Milestone',
      description: milestoneData.description || 'Hands-on practical exploration and verification tasks.',
      estimatedDuration: milestoneData.estimatedDuration || '2 Weeks',
      learningResources: milestoneData.learningResources || [
        { title: 'Official Documentation & Guides', type: 'Docs', url: 'https://github.com' }
      ],
      practicalTasks: milestoneData.practicalTasks || [
        'Complete deep dive implementation',
        'Verify architecture with integration tests'
      ],
      projectIdeas: milestoneData.projectIdeas || [
        'Custom production demonstrator'
      ],
      completed: false,
      completionStatus: 'not_started'
    };

    setRoadmap(prev => ({
      ...prev,
      stages: [...prev.stages, newStage]
    }));
  };

  /**
   * Edit an existing milestone
   */
  const updateMilestone = (stageId, updates) => {
    setRoadmap(prev => ({
      ...prev,
      stages: prev.stages.map(s => s.id === stageId ? { ...s, ...updates } : s)
    }));
  };

  /**
   * Regenerate Roadmap with AI for target career
   * Dispatches EVENT 3: Roadmap Generated to Zapier -> Google Sheets
   */
  const regenerateRoadmap = async (targetCareerTitle) => {
    const careerToUse = targetCareerTitle || user?.selectedCareer || 'AI Engineer';
    const result = await apiService.generateRoadmap(user, careerToUse, {}, user?.consentToSync ?? true);

    if (result.success && result.roadmap) {
      setRoadmap(result.roadmap);
      return result.roadmap;
    }
    return null;
  };

  /**
   * Save an internship bookmark
   * Dispatches EVENT 5: Internship Saved to Zapier -> Google Sheets
   */
  const saveInternship = async (internship) => {
    if (savedInternships.some(item => item.id === internship.id)) {
      return { alreadySaved: true };
    }

    const updated = [internship, ...savedInternships];
    setSavedInternships(updated);

    // Dispatch EVENT 5: Internship Saved to Zapier Webhook -> Google Sheets (Saved Internships tab)
    await apiService.saveProgress('INTERNSHIP_SAVED', user, {
      internshipId: internship.id,
      title: internship.title,
      company: internship.company,
      location: internship.location,
      domain: internship.domain,
      stipend: internship.stipend
    }, user?.consentToSync ?? true);

    return { success: true };
  };

  /**
   * Remove saved internship
   */
  const removeSavedInternship = (internshipId) => {
    setSavedInternships(prev => prev.filter(item => item.id !== internshipId));
  };

  /**
   * Run AI Career Assessment
   * Dispatches EVENT 2: Career Assessment to Zapier -> Google Sheets
   */
  const runAssessment = async (answers = {}) => {
    const result = await apiService.runCareerAssessment(user, answers, user?.consentToSync ?? true);
    if (result.success && result.assessment) {
      setAssessmentResult(result.assessment);
      return result.assessment;
    }
    return null;
  };

  /**
   * Save Selected Career
   */
  const saveSelectedCareer = async (careerTitle) => {
    updateProfile({ selectedCareer: careerTitle });
    await regenerateRoadmap(careerTitle);
  };

  /**
   * Send a chat message to Gemini AI Mentor
   */
  const sendChatMessage = async (userPrompt) => {
    const userMsg = {
      id: `msg_u_${Date.now()}`,
      role: 'user',
      content: userPrompt,
      timestamp: new Date().toISOString()
    };

    const newHistory = [...chatHistory, userMsg];
    setChatHistory(newHistory);

    const response = await apiService.sendAiPrompt('chat', userPrompt, user, newHistory);

    const botMsg = {
      id: `msg_b_${Date.now()}`,
      role: 'model',
      content: response.reply || 'Here are my strategic thoughts on your career roadmap...',
      timestamp: new Date().toISOString()
    };

    setChatHistory([...newHistory, botMsg]);
    return botMsg;
  };

  /**
   * Clear Chat History
   */
  const clearChatHistory = () => {
    const resetHistory = [
      {
        id: 'msg-welcome',
        role: 'model',
        content: `Chat history reset. How can I guide your journey toward **${user?.selectedCareer || 'AI Engineer'}** today?`,
        timestamp: new Date().toISOString()
      }
    ];
    setChatHistory(resetHistory);
    localStorage.removeItem(STORAGE_CHAT_KEY);
  };

  return (
    <CareerContext.Provider
      value={{
        roadmap,
        progressMetrics,
        toggleMilestone,
        addCustomMilestone,
        updateMilestone,
        regenerateRoadmap,
        savedInternships,
        saveInternship,
        removeSavedInternship,
        assessmentResult,
        runAssessment,
        saveSelectedCareer,
        resumeData,
        setResumeData,
        chatHistory,
        sendChatMessage,
        clearChatHistory
      }}
    >
      {children}
    </CareerContext.Provider>
  );
}

export function useCareer() {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
}
