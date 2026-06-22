import React from 'react';
import { Property, FilterParams } from '../types';
import PropertyCard from '../components/PropertyCard';
import { LayoutGrid, List, SlidersHorizontal, ArrowLeftRight, Check, X, Search } from 'lucide-react';

interface ListingsPageProps {
  initialSearchState?: { location: string; type: string; priceRange: string };
  onSelectProperty: (id: string) => void;
}

export default function ListingsPage({ initialSearchState, onSelectProperty }: ListingsPageProps) {
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  // Layout View Mode
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  // Filters state
  const [filters, setFilters] = React.useState<FilterParams>({
    location: initialSearchState?.location || 'All',
    type: initialSearchState?.type || 'All',
    beds: undefined,
    baths: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    amenities: [],
    search: '',
    sort: 'newest',
  });

  const NEIGHBORHOODS = ['All', 'Banana Island', 'Ikoyi', 'Lekki Phase 1', 'Victoria Island', 'Ikeja GRA'];
  const TYPES = ['All', 'Apartment', 'Penthouse', 'Maisonette', 'Duplex', 'Villa', 'Terrace'];
  
  const AMENITIES_CATALOG = [
    'Infinity Pool',
    'Swimming Pool',
    'Lagoon View',
    'Lekki Bridge View',
    'Atlantic View Panels',
    'Yacht Slip Dock',
    'Helipad Lift Access',
    'Private Lift',
    'Smart Home Server',
    'Smart Automations',
    'Chef Kitchen'
  ];

  // Map initialSearchState price ranges if redirected from homepage
  React.useEffect(() => {
    if (initialSearchState) {
      let min: number | undefined = undefined;
      let max: number | undefined = undefined;

      if (initialSearchState.priceRange === 'under-1.5m') {
        max = 1500000;
      } else if (initialSearchState.priceRange === '1.5m-2.5m') {
        min = 1500000;
        max = 2500000;
      } else if (initialSearchState.priceRange === 'above-2.5m') {
        min = 2500000;
      }

      setFilters(prev => ({
        ...prev,
        location: initialSearchState.location,
        type: initialSearchState.type,
        minPrice: min,
        maxPrice: max,
      }));
    }
  }, [initialSearchState]);

  // Hook query trigger
  React.useEffect(() => {
    fetchFilteredProperties();
  }, [filters, currentPage]);

  const fetchFilteredProperties = async () => {
    setIsLoading(true);
    try {
      const qParams = new URLSearchParams();
      if (filters.search) qParams.append('search', filters.search);
      if (filters.location && filters.location !== 'All') qParams.append('location', filters.location);
      if (filters.type && filters.type !== 'All') qParams.append('type', filters.type);
      if (filters.beds) qParams.append('beds', filters.beds.toString());
      if (filters.baths) qParams.append('baths', filters.baths.toString());
      if (filters.minPrice) qParams.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) qParams.append('maxPrice', filters.maxPrice.toString());
      if (filters.sort) qParams.append('sort', filters.sort);
      
      qParams.append('page', currentPage.toString());
      qParams.append('limit', '6'); // 6 items per page for tidy listings pagination

      if (filters.amenities && filters.amenities.length > 0) {
        filters.amenities.forEach(am => qParams.append('amenities', am));
      }

      const res = await fetch(`/api/properties?${qParams.toString()}`);
      const data = await res.json();
      
      setProperties(data.properties || []);
      setTotalCount(data.total || 0);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error('Error loading properties data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      location: 'All',
      type: 'All',
      beds: undefined,
      baths: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      amenities: [],
      search: '',
      sort: 'newest',
    });
    setCurrentPage(1);
  };

  const toggleAmenityFilter = (am: string) => {
    setFilters(prev => {
      const amenities = prev.amenities || [];
      const updated = amenities.includes(am)
        ? amenities.filter(item => item !== am)
        : [...amenities, am];
      return { ...prev, amenities: updated };
    });
    setCurrentPage(1);
  };

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 pb-24">
      {/* Title block */}
      <div className="space-y-2 mb-10">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] block">
          Exclusive Portfolios
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] tracking-wider leading-tight">
          Lagos Estates Inventory
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
          Sift through our hand-selected selection of signature estates, duplex townhomes, and waterfront penthouses. Authenticated absolute titles.
        </p>
      </div>

      {/* Primary search row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 pb-6 border-b border-gray-100">
        {/* Search bar input */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search location, title, features, or architectural keywords..."
            value={filters.search}
            onChange={(e) => { setFilters({ ...filters, search: e.target.value }); setCurrentPage(1); }}
            className="w-full text-xs p-3.5 pl-10 border border-gray-200 focus:outline-[#C8A49A] bg-white font-light text-gray-800"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* Controls Layout toggles and sorting element */}
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
          {/* Mobile filter drawer trigger button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 border border-gray-200 px-4 py-3 text-xs uppercase font-mono tracking-widest focus:outline-[#C8A49A]"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>

          {/* Sorter Selector */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[10px] uppercase font-mono tracking-wider text-gray-400">
              Sort
            </span>
            <select
              value={filters.sort}
              onChange={(e) => { setFilters({ ...filters, sort: e.target.value }); setCurrentPage(1); }}
              className="text-xs p-3 border border-gray-250 bg-white font-mono focus:outline-[#C8A49A]"
            >
              <option value="newest">Publishing: Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="sqm_desc">Sizing: Largest First</option>
            </select>
          </div>

          {/* Grid vs List View Mode switches */}
          <div className="hidden sm:flex items-center border border-gray-200 p-0.5 bg-gray-50 self-stretch">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 cursor-pointer ${viewMode === 'grid' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-400 hover:text-[#1A1A1A]'}`}
              title="Grid Layout"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 cursor-pointer ${viewMode === 'list' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-400 hover:text-[#1A1A1A]'}`}
              title="List Layout"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* SIDEBAR FOR FILTERING (DESKTOP) */}
        <aside className="hidden md:block space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#1A1A1A] font-semibold flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-[#C8A49A]" /> Filtering Sidebar
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[9px] font-mono uppercase tracking-wider text-gray-400 hover:text-[#C8A49A] underline cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Sector/Location */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-semibold">
              Sector Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => { setFilters({ ...filters, location: e.target.value }); setCurrentPage(1); }}
              className="w-full text-xs p-3 border border-gray-150 bg-white"
            >
              {NEIGHBORHOODS.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Sizing/Type */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-semibold">
              Property Class/Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => { setFilters({ ...filters, type: e.target.value }); setCurrentPage(1); }}
              className="w-full text-xs p-3 border border-gray-150 bg-white"
            >
              {TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Price Range inputs */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-semibold">
              Price Range (USD)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setFilters({ ...filters, minPrice: isNaN(val) ? undefined : val });
                  setCurrentPage(1);
                }}
                className="w-full text-xs p-2.5 border border-gray-150 bg-white"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setFilters({ ...filters, maxPrice: isNaN(val) ? undefined : val });
                  setCurrentPage(1);
                }}
                className="w-full text-xs p-2.5 border border-gray-150 bg-white"
              />
            </div>
          </div>

          {/* Beds Room selection */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-semibold">
              Minimum Bedrooms
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((bed) => (
                <button
                  key={bed}
                  type="button"
                  onClick={() => { setFilters({ ...filters, beds: filters.beds === bed ? undefined : bed }); setCurrentPage(1); }}
                  className={`text-xs p-2.5 border tracking-wider font-mono cursor-pointer transition-colors ${
                    filters.beds === bed 
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                      : 'bg-white border-gray-100 text-[#1A1A1A] hover:border-[#1A1A1A]'
                  }`}
                >
                  {bed}+
                </button>
              ))}
            </div>
          </div>

          {/* Bath selection */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-semibold">
              Minimum Bathrooms
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((bath) => (
                <button
                  key={bath}
                  type="button"
                  onClick={() => { setFilters({ ...filters, baths: filters.baths === bath ? undefined : bath }); setCurrentPage(1); }}
                  className={`text-xs p-2.5 border tracking-wider font-mono cursor-pointer transition-colors ${
                    filters.baths === bath 
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                      : 'bg-white border-gray-100 text-[#1A1A1A] hover:border-[#1A1A1A]'
                  }`}
                >
                  {bath}+
                </button>
              ))}
            </div>
          </div>

          {/* Amenities checklist */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-semibold">
              Inherent Amenities
            </label>
            <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-2 select-none">
              {AMENITIES_CATALOG.map((am) => (
                <button
                  key={am}
                  onClick={() => toggleAmenityFilter(am)}
                  className="flex items-center gap-2 text-left text-xs text-gray-500 hover:text-[#1A1A1A] transition-colors py-1 hover:bg-gray-50/50 cursor-pointer"
                >
                  <div className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 ${
                    filters.amenities?.includes(am) ? 'border-[#C8A49A] bg-[#C8A49A] text-white' : 'border-gray-200'
                  }`}>
                    {filters.amenities?.includes(am) && <Check className="h-2.5 w-2.5" />}
                  </div>
                  <span className="font-light text-[11px] truncate">{am}</span>
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* LISTINGS CONTAINER */}
        <section className="md:col-span-3 space-y-10">
          
          {isLoading ? (
            /* Loading State */
            <div className="py-24 text-center space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8A49A] block animate-pulse">
                Consulting Regional Land Registries...
              </span>
              <p className="text-xs text-gray-400 font-light">
                Fetching premium filtered assets from current server context
              </p>
            </div>
          ) : properties.length === 0 ? (
            /* Empty State */
            <div className="py-24 text-center border border-gray-100 p-8 space-y-4">
              <div className="text-gray-300 font-serif text-5xl">Ø</div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-[#1A1A1A]">
                  No Matching Assets Found
                </h3>
                <p className="text-xs text-gray-500 font-light max-w-md mx-auto leading-relaxed">
                  We could not locate catalog properties matching those exact specification variables. Consider extending parameters or starting filters afresh.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs font-mono uppercase tracking-widest bg-[#1a1a1a] text-white px-5 py-3 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {properties.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  onSelect={onSelectProperty}
                />
              ))}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="space-y-6">
              {properties.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => onSelectProperty(p.id)}
                  className="group flex flex-col sm:flex-row bg-white border border-gray-100 cursor-pointer hover:border-gray-300 transition-all duration-300 h-auto sm:h-64"
                >
                  <div className="relative w-full sm:w-80 h-48 sm:h-full overflow-hidden shrink-0 bg-gray-100">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-[125%] object-cover -translate-y-4 group-hover:translate-y-0 duration-1000 ease-out"
                    />
                    {/* Status Badge */}
                    <span className="absolute top-4 left-4 text-[8px] uppercase tracking-wider bg-[#1A1A1A] text-white px-2 py-1 font-mono">
                      {p.status}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A]">
                        {p.location} • {p.type}
                      </span>
                      <h3 className="text-lg sm:text-xl font-serif text-[#1A1A1A] tracking-wider group-hover:text-[#C8A49A] transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-gray-400 text-xs font-light max-w-xl line-clamp-2 md:line-clamp-3 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-between items-end gap-2 border-t border-gray-50 pt-3 mt-3">
                      <div className="flex gap-4 text-[11px] font-mono text-gray-500">
                        <span>{p.beds} Beds</span>
                        <span>{p.baths} Baths</span>
                        <span>{p.sqm} m²</span>
                      </div>
                      <span className="text-base font-mono font-bold text-[#C8A49A]">
                        {formatPrice(p.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION PANEL */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-100 pt-6">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                Logged Records: {(currentPage - 1) * 6 + 1} - {Math.min(currentPage * 6, totalCount)} of {totalCount} Properties
              </span>
              <div className="flex gap-1.5 select-none font-mono text-xs">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-3.5 py-2 border border-gray-200 text-[#1a1a1a] hover:border-[#1a1a1a] disabled:opacity-30 disabled:hover:border-gray-200 cursor-pointer"
                >
                  PREV
                </button>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    className={`w-9 h-9 border flex items-center justify-center transition-colors font-bold cursor-pointer ${
                      currentPage === pg 
                        ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' 
                        : 'border-gray-200 text-gray-500 hover:border-[#1a1a1a]'
                    }`}
                  >
                    {pg}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="px-3.5 py-2 border border-gray-200 text-[#1a1a1a] hover:border-[#1a1a1a] disabled:opacity-30 disabled:hover:border-gray-200 cursor-pointer"
                >
                  NEXT
                </button>
              </div>
            </div>
          )}

        </section>

      </div>

      {/* MOBILE FILTERS SIDE DRAWER MODAL */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 md:hidden">
          <div className="w-full max-w-sm bg-white h-full p-6 space-y-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h3 className="text-xs uppercase font-mono tracking-widest text-[#1A1A1A] font-bold">
                  Property Sifters
                </h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-400 hover:text-[#1A1A1A]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Sector/Location */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-semibold">
                  Sector Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full text-xs p-3 border border-gray-100 bg-gray-50"
                >
                  {NEIGHBORHOODS.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Mobile Type */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-semibold">
                  Property Class/Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full text-xs p-3 border border-gray-100 bg-gray-50"
                >
                  {TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Mobile Price */}
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wide text-gray-400 block">Min</span>
                  <input
                    type="number"
                    value={filters.minPrice || ''}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setFilters({ ...filters, minPrice: isNaN(val) ? undefined : val });
                    }}
                    className="w-full text-xs p-3 border border-gray-100 bg-gray-50"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wide text-gray-400 block">Max</span>
                  <input
                    type="number"
                    value={filters.maxPrice || ''}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setFilters({ ...filters, maxPrice: isNaN(val) ? undefined : val });
                    }}
                    className="w-full text-xs p-3 border border-gray-100 bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-6 border-t border-gray-150">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-[#1A1A1A] text-white text-xs uppercase font-mono tracking-widest py-4 font-bold cursor-pointer text-center block"
              >
                Apply Direct Filters
              </button>
              <button
                onClick={() => { handleResetFilters(); setShowMobileFilters(false); }}
                className="w-full bg-gray-100 text-gray-500 text-xs uppercase font-mono tracking-widest py-3 font-semibold text-center block"
              >
                Clear & Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
