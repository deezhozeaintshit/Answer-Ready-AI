import React, { useState } from 'react';
import {
  Share2,
  Building,
  Briefcase,
  MapPin,
  ShieldCheck,
  HelpCircle,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface KnowledgeGraphViewProps {
  profile: BusinessProfile;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({ profile }) => {
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    type: string;
    label: string;
    details: string;
    schemaType: string;
  }>({
    id: 'root',
    type: 'Business Entity',
    label: profile.identity.businessName,
    details: `${profile.identity.category} based in ${profile.contact.address.city}, ${profile.contact.address.state}.`,
    schemaType: 'schema:LocalBusiness',
  });

  const nodes = [
    {
      id: 'root',
      type: 'Core Business',
      label: profile.identity.businessName,
      details: profile.identity.description,
      schemaType: 'schema:LocalBusiness',
      color: 'bg-emerald-600 text-white',
    },
    ...profile.services.map((s, idx) => ({
      id: `srv-${idx}`,
      type: 'Service Entity',
      label: s.name,
      details: `${s.description} Pricing: ${s.pricing}`,
      schemaType: 'schema:Service',
      color: 'bg-teal-500 text-white',
    })),
    ...profile.identity.serviceAreas.map((area, idx) => ({
      id: `loc-${idx}`,
      type: 'Service Area',
      label: area,
      details: `Geographic service boundary recognized for local routing.`,
      schemaType: 'schema:AdministrativeArea',
      color: 'bg-sky-500 text-white',
    })),
    ...profile.facts.specialties.map((spec, idx) => ({
      id: `spec-${idx}`,
      type: 'Specialty Fact',
      label: spec,
      details: `Distinct business competency verified in profile.`,
      schemaType: 'schema:knowsAbout',
      color: 'bg-amber-500 text-slate-950',
    })),
    ...profile.faqs.slice(0, 3).map((faq, idx) => ({
      id: `faq-${idx}`,
      type: 'Structured FAQ',
      label: faq.question.slice(0, 30) + '...',
      details: faq.answer,
      schemaType: 'schema:Question',
      color: 'bg-indigo-500 text-white',
    })),
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Semantic Entity Architecture</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">
            AI Business Knowledge Graph
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            How modern AI models (like Google Gemini, OpenAI, and Apple Intelligence) map relationships between your business, services, prices, locations, and credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Graph Canvas */}
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xs min-h-[420px] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
            <span>Click any node to inspect semantic relationships</span>
            <span className="text-emerald-400 font-semibold">{nodes.length} Connected Nodes</span>
          </div>

          {/* Connected Visual Layout */}
          <div className="flex flex-wrap items-center justify-center gap-3 p-4">
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all transform hover:scale-105 ${
                    node.color
                  } ${
                    isSelected
                      ? 'ring-4 ring-emerald-400/50 shadow-xl'
                      : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  <div className="text-[9px] uppercase tracking-wider opacity-80">{node.type}</div>
                  <div className="truncate max-w-[160px] font-bold">{node.label}</div>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Entity
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span> Service
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span> Area
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> FAQ
              </span>
            </div>
            <span>Linked via Schema.org URI</span>
          </div>
        </div>

        {/* Node Inspector Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Entity Inspector</span>
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-1">
              {selectedNode.label}
            </h3>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              {selectedNode.schemaType}
            </span>

            <div className="mt-6 space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-semibold mb-1">Fact Description:</strong>
                <p className="leading-relaxed">{selectedNode.details}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-semibold mb-1">AI Utilization:</strong>
                <p className="text-slate-600">
                  When a customer poses an inquiry referencing this topic, AI models query this specific entity node to formulate verified answers.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            Validated against AnswerReady Knowledge Graph Specification
          </div>
        </div>
      </div>
    </div>
  );
};
