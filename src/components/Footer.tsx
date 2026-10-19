import React, { useState } from 'react';
import { ChefHat, Mail, Scale } from 'lucide-react';
import { useCookly } from '../context/CooklyContext';

export interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { subscribeNewsletter, unitSystem, toggleUnitSystem } = useCookly();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeNewsletter(emailInput)) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-[#171916] border-t border-[#F5F2E9]/10 mt-16 no-print text-[#B3B5AA]">
      {/* NEWSLETTER */}
      <div className="border-b border-[#F5F2E9]/10 py-10 bg-[#141613]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-editorial text-2xl text-[#F5F2E9]">
              The Cookly Weekly Digest
            </h3>
            <p className="text-xs text-[#82877B]">
              Hand-picked recipes, pairings, and cooking tips every Sunday.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <span className="text-xs font-semibold text-[#9EC69A] bg-[#20231F] px-4 py-2.5 rounded-xl border border-[#9EC69A]/30 block text-center">
                ✓ You're subscribed! Check your inbox this Sunday.
              </span>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-80">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/15 text-xs text-[#F5F2E9] placeholder-[#82877B] focus:outline-none focus:border-[#B8C58A]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#B8C58A] hover:bg-[#8EAA85] text-[#10110F] text-xs font-bold transition-all cursor-pointer touch-manipulation active:scale-95 shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* COMPACT LINKS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* COLUMN 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#E9DFC7] uppercase tracking-wider">
              Discover
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  All Recipes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('cuisines')}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  Cuisines
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('pantry-finder')}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  Pantry Match
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#E9DFC7] uppercase tracking-wider">
              Kitchen
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('meal-planner')}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  Meal Planner
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shopping-list')}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  Shopping List
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('cookbook')}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  Saved Cookbook
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('create-recipe')}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  Create Recipe
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#E9DFC7] uppercase tracking-wider">
              Membership
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-[#B8C58A] transition-colors font-medium text-[#F5F2E9] cursor-pointer touch-manipulation"
                >
                  Cookly Pro Plans
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  Family Pass
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile')}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  Profile & Settings
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#E9DFC7] uppercase tracking-wider">
              About
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('info', { section: 'about' })}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  About Cookly
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('info', { section: 'privacy' })}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  Privacy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('info', { section: 'terms' })}
                  className="hover:text-[#B8C58A] transition-colors cursor-pointer touch-manipulation"
                >
                  Terms
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* COMPACT BOTTOM BAR */}
      <div className="border-t border-[#F5F2E9]/10 py-5 bg-[#10110F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#82877B]">
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-[#B8C58A]" />
            <span>© {new Date().getFullYear()} Cookly. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleUnitSystem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171916] hover:bg-[#20231F] text-[#E9DFC7] border border-[#F5F2E9]/10 text-xs transition-colors cursor-pointer touch-manipulation active:scale-95"
            >
              <Scale className="w-3.5 h-3.5 text-[#B8C58A]" />
              <span>{unitSystem === 'metric' ? 'Metric' : 'Imperial'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
