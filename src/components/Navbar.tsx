import React from 'react';
import { Landmark, Menu, X, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, listingId?: string) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'listings', label: 'Properties' },
    { id: 'team', label: 'Advisors' },
    { id: 'about', label: 'Agency' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FCFCFC]/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Brand styling */}
          <div 
            onClick={() => { onNavigate('home'); setIsOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative p-2 bg-[#1A1A1A] group-hover:bg-[#C8A49A] transition-colors duration-300">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-widest text-[#1A1A1A] uppercase block leading-none">
                LAGOS ARCH
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] block mt-0.5">
                Property Agency
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative text-xs uppercase font-medium tracking-widest transition-colors duration-300 py-2 group cursor-pointer ${
                  currentView === item.id || (item.id === 'listings' && currentView === 'detail')
                    ? 'text-[#C8A49A]'
                    : 'text-[#1A1A1A] hover:text-[#C8A49A]'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#C8A49A] transition-transform duration-300 origin-left ${
                  currentView === item.id || (item.id === 'listings' && currentView === 'detail') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>
            ))}

            {/* Admin entry point - premium accent styling */}
            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-2 text-xs uppercase font-mono tracking-wider transition-all duration-300 py-2.5 px-4 mr-0 ${
                currentView === 'admin'
                  ? 'bg-[#C8A49A] text-white'
                  : 'border border-gray-200 text-[#1A1A1A] hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              Portal Admin
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => onNavigate('admin')}
              className={`p-2 border border-gray-100 ${
                currentView === 'admin' ? 'bg-[#C8A49A] text-white' : 'text-[#1A1A1A]'
              }`}
              title="Admin"
            >
              <ShieldAlert className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-[#1A1A1A] hover:text-[#C8A49A] transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#FCFCFC] border-b border-gray-100">
          <div className="px-6 py-6 space-y-4 flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`text-left text-sm uppercase font-semibold tracking-wider py-2 border-b border-gray-50 ${
                  currentView === item.id ? 'text-[#C8A49A]' : 'text-[#1A1A1A]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('admin');
                setIsOpen(false);
              }}
              className="w-full text-center text-xs uppercase font-mono tracking-widest bg-[#1A1A1A] text-white py-3 mt-2"
            >
              Portal Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
