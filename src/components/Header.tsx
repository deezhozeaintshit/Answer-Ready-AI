import React from 'react';
import {
  Sparkles,
  Search,
  Globe,
  Briefcase,
  Layers,
  FileText,
  CreditCard,
  Building2,
  ChevronDown,
  ExternalLink,
  Bot,
  RefreshCw,
  Plus
} from 'lucide-react';
import { AppView, BusinessProfile } from '../types';

interface HeaderProps {
  currentView?: AppView | string;
  setCurrentView?: (view: any) => void;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  activeProfile?: BusinessProfile;
  allProfiles?: Record<string, BusinessProfile>;
  onSelectProfile: (slug: string) => void;
  onOpenNewScan: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView: propCurrentView,
  setCurrentView: propSetCurrentView,
  activeTab,
  onSelectTab,
  activeProfile,
  allProfiles = {},
  onSelectProfile,
  onOpenNewScan,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);

  const viewStr = (propCurrentView || activeTab || 'landing') as string;
  const navigateTo = (view: string) => {
    if (propSetCurrentView) propSetCurrentView(view);
    if (onSelectTab) onSelectTab(view);
  };

  const isProfileActive =
    (typeof viewStr === 'string' && viewStr.startsWith('dashboard-')) ||
    ['readiness', 'knowledge-profile', 'website-audit', 'content-gen', 'knowledge-graph', 'embed-widget', 'drift-monitor', 'competitors'].includes(viewStr);

  const isAskAiActive = viewStr === 'dashboard-ask-ai' || viewStr === 'ask-ai';
  const isConsistencyActive = viewStr === 'dashboard-consistency' || viewStr === 'consistency';
  const isAgencyActive = viewStr === 'agency-dashboard' || viewStr === 'agency' || viewStr === 'sales-report';
  const consistencyCount = (activeProfile?.consistencyIssues || []).filter(c => !c.resolved).length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Positioning */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg text-white tracking-tight">
                    AnswerReady<span className="text-emerald-400">.ai</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    AI Ready
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Make your business easy for AI to understand & recommend
                </p>
              </div>
            </button>
          </div>

          {/* Primary View Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => navigateTo('landing')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                viewStr === 'landing'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => navigateTo('readiness')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                isProfileActive
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              AI Profile
            </button>

            <button
              onClick={() => navigateTo('ask-ai')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                isAskAiActive
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              Ask AI Tester
            </button>

            <button
              onClick={() => navigateTo('consistency')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                isConsistencyActive
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Consistency
              {consistencyCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              )}
            </button>

            <button
              onClick={() => navigateTo('public-profile')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                viewStr === 'public-profile'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Public Page
            </button>

            <button
              onClick={() => navigateTo('agency')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                isAgencyActive
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Agency Hub
            </button>

            <button
              onClick={() => navigateTo('pricing')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                viewStr === 'pricing'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              Pricing
            </button>
          </nav>

          {/* Right Action: Active Business Switcher & Scan CTA */}
          <div className="flex items-center gap-2">
            {/* Business Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
                title="Switch Business Profile"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="max-w-[130px] sm:max-w-[180px] truncate text-white font-medium">
                  {activeProfile?.identity?.businessName || 'Select Business'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-emerald-300 font-semibold">
                  {activeProfile?.aiReadiness?.overallScore ?? 0}%
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-slate-700/70 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    Select Active Business
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {(Object.values(allProfiles) as BusinessProfile[]).map((prof) => (
                      <button
                        key={prof.slug}
                        onClick={() => {
                          onSelectProfile(prof.slug);
                          setProfileDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-700/70 transition-colors ${
                          activeProfile?.slug === prof.slug
                            ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                            : 'text-slate-200'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <div className="truncate font-medium">{prof.identity.businessName}</div>
                          <div className="text-[10px] text-slate-400">{prof.identity.category} • {prof.contact.address.city}, {prof.contact.address.state}</div>
                        </div>
                        <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-emerald-400 border border-slate-700">
                          {prof.aiReadiness.overallScore}%
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="p-2 border-t border-slate-700/70">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenNewScan();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Scan Another Business
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Free Scan CTA */}
            <button
              onClick={onOpenNewScan}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 hover:opacity-95 transition-opacity"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Scan</span> Business
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sub-bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 px-2 py-2 overflow-x-auto text-xs bg-slate-900">
        <button
          onClick={() => navigateTo('landing')}
          className={`px-2.5 py-1 rounded-md ${viewStr === 'landing' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'}`}
        >
          Home
        </button>
        <button
          onClick={() => navigateTo('readiness')}
          className={`px-2.5 py-1 rounded-md ${isProfileActive ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'}`}
        >
          Profile
        </button>
        <button
          onClick={() => navigateTo('ask-ai')}
          className={`px-2.5 py-1 rounded-md ${isAskAiActive ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'}`}
        >
          Ask AI
        </button>
        <button
          onClick={() => navigateTo('consistency')}
          className={`px-2.5 py-1 rounded-md ${isConsistencyActive ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'}`}
        >
          Consistency
        </button>
        <button
          onClick={() => navigateTo('agency')}
          className={`px-2.5 py-1 rounded-md ${isAgencyActive ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'}`}
        >
          Agency
        </button>
      </div>
    </header>
  );
};
