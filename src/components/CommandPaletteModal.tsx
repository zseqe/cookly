import React, { useEffect, useState } from 'react';
import {
  Bookmark,
  Calendar,
  ChefHat,
  Compass,
  Crown,
  Layers,
  Search,
  ShoppingBag,
  Sparkles,
  Utensils,
  X
} from 'lucide-react';
import { useCookly } from '../context/CooklyContext';
import { Recipe } from '../types';

export interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onNavigate: (page: string, params?: any) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectRecipe,
  onNavigate
}) => {
  const { recipes } = useCookly();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingRecipes = q
    ? recipes.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.ingredients.some((i) => i.name.toLowerCase().includes(q))
      ).slice(0, 5)
    : recipes.slice(0, 4);

  const quickPages = [
    { label: 'Explore & Filters', page: 'explore', icon: Compass },
    { label: 'Pantry Match (Cook with what you have)', page: 'pantry-finder', icon: Sparkles },
    { label: 'Weekly Meal Planner', page: 'meal-planner', icon: Calendar },
    { label: 'Saved Cookbook', page: 'cookbook', icon: Bookmark },
    { label: 'Aisle Shopping List', page: 'shopping-list', icon: ShoppingBag },
    { label: 'Cookly Pro & Pricing', page: 'pricing', icon: Crown }
  ].filter((p) => !q || p.label.toLowerCase().includes(q));

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fadeIn no-print"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#171916] rounded-3xl border border-[#F5F2E9]/15 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* SEARCH INPUT */}
        <div className="p-4 border-b border-[#F5F2E9]/10 flex items-center gap-3 bg-[#141613]">
          <Search className="w-5 h-5 text-[#B8C58A] shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a recipe, ingredient (e.g. miso, garlic), or page..."
            className="flex-1 bg-transparent text-sm text-[#F5F2E9] placeholder-[#82877B] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#82877B] hover:text-[#F5F2E9] hover:bg-[#20231F] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* RESULTS SCROLLABLE */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1">
          {/* PAGES */}
          {quickPages.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#82877B] px-2">
                Quick Navigation
              </span>
              <div className="space-y-1">
                {quickPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <button
                      key={page.label}
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigate(page.page);
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-[#20231F]/50 hover:bg-[#282C26] text-left text-xs font-semibold text-[#F5F2E9] border border-[#F5F2E9]/5 hover:border-[#B8C58A]/30 transition-all touch-manipulation active:scale-[0.98] min-h-[44px]"
                    >
                      <Icon className="w-4 h-4 text-[#B8C58A] shrink-0" />
                      <span>{page.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* RECIPES */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#82877B] px-2">
              {q ? 'Matching Recipes' : 'Featured Recipes'}
            </span>
            <div className="space-y-2">
              {matchingRecipes.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectRecipe(r);
                  }}
                  className="w-full flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#20231F] hover:bg-[#282C26] border border-[#F5F2E9]/10 text-left transition-all touch-manipulation active:scale-[0.98] min-h-[48px]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={r.heroImage}
                      alt={r.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#F5F2E9]">{r.name}</h4>
                      <p className="text-[10px] text-[#82877B]">
                        {r.cuisine} • {r.prepTimeMinutes + r.cookTimeMinutes} mins • {r.difficulty}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#B8C58A] font-semibold">View →</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER HINT */}
        <div className="px-4 py-2.5 bg-[#141613] border-t border-[#F5F2E9]/10 text-[11px] text-[#82877B] flex items-center justify-between">
          <span>Press ESC to close</span>
          <span>Tip: Press ⌘K anywhere to search</span>
        </div>
      </div>
    </div>
  );
};
