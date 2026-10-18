import { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryFilter } from './components/CategoryFilter';
import { SpotCard } from './components/SpotCard';
import { SpotDetailModal } from './components/SpotDetailModal';
import { SubmitSpotModal } from './components/SubmitSpotModal';
import { SubmitTipModal } from './components/SubmitTipModal';
import { DonationModal } from './components/DonationModal';
import { AppTipsSection } from './components/AppTipsSection';
import { InteractiveMap } from './components/InteractiveMap';
import { INITIAL_SPOTS } from './data/initialSpots';
import { INITIAL_APP_TIPS } from './data/initialTips';
import { Spot, Category, Island, Review, AppTip } from './types';
import {
  List,
  Map as MapIcon,
  Plus,
  Compass,
  CheckCircle2,
  Sparkles,
  Waves,
  Sun,
  ShieldCheck,
  Lightbulb,
  ExternalLink,
  Navigation,
  Heart,
} from 'lucide-react';

const STORAGE_KEY = 'corn_island_insider_spots_v7';
const TIPS_STORAGE_KEY = 'corn_island_insider_tips_v1';

export default function App() {
  // Load spots from localStorage or initial data, ensuring updated canonical GPS coordinates
  const [spots, setSpots] = useState<Spot[]>(() => {
    try {
      const saved =
        localStorage.getItem('corn_island_insider_spots_v7') ||
        localStorage.getItem('corn_island_insider_spots_v6') ||
        localStorage.getItem('corn_island_insider_spots_v5') ||
        localStorage.getItem('corn_island_insider_spots_v4') ||
        localStorage.getItem('corn_island_insider_spots_v3') ||
        localStorage.getItem('corn_island_insider_spots_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const canonicalMap = new Map(INITIAL_SPOTS.map((s) => [s.id, s]));
          // Always ensure standard spot coordinates and data are synced with canonical latest
          const updatedInitial = INITIAL_SPOTS.map((initSpot) => {
            const existing = parsed.find((p: Spot) => p.id === initSpot.id);
            if (existing) {
              return {
                ...initSpot,
                // keep any newly posted user reviews or ratings
                reviews: existing.reviews || initSpot.reviews,
                reviewsCount: (existing.reviews || initSpot.reviews).length,
                rating: existing.rating || initSpot.rating,
              };
            }
            return initSpot;
          });

          // Add any custom spots created by user via "Submit a Spot"
          const userSubmittedSpots = parsed.filter((p: Spot) => !canonicalMap.has(p.id));
          return [...updatedInitial, ...userSubmittedSpots];
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_SPOTS;
  });

  // Load tips from localStorage or initial data
  const [tips, setTips] = useState<AppTip[]>(() => {
    try {
      const saved = localStorage.getItem(TIPS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_APP_TIPS;
  });

  // Filters & View State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedIsland, setSelectedIsland] = useState<Island>('All');
  const [viewMode, setViewMode] = useState<'list' | 'map' | 'tips'>('list');

  // Modals & Active Spot
  const [activeModalSpot, setActiveModalSpot] = useState<Spot | null>(null);
  const [selectedMapSpotId, setSelectedMapSpotId] = useState<string | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitTipModalOpen, setIsSubmitTipModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync spots with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(spots));
    } catch {
      // Ignore quota errors
    }
  }, [spots]);

  // Sync tips with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(TIPS_STORAGE_KEY, JSON.stringify(tips));
    } catch {
      // Ignore quota errors
    }
  }, [tips]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Filter spots
  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      if (selectedCategory !== 'All' && spot.category !== selectedCategory) {
        return false;
      }
      if (selectedIsland !== 'All' && spot.island !== selectedIsland) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inName = spot.name.toLowerCase().includes(query);
        const inTip = spot.insiderTip.toLowerCase().includes(query);
        const inDesc = spot.description.toLowerCase().includes(query);
        const inLoc = spot.locationDetails.toLowerCase().includes(query);
        if (!inName && !inTip && !inDesc && !inLoc) {
          return false;
        }
      }
      return true;
    });
  }, [spots, selectedCategory, selectedIsland, searchQuery]);

  // Handler: "Show on Map"
  const handleShowOnMap = (spot: Spot) => {
    setSelectedMapSpotId(spot.id);
    setViewMode('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Spot Submission
  const handleSubmitSpot = (newSpot: Spot) => {
    setSpots((prev) => [newSpot, ...prev]);
    setToastMessage(`"${newSpot.name}" has been published to the Corn Island directory!`);
    setSelectedMapSpotId(newSpot.id);
  };

  // Handler: Tip Submission
  const handleAddTip = (newTip: AppTip) => {
    setTips((prev) => [newTip, ...prev]);
    setToastMessage(`Tip "${newTip.title}" published! Thank you for helping travelers.`);
    setViewMode('tips');
  };

  // Handler: Tip Upvote
  const handleUpvoteTip = (tipId: string) => {
    setTips((prev) =>
      prev.map((t) => (t.id === tipId ? { ...t, votes: t.votes + 1 } : t))
    );
    setToastMessage('Thank you for voting on this tip!');
  };

  // Handler: Add Review
  const handleAddReview = (spotId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };

    setSpots((prev) =>
      prev.map((s) => {
        if (s.id !== spotId) return s;
        const updatedReviews = [newReview, ...s.reviews];
        const avgRating =
          updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
        return {
          ...s,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: Number(avgRating.toFixed(1)),
        };
      })
    );

    setActiveModalSpot((prev) => {
      if (!prev || prev.id !== spotId) return prev;
      const updatedReviews = [newReview, ...prev.reviews];
      const avgRating =
        updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
      return {
        ...prev,
        reviews: updatedReviews,
        reviewsCount: updatedReviews.length,
        rating: Number(avgRating.toFixed(1)),
      };
    });

    setToastMessage('Review submitted! Thank you for helping fellow travelers.');
  };

  // Handler: Donation Success
  const handleDonationSuccess = (donation: { name: string; amount: number; message: string }) => {
    setToastMessage(`❤️ Thank you, ${donation.name}! Your $${donation.amount} donation was received. Safe travels!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F0] text-[#1E293B]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-4 left-4 sm:left-auto z-50 flex items-center gap-2.5 px-4 py-3 bg-[#0E4B68] text-white rounded-2xl shadow-xl border border-amber-300/30 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onSubmitSpotClick={() => setIsSubmitModalOpen(true)}
        onOpenTipsClick={() => setViewMode('tips')}
        onOpenDonationClick={() => setIsDonationModalOpen(true)}
      />

      {/* Hero Welcome / Tropical Lifestyle Header */}
      <section className="bg-gradient-to-b from-[#EFECE4] to-[#F8F6F0] border-b border-[#E7E2D6] px-4 sm:px-8 pt-8 pb-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 bg-[#E8DFD1]/70 px-3 py-1 rounded-full mb-2">
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span>Caribbean Nicaragua · Local Curated Guide</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0E4B68] tracking-tight font-display text-balance">
                Corn Island Insider
              </h1>
              <p className="text-sm sm:text-base text-[#54687A] mt-1 max-w-2xl leading-relaxed">
                Untouched coral reefs, authentic seafood shacks, and island hideaways across Big & Little Corn Island with live Google Maps GPS connectivity.
              </p>
            </div>

            {/* Quick stats unboxed */}
            <div className="flex items-center gap-4 text-xs text-[#738290] font-medium shrink-0">
              <div className="flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-[#0284C7]" />
                <span>2 Islands</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{spots.length} Verified Spots</span>
              </div>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setViewMode('tips')}
                className="flex items-center gap-1.5 hover:text-[#0E4B68] transition-colors cursor-pointer"
              >
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>{tips.length} App Tips</span>
              </button>
            </div>
          </div>

          {/* Interactive Search Bar & Filter Tabs */}
          <div className="pt-2">
            <CategoryFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedIsland={selectedIsland}
              onSelectIsland={setSelectedIsland}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
              totalSpotsCount={filteredSpots.length}
            />
          </div>
        </div>
      </section>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        {viewMode === 'tips' ? (
          /* Dedicated App & Island Tips Guide View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E4B68] hover:text-[#0284C7] cursor-pointer"
              >
                <List className="w-4 h-4" />
                <span>Back to Spots Directory</span>
              </button>
              <button
                type="button"
                onClick={() => setIsSubmitTipModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#0E4B68] hover:bg-[#09354A] rounded-xl transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-amber-300" />
                <span>Share a Tip</span>
              </button>
            </div>

            <AppTipsSection
              tips={tips}
              onAddTipClick={() => setIsSubmitTipModalOpen(true)}
              onUpvoteTip={handleUpvoteTip}
              onOpenDonationClick={() => setIsDonationModalOpen(true)}
            />
          </div>
        ) : viewMode === 'map' ? (
          /* Interactive Map View */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#0E4B68] font-display">
                  Interactive Island Map
                </h2>
                <p className="text-xs text-[#64748B]">
                  Click any pin to preview coordinates, or tap 'Google Maps' to launch turn-by-turn directions.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode('tips')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#54687A] hover:text-[#0E4B68] cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>App Tips</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E4B68] hover:text-[#0284C7] cursor-pointer"
                >
                  <List className="w-4 h-4" />
                  <span>Card Feed</span>
                </button>
              </div>
            </div>

            {/* The Leaflet Map Component */}
            <InteractiveMap
              spots={filteredSpots}
              selectedSpotId={selectedMapSpotId}
              onSelectSpot={(spot) => setActiveModalSpot(spot)}
            />

            {/* Spot Quick Tray below map */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#738290] uppercase tracking-wider">
                Locations in this view ({filteredSpots.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {filteredSpots.map((spot) => (
                  <div
                    key={spot.id}
                    onClick={() => {
                      setSelectedMapSpotId(spot.id);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      selectedMapSpotId === spot.id
                        ? 'bg-white border-[#0E4B68] shadow-sm ring-2 ring-[#0E4B68]/10'
                        : 'bg-white/80 border-[#E7E2D6] hover:bg-white'
                    }`}
                  >
                    <img
                      src={spot.imageUrl}
                      alt={spot.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 bg-[#E2DDD1]"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-[#0E4B68] truncate">
                        {spot.name}
                      </h4>
                      <p className="text-[11px] text-[#738290] truncate">
                        {spot.island} · {spot.priceTier}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Cards Grid Feed View */
          <div className="space-y-6">
            {/* Google Maps Real Spot GPS Callout Banner */}
            <div className="p-4 rounded-2xl bg-[#EAF5F0] border border-emerald-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start sm:items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Navigation className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-emerald-950 block">
                    Google Maps Real GPS Spot Navigation
                  </span>
                  <p className="text-emerald-900/80 text-[11px] leading-relaxed">
                    Every spot card below includes a direct green <strong>"Google Maps"</strong> button with real GPS coordinates. Tap it to open walking or taxi navigation directly in your phone's maps app!
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('tips')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shrink-0 self-start sm:self-center cursor-pointer"
              >
                <Lightbulb className="w-3 h-3 text-amber-300" />
                <span>Tips for App Use</span>
              </button>
            </div>

            {filteredSpots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {filteredSpots.map((spot) => (
                  <SpotCard
                    key={spot.id}
                    spot={spot}
                    onCardClick={(s) => setActiveModalSpot(s)}
                    onShowOnMap={handleShowOnMap}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search State */
              <div className="py-16 text-center max-w-md mx-auto space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#EFECE4] text-[#738290] flex items-center justify-center">
                  <Compass className="w-7 h-7 text-[#0E4B68]" />
                </div>
                <h3 className="text-lg font-bold text-[#0E4B68] font-display">
                  No spots found
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  We couldn't find any spots matching your current filters or search term. Try resetting your search or submit a new hidden gem!
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedIsland('All');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-[#0E4B68] bg-[#EFECE4] hover:bg-[#E2DDD1] rounded-xl transition-colors cursor-pointer"
                  >
                    Reset all filters
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#0E4B68] hover:bg-[#09354A] rounded-xl transition-colors cursor-pointer"
                  >
                    Submit this spot
                  </button>
                </div>
              </div>
            )}

            {/* Quick Tips Teaser Strip in Card View */}
            <div className="mt-8 p-5 bg-[#FAF8F5] rounded-3xl border border-[#E7E2D6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0E4B68]">
                    Need tips for using the app or island transit?
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Read community advice on offline caching, fixed taxi rates, and ATM guides.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsSubmitTipModalOpen(true)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#0E4B68] bg-[#EFECE4] hover:bg-[#E2DDD1] rounded-xl transition-colors cursor-pointer"
                >
                  + Add App Tip
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('tips')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0E4B68] hover:bg-[#09354A] rounded-xl transition-colors cursor-pointer"
                >
                  Browse All Tips
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Quick Bar for Mobile (Thumb Zone Ergonomics) */}
      <div className="sm:hidden fixed bottom-4 inset-x-4 z-40 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto bg-[#0E4B68]/95 backdrop-blur-md text-white px-3 py-2 rounded-2xl shadow-xl border border-white/20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
            className="flex items-center gap-1 text-[11px] font-semibold py-1 px-2 rounded-lg active:bg-white/10"
          >
            {viewMode === 'list' ? (
              <>
                <MapIcon className="w-3.5 h-3.5 text-amber-300" />
                <span>Map</span>
              </>
            ) : (
              <>
                <List className="w-3.5 h-3.5 text-amber-300" />
                <span>List</span>
              </>
            )}
          </button>
          <div className="w-px h-4 bg-white/20" />
          <button
            type="button"
            onClick={() => setViewMode('tips')}
            className={`flex items-center gap-1 text-[11px] font-semibold py-1 px-2 rounded-lg active:bg-white/10 ${
              viewMode === 'tips' ? 'bg-white/20 text-amber-300' : ''
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
            <span>Tips</span>
          </button>
          <div className="w-px h-4 bg-white/20" />
          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 py-1 px-2 rounded-lg active:bg-white/10"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Spot</span>
          </button>
          <div className="w-px h-4 bg-white/20" />
          <button
            type="button"
            onClick={() => setIsDonationModalOpen(true)}
            className="flex items-center gap-1 text-[11px] font-semibold text-rose-300 py-1 px-2 rounded-lg active:bg-white/10"
            title="Leave a small tip for the guide"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-300" />
            <span>Donate</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E7E2D6] bg-[#EFECE4] py-8 px-4 sm:px-8 text-xs text-[#738290]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0E4B68] font-display">Corn Island Insider</span>
            <span>·</span>
            <span>Islas del Maíz, Nicaragua</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px]">
            <button
              type="button"
              onClick={() => setIsDonationModalOpen(true)}
              className="hover:text-rose-700 font-semibold text-rose-700 flex items-center gap-1 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Leave a Donation</span>
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setIsSubmitTipModalOpen(true)}
              className="hover:text-[#0E4B68] font-medium cursor-pointer"
            >
              + Submit an App Tip
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(TIPS_STORAGE_KEY);
                setSpots(INITIAL_SPOTS);
                setTips(INITIAL_APP_TIPS);
                setToastMessage('Directory and tips restored to default curated items.');
              }}
              className="hover:text-[#0E4B68] underline cursor-pointer"
            >
              Reset to default directory
            </button>
          </div>
        </div>
      </footer>

      {/* Spot Detail Modal */}
      <SpotDetailModal
        spot={activeModalSpot}
        onClose={() => setActiveModalSpot(null)}
        onShowOnMap={handleShowOnMap}
        onAddReview={handleAddReview}
      />

      {/* Submit a Spot Modal */}
      <SubmitSpotModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitSpot={handleSubmitSpot}
      />

      {/* Submit an App Tip Modal */}
      <SubmitTipModal
        isOpen={isSubmitTipModalOpen}
        onClose={() => setIsSubmitTipModalOpen(false)}
        onSubmitTip={handleAddTip}
      />

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onDonationSuccess={handleDonationSuccess}
      />
    </div>
  );
}
