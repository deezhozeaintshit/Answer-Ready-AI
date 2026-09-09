import React, { useState } from 'react';
import {
  Building,
  Phone,
  Briefcase,
  Award,
  ShieldCheck,
  HelpCircle,
  Plus,
  Trash2,
  Edit2,
  Check,
  Sparkles,
  Save,
  CheckCircle2,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { BusinessProfile, BusinessService, BusinessFaq } from '../types';

interface KnowledgeProfileViewProps {
  profile: BusinessProfile;
  onUpdateProfile: (updated: BusinessProfile) => void;
}

export const KnowledgeProfileView: React.FC<KnowledgeProfileViewProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'contact' | 'services' | 'facts' | 'trust' | 'faqs'>('identity');
  const [isSavedToast, setIsSavedToast] = useState(false);

  // Identity state
  const [identity, setIdentity] = useState(profile.identity);
  // Contact state
  const [contact, setContact] = useState(profile.contact);
  // Services state
  const [services, setServices] = useState(profile.services);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  // Facts state
  const [facts, setFacts] = useState(profile.facts);
  // Trust state
  const [trust, setTrust] = useState(profile.trust);
  // FAQs state
  const [faqs, setFaqs] = useState(profile.faqs);
  const [faqFilter, setFaqFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const showSavedNotification = () => {
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  const handleSaveAll = () => {
    const updated: BusinessProfile = {
      ...profile,
      identity,
      contact,
      services,
      facts,
      trust,
      faqs,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    onUpdateProfile(updated);
    showSavedNotification();
  };

  // Add Service Handler
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;
    const newSrv: BusinessService = {
      id: `srv-${Date.now()}`,
      name: newServiceName.trim(),
      description: newServiceDesc.trim() || 'Comprehensive professional service.',
      pricing: newServicePrice.trim() || 'Upfront flat-rate estimate provided',
      serviceAreas: identity.serviceAreas,
      targetCustomer: 'Residential and commercial clients',
      problemsSolved: ['Immediate resolution', 'Guaranteed workmanship'],
      isVerified: true,
    };
    const updated = [newSrv, ...services];
    setServices(updated);
    setNewServiceName('');
    setNewServiceDesc('');
    setNewServicePrice('');
    onUpdateProfile({ ...profile, services: updated });
    showSavedNotification();
  };

  const handleDeleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    onUpdateProfile({ ...profile, services: updated });
  };

  // FAQ Handlers
  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    const newFaq: BusinessFaq = {
      id: `faq-${Date.now()}`,
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      status: 'approved',
      source: 'manual',
      category: 'General',
    };
    const updated = [newFaq, ...faqs];
    setFaqs(updated);
    setNewQuestion('');
    setNewAnswer('');
    onUpdateProfile({ ...profile, faqs: updated });
    showSavedNotification();
  };

  const handleToggleFaqStatus = (id: string) => {
    const updated = faqs.map((f) =>
      f.id === id ? { ...f, status: f.status === 'approved' ? ('pending' as const) : ('approved' as const) } : f
    );
    setFaqs(updated);
    onUpdateProfile({ ...profile, faqs: updated });
  };

  const handleDeleteFaq = (id: string) => {
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    onUpdateProfile({ ...profile, faqs: updated });
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-bold text-slate-900">
              AI Knowledge Profile
            </h2>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              Verified Source
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            This structured data serves as the single source of truth for AI assistants and answer engines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSavedToast && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Saved & Synced!
            </span>
          )}
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('identity')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all shrink-0 ${
            activeTab === 'identity' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>1. Identity</span>
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all shrink-0 ${
            activeTab === 'contact' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>2. Contact & Hours</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all shrink-0 ${
            activeTab === 'services' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>3. Services & Pricing ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('facts')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all shrink-0 ${
            activeTab === 'facts' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>4. Facts & Differentiators</span>
        </button>

        <button
          onClick={() => setActiveTab('trust')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all shrink-0 ${
            activeTab === 'trust' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>5. Trust Signals</span>
        </button>

        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all shrink-0 ${
            activeTab === 'faqs' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>6. FAQ Knowledge Base ({faqs.length})</span>
        </button>
      </div>

      {/* Tab 1: Business Identity */}
      {activeTab === 'identity' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Business Identity & Classification
            </h3>
            <p className="text-xs text-slate-500">
              Essential metadata helping AI models index who you are and what you do.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Official Business Name
              </label>
              <input
                type="text"
                value={identity.businessName}
                onChange={(e) => setIdentity({ ...identity, businessName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Legal Entity Name
              </label>
              <input
                type="text"
                value={identity.legalName}
                onChange={(e) => setIdentity({ ...identity, legalName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Primary Category
              </label>
              <input
                type="text"
                value={identity.category}
                onChange={(e) => setIdentity({ ...identity, category: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Tagline / Slogan
              </label>
              <input
                type="text"
                value={identity.tagline}
                onChange={(e) => setIdentity({ ...identity, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Short AI Description (Crucial for Assistant Answers)
              </label>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Optimized for RAG citation
              </span>
            </div>
            <textarea
              rows={2}
              value={identity.shortAiDescription}
              onChange={(e) => setIdentity({ ...identity, shortAiDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              This concise summary is what conversational AIs quote when asked "What does this business do?".
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Full Business Description
            </label>
            <textarea
              rows={4}
              value={identity.description}
              onChange={(e) => setIdentity({ ...identity, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Confirmed Service Areas (Cities, Towns, Counties)
            </label>
            <input
              type="text"
              value={identity.serviceAreas.join(', ')}
              onChange={(e) =>
                setIdentity({
                  ...identity,
                  serviceAreas: e.target.value.split(',').map((s) => s.trim()),
                })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Separate each town with a comma. Explicit lists ensure AI answers "Do you serve [Town]?" correctly.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Contact & Hours */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Contact Channels & Operating Hours
            </h3>
            <p className="text-xs text-slate-500">
              Clear schedules prevent AI assistants from advising customers that you are closed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Primary Phone
              </label>
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                24/7 Emergency Line
              </label>
              <input
                type="text"
                value={contact.emergencyPhone || ''}
                onChange={(e) => setContact({ ...contact, emergencyPhone: e.target.value })}
                placeholder="(Optional)"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Website URL
              </label>
              <input
                type="text"
                value={contact.website}
                onChange={(e) => setContact({ ...contact, website: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Online Booking / Scheduling URL
              </label>
              <input
                type="text"
                value={contact.appointmentUrl || ''}
                onChange={(e) => setContact({ ...contact, appointmentUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Physical Address</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Street Address</label>
                <input
                  type="text"
                  value={contact.address.street}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      address: { ...contact.address, street: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">City</label>
                <input
                  type="text"
                  value={contact.address.city}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      address: { ...contact.address, city: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">State & Zip</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={contact.address.state}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        address: { ...contact.address, state: e.target.value },
                      })
                    }
                    className="w-16 px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    value={contact.address.zip}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        address: { ...contact.address, zip: e.target.value },
                      })
                    }
                    className="flex-1 px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Operating Hours</h4>
            <div className="space-y-2 max-w-lg">
              {contact.hours.map((h, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={h.day}
                    onChange={(e) => {
                      const updated = [...contact.hours];
                      updated[idx].day = e.target.value;
                      setContact({ ...contact, hours: updated });
                    }}
                    className="w-36 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={h.hours}
                    onChange={(e) => {
                      const updated = [...contact.hours];
                      updated[idx].hours = e.target.value;
                      setContact({ ...contact, hours: updated });
                    }}
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Products & Services */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Verified Products & Services Catalog
            </h3>
            <p className="text-xs text-slate-500">
              Answer engines need clear service descriptions and upfront price parameters to recommend you.
            </p>
          </div>

          {/* Add New Service Form */}
          <form onSubmit={handleAddService} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-emerald-600" />
              Add New Service
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Service Name (e.g. Tankless Water Heater Installation)"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
              <input
                type="text"
                placeholder="Description / Scope of Work"
                value={newServiceDesc}
                onChange={(e) => setNewServiceDesc(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
              <input
                type="text"
                placeholder="Pricing Details (e.g. Starting at $1,800 or $89 flat fee)"
                value={newServicePrice}
                onChange={(e) => setNewServicePrice(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Service
              </button>
            </div>
          </form>

          {/* Service Cards List */}
          <div className="space-y-4">
            {services.map((srv) => (
              <div key={srv.id} className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{srv.name}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        AI Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50/70 px-2.5 py-1 rounded-md">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{srv.pricing}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Areas: {srv.serviceAreas?.join(', ') || 'All'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteService(srv.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Facts & Differentiators */}
      {activeTab === 'facts' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Verified Business Facts & Differentiators
            </h3>
            <p className="text-xs text-slate-500">
              Specific, hard facts that AI models look for when users ask "Why should I pick this business?".
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Specialties (Comma Separated)
              </label>
              <textarea
                rows={3}
                value={facts.specialties.join(', ')}
                onChange={(e) =>
                  setFacts({ ...facts, specialties: e.target.value.split(',').map((s) => s.trim()) })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Differentiators ("What Makes Us Different")
              </label>
              <textarea
                rows={3}
                value={facts.differentiators.join(', ')}
                onChange={(e) =>
                  setFacts({ ...facts, differentiators: e.target.value.split(',').map((s) => s.trim()) })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Certifications & Accreditations
              </label>
              <input
                type="text"
                value={facts.certifications.join(', ')}
                onChange={(e) =>
                  setFacts({ ...facts, certifications: e.target.value.split(',').map((s) => s.trim()) })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                State Licenses & Registrations
              </label>
              <input
                type="text"
                value={facts.licenses.join(', ')}
                onChange={(e) =>
                  setFacts({ ...facts, licenses: e.target.value.split(',').map((s) => s.trim()) })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Official Policies</h4>
            <div className="space-y-3">
              {facts.policies.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-1/3">
                    <strong className="text-xs font-bold text-slate-800">{p.name}</strong>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-slate-600">{p.details}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Trust Signals */}
      {activeTab === 'trust' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Reputation & Trust Verification
            </h3>
            <p className="text-xs text-slate-500">
              Third-party social proof and statistical milestones verified in your knowledge base.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Aggregate Star Rating (1.0 - 5.0)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={trust.rating}
                onChange={(e) => setTrust({ ...trust, rating: parseFloat(e.target.value) || 5.0 })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Total Verified Reviews Count
              </label>
              <input
                type="number"
                value={trust.reviewCount}
                onChange={(e) => setTrust({ ...trust, reviewCount: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Key Quantified Milestones</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {trust.stats.map((st, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="font-display font-extrabold text-xl text-slate-900">{st.value}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: FAQ Knowledge Base */}
      {activeTab === 'faqs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Approved Customer FAQ Knowledge Base
              </h3>
              <p className="text-xs text-slate-500">
                Direct Q&A indexed for answer engines, structured schema, and automated bots.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFaqFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  faqFilter === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600'
                }`}
              >
                All ({faqs.length})
              </button>
              <button
                onClick={() => setFaqFilter('approved')}
                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  faqFilter === 'approved' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Approved ({faqs.filter((f) => f.status === 'approved').length})
              </button>
            </div>
          </div>

          {/* Add FAQ Form */}
          <form onSubmit={handleAddFaq} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-emerald-600" />
              Add Customer FAQ
            </h4>
            <div>
              <input
                type="text"
                placeholder="Question (e.g. Do you charge extra for emergency weekend calls?)"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs mb-2"
              />
              <textarea
                rows={2}
                placeholder="Direct Factual Answer (e.g. No, we maintain the same flat-rate diagnostic fee 7 days a week...)"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
              >
                Add to Knowledge Base
              </button>
            </div>
          </form>

          {/* FAQ Items List */}
          <div className="space-y-3">
            {faqs
              .filter((f) => (faqFilter === 'all' ? true : f.status === faqFilter))
              .map((faq) => (
                <div
                  key={faq.id}
                  className={`p-4 rounded-xl border transition-all ${
                    faq.status === 'approved'
                      ? 'bg-white border-slate-200'
                      : 'bg-amber-50/40 border-amber-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{faq.question}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            faq.status === 'approved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {faq.status === 'approved' ? 'Approved & Public' : 'Pending Review'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleFaqStatus(faq.id)}
                        className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 hover:bg-slate-100 font-medium text-slate-700 transition-colors"
                      >
                        {faq.status === 'approved' ? 'Mark Pending' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
