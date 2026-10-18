import { Compass, Plus, Lightbulb, Heart } from 'lucide-react';

interface NavbarProps {
  onSubmitSpotClick: () => void;
  onOpenTipsClick: () => void;
  onOpenDonationClick: () => void;
}

export function Navbar({ onSubmitSpotClick, onOpenTipsClick, onOpenDonationClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#E7E2D6] px-4 sm:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#0E4B68] text-amber-200 flex items-center justify-center shadow-xs">
            <Compass className="w-5 h-5 text-amber-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0E4B68] font-display whitespace-nowrap">
              Corn Island Insider
            </span>
            <span className="text-[11px] font-medium text-[#738290] tracking-wide -mt-0.5 hidden xs:inline">
              Big & Little Corn Island · Caribbean
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (single line, unboxed) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#54687A]">
          <button
            type="button"
            onClick={onOpenTipsClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E4B68] hover:text-[#0284C7] transition-colors cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>App & Travel Tips</span>
          </button>
          <button
            type="button"
            onClick={onOpenDonationClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900 transition-colors cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Leave a Donation</span>
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenDonationClick}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            title="Leave a small tip or donation for using the app"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span className="hidden xs:inline">Donate</span>
          </button>

          <button
            type="button"
            onClick={onSubmitSpotClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-[#0E4B68] hover:bg-[#09354A] active:scale-[0.98] rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Submit Spot</span>
          </button>
        </div>
      </div>
    </header>
  );
}
