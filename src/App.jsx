import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import MobileNav from './components/layout/MobileNav';
import Toast from './components/common/Toast';
import AuthModal from './components/auth/AuthModal';
import OnboardingModal from './components/onboarding/OnboardingModal';
import LandingPage from './components/landing/LandingPage';

// Views
import OverviewView from './views/OverviewView';
import CareerDiscoveryView from './views/CareerDiscoveryView';
import CareerDigitalTwinView from './views/CareerDigitalTwinView';
import LearningRoadmapView from './views/LearningRoadmapView';
import AiMentorView from './views/AiMentorView';
import SkillGapAnalysisView from './views/SkillGapAnalysisView';
import InternshipsView from './views/InternshipsView';
import ResumeBuilderView from './views/ResumeBuilderView';
import InterviewCoachView from './views/InterviewCoachView';
import SettingsIntegrationsView from './views/SettingsIntegrationsView';

function AppContent() {
  const { activeTab, setActiveTab } = useApp();
  const [viewMode, setViewMode] = useState('app'); // 'landing' | 'app'

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'discovery':
        return <CareerDiscoveryView />;
      case 'twin':
        return <CareerDigitalTwinView />;
      case 'roadmap':
        return <LearningRoadmapView />;
      case 'mentor':
        return <AiMentorView />;
      case 'skill-gap':
        return <SkillGapAnalysisView />;
      case 'internships':
        return <InternshipsView />;
      case 'resume':
        return <ResumeBuilderView />;
      case 'interview':
        return <InterviewCoachView />;
      case 'settings':
        return <SettingsIntegrationsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Global Header */}
      <Header onOpenLanding={() => setViewMode(viewMode === 'landing' ? 'app' : 'landing')} />

      {/* Main Content Area */}
      {viewMode === 'landing' ? (
        <LandingPage onEnterApp={() => setViewMode('app')} />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Desktop Collapsible Sidebar */}
          <Sidebar />

          {/* Core Viewport */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
            {renderActiveView()}
          </main>
        </div>
      )}

      {/* Mobile Bottom Navigation & Drawer */}
      <MobileNav />

      {/* Modals & Overlays */}
      <AuthModal />
      <OnboardingModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
