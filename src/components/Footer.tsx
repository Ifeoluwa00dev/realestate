import { Landmark, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Intro */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#C8A49A] text-[#1A1A1A]">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm font-bold tracking-widest uppercase block leading-none">
                  LAGOS ARCH
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-gray-400 block mt-0.5">
                  Property Agency
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
              Representing architectural distinction, tropical modernism, and curated legacy portfolios across Banana Island, Ikoyi, Victoria Island, and Lekki.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-widest uppercase text-[#C8A49A]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Homepage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('listings')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Featured Properties
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Our Advisors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Agency Heritage
                </button>
              </li>
            </ul>
          </div>

          {/* Core Neighborhoods */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-widest uppercase text-[#C8A49A]">
              Sectors
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li>
                <button onClick={() => { onNavigate('listings'); }} className="hover:text-white transition-colors text-left">
                  Banana Island Penhouses
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('listings'); }} className="hover:text-white transition-colors text-left">
                  Ikoyi Modernist Terraces
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('listings'); }} className="hover:text-white transition-colors text-left">
                  Lekki Cantilever Villas
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('listings'); }} className="hover:text-white transition-colors text-left">
                  Ikeja GRA Period Estates
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 text-xs">
            <h4 className="text-[10px] font-mono tracking-widest uppercase text-[#C8A49A]">
              Lekki Corporate Office
            </h4>
            <div className="space-y-3 font-light text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#C8A49A] shrink-0 mt-0.5" />
                <span>12 Admiralty Way, Waterways Pavilion, Lekki Phase 1, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#C8A49A] shrink-0" />
                <span>+234 812 333 4444</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#C8A49A] shrink-0" />
                <span>concierge@lagosarch.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono text-gray-500 tracking-wider">
            &copy; {new Date().getFullYear()} LAGOS ARCH PROPERTY AGENCY. ALL RIGHTS RESERVED. ACCREDITED MEMBER OF ERCA NIGERIA.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#C8A49A] hover:text-white transition-colors cursor-pointer group"
          >
            Back to Ascent
            <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
