import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Globe,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Download,
  Code,
  Sparkles,
  Award,
  Star,
  ExternalLink
} from 'lucide-react';
import { BusinessProfile } from '../types';
import { generateSchemaJsonLd, generateMarkdownKnowledgeFile } from '../utils/schemaGenerator';

interface PublicBusinessProfileProps {
  profile: BusinessProfile;
  onBackToDashboard?: () => void;
}

export const PublicBusinessProfile: React.FC<PublicBusinessProfileProps> = ({
  profile,
  onBackToDashboard,
}) => {
  const [viewMode, setViewMode] = useState<'visual' | 'schema' | 'markdown'>('visual');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [copiedCode, setCopiedCode] = useState(false);

  const schemaJson = generateSchemaJsonLd(profile);
  const markdownContent = generateMarkdownKnowledgeFile(profile);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const approvedFaqs = profile.faqs.filter((f) => f.status === 'approved');

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Banner & Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 text-white mb-8 border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-300">
              Public AI Profile URL:
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold">
              https://answerready.ai/business/{profile.slug}
            </div>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl border border-slate-700">
          <button
            onClick={() => setViewMode('visual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === 'visual' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Human View
          </button>
          <button
            onClick={() => setViewMode('schema')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
              viewMode === 'schema' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Schema.org</span>
          </button>
          <button
            onClick={() => setViewMode('markdown')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === 'markdown' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Knowledge File
          </button>
        </div>
      </div>

      {/* Mode 1: Human-Friendly Visual View */}
      {viewMode === 'visual' && (
        <div className="space-y-8">
          {/* Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified AnswerReady AI Profile</span>
                </div>

                <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {profile.identity.businessName}
                </h1>
                <p className="text-sm text-slate-500 font-medium italic">
                  "{profile.identity.tagline}"
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                  <span className="font-semibold text-slate-900">{profile.identity.category}</span>
                  <span>•</span>
                  <span>{profile.contact.address.city}, {profile.contact.address.state}</span>
                  <span>•</span>
                  <span>Serving {profile.identity.serviceAreas.join(', ')}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href={`tel:${profile.contact.phone}`}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {profile.contact.phone}</span>
                </a>
                {profile.contact.appointmentUrl && (
                  <a
                    href={profile.contact.appointmentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Online</span>
                  </a>
                )}
              </div>
            </div>

            {/* Short AI Description */}
            <div className="py-6 border-b border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                Verified Business Summary
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                {profile.identity.description}
              </p>
            </div>

            {/* Contact & Hours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-2.5 text-xs text-slate-700">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Contact & Location
                </h4>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{profile.contact.phone}</span>
                </div>
                {profile.contact.emergencyPhone && (
                  <div className="flex items-center gap-2.5 text-rose-700 font-semibold">
                    <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>24/7 Emergency Line: {profile.contact.emergencyPhone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{profile.contact.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    {profile.contact.address.street}, {profile.contact.address.city}, {profile.contact.address.state} {profile.contact.address.zip}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Operating Hours
                </h4>
                <div className="space-y-1 text-xs text-slate-600">
                  {profile.contact.hours.map((h, i) => (
                    <div key={i} className="flex justify-between py-0.5 border-b border-slate-50">
                      <span className="font-medium text-slate-800">{h.day}</span>
                      <span>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="font-display text-xl font-bold text-slate-900 mb-6">
              Verified Services & Pricing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.services.map((srv) => (
                <div key={srv.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-slate-900 text-sm">{srv.name}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-emerald-700 border border-slate-200">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-bold">{srv.pricing}</span>
                    <span className="text-slate-400 text-[11px]">Upfront Estimate</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Facts & Accreditations */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="font-display text-xl font-bold text-slate-900 mb-4">
              Why Customers Choose Us
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700">
              <div>
                <strong className="block text-slate-900 font-bold mb-2 uppercase tracking-wider text-[11px]">
                  Specialties & Expertise
                </strong>
                <ul className="space-y-1.5">
                  {profile.facts.specialties.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="block text-slate-900 font-bold mb-2 uppercase tracking-wider text-[11px]">
                  Licenses & Certifications
                </strong>
                <ul className="space-y-1.5">
                  {profile.facts.licenses.concat(profile.facts.certifications).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Approved FAQ Accordion */}
          {approvedFaqs.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h3 className="font-display text-xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h3>

              <div className="space-y-3">
                {approvedFaqs.map((faq, idx) => {
                  const isOpen = expandedFaqIndex === idx;
                  return (
                    <div
                      key={faq.id}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-4 text-xs text-slate-700 leading-relaxed bg-white border-t border-slate-100">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Schema.org JSON-LD Code Inspector */}
      {viewMode === 'schema' && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 text-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                <h3 className="font-display font-bold text-lg text-white">
                  Schema.org JSON-LD (Search & AI Ready)
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Paste this snippet inside the <code className="text-emerald-400">&lt;head&gt;</code> of your website.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(schemaJson)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
              <button
                onClick={() =>
                  handleDownloadFile(schemaJson, `${profile.slug}-schema.json`, 'application/json')
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .json</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto max-h-[500px]">
            {schemaJson}
          </pre>
        </div>
      )}

      {/* Mode 3: Markdown AI Knowledge File */}
      {viewMode === 'markdown' && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 text-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="font-display font-bold text-lg text-white">
                  Markdown AI Knowledge Document (.md)
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Formatted specifically for LLM scraping, internal knowledge bases, and custom GPTs.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(markdownContent)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Markdown'}</span>
              </button>
              <button
                onClick={() =>
                  handleDownloadFile(markdownContent, `${profile.slug}-knowledge.md`, 'text/markdown')
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .md</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-[500px] whitespace-pre-wrap">
            {markdownContent}
          </pre>
        </div>
      )}
    </div>
  );
};
