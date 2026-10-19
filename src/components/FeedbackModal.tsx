import React, { useState } from 'react';
import { MessageSquare, Send, Star, X } from 'lucide-react';
import { useCookly } from '../context/CooklyContext';

export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const { submitFeedback } = useCookly();
  const [category, setCategory] = useState<'Question' | 'Bug' | 'Feature Request' | 'Recipe Suggestion'>('Feature Request');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    submitFeedback({
      category,
      email: email.trim() || 'anonymous@cookly.local',
      message: message.trim(),
      rating
    });
    setMessage('');
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn no-print"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#171916] rounded-3xl border border-[#F5F2E9]/15 shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#B8C58A]/15 border border-[#B8C58A]/30 flex items-center justify-center text-[#B8C58A]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F2E9]">Send Feedback & Ideas</h3>
              <p className="text-xs text-[#82877B]">Help us craft the ultimate culinary companion</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#82877B] hover:text-[#F5F2E9] hover:bg-[#20231F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CATEGORY BUTTONS */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#E9DFC7]">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Feature Request', 'Recipe Suggestion', 'Bug', 'Question'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all touch-manipulation active:scale-95 ${
                    category === cat
                      ? 'bg-[#B8C58A] text-[#10110F] shadow-md'
                      : 'bg-[#20231F] text-[#B3B5AA] hover:text-[#F5F2E9]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* RATING */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#E9DFC7]">Your Experience Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 touch-manipulation transition-transform active:scale-125"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-[#282C26]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#E9DFC7]">Email (Optional for replies)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full px-4 py-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/15 text-xs text-[#F5F2E9] placeholder-[#82877B] focus:outline-none focus:border-[#B8C58A]"
            />
          </div>

          {/* MESSAGE */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#E9DFC7]">Message & Description</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What recipe would you love to see? Or what feature could we improve?"
              className="w-full px-4 py-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/15 text-xs text-[#F5F2E9] placeholder-[#82877B] focus:outline-none focus:border-[#B8C58A]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-[#20231F] text-xs font-semibold text-[#B3B5AA] hover:text-[#F5F2E9] transition-colors touch-manipulation min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#B8C58A] hover:bg-[#8EAA85] text-[#10110F] text-xs font-bold transition-all touch-manipulation active:scale-95 shadow-md flex items-center gap-2 min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
