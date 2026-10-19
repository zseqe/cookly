import React from 'react';
import { Bookmark, Calendar, Compass, Home, Sparkles } from 'lucide-react';
import { useCookly } from '../context/CooklyContext';

export interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenAiChef: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenAiChef
}) => {
  const { savedRecipeIds } = useCookly();

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 xl:hidden bg-[#10110F]/95 backdrop-blur-2xl border-t border-[#F5F2E9]/10 no-print pb-[env(safe-area-inset-bottom,0px)] shadow-2xl">
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-2">
        {/* HOME */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full touch-manipulation active:scale-90 transition-transform ${
            currentPage === 'home' ? 'text-[#B8C58A]' : 'text-[#82877B] hover:text-[#F5F2E9]'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-tight">Home</span>
        </button>

        {/* EXPLORE */}
        <button
          type="button"
          onClick={() => onNavigate('explore')}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full touch-manipulation active:scale-90 transition-transform ${
            currentPage === 'explore' || currentPage === 'cuisines' || currentPage === 'collections'
              ? 'text-[#B8C58A]'
              : 'text-[#82877B] hover:text-[#F5F2E9]'
          }`}
          aria-label="Explore"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-tight">Explore</span>
        </button>

        {/* AI CHEF (CENTER HIGHLIGHTED GLOW BUTTON) */}
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={onOpenAiChef}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#B8C58A] via-[#8EAA85] to-[#E9DFC7] text-[#10110F] shadow-lg shadow-[#B8C58A]/30 flex items-center justify-center touch-manipulation active:scale-90 transition-transform border border-[#F5F2E9]/20"
            aria-label="AI Chef Assistant"
            title="Ask AI Chef"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </button>
        </div>

        {/* MEAL PLANNER */}
        <button
          type="button"
          onClick={() => onNavigate('meal-planner')}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full touch-manipulation active:scale-90 transition-transform ${
            currentPage === 'meal-planner' ? 'text-[#B8C58A]' : 'text-[#82877B] hover:text-[#F5F2E9]'
          }`}
          aria-label="Meal Planner"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-tight">Planner</span>
        </button>

        {/* COOKBOOK */}
        <button
          type="button"
          onClick={() => onNavigate('cookbook')}
          className={`relative flex flex-col items-center justify-center gap-1 w-full h-full touch-manipulation active:scale-90 transition-transform ${
            currentPage === 'cookbook' || currentPage === 'profile'
              ? 'text-[#B8C58A]'
              : 'text-[#82877B] hover:text-[#F5F2E9]'
          }`}
          aria-label="My Cookbook"
        >
          <div className="relative">
            <Bookmark className="w-5 h-5" />
            {savedRecipeIds.length > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#B8C58A] text-[#10110F] text-[9px] font-bold flex items-center justify-center">
                {savedRecipeIds.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight">Cookbook</span>
        </button>
      </div>
    </div>
  );
};
