import { useState, useEffect } from 'react';
import { X, Clock, MapPin, Star, Lightbulb, Send, MessageSquarePlus, ExternalLink, Navigation, Copy, Check } from 'lucide-react';
import { Spot, Review } from '../types';
import { getGoogleMapsUrl, getGoogleMapsDirectionsUrl } from '../utils/maps';

interface SpotDetailModalProps {
  spot: Spot | null;
  onClose: () => void;
  onShowOnMap: (spot: Spot) => void;
  onAddReview: (spotId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export function SpotDetailModal({
  spot,
  onClose,
  onShowOnMap,
  onAddReview,
}: SpotDetailModalProps) {
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hasCopiedGps, setHasCopiedGps] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!spot) return null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    onAddReview(spot.id, {
      author: newAuthor.trim(),
      rating: newRating,
      comment: newComment.trim(),
    });

    setNewAuthor('');
    setNewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-spot-title"
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E7E2D6] shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        {/* Header Hero Image */}
        <div className="relative h-60 sm:h-72 w-full bg-[#EFECE4] shrink-0">
          {!imageError ? (
            <img
              src={spot.imageUrl}
              alt={spot.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#E2DDD1] text-[#0E4B68]">
              <span className="font-semibold text-lg">{spot.name}</span>
            </div>
          )}

          {/* Gradient Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Spot Header Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-200 mb-1">
              <span>{spot.island}</span>
              <span aria-hidden="true">·</span>
              <span>{spot.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-white font-bold">{spot.priceTier}</span>
            </div>
            <h2 id="modal-spot-title" className="text-xl sm:text-2xl font-bold font-display drop-shadow-sm text-white">
              {spot.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-[#1E293B]">
          {/* Quick Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7E2D6]">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(spot.rating)
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-[#0E4B68]">{spot.rating.toFixed(1)}</span>
              <span className="text-xs text-[#738290]">({spot.reviews.length} reviews)</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Google Maps External Live GPS Button */}
              <a
                href={getGoogleMapsUrl(spot)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 rounded-xl shadow-2xs transition-all cursor-pointer"
                title="Open coordinates in Google Maps"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                <span>Google Maps</span>
              </a>

              {/* In-app Map button */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onShowOnMap(spot);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0E4B68] hover:bg-[#09354A] rounded-xl shadow-2xs transition-all cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>Island Map</span>
              </button>
            </div>
          </div>

          {/* Insider Tip Callout */}
          <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D6] space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Local Insider Recommendation</span>
            </div>
            <p className="text-sm font-medium text-[#0E4B68] leading-relaxed italic">
              "{spot.insiderTip}"
            </p>
          </div>

          {/* Overview Description */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-[#738290] uppercase tracking-wider">About This Spot</h3>
            <p className="text-sm leading-relaxed text-[#334155]">{spot.description}</p>
          </div>

          {/* Hours & Exact Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Operating Hours */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2D6] space-y-1.5">
              <div className="flex items-center gap-2 text-[#0E4B68]">
                <Clock className="w-4 h-4 text-[#0284C7]" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Operating Hours</h4>
              </div>
              <p className="text-xs text-[#475569] font-medium leading-relaxed">
                {spot.operatingHours}
              </p>
            </div>

            {/* Exact Location */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2D6] space-y-2">
              <div className="flex items-center justify-between text-[#0E4B68]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0284C7]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Exact Location & GPS</h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`${spot.coordinates[0]}, ${spot.coordinates[1]}`);
                    setHasCopiedGps(true);
                    setTimeout(() => setHasCopiedGps(false), 2000);
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium text-[#0E4B68] bg-[#EFECE4] hover:bg-[#E2DDD1] transition-colors cursor-pointer"
                  title="Copy exact GPS coordinates to clipboard"
                >
                  {hasCopiedGps ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#738290]" />
                      <span>{spot.coordinates[0].toFixed(5)}, {spot.coordinates[1].toFixed(5)}</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#475569] font-medium leading-relaxed">
                {spot.locationDetails}
              </p>
              <div className="pt-2 border-t border-[#E7E2D6]/60 flex flex-wrap items-center justify-between gap-2">
                <a
                  href={getGoogleMapsDirectionsUrl(spot)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Navigate in Google Maps</span>
                </a>
                <a
                  href={getGoogleMapsUrl(spot)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0284C7] hover:text-[#0E4B68] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open Pin ({spot.coordinates[0].toFixed(4)}, {spot.coordinates[1].toFixed(4)})</span>
                </a>
              </div>
            </div>
          </div>

          {/* User Reviews Section */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0E4B68] uppercase tracking-wider">
                User Reviews ({spot.reviews.length})
              </h3>
              <button
                type="button"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] hover:text-[#0E4B68] transition-colors cursor-pointer"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>{showReviewForm ? 'Cancel' : 'Write a Review'}</span>
              </button>
            </div>

            {/* Interactive Add Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleSubmitReview}
                className="p-4 rounded-2xl bg-[#EFECE4] border border-[#E2DDD1] space-y-3"
              >
                <h4 className="text-xs font-bold text-[#0E4B68]">Share your experience at {spot.name}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#54687A] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Maya Chen"
                      className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#CBD5E1] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#54687A] mb-1">
                      Rating
                    </label>
                    <div className="flex items-center gap-1.5 h-9">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                          aria-label={`${star} star`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= newRating
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-[#0E4B68] ml-2">{newRating}/5</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#54687A] mb-1">
                    Your Review & Helpful Advice
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Mention great food items, best time of day, or what to pack..."
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#CBD5E1] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-3 py-1.5 text-xs text-[#64748B] hover:text-[#1E293B] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0E4B68] hover:bg-[#09354A] rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Post Review</span>
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-3">
              {spot.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3.5 rounded-xl bg-white border border-[#E7E2D6] space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#0E4B68]">{rev.author}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s <= rev.rating
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#94A3B8]">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-7 bg-[#FAF8F5] border-t border-[#E7E2D6] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#54687A] hover:text-[#0E4B68] hover:bg-[#EFECE4] rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
