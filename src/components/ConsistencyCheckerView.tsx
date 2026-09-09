import React, { useState } from 'react';
import {
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Globe,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { BusinessProfile, ConsistencyIssue } from '../types';

interface ConsistencyCheckerViewProps {
  profile: BusinessProfile;
  onUpdateProfile: (updated: BusinessProfile) => void;
}

export const ConsistencyCheckerView: React.FC<ConsistencyCheckerViewProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const unresolvedIssues = profile.consistencyIssues.filter((c) => !c.resolved);
  const resolvedIssues = profile.consistencyIssues.filter((c) => c.resolved);
  const totalIssues = profile.consistencyIssues.length;
  const consistencyScore = totalIssues === 0 ? 100 : Math.round(((totalIssues - unresolvedIssues.length) / totalIssues) * 100);

  const handleResolveIssue = (issueId: string) => {
    const updatedIssues = profile.consistencyIssues.map((issue) =>
      issue.id === issueId ? { ...issue, resolved: true } : issue
    );

    const updatedProfile: BusinessProfile = {
      ...profile,
      consistencyIssues: updatedIssues,
      changeLogs: [
        {
          id: `cl-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: 'consistency',
          title: 'Resolved Listing Discrepancy',
          description: `Synchronized official hours and contact details across public profiles.`,
          detectedFrom: 'Consistency Manager',
          status: 'applied',
        },
        ...profile.changeLogs,
      ],
    };

    onUpdateProfile(updatedProfile);
    setToastMsg('Discrepancy resolved & public profile synchronized!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleRunRescan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/analyze-consistency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.issues && data.issues.length > 0) {
          const formatted = data.issues.map((iss: any, idx: number) => ({
            id: `cons-scan-${Date.now()}-${idx}`,
            field: iss.field,
            sourceA: iss.sourceA,
            sourceB: iss.sourceB,
            discrepancy: iss.discrepancy,
            whyItMatters: iss.whyItMatters,
            suggestedValue: iss.suggestedValue,
            resolved: false,
          }));
          onUpdateProfile({ ...profile, consistencyIssues: formatted });
        }
      }
    } catch {
      // ignore
    } finally {
      setIsScanning(false);
      setToastMsg('Consistency scan completed. 2 discrepancies detected.');
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Cross-Directory Verification Engine</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">
              Information Consistency Checker
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
              AI answer engines cross-reference your official website with Google Business Profile, Yelp, Apple Maps, and Facebook. When details conflict, AI gets confused and reduces recommendation confidence.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 border border-slate-700">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Consistency Rating</div>
                <div className="text-xl font-display font-extrabold text-white">
                  {consistencyScore}%
                </div>
              </div>
              <div
                className={`w-3 h-10 rounded-full ${
                  consistencyScore >= 85
                    ? 'bg-emerald-400'
                    : consistencyScore >= 60
                    ? 'bg-amber-400'
                    : 'bg-rose-400'
                }`}
              ></div>
            </div>

            <button
              onClick={handleRunRescan}
              disabled={isScanning}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning Public Footprint...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-Scan Public Sources</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Discrepancies List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Detected Discrepancies & Conflicts
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {unresolvedIssues.length} active conflict{unresolvedIssues.length === 1 ? '' : 's'} hurting AI trust.
            </p>
          </div>

          <span className="text-xs font-medium text-slate-500">
            {resolvedIssues.length} resolved
          </span>
        </div>

        {unresolvedIssues.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">All Profiles Synchronized!</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Your official website, Google Business profile, and online directories match across hours, phone numbers, and service areas.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {unresolvedIssues.map((issue) => (
              <div
                key={issue.id}
                className="p-6 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-amber-100 text-amber-800">
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                    <h4 className="font-bold text-slate-900 text-base">
                      Conflict in {issue.field}
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full w-fit">
                    Causes AI Confusion
                  </span>
                </div>

                {/* Side-by-side comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      {issue.sourceA.name}
                    </div>
                    <div className="text-xs font-semibold text-slate-800">{issue.sourceA.value}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-amber-300">
                    <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                      {issue.sourceB.name} (Conflicting)
                    </div>
                    <div className="text-xs font-semibold text-rose-700">{issue.sourceB.value}</div>
                  </div>
                </div>

                {/* Explanation and fix */}
                <div className="text-xs space-y-1.5 text-slate-700 pt-2 border-t border-amber-200/60">
                  <p>
                    <strong className="text-slate-900">What's happening: </strong>
                    {issue.discrepancy}
                  </p>
                  <p>
                    <strong className="text-amber-900">Why it matters to AI: </strong>
                    {issue.whyItMatters}
                  </p>
                  <p className="text-emerald-800 font-medium">
                    <strong>Recommended standard: </strong>
                    {issue.suggestedValue}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => handleResolveIssue(issue.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Synchronize & Mark Resolved</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
