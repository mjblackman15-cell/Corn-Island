import { useState } from 'react';
import { Lightbulb, ThumbsUp, Plus, Compass, Smartphone, WifiOff, MapPin, ExternalLink, Heart } from 'lucide-react';
import { AppTip } from '../types';

interface AppTipsSectionProps {
  tips: AppTip[];
  onAddTipClick: () => void;
  onUpvoteTip: (tipId: string) => void;
  onOpenDonationClick: () => void;
}

export function AppTipsSection({ tips, onAddTipClick, onUpvoteTip, onOpenDonationClick }: AppTipsSectionProps) {
  const [selectedTipCategory, setSelectedTipCategory] = useState<string>('All');

  const categories = ['All', 'App Guide', 'Offline & GPS', 'Island Logistics', 'Local Customs'];

  const filteredTips = tips.filter((tip) => {
    if (selectedTipCategory === 'All') return true;
    return tip.category === selectedTipCategory;
  });

  return (
    <section className="bg-white rounded-3xl border border-[#E7E2D6] p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E2D6]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0E4B68] text-amber-300 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0E4B68] font-display">
              App & Island Travel Tips
            </h2>
            <p className="text-xs text-[#64748B]">
              Insider guidance for using Google Maps navigation, offline caching, and island logistics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={onOpenDonationClick}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Leave a Donation</span>
          </button>
          <button
            type="button"
            onClick={onAddTipClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#0E4B68] hover:bg-[#09354A] active:scale-98 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Add Tip</span>
          </button>
        </div>
      </div>

      {/* Two Highlight Cards: Google Maps GPS & App Donation Support */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Google Maps Highlight Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-[#F0FDF4] to-[#F8F6F0] border border-emerald-200/80 flex flex-col justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Google Maps GPS Navigation Enabled</span>
            </div>
            <p className="text-[#334155] leading-relaxed">
              Every spot in this directory has verified GPS coordinates. Tap the green <strong>"Google Maps"</strong> button on any card or detail popup to immediately launch turn-by-turn navigation or walking directions.
            </p>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
              Works in Google Maps App
            </span>
          </div>
        </div>

        {/* App Donation Support Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-[#FFF1F2] to-[#FAF8F5] border border-rose-200/80 flex flex-col justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-900">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Support Corn Island Insider</span>
            </div>
            <p className="text-[#334155] leading-relaxed">
              Enjoying the app? You can leave a small tip ($3 fresh coconut, $5 cold beer) to support hosting costs and keep this directory independent and free from ads!
            </p>
          </div>
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={onOpenDonationClick}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 hover:text-rose-900 underline cursor-pointer"
            >
              <span>Choose donation amount & leave a note &rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedTipCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedTipCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer border ${
                isActive
                  ? 'bg-[#0E4B68] text-white border-[#0E4B68]'
                  : 'bg-[#F8F6F0] text-[#54687A] border-[#E7E2D6] hover:bg-[#EFECE4]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D6] flex flex-col justify-between space-y-3 shadow-2xs hover:border-[#CBD5E1] transition-all"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#738290]">
                <span className="font-semibold text-[#0E4B68] text-[11px] uppercase tracking-wider">
                  {tip.category}
                </span>
                <span className="text-[11px]">{tip.date}</span>
              </div>
              <h3 className="text-sm font-bold text-[#0E4B68] font-display">
                {tip.title}
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                {tip.content}
              </p>
            </div>

            <div className="pt-2 border-t border-[#E7E2D6]/60 flex items-center justify-between text-xs text-[#738290]">
              <span className="text-[11px] italic">By {tip.author}</span>
              <button
                type="button"
                onClick={() => onUpvoteTip(tip.id)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#0E4B68] bg-white hover:bg-[#EFECE4] border border-[#E7E2D6] rounded-lg transition-colors cursor-pointer active:scale-95"
                title="Mark this tip as helpful"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
                <span>Helpful ({tip.votes})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
