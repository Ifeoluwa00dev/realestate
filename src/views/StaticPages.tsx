import React from 'react';
import { Agent, Property } from '../types';
import PropertyCard from '../components/PropertyCard';
import { Mail, Phone, MessageCircle, MapPin, Landmark, Award, ShieldCheck, Heart, Sparkles, Send } from 'lucide-react';

/* ==========================================================================
   1. AGENTS TEAM PORTFOLIO VIEW
   ========================================================================== */
interface AgentsPageProps {
  agents: Agent[];
  properties: Property[];
  onSelectAgent: (id: string) => void;
  onNavigate: (view: string, id?: string) => void;
}

export function AgentsPage({ agents, onSelectAgent }: AgentsPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 pb-24 space-y-12">
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] block">
          Lagos Arch Corporate Cabinet
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] tracking-wider">
          Our Senior Advisors
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
          Uniting high specialized market knowledge, extensive transactional networks, and complete confidentiality parameters for premium asset management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {agents.map((ag) => (
          <div 
            key={ag.id} 
            className="border border-gray-100 bg-white p-6 sm:p-8 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Portrait */}
              <div 
                onClick={() => onSelectAgent(ag.id)}
                className="aspect-[4/5] w-full overflow-hidden border border-gray-50 bg-gray-50 cursor-pointer relative group"
              >
                <img
                  src={ag.photo}
                  alt={ag.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-[#1A1A1A]/10 transition-colors" />
              </div>

              {/* Identifiers */}
              <div className="space-y-1">
                <h3 
                  onClick={() => onSelectAgent(ag.id)}
                  className="text-lg font-serif tracking-wide text-gray-900 cursor-pointer hover:text-[#C8A49A] transition-colors"
                >
                  {ag.name}
                </h3>
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] font-semibold leading-tight">
                  {ag.role}
                </p>
                <span className="text-[10px] text-gray-400 font-mono italic block">
                  Specialization: {ag.specialization}
                </span>
              </div>

              <p className="text-gray-500 text-xs font-light leading-relaxed line-clamp-3">
                {ag.bio}
              </p>
            </div>

            {/* CTA list */}
            <div className="pt-6 border-t border-gray-50 flex gap-2">
              <button
                onClick={() => onSelectAgent(ag.id)}
                className="flex-1 bg-[#1A1A1A] hover:bg-[#C8A49A] text-white font-mono uppercase text-[10px] tracking-widest py-3 transition-colors font-bold cursor-pointer text-center"
              >
                Examine Portfolio
              </button>
              <a
                href={`https://wa.me/${ag.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="border border-gray-200 hover:border-emerald-600 hover:bg-emerald-50 text-[#1A1A1A] p-2 flex items-center justify-center transition-colors shrink-0"
                title="WhatsApp agent directly"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   2. AGENT PROFILE DETAIL VIEW
   ========================================================================== */
interface AgentDetailPageProps {
  agentId: string;
  agents: Agent[];
  properties: Property[];
  onBack: () => void;
  onSelectProperty: (id: string) => void;
}

export function AgentDetailPage({ agentId, agents, properties, onBack, onSelectProperty }: AgentDetailPageProps) {
  const agent = agents.find(a => a.id === agentId);
  if (!agent) return null;

  // Filter properties held by this specific advisor
  const agentListings = properties.filter(p => p.agentId === agent.id && p.status === 'Available');

  // Format prefilled whatsapp links
  const getWhatsAppIntro = () => {
    return `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(`Hello ${agent.name}, I found your advisor profile on Lagos Arch. I would love to discuss luxury properties in Lagos under your consignment.`)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 pb-24 space-y-16">
      {/* Header navigations */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-gray-500 hover:text-[#1A1A1A] transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Back to team
      </button>

      {/* Main Double layout profiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start border-b border-gray-100 pb-16">
        {/* Advisor Visual and Direct linkages */}
        <div className="space-y-6">
          <div className="aspect-[4/5] border border-gray-100 bg-gray-50 overflow-hidden">
            <img
              src={agent.photo}
              alt={agent.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3 font-mono text-[11px] text-gray-600">
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[#C8A49A]" />
              <span>{agent.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-[#C8A49A]" />
              <span className="break-all">{agent.email}</span>
            </div>
          </div>
        </div>

        {/* Biography & core specialities */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] block font-bold">
              Portfolio Advisor
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] tracking-wider leading-tight">
              {agent.name}
            </h1>
            <p className="text-xs uppercase font-mono tracking-widest text-[#C8A49A]">
              {agent.role}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#1A1A1A] font-bold border-b border-gray-100 pb-1">
              Personal Bio & Approach
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed whitespace-pre-line tracking-wide">
              {agent.bio}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#1A1A1A] font-bold border-b border-gray-100 pb-1">
              Primary Specialization
            </h3>
            <p className="text-xs text-gray-500 font-light font-mono italic">
              {agent.specialization}
            </p>
          </div>

          {/* Direct WhatsApp channel link */}
          <div className="pt-4">
            <a
              href={getWhatsAppIntro()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-emerald-600 text-white font-mono text-xs uppercase tracking-widest py-4 px-8 transition-colors font-bold shadow-md"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              Secure Private Channel via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Portfolio listings belonging to this advisor */}
      <div className="space-y-10">
        <div className="space-y-1">
          <span className="text-[9px] uppercase font-mono tracking-widest text-[#C8A49A] block font-bold">
            Catalog Collections
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] tracking-wider">
            Current Consignments ({agentListings.length})
          </h2>
        </div>

        {agentListings.length === 0 ? (
          <div className="p-8 border border-gray-100 bg-gray-50/50 text-center text-xs font-mono text-gray-400">
            No active public properties registered under {agent.name} currently. Please consult partner offices for silent listings.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agentListings.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   3. COMPANY ABOUT PAGE
   ========================================================================== */
export function AboutPage() {
  const values = [
    {
      title: "Design Purity",
      icon: <Landmark className="h-5 w-5" />,
      desc: "We exclusively align with structural projects that assert architectural honesty, material structural purity, and local responsive tropical modern design profiles."
    },
    {
      title: "Absolute Discretion",
      icon: <ShieldCheck className="h-5 w-5" />,
      desc: "Our business operates under private mandate guidelines, maintaining strict transaction records privacy, silent sales executions, and media blackout on high-profile transfers."
    },
    {
      title: "Integrity of Title",
      icon: <Award className="h-5 w-5" />,
      desc: "Every portfolio asset marketed undergoes redundant title verification audits, structural loading clearances, and land registry authentications preceding public consignment listing."
    }
  ];

  const certifications = [
    "REAN — Real Estate Developers Association of Nigeria",
    "NIESV — Nigerian Institution of Estate Surveyors and Valuers",
    "ERCA — Estate Registration & Regulatory Council of Nigeria"
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 pb-24 space-y-20">
      
      {/* Intro section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] block font-bold">
            Agency Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#1A1A1A] tracking-wider leading-tight">
            Curating Lagos' <br />
            <span className="italic text-[#C8A49A]">Architectural Legacy</span>
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed tracking-wide">
            Founded in 2014 by a joint cooperative of local material architects and international real estate transaction advisors, Lagos Arch has pioneered the representation of tropical board-concrete villas, floating penhouses, and high-security gated estates. Our focus remains resolutely premium—avoiding speculative volumes to curate and secure outstanding residential assets.
          </p>
        </div>
        <div className="relative aspect-[4/3] border border-gray-150">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Lagos Arch Modernist Villa"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>

      {/* Values grid */}
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] block">
            Operating Ethos
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-wider">
            Our Core Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div key={i} className="border border-gray-100 bg-white p-8 space-y-4">
              <div className="p-3 bg-[#C8A49A]/10 text-[#C8A49A] w-fit">
                {v.icon}
              </div>
              <h3 className="text-base font-serif tracking-wide text-gray-950 font-semibold">{v.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed font-light font-sans">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accreditations Row */}
      <div className="border-t border-gray-100 pt-16 bg-[#FDFDFD] px-8 py-10 border border-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="space-y-2">
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#C8A49A] font-bold block">
              Authority Clearances
            </span>
            <h3 className="text-lg sm:text-xl font-serif text-gray-900 tracking-wide font-medium">
              Registered Accreditations
            </h3>
            <p className="text-gray-500 text-xs font-light font-sans">
              Lagos Arch conducts all property actions in complete accordance with national registry parameters and land use decrees.
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div 
                key={cert} 
                className="p-5 border border-gray-200/50 flex flex-col justify-between h-36 bg-white"
              >
                <div className="text-[#C8A49A] mb-2">
                  <Award className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A] font-semibold leading-relaxed">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

/* ==========================================================================
   4. CONTACT OFFICE & DIALOG PAGE
   ========================================================================== */
export function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Buy',
    message: ''
  });
  const [isSubmit, setIsSubmit] = React.useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormData({ name: '', email: '', phone: '', interest: 'Buy', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 pb-24 space-y-20">
      
      {/* Intro visual header */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] block">
          Corporate Concierge
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] tracking-wider leading-tight">
          Coordinate Advisory Appointments
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm font-sans font-light max-w-2xl leading-relaxed">
          Our advisors hold private consults at our Lekki headquarters or on-location at listed properties inside Banana Island and Ikoyi enclaves.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Contact form paper */}
        <div className="bg-white border border-gray-100 p-8 space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-lg font-serif text-gray-950 tracking-wide">
              Initiate Asset Inquiry
            </h3>
            <p className="text-gray-400 text-xs leading-normal font-sans font-light">
              Submit details of your capital search or residential property consignment parameters, and our Principal Partner will verify request clearance.
            </p>
          </div>

          {isSubmit ? (
            <div className="p-6 bg-[#C8A49A]/5 border border-[#C8A49A]/30 text-center space-y-4">
              <div className="mx-auto w-10 h-10 rounded-full bg-[#C8A49A]/10 flex items-center justify-center text-[#C8A49A]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-[#1a1a1a]">Inquiry Recorded</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-sans font-light mt-1">
                  We have catalogued your capital parameters. General inquiries are assigned and answered via secure email correspondence within 3 business hours.
                </p>
              </div>
              <button
                onClick={() => setIsSubmit(false)}
                className="text-[10px] font-mono tracking-widest text-[#C8A49A] hover:underline uppercase block mx-auto font-bold"
              >
                Send New Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-mono tracking-widest text-gray-400 block font-semibold">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kola Aluko"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-100 bg-gray-50 focus:outline-[#C8A49A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-mono tracking-widest text-gray-400 block font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="kola@grup.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-100 bg-gray-50 focus:outline-[#C8A49A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-mono tracking-widest text-gray-400 block font-semibold">Phone Contact</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 111 2222"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-100 bg-gray-50 focus:outline-[#C8A49A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-mono tracking-widest text-gray-400 block font-semibold">Mandate Class</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-100 bg-gray-50 bg-none focus:outline-[#C8A49A]"
                  >
                    <option value="Buy">Asset Acquisition (Buy)</option>
                    <option value="Sell">Property Consignment (Sell)</option>
                    <option value="Lease">Premium Rental Lease</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-mono tracking-widest text-gray-400 block font-semibold">Detailed Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline budget tiers, specific neighborhoods, or architectural style bounds..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-3 border border-gray-100 bg-gray-50 focus:outline-[#C8A49A] resize-none leading-relaxed font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1A1A1A] hover:bg-[#C8A49A] text-white text-xs uppercase font-mono tracking-widest py-4 transition-colors font-bold cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" /> Dispatch Request
              </button>
            </form>
          )}
        </div>

        {/* Office Contact detail parameters */}
        <div className="space-y-10">
          <div className="space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#C8A49A] font-bold border-b border-gray-100 pb-2">
              Corporate Headquarters
            </h3>
            
            <div className="space-y-4 font-light text-xs text-gray-600 leading-normal">
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#C8A49A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-950 block mb-1">Lekki Marina Viewpoint</span>
                  <p>12 Admiralty Way, Waterways Pavilion, Lekki Phase 1, Lagos, Nigeria</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#C8A49A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-950 block mb-1">Telephone Exchanges</span>
                  <p>Direct Hotlines: +234 812 333 4444 (WhatsApp Enabled)</p>
                  <p>Mainland Office: +234 809 555 6666</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#C8A49A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-950 block mb-1">Electronic Envelopes</span>
                  <p>Concierge Core: concierge@lagosarch.com</p>
                  <p>Partner Consignments: partners@lagosarch.com</p>
                </div>
              </div>

            </div>
          </div>

          {/* Embedded Google Maps representation */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-mono text-gray-400 tracking-widest">Office Geographic Location</h4>
            <div className="relative aspect-video border border-gray-105 overflow-hidden h-[240px] bg-gray-50">
              <iframe
                title="Lagos Arch Head Office Google Maps Locator representation"
                src="https://maps.google.com/maps?q=12%20Admiralty%20Way%2C%20Lekki%20Phase%201%2C%20Lagos&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.1) contrast(1.05)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
