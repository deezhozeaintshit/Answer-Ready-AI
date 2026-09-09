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
  Loader2
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface ContentGeneratorViewProps {
  profile: BusinessProfile;
}

export const ContentGeneratorView: React.FC<ContentGeneratorViewProps> = ({ profile }) => {
  const [selectedType, setSelectedType] = useState<
    'Google Business Profile Bio' | 'FAQ Page' | 'Location Landing Page' | 'Service Descriptions' | 'Social Bios' | 'Review Response'
  >('Google Business Profile Bio');
  const [customFocus, setCustomFocus] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const contentTypes = [
    { name: 'Google Business Profile Bio', icon: Building, desc: 'Optimized 750-character factual description' },
    { name: 'Location Landing Page', icon: MapPin, desc: 'Tailored page for a specific served town/county' },
    { name: 'Service Descriptions', icon: FileText, desc: 'Detailed, problem-solving service offerings' },
    { name: 'FAQ Page', icon: HelpCircle, desc: 'Comprehensive FAQ page ready for your website' },
    { name: 'Social Bios', icon: Share2, desc: 'Instagram, Facebook, and LinkedIn bios' },
    { name: 'Review Response', icon: MessageSquare, desc: 'Professional, fact-grounded response templates' },
  ] as const;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedOutput('');

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
        setGeneratedOutput(data.result?.content || 'Generated content will appear here.');
      }
    } catch {
      setGeneratedOutput('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Factually Grounded AI Writer</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">
            AI Content & Schema Copy Generator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Generate marketing copy, local landing pages, and Google bios strictly grounded in your verified business facts. Zero hallucinations, zero generic fluff.
          </p>
        </div>
      </div>

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
                  onClick={() => setSelectedType(item.name as any)}
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

          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Custom Focus / Target Town (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Focus on Lake View or Water Heaters"
              value={customFocus}
              onChange={(e) => setCustomFocus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Writing Content...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Verified Content</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Generated Output Display */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h4 className="font-bold text-slate-900 text-base">{selectedType}</h4>
                <p className="text-xs text-slate-500">
                  Grounded in {profile.identity.businessName} verified knowledge profile.
                </p>
              </div>

              {generatedOutput && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              )}
            </div>

            {isGenerating ? (
              <div className="py-24 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-3" />
                <p className="text-xs font-semibold text-slate-600">
                  Synthesizing verified business facts into {selectedType}...
                </p>
              </div>
            ) : generatedOutput ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-mono">
                {generatedOutput}
              </div>
            ) : (
              <div className="py-24 text-center text-slate-400 text-xs">
                Click "Generate Verified Content" on the left to write optimized copy.
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>✓ 100% Factually Grounded</span>
            <span>Zero Hallucinations Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
