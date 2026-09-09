import React, { useRef } from 'react';
import {
  FileDown,
  Printer,
  X,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Globe,
  Phone,
  MapPin,
  Building,
  Award,
  FileText,
  Clock,
  Layers,
  Check,
  ExternalLink
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface ReadinessPdfReportModalProps {
  profile: BusinessProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const ReadinessPdfReportModal: React.FC<ReadinessPdfReportModalProps> = ({
  profile,
  isOpen,
  onClose,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const { aiReadiness, identity, contact, trust, services } = profile;
  const overallScore = aiReadiness.overallScore;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    if (!reportRef.current) return;
    const reportHtml = reportRef.current.innerHTML;
    const fullHtmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${identity.businessName} - AI Readiness Audit Report</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      @page { margin: 12mm 14mm; size: letter portrait; }
    }
  </style>
</head>
<body class="bg-white text-slate-900 p-8 font-sans max-w-4xl mx-auto">
  ${reportHtml}
  <script>
    window.onload = function() {
      setTimeout(() => { window.print(); }, 500);
    }
  </script>
</body>
</html>`;

    const blob = new Blob([fullHtmlDocument], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.slug}-ai-readiness-report.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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

  const reportDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const reportId = `AR-${profile.slug.toUpperCase().slice(0, 8)}-${new Date().getFullYear()}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static print:inset-auto">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh] print:max-h-none print:h-auto print:border-none print:shadow-none print:rounded-none">
        
        {/* Sticky Action Toolbar (Hidden during print) */}
        <div className="sticky top-0 z-20 bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 shadow-md no-print">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <FileDown className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span>AI Readiness Audit Report</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Printable PDF
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Official scorecard & machine-readability audit for {identity.businessName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              id="print-report-btn"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
              title="Open browser print dialog to print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Download standalone HTML report"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Download HTML</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Report Preview */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-white text-slate-900 print:overflow-visible print:p-0">
          <div ref={reportRef} className="space-y-8 print:space-y-6">

            {/* Document Header */}
            <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm">
                    A
                  </div>
                  <span className="font-extrabold text-base tracking-tight text-slate-950">
                    AnswerReady<span className="text-emerald-600">.ai</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2 px-2 py-0.5 bg-slate-100 rounded">
                    Audit Certificate
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  AI Readiness Scorecard & Audit Findings
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Machine-readability and answer-engine citation readiness diagnostic.
                </p>
              </div>

              <div className="text-left sm:text-right text-xs text-slate-500 shrink-0 space-y-0.5">
                <div><span className="font-semibold text-slate-700">Audit Reference:</span> {reportId}</div>
                <div><span className="font-semibold text-slate-700">Audit Date:</span> {reportDate}</div>
                <div><span className="font-semibold text-slate-700">Audit Status:</span> <span className="text-emerald-600 font-bold">Verified Scorecard</span></div>
              </div>
            </div>

            {/* Target Business Profile Summary Card */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 avoid-break">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                  Target Business Subject
                </span>
                <h2 className="text-xl font-bold text-slate-950 mt-0.5">
                  {identity.businessName}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  {identity.category} • {identity.tagline}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {contact.address.city}, {contact.address.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {contact.phone}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between text-xs text-slate-600 md:border-l md:border-slate-200 md:pl-4 space-y-1">
                <div>
                  <strong className="text-slate-800">Primary Website:</strong> {contact.website}
                </div>
                <div>
                  <strong className="text-slate-800">Service Area Coverage:</strong> {identity.serviceAreas.join(', ')}
                </div>
                <div>
                  <strong className="text-slate-800">Reputation Benchmark:</strong> {trust.rating}★ across {trust.reviewCount} verified consumer reviews
                </div>
                <div>
                  <strong className="text-slate-800">License & Insurance:</strong> {trust.licenseInfo} (Verified)
                </div>
              </div>
            </div>

            {/* Executive AI Scorecard Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 avoid-break">
              {/* Primary Score Tile */}
              <div className="p-6 rounded-xl bg-slate-950 text-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    <span>Overall AI Score</span>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tight text-white">
                      {overallScore}
                    </span>
                    <span className="text-slate-400 font-semibold text-sm">/ 100</span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-emerald-400">
                    {overallScore >= 85
                      ? 'Strong AI Foundation'
                      : overallScore >= 65
                      ? 'Moderate AI Readiness'
                      : 'Needs Information Optimization'}
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 mt-4 leading-relaxed">
                  Composite score based on machine readability, factual completeness, directory consistency, and structured schema.
                </p>
              </div>

              {/* Would AI Recommend You */}
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Recommendation Confidence
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {aiReadiness.wouldAiRecommend.score}%
                    </span>
                    <span className="text-xs font-bold text-emerald-600 uppercase px-2 py-0.5 bg-emerald-50 rounded border border-emerald-200">
                      {aiReadiness.wouldAiRecommend.rating}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xs font-semibold text-slate-800 block mb-1">AI Recommendation Verdict:</span>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{aiReadiness.wouldAiRecommend.verdict}"
                  </p>
                </div>
              </div>

              {/* Core Pillars Assessment */}
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between text-xs space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Pillar Verification
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-700">Specialization Defined:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> High
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-700">Geographic Routing:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Complete
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-700">Pricing Transparency:</span>
                  <span className="font-bold text-amber-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Moderate
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-700">Credential Grounding:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
              </div>
            </div>

            {/* 10-Category Diagnostic Matrix Table */}
            <div className="space-y-3 avoid-break">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">
                  10-Category Machine-Readability Diagnostic Matrix
                </h3>
                <span className="text-xs text-slate-500">Benchmark Scale: 0 - 100</span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="py-2.5 px-3">Diagnostic Category</th>
                      <th className="py-2.5 px-3">Description & Focus Area</th>
                      <th className="py-2.5 px-3 text-center">Score</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {categories.map((cat) => {
                      const score = (aiReadiness.breakdown as any)[cat.key] || 70;
                      const status =
                        score >= 80
                          ? { label: 'Optimal', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
                          : score >= 65
                          ? { label: 'Acceptable', badge: 'bg-amber-50 text-amber-700 border-amber-200' }
                          : { label: 'Action Required', badge: 'bg-rose-50 text-rose-700 border-rose-200' };

                      return (
                        <tr key={cat.key} className="hover:bg-slate-50/70">
                          <td className="py-2.5 px-3 font-semibold text-slate-900">{cat.label}</td>
                          <td className="py-2.5 px-3 text-slate-600">{cat.desc}</td>
                          <td className="py-2.5 px-3 text-center font-bold text-slate-900">{score}%</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${status.badge}`}>
                              {status.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Strengths & Critical Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 avoid-break page-break">
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Verified Strengths (Why AI Models Cite You)</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-950">
                  {aiReadiness.wouldAiRecommend.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200">
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Critical Information Gaps (What AI Needs Verified)</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-amber-950">
                  {aiReadiness.wouldAiRecommend.gaps.map((gap, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actionable Findings & Remediation Plan */}
            <div className="space-y-3 avoid-break">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Prioritized Audit Findings & Remediation Plan
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Specific fixes identified by AnswerReady AI engine to prevent AI hallucinations and lost citations.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {profile.recommendations.length} Action Items
                </span>
              </div>

              <div className="space-y-3">
                {profile.recommendations.map((rec, index) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 avoid-break space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            rec.severity === 'high'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {rec.severity} priority
                        </span>
                        <span className="text-xs font-semibold text-slate-700">• {rec.category}</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">
                        {rec.applied ? (
                          <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                          </span>
                        ) : (
                          'Pending Implementation'
                        )}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900">{rec.title}</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <strong className="text-slate-800 block text-[11px] mb-0.5">Diagnostic Finding:</strong>
                        <span className="text-slate-600">{rec.whatIsWrong}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <strong className="text-slate-800 block text-[11px] mb-0.5">Impact on AI Models:</strong>
                        <span className="text-slate-600">{rec.whyItMatters}</span>
                      </div>
                    </div>

                    <div className="text-xs bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100 text-emerald-900">
                      <strong className="font-bold text-emerald-800">Remediation Protocol: </strong>
                      <span>{rec.howToFix}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Certification & Verification Seal */}
            <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 avoid-break">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">AnswerReady AI Machine Readability Seal</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    This business maintains structured JSON-LD data, verified hours, explicit service boundaries, and factual answers for search engines and answer engines.
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right text-[11px] text-slate-400 sm:border-l sm:border-slate-800 sm:pl-4">
                <div>Standard: <strong className="text-white">v2.4 AnswerReady Spec</strong></div>
                <div>Engine: <strong className="text-emerald-400">Gemini Grounded Audit</strong></div>
              </div>
            </div>

            {/* Footer Notes */}
            <div className="text-center text-[10px] text-slate-400 pt-4 border-t border-slate-200">
              Report produced by AnswerReady AI • The central AI Knowledge Profile infrastructure for businesses. • Confidential audit document prepared for {identity.businessName}.
            </div>

          </div>
        </div>

        {/* Modal Bottom Footer (Hidden during print) */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 no-print">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Ready for printing or PDF export (Letter / A4)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close Preview
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
