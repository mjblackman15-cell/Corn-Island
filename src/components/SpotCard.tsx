import { useState } from 'react';
import { MapPin, Star, Compass, ArrowRight, Lightbulb, ExternalLink } from 'lucide-react';
import { Spot } from '../types';
import { getGoogleMapsUrl } from '../utils/maps';

interface SpotCardProps {
  spot: Spot;
  onCardClick: (spot: Spot) => void;
  onShowOnMap: (spot: Spot) => void;
}

export function SpotCard({ spot, onCardClick, onShowOnMap }: SpotCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      onClick={() => onCardClick(spot)}
      className="group relative bg-white rounded-2xl border border-[#E7E2D6] overflow-hidden shadow-2xs hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      {/* Visual Asset Container */}
      <div className="relative aspect-4/3 w-full bg-[#EFECE4] overflow-hidden">
        {!imageError ? (
          <img
            src={spot.imageUrl}
            alt={spot.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#E2DDD1] to-[#D5CEBF] text-[#0E4B68]">
            <Compass className="w-8 h-8 mb-2 opacity-60" />
            <span className="text-xs font-semibold text-center">{spot.name}</span>
          </div>
        )}

        {/* Floating subtle overlay info */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-[#0E4B68] shadow-2xs">
          {spot.island}
        </div>

        {/* Price Tier Tag */}
        <div className="absolute top-3 right-3 bg-[#0E4B68]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300 shadow-2xs">
          {spot.priceTier}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3.5">
        <div>
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs text-[#738290] mb-1.5 font-medium">
            <span className="text-[#0E4B68] font-semibold">{spot.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-amber-700 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{spot.rating.toFixed(1)}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{spot.reviewsCount} reviews</span>
          </div>

          {/* Spot Name */}
          <h3 className="text-base sm:text-lg font-bold text-[#0E4B68] font-display group-hover:text-[#0284C7] transition-colors leading-snug">
            {spot.name}
          </h3>

          {/* 1-Sentence Insider Tip (Prominent tropical tip callout) */}
          <div className="mt-2.5 p-3 rounded-xl bg-[#F8F6F0] border border-[#E7E2D6] text-xs text-[#334155] leading-relaxed">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="font-normal italic">
                <span className="font-semibold not-italic text-[#0E4B68] mr-1">Insider Tip:</span>
                "{spot.insiderTip}"
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-2.5 border-t border-[#E7E2D6]/70 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {/* Functional "Show on Map" button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShowOnMap(spot);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#0E4B68] bg-[#EFECE4] hover:bg-[#E2DDD1] active:scale-95 rounded-lg transition-all cursor-pointer whitespace-nowrap"
              title="View on island interactive map"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Map</span>
            </button>

            {/* Direct Google Maps Navigation link */}
            <a
              href={getGoogleMapsUrl(spot)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#1E293B] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/70 active:scale-95 rounded-lg transition-all cursor-pointer whitespace-nowrap"
              title="Open real coordinates in Google Maps"
            >
              <ExternalLink className="w-3 h-3 text-emerald-600" />
              <span>Google Maps</span>
            </a>
          </div>

          {/* View Details link */}
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#54687A] group-hover:text-[#0E4B68] transition-colors ml-auto">
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
}
