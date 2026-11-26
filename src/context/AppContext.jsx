import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const STORAGE_KEY_USER = 'careerpilot_user';
const STORAGE_KEY_PROFILE = 'careerpilot_profile';
const STORAGE_KEY_ROADMAP = 'careerpilot_roadmap';
const STORAGE_KEY_INTERNSHIPS = 'careerpilot_saved_internships';
const STORAGE_KEY_INTEGRATION = 'careerpilot_integration';

// Default initial student profile
const DEFAULT_STUDENT_PROFILE = {
  fullName: 'Alex Chen',
  email: 'alex.chen@university.edu',
  educationLevel: 'Bachelor of Science (Undergraduate)',
  course: 'Computer Science & Artificial Intelligence',
  academicYear: '3rd Year (Junior)',
  interests: ['Machine Learning', 'Full-Stack Engineering', 'Distributed Systems', 'Agentic Workflows'],
  skills: ['Python', 'JavaScript', 'React', 'Git', 'SQL', 'Docker Fundamentals'],
  preferredDomain: 'Artificial Intelligence & Cloud Architecture',
  careerGoals: 'Secure a high-impact AI/ML engineering internship at an innovative tech company or fast-growing AI startup.',
  weeklyAvailability: '15',
  targetCareer: 'AI & Machine Learning Engineer',
  consentToStore: true
};

export function AppProvider({ children }) {
  // Navigation State
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Student Career Profile
  const [studentProfile, setStudentProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : DEFAULT_STUDENT_PROFILE;
    } catch {
      return DEFAULT_STUDENT_PROFILE;
    }
  });

  // Career Assessment Recommendations
  const [careerRecommendations, setCareerRecommendations] = useState([]);
  const [isAssessing, setIsAssessing] = useState(false);

  // Roadmap & Milestones
  const [roadmap, setRoadmap] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ROADMAP);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);

  // Saved Internships
  const [savedInternships, setSavedInternships] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INTERNSHIPS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'int-1',
          title: 'AI Software Engineer Intern',
          company: 'Anthropic Labs (Partner Demo)',
          location: 'San Francisco, CA (Hybrid)',
          type: 'Full-time / Summer 2027',
          stipend: '$55 - $70 / hr',
          domain: 'Artificial Intelligence',
          status: 'Applied',
          savedDate: '2026-11-20'
        },
        {
          id: 'int-2',
          title: 'Machine Learning Research Intern',
          company: 'DeepMind Technologies (Partner Demo)',
          location: 'London, UK / Remote',
          type: 'Full-time Internship',
          stipend: '£3,800 / month',
          domain: 'Machine Learning & Robotics',
          status: 'Interviewing',
          savedDate: '2026-11-22'
        }
      ];
    } catch {
      return [];
    }
  });

  // Integration Settings & Webhook Logs
  const [integrationSettings, setIntegrationSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INTEGRATION);
      return saved ? JSON.parse(saved) : {
        customWebhookUrl: '',
        consentToStore: true,
        autoSyncEvents: true
      };
    } catch {
      return { customWebhookUrl: '', consentToStore: true, autoSyncEvents: true };
    }
  });

  const [integrationLogs, setIntegrationLogs] = useState([]);
  const [isSyncingWebhook, setIsSyncingWebhook] = useState(false);
  const [notification, setNotification] = useState(null);

  // Persist states to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    if (roadmap) {
      localStorage.setItem(STORAGE_KEY_ROADMAP, JSON.stringify(roadmap));
    }
  }, [roadmap]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INTERNSHIPS, JSON.stringify(savedInternships));
  }, [savedInternships]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INTEGRATION, JSON.stringify(integrationSettings));
  }, [integrationSettings]);

  // Initial load: Fetch initial roadmap if none exists
  useEffect(() => {
    if (!roadmap) {
      generateRoadmap(studentProfile.targetCareer || 'AI & Machine Learning Engineer');
    }
    fetchWebhookStatus();
  }, []);

  const showToast = (title, message, type = 'info') => {
    setNotification({ title, message, type, id: Date.now() });
    setTimeout(() => setNotification(null), 4500);
  };

  // Auth Operations
  const login = async (email, password) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      setUser(data.user);
      setStudentProfile(prev => ({ ...prev, email: data.user.email, fullName: data.user.fullName }));
      showToast('Welcome back!', `Signed in as ${data.user.email}`, 'success');
      setIsAuthModalOpen(false);
      return true;
    } catch (err) {
      showToast('Authentication Error', err.message, 'error');
      return false;
    }
  };

  const register = async (email, password, fullName) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          email,
          password,
          fullName,
          consentToStore: integrationSettings.consentToStore,
          customWebhookUrl: integrationSettings.customWebhookUrl
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setUser(data.user);
      setStudentProfile(prev => ({ ...prev, email: data.user.email, fullName: data.user.fullName }));
      showToast('Account Created', 'Registration successful! Complete your onboarding.', 'success');
      setIsAuthModalOpen(false);
      setIsOnboardingOpen(true);
      return true;
    } catch (err) {
      showToast('Registration Error', err.message, 'error');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    showToast('Signed Out', 'You have been logged out securely.', 'info');
  };

  // Roadmap Operations
  const generateRoadmap = async (targetCareer) => {
    setIsGeneratingRoadmap(true);
    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetCareer: targetCareer || studentProfile.targetCareer,
          currentSkills: studentProfile.skills,
          weeklyAvailability: studentProfile.weeklyAvailability,
          studentProfile,
          customWebhookUrl: integrationSettings.customWebhookUrl
        })
      });

      const data = await res.json();
      if (res.ok && data.roadmap) {
        setRoadmap(data.roadmap);
        setStudentProfile(prev => ({ ...prev, targetCareer }));
        if (data.webhook?.log) {
          setIntegrationLogs(prev => [data.webhook.log, ...prev.slice(0, 19)]);
        }
        showToast('Roadmap Updated', `Generated personalized roadmap for ${targetCareer}`, 'success');
      }
    } catch (err) {
      console.error('Error generating roadmap:', err);
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  // Mark milestone completed or in-progress
  const toggleMilestone = async (milestoneId) => {
    if (!roadmap || !roadmap.milestones) return;

    const targetMilestone = roadmap.milestones.find(m => m.id === milestoneId);
    if (!targetMilestone) return;

    const willBeCompleted = !targetMilestone.completed;
    const completionTimestamp = willBeCompleted ? new Date().toISOString() : null;

    const updatedMilestones = roadmap.milestones.map(m => {
      if (m.id === milestoneId) {
        return { ...m, completed: willBeCompleted, completedAt: completionTimestamp };
      }
      return m;
    });

    const completedCount = updatedMilestones.filter(m => m.completed).length;
    const totalMilestones = updatedMilestones.length;

    const updatedRoadmap = {
      ...roadmap,
      milestones: updatedMilestones
    };

    setRoadmap(updatedRoadmap);

    if (willBeCompleted) {
      // Trigger confetti celebration dynamically if loaded
      if (typeof window !== 'undefined' && window.confetti) {
        window.confetti({ particleCount: 75, spread: 60, origin: { y: 0.7 } });
      }

      // Dispatch EVENT 4 to backend and Zapier Webhook
      try {
        const res = await fetch('/api/save-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'milestone_completed',
            payload: {
              milestoneId,
              milestoneTitle: targetMilestone.title,
              targetCareer: roadmap.targetCareer,
              completedAt: completionTimestamp,
              studentEmail: studentProfile.email,
              studentName: studentProfile.fullName,
              totalMilestones,
              completedCount
            },
            customWebhookUrl: integrationSettings.customWebhookUrl
          })
        });

        const data = await res.json();
        if (data.webhook?.log) {
          setIntegrationLogs(prev => [data.webhook.log, ...prev.slice(0, 19)]);
        }
        showToast('Milestone Achieved!', `Progress: ${Math.round((completedCount / totalMilestones) * 100)}% completed`, 'success');
      } catch (err) {
        console.error('Error saving milestone progress:', err);
      }
    }
  };

  const addCustomMilestone = (newMilestone) => {
    if (!roadmap) return;
    const id = `custom-ms-${Date.now()}`;
    const milestoneItem = {
      id,
      stageNumber: (roadmap.milestones?.length || 0) + 1,
      stageName: newMilestone.stageName || 'Specialized Milestone',
      title: newMilestone.title,
      description: newMilestone.description,
      estimatedDuration: newMilestone.duration || '2 Weeks',
      practicalTasks: newMilestone.tasks || ['Implement custom module', 'Document results in README'],
      projectIdeas: newMilestone.project || 'Custom integration project',
      learningResources: [
        { title: 'Project Documentation', url: 'https://github.com', type: 'Documentation' }
      ],
      completed: false,
      completedAt: null
    };

    const updated = {
      ...roadmap,
      milestones: [...(roadmap.milestones || []), milestoneItem]
    };
    setRoadmap(updated);
    showToast('Custom Milestone Added', milestoneItem.title, 'success');
  };

  // Career Assessment Handler
  const runCareerAssessment = async (profileData) => {
    setIsAssessing(true);
    try {
      const mergedProfile = { ...studentProfile, ...profileData };
      setStudentProfile(mergedProfile);

      const res = await fetch('/api/career-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentProfile: mergedProfile,
          customWebhookUrl: integrationSettings.customWebhookUrl
        })
      });

      const data = await res.json();
      if (res.ok && data.recommendations) {
        setCareerRecommendations(data.recommendations);
        if (data.webhook?.log) {
          setIntegrationLogs(prev => [data.webhook.log, ...prev.slice(0, 19)]);
        }
        showToast('Assessment Complete', `Generated 5 tailored career paths powered by ${data.isLiveGemini ? 'Gemini 1.5 Flash' : 'CareerPilot AI'}`, 'success');
        return data.recommendations;
      }
    } catch (err) {
      showToast('Assessment Error', err.message, 'error');
    } finally {
      setIsAssessing(false);
    }
    return null;
  };

  // Internships
  const toggleSaveInternship = async (internship) => {
    const isAlreadySaved = savedInternships.some(item => item.id === internship.id);

    if (isAlreadySaved) {
      setSavedInternships(prev => prev.filter(item => item.id !== internship.id));
      showToast('Opportunity Removed', `Removed ${internship.title} from saved list`, 'info');
    } else {
      const newEntry = { ...internship, savedDate: new Date().toISOString().split('T')[0], status: 'Saved' };
      setSavedInternships(prev => [newEntry, ...prev]);

      // EVENT 5: Internship Saved
      try {
        const res = await fetch('/api/save-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'internship_saved',
            payload: {
              internshipId: internship.id,
              jobTitle: internship.title,
              company: internship.company,
              location: internship.location,
              employmentType: internship.type,
              studentEmail: studentProfile.email,
              studentName: studentProfile.fullName
            },
            customWebhookUrl: integrationSettings.customWebhookUrl
          })
        });
        const data = await res.json();
        if (data.webhook?.log) {
          setIntegrationLogs(prev => [data.webhook.log, ...prev.slice(0, 19)]);
        }
        showToast('Internship Bookmarked', `Saved ${internship.title} at ${internship.company}`, 'success');
      } catch (err) {
        console.error('Save internship error:', err);
      }
    }
  };

  const updateInternshipStatus = (id, newStatus) => {
    setSavedInternships(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    showToast('Status Updated', `Application status changed to ${newStatus}`, 'info');
  };

  // Fetch Webhook Integration status
  const fetchWebhookStatus = async () => {
    try {
      const res = await fetch('/api/webhook');
      if (res.ok) {
        const data = await res.json();
        if (data.recentLogs && data.recentLogs.length > 0) {
          setIntegrationLogs(data.recentLogs);
        }
      }
    } catch (err) {
      // silent fallback in dev
    }
  };

  // Trigger test webhook
  const triggerTestWebhook = async (testUrl) => {
    setIsSyncingWebhook(true);
    try {
      const targetUrl = testUrl || integrationSettings.customWebhookUrl;
      const res = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'Integration Test Ping',
          payload: {
            student: studentProfile.fullName,
            email: studentProfile.email,
            testTime: new Date().toISOString(),
            message: 'CareerPilot AI to Google Sheets handshake verification'
          },
          customWebhookUrl: targetUrl
        })
      });

      const data = await res.json();
      if (data.log) {
        setIntegrationLogs(prev => [data.log, ...prev]);
      }

      if (data.delivered) {
        showToast('Webhook Delivered!', 'Zapier received the test event successfully (Status 200).', 'success');
      } else if (!data.configured) {
        showToast('Validation Success', 'Payload valid. Configure ZAPIER_WEBHOOK_URL to forward live events to Google Sheets.', 'info');
      } else {
        showToast('Webhook Error', data.error || 'Failed to dispatch to Zapier endpoint', 'error');
      }
    } catch (err) {
      showToast('Delivery Failed', err.message, 'error');
    } finally {
      setIsSyncingWebhook(false);
    }
  };

  // Calculate actual completion metrics based strictly on completed milestones
  const totalMilestones = roadmap?.milestones?.length || 0;
  const completedMilestones = roadmap?.milestones?.filter(m => m.completed)?.length || 0;
  const progressPercentage = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        user,
        login,
        register,
        logout,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        studentProfile,
        setStudentProfile,
        careerRecommendations,
        setCareerRecommendations,
        isAssessing,
        runCareerAssessment,
        roadmap,
        setRoadmap,
        generateRoadmap,
        isGeneratingRoadmap,
        toggleMilestone,
        addCustomMilestone,
        savedInternships,
        toggleSaveInternship,
        updateInternshipStatus,
        integrationSettings,
        setIntegrationSettings,
        integrationLogs,
        fetchWebhookStatus,
        triggerTestWebhook,
        isSyncingWebhook,
        progressPercentage,
        completedMilestones,
        totalMilestones,
        notification,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
