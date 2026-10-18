import { useState, useEffect } from 'react';
import { X, Heart, Coffee, ShieldCheck, CheckCircle2, Sparkles, CreditCard } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonationSuccess: (donation: { name: string; amount: number; message: string }) => void;
}

const DONATION_PRESETS = [
  { amount: 3, label: 'Fresh Coconut', icon: '🥥', desc: 'Hydrate the field scouts' },
  { amount: 5, label: 'Cold Toña', icon: '🍺', desc: 'Buy the devs a cold beer' },
  { amount: 10, label: 'Reef Supporter', icon: '🐠', desc: 'Keep GPS maps verified' },
  { amount: 25, label: 'Island Patron', icon: '🌴', desc: 'Fund offline guide updates' },
];

export function DonationModal({ isOpen, onClose, onDonationSuccess }: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple_pay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

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

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setIsCompleted(false);
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount <= 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      onDonationSuccess({
        name: donorName.trim() || 'Anonymous Explorer',
        amount: currentAmount,
        message: donorMessage.trim() || 'Thank you for making Corn Island Insider!',
      });
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-modal-title"
        className="relative w-full max-w-lg bg-white rounded-3xl border border-[#E7E2D6] shadow-2xl overflow-hidden my-auto flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0E4B68] to-[#12587A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 text-amber-300 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-amber-300 text-amber-300" />
            </div>
            <div>
              <h2 id="donation-modal-title" className="text-lg sm:text-xl font-bold font-display text-white">
                Leave a Donation
              </h2>
              <p className="text-xs text-amber-200">
                Support directory maintenance & keep Corn Island Insider ad-free
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close donation modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isCompleted ? (
          /* Confirmation Success Screen */
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#0E4B68] font-display">
                Thank You for Supporting!
              </h3>
              <p className="text-xs text-[#54687A] max-w-sm mx-auto leading-relaxed">
                Your generous gift of <strong>${currentAmount}</strong> directly funds real island scouts, verified Google Maps GPS updates, and keeps this guide 100% free for travelers.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D6] text-xs text-[#475569] space-y-1 max-w-xs mx-auto">
              <span className="font-semibold text-[#0E4B68] block">Island Blessing</span>
              <p className="italic">"May calm waters follow you across Big and Little Corn Island!"</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0E4B68] hover:bg-[#09354A] rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Back to Guide
            </button>
          </div>
        ) : (
          /* Donation Form */
          <form onSubmit={handleDonate} className="p-5 sm:p-6 space-y-4 text-xs">
            {/* Amount Presets */}
            <div>
              <label className="block text-xs font-semibold text-[#0E4B68] mb-2">
                Choose a Contribution Tier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DONATION_PRESETS.map((preset) => {
                  const isSelected = !isCustom && selectedAmount === preset.amount;
                  return (
                    <button
                      key={preset.amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(preset.amount);
                        setIsCustom(false);
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                        isSelected
                          ? 'bg-[#0E4B68] text-white border-[#0E4B68] shadow-xs scale-102'
                          : 'bg-[#FAF8F5] text-[#334155] border-[#E7E2D6] hover:bg-[#EFECE4]'
                      }`}
                    >
                      <span className="text-xl">{preset.icon}</span>
                      <span className="font-bold text-sm leading-tight">${preset.amount}</span>
                      <span className={`text-[10px] font-medium leading-none ${isSelected ? 'text-amber-200' : 'text-[#738290]'}`}>
                        {preset.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Amount Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  isCustom
                    ? 'bg-[#0E4B68] text-white border-[#0E4B68]'
                    : 'bg-[#F8F6F0] text-[#54687A] border-[#E7E2D6] hover:bg-[#EFECE4]'
                }`}
              >
                Custom Amount
              </button>
              {isCustom && (
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#738290] font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    autoFocus
                    required
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter USD amount"
                    className="w-full pl-7 pr-3 py-1.5 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden font-bold text-[#0E4B68]"
                  />
                </div>
              )}
            </div>

            {/* Donor Name & Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0E4B68] mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Maya Chen"
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0E4B68] mb-1">
                  Short Note / Island Wish
                </label>
                <input
                  type="text"
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  placeholder="e.g. Love the snorkel spots!"
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden"
                />
              </div>
            </div>

            {/* Simulated Payment Method Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#0E4B68] mb-1.5">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-3 text-center text-xs font-semibold rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-[#0E4B68] text-white border-[#0E4B68]'
                      : 'bg-[#FAF8F5] text-[#54687A] border-[#E7E2D6] hover:bg-[#EFECE4]'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`py-2 px-3 text-center text-xs font-semibold rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-[#0E4B68] text-white border-[#0E4B68]'
                      : 'bg-[#FAF8F5] text-[#54687A] border-[#E7E2D6] hover:bg-[#EFECE4]'
                  }`}
                >
                  <span>Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2 px-3 text-center text-xs font-semibold rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'paypal'
                      ? 'bg-[#0E4B68] text-white border-[#0E4B68]'
                      : 'bg-[#FAF8F5] text-[#54687A] border-[#E7E2D6] hover:bg-[#EFECE4]'
                  }`}
                >
                  <span>PayPal</span>
                </button>
              </div>
            </div>

            {/* Transparency Note */}
            <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#E7E2D6] text-[11px] text-[#54687A] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                100% of donations go directly toward server costs, local island guides, and adding newly opened spots on Big & Little Corn.
              </span>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#E7E2D6] flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-[#0E4B68]">
                Total: ${currentAmount} USD
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#1E293B] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing || currentAmount <= 0}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0E4B68] hover:bg-[#09354A] active:scale-98 rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <Heart className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span>Leave ${currentAmount} Donation</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
