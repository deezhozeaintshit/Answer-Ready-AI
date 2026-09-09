import React, { useState } from 'react';
import {
  Code,
  Sparkles,
  Bot,
  Send,
  Check,
  Copy,
  MessageSquare,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface EmbedWidgetViewProps {
  profile: BusinessProfile;
}

export const EmbedWidgetView: React.FC<EmbedWidgetViewProps> = ({ profile }) => {
  const [widgetColor, setWidgetColor] = useState('#10b981');
  const [widgetPosition, setWidgetPosition] = useState<'bottom-right' | 'bottom-left' | 'inline'>('bottom-right');
  const [testQuestion, setTestQuestion] = useState('');
  const [testAnswer, setTestAnswer] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const embedScript = `<!-- AnswerReady AI Verified Business Widget -->
<script
  src="https://cdn.answerready.ai/widget.js"
  data-business="${profile.slug}"
  data-color="${widgetColor}"
  data-position="${widgetPosition}"
  async>
</script>`;

  const handleTestSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuestion.trim()) return;
    setTestAnswer(
      `Yes! ${profile.identity.businessName} provides verified answers. ${profile.identity.shortAiDescription} You can reach us directly at ${profile.contact.phone}.`
    );
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>On-Site Conversion Tool</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">
            Embeddable AI Business Knowledge Widget
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Give visitors on your website instant, verified answers to pricing, hours, and service questions powered directly by your AnswerReady knowledge profile.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Customization & Code Snippet */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Widget Configuration
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize appearance and copy the 1-line script tag.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Widget Brand Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={widgetColor}
                  onChange={(e) => setWidgetColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300"
                />
                <span className="font-mono text-slate-600 font-semibold">{widgetColor}</span>
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Placement Position
              </label>
              <div className="flex gap-2">
                {(['bottom-right', 'bottom-left', 'inline'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setWidgetPosition(pos)}
                    className={`px-3 py-1.5 rounded-lg font-medium border transition-colors capitalize ${
                      widgetPosition === pos
                        ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {pos.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Embed Code
              </label>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
              {embedScript}
            </pre>
            <p className="text-[11px] text-slate-500 mt-2">
              Paste this before the closing <code className="text-slate-700">&lt;/body&gt;</code> tag on your website.
            </p>
          </div>
        </div>

        {/* Right: Live Interactive Widget Preview */}
        <div className="bg-slate-100 rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center relative min-h-[420px]">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
            Live Preview on Your Website
          </div>

          {/* Floating Widget Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full p-5 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                style={{ backgroundColor: widgetColor }}
              >
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Ask {profile.identity.businessName}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified AI Knowledge Base
                </div>
              </div>
            </div>

            {testAnswer && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed animate-in fade-in">
                {testAnswer}
              </div>
            )}

            <form onSubmit={handleTestSimulate} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about hours, pricing, services..."
                value={testQuestion}
                onChange={(e) => setTestQuestion(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl text-white transition-opacity"
                style={{ backgroundColor: widgetColor }}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="text-center text-[10px] text-slate-400">
              Powered by AnswerReady.ai
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
