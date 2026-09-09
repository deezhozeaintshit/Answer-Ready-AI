import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Zap,
  Globe,
  Bot,
  Search,
  Check,
  ChevronRight,
  TrendingUp,
  Layers,
  Building,
  Star,
  Users,
  Eye,
  FileCheck,
  FileText
} from 'lucide-react';
import { AppView, BusinessProfile } from '../types';
import { SAMPLE_PROFILES } from '../data/sampleProfiles';

interface LandingPageProps {
  onStartScan?: () => void;
  onGetStarted?: () => void;
  onExploreDemo?: (profileSlug?: string) => void;
  onViewSampleProfile?: () => void;
  onOpenDashboard?: () => void;
  activeProfile?: BusinessProfile;
  allProfiles?: Record<string, BusinessProfile>;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartScan: propOnStartScan,
  onGetStarted,
  onExploreDemo: propOnExploreDemo,
  onViewSampleProfile,
  onOpenDashboard,
  activeProfile: propActiveProfile,
  allProfiles: propAllProfiles,
}) => {
  const allProfiles = propAllProfiles || SAMPLE_PROFILES;
  const activeProfile = propActiveProfile || Object.values(allProfiles)[0];
  const onStartScan = propOnStartScan || onGetStarted || (() => {});
  const onExploreDemo = propOnExploreDemo || ((slug?: string) => {
    if (onOpenDashboard) onOpenDashboard();
    else if (onViewSampleProfile) onViewSampleProfile();
  });
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [quickUrl, setQuickUrl] = useState('');

  const industries = [
    'Plumbers & Trades',
    'Dentists & Health',
    'Roofers & Contractors',
    'Restaurants & Cafes',
    'Lawyers & Legal',
    'Auto Repair',
    'Salons & Spas',
    'Realtors & Brokers',
  ];

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-slate-800">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>The Single Source of Truth for AI Assistants</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.15] mb-6">
            Make your business easy for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              AI to understand
            </span>
            , trust, and recommend.
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            AnswerReady turns your scattered website, Google listings, menus, and reviews into one accurate, structured AI Knowledge Profile so ChatGPT, Google Gemini, Perplexity, and Apple Intelligence can answer customer questions about you with confidence.
          </p>

          {/* Instant Quick-Check Form */}
          <div className="max-w-xl mx-auto mb-6 p-2 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-2xl backdrop-blur-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onStartScan();
              }}
              className="flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="relative flex-1 w-full">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Enter your website URL (e.g. yourbusiness.com)"
                  value={quickUrl}
                  onChange={(e) => setQuickUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <span>Check My Business</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 mb-12">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Free 10-second scan
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Plain English report
            </span>
          </div>

          {/* Interactive Live Demo Preview Switcher */}
          <div className="text-left bg-slate-950 rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-2xl max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Live Interactive Profile Preview
                </span>
                <h3 className="font-display text-lg font-bold text-white mt-0.5">
                  {activeProfile.identity.businessName}
                </h3>
                <p className="text-xs text-slate-400">
                  {activeProfile.identity.category} • {activeProfile.contact.address.city}, {activeProfile.contact.address.state}
                </p>
              </div>

              {/* Business Selector Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(Object.values(allProfiles) as BusinessProfile[]).slice(0, 4).map((prof) => (
                  <button
                    key={prof.slug}
                    onClick={() => onExploreDemo(prof.slug)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      activeProfile.slug === prof.slug
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    {prof.identity.businessName.split(' ')[0]}
                  </button>
                ))}
                <button
                  onClick={() => onExploreDemo(activeProfile.slug)}
                  className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors ml-2"
                >
                  View Full Profile →
                </button>
              </div>
            </div>

            {/* Score & Verdict Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
              {/* Score card */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center shrink-0">
                  <span className="text-2xl font-display font-extrabold text-emerald-400">
                    {activeProfile.aiReadiness.overallScore}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">/ 100</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">AI Readiness Score</div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                    {activeProfile.aiReadiness.wouldAiRecommend.rating}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                    Optimized for ChatGPT, Gemini, and Perplexity.
                  </p>
                </div>
              </div>

              {/* Verified Sources */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-white mb-2 flex items-center justify-between">
                  <span>Structured Knowledge Base</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                    Verified
                  </span>
                </div>
                <div className="space-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activeProfile.services.length} Core Services & Pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activeProfile.identity.serviceAreas.length} Confirmed Service Areas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activeProfile.faqs.length} Approved Customer FAQs</span>
                  </div>
                </div>
              </div>

              {/* Sample AI Answer */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  <span>How AI Answers Customers:</span>
                </div>
                <p className="text-xs text-slate-200 italic line-clamp-3">
                  "{activeProfile.identity.shortAiDescription}"
                </p>
                <div className="mt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span>95% Confidence Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The New Search Problem Section */}
      <section className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              The Fundamental Shift
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-4 tracking-tight">
              People aren't just clicking links anymore. They're asking AI.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              When a homeowner needs a trusted plumber in a hurry, or a family looks for a weekend dinner spot, they don't scroll through ten blue links. They ask an AI assistant:
            </p>
          </div>

          {/* AI Prompts vs Traditional Search cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Customer Query to ChatGPT</span>
              </div>
              <p className="text-sm text-white font-medium italic mb-4">
                "Who is the best plumber near Lake View who handles emergency pipe bursts on Saturday and provides upfront pricing?"
              </p>
              <div className="text-xs p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300">
                <strong className="text-emerald-400">If your profile is missing:</strong> AI cannot confirm your weekend dispatch policy or pricing, so it recommends a competitor whose profile is verified.
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
                <Bot className="w-4 h-4 text-teal-400" />
                <span>Customer Query to Google Gemini</span>
              </div>
              <p className="text-sm text-white font-medium italic mb-4">
                "Does Apex Dental offer same-day emergency tooth repair and take Delta Dental PPO?"
              </p>
              <div className="text-xs p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300">
                <strong className="text-teal-400">If your profile is verified:</strong> Gemini quotes your exact accepted insurance list and same-day booking phone line directly in the answer box.
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Customer Query to Perplexity</span>
              </div>
              <p className="text-sm text-white font-medium italic mb-4">
                "Compare commercial roofing warranties in Des Moines. Who has at least 10 years in business and 25-year manufacturer certification?"
              </p>
              <div className="text-xs p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300">
                <strong className="text-emerald-400">If your profile is AnswerReady:</strong> Perplexity cites your exact 25-year GAF Master Elite certification and 15+ years in business as source facts.
              </div>
            </div>
          </div>

          {/* The Problem: Scattered Information vs Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Problem */}
            <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-4">
                  <AlertCircle className="w-3.5 h-3.5" />
                  The Problem: Scattered Information
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Your business details are fragmented across the web.
                </h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  Your website lists old hours. Your Facebook page has a different phone number. Your Yelp listing lacks your new services. Menus are stuck inside unreadable PDF scans.
                </p>
                <div className="space-y-3 text-xs text-rose-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                    <span>AI gets confused by conflicting operating hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                    <span>Lack of pricing info prevents direct recommendation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                    <span>Unclear service boundaries cause AI to say "Information not available"</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-rose-900/30 text-xs text-slate-400">
                Result: <strong className="text-white">AI hallucinates or skips your business.</strong>
              </div>
            </div>

            {/* The Solution */}
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  The Solution: AnswerReady AI
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  One verified, structured source of truth.
                </h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  AnswerReady AI organizes your business facts into a machine-readable knowledge profile. When AI assistants evaluate who to recommend, your facts are clear, consistent, and verified.
                </p>
                <div className="space-y-3 text-xs text-emerald-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>10-category AI Readiness Score with plain-English fixes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Cross-directory consistency monitoring (Website vs Google vs Yelp)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Live "Ask AI Tester" to see how ChatGPT answers queries about you</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Exportable Schema.org JSON-LD, Markdown, and public profile page</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-900/30">
                <button
                  onClick={onStartScan}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Build My Free AI Knowledge Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (4 Steps) */}
      <section className="py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Simple 4-Step Process
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-4 tracking-tight">
              From scattered information to AI-recommended
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              No technical expertise, coding, or complex SEO jargon required.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/80 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-base mb-4">
                1
              </div>
              <h3 className="font-bold text-white text-base mb-2">Scan Your Business</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your website URL. AnswerReady crawls your site, extracts identity, services, hours, and credentials, and checks online directory consistency.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/80 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-base mb-4">
                2
              </div>
              <h3 className="font-bold text-white text-base mb-2">Fix Gaps with 1-Click</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                See your AI Readiness Score (0-100). Review plain-English recommendations, approve suggested pricing ranges, and fix conflicting operating hours.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/80 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-base mb-4">
                3
              </div>
              <h3 className="font-bold text-white text-base mb-2">Publish & Export</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Get a clean public AI Business Profile page, structured Schema.org JSON-LD code for your website, and a comprehensive Markdown knowledge file for AI scrapers.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/80 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-base mb-4">
                4
              </div>
              <h3 className="font-bold text-white text-base mb-2">Monitor Automatically</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                AnswerReady continuously monitors your website for changes. When you update holiday hours or pricing, your AI Knowledge Profile updates seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Comparison */}
      <section className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Measurable Transformation
            </span>
            <h2 className="font-display text-3xl font-bold text-white mt-2 mb-4">
              See the difference AnswerReady makes
            </h2>
            <p className="text-slate-400 text-sm">
              Real evaluation of PeakFlow Plumbing before vs. after AnswerReady AI optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-rose-900/40">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div>
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Before</span>
                  <h4 className="text-base font-bold text-white mt-0.5">Unstructured Public Footprint</h4>
                </div>
                <div className="px-3 py-1 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold text-sm">
                  Score: 48 / 100
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">"Call for Quote" pricing</strong>
                    <span className="text-slate-400">AI cannot provide price estimates, so it directs searchers to competitors.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Conflicting weekend hours</strong>
                    <span className="text-slate-400">Website says closed Sunday; Yelp says open 24/7. AI advises caution.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">No structured FAQ markup</strong>
                    <span className="text-slate-400">AI assistant says: "I cannot confirm if they service water softeners."</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-semibold text-rose-400">
                AI Verdict: "Hard to Recommend Confidently"
              </div>
            </div>

            {/* After */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-emerald-500/40 shadow-xl shadow-emerald-500/5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">After AnswerReady</span>
                  <h4 className="text-base font-bold text-white mt-0.5">Verified Knowledge Profile</h4>
                </div>
                <div className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-sm">
                  Score: 96 / 100
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Transparent Price Tiers Published</strong>
                    <span className="text-slate-300">AI confidently quotes: "$89 diagnostic fee, waived when proceeding with repair."</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Synchronized Operating Schedule</strong>
                    <span className="text-slate-300">Confirmed regular hours plus verified 24/7 emergency dispatch line.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Rich Machine-Readable Knowledge Base</strong>
                    <span className="text-slate-300">Schema.org JSON-LD + 6 verified FAQs indexed by all major answer engines.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-semibold text-emerald-400 flex items-center justify-between">
                <span>AI Verdict: "Strongly Recommended"</span>
                <span className="text-[11px] text-slate-400">95% Confidence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Built for Every Business
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
            Trusted by 25+ business categories
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-10">
            Whether you are a local plumber, dental clinic, roofer, restaurant, lawyer, accountant, or freelancer, AnswerReady customizes questions for your exact industry.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={onStartScan}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center gap-2"
              >
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                <span>{ind}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Simple, Transparent Pricing
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Invest in your business's AI presence
            </h2>
            <p className="text-slate-400 text-sm">
              Start with a free scan. Upgrade when you're ready for automated syncing, monitoring, and hosted public pages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            {/* Free */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-base mb-1">Free Scan</h3>
                <p className="text-xs text-slate-400 mb-4">For checking your business</p>
                <div className="text-3xl font-extrabold text-white mb-6">
                  $0 <span className="text-xs font-normal text-slate-400">forever</span>
                </div>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant AI Readiness Score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Top 3 Plain-English Fixes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Single website scan</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onStartScan}
                className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
              >
                Scan Now
              </button>
            </div>

            {/* Pro */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-emerald-500/50 relative shadow-xl shadow-emerald-500/10 flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase">
                Most Popular
              </div>
              <div>
                <h3 className="font-bold text-white text-base mb-1">Pro Business</h3>
                <p className="text-xs text-slate-400 mb-4">Complete AI Optimization</p>
                <div className="text-3xl font-extrabold text-white mb-6">
                  $29 <span className="text-xs font-normal text-slate-400">/ month</span>
                </div>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Full AI Knowledge Profile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Hosted Public AI Profile Page</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Schema.org JSON-LD Generator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ask AI Tester (Unlimited)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Monthly Website Change Monitor</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onExploreDemo(activeProfile.slug)}
                className="w-full mt-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
              >
                Start 14-Day Trial
              </button>
            </div>

            {/* Business */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-base mb-1">Business Scale</h3>
                <p className="text-xs text-slate-400 mb-4">Multi-location & High Volume</p>
                <div className="text-3xl font-extrabold text-white mb-6">
                  $79 <span className="text-xs font-normal text-slate-400">/ month</span>
                </div>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Up to 5 Business Locations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Weekly Auto Website Sync</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Embeddable AI Answer Widget</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Directory Consistency Alerts</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onExploreDemo(activeProfile.slug)}
                className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
              >
                Choose Business
              </button>
            </div>

            {/* Agency */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-base mb-1">Agency Hub</h3>
                <p className="text-xs text-slate-400 mb-4">For Marketers & Consultants</p>
                <div className="text-3xl font-extrabold text-white mb-6">
                  $199 <span className="text-xs font-normal text-slate-400">/ month</span>
                </div>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>White-Label Client Audits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>8-Page Sales Pitch PDF Deck</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Up to 25 Client Profiles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Agency Branding & Logo</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onExploreDemo(activeProfile.slug)}
                className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
              >
                Access Agency Hub
              </button>
            </div>
          </div>

          {/* Done-For-You Addon Banner */}
          <div className="mt-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Need us to set everything up for you?</h4>
                <p className="text-xs text-slate-400">
                  Our team of AI knowledge engineers will build your full profile, write your FAQs, resolve consistency errors, and install your Schema.org code for a one-time setup fee of $149.
                </p>
              </div>
            </div>
            <button
              onClick={onStartScan}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
            >
              Get Done-For-You Setup ($149)
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Everything you need to know about AI business discovery.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <h4 className="font-bold text-white text-sm mb-2">
                Is AnswerReady AI an SEO agency or software?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                No. We don't sell complicated keyword schemes or promise arbitrary search ranks. AnswerReady is a structured knowledge management system that organizes your real business facts into formats that AI answer engines (ChatGPT, Google Gemini, Perplexity) need to accurately cite and recommend you.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <h4 className="font-bold text-white text-sm mb-2">
                Do you guarantee that ChatGPT or Google will always recommend me?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                No honest software can guarantee specific AI rankings because generative models formulate responses based on context, location, and user query. What AnswerReady guarantees is that AI models will have verified, accurate, structured information about your prices, hours, services, and credentials—eliminating hallucinations and errors.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <h4 className="font-bold text-white text-sm mb-2">
                How does AI read my AnswerReady profile?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Through three complementary channels: 1) Your public, mobile-friendly AnswerReady profile page crawled by AI bots; 2) The Schema.org JSON-LD code you can copy directly onto your website; and 3) Downloadable Markdown (.md) and text files ready for knowledge ingestion.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <h4 className="font-bold text-white text-sm mb-2">
                Can I use AnswerReady if I don't have a website yet?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Yes! Many freelancers, creators, and new businesses use their hosted AnswerReady public profile as their primary verified online knowledge base.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold text-white mb-4">
            Ready to see what AI knows about your business?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8">
            Run a free, instantaneous scan and receive your AI Readiness Score in under 10 seconds.
          </p>
          <button
            onClick={onStartScan}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 inline-flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Scan My Business Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
