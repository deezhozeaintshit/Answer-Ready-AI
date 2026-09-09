import React, { useState } from 'react';
import {
  Building2,
  Users,
  Sparkles,
  FileText,
  Sliders,
  Plus,
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  ExternalLink,
  Zap,
  DollarSign
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface AgencyDashboardViewProps {
  allProfiles: Record<string, BusinessProfile>;
  activeProfile: BusinessProfile;
  onSelectProfile: (slug: string) => void;
  onOpenNewScan: () => void;
  onOpenSalesReport: () => void;
}

export const AgencyDashboardView: React.FC<AgencyDashboardViewProps> = ({
  allProfiles,
  activeProfile,
  onSelectProfile,
  onOpenNewScan,
  onOpenSalesReport,
}) => {
  const [agencyName, setAgencyName] = useState('Vanguard Digital Marketing');
  const [agencyColor, setAgencyColor] = useState('#10b981');
  const [prospectUrl, setProspectUrl] = useState('');
  const [prospectBusiness, setProspectBusiness] = useState('');
  const [isProspecting, setIsProspecting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const clientList = Object.values(allProfiles) as BusinessProfile[];

  const handleGenerateProspectPitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prospectUrl.trim()) return;
    setIsProspecting(true);
    setTimeout(() => {
      setIsProspecting(false);
      onOpenNewScan();
    }, 1000);
  };

  const handleSaveAgencySettings = () => {
    setToastMsg('White-label branding saved successfully!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Agency & Reseller Suite</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">
              Agency Client Command Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Manage client AI Readiness scores, generate branded white-label audits, and pitch local businesses using our automated 8-page client sales decks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onOpenSalesReport}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>View 8-Page Sales Pitch Deck</span>
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

      {/* Agency Prospecting Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="max-w-2xl mb-4">
          <h3 className="font-display text-base font-bold text-slate-900">
            Prospecting Tool: Instant AI Audit Pitch
          </h3>
          <p className="text-xs text-slate-500">
            Enter any local business website to instantly generate a branded audit report you can email to prospective clients.
          </p>
        </div>

        <form onSubmit={handleGenerateProspectPitch} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Business Website (e.g. cityroofingpros.com)"
            value={prospectUrl}
            onChange={(e) => setProspectUrl(e.target.value)}
            className="flex-1 w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Generate Pitch Audit</span>
          </button>
        </form>
      </div>

      {/* Client Profiles Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Active Client Roster ({clientList.length})
            </h3>
            <p className="text-xs text-slate-500">
              Monitor readiness scores and jump directly into any client's dashboard.
            </p>
          </div>

          <button
            onClick={onOpenNewScan}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors border border-emerald-200"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Onboard New Client</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Client Business</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Market Location</th>
                <th className="pb-3">AI Readiness</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clientList.map((client) => {
                const isCurrent = client.slug === activeProfile.slug;
                return (
                  <tr key={client.slug} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {client.identity.businessName}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {client.contact.website}
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-slate-700">{client.identity.category}</td>
                    <td className="py-3.5 pr-4 text-slate-700">
                      {client.contact.address.city}, {client.contact.address.state}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-md text-xs ${
                          client.aiReadiness.overallScore >= 80
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {client.aiReadiness.overallScore}%
                      </span>
                    </td>
                    <td className="py-3.5">
                      <button
                        onClick={() => onSelectProfile(client.slug)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          isCurrent
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isCurrent ? 'Active Client' : 'Switch Client'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* White-Label Customization Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">
            White-Label Branding Settings
          </h3>
          <p className="text-xs text-slate-500">
            Customize the branding on client reports, export files, and public dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Agency Name
            </label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Agency Brand Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={agencyColor}
                onChange={(e) => setAgencyColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300"
              />
              <span className="font-mono text-xs text-slate-600 font-semibold">{agencyColor}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSaveAgencySettings}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors"
          >
            Save White-Label Branding
          </button>
        </div>
      </div>
    </div>
  );
};
