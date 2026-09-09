import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface AskAiTesterProps {
  profile: BusinessProfile;
  onUpdateProfile: (updated: BusinessProfile) => void;
}

export const AskAiTester: React.FC<AskAiTesterProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    answer: string;
    confidenceScore: number;
    canAnswerConfidently: boolean;
    verifiedSourcesUsed: string[];
    missingInformation: string | null;
    actionableFix: string | null;
  } | null>(null);

  const sampleQuestions = [
    `Do you offer emergency or weekend service?`,
    `How much does a typical diagnosis or service call cost?`,
    `Do you travel to nearby surrounding towns outside the main city?`,
    `Do you work with residential homeowners or strictly commercial?`,
    `What certifications, licenses, or warranties do you provide?`,
  ];

  const handleAskQuestion = async (queryText?: string) => {
    const q = queryText || question;
    if (!q.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.trim(),
          profile,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAddFaq = () => {
    if (!question.trim() || !result?.answer) return;

    const newFaq = {
      id: `faq-tested-${Date.now()}`,
      question: question.trim(),
      answer: result.answer,
      status: 'approved' as const,
      source: 'ai-suggested' as const,
      category: 'Tested Inquiries',
    };

    const updatedProfile: BusinessProfile = {
      ...profile,
      faqs: [newFaq, ...profile.faqs],
      changeLogs: [
        {
          id: `cl-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: 'faqs',
          title: `Added Verified FAQ from AI Tester`,
          description: `"${question.trim()}"`,
          detectedFrom: 'AI Question Simulator',
          status: 'applied',
        },
        ...profile.changeLogs,
      ],
    };

    onUpdateProfile(updatedProfile);
    alert('Answer added to your approved FAQ Knowledge Base!');
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Simulation Sandbox</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">
            Ask AI About {profile.identity.businessName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Test how ChatGPT, Google Gemini, Perplexity, and Apple Intelligence respond to real customer inquiries based strictly on your verified knowledge profile.
          </p>
        </div>
      </div>

      {/* Main Interactive Query Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Sample Question Chips */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Try a common customer inquiry:
          </label>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuestion(sq);
                  handleAskQuestion(sq);
                }}
                className="text-left text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                "{sq}"
              </button>
            ))}
          </div>
        </div>

        {/* Input form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskQuestion();
          }}
          className="flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="relative flex-1 w-full">
            <Bot className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Ask anything (e.g. Do you repair water heaters on Saturday?)"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Simulating AI Answer...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Simulate Answer</span>
              </>
            )}
          </button>
        </form>

        {/* Result Area */}
        {result && (
          <div className="pt-6 border-t border-slate-100 space-y-5 animate-in fade-in">
            {/* Header: Confidence & Verdict */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  {result.confidenceScore}%
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {result.canAnswerConfidently
                      ? 'AI Can Confidently Recommend Your Business'
                      : 'AI Has Low Confidence (Missing Information)'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Confidence based on verified source facts and clarity.
                  </p>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${
                  result.canAnswerConfidently
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {result.canAnswerConfidently ? 'High Trust & Accuracy' : 'Information Gap Detected'}
              </span>
            </div>

            {/* Synthesized Answer Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulated Assistant Output (ChatGPT / Gemini):</span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-100">
                "{result.answer}"
              </p>

              {/* Verified Sources */}
              {result.verifiedSourcesUsed?.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    Verified Sources Cited:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.verifiedSourcesUsed.map((source, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200"
                      >
                        ✓ {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Missing Info Alert & Actionable Fix */}
            {result.missingInformation && (
              <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Information Gap Identified</span>
                </div>
                <p className="text-xs text-amber-900">{result.missingInformation}</p>
                {result.actionableFix && (
                  <div className="p-3 rounded-xl bg-white border border-amber-200 text-xs text-slate-700">
                    <strong className="text-emerald-700">Suggested profile addition: </strong>
                    <span>{result.actionableFix}</span>
                  </div>
                )}
              </div>
            )}

            {/* Quick Add to Approved FAQ */}
            <div className="flex justify-end">
              <button
                onClick={handleQuickAddFaq}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add This Q&A to Approved FAQ Base</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
