import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Info,
  Layers,
  HelpCircle,
  Clock,
  MapPin,
  FileCheck,
  ThumbsUp,
  Sliders,
  DollarSign,
  Loader2,
  FileDown,
  Printer
} from 'lucide-react';
import { BusinessProfile, RecommendationItem } from '../types';
import { ReadinessPdfReportModal } from './ReadinessPdfReportModal';

interface ReadinessScoreViewProps {
  profile: BusinessProfile;
  onUpdateProfile: (updated: BusinessProfile) => void;
  onNavigateToTab?: (tab: string) => void;
  onNavigate?: (tab: string) => void;
}

export const ReadinessScoreView: React.FC<ReadinessScoreViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigateToTab: propOnNavigateToTab,
  onNavigate,
}) => {
  const onNavigateToTab = (tab: string) => {
    if (propOnNavigateToTab) propOnNavigateToTab(tab);
    if (onNavigate) onNavigate(tab);
  };
  const [selectedRec, setSelectedRec] = useState<RecommendationItem | null>(null);
  const [fixModalOpen, setFixModalOpen] = useState(false);
  const [pdfReportOpen, setPdfReportOpen] = useState(false);
  const [isFixingWithAi, setIsFixingWithAi] = useState(false);
  const [generatedFixContent, setGeneratedFixContent] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium'>('all');

  const { aiReadiness } = profile;
  const overallScore = aiReadiness.overallScore;

  // Category labels with friendly descriptions
  const categories = [
    { key: 'identity', label: 'Business Identity', desc: 'Name, legal entity, tagline, and clear category' },
    { key: 'contact', label: 'Contact & Schedule', desc: 'Phone, verified hours, emergency numbers, booking' },
    { key: 'services', label: 'Services & Products', desc: 'Clear service names, descriptions, and problems solved' },
    { key: 'location', label: 'Location & Service Areas', desc: 'Physical address and specific towns served' },
    { key: 'faqs', label: 'Structured FAQs', desc: 'Direct, factual answers to common customer questions' },
    { key: 'trust', label: 'Trust & Reputation', desc: 'Ratings, licenses, certifications, and awards' },
    { key: 'websiteContent', label: 'Content Clarity', desc: 'Readable text without ambiguous buzzwords' },
    { key: 'consistency', label: 'Online Consistency', desc: 'Matching hours and phone across directories' },
    { key: 'structuredData', label: 'Structured Schema', desc: 'Schema.org JSON-LD formatted for answer engines' },
    { key: 'discoverability', label: 'AI Discoverability', desc: 'Machine readability for automated scrapers' },
  ];

  const handleOpenFixModal = async (rec: RecommendationItem) => {
    setSelectedRec(rec);
    setGeneratedFixContent(rec.suggestedFix);
    setFixModalOpen(true);
    setIsFixingWithAi(true);

    try {
      const response = await fetch('/api/generate-fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issue: rec, profile }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.fix?.suggestedContent) {
          setGeneratedFixContent(data.fix.suggestedContent);
        }
      }
    } catch {
      // fallback to pre-existing suggestedFix
    } finally {
      setIsFixingWithAi(false);
    }
  };

  const handleApplyFix = () => {
    if (!selectedRec) return;

    // Apply fix: mark recommendation as applied, increase score slightly, add change log
    const updatedRecommendations = profile.recommendations.map((r) =>
      r.id === selectedRec.id ? { ...r, applied: true } : r
    );

    const newScore = Math.min(100, profile.aiReadiness.overallScore + 6);

    const updatedProfile: BusinessProfile = {
      ...profile,
      aiReadiness: {
        ...profile.aiReadiness,
        overallScore: newScore,
        summary: `Score improved to ${newScore}%. Plain-English fix applied for: ${selectedRec.title}.`,
      },
      recommendations: updatedRecommendations,
      changeLogs: [
        {
          id: `cl-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: 'general',
          title: `Applied Fix: ${selectedRec.title}`,
          description: generatedFixContent,
          detectedFrom: 'AnswerReady 1-Click Fix',
          status: 'applied',
        },
        ...profile.changeLogs,
      ],
    };

    onUpdateProfile(updatedProfile);
    setFixModalOpen(false);
  };

  const filteredRecs = profile.recommendations.filter((rec) => {
    if (filterSeverity === 'all') return true;
    return rec.severity === filterSeverity;
  });

  return (
    <div className="space-y-8">
      {/* Top Hero: Score & Summary Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Score Wheel */}
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800 stroke-current"
                  strokeWidth="3.2"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`stroke-current transition-all duration-1000 ${
                    overallScore >= 85
                      ? 'text-emerald-400'
                      : overallScore >= 65
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                  strokeDasharray={`${overallScore}, 100`}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {overallScore}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  out of 100
                </span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800 text-xs font-semibold text-emerald-400 border border-slate-700 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Readiness Evaluation</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                {overallScore >= 85
                  ? 'Strong AI Foundation'
                  : overallScore >= 65
                  ? 'Moderate AI Readiness'
                  : 'Needs Information Optimization'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
                {aiReadiness.summary}
              </p>
            </div>
          </div>

          {/* Quick Stats or CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              id="download-pdf-report-btn"
              onClick={() => setPdfReportOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-colors shadow-xs group"
              title="Download clean, printable PDF version of the business's current AI Readiness scorecard and audit findings"
            >
              <FileDown className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Download PDF Report</span>
            </button>

            <button
              onClick={() => onNavigateToTab('ask-ai')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Test AI Question Simulator</span>
            </button>
            <button
              onClick={() => onNavigateToTab('profile')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <span>Edit Knowledge Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* "Would AI Recommend You?" Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Core Recommendation Evaluation
            </span>
            <h3 className="font-display text-xl font-bold text-slate-900 mt-1">
              Would AI Recommend You?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              How search and answer engines evaluate your business against customer inquiries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">AI Confidence:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                aiReadiness.wouldAiRecommend.score >= 80
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {aiReadiness.wouldAiRecommend.rating} ({aiReadiness.wouldAiRecommend.score}%)
            </span>
          </div>
        </div>

        {/* 7 Core Recommendation Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
              <span>Specialization Clarity</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[11px] text-slate-600">
              Clear core category ({profile.identity.category}) and specialized niches defined.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
              <span>Geographic Relevance</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[11px] text-slate-600">
              {profile.identity.serviceAreas.length} explicit cities/counties documented for local routing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
              <span>Pricing Transparency</span>
              {profile.services.some((s) => s.pricing.length > 5) ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              )}
            </div>
            <p className="text-[11px] text-slate-600">
              Upfront baseline pricing published so AI doesn't have to guess or skip.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
              <span>Trust & Credentials</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[11px] text-slate-600">
              {profile.trust.rating}★ rating ({profile.trust.reviewCount} reviews), active state licensing.
            </p>
          </div>
        </div>

        {/* Strengths & Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Key Strengths (Why AI Trusts You)
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-900">
              {aiReadiness.wouldAiRecommend.strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Information Gaps (What AI Needs Verified)
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-900">
              {aiReadiness.wouldAiRecommend.gaps.map((gap, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI Verdict */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <strong className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
              AI Recommendation Verdict
            </strong>
            <span className="text-slate-200 mt-0.5 block">{aiReadiness.wouldAiRecommend.verdict}</span>
          </div>
          <button
            onClick={() => onNavigateToTab('ask-ai')}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
          >
            Simulate Customer Query →
          </button>
        </div>
      </div>

      {/* 10 Categories Breakdown Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="mb-6">
          <h3 className="font-display text-lg font-bold text-slate-900">
            10-Category Readiness Breakdown
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed evaluation of your machine-readable business footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const score = (aiReadiness.breakdown as any)[cat.key] || 70;
            return (
              <div
                key={cat.key}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900">{cat.label}</span>
                  <span
                    className={`text-xs font-bold ${
                      score >= 80
                        ? 'text-emerald-600'
                        : score >= 65
                        ? 'text-amber-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {score}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      score >= 80
                        ? 'bg-emerald-500'
                        : score >= 65
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>

                <p className="text-[11px] text-slate-500 leading-tight">{cat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actionable Recommendations with 1-Click Fix Modal */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Plain-English Improvements
            </span>
            <h3 className="font-display text-xl font-bold text-slate-900 mt-0.5">
              Actionable Fixes to Maximize AI Visibility
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Fix these items to raise your score and make it effortless for AI to cite you.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setPdfReportOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 shadow-2xs"
              title="Export complete findings into printable PDF report"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-600" />
              <span>Audit Findings PDF</span>
            </button>

            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs">
              <button
                onClick={() => setFilterSeverity('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  filterSeverity === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                All ({profile.recommendations.length})
              </button>
              <button
                onClick={() => setFilterSeverity('high')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  filterSeverity === 'high' ? 'bg-white text-rose-700 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                High Priority
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRecs.map((rec) => (
            <div
              key={rec.id}
              className={`p-5 rounded-2xl border transition-all ${
                rec.applied
                  ? 'bg-emerald-50/40 border-emerald-200 opacity-75'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        rec.severity === 'high'
                          ? 'bg-rose-100 text-rose-700'
                          : rec.severity === 'medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {rec.severity} priority
                    </span>
                    <span className="text-xs text-slate-400 font-medium">• {rec.category}</span>
                    {rec.applied && (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Fixed & Applied
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-900 text-base">{rec.title}</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <strong className="text-slate-700 block font-semibold mb-0.5">What is wrong:</strong>
                      <span className="text-slate-600">{rec.whatIsWrong}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <strong className="text-slate-700 block font-semibold mb-0.5">Why it matters to AI:</strong>
                      <span className="text-slate-600">{rec.whyItMatters}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600">
                    <strong className="text-emerald-700 font-semibold">How to fix it: </strong>
                    <span>{rec.howToFix}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center sm:flex-col justify-end gap-2">
                  {!rec.applied ? (
                    <button
                      onClick={() => handleOpenFixModal(rec)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>FIX IT</span>
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium px-3 py-1 bg-slate-100 rounded-lg">
                      Applied
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1-Click Fix Modal */}
      {fixModalOpen && selectedRec && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    1-Click Fix: {selectedRec.title}
                  </h4>
                  <span className="text-[11px] text-slate-400">{selectedRec.category}</span>
                </div>
              </div>
              <button
                onClick={() => setFixModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <p className="font-semibold text-slate-800 mb-1">Plain-English Context:</p>
                <p>{selectedRec.whyItMatters}</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  AI-Generated Recommended Text (Edit or Approve):
                </label>
                {isFixingWithAi ? (
                  <div className="flex items-center justify-center gap-2 py-8 text-xs text-slate-500">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    <span>AnswerReady is generating your optimized text...</span>
                  </div>
                ) : (
                  <textarea
                    rows={4}
                    value={generatedFixContent}
                    onChange={(e) => setGeneratedFixContent(e.target.value)}
                    className="w-full p-3 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium"
                  />
                )}
                <p className="text-[11px] text-slate-500 mt-1">
                  Clicking "Approve & Apply" will update your profile facts and boost your score.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setFixModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyFix}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Apply Fix</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Printable PDF Audit Report Modal */}
      <ReadinessPdfReportModal
        profile={profile}
        isOpen={pdfReportOpen}
        onClose={() => setPdfReportOpen(false)}
      />
    </div>
  );
};
