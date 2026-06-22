import React from 'react';
import { Property } from '../types';
import PropertyCard from '../components/PropertyCard';
import { Search, Trophy, Users, ShieldCheck, ArrowRight, Landmark } from 'lucide-react';

interface HomepageProps {
  properties: Property[];
  onNavigate: (view: string, listingId?: string) => void;
  onSearchSubmit: (params: { location: string; type: string; priceRange: string }) => void;
}

export default function Homepage({ properties, onNavigate, onSearchSubmit }: HomepageProps) {
  const [searchParams, setSearchParams] = React.useState({
    location: 'All',
    type: 'All',
    priceRange: 'All',
  });

  const featured = properties.filter(p => p.featured && p.status === 'Available').slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchParams);
  };

  const NEIGHBORHOODS = ['All', 'Banana Island', 'Ikoyi', 'Lekki Phase 1', 'Victoria Island', 'Ikeja GRA'];
  const TYPES = ['All', 'Apartment', 'Penthouse', 'Maisonette', 'Duplex', 'Villa', 'Terrace'];
  
  const PRICE_RANGES = [
    { value: 'All', label: 'Any Budget Range' },
    { value: 'under-1.5m', label: 'Under $1.5M USD' },
    { value: '1.5m-2.5m', label: '$1.5M - $2.5M USD' },
    { value: 'above-2.5m', label: 'Above $2.5M USD' },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* 
        Hero Section with Property Search overlay
        Designed as a massive premium visual viewport 
      */}
      <div className="relative min-h-[90vh] flex items-center justify-center bg-[#1A1A1A] py-16 px-6 sm:px-8">
        {/* Background Image Panel */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80"
            alt="Lagos Premium Architecture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A]/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl w-full text-center space-y-12 select-none">
          <div className="space-y-4">
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#C8A49A] block animate-pulse">
              Architectural Distinction • Lagos, Nigeria
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-wider leading-tight">
              Curated Estates for <br />
              <span className="italic text-[#C8A49A]">The Discerning Collector</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
              Lagos Arch orchestrates access to prestigious off-market penthouses, cantilever waterfront villas, and private gated sanctuaries in Ikoyi, Lekki, and Banana Island.
            </p>
          </div>

          {/* Premium Search Container Panel */}
          <form 
            onSubmit={handleSearch}
            className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md p-6 sm:p-8 border-t-2 border-[#C8A49A] shadow-2xl grid grid-cols-1 sm:grid-cols-4 gap-6 text-[#1A1A1A]"
          >
            {/* Location Selector */}
            <div className="text-left space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#1A1A1A] block font-semibold">
                Core Sectors
              </label>
              <select
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                className="w-full text-xs p-3.5 border border-gray-100 bg-gray-50 focus:outline-[#C8A49A]"
              >
                {NEIGHBORHOODS.map(n => (
                  <option key={n} value={n}>{n === 'All' ? 'Select Neighborhood' : n}</option>
                ))}
              </select>
            </div>

            {/* Type Selector */}
            <div className="text-left space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#1A1A1A] block font-semibold">
                Class / Type
              </label>
              <select
                value={searchParams.type}
                onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                className="w-full text-xs p-3.5 border border-gray-100 bg-gray-50 focus:outline-[#C8A49A]"
              >
                {TYPES.map(t => (
                  <option key={t} value={t}>{t === 'All' ? 'Select Property Type' : t}</option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div className="text-left space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#1A1A1A] block font-semibold">
                Budget Tier
              </label>
              <select
                value={searchParams.priceRange}
                onChange={(e) => setSearchParams({ ...searchParams, priceRange: e.target.value })}
                className="w-full text-xs p-3.5 border border-gray-100 bg-gray-50 focus:outline-[#C8A49A]"
              >
                {PRICE_RANGES.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            {/* CTA Search Submit */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-[#1A1A1A] hover:bg-[#C8A49A] text-white text-xs uppercase font-mono tracking-widest py-4 transition-all duration-300 font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <Search className="h-4 w-4" />
                Filter Assets
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 
        Corporate Achievements & Credibility Indicators
        Stat counters
      */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-gray-100 py-16 bg-[#FDFDFD]">
          {/* Stat 1 */}
          <div className="flex items-start gap-5">
            <div className="p-4 bg-[#C8A49A]/10 text-[#C8A49A]">
              <Trophy className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-serif text-[#1A1A1A] tracking-wider leading-none">
                $350M+
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-gray-400 font-bold">
                Portfolio Transactions Sold
              </div>
              <p className="text-gray-500 text-xs font-light leading-relaxed">
                Securing transactional privacy and absolute title clearance parameters for luxury Lagos estates.
              </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-start gap-5">
            <div className="p-4 bg-[#C8A49A]/10 text-[#C8A49A]">
              <Users className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-serif text-[#1A1A1A] tracking-wider leading-none">
                450+
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-gray-400 font-bold">
                Happy Corporate Clients
              </div>
              <p className="text-gray-500 text-xs font-light leading-relaxed">
                Advising local business leaders, global multi-nationals, and HNIs in spatial asset acquisitions.
              </p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-start gap-5">
            <div className="p-4 bg-[#C8A49A]/10 text-[#C8A49A]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-serif text-[#1A1A1A] tracking-wider leading-none">
                12+ Years
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-gray-400 font-bold">
                Active Masterplanning
              </div>
              <p className="text-gray-500 text-xs font-light leading-relaxed">
                Pioneering high-touch, tropical modernism aesthetics within exclusive coastal zones of Ikoyi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 
        Featured Masterpieces Showcase
      */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] block">
              Curated Masterpieces
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] tracking-wide leading-tight">
              Featured Signature Portfolio
            </h2>
          </div>
          <button
            onClick={() => onNavigate('listings')}
            className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#C8A49A] hover:text-[#1A1A1A] transition-colors font-bold group cursor-pointer"
          >
            Examine Entire Collection
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Project showcase grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              onSelect={(id) => onNavigate('detail', id)}
            />
          ))}
        </div>
      </div>

      {/* 
        Architectural Ethos Banner
      */}
      <div className="bg-[#1A1A1A] text-white py-24 select-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] block">
              Structural Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide leading-tight">
              An architecture shaped by <br />
              <span className="italic text-[#C8A49A]">Tropical Light and Lagoon Water</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed font-sans">
              Our developments combine the purity of brutalist structural layout with organic, sustainable ventilation profiles native to coastal West Africa. We operate at the intersection of structural engineering, real estate valuation, and high luxury aesthetic pairings.
            </p>
            <div className="pt-4">
              <button
                onClick={() => onNavigate('about')}
                className="border border-[#C8A49A] text-white text-xs uppercase font-mono tracking-widest py-3.5 px-6 hover:bg-[#C8A49A] hover:text-[#1A1A1A] transition-all duration-300 font-bold cursor-pointer"
              >
                Read Agency Philosophy
              </button>
            </div>
          </div>
          <div className="relative aspect-video border border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
              alt="Raw architecture details"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </div>
        </div>
      </div>

      {/* 
        List Your Property CTA Banner
      */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="border border-gray-100 bg-[#FDFDFD] p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          {/* Subtle logo background */}
          <div className="absolute right-0 bottom-0 opacity-5 -translate-x-[10%] translate-y-[10%] select-none">
            <Landmark className="h-64 w-64" />
          </div>

          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] block">
              Consignment & Representation
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-wide leading-tight">
              Ready to introduce a premium property block to market?
            </h3>
            <p className="text-gray-500 text-xs font-light leading-relaxed">
              Lagos Arch provides private placement and quiet marketing services for leading real estate developers and estate executors, maintaining strict absolute media blackout when requested.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#1A1A1A] hover:bg-[#C8A49A] text-white text-xs uppercase font-mono tracking-widest py-4 px-8 transition-colors shrink-0 font-bold cursor-pointer relative z-10 shadow-lg"
          >
            Initiate Representation
          </button>
        </div>
      </div>

    </div>
  );
}
