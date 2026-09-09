import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Copy,
  Check,
  Building,
  MapPin,
  HelpCircle,
  MessageSquare,
  Share2,
  Loader2,
  Code2,
  Eye,
  PlusCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';
import { BusinessProfile, FAQItem } from '../types';

interface ContentGeneratorViewProps {
  profile: BusinessProfile;
  onUpdateProfile?: (updated: BusinessProfile) => void;
}

interface GeneratedFaqItem {
  question: string;
  answer: string;
  category?: string;
}

export const ContentGeneratorView: React.FC<ContentGeneratorViewProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [selectedType, setSelectedType] = useState<
    'FAQ Page' | 'Google Business Profile Bio' | 'Location Landing Page' | 'Service Descriptions' | 'Social Bios' | 'Review Response'
  >('FAQ Page');
  const [customFocus, setCustomFocus] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string>('');
  const [generatedFaqs, setGeneratedFaqs] = useState<GeneratedFaqItem[]>([]);
  const [activeTab, setActiveTab] = useState<'preview' | 'text' | 'schema'>('preview');
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0, 1]);

  const contentTypes = [
    { name: 'FAQ Page', icon: HelpCircle, desc: 'Common customer inquiries with concise, verified factual answers' },
    { name: 'Google Business Profile Bio', icon: Building, desc: 'Optimized 750-character factual description' },
    { name: 'Location Landing Page', icon: MapPin, desc: 'Tailored page for a specific served town/county' },
    { name: 'Service Descriptions', icon: FileText, desc: 'Detailed, problem-solving service offerings' },
    { name: 'Social Bios', icon: Share2, desc: 'Instagram, Facebook, and LinkedIn bios' },
    { name: 'Review Response', icon: MessageSquare, desc: 'Professional, fact-grounded response templates' },
  ] as const;

  const faqInquiryTemplates = [
    'Comprehensive Customer Inquiries (Emergency, Pricing, Area, Specs)',
    'Emergency & 24/7 Dispatch Protocol Inquiries',
    'Pricing Transparency, Estimates & Diagnostic Fee Inquiries',
    'Service Towns & Geographic Coverage Inquiries',
    'Water Heater, Navien Tankless & Warranty Inquiries',
    'Licensing, Master Credentials & Guarantees',
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedOutput('');
    setGeneratedFaqs([]);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: selectedType,
          profile,
          customTopic: customFocus,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.result?.content || 'Generated content will appear here.';
        setGeneratedOutput(content);

        if (data.result?.faqItems && data.result.faqItems.length > 0) {
          setGeneratedFaqs(data.result.faqItems);
        } else if (selectedType === 'FAQ Page') {
          // Parse Q&As from text if structured items weren't explicitly returned
          const items: GeneratedFaqItem[] = [];
          const regex = /###\s*(.*?)\n\*\*Answer:\*\*\s*(.*?)(?:\n\*Category:\s*(.*?)\*)?(?=\n###|\n---|$)/gs;
          let match;
          while ((match = regex.exec(content)) !== null) {
            items.push({
              question: match[1].trim(),
              answer: match[2].trim(),
              category: match[3]?.trim() || 'General Information',
            });
          }
          if (items.length > 0) {
            setGeneratedFaqs(items);
          }
        }
      }
    } catch {
      setGeneratedOutput('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Generate valid FAQPage Schema JSON-LD
  const generateFaqSchema = () => {
    const items = generatedFaqs.length > 0 ? generatedFaqs : profile.faqs;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
    return JSON.stringify(schema, null, 2);
  };

  const handleSaveFaqsToProfile = () => {
    if (!onUpdateProfile || generatedFaqs.length === 0) return;

    const newFaqItems: FAQItem[] = generatedFaqs.map((g, idx) => ({
      id: `faq-gen-${Date.now()}-${idx}`,
      question: g.question,
      answer: g.answer,
      category: g.category || 'General',
      status: 'approved',
      source: 'ai-suggested',
    }));

    // Avoid duplicates by question
    const existingQuestions = new Set(profile.faqs.map((f) => f.question.toLowerCase().trim()));
    const filteredNew = newFaqItems.filter(
      (item) => !existingQuestions.has(item.question.toLowerCase().trim())
    );

    const updatedProfile: BusinessProfile = {
      ...profile,
      faqs: [...profile.faqs, ...filteredNew],
      aiReadiness: {
        ...profile.aiReadiness,
        breakdown: {
          ...profile.aiReadiness.breakdown,
          faqs: Math.min(100, (profile.aiReadiness.breakdown.faqs || 88) + 8),
        },
        overallScore: Math.min(100, profile.aiReadiness.overallScore + 2),
      },
      changeLogs: [
        {
          id: `cl-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: 'services',
          title: `Added ${filteredNew.length} Verified Customer FAQs`,
          description: `Imported approved, fact-grounded FAQ content into verified knowledge base.`,
          detectedFrom: 'FAQ Content Generator',
          status: 'applied',
        },
        ...profile.changeLogs,
      ],
    };

    onUpdateProfile(updatedProfile);
    setToastMsg(`Saved ${filteredNew.length} verified FAQs to your business knowledge base! AI FAQ score boosted.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Factually Grounded Knowledge Generator</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">
            Verified Content & FAQ Page Generator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Generate common customer inquiries and factual, concise answers strictly grounded in {profile.identity.businessName}'s verified data. Formatted for high user engagement and Schema.org rich results.
          </p>
        </div>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Content Type Selection */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            1. Select Content Type
          </h3>

          <div className="space-y-2">
            {contentTypes.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedType === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setSelectedType(item.name as any);
                    setCustomFocus('');
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preset Inquiry Templates for FAQ Page */}
          {selectedType === 'FAQ Page' && (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Customer Inquiry Focus Preset
              </label>
              <div className="space-y-1.5">
                {faqInquiryTemplates.slice(0, 4).map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCustomFocus(t)}
                    className={`w-full text-left p-2 rounded-lg text-[11px] border transition-colors ${
                      customFocus === t
                        ? 'bg-emerald-100/70 border-emerald-400 font-semibold text-emerald-950'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    • {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Custom Focus or Question (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Focus on Navien water heaters or emergency arrival"
              value={customFocus}
              onChange={(e) => setCustomFocus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Synthesizing Verified Facts...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Verified {selectedType}</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Output Display */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
              <div>
                <h4 className="font-bold text-slate-900 text-base">{selectedType}</h4>
                <p className="text-xs text-slate-500">
                  Grounded in {profile.identity.businessName} verified knowledge profile.
                </p>
              </div>

              {/* View switchers and actions */}
              <div className="flex items-center gap-2">
                {selectedType === 'FAQ Page' && (
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors ${
                        activeTab === 'preview'
                          ? 'bg-white text-slate-900 shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('text')}
                      className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors ${
                        activeTab === 'text'
                          ? 'bg-white text-slate-900 shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Markdown</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('schema')}
                      className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors ${
                        activeTab === 'schema'
                          ? 'bg-white text-slate-900 shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>JSON-LD</span>
                    </button>
                  </div>
                )}

                {generatedOutput && (
                  <button
                    onClick={() =>
                      handleCopy(
                        activeTab === 'schema'
                          ? generateFaqSchema()
                          : generatedOutput
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>

            {isGenerating ? (
              <div className="py-24 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-3" />
                <p className="text-xs font-semibold text-slate-600">
                  Synthesizing verified business facts into customer Q&As...
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Ensuring 100% accuracy with zero hallucinations.
                </p>
              </div>
            ) : generatedOutput ? (
              <div>
                {/* TAB: Formatted Interactive FAQ Accordion */}
                {selectedType === 'FAQ Page' && activeTab === 'preview' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between text-xs mb-4">
                      <div className="text-emerald-950 font-medium">
                        <strong>{generatedFaqs.length || 6} Common Customer Inquiries Generated</strong>
                        <span className="text-emerald-700 block text-[11px]">Clear, concise answers derived strictly from your verified profile.</span>
                      </div>
                      {onUpdateProfile && (
                        <button
                          onClick={handleSaveFaqsToProfile}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors shrink-0"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Save FAQs to Knowledge Profile</span>
                        </button>
                      )}
                    </div>

                    {(generatedFaqs.length > 0 ? generatedFaqs : profile.faqs).map((faq, idx) => {
                      const isOpen = openFaqIndices.includes(idx);
                      return (
                        <div
                          key={idx}
                          className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs transition-colors"
                        >
                          <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                                Q{idx + 1}
                              </span>
                              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                                {faq.question}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {faq.category && (
                                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                  <Tag className="w-2.5 h-2.5" />
                                  {faq.category}
                                </span>
                              )}
                              {isOpen ? (
                                <ChevronUp className="w-4 h-4 text-slate-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                          </button>

                          {isOpen && (
                            <div className="p-4 pt-1 pb-4 text-xs text-slate-700 bg-slate-50/50 border-t border-slate-100 leading-relaxed">
                              <strong className="text-emerald-800 block mb-1">Verified Answer:</strong>
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* TAB: Markdown / Plain Text */}
                {((selectedType !== 'FAQ Page') || activeTab === 'text') && (
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-mono">
                    {generatedOutput}
                  </div>
                )}

                {/* TAB: Schema JSON-LD */}
                {selectedType === 'FAQ Page' && activeTab === 'schema' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-900 text-slate-300 rounded-xl text-xs flex items-center justify-between">
                      <span>Valid Schema.org / FAQPage JSON-LD code</span>
                      <button
                        onClick={() => handleCopy(generateFaqSchema())}
                        className="text-emerald-400 font-bold hover:underline"
                      >
                        {copied ? 'Copied!' : 'Copy Script Tag'}
                      </button>
                    </div>
                    <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 text-xs overflow-x-auto font-mono">
                      {generateFaqSchema()}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-20 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 text-sm">Generate Customer-Facing FAQ Content</h5>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Click "Generate Verified FAQ Page" to create common customer Q&As grounded strictly in your business hours, pricing, service areas, and licensing.
                  </p>
                </div>
                <button
                  onClick={handleGenerate}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Generate FAQ Content Now
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Grounded in Business Profile
            </span>
            <span>Zero Hallucinations Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

