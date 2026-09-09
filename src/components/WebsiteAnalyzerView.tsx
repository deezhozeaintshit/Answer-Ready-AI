import React, { useState } from 'react';
import {
  Globe,
  Search,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Zap,
  ArrowRight,
  ShieldCheck,
  FileText,
  FileQuestion,
  Loader2
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface WebsiteAnalyzerViewProps {
  profile: BusinessProfile;
  onUpdateProfile: (updated: BusinessProfile) => void;
}

export const WebsiteAnalyzerView: React.FC<WebsiteAnalyzerViewProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [analyzingUrl, setAnalyzingUrl] = useState(profile.contact.website || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Issues found
  const auditItems = [
    {
      title: 'Pricing Hidden Behind "Call for Quote"',
      category: 'Pricing Transparency',
      severity: 'high',
      status: 'warning',
      whatIsWrong: 'Your website requires visitors to call for quotes without offering any starting baseline fees.',
      whyItMatters: 'AI search engines prefer businesses with upfront starting numbers (e.g. "Starting at $89"). Without this, AI recommends competitors who publish prices.',
      howToFix: 'Add a starting range or diagnostic fee to your top 3 services.',
      suggestedCopy: 'Diagnostic and service calls start at $89, which is credited toward any completed repair.',
    },
    {
      title: 'Operating Schedule Missing Weekend Clarification',
      category: 'Hours & Availability',
      severity: 'medium',
      status: 'warning',
      whatIsWrong: 'Your contact page lists Monday-Friday hours but leaves Saturday and Sunday blank.',
      whyItMatters: 'When a homeowner searches on Saturday morning, AI assistants report your business as closed or uncertain.',
      howToFix: 'Explicitly state whether Saturday is open by appointment or for 24/7 emergency dispatch.',
      suggestedCopy: 'Monday-Friday: 8:00 AM - 5:00 PM | Saturday: 9:00 AM - 1:00 PM (Emergency dispatch 24/7).',
    },
    {
      title: 'Service Areas Stated as "Local Area" Without Towns',
      category: 'Geographic Routing',
      severity: 'high',
      status: 'warning',
      whatIsWrong: 'The website states "serving the local metro" without specifying neighboring suburbs or counties.',
      whyItMatters: 'When users ask "Does this company come to [Town X]?", AI cannot verify coverage and declines to recommend.',
      howToFix: 'Publish an explicit bulleted list of all served towns and counties on your contact page.',
      suggestedCopy: 'Proudly serving Carroll, Lake View, Denison, Sac City, Glidden, and surrounding counties.',
    },
    {
      title: 'PDF Scans and Image-Only Menus / Brochures',
      category: 'Machine Readability',
      severity: 'medium',
      status: 'warning',
      whatIsWrong: 'Key service descriptions or menus are stored in PDF files or graphical images rather than HTML text.',
      whyItMatters: 'Many AI crawlers do not reliably parse image text or multi-page PDF scans on mobile.',
      howToFix: 'Publish HTML text versions of all PDF service brochures and menus.',
      suggestedCopy: 'Convert PDF service lists into live HTML text on your website.',
    },
    {
      title: 'Verified Schema.org Structured Data',
      category: 'Code & Markup',
      severity: 'low',
      status: 'good',
      whatIsWrong: 'None. AnswerReady AI has generated verified Schema.org JSON-LD.',
      whyItMatters: 'Ensures Google and AI crawlers instantly ingest structured entity data.',
      howToFix: 'Keep your Schema JSON-LD updated via your AnswerReady dashboard.',
      suggestedCopy: 'Active JSON-LD schema installed.',
    },
  ];

  const handleRunAudit = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Deep Website Readability Scanner</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">
            Website AI Readability Audit
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Scan your live website to identify missing facts, vague language, hidden PDF information, and unclear pricing that prevent AI answer engines from recommending you.
          </p>
        </div>
      </div>

      {/* URL Input Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={analyzingUrl}
              onChange={(e) => setAnalyzingUrl(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <button
            onClick={handleRunAudit}
            disabled={isAnalyzing}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Auditing Website...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Run Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Audit Findings List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">
            Website Audit Findings & Plain-English Fixes
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            What's wrong, why it matters, and exact copy to copy-paste onto your website.
          </p>
        </div>

        <div className="space-y-4">
          {auditItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all ${
                item.status === 'good'
                  ? 'bg-emerald-50/20 border-emerald-200'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        item.severity === 'high'
                          ? 'bg-rose-100 text-rose-700'
                          : item.severity === 'medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {item.severity} impact
                    </span>
                    <span className="text-xs text-slate-400 font-medium">• {item.category}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <strong className="text-slate-800 block font-semibold mb-0.5">
                        What is wrong on your website:
                      </strong>
                      <span className="text-slate-600">{item.whatIsWrong}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <strong className="text-slate-800 block font-semibold mb-0.5">
                        Why it hurts AI discovery:
                      </strong>
                      <span className="text-slate-600">{item.whyItMatters}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 pt-1">
                    <strong className="text-emerald-700 font-semibold">How to fix it: </strong>
                    <span>{item.howToFix}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                      Suggested Copy to Add to Your Site:
                    </span>
                    "{item.suggestedCopy}"
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
