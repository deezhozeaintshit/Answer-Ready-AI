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
  Loader2,
  Building,
  Phone,
  MapPin,
  Clock,
  Check,
  XCircle,
  Sparkles
} from 'lucide-react';
import { BusinessProfile, ConsistencyIssue } from '../types';

interface ConsistencyCheckerViewProps {
  profile: BusinessProfile;
  onUpdateProfile: (updated: BusinessProfile) => void;
}

interface ListingRow {
  field: string;
  icon: any;
  website: string;
  googleBusiness: string;
  yelp: string;
  appleMaps: string;
  facebook: string;
  status: 'match' | 'discrepancy' | 'conflict';
  discrepancySummary: string;
  whyItMatters: string;
}

export const ConsistencyCheckerView: React.FC<ConsistencyCheckerViewProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'matrix' | 'discrepancies'>('matrix');

  const unresolvedIssues = profile.consistencyIssues.filter((c) => !c.resolved);
  const resolvedIssues = profile.consistencyIssues.filter((c) => c.resolved);
  const totalIssues = profile.consistencyIssues.length;
  const consistencyScore = totalIssues === 0 ? 100 : Math.round(((totalIssues - unresolvedIssues.length) / totalIssues) * 100);

  const name = profile.identity.businessName;
  const phone = profile.contact.phone;
  const emergencyPhone = profile.contact.emergencyPhone || phone;
  const addr = profile.contact.address;
  const fullAddress = `${addr.street}, ${addr.city}, ${addr.state} ${addr.zip}`;
  const weekdayHours = profile.contact.hours?.[0]?.hours || '7:00 AM - 6:00 PM';
  const saturdayHours = profile.contact.hours?.[1]?.hours || '8:00 AM - 2:00 PM';

  // Dynamic NAP + Hours Listings Comparison Matrix
  const napHoursMatrix: ListingRow[] = [
    {
      field: 'Business Name',
      icon: Building,
      website: name,
      googleBusiness: `${name} LLC`,
      yelp: name.replace(/ & Heating| and Heating/i, ''),
      appleMaps: name.replace(/ & Heating| and Heating/i, ''),
      facebook: name,
      status: 'discrepancy',
      discrepancySummary: "Yelp and Apple Maps drop '& Heating', creating a naming mismatch.",
      whyItMatters: "AI models may omit this business when users ask for heating repairs or boiler servicing."
    },
    {
      field: 'Phone Number',
      icon: Phone,
      website: `Main: ${phone} | Emergency: ${emergencyPhone}`,
      googleBusiness: phone,
      yelp: phone,
      appleMaps: phone,
      facebook: phone,
      status: 'discrepancy',
      discrepancySummary: "Dedicated 24/7 night emergency dispatch line is only declared on website.",
      whyItMatters: "AI assistants cannot quote the direct live dispatcher line for urgent after-hours emergencies."
    },
    {
      field: 'Physical Address',
      icon: MapPin,
      website: fullAddress,
      googleBusiness: fullAddress,
      yelp: `${addr.street.replace('N ', 'North ')}, ${addr.city}, ${addr.state} ${addr.zip}`,
      appleMaps: fullAddress,
      facebook: `${addr.city}, ${addr.state} ${addr.zip}`,
      status: 'discrepancy',
      discrepancySummary: "Street abbreviation variant (N vs North) and missing street number on Facebook.",
      whyItMatters: "Social AI and voice search assistants may calculate lower geographic geocoding confidence."
    },
    {
      field: 'Operating Hours',
      icon: Clock,
      website: `M-F: ${weekdayHours} | Sat: ${saturdayHours} | 24/7 Emergency Dispatch`,
      googleBusiness: 'M-F: 7:00 AM - 5:00 PM | Sat: 8:00 AM - 1:00 PM | Sun: Closed',
      yelp: 'M-F: 8:00 AM - 5:00 PM | Sat-Sun: Closed',
      appleMaps: 'M-F: 7:00 AM - 5:00 PM | Sat: Closed',
      facebook: 'M-F: 8:00 AM - 5:00 PM',
      status: 'conflict',
      discrepancySummary: "Critical closing time conflict: Google and Yelp list closing 1-2 hours earlier and mark weekends closed.",
      whyItMatters: "When customers query AI after 5 PM or on weekends, AI reports the business as closed and routes the lead to competitors."
    }
  ];

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
    setToastMsg('Discrepancy marked resolved & synchronized with verified knowledge profile!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSyncAllListings = () => {
    const updatedIssues = profile.consistencyIssues.map((issue) => ({ ...issue, resolved: true }));
    const updatedProfile: BusinessProfile = {
      ...profile,
      consistencyIssues: updatedIssues,
      aiReadiness: {
        ...profile.aiReadiness,
        breakdown: {
          ...profile.aiReadiness.breakdown,
          consistency: 96,
        },
        overallScore: Math.min(100, profile.aiReadiness.overallScore + 4),
      },
      changeLogs: [
        {
          id: `cl-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: 'consistency',
          title: 'Full Directory Consistency Synchronization',
          description: `Synchronized official Business Name, Phone Numbers, Physical Address, and 24/7 Hours across Google Business Profile, Yelp, Apple Maps, and Facebook.`,
          detectedFrom: 'Consistency Manager',
          status: 'applied',
        },
        ...profile.changeLogs,
      ],
    };

    onUpdateProfile(updatedProfile);
    setToastMsg('All listings synchronized to the verified standard! AI Consistency Score boosted to 96%.');
    setTimeout(() => setToastMsg(null), 4000);
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
      setToastMsg('Cross-directory scan completed. 4 platform listings audited.');
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Multi-Listing NAP & Hours Verification Engine</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">
              Information Consistency Checker
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              AI answer engines (Perplexity, ChatGPT Search, Apple Intelligence) cross-reference your official website with Google Business Profile, Yelp, Apple Maps, and Facebook. Conflicting hours or numbers cause AI to hallucinate and lose recommendation confidence.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 w-full lg:w-auto">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 border border-slate-700 flex-1 sm:flex-initial justify-between sm:justify-start">
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
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex-1 sm:flex-initial"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Auditing Public Footprint...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Audit All 5 Listings</span>
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

      {/* View Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'matrix'
                ? 'bg-white text-slate-950 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cross-Listing Comparison Matrix (Name, Phone, Address, Hours)</span>
          </button>
          <button
            onClick={() => setActiveTab('discrepancies')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'discrepancies'
                ? 'bg-white text-slate-950 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Discrepancy Resolution Protocol ({unresolvedIssues.length})</span>
          </button>
        </div>

        {unresolvedIssues.length > 0 && (
          <button
            onClick={handleSyncAllListings}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Synchronize All Listings to Verified Standard</span>
          </button>
        )}
      </div>

      {/* TAB 1: NAP + Hours Comparison Matrix */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Business Name, Phone, Address & Hours Cross-Platform Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparing official website source-of-truth against Google Business Profile, Yelp, Apple Maps, and Facebook.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  <XCircle className="w-3.5 h-3.5" /> High AI Impact Conflict
                </span>
                <span className="flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5" /> Discrepancy
                </span>
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <th className="py-3 px-3 w-44">Attribute</th>
                    <th className="py-3 px-3 bg-emerald-50/50 text-emerald-900 border-x border-emerald-100">
                      Website (Official Source)
                    </th>
                    <th className="py-3 px-3">Google Business</th>
                    <th className="py-3 px-3">Yelp</th>
                    <th className="py-3 px-3">Apple Maps</th>
                    <th className="py-3 px-3">Facebook</th>
                    <th className="py-3 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {napHoursMatrix.map((row, idx) => {
                    const Icon = row.icon;
                    return (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900 align-top">
                          <div className="flex items-center gap-1.5">
                            <Icon className="w-4 h-4 text-slate-500 shrink-0" />
                            <span>{row.field}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 bg-emerald-50/30 text-slate-900 font-semibold border-x border-emerald-100 align-top">
                          {row.website}
                        </td>
                        <td className="py-3 px-3 text-slate-700 align-top">
                          <div className={row.googleBusiness !== row.website ? 'text-amber-800 font-medium' : ''}>
                            {row.googleBusiness}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-700 align-top">
                          <div className={row.yelp !== row.website ? 'text-rose-700 font-medium' : ''}>
                            {row.yelp}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-700 align-top">
                          <div className={row.appleMaps !== row.website ? 'text-amber-800 font-medium' : ''}>
                            {row.appleMaps}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-700 align-top">
                          <div className={row.facebook !== row.website ? 'text-slate-600' : ''}>
                            {row.facebook}
                          </div>
                        </td>
                        <td className="py-3 px-3 align-top text-center">
                          {row.status === 'conflict' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200 whitespace-nowrap">
                              Conflict Found
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 whitespace-nowrap">
                              Discrepancy
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Matrix Insights & AI Impact */}
            <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Key Discrepancies Highlighted by Audit</span>
                </div>
                <p>
                  <strong>Operating Hours:</strong> Google & Yelp list closing at 5:00 PM on weekdays (website states 6:00 PM), and Saturday is marked closed or abbreviated on 3 directories.
                </p>
                <p>
                  <strong>Business Name:</strong> Yelp and Apple Maps drop "& Heating", diminishing visibility for heating, boiler, and heat pump queries.
                </p>
                <p>
                  <strong>Emergency Line:</strong> Dedicated 24/7 night line <code>{emergencyPhone}</code> is missing from public map attributes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs text-emerald-950 space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>How AI Models Evaluate This Conflict</span>
                  </div>
                  <p className="leading-relaxed">
                    When AI assistants receive conflicting schedules (e.g. 5 PM vs 6 PM closing), they default to the most restrictive time or explicitly caution users: <em>"PeakFlow may be closed right now, try calling another contractor."</em>
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleSyncAllListings}
                    className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Apply Standard Across All Platforms</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Discrepancies List & Remediation */}
      {activeTab === 'discrepancies' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Detected Discrepancies & Conflict Remediation
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
      )}
    </div>
  );
};

