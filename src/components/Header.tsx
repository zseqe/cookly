import React, { useState } from 'react';
import {
  Bookmark,
  ChefHat,
  Crown,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X
} from 'lucide-react';
import { useCookly } from '../context/CooklyContext';

export interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenAiChef: () => void;
  onOpenCommandPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenAiChef,
  onOpenCommandPalette
}) => {
  const { savedRecipeIds, shoppingList, profile, subscription } = useCookly();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPro = subscription.tier === 'pro' || subscription.tier === 'family';

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Explore', page: 'explore' },
    { label: 'Planner', page: 'meal-planner' },
    { label: 'Cookbook', page: 'cookbook' },
    { label: 'Pricing', page: 'pricing' }
  ];

  const handleNav = (page: string) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#10110F]/95 backdrop-blur-xl border-b border-[#F5F2E9]/10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* LOGO */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer touch-manipulation active:scale-95 transition-transform focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#20231F] border border-[#B8C58A]/30 flex items-center justify-center group-hover:border-[#B8C58A] transition-colors shadow-md">
            <ChefHat className="w-5 h-5 text-[#B8C58A]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-editorial text-2xl tracking-tight text-[#F5F2E9]">
              Cookly
            </span>
            {isPro && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#B8C58A]/25 border border-[#B8C58A]/40 text-[9px] font-bold text-[#B8C58A] uppercase tracking-wider flex items-center gap-0.5">
                <Crown className="w-2.5 h-2.5" /> PRO
              </span>
            )}
          </div>
        </button>

        {/* DESKTOP / TABLET NAV (VISIBLE FROM MD 768px UP) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#171916] p-1.5 rounded-full border border-[#F5F2E9]/10 shadow-inner">
          {navItems.map((item) => {
            const active = currentPage === item.page;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item.page)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer touch-manipulation active:scale-95 min-h-[36px] ${
                  active
                    ? 'bg-[#282C26] text-[#B8C58A] shadow-sm border border-[#B8C58A]/25'
                    : 'text-[#B3B5AA] hover:text-[#F5F2E9] hover:bg-[#20231F]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* SEARCH BUTTON */}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              aria-label="Search recipes"
              title="Search recipes (Ctrl+K)"
              className="p-2.5 sm:px-3 sm:py-2 rounded-full bg-[#171916] hover:bg-[#20231F] text-[#B3B5AA] hover:text-[#F5F2E9] border border-[#F5F2E9]/10 transition-all cursor-pointer touch-manipulation active:scale-95 min-h-[40px] min-w-[40px] flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-[#B8C58A]" />
              <span className="hidden xl:inline text-xs text-[#82877B]">Search (Ctrl+K)</span>
            </button>
          )}

          {/* AI CHEF BUTTON */}
          <button
            type="button"
            onClick={onOpenAiChef}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#B8C58A]/15 hover:bg-[#B8C58A]/25 border border-[#B8C58A]/40 text-[#B8C58A] text-xs font-bold transition-all cursor-pointer touch-manipulation active:scale-95 min-h-[40px]"
            title="Ask AI Chef Pierre"
          >
            <Sparkles className="w-4 h-4 text-[#B8C58A] animate-pulse" />
            <span className="hidden sm:inline">AI Chef</span>
          </button>

          {/* SHOPPING LIST */}
          <button
            type="button"
            onClick={() => handleNav('shopping-list')}
            aria-label="Shopping List"
            title="Shopping List"
            className="relative p-2.5 rounded-full bg-[#171916] hover:bg-[#20231F] text-[#B3B5AA] hover:text-[#F5F2E9] border border-[#F5F2E9]/10 transition-all cursor-pointer touch-manipulation active:scale-95 min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4" />
            {shoppingList.filter((i) => !i.checked).length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#B8C58A] text-[#10110F] text-[10px] font-bold flex items-center justify-center shadow-md">
                {shoppingList.filter((i) => !i.checked).length}
              </span>
            )}
          </button>

          {/* COOKBOOK */}
          <button
            type="button"
            onClick={() => handleNav('cookbook')}
            aria-label="Saved Cookbook"
            title="Saved Cookbook"
            className="relative p-2.5 rounded-full bg-[#171916] hover:bg-[#20231F] text-[#B3B5AA] hover:text-[#F5F2E9] border border-[#F5F2E9]/10 transition-all cursor-pointer touch-manipulation active:scale-95 min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <Bookmark className="w-4 h-4" />
            {savedRecipeIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#8EAA85] text-[#10110F] text-[10px] font-bold flex items-center justify-center shadow-md">
                {savedRecipeIds.length}
              </span>
            )}
          </button>

          {/* PROFILE */}
          <button
            type="button"
            onClick={() => handleNav('profile')}
            aria-label="User Profile"
            title="Profile & Settings"
            className="p-2 sm:px-3 sm:py-2 rounded-full bg-[#20231F] hover:bg-[#282C26] border border-[#F5F2E9]/15 text-xs font-semibold text-[#E9DFC7] flex items-center gap-2 transition-all cursor-pointer touch-manipulation active:scale-95 min-h-[40px]"
          >
            <span className="w-6 h-6 rounded-full bg-[#B8C58A]/20 text-[#B8C58A] flex items-center justify-center text-xs">
              {profile?.avatar || <User className="w-3.5 h-3.5" />}
            </span>
            <span className="hidden md:inline">{profile?.displayName || 'Profile'}</span>
          </button>

          {/* MOBILE MENU TOGGLE (SHOWN ONLY ON SCREENS < 768px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden p-2.5 rounded-xl bg-[#20231F] hover:bg-[#282C26] text-[#F5F2E9] border border-[#F5F2E9]/15 cursor-pointer touch-manipulation active:scale-95 min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDED MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#171916] border-b border-[#F5F2E9]/15 px-4 py-4 space-y-2 animate-fadeIn shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNav(item.page)}
              className={`w-full py-3 px-4 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer touch-manipulation active:scale-95 min-h-[44px] flex items-center justify-between ${
                currentPage === item.page
                  ? 'bg-[#282C26] text-[#B8C58A] border border-[#B8C58A]/30'
                  : 'bg-[#20231F] text-[#F5F2E9] hover:bg-[#282C26]'
              }`}
            >
              <span>{item.label}</span>
              {currentPage === item.page && <span className="w-2 h-2 rounded-full bg-[#B8C58A]" />}
            </button>
          ))}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full py-3 px-4 rounded-xl text-left text-sm font-semibold bg-[#20231F] text-[#B3B5AA] hover:text-[#F5F2E9] flex items-center gap-2 cursor-pointer touch-manipulation min-h-[44px]"
            >
              <Search className="w-4 h-4 text-[#B8C58A]" />
              <span>Search All Recipes...</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
