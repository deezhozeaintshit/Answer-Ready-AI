import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { OnboardingScanner } from './components/OnboardingScanner';
import { ReadinessScoreView } from './components/ReadinessScoreView';
import { KnowledgeProfileView } from './components/KnowledgeProfileView';
import { ConsistencyCheckerView } from './components/ConsistencyCheckerView';
import { AskAiTester } from './components/AskAiTester';
import { PublicBusinessProfile } from './components/PublicBusinessProfile';
import { WebsiteAnalyzerView } from './components/WebsiteAnalyzerView';
import { ContentGeneratorView } from './components/ContentGeneratorView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { EmbedWidgetView } from './components/EmbedWidgetView';
import { ChangeMonitoringView } from './components/ChangeMonitoringView';
import { CompetitorComparisonView } from './components/CompetitorComparisonView';
import { AgencyDashboardView } from './components/AgencyDashboardView';
import { SalesReportView } from './components/SalesReportView';

import { SAMPLE_PROFILES } from './data/sampleProfiles';
import { BusinessProfile } from './types';
import {
  Award,
  Layers,
  Bot,
  RefreshCw,
  FileSearch,
  Sparkles,
  Share2,
  Code,
  Activity,
  Users,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [profiles, setProfiles] = useState<Record<string, BusinessProfile>>(SAMPLE_PROFILES);
  const [activeProfileSlug, setActiveProfileSlug] = useState<string>('peakflow-plumbing');
  const [currentTab, setCurrentTab] = useState<string>('landing');

  const activeProfile = profiles[activeProfileSlug] || Object.values(profiles)[0] || SAMPLE_PROFILES['peakflow-plumbing'];

  const handleUpdateActiveProfile = (updated: BusinessProfile) => {
    setProfiles((prev) => ({
      ...prev,
      [updated.slug]: updated,
    }));
  };

  const handleCreateNewProfile = (newProfile: BusinessProfile) => {
    setProfiles((prev) => ({
      ...prev,
      [newProfile.slug]: newProfile,
    }));
    setActiveProfileSlug(newProfile.slug);
    setCurrentTab('readiness');
  };

  const handleNavigateTab = (tab: string) => {
    if (tab === 'profile' || tab === 'dashboard-profile') {
      setCurrentTab('knowledge-profile');
    } else if (tab === 'overview' || tab === 'dashboard-overview' || tab === 'dashboard-readiness') {
      setCurrentTab('readiness');
    } else if (tab === 'dashboard-consistency') {
      setCurrentTab('consistency');
    } else if (tab === 'dashboard-ask-ai') {
      setCurrentTab('ask-ai');
    } else if (tab === 'agency' || tab === 'agency-dashboard') {
      setCurrentTab('agency');
    } else if (tab === 'dashboard-recommendations') {
      setCurrentTab('website-audit');
    } else if (tab === 'dashboard-content-gen') {
      setCurrentTab('content-gen');
    } else if (tab === 'dashboard-knowledge-graph') {
      setCurrentTab('knowledge-graph');
    } else if (tab === 'dashboard-widget') {
      setCurrentTab('embed-widget');
    } else if (tab === 'dashboard-monitoring') {
      setCurrentTab('drift-monitor');
    } else if (tab === 'dashboard-competitors') {
      setCurrentTab('competitors');
    } else {
      setCurrentTab(tab);
    }
  };

  const isBusinessTool = [
    'readiness',
    'knowledge-profile',
    'consistency',
    'ask-ai',
    'website-audit',
    'content-gen',
    'knowledge-graph',
    'embed-widget',
    'drift-monitor',
    'competitors'
  ].includes(currentTab);

  const businessNavTabs = [
    { id: 'readiness', label: 'Readiness Score', icon: Award },
    { id: 'knowledge-profile', label: 'Knowledge Profile', icon: Layers },
    { id: 'ask-ai', label: 'Ask AI Tester', icon: Bot },
    { id: 'consistency', label: 'Consistency Audit', icon: RefreshCw },
    { id: 'website-audit', label: 'Website Audit', icon: FileSearch },
    { id: 'content-gen', label: 'Content Generator', icon: Sparkles },
    { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Share2 },
    { id: 'embed-widget', label: 'Live Widget', icon: Code },
    { id: 'drift-monitor', label: 'Drift Monitor', icon: Activity },
    { id: 'competitors', label: 'Competitors', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Global Application Header */}
      <Header
        currentView={currentTab}
        setCurrentView={handleNavigateTab}
        activeTab={currentTab}
        onSelectTab={handleNavigateTab}
        activeProfile={activeProfile}
        allProfiles={profiles}
        onSelectProfile={setActiveProfileSlug}
        onOpenNewScan={() => setCurrentTab('onboarding')}
      />

      {/* Sub-navigation bar when viewing business tools */}
      {isBusinessTool && (
        <div className="bg-slate-900 border-b border-slate-800 text-white sticky top-16 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2.5 overflow-x-auto gap-2 no-scrollbar">
              <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-slate-800">
                <span className="text-xs font-semibold text-white truncate max-w-[150px] sm:max-w-xs">
                  {activeProfile.identity.businessName}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {activeProfile.aiReadiness.overallScore}%
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0 overflow-x-auto">
                {businessNavTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = currentTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setCurrentTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="shrink-0 pl-2 border-l border-slate-800 hidden lg:block">
                <button
                  onClick={() => setCurrentTab('public-profile')}
                  className="flex items-center gap-1 text-xs text-slate-300 hover:text-emerald-400 font-medium transition-colors"
                >
                  <span>Public View</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(currentTab === 'landing' || currentTab === 'pricing') && (
          <LandingPage
            onStartScan={() => setCurrentTab('onboarding')}
            onGetStarted={() => setCurrentTab('onboarding')}
            onExploreDemo={(slug) => {
              if (slug && profiles[slug]) setActiveProfileSlug(slug);
              setCurrentTab('readiness');
            }}
            onViewSampleProfile={() => setCurrentTab('public-profile')}
            onOpenDashboard={() => setCurrentTab('readiness')}
            activeProfile={activeProfile}
            allProfiles={profiles}
          />
        )}

        {currentTab === 'onboarding' && (
          <div className="py-4">
            <OnboardingScanner
              onCompleteScan={handleCreateNewProfile}
              onCancel={() => setCurrentTab('landing')}
            />
          </div>
        )}

        {currentTab === 'readiness' && (
          <ReadinessScoreView
            profile={activeProfile}
            onUpdateProfile={handleUpdateActiveProfile}
            onNavigateToTab={handleNavigateTab}
            onNavigate={handleNavigateTab}
          />
        )}

        {currentTab === 'knowledge-profile' && (
          <KnowledgeProfileView
            profile={activeProfile}
            onUpdateProfile={handleUpdateActiveProfile}
          />
        )}

        {currentTab === 'consistency' && (
          <ConsistencyCheckerView
            profile={activeProfile}
            onUpdateProfile={handleUpdateActiveProfile}
          />
        )}

        {currentTab === 'ask-ai' && (
          <AskAiTester
            profile={activeProfile}
            onUpdateProfile={handleUpdateActiveProfile}
          />
        )}

        {currentTab === 'public-profile' && (
          <PublicBusinessProfile
            profile={activeProfile}
            onBackToDashboard={() => setCurrentTab('readiness')}
          />
        )}

        {currentTab === 'website-audit' && (
          <WebsiteAnalyzerView
            profile={activeProfile}
            onUpdateProfile={handleUpdateActiveProfile}
          />
        )}

        {currentTab === 'content-gen' && (
          <ContentGeneratorView profile={activeProfile} />
        )}

        {currentTab === 'knowledge-graph' && (
          <KnowledgeGraphView profile={activeProfile} />
        )}

        {currentTab === 'embed-widget' && (
          <EmbedWidgetView profile={activeProfile} />
        )}

        {currentTab === 'drift-monitor' && (
          <ChangeMonitoringView
            profile={activeProfile}
            onUpdateProfile={handleUpdateActiveProfile}
          />
        )}

        {currentTab === 'competitors' && (
          <CompetitorComparisonView profile={activeProfile} />
        )}

        {currentTab === 'agency' && (
          <AgencyDashboardView
            allProfiles={profiles}
            activeProfile={activeProfile}
            onSelectProfile={(slug) => {
              setActiveProfileSlug(slug);
              setCurrentTab('readiness');
            }}
            onOpenNewScan={() => setCurrentTab('onboarding')}
            onOpenSalesReport={() => setCurrentTab('sales-report')}
          />
        )}

        {currentTab === 'sales-report' && (
          <SalesReportView
            profile={activeProfile}
            agencyName="Vanguard Digital AI Solutions"
          />
        )}
      </main>

      {/* Global Application Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs">
              A
            </div>
            <span className="font-bold text-slate-900">AnswerReady AI</span>
            <span>—</span>
            <span>Make your business easy for AI to understand, trust, and recommend.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => setCurrentTab('readiness')}
              className="hover:text-slate-900 font-medium transition-colors"
            >
              Readiness Score
            </button>
            <button
              onClick={() => setCurrentTab('ask-ai')}
              className="hover:text-slate-900 font-medium transition-colors"
            >
              Ask AI Sandbox
            </button>
            <button
              onClick={() => setCurrentTab('public-profile')}
              className="hover:text-slate-900 font-medium transition-colors"
            >
              Public Profile
            </button>
            <button
              onClick={() => setCurrentTab('agency')}
              className="hover:text-slate-900 font-medium transition-colors"
            >
              Agency Suite
            </button>
            <button
              onClick={() => setCurrentTab('sales-report')}
              className="hover:text-slate-900 font-medium transition-colors"
            >
              Sales Pitch Report
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
