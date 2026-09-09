import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Building,
  ShieldCheck,
  Star,
  Sparkles,
  RefreshCw,
  Loader2,
  Award,
  Zap,
  HelpCircle,
  FileCode,
  DollarSign,
  PhoneCall,
  Clock,
  ArrowUpRight,
  Target
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface CompetitorComparisonViewProps {
  profile: BusinessProfile;
}

interface CompetitorData {
  name: string;
  type: string;
  readinessScore: number;
  informationCompleteness: { score: number; summary: string };
  serviceClarity: { score: number; summary: string };
  trustSignals: { score: number; summary: string };
  pricingTransparency: string;
  hoursConsistency: string;
  aiVerdict: string;
  keyStrengths: string[];
  keyVulnerabilities: string[];
}

interface KeyDifference {
  dimension: string;
  myAdvantage: string;
  competitorGap: string;
  aiImpact: string;
}

interface StrategicOpportunity {
  title: string;
  opportunity: string;
  expectedGain: string;
  recommendedAction: string;
}

export const CompetitorComparisonView: React.FC<CompetitorComparisonViewProps> = ({ profile }) => {
  const [loading, setLoading] = useState(false);
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [keyDifferences, setKeyDifferences] = useState<KeyDifference[]>([]);
  const [strategicOpportunities, setStrategicOpportunities] = useState<StrategicOpportunity[]>([]);
  const [activeDimension, setActiveDimension] = useState<'all' | 'completeness' | 'clarity' | 'trust'>('all');

  const bName = profile.identity.businessName;
  const myScore = profile.aiReadiness.overallScore;

  // Default comparison data
  const defaultCompetitors: CompetitorData[] = [
    {
      name: 'Midwest Regional Roto-Pro Franchise',
      type: 'National Franchise Chain',
      readinessScore: 65,
      informationCompleteness: {
        score: 70,
        summary: 'Standard corporate landing page with broad regional service zones. Lacks specific municipal coverage details for surrounding rural towns.',
      },
      serviceClarity: {
        score: 58,
        summary: 'Broad generic service names without localized diagnostic fees, itemized quotes, or specific equipment brand certifications.',
      },
      trustSignals: {
        score: 68,
        summary: 'Strong national brand awareness, but reviews are fragmented across 8 different sub-branches with no master license number declared.',
      },
      pricingTransparency: 'Vague ("$99 dispatch fee, repairs quoted on site")',
      hoursConsistency: 'Listed 24/7 call center, but actual local technician dispatch availability after 6 PM is unverified.',
      aiVerdict: 'Moderately Recommended (Secondary Choice)',
      keyStrengths: ['National brand name recognition', 'Centralized 1-800 phone answering'],
      keyVulnerabilities: ['No published flat-rate menu', 'Missing localized LocalBusiness JSON-LD schema', 'Call-center answers lack local knowledge']
    },
    {
      name: 'Carroll County Drain & Rooter Express',
      type: 'Traditional Independent Contractor',
      readinessScore: 48,
      informationCompleteness: {
        score: 50,
        summary: 'Single-page legacy website with broken inquiry form, unlisted holiday hours, and no service territory boundary map.',
      },
      serviceClarity: {
        score: 42,
        summary: 'Only lists broad keywords ("Plumbing, Drains, Pipes") with zero problem-solution descriptions or customer FAQs.',
      },
      trustSignals: {
        score: 54,
        summary: '4.1 stars across 28 reviews. State license number and master certifications are not published anywhere online.',
      },
      pricingTransparency: 'Hidden ("Call for Estimate")',
      hoursConsistency: 'Severe conflict: Website says Mon-Fri 8-5, Yelp says Closed weekends, voicemail claims 24/7.',
      aiVerdict: 'Hard for AI to Recommend Confidently',
      keyStrengths: ['20+ years in community'],
      keyVulnerabilities: ['Inconsistent operating hours across directories', 'Zero structured FAQs', 'AI cannot verify after-hours response time']
    },
    {
      name: 'Iowa Heartland Comfort & Plumbing',
      type: 'Regional Multi-Trade Provider',
      readinessScore: 59,
      informationCompleteness: {
        score: 64,
        summary: 'Claims to cover 10+ counties; difficult for AI to know if technicians actually dispatch to Carroll or Sac County.',
      },
      serviceClarity: {
        score: 60,
        summary: 'Devotes 80% of content to HVAC and AC replacement; plumbing services are buried in secondary menus.',
      },
      trustSignals: {
        score: 62,
        summary: 'BBB accredited with 4.6 stars across 80 reviews, but no specialized water heater or hydro-jetting credentials.',
      },
      pricingTransparency: 'Diagnostic fee mentioned ($119), repair rates hidden',
      hoursConsistency: 'Mon-Fri 8am-5pm with heavy after-hours emergency surcharge',
      aiVerdict: 'Occasionally Recommended for HVAC, Rarely for Emergency Plumbing',
      keyStrengths: ['Strong heating and cooling reputation in region'],
      keyVulnerabilities: ['Plumbing treated as minor secondary trade', 'High $119 diagnostic fee', 'No after-hours live dispatch declaration']
    }
  ];

  const defaultKeyDifferences: KeyDifference[] = [
    {
      dimension: 'Information Completeness',
      myAdvantage: `Explicitly lists 5 serviced counties, verified 24/7 emergency dispatch line (${profile.contact.emergencyPhone || profile.contact.phone}), and full street address.`,
      competitorGap: 'Competitors list vague regions ("Greater Central Iowa") and generic contact forms without direct night dispatch lines.',
      aiImpact: 'AI answer engines (Perplexity, ChatGPT, Gemini) prioritize your business when searchers specify towns like Lake View, Denison, or Carroll.'
    },
    {
      dimension: 'Service Clarity & Pricing',
      myAdvantage: `Itemized diagnostic fee ($89 waived with repair) and published baseline replacement costs ($1,450 tank / $2,800 tankless).`,
      competitorGap: 'Competitors rely on "Call for estimate" or vague starting prices, creating zero actionable data for AI.',
      aiImpact: 'When users ask "How much does a plumber charge in Carroll IA?", AI models cite your business as the definitive benchmark answer.'
    },
    {
      dimension: 'Trust Signals & Licensing',
      myAdvantage: `Published Iowa Master Plumber license #MP-88319, Navien NSS Specialist certification, and 312 reviews (4.9★).`,
      competitorGap: 'Competitors have unverified claims, missing license registrations, and small or fragmented review counts.',
      aiImpact: 'Grounding systems score your entity with 94% trust confidence, reducing AI hallucination and refusal rates to near zero.'
    }
  ];

  const defaultOpportunities: StrategicOpportunity[] = [
    {
      title: 'Capture High-Margin Tankless Water Heater AI Queries',
      opportunity: 'Local competitors only mention generic "water heater repair". Your official Navien Certified Specialist credential and $2,800 baseline quote make you the top authoritative citation in Perplexity and ChatGPT.',
      expectedGain: '+35% increase in high-ticket installation calls and replacement inquiries.',
      recommendedAction: 'Publish your Tankless FAQ and Navien certification badge prominently in your structured LocalBusiness schema.'
    },
    {
      title: 'Dominate "Emergency Plumber Near Me" Voice Queries',
      opportunity: 'Competitor directories list 5:00 PM weekday closures and closed weekends with no live dispatch info. By promoting your 24/7 live dispatcher line across Apple Maps and Siri, you capture after-hours emergencies uncontested.',
      expectedGain: 'Capture 100% of evening and weekend voice assistant queries (Siri, Google Assistant).',
      recommendedAction: 'Synchronize the 24/7 Emergency Line and resolve the 1-hour Google Business Profile closing discrepancy.'
    },
    {
      title: 'Monopolize Rich AI Snippets via Structured FAQPage Schema',
      opportunity: 'None of your 3 primary competitors have JSON-LD Schema.org or structured FAQ entities deployed on their websites.',
      expectedGain: 'Exclusive rich snippet card placement in Google and instant inclusion in Perplexity answer summaries.',
      recommendedAction: 'Copy and embed the generated AnswerReady AI JSON-LD schema into your website header/footer.'
    }
  ];

  useEffect(() => {
    setCompetitors(defaultCompetitors);
    setKeyDifferences(defaultKeyDifferences);
    setStrategicOpportunities(defaultOpportunities);
  }, [profile]);

  const handleRunAiBenchmark = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analyze-competitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          if (json.data.competitors && json.data.competitors.length > 0) {
            setCompetitors(json.data.competitors);
          }
          if (json.data.keyDifferences && json.data.keyDifferences.length > 0) {
            setKeyDifferences(json.data.keyDifferences);
          }
          if (json.data.strategicOpportunities && json.data.strategicOpportunities.length > 0) {
            setStrategicOpportunities(json.data.strategicOpportunities);
          }
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Competitor AI Readiness Intelligence</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">
              Competitive AI Readiness Analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Evaluating local category competitors on <strong>Information Completeness</strong>, <strong>Service Clarity</strong>, and <strong>Trust Signals</strong> to identify key differences and high-value opportunities for AI discovery.
            </p>
          </div>

          <button
            onClick={handleRunAiBenchmark}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Local Landscape...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Re-Analyze Category Competitors</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Overview Metric Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border-2 border-emerald-500 shadow-md relative">
          <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider">
            Your Profile
          </div>
          <div className="text-xs font-semibold text-slate-500">{bName}</div>
          <div className="text-3xl font-display font-extrabold text-emerald-600 mt-1">
            {myScore}%
          </div>
          <div className="text-[11px] text-emerald-800 font-medium mt-1">
            Strongly Recommended by AI
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Market Lead</span>
            <span className="font-bold text-emerald-600">+#1 Local Rank</span>
          </div>
        </div>

        {competitors.map((comp, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {comp.type}
            </div>
            <div className="text-xs font-bold text-slate-900 truncate mt-0.5">{comp.name}</div>
            <div className="text-3xl font-display font-extrabold text-slate-700 mt-1">
              {comp.readinessScore}%
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1 truncate">
              {comp.aiVerdict}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Gap vs You</span>
              <span className="font-bold text-rose-600">
                -{myScore - comp.readinessScore}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Core 3-Dimension Deep Dive: Information Completeness, Service Clarity, Trust Signals */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Dimension-by-Dimension Breakdown
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              How AI evaluates factual clarity, completeness, and trust across each competitor.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveDimension('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeDimension === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Dimensions
            </button>
            <button
              onClick={() => setActiveDimension('completeness')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeDimension === 'completeness'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Completeness
            </button>
            <button
              onClick={() => setActiveDimension('clarity')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeDimension === 'clarity'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Service Clarity
            </button>
            <button
              onClick={() => setActiveDimension('trust')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeDimension === 'trust'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trust Signals
            </button>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dimension 1: Information Completeness */}
          {(activeDimension === 'all' || activeDimension === 'completeness') && (
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">1. Information Completeness</h4>
                  <p className="text-[11px] text-slate-500">NAP, territory, hours & emergency protocols</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-emerald-950">
                    <span>{bName}</span>
                    <span>88%</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-1">
                    Town-by-town service areas, dedicated night dispatch line, and complete hours.
                  </p>
                </div>

                {competitors.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span className="truncate pr-2">{c.name}</span>
                      <span className="text-slate-500">{c.informationCompleteness.score}%</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      {c.informationCompleteness.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dimension 2: Service Clarity */}
          {(activeDimension === 'all' || activeDimension === 'clarity') && (
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">2. Service Clarity & Pricing</h4>
                  <p className="text-[11px] text-slate-500">Problem-solution mapping & upfront costs</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-emerald-950">
                    <span>{bName}</span>
                    <span>90%</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-1">
                    Published $89 diagnostic fee, Navien tankless specs, and clear problem tags.
                  </p>
                </div>

                {competitors.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span className="truncate pr-2">{c.name}</span>
                      <span className="text-slate-500">{c.serviceClarity.score}%</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      {c.serviceClarity.summary}
                    </p>
                    <div className="mt-1.5 text-[10px] text-rose-600 font-semibold">
                      Pricing: {c.pricingTransparency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dimension 3: Trust Signals */}
          {(activeDimension === 'all' || activeDimension === 'trust') && (
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">3. Trust Signals & Credentials</h4>
                  <p className="text-[11px] text-slate-500">Licensing, master badges & review depth</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-emerald-950">
                    <span>{bName}</span>
                    <span>92%</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-1">
                    Iowa Master Plumber #MP-88319, Navien NSS Certified, 312 reviews (4.9★), 100% guarantee.
                  </p>
                </div>

                {competitors.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span className="truncate pr-2">{c.name}</span>
                      <span className="text-slate-500">{c.trustSignals.score}%</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      {c.trustSignals.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary of Key Differences */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Summary of Key Differences</span>
          </div>
          <h3 className="font-display text-lg font-bold text-slate-900">
            Why AI Engines Prefer {bName} Over Competitors
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Clear structural gaps prevent local competitors from winning top citation spots in Perplexity, ChatGPT Search, and Google Gemini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {keyDifferences.map((diff, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {diff.dimension}
                </div>
                <div className="mt-2 text-xs text-emerald-900 bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
                  <strong className="block text-emerald-950 font-bold mb-0.5">Your Advantage:</strong>
                  {diff.myAdvantage}
                </div>
                <div className="mt-2 text-xs text-rose-900 bg-rose-50/60 p-3 rounded-xl border border-rose-200">
                  <strong className="block text-rose-950 font-bold mb-0.5">Competitor Gap:</strong>
                  {diff.competitorGap}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs text-slate-700">
                <strong className="text-slate-900 block mb-0.5">AI Engine Impact:</strong>
                <span className="text-[11px] leading-relaxed">{diff.aiImpact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Opportunities Section */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Market Expansion Blueprint</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white tracking-tight">
            Potential Opportunities to Dominate Local AI Search
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            High-leverage action items to capture conversational search queries that competitors are completely ignoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {strategicOpportunities.map((opp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>{opp.title}</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {opp.opportunity}
                </p>
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300">
                  <strong className="block text-white text-[11px]">Expected ROI:</strong>
                  {opp.expectedGain}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/80 text-[11px] text-slate-300">
                <strong className="text-white block mb-0.5">Recommended Action:</strong>
                {opp.recommendedAction}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

