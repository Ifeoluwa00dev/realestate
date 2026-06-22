import { Property } from '../types';
import { MapPin, BedDouble, Bath, Square, ChevronRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (id: string) => void;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  // Format price into USD / Local premium format ($M or ₦M)
  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div 
      onClick={() => onSelect(property.id)}
      className="group relative cursor-pointer overflow-hidden border border-gray-100 bg-white transition-all duration-500 h-[480px] hover:border-gray-300 flex flex-col justify-end"
    >
      {/* 
        Signature Parallax-Scroll Independent Image Element:
        The image occupies a larger height (h-[125%]) and is translated upwards (-translate-y-[12%]) inside an overflow-hidden frame.
        On-hover, it translates downwards smoothly, panning independently of the containing borders.
      */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          referrerPolicy="no-referrer"
          className="absolute left-0 top-0 w-full h-[125%] object-cover transform -translate-y-[12%] group-hover:translate-y-0 transition-transform duration-1000 ease-out will-change-transform"
        />
        {/* Architectural Charcoal Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/40 to-transparent transition-opacity duration-500" />
      </div>

      {/* Property Status Badge */}
      <div className="absolute top-6 left-6 z-10 flex gap-2">
        <span className={`text-[9px] uppercase font-mono tracking-widest px-3 py-1.5 text-white ${
          property.status === 'Available' 
            ? 'bg-[#C8A49A]' 
            : property.status === 'Sold' 
              ? 'bg-[#1A1A1A] border border-gray-600' 
              : 'bg-emerald-600'
        }`}>
          {property.status}
        </span>
        {property.featured && property.status === 'Available' && (
          <span className="text-[9px] uppercase font-mono tracking-widest px-3 py-1.5 bg-white text-[#1A1A1A]">
            Signature
          </span>
        )}
      </div>

      {/* Detail Overlay Content */}
      <div className="relative z-10 p-6 sm:p-8 text-white space-y-4 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
        <div>
          {/* Subtitle location */}
          <div className="flex items-center gap-1.5 text-xs text-[#C8A49A] uppercase tracking-widest mb-1.5 font-medium">
            <MapPin className="h-3 w-3" />
            <span>{property.location}</span>
          </div>
          {/* Title - Elegant Serif */}
          <h3 className="text-xl sm:text-2xl font-serif text-white tracking-wide group-hover:text-[#C8A49A] transition-colors leading-tight duration-300">
            {property.title}
          </h3>
        </div>

        {/* Specs bar */}
        <div className="flex items-center gap-4 text-xs font-mono text-gray-300 pb-2 border-b border-white/10">
          <div className="flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5 text-[#C8A49A]" />
            <span>{property.beds} Bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5 text-[#C8A49A]" />
            <span>{property.baths} Bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-3.5 w-3.5 text-[#C8A49A]" />
            <span>{property.sqm} m²</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex justify-between items-center pt-1">
          <span className="text-lg font-mono text-[#C8A49A] font-bold tracking-wide">
            {formatPrice(property.price)}
          </span>
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Examine
            <ChevronRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
