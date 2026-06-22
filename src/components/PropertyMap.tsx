import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  address: string;
  title: string;
}

export default function PropertyMap({ address, title }: PropertyMapProps) {
  // Free, robust dynamic embed system maps completely live locations without api billing keys!
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#C8A49A]" />
          <h4 className="text-xs uppercase font-mono tracking-widest text-[#1A1A1A] font-semibold">
            Location Profile & Mapping
          </h4>
        </div>
        <span className="text-[10px] font-mono text-gray-400">
          Approximate Pin
        </span>
      </div>

      <div className="relative aspect-video w-full border border-gray-100 bg-gray-50 overflow-hidden h-[300px] sm:h-[380px]">
        <iframe
          title={`Google Map representation of ${title}`}
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.1) contrast(1.05)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <p className="text-[10px] text-gray-400 uppercase font-mono tracking-wider text-center">
        Address: {address}
      </p>
    </div>
  );
}
