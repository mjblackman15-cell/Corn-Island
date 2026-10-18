import { useState, useEffect } from 'react';
import { X, Send, Sparkles, MapPin, Compass } from 'lucide-react';
import { Spot, Category, Island, PriceTier } from '../types';

interface SubmitSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSpot: (newSpot: Spot) => void;
}

const PHOTO_PRESETS = [
  { label: 'The Corner', url: '/src/assets/images/the_corner_bar_1792277384823.jpg' },
  { label: "Spekito's Place", url: '/src/assets/images/spekitos_place_sharks_1792276438737.jpg' },
  { label: 'Dive Center', url: '/src/assets/images/corn_island_dive_center_real_1792276438826.jpg' },
  { label: 'Yemaya Reef', url: '/src/assets/images/yemaya_reef_1792277385620.jpg' },
  { label: 'Las Palmeras', url: '/src/assets/images/las_palmeras_oceanview_1792277384897.jpg' },
  { label: 'Los Delfines', url: '/src/assets/images/los_delfines_hotel_1792277384787.jpg' },
  { label: 'Sweets Cafe', url: '/src/assets/images/rosa_del_mar_sweets_cafe_1792277386123.jpg' },
];

export function SubmitSpotModal({ isOpen, onClose, onSubmitSpot }: SubmitSpotModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Spot['category']>('Food & Drink');
  const [island, setIsland] = useState<'Big Corn' | 'Little Corn'>('Big Corn');
  const [priceTier, setPriceTier] = useState<PriceTier>('$$');
  const [insiderTip, setInsiderTip] = useState('');
  const [description, setDescription] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(PHOTO_PRESETS[1].url);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !insiderTip.trim() || !locationDetails.trim()) return;

    // Default island coordinates with slight realistic variation
    const baseCoords: [number, number] =
      island === 'Big Corn'
        ? [12.1670 + (Math.random() - 0.5) * 0.02, -83.0550 + (Math.random() - 0.5) * 0.02]
        : [12.2900 + (Math.random() - 0.5) * 0.015, -83.0480 + (Math.random() - 0.5) * 0.015];

    const finalImage = customPhotoUrl.trim() || selectedPhoto;

    const newSpot: Spot = {
      id: `spot-user-${Date.now()}`,
      name: name.trim(),
      category,
      island,
      priceTier,
      insiderTip: insiderTip.trim(),
      description: description.trim() || `A wonderful local gem recommended by travelers on ${island}.`,
      locationDetails: locationDetails.trim(),
      operatingHours: operatingHours.trim() || 'Daily: 8:00 AM – 6:00 PM',
      coordinates: baseCoords,
      imageUrl: finalImage,
      rating: 5.0,
      reviewsCount: 1,
      reviews: [
        {
          id: `rev-initial-${Date.now()}`,
          author: 'Community Member',
          rating: 5,
          date: 'Just now',
          comment: `Submitted as an authentic hidden gem: "${insiderTip.trim()}"`,
        },
      ],
      isUserSubmitted: true,
    };

    onSubmitSpot(newSpot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-spot-title"
        className="relative w-full max-w-xl bg-white rounded-3xl border border-[#E7E2D6] shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0E4B68] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 id="submit-spot-title" className="text-lg sm:text-xl font-bold font-display text-white">
                Submit a Local Spot
              </h2>
              <p className="text-xs text-amber-200">
                Share a hidden gem, bakery, dive shack, or beach with fellow travelers
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {/* Spot Name */}
          <div>
            <label className="block text-xs font-semibold text-[#0E4B68] mb-1">
              Spot or Business Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Picnic Center Beach Bar & Bakery"
              className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden"
            />
          </div>

          {/* Category & Island */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0E4B68] mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Spot['category'])}
                className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden cursor-pointer"
              >
                <option value="Beaches">Beaches</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Activities">Activities</option>
                <option value="Practical Tips">Practical Tips</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0E4B68] mb-1">
                Island *
              </label>
              <select
                value={island}
                onChange={(e) => setIsland(e.target.value as 'Big Corn' | 'Little Corn')}
                className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden cursor-pointer"
              >
                <option value="Big Corn">Big Corn Island</option>
                <option value="Little Corn">Little Corn Island</option>
              </select>
            </div>
          </div>

          {/* Price Tier */}
          <div>
            <label className="block text-xs font-semibold text-[#0E4B68] mb-1.5">
              Price Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['$', '$$', '$$$'] as PriceTier[]).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setPriceTier(tier)}
                  className={`py-2 text-center text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    priceTier === tier
                      ? 'bg-[#0E4B68] text-amber-300 border-[#0E4B68] shadow-xs'
                      : 'bg-[#F8F6F0] text-[#64748B] border-[#E7E2D6] hover:bg-[#EFECE4]'
                  }`}
                >
                  {tier}{' '}
                  <span className="font-normal text-[11px] opacity-80">
                    {tier === '$' ? '(Budget)' : tier === '$$' ? '(Moderate)' : '(Splurge)'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 1-Sentence Insider Tip */}
          <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D6]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <label htmlFor="input-insider-tip">1-Sentence Insider Tip *</label>
            </div>
            <p className="text-[11px] text-[#64748B] mb-2">
              What is the one thing a traveler should know before going? (e.g. best dish, timing, secret path)
            </p>
            <textarea
              id="input-insider-tip"
              required
              rows={2}
              value={insiderTip}
              onChange={(e) => setInsiderTip(e.target.value)}
              placeholder="e.g. Arrive right before 5 PM to get the hammocks with front-row view of the pastel sunset."
              className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden resize-none"
            />
          </div>

          {/* Exact Location & Directions */}
          <div>
            <label className="block text-xs font-semibold text-[#0E4B68] mb-1">
              Exact Location Description & Directions *
            </label>
            <textarea
              required
              rows={2}
              value={locationDetails}
              onChange={(e) => setLocationDetails(e.target.value)}
              placeholder="e.g. South West Bay next to the blue dive shop; ask any taxi driver for 'Playa Arenas'."
              className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden resize-none"
            />
          </div>

          {/* Operating Hours & General Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0E4B68] mb-1">
                Operating Hours
              </label>
              <input
                type="text"
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
                placeholder="e.g. Tue-Sun: 10:00 AM – 8:00 PM"
                className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0E4B68] mb-1">
                Brief Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Chilled beach shack with reggae music..."
                className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] outline-hidden"
              />
            </div>
          </div>

          {/* Choose Cover Photo */}
          <div>
            <label className="block text-xs font-semibold text-[#0E4B68] mb-1.5">
              Choose Cover Photo
            </label>
            <div className="grid grid-cols-4 gap-2">
              {PHOTO_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setSelectedPhoto(preset.url)}
                  className={`group relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedPhoto === preset.url
                      ? 'border-[#0E4B68] ring-2 ring-[#0E4B68]/30 scale-102'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 py-0.5 text-[9px] text-white text-center font-medium">
                    {preset.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-[#E7E2D6] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#1E293B] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0E4B68] hover:bg-[#09354A] active:scale-98 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-amber-300" />
              <span>Publish Spot to Directory</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
