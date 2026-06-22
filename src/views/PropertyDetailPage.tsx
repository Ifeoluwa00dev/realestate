import React from 'react';
import { Property, Agent } from '../types';
import PropertyMap from '../components/PropertyMap';
import ViewingsForm from '../components/ViewingsForm';
import ImageLightbox from '../components/ImageLightbox';
import { 
  BedDouble, Bath, Square, ChevronUpSquare, Car, 
  MapPin, MessageCircle, Mail, Phone, ArrowLeft, Play, ExternalLink
} from 'lucide-react';

interface PropertyDetailPageProps {
  propertyId: string;
  properties: Property[];
  agents: Agent[];
  onBack: () => void;
  onSelectProperty: (id: string) => void;
}

export default function PropertyDetailPage({
  propertyId,
  properties,
  agents,
  onBack,
  onSelectProperty,
}: PropertyDetailPageProps) {
  const property = properties.find(p => p.id === propertyId);
  if (!property) {
    return (
      <div className="py-24 text-center space-y-4">
        <h4 className="text-xl font-serif text-[#1A1A1A]">Property record not found</h4>
        <button onClick={onBack} className="text-xs font-mono uppercase tracking-widest text-[#C8A49A] underline">
          Back to Listings
        </button>
      </div>
    );
  }

  // Get matching Agent
  const agent = agents.find(a => a.id === property.agentId) || agents[0];

  // For gallery lightbox
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [activeImageIdx, setActiveImageIdx] = React.useState(0);

  // Schema.org structured data - dynamic creation
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "url": window.location.href,
    "datePosted": property.createdAt,
    "numberOfRooms": property.beds + property.baths,
    "price": property.price,
    "priceCurrency": "USD",
    "image": property.images,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address,
      "addressLocality": property.location,
      "addressRegion": "Lagos",
      "addressCountry": "NG"
    }
  };

  React.useEffect(() => {
    // Append or update structured data in head
    const existingScript = document.getElementById('schema-real-estate');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'schema-real-estate';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('schema-real-estate');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [propertyId, property]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleNextImage = () => {
    setLightboxIndex(prev => (prev + 1) % property.images.length);
  };

  const handlePrevImage = () => {
    setLightboxIndex(prev => (prev - 1 + property.images.length) % property.images.length);
  };

  // WhatsApp prefilled message linking
  // Prefills message with property title and URL
  const getWhatsAppLink = () => {
    const textStr = `Hello! I am inquiring about the premium property listing on Lagos Arch: "${property.title}" in ${property.location}. Can we arrange a private viewing? Here is the reference link: ${window.location.href}`;
    return `https://wa.me/${agent?.whatsapp || '2348031112222'}?text=${encodeURIComponent(textStr)}`;
  };

  // Filter similar properties (exclude current, matching same location or type)
  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.location === property.location || p.type === property.type) && p.status === 'Available')
    .slice(0, 3);

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="bg-[#FCFCFC] min-h-screen pb-24">
      
      {/* Immersive head section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-gray-500 hover:text-[#1A1A1A] transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back to collection
        </button>

        {/* Title & Core Details Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-[#C8A49A] uppercase tracking-widest font-mono">
              <MapPin className="h-3.5 w-3.5" />
              <span>{property.location} Sector • {property.type}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-[#1A1A1A] tracking-wider leading-tight">
              {property.title}
            </h1>
          </div>

          <div className="text-left md:text-right space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] block">
              Investment Core Value
            </span>
            <span className="text-2xl sm:text-3xl font-mono text-[#1a1a1a] font-bold tracking-wide">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>

        {/* 
          Double column primary visual components
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* LEFT CONTAINER (MEDIAS, DESCRIPTION, CHECKLIST, MAPS) */}
          <div className="md:col-span-2 space-y-12">
            
            {/* Gallery Images Container */}
            <div className="space-y-4">
              {/* Primary large visual */}
              <div 
                onClick={() => handleOpenLightbox(activeImageIdx)}
                className="relative aspect-video w-full border border-gray-100 overflow-hidden bg-gray-50 cursor-pointer group"
              >
                <img
                  src={property.images[activeImageIdx]}
                  alt={`${property.title} - Main visual`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 duration-1000 ease-out transition-transform"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
                
                {/* Visual expansion prompt */}
                <span className="absolute bottom-4 right-4 bg-[#1A1A1A]/80 text-white text-[10px] font-mono uppercase tracking-widest py-2 px-4 shadow-md backdrop-blur-sm">
                  Click to Expand Canvas Gallery
                </span>
              </div>

              {/* Thumbnails row */}
              <div className="grid grid-cols-4 gap-4 select-none">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative aspect-video w-full overflow-hidden border bg-gray-50 transition-all cursor-pointer ${
                      activeImageIdx === idx 
                        ? 'border-[#C8A49A] ring-1 ring-[#C8A49A]' 
                        : 'border-gray-200 hover:border-[#1A1A1A]'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensional Specifications bar card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 border border-gray-100 bg-[#FDFDFD]">
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-mono tracking-wider text-gray-400 block">Bedrooms Layout</span>
                <div className="flex items-center gap-2 text-[#1a1a1a]">
                  <BedDouble className="h-4.5 w-4.5 text-[#C8A49A]" />
                  <span className="text-sm font-semibold tracking-wide font-mono">{property.beds} Suites</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] uppercase font-mono tracking-wider text-gray-400 block">Bathrooms Specs</span>
                <div className="flex items-center gap-2 text-[#1a1a1a]">
                  <Bath className="h-4.5 w-4.5 text-[#C8A49A]" />
                  <span className="text-sm font-semibold tracking-wide font-mono">{property.baths} Baths</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] uppercase font-mono tracking-wider text-gray-400 block">Sizing Envelope</span>
                <div className="flex items-center gap-2 text-[#1a1a1a]">
                  <Square className="h-4.5 w-4.5 text-[#C8A49A]" />
                  <span className="text-sm font-semibold tracking-wide font-mono">{property.sqm} m² Net</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] uppercase font-mono tracking-wider text-gray-400 block">Garage Slots</span>
                <div className="flex items-center gap-2 text-[#1a1a1a]">
                  <Car className="h-4.5 w-4.5 text-[#C8A49A]" />
                  <span className="text-sm font-semibold tracking-wide font-mono">{property.parking} Bays</span>
                </div>
              </div>
            </div>

            {/* Description Narrative */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-[#1A1A1A] font-bold border-b border-gray-100 pb-2">
                Architectural Prose & Layout Flow
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed font-sans whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Custom Amenities checklist */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-[#1A1A1A] font-bold border-b border-gray-100 pb-2">
                Inherent Amenities List
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((am) => (
                  <div key={am} className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="w-1.5 h-1.5 bg-[#C8A49A] rounded-full shrink-0" />
                    <span className="font-light">{am}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Youtube Virtual Tour Embed */}
            {property.videoUrl && (
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-mono tracking-widest text-[#1A1A1A] font-bold border-b border-gray-100 pb-2 flex items-center gap-2">
                  <Play className="h-4 w-4 text-[#C8A49A]" /> Visual Tour Embed
                </h3>
                <div className="relative aspect-video w-full border border-gray-150 bg-gray-50 overflow-hidden h-[300px] sm:h-[380px]">
                  <iframe
                    title="YouTube video player virtual tour representation"
                    contextMenu="none"
                    src={property.videoUrl}
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Google Interactive Maps pin locator */}
            <PropertyMap address={property.address} title={property.title} />

          </div>

          {/* RIGHT CONTAINER (ADVISOR INQUIRY CARD, APPOINTMENT VIEWINGS FORM) */}
          <div className="space-y-10 md:sticky md:top-24">
            
            {/* Agent / Advisor card */}
            <div className="bg-white border border-gray-100 p-6 sm:p-8 space-y-6">
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#C8A49A] block">
                Lead Listing Advisor
              </span>
              
              <div className="flex items-center gap-5">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-20 object-cover border border-gray-100"
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-gray-900 tracking-wide">
                    {agent.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-mono uppercase leading-tight font-light col-span-2">
                    {agent.role}
                  </p>
                  <span className="text-[10px] font-semibold text-emerald-600 block">
                    Active Portfolios: {agent.listingsCount} Estates
                  </span>
                </div>
              </div>

              <p className="text-gray-500 text-xs font-light leading-relaxed">
                "{agent.bio}"
              </p>

              {/* Direct links contacts */}
              <div className="space-y-2.5 pt-4 border-t border-gray-50">
                {/* Prefilled WhatsApp Inquiry */}
                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#1A1A1A] hover:bg-emerald-600 hover:text-white-600 text-white text-xs uppercase font-mono tracking-widest py-3.5 px-4 transition-all duration-300 flex items-center justify-center gap-2 font-bold shadow-sm"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  WhasApp Inquiry Link
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  <a 
                    href={`mailto:${agent.email}`}
                    className="flex items-center justify-center gap-1.5 border border-gray-150 py-3 text-[10px] uppercase font-mono hover:border-[#1A1A1A] text-[#1A1A1A] transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    EMAIL LINK
                  </a>
                  <a 
                    href={`tel:${agent.phone}`}
                    className="flex items-center justify-center gap-1.5 border border-gray-150 py-3 text-[10px] uppercase font-mono hover:border-[#1A1A1A] text-[#1A1A1A] transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    PHONE DIAL
                  </a>
                </div>
              </div>
            </div>

            {/* viewing lead form */}
            <ViewingsForm listingId={property.id} listingTitle={property.title} />

          </div>

        </div>

        {/* 
          SUGGESTIONS BOTTOM BAR (SIMILAR MASTERPIECES)
        */}
        {similarProperties.length > 0 && (
          <div className="border-t border-gray-100 pt-16 mt-20 space-y-8">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#C8A49A] block">
                Related Segments
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] tracking-wider">
                Similar Masterpieces
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => { onSelectProperty(p.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group cursor-pointer overflow-hidden border border-gray-150 bg-white hover:border-[#C8A49A] transition-all duration-300 h-[380px] flex flex-col justify-end relative select-none"
                >
                  <img
                    src={p.images[0]}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-[125%] object-cover -translate-y-6 group-hover:translate-y-0 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/95 via-[#1a1a1a]/20 to-transparent" />
                  
                  <div className="relative z-10 p-6 text-white space-y-2">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-[#C8A49A]">{p.location}</span>
                    <h4 className="text-base font-serif tracking-wider group-hover:text-[#C8A49A] transition-colors leading-snug">
                      {p.title}
                    </h4>
                    <span className="text-xs font-mono font-bold text-[#C8A49A] block pt-3 border-t border-white/5">
                      {formatPrice(p.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* LIGHTBOX FOR HIGH DENSITY visual inspection */}
      <ImageLightbox
        images={property.images}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />

    </div>
  );
}
