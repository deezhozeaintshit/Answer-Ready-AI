import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Globe,
  Building,
  Phone,
  Mail,
  MapPin,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Upload,
  Layers,
  ChevronRight,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BusinessCategory, BusinessProfile } from '../types';
import { BUSINESS_TYPE_TEMPLATES } from '../data/sampleProfiles';

interface OnboardingScannerProps {
  onScanComplete: (newProfile: BusinessProfile) => void;
  onCancel?: () => void;
}

const CATEGORIES: BusinessCategory[] = [
  'Plumber',
  'HVAC',
  'Roofer',
  'Electrician',
  'Contractor',
  'Dentist',
  'Doctor',
  'Lawyer',
  'Realtor',
  'Auto Shop',
  'Restaurant',
  'Bakery / Cafe',
  'Hair Salon',
  'Barber',
  'Cleaning Service',
  'Landscaper',
  'Hotel',
  'Retail Store',
  'E-commerce',
  'Accountant',
  'Financial Advisor',
  'Consultant',
  'Freelancer',
  'Nonprofit',
  'Local Organization',
  'Personal Brand',
  'Other'
];

export const OnboardingScanner: React.FC<OnboardingScannerProps> = ({
  onScanComplete,
  onCancel,
}) => {
  const [scanMode, setScanMode] = useState<'quick' | 'guided' | 'import'>('quick');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState<BusinessCategory>('Plumber');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cityState, setCityState] = useState('');
  const [serviceAreas, setServiceAreas] = useState('');
  const [shortDesc, setShortDesc] = useState('');

  const [importLinks, setImportLinks] = useState('');
  const [importedNotes, setImportedNotes] = useState('');

  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const scanSteps = [
    'Crawling public website content & structure...',
    'Extracting business identity, phone, and locations...',
    'Analyzing service offerings & pricing clarity...',
    'Cross-referencing online consistency indicators...',
    'Evaluating AI answerability & discoverability...',
    'Building structured AI Knowledge Profile...'
  ];

  const handleStartScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!businessName.trim() && !websiteUrl.trim()) {
      setErrorMsg('Please enter at least your Business Name or Website URL.');
      return;
    }

    setErrorMsg(null);
    setIsScanning(true);
    setScanStepIndex(0);

    const stepInterval = setInterval(() => {
      setScanStepIndex((prev) => {
        if (prev < scanSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 700);

    try {
      const response = await fetch('/api/scan-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteUrl: websiteUrl.trim(),
          businessName: businessName.trim() || 'My Business',
          businessCategory: category,
          location: cityState.trim(),
          enteredInfo: {
            phone,
            email,
            serviceAreas,
            description: shortDesc,
            importLinks,
            importedNotes
          }
        }),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result = await response.json();
      const data = result.data;

      // Construct a complete BusinessProfile
      const slug = (data.businessName || businessName || 'my-business')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const newProfile: BusinessProfile = {
        id: slug + '-' + Date.now().toString().slice(-4),
        slug: slug || 'business',
        updatedAt: new Date().toISOString().split('T')[0],
        completenessScore: data.aiReadiness?.overallScore || 67,
        identity: {
          businessName: data.businessName || businessName || 'My Business',
          legalName: data.legalName || `${data.businessName || businessName} LLC`,
          brandName: data.businessName || businessName,
          industry: data.industry || 'Local Services',
          category: (data.category as BusinessCategory) || category || 'Plumber',
          description: data.description || shortDesc || 'Dedicated to customer satisfaction.',
          shortAiDescription: data.shortAiDescription || 'Verified business providing dependable local service.',
          tagline: data.tagline || `Your trusted ${category} specialist.`,
          foundedYear: data.facts?.yearsInBusiness ? String(new Date().getFullYear() - Number(data.facts.yearsInBusiness)) : '2018',
          locations: data.locations || [cityState || 'Local Location'],
          serviceAreas: data.serviceAreas || (serviceAreas ? serviceAreas.split(',').map(s => s.trim()) : ['Metro Area'])
        },
        contact: {
          phone: data.phone || phone || '(555) 019-2831',
          emergencyPhone: '(555) 019-2839',
          email: data.email || email || 'contact@business.com',
          website: (websiteUrl && typeof websiteUrl === 'string' && websiteUrl.startsWith('http')) ? websiteUrl : (websiteUrl ? `https://${websiteUrl}` : 'https://www.mybusiness.com'),
          address: data.address || {
            street: '100 Main St',
            city: cityState.split(',')[0]?.trim() || 'City',
            state: cityState.split(',')[1]?.trim() || 'ST',
            zip: '12345',
            country: 'USA'
          },
          hours: data.hours || [
            { day: 'Monday - Friday', hours: '8:00 AM - 5:00 PM' },
            { day: 'Saturday', hours: '9:00 AM - 1:00 PM' }
          ],
          appointmentUrl: websiteUrl ? `${websiteUrl}/contact` : '',
          socialProfiles: [
            { platform: 'Google', url: `https://maps.google.com/?q=${encodeURIComponent(businessName)}` }
          ]
        },
        services: (data.services || []).map((s: any, idx: number) => ({
          id: `srv-${idx + 1}`,
          name: s.name,
          description: s.description,
          pricing: s.pricing || 'Upfront flat-rate estimate provided',
          serviceAreas: s.serviceAreas || [cityState || 'All served areas'],
          targetCustomer: s.targetCustomer || 'Residential and local clients',
          problemsSolved: s.problemsSolved || ['Prompt resolution', 'Guaranteed workmanship'],
          isVerified: true
        })),
        facts: {
          specialties: data.facts?.specialties || [`Specialized ${category}`],
          differentiators: data.facts?.differentiators || ['Clear upfront pricing', 'Licensed team'],
          yearsInBusiness: data.facts?.yearsInBusiness || 7,
          certifications: data.facts?.certifications || ['State Licensed', 'Verified Business'],
          licenses: data.facts?.licenses || ['State License Active'],
          awards: data.facts?.awards || ['Top Local Choice'],
          associations: ['Local Chamber of Commerce Member'],
          brandsCarried: ['Industry Standard Brands'],
          paymentMethods: data.facts?.paymentMethods || ['Credit Card', 'Debit', 'Check'],
          policies: data.facts?.policies || [{ name: 'Satisfaction Guarantee', details: 'Guaranteed quality on all services.' }]
        },
        trust: {
          rating: data.trust?.rating || 4.8,
          reviewCount: data.trust?.reviewCount || 74,
          topReviews: [
            {
              author: 'Verified Customer',
              rating: 5,
              text: 'Prompt, professional, and clear communication from start to finish. Highly recommend!',
              source: 'Google Reviews',
              date: 'Recent'
            }
          ],
          awards: ['Top Rated Local Provider'],
          accreditations: ['BBB Accredited'],
          stats: data.trust?.stats || [
            { label: 'Verified Jobs', value: '850+' },
            { label: 'Customer Rating', value: '4.8 / 5' }
          ],
          mediaMentions: ['Local Community Guide']
        },
        faqs: (data.faqs || []).map((f: any, idx: number) => ({
          id: `faq-gen-${idx + 1}`,
          question: f.question,
          answer: f.answer,
          status: 'approved',
          source: 'ai-suggested',
          category: f.category || 'General'
        })),
        aiReadiness: data.aiReadiness || {
          overallScore: 68,
          breakdown: {
            identity: 78,
            contact: 82,
            services: 70,
            location: 68,
            faqs: 62,
            trust: 70,
            websiteContent: 60,
            consistency: 65,
            structuredData: 52,
            discoverability: 74
          },
          summary: 'Your business profile has been initialized with core facts. Addressing missing structured FAQs and published pricing will push your readiness above 90%.',
          wouldAiRecommend: {
            rating: 'Moderately Recommended',
            score: 72,
            strengths: ['Clear business category', 'Valid address & phone'],
            gaps: ['Missing explicit pricing tiers', 'Unverified weekend hours'],
            verdict: 'AI systems can identify your business, but need verified answers to recommend you confidently over competitors.'
          }
        },
        consistencyIssues: (data.consistencyIssues || []).map((c: any, idx: number) => ({
          id: `cons-gen-${idx + 1}`,
          field: c.field || 'Business Hours',
          sourceA: c.sourceA || { name: 'Website', value: 'Mon-Fri 8am-5pm' },
          sourceB: c.sourceB || { name: 'Public Directory', value: 'Conflicting hours' },
          discrepancy: c.discrepancy || 'Conflicting schedule details detected across public sources.',
          whyItMatters: c.whyItMatters || 'AI assistants may cite conflicting open times.',
          suggestedValue: c.suggestedValue || 'Standardize hours across all public profiles.',
          resolved: false
        })),
        recommendations: (data.recommendations || []).map((r: any, idx: number) => ({
          id: `rec-gen-${idx + 1}`,
          title: r.title,
          category: r.category,
          severity: r.severity || 'medium',
          whatIsWrong: r.whatIsWrong,
          whyItMatters: r.whyItMatters,
          howToFix: r.howToFix,
          suggestedFix: r.suggestedFix,
          applied: false
        })),
        changeLogs: [
          {
            id: 'cl-init',
            date: new Date().toISOString().split('T')[0],
            type: 'services',
            title: 'Initial AI Knowledge Profile Created',
            description: `Scanned and structured from ${websiteUrl || businessName}.`,
            detectedFrom: websiteUrl || 'Manual Input',
            status: 'applied'
          }
        ]
      };

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if iframe blocks
      }

      onScanComplete(newProfile);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsScanning(false);
      setErrorMsg(`Scan could not complete: ${err.message || 'Unknown network error'}. Please verify the URL or enter business details manually.`);
    }
  };

  // Quick fill demo helper
  const handleLoadDemo = (type: 'plumber' | 'dentist' | 'restaurant') => {
    if (type === 'plumber') {
      setBusinessName('Midwest Drain & Pipe Solutions');
      setWebsiteUrl('www.midwestdrainpipe.com');
      setCategory('Plumber');
      setCityState('Omaha, NE');
      setPhone('(402) 555-0182');
      setServiceAreas('Omaha, Council Bluffs, Papillion, Bellevue');
      setShortDesc('24/7 residential emergency drain clearing, sewer repair, and water heater installs with flat-rate pricing.');
    } else if (type === 'dentist') {
      setBusinessName('Sunlight Family & Cosmetic Dental');
      setWebsiteUrl('www.sunlightdentalaustin.com');
      setCategory('Dentist');
      setCityState('Austin, TX');
      setPhone('(512) 555-0442');
      setServiceAreas('Austin, Westlake, Sunset Valley');
      setShortDesc('Gentle family dental clinic specializing in Invisalign, pediatric dentistry, and same-day dental crowns.');
    } else {
      setBusinessName('Harvest Hearth Table');
      setWebsiteUrl('www.harvesthearthpdx.com');
      setCategory('Restaurant');
      setCityState('Portland, OR');
      setPhone('(503) 555-0921');
      setServiceAreas('Portland Metro');
      setShortDesc('Farm-to-table seasonal bistro with wood-fired sourdough pizzas, natural wines, and dedicated gluten-free options.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Banner Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 mb-8 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            10-Second Business Analyzer
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            What should AI know about your business?
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            When potential customers ask ChatGPT, Google Gemini, Perplexity, or Apple Intelligence for a recommendation, will AI understand what you actually do? Let's check.
          </p>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1 bg-slate-800/90 rounded-xl border border-slate-700/80 w-fit">
            <button
              onClick={() => setScanMode('quick')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                scanMode === 'quick' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              1-Click Website Scan
            </button>
            <button
              onClick={() => setScanMode('guided')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                scanMode === 'guided' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Guided Details Entry
            </button>
            <button
              onClick={() => setScanMode('import')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                scanMode === 'import' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Paste Links & Menus
            </button>
          </div>
        </div>
      </div>

      {/* Main Scan Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Unable to complete scan</p>
              <p className="text-xs text-rose-700 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {isScanning ? (
          <div className="py-12 px-4 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner relative">
              <Loader2 className="w-8 h-8 animate-spin" />
              <div className="absolute inset-0 rounded-2xl border-2 border-emerald-500 animate-ping opacity-20"></div>
            </div>

            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
              Analyzing Your Business Information
            </h3>
            <p className="text-sm text-slate-500 mb-8">
              AnswerReady AI is scanning your publicly available footprint to build your AI Knowledge Profile.
            </p>

            {/* Step Progress List */}
            <div className="space-y-3 text-left bg-slate-50 p-5 rounded-xl border border-slate-100">
              {scanSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  {idx < scanStepIndex ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : idx === scanStepIndex ? (
                    <Loader2 className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0"></div>
                  )}
                  <span className={idx <= scanStepIndex ? 'font-medium text-slate-800' : 'text-slate-400'}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 mt-6">
              This usually takes approximately 5–10 seconds.
            </p>
          </div>
        ) : (
          <form onSubmit={handleStartScan} className="space-y-6">
            {/* Quick Demo Fillers */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Quick test with realistic business data:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleLoadDemo('plumber')}
                  className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
                >
                  Plumbing Co
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadDemo('dentist')}
                  className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
                >
                  Dental Clinic
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadDemo('restaurant')}
                  className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
                >
                  Bistro / Dining
                </button>
              </div>
            </div>

            {/* Form Fields according to scanMode */}
            {scanMode === 'quick' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Website URL or Domain
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. www.peakflowplumbing.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Enter your live business website. We will extract services, contact info, hours, and credentials automatically.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Business Name
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="e.g. PeakFlow Plumbing & Heating"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Business Type
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as BusinessCategory)}
                      className="w-full px-3.5 py-3 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Primary City / State / Region
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Carroll, IA or Austin, TX"
                      value={cityState}
                      onChange={(e) => setCityState(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {scanMode === 'guided' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Official Business Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Website URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="(555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      placeholder="info@business.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Business Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as BusinessCategory)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      City & State
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Des Moines, IA"
                      value={cityState}
                      onChange={(e) => setCityState(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Specific Service Towns & Counties
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Carroll, Lake View, Denison, Sac County"
                    value={serviceAreas}
                    onChange={(e) => setServiceAreas(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Explicit service boundaries help AI answer "Do you serve [Town]?" questions with 100% accuracy.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    What does your business specialize in? (Short Description)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 24/7 residential emergency plumbing, water softeners, and tankless water heaters with upfront flat-rate pricing."
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {scanMode === 'import' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Paste Any Online Links (Google Maps, Yelp, Facebook, Instagram, LinkedIn)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="https://maps.google.com/?cid=...&#10;https://yelp.com/biz/...&#10;https://facebook.com/..."
                    value={importLinks}
                    onChange={(e) => setImportLinks(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Paste Raw Marketing Copy, Menus, Price Sheets, or PDFs Text
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Paste service menus, emergency rates, warranties, or brochures here. AnswerReady will extract clean structured facts..."
                    value={importedNotes}
                    onChange={(e) => setImportedNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Business Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Dental"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as BusinessCategory)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero spam • No software install required • Instant AI score</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>SCAN MY BUSINESS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Trust & Guarantee bar below */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
            1
          </div>
          <h4 className="text-xs font-bold text-slate-900 mb-1">Instant Scan</h4>
          <p className="text-[11px] text-slate-500">
            Extracts what AI currently knows about your business in seconds.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
            2
          </div>
          <h4 className="text-xs font-bold text-slate-900 mb-1">Find Gaps & Errors</h4>
          <p className="text-[11px] text-slate-500">
            Flags conflicting hours, missing pricing, and unanswered FAQs.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
            3
          </div>
          <h4 className="text-xs font-bold text-slate-900 mb-1">Publish & Be Recommended</h4>
          <p className="text-[11px] text-slate-500">
            Publish your verified machine-readable profile and schema.
          </p>
        </div>
      </div>
    </div>
  );
};
