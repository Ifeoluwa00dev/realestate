import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1A1A]/95 text-white p-4">
      {/* Absolute close button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white hover:text-[#C8A49A] transition-colors p-2"
        title="Close gallery"
      >
        <X className="h-8 w-8" />
      </button>

      {/* Main Image frame wrapper */}
      <div className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center">
        {/* Left Toggle */}
        <button
          onClick={onPrev}
          className="absolute -left-4 sm:-left-12 p-3 text-white hover:text-[#C8A49A] bg-[#1A1A1A]/50 transition-all rounded-full hover:bg-[#1A1A1A]"
          title="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Current Image */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          referrerPolicy="no-referrer"
          className="max-w-full max-h-[80vh] object-contain border border-gray-800"
        />

        {/* Right Toggle */}
        <button
          onClick={onNext}
          className="absolute -right-4 sm:-right-12 p-3 text-white hover:text-[#C8A49A] bg-[#1A1A1A]/50 transition-all rounded-full hover:bg-[#1A1A1A]"
          title="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Slide counter metadata */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono tracking-widest text-[#C8A49A]">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
