import React from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface ViewingsFormProps {
  listingId: string;
  listingTitle: string;
}

export default function ViewingsForm({ listingId, listingTitle }: ViewingsFormProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId,
          listingTitle,
          ...formData,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit booking inquiry');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'An unexpected database error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 border border-gray-100 flex flex-col justify-between">
      <div className="space-y-4 mb-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A49A] block">
          Appointment Service
        </span>
        <h3 className="text-xl font-serif text-[#1A1A1A] tracking-wide">
          Schedule Private Tour
        </h3>
        <p className="text-gray-500 text-xs font-light leading-relaxed">
          Coordinate an exclusive, confidential property walk-through with our Lead Portfolio Advisor. Please provide your scheduling preferences below.
        </p>
      </div>

      {success ? (
        <div className="p-6 bg-[#C8A49A]/5 border border-[#C8A49A]/40 text-center space-y-4">
          <div className="mx-auto w-10 h-10 rounded-full bg-[#C8A49A]/20 flex items-center justify-center text-[#C8A49A]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-[#1A1A1A]">
              Application Logged Successfully
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              Your confidential scheduling request hasbeen prioritized. A Lagos Arch Advisor will reach out via WhatsApp/Phone within the hour to coordinate secure access parameters.
            </p>
          </div>
          <button
            onClick={() => setSuccess(false)}
            className="text-[10px] font-mono tracking-widest text-[#C8A49A] uppercase hover:underline"
          >
            Schedule Another Slot
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-100 font-mono">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Aliko Dangote"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full text-xs p-3 border border-gray-100 focus:outline-none focus:border-[#C8A49A] font-light bg-gray-50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="e.g. aliko@grup.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs p-3 border border-gray-100 focus:outline-none focus:border-[#C8A49A] font-light bg-gray-50 transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                Contact Phone
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. +234 803 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs p-3 border border-gray-100 focus:outline-none focus:border-[#C8A49A] font-light bg-gray-50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#C8A49A]" />
                Preferred Date
              </label>
              <input
                type="date"
                required
                min={today}
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full text-xs p-3 border border-gray-100 focus:outline-none focus:border-[#C8A49A] font-light bg-gray-50 transition-colors cursor-pointer"
              />
            </div>

            {/* Time */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#C8A49A]" />
                Preferred Time
              </label>
              <input
                type="time"
                required
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full text-xs p-3 border border-gray-100 focus:outline-none focus:border-[#C8A49A] font-light bg-gray-50 transition-colors cursor-pointer"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
              Optional Message
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Interest in docking yacht, special gate clearance needed..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full text-xs p-3 border border-gray-100 focus:outline-none focus:border-[#C8A49A] font-light bg-gray-50 transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1A1A1A] hover:bg-[#C8A49A] text-white text-xs uppercase font-mono tracking-widest py-4 transition-all duration-300 disabled:bg-gray-400 font-semibold cursor-pointer"
          >
            {isLoading ? 'dispatching application...' : 'schedule private tour'}
          </button>
        </form>
      )}
    </div>
  );
}
