import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Loader2
} from 'lucide-react';
import { BusinessProfile, ProfileChangeLog } from '../types';

interface ChangeMonitoringViewProps {
  profile: BusinessProfile;
  onUpdateProfile: (updated: BusinessProfile) => void;
}

export const ChangeMonitoringView: React.FC<ChangeMonitoringViewProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSimulateChange = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      const simulatedLog: ProfileChangeLog = {
        id: `cl-sim-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        type: 'hours',
        title: 'Detected Updated Saturday Hours on Website',
        description: 'Website updated to: Saturday 8:00 AM - 2:00 PM (Extended by 1 hour).',
        detectedFrom: profile.contact.website,
        status: 'detected',
      };
      onUpdateProfile({
        ...profile,
        changeLogs: [simulatedLog, ...profile.changeLogs],
      });
      setToastMsg('Website scan detected 1 new schedule change!');
      setTimeout(() => setToastMsg(null), 3000);
    }, 1200);
  };

  const handleApplyLog = (logId: string) => {
    const updatedLogs = profile.changeLogs.map((l) =>
      l.id === logId ? { ...l, status: 'applied' as const } : l
    );
    onUpdateProfile({ ...profile, changeLogs: updatedLogs });
    setToastMsg('Change accepted and applied to AI Knowledge Profile!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Automated Website Drift Detection</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">
              Change & Accuracy Monitoring
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              AnswerReady continuously scans your website. When you update holiday hours, add a new service, or adjust prices, we detect the changes and update your AI Knowledge Profile.
            </p>
          </div>

          <button
            onClick={handleSimulateChange}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors shrink-0"
          >
            {isSimulating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking Website...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Run Change Check</span>
              </>
            )}
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Changes List Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">
            Detected Modifications & Profile History
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit trail of changes synced with your public presence.
          </p>
        </div>

        <div className="space-y-3">
          {profile.changeLogs.map((log) => (
            <div
              key={log.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                log.status === 'detected'
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      log.status === 'detected'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {log.status === 'detected' ? 'Needs Review' : 'Synchronized'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{log.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{log.title}</h4>
                <p className="text-xs text-slate-600">{log.description}</p>
                <div className="text-[11px] text-slate-400">
                  Detected from: <span className="font-mono text-slate-600">{log.detectedFrom}</span>
                </div>
              </div>

              {log.status === 'detected' && (
                <button
                  onClick={() => handleApplyLog(log.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-colors shrink-0 flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Update Profile</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
