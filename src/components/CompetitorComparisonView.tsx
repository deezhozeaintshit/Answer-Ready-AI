import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Building,
  ShieldCheck,
  Star,
  Sparkles
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface CompetitorComparisonViewProps {
  profile: BusinessProfile;
}

export const CompetitorComparisonView: React.FC<CompetitorComparisonViewProps> = ({ profile }) => {
  const competitorA = {
    name: 'Standard Local Competitor A',
    score: 51,
    pricing: 'Vague ("Call for Quote")',
    hours: 'Conflicting across Google & Yelp',
    faqs: '0 Structured FAQs',
    schema: 'Missing Schema.org Markup',
    aiVerdict: 'Hard to Recommend Confidently',
  };

  const competitorB = {
    name: 'Franchise / Chain Competitor B',
    score: 64,
    pricing: 'National average only',
    hours: 'Standard franchise hours',
    faqs: 'Generic corporate FAQ',
    schema: 'Basic schema only',
    aiVerdict: 'Moderately Recommended',
  };

  const myBusiness = {
    name: profile.identity.businessName + ' (AnswerReady AI)',
    score: profile.aiReadiness.overallScore,
    pricing: 'Transparent baseline prices published',
    hours: 'Verified schedule with 24/7 emergency dispatch',
    faqs: `${profile.faqs.filter((f) => f.status === 'approved').length} Approved Q&As`,
    schema: 'Complete LocalBusiness + FAQPage Schema',
    aiVerdict: 'Strongly Recommended',
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Market Benchmark Analysis</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">
            Local AI Visibility Benchmark
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            See how your business stacks up against local competitors in your category when evaluated by AI search engines.
          </p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Competitor A */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Competitor A
            </span>
            <h4 className="font-bold text-slate-800 text-base mt-0.5">{competitorA.name}</h4>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-2xl font-display font-extrabold text-slate-700">
                {competitorA.score}%
              </span>
              <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded">
                Unstructured
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div>
              <strong className="block text-slate-800 mb-0.5">Pricing Transparency:</strong>
              <span className="text-rose-600">{competitorA.pricing}</span>
            </div>
            <div>
              <strong className="block text-slate-800 mb-0.5">Hours Consistency:</strong>
              <span className="text-rose-600">{competitorA.hours}</span>
            </div>
            <div>
              <strong className="block text-slate-800 mb-0.5">FAQ Depth:</strong>
              <span>{competitorA.faqs}</span>
            </div>
            <div>
              <strong className="block text-slate-800 mb-0.5">Schema.org Markup:</strong>
              <span className="text-rose-600">{competitorA.schema}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-rose-600">
            AI Verdict: {competitorA.aiVerdict}
          </div>
        </div>

        {/* My Business (AnswerReady) - Highlighted */}
        <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 shadow-lg shadow-emerald-500/10 space-y-4 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase">
            Your Business
          </div>

          <div className="pb-4 border-b border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Optimized with AnswerReady AI
            </span>
            <h4 className="font-bold text-slate-900 text-base mt-0.5">{myBusiness.name}</h4>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-2xl font-display font-extrabold text-emerald-600">
                {myBusiness.score}%
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                AI Ready
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div>
              <strong className="block text-slate-800 mb-0.5">Pricing Transparency:</strong>
              <span className="text-emerald-700 font-semibold">{myBusiness.pricing}</span>
            </div>
            <div>
              <strong className="block text-slate-800 mb-0.5">Hours Consistency:</strong>
              <span className="text-emerald-700 font-semibold">{myBusiness.hours}</span>
            </div>
            <div>
              <strong className="block text-slate-800 mb-0.5">FAQ Depth:</strong>
              <span className="text-emerald-700 font-semibold">{myBusiness.faqs}</span>
            </div>
            <div>
              <strong className="block text-slate-800 mb-0.5">Schema.org Markup:</strong>
              <span className="text-emerald-700 font-semibold">{myBusiness.schema}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>AI Verdict: {myBusiness.aiVerdict}</span>
          </div>
        </div>

        {/* Competitor B */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Competitor B
            </span>
            <h4 className="font-bold text-slate-800 text-base mt-0.5">{competitorB.name}</h4>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-2xl font-display font-extrabold text-slate-700">
                {competitorB.score}%
              </span>
              <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                Moderate
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div>
              <strong className="block text-slate-800 mb-0.5">Pricing Transparency:</strong>
              <span>{competitorB.pricing}</span>
            </div>
            <div>
              <strong className="block text-slate-800 mb-0.5">Hours Consistency:</strong>
              <span>{competitorB.hours}</span>
            </div>
            <div>
              <strong className="block text-slate-800 mb-0.5">FAQ Depth:</strong>
              <span>{competitorB.faqs}</span>
            </div>
            <div>
              <strong className="block text-slate-800 mb-0.5">Schema.org Markup:</strong>
              <span className="text-amber-700">{competitorB.schema}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-amber-700">
            AI Verdict: {competitorB.aiVerdict}
          </div>
        </div>
      </div>
    </div>
  );
};
