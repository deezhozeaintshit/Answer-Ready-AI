import React, { useState } from 'react';
import {
  Printer,
  ChevronRight,
  ChevronLeft,
  FileText,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building,
  TrendingUp,
  Download,
  ArrowRight
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface SalesReportViewProps {
  profile: BusinessProfile;
  agencyName?: string;
}

export const SalesReportView: React.FC<SalesReportViewProps> = ({
  profile,
  agencyName = 'Vanguard Digital AI Solutions',
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = 8;
  const pageTitles = [
    '1. Cover & Executive Summary',
    '2. AI Readiness Score',
    '3. What AI Currently Knows',
    '4. What AI Is Missing',
    '5. Information Inconsistencies',
    '6. Recommended Improvements',
    '7. Optimized AI Profile Example',
    '8. Implementation & Next Steps',
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6 px-4">
      {/* Print / Navigation Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md no-print">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="font-bold text-sm">
              8-Page Client AI Visibility Presentation
            </h3>
            <p className="text-xs text-slate-400">
              Client: {profile.identity.businessName} • Prepared by {agencyName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Prev / Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors ml-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Slide / Page Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm min-h-[580px] flex flex-col justify-between print:border-none print:shadow-none print:p-0">
        {/* Page 1: Cover */}
        {currentPage === 1 && (
          <div className="space-y-8 my-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Confidential AI Discovery Audit</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                AI Business Visibility & Readiness Report
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                Evaluating how ChatGPT, Google Gemini, Perplexity, and Apple Intelligence understand and recommend {profile.identity.businessName}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-100 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Business</span>
                <strong className="text-sm font-bold text-slate-900 block">{profile.identity.businessName}</strong>
                <span className="text-slate-600">{profile.contact.website}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Prepared By</span>
                <strong className="text-sm font-bold text-slate-900 block">{agencyName}</strong>
                <span className="text-slate-600">AnswerReady AI Certified Partner</span>
              </div>
            </div>
          </div>
        )}

        {/* Page 2: Readiness Score */}
        {currentPage === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Page 2: Executive Assessment</span>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">Current AI Readiness Score</h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 p-6 rounded-2xl bg-slate-900 text-white">
              <div className="text-center shrink-0">
                <div className="text-5xl font-display font-extrabold text-emerald-400">
                  {profile.aiReadiness.overallScore}
                </div>
                <div className="text-xs text-slate-400 uppercase font-bold mt-1">out of 100</div>
              </div>
              <div>
                <h4 className="font-bold text-base text-white">{profile.aiReadiness.wouldAiRecommend.rating}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {profile.aiReadiness.summary}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4">
              {Object.entries(profile.aiReadiness.breakdown).map(([k, val]) => (
                <div key={k} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-lg font-bold text-slate-900">{val}%</div>
                  <div className="text-[10px] text-slate-500 capitalize">{k}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page 3: What AI Currently Knows */}
        {currentPage === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Page 3: Baseline Extraction</span>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">What AI Currently Knows About You</h2>
              <p className="text-xs text-slate-500">Information successfully indexed from public online sources.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Business Identity & Category:</strong>
                <p className="text-slate-700">{profile.identity.businessName} ({profile.identity.category})</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Indexed Location:</strong>
                <p className="text-slate-700">{profile.contact.address.city}, {profile.contact.address.state} • Phone: {profile.contact.phone}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Known Description:</strong>
                <p className="text-slate-700">{profile.identity.shortAiDescription}</p>
              </div>
            </div>
          </div>
        )}

        {/* Page 4: What AI Is Missing */}
        {currentPage === 4 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Page 4: The Gaps</span>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">What Critical Information AI Is Missing</h2>
              <p className="text-xs text-slate-500">Why conversational assistants hesitate to recommend you.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 text-rose-900">
                <strong className="block font-bold mb-1">1. Transparent Baseline Pricing:</strong>
                <p>Your website lists "Call for Quote" with zero baseline starting rates. Answer engines like ChatGPT and Perplexity favor businesses providing honest pricing estimates.</p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 text-rose-900">
                <strong className="block font-bold mb-1">2. Weekend & Emergency Dispatch Policies:</strong>
                <p>Saturday/Sunday hours are ambiguous. AI assistants report your business as closed during off-hours rather than citing your emergency response policy.</p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 text-rose-900">
                <strong className="block font-bold mb-1">3. Structured FAQ Answers:</strong>
                <p>Common customer questions (e.g. warranties, payment plans, specific brands) lack structured schema markup, preventing direct citation in answer boxes.</p>
              </div>
            </div>
          </div>
        )}

        {/* Page 5: Inconsistencies */}
        {currentPage === 5 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Page 5: Directory Audit</span>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">Information Inconsistencies Detected</h2>
              <p className="text-xs text-slate-500">Conflicting signals between website, Google Business, and Yelp.</p>
            </div>

            <div className="space-y-3">
              {profile.consistencyIssues.map((c, i) => (
                <div key={i} className="p-4 rounded-xl bg-amber-50/40 border border-amber-200 text-xs">
                  <strong className="font-bold text-slate-900 block mb-1">Conflict in {c.field}:</strong>
                  <div className="grid grid-cols-2 gap-2 my-2 text-[11px]">
                    <span className="p-2 bg-white rounded border border-slate-200"><strong>{c.sourceA.name}:</strong> {c.sourceA.value}</span>
                    <span className="p-2 bg-white rounded border border-rose-200 text-rose-700"><strong>{c.sourceB.name}:</strong> {c.sourceB.value}</span>
                  </div>
                  <p className="text-slate-600">{c.discrepancy}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page 6: Recommendations */}
        {currentPage === 6 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Page 6: Action Plan</span>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">Recommended Improvements</h2>
              <p className="text-xs text-slate-500">Exact changes required to establish complete AI visibility.</p>
            </div>

            <div className="space-y-3 text-xs">
              {profile.recommendations.slice(0, 3).map((r, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-slate-900 font-bold">{r.title}</strong>
                    <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{r.category}</span>
                  </div>
                  <p className="text-slate-600 mb-2">{r.whatIsWrong}</p>
                  <div className="p-2 rounded bg-white border border-slate-200 font-mono text-[11px] text-slate-800">
                    Fix: "{r.suggestedFix}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page 7: Optimized Profile Preview */}
        {currentPage === 7 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Page 7: The Target State</span>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">Your Verified AI Knowledge Profile</h2>
              <p className="text-xs text-slate-500">Preview of the machine-readable presence we will build for you.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white text-xs space-y-3 font-mono">
              <div className="text-emerald-400 font-bold text-sm">{profile.identity.businessName} AI Knowledge Base</div>
              <p className="text-slate-300">{profile.identity.description}</p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                ✓ Verified Schema.org JSON-LD • ✓ {profile.services.length} Priced Services • ✓ {profile.faqs.length} Customer FAQs
              </div>
            </div>
          </div>
        )}

        {/* Page 8: Implementation Options */}
        {currentPage === 8 && (
          <div className="space-y-6 my-auto">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Page 8: Next Steps</span>
              <h2 className="font-display text-3xl font-extrabold text-slate-900 mt-1">Implementation & Partnership Options</h2>
              <p className="text-sm text-slate-600">Choose how you would like to bring your business into the AI era.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">Option A: Self-Service Software</h4>
                  <p className="text-xs text-slate-500 mb-4">Manage your own AI profile with monthly software access.</p>
                  <div className="text-2xl font-extrabold text-slate-900 mb-4">$29 / mo</div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li>• Access to AnswerReady Dashboard</li>
                    <li>• Schema.org code generator</li>
                    <li>• Unlimited Ask AI queries</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 rounded-2xl border-2 border-emerald-500 bg-emerald-50/20 shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100 px-2 py-0.5 rounded">Recommended</span>
                  <h4 className="font-bold text-slate-900 text-base mt-1 mb-1">Option B: Full Done-For-You by {agencyName}</h4>
                  <p className="text-xs text-slate-500 mb-4">We handle 100% of the copywriting, schema coding, and syncing.</p>
                  <div className="text-2xl font-extrabold text-slate-900 mb-4">$149 one-time + $49/mo</div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li>• Complete AI Knowledge Profile buildout</li>
                    <li>• Website Schema.org installation</li>
                    <li>• Resolution of all directory discrepancies</li>
                    <li>• Monthly drift monitoring & updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 no-print">
          <span>{agencyName} • AnswerReady AI Visibility Platform</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>
    </div>
  );
};
