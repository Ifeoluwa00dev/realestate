import React from 'react';
import { Property, ViewingRequest, Agent } from '../types';
import { 
  Building, Eye, Plus, Edit3, Trash2, CheckCircle, 
  RotateCcw, Sparkles, AlertCircle, ArrowLeft, ArrowUp, ArrowDown, LogOut
} from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [leads, setLeads] = React.useState<ViewingRequest[]>([]);
  const [agents, setAgents] = React.useState<Agent[]>([]);

  // Form/Editor states
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    location: 'Banana Island',
    address: '',
    type: 'Penthouse' as Property['type'],
    price: '',
    beds: '3',
    baths: '3',
    sqm: '250',
    floor: '1',
    parking: '2',
    amenities: [] as string[],
    images: [] as string[],
    videoUrl: '',
    featured: false,
    status: 'Available' as Property['status'],
    agentId: '',
  });

  // AI Description states
  const [aiHighlights, setAiHighlights] = React.useState('');
  const [isAiLoading, setIsAiLoading] = React.useState(false);
  const [aiError, setAiError] = React.useState('');

  // Active sub-view states: 'listings' | 'leads'
  const [activeTab, setActiveTab] = React.useState<'listings' | 'leads'>('listings');
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');

  // Sorter / Custom image addition
  const [newImageInput, setNewImageInput] = React.useState('');

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
    'Wine Cellar',
    'Subzero Wine Storage',
    'Chef Kitchen',
    'Rooftop Lounge',
    'Home Cinema',
    'Library & Den',
    'Wellness Cabana & Gym',
    '24/7 Redundant Power',
    'Redundant Power Array',
    'Redundant Battery Array',
    'Solar Grid System',
    '100% Off-Grid Solar Power',
    'Armed Patrol Gate',
    'Staff Quarters',
    'Dual Staff Suites',
    'Guest Lodge'
  ];

  const NEIGHBORHOODS = ['Banana Island', 'Ikoyi', 'Lekki Phase 1', 'Victoria Island', 'Ikeja GRA'];
  const TYPES = ['Apartment', 'Penthouse', 'Maisonette', 'Duplex', 'Villa', 'Terrace'];

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const propRes = await fetch('/api/properties');
      const propData = await propRes.json();
      setProperties(propData.properties || []);

      const leadRes = await fetch('/api/leads');
      const leadData = await leadRes.json();
      setLeads(leadData);

      const agentRes = await fetch('/api/agents');
      const agentData = await agentRes.json();
      setAgents(agentData);
      
      if (agentData.length > 0 && !formData.agentId) {
        setFormData(prev => ({ ...prev, agentId: agentData[0].id }));
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const startAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      location: 'Banana Island',
      address: '',
      type: 'Penthouse',
      price: '',
      beds: '3',
      baths: '3',
      sqm: '250',
      floor: '1',
      parking: '2',
      amenities: [],
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      featured: false,
      status: 'Available',
      agentId: agents[0]?.id || 'agent-1',
    });
    setAiHighlights('');
    setAiError('');
    setIsEditing(true);
  };

  const startEdit = (p: Property) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      description: p.description,
      location: p.location,
      address: p.address,
      type: p.type,
      price: p.price.toString(),
      beds: p.beds.toString(),
      baths: p.baths.toString(),
      sqm: p.sqm.toString(),
      floor: (p.floor || 1).toString(),
      parking: p.parking.toString(),
      amenities: p.amenities,
      images: p.images,
      videoUrl: p.videoUrl || '',
      featured: p.featured,
      status: p.status,
      agentId: p.agentId || agents[0]?.id || 'agent-1',
    });
    setAiHighlights('');
    setAiError('');
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you absolutely certain you wish to purge this property listing from the Lagos Arch database? This action is non-reversible.')) {
      return;
    }

    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete property listing');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLeadStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAmenity = (am: string) => {
    setFormData(prev => {
      const existing = prev.amenities.includes(am)
        ? prev.amenities.filter(item => item !== am)
        : [...prev.amenities, am];
      return { ...prev, amenities: existing };
    });
  };

  const addImageUrl = () => {
    if (newImageInput.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageInput.trim()]
      }));
      setNewImageInput('');
    }
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const images = [...formData.images];
    if (direction === 'up' && index > 0) {
      const temp = images[index];
      images[index] = images[index - 1];
      images[index - 1] = temp;
    } else if (direction === 'down' && index < images.length - 1) {
      const temp = images[index];
      images[index] = images[index + 1];
      images[index + 1] = temp;
    }
    setFormData(prev => ({ ...prev, images }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const filtered = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: filtered.length > 0 ? filtered : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'] };
    });
  };

  // Generate premium descriptions using Google Gemini LLM API
  const handleAiDescribe = async () => {
    if (!formData.title || !formData.address) {
      setAiError('Please configure title and address first to feed context to the AI.');
      return;
    }
    setIsAiLoading(true);
    setAiError('');

    try {
      const response = await fetch('/api/ai/describe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          location: formData.location,
          type: formData.type,
          beds: formData.beds,
          baths: formData.baths,
          sqm: formData.sqm,
          architecturalHighlights: aiHighlights
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Server error generating description');
      }

      setFormData(prev => ({ ...prev, description: resData.description }));
    } catch (err: any) {
      setAiError(err.message || 'Could not reach the AI service right now.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const formattedPayload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      beds: parseInt(formData.beds, 10) || 0,
      baths: parseInt(formData.baths, 10) || 0,
      sqm: parseInt(formData.sqm, 10) || 0,
      floor: parseInt(formData.floor, 10) || 1,
      parking: parseInt(formData.parking, 10) || 0,
    };

    if (!formattedPayload.title || !formattedPayload.address || formattedPayload.price <= 0) {
      setSubmitError('Please address missing fields. Price must be a positive decimal.');
      return;
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId ? `/api/properties/${editingId}` : '/api/properties';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedPayload),
      });

      if (response.ok) {
        setIsEditing(false);
        setEditingId(null);
        fetchData();
      } else {
        const errorMsg = await response.json();
        setSubmitError(errorMsg.error || 'Failed to persist property data in the database.');
      }
    } catch (err: any) {
      setSubmitError('Connection failed.');
    }
  };

  return (
    <div className="bg-[#FCFCFC] min-h-screen pt-12 pb-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#C8A49A] mb-1">
              <span>Security Level: Authorized Partner</span>
            </div>
            <h1 className="text-3xl font-serif text-[#1A1A1A] tracking-wider">
              Lagos Arch Agency Admin
            </h1>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-gray-500 hover:text-[#1A1A1A] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Exit Portal
          </button>
        </div>

        {isEditing ? (
          /* Editor View */
          <div className="bg-white border border-gray-100 p-8 space-y-8">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <h2 className="text-xl font-serif text-[#1A1A1A] tracking-wide">
                {editingId ? 'Modify High-End Listing' : 'Introduce Architectural Listing'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-gray-400 hover:text-[#1A1A1A] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Cancel
              </button>
            </div>

            {submitError && (
              <div className="p-4 bg-red-50 text-red-600 border border-red-100 text-xs font-mono">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Core Info Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Property Signature Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Obsidian Pavilion Penthouse"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-100 focus:outline-[#C8A49A] bg-gray-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Sovereign Price (USD)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 3850000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-100 focus:outline-[#C8A49A] bg-gray-50"
                  />
                </div>
              </div>

              {/* Location & Address */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Core Neighborhood
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-100 focus:outline-[#C8A49A] bg-gray-50"
                  >
                    {NEIGHBORHOODS.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Physical Address (mapping anchor tag)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Glover Road Enclave, Ikoyi, Lagos"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-100 focus:outline-[#C8A49A] bg-gray-50"
                  />
                </div>
              </div>

              {/* Specs & Layout Row */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Property['type'] })}
                    className="w-full text-xs p-2.5 border border-gray-100 bg-gray-50"
                  >
                    {TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={formData.beds}
                    onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-100 bg-gray-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={formData.baths}
                    onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-100 bg-gray-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Sqm (Sizing)
                  </label>
                  <input
                    type="number"
                    value={formData.sqm}
                    onChange={(e) => setFormData({ ...formData, sqm: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-100 bg-gray-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Floor Level
                  </label>
                  <input
                    type="number"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-100 bg-gray-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Vehicle Bays
                  </label>
                  <input
                    type="number"
                    value={formData.parking}
                    onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-100 bg-gray-50"
                  />
                </div>
              </div>

              {/* Status and Portfolio Advisor */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 select-none shadow-sm border border-gray-50 p-4">
                <div className="space-y-1 md:col-span-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Release State
                  </label>
                  <div className="flex gap-2">
                    {['Available', 'Sold', 'Let'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setFormData({ ...formData, status: st as Property['status'] })}
                        className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase border cursor-pointer ${
                          formData.status === st 
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                            : 'bg-white text-gray-500 border-gray-200 hover:border-[#1A1A1A]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 accent-[#C8A49A] cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-xs font-mono uppercase tracking-widest text-gray-500 cursor-pointer">
                    Signal as Signature Asset
                  </label>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Assign Advisory Advisor
                  </label>
                  <select
                    value={formData.agentId}
                    onChange={(e) => setFormData({ ...formData, agentId: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-100 bg-gray-50"
                  >
                    {agents.map(ag => (
                      <option key={ag.id} value={ag.id}>{ag.name} — {ag.role}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Gorgeous AI Description Generator powered by Gemini API */}
              <div className="border border-purple-100 bg-purple-50/50 p-6 space-y-4 rounded-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-purple-600" />
                    <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-purple-900">
                      AI Editorial Description Generator
                    </h3>
                  </div>
                  <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-purple-100 text-purple-700">
                    Server-driven Gemini
                  </span>
                </div>

                <p className="text-xs text-gray-500 leading-normal font-light">
                  Optionally outline custom unique highlights (e.g., "features Lekki sunsets, Yacht jetty access, automated glass screens, and structural cantilevers") then let Gemini draft elegant, architectural digest-style copywriting!
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="e.g. Floating glass pool, Eko Atlantic vistas, sustainable teak trims..."
                    value={aiHighlights}
                    onChange={(e) => setAiHighlights(e.target.value)}
                    className="flex-1 text-xs p-3 border border-purple-200 bg-white focus:outline-purple-600"
                  />
                  <button
                    type="button"
                    onClick={handleAiDescribe}
                    disabled={isAiLoading}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-mono uppercase text-[10px] tracking-widest px-5 py-3 transition-colors shrink-0 cursor-pointer shadow-sm"
                  >
                    {isAiLoading ? 'Composing...' : 'Draft Editorial Prose'}
                  </button>
                </div>

                {aiError && (
                  <div className="text-[10px] font-mono text-red-600 bg-red-50/50 p-2.5 border border-red-100">
                    <span className="font-bold flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" /> Note:
                    </span>
                    {aiError}
                  </div>
                )}
              </div>

              {/* Pure Text Area description */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                  Detailed Property Prose Description
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Insert premium description about layout flow, landscape sights, and structural integrity..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full text-xs p-3 border border-gray-100 focus:outline-[#C8A49A] font-light bg-gray-50 leading-relaxed"
                />
              </div>

              {/* Gallery Image Sorter Simulator Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Curate Property Canvas (Drag-and-Drop Sorter Emulation)
                  </label>
                  <span className="text-[9px] font-mono text-[#C8A49A]">
                    {formData.images.length} Image Panels Ordered
                  </span>
                </div>

                {/* Grid of images in order */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group/img border border-gray-100 bg-gray-50 p-2">
                      <img
                        src={img}
                        alt="Preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-24 object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-[#1A1A1A]/80 text-white text-[9px] font-mono px-1.5 py-0.5">
                        Slot {index + 1}
                      </div>

                      {/* Sorting controls */}
                      <div className="mt-2 flex justify-between items-center text-gray-500">
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => moveImage(index, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:text-[#1A1A1A] disabled:opacity-30 cursor-pointer"
                            title="Move left"
                          >
                            <ArrowLeft className="h-4.5 w-4.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveImage(index, 'down')}
                            disabled={index === formData.images.length - 1}
                            className="p-1 hover:text-[#1A1A1A] disabled:opacity-30 cursor-pointer"
                            title="Move right"
                          >
                            <ArrowLeft className="h-4.5 w-4.5 rotate-180" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="p-1 hover:text-red-500 cursor-pointer"
                          title="Purge"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Image Addition */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Provide Unsplash image URL to append into portfolio slot..."
                    value={newImageInput}
                    onChange={(e) => setNewImageInput(e.target.value)}
                    className="flex-1 text-xs p-3 border border-gray-100 bg-gray-50 focus:outline-[#C8A49A]"
                  />
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="bg-[#1A1A1A] hover:bg-[#C8A49A] text-white font-mono uppercase text-[10px] tracking-widest px-4 py-3 shrink-0 cursor-pointer"
                  >
                    Append URL
                  </button>
                </div>
              </div>

              {/* Amenities checkboxes */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block border-b border-gray-50 pb-1">
                  Amenities Checklist Selection
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {AMENITIES_CATALOG.map((am) => (
                    <button
                      key={am}
                      type="button"
                      onClick={() => toggleAmenity(am)}
                      className={`text-left text-xs p-3 border transition-colors flex items-center justify-between cursor-pointer ${
                        formData.amenities.includes(am)
                          ? 'border-[#C8A49A] bg-[#C8A49A]/5 text-[#1A1A1A]'
                          : 'border-gray-100 bg-white hover:border-[#1A1A1A] text-gray-500'
                      }`}
                    >
                      <span className="font-light">{am}</span>
                      {formData.amenities.includes(am) && (
                        <div className="w-1.5 h-1.5 bg-[#C8A49A] rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit panel buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-50">
                <button
                  type="submit"
                  className="bg-[#1A1A1A] hover:bg-[#C8A49A] text-white font-mono text-xs uppercase tracking-widest px-8 py-4 transition-colors font-semibold cursor-pointer"
                >
                  {editingId ? 'Modify Database Listing Record' : 'Publish Asset To Database'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-mono text-xs uppercase tracking-widest px-6 py-4 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Tables list view */
          <div className="space-y-10">
            {/* Tabs Toggle and Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-1.5">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`pb-4 px-2 text-xs uppercase font-mono tracking-widest cursor-pointer border-b-2 font-bold transition-colors ${
                    activeTab === 'listings'
                      ? 'border-[#C8A49A] text-[#C8A49A]'
                      : 'border-transparent text-gray-400 hover:text-[#1A1A1A]'
                  }`}
                >
                  Portfolio Listings ({properties.length})
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`pb-4 px-2 text-xs uppercase font-mono tracking-widest cursor-pointer border-b-2 font-bold transition-colors ${
                    activeTab === 'leads'
                      ? 'border-[#C8A49A] text-[#C8A49A]'
                      : 'border-transparent text-gray-400 hover:text-[#1A1A1A]'
                  }`}
                >
                  Viewing Inquiries ({leads.length})
                </button>
              </div>

              {activeTab === 'listings' && (
                <button
                  onClick={startAdd}
                  className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#C8A49A] text-white font-mono text-xs uppercase tracking-widest py-3 px-5 transition-colors font-bold cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Introduce Property
                </button>
              )}
            </div>

            {/* List Tab Container content */}
            {isLoading ? (
              <div className="py-12 text-center text-xs font-mono text-gray-400 tracking-widest">
                Accessing Lagos Arch Cloud Core... Please Hold
              </div>
            ) : activeTab === 'listings' ? (
              /* Properties list */
              <div className="overflow-x-auto border border-gray-100 bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-mono uppercase tracking-widest text-gray-400">
                      <th className="p-4 pl-6">Visual</th>
                      <th className="p-4">Property Identity</th>
                      <th className="p-4">Location</th>
                      <th className="p-4 text-right">Price (USD)</th>
                      <th className="p-4">State</th>
                      <th className="p-4 text-right pr-6">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs font-light">
                    {properties.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 pl-6">
                          <img
                            src={p.images[0]}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover border border-gray-100"
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <span className="font-semibold block text-gray-900">{p.title}</span>
                            <span className="text-[10px] uppercase font-mono text-gray-400 mt-0.5 block">{p.type} — {p.sqm} m²</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-500">{p.location}</td>
                        <td className="p-4 text-right font-mono font-semibold text-[#1A1A1A]">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p.price)}
                        </td>
                        <td className="p-4">
                          <span className={`text-[9px] uppercase font-mono px-2 py-1 ${
                            p.status === 'Available' ? 'bg-[#C8A49A]/10 text-[#C8A49A]' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 text-right pr-6">
                          <div className="flex justify-end gap-2 text-gray-400">
                            <button
                              onClick={() => startEdit(p)}
                              className="p-1.5 hover:text-[#C8A49A] transition-colors cursor-pointer"
                              title="Edit listing details"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="p-1.5 hover:text-red-600 transition-colors cursor-pointer"
                              title="Purge listing"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {properties.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-xs font-mono text-gray-400">
                          No active listings logged inside the custom database, let's create one!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Leads table */
              <div className="overflow-x-auto border border-gray-100 bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-mono uppercase tracking-widest text-gray-400">
                      <th className="p-4 pl-6">Client contact</th>
                      <th className="p-4">Target Property</th>
                      <th className="p-4">Bookings Preferences</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right pr-6">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs font-light">
                    {leads.map((ld) => (
                      <tr key={ld.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 pl-6">
                          <div>
                            <span className="font-semibold block text-gray-900">{ld.name}</span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">{ld.email}</span>
                            <span className="text-[10px] font-mono text-gray-400 block">{ld.phone}</span>
                          </div>
                        </td>
                        <td className="p-4 max-w-[200px] truncate text-gray-700">
                          {ld.listingTitle}
                        </td>
                        <td className="p-4">
                          <div className="font-mono text-[10px]">
                            <span className="block">{ld.preferredDate}</span>
                            <span className="block text-[#C8A49A] mt-0.5">{ld.preferredTime}</span>
                          </div>
                        </td>
                        <td className="p-4 max-w-[220px] text-gray-400 italic text-[11px] font-light">
                          {ld.message || '—'}
                        </td>
                        <td className="p-4">
                          <span className={`text-[9px] uppercase font-mono px-2 py-1 ${
                            ld.status === 'Pending' 
                              ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                              : ld.status === 'Approved' 
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                : 'bg-gray-100 text-gray-400'
                          }`}>
                            {ld.status}
                          </span>
                        </td>
                        <td className="p-4 text-right pr-6">
                          <div className="flex justify-end gap-1.5">
                            {ld.status === 'Pending' ? (
                              <>
                                <button
                                  onClick={() => handleLeadStatus(ld.id, 'Approved')}
                                  className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10px] uppercase px-2.5 py-1.5 transition-colors cursor-pointer"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleLeadStatus(ld.id, 'Contacted')}
                                  className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-mono text-[10px] uppercase px-2.5 py-1.5 transition-colors cursor-pointer"
                                >
                                  Contacted
                                </button>
                              </>
                            ) : ld.status === 'Approved' ? (
                              <button
                                onClick={() => handleLeadStatus(ld.id, 'Contacted')}
                                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-mono text-[10px] uppercase px-2.5 py-1.5 transition-colors cursor-pointer"
                              >
                                Mark Contacted
                              </button>
                            ) : (
                              <button
                                onClick={() => handleLeadStatus(ld.id, 'Pending')}
                                className="flex items-center gap-1 text-gray-400 hover:text-[#1A1A1A] font-mono text-[10px] uppercase cursor-pointer"
                              >
                                <RotateCcw className="h-3 w-3" /> Reopen
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-xs font-mono text-gray-400">
                          No viewing request leads logged inside the database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
