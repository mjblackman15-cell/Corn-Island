import { useState, useEffect } from 'react';
import { X, Send, Lightbulb, Smartphone, ShieldCheck } from 'lucide-react';
import { AppTip } from '../types';

interface SubmitTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTip: (newTip: AppTip) => void;
}

export function SubmitTipModal({ isOpen, onClose, onSubmitTip }: SubmitTipModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AppTip['category']>('App Guide');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

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
    if (!title.trim() || !content.trim()) return;

    const newTip: AppTip = {
      id: `tip-user-${Date.now()}`,
      title: title.trim(),
      category,
      content: content.trim(),
      author: author.trim() || 'Fellow Explorer',
      date: 'Just now',
      votes: 1,
    };

    onSubmitTip(newTip);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-tip-title"
        className="relative w-full max-w-lg bg-white rounded-3xl border border-[#E7E2D6] shadow-2xl overflow-hidden my-auto flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0E4B68] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h2 id="submit-tip-title" className="text-lg sm:text-xl font-bold font-display text-white">
                Add an App & Travel Tip
              </h2>
              <p className="text-xs text-amber-200">
                Help other travelers navigate the islands and get the most out of the app
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          {/* Tip Title */}
          <div>
            <label className="block text-xs font-semibold text-[#0E4B68] mb-1">
              Tip Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Pre-cache Google Maps offline before Little Corn"
              className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-[#0E4B68] mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as AppTip['category'])}
              className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden cursor-pointer"
            >
              <option value="App Guide">App Guide (Navigation & Maps)</option>
              <option value="Offline & GPS">Offline & GPS Advice</option>
              <option value="Island Logistics">Island Logistics & Transport</option>
              <option value="Local Customs">Local Customs & Money</option>
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-[#0E4B68] mb-1">
              Tip Advice / Instructions *
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Explain how to use the feature or what to watch out for on the island..."
              className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] focus:ring-2 focus:ring-[#0E4B68]/15 outline-hidden resize-none"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-xs font-semibold text-[#0E4B68] mb-1">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Sofia M. or Local Guide"
              className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#CBD5E1] focus:border-[#0E4B68] outline-hidden"
            />
          </div>

          {/* Quick Guidance Box */}
          <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#E7E2D6] text-[11px] text-[#54687A] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Your tip will appear in the Community Tips tab and help travelers make the most of Google Maps navigation and island transit.
            </span>
          </div>

          {/* Actions */}
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
              <span>Publish Tip</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
