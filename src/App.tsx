import React, { useEffect, useMemo, useState } from 'react';
import {
  Bookmark,
  Calendar,
  Check,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Copy,
  Crown,
  Download,
  ExternalLink,
  Filter,
  Flame,
  FolderPlus,
  Globe,
  Heart,
  Home,
  Info,
  Layers,
  Menu,
  Minus,
  Pause,
  Play,
  Plus,
  Printer,
  RefreshCw,
  RotateCcw,
  Scale,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  Star,
  Thermometer,
  Trash2,
  Upload,
  User,
  Utensils,
  Wifi,
  WifiOff,
  X
} from 'lucide-react';
import { useCookly } from './context/CooklyContext';
import { CUISINES_META, EDITORIAL_COLLECTIONS } from './data/recipes';
import {
  DayOfWeek,
  DietaryTag,
  Difficulty,
  Ingredient,
  MealType,
  PlannerSlot,
  Recipe
} from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PricingPage } from './components/PricingPage';
import { AiChefDrawer } from './components/AiChefDrawer';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { FeedbackModal } from './components/FeedbackModal';
import { MacroTrackerWidget } from './components/MacroTrackerWidget';

type RouteState =
  | { page: 'home' }
  | { page: 'explore'; initialQuery?: string; initialMealType?: string; initialDietary?: DietaryTag }
  | { page: 'cuisines'; selectedCuisine?: string; selectedSubcategory?: string }
  | { page: 'collections'; selectedCollectionId?: string }
  | { page: 'recipe'; recipeId: string }
  | { page: 'cooking'; recipeId: string; servings: number }
  | { page: 'pantry-finder' }
  | { page: 'shopping-list' }
  | { page: 'meal-planner' }
  | { page: 'cookbook' }
  | { page: 'create-recipe' }
  | { page: 'profile' }
  | { page: 'pricing' }
  | { page: 'info'; section: 'about' | 'privacy' | 'terms' | 'pwa' | 'feedback' };

const COMMON_PANTRY_INGREDIENTS = [
  'Garlic',
  'Onion',
  'Tomatoes',
  'Butter',
  'Eggs',
  'Heavy cream',
  'Rice',
  'Pasta',
  'Chicken',
  'Paneer',
  'Tofu',
  'Mushrooms',
  'Spinach',
  'Coconut milk',
  'Soy sauce',
  'Olive oil',
  'Lemon',
  'Cheese',
  'Potatoes',
  'Chili'
];

const MEAL_TYPE_CATEGORIES: MealType[] = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Starters',
  'Main courses',
  'Snacks',
  'Desserts',
  'Beverages',
  'Soups',
  'Salads',
  'Rice dishes',
  'Pasta and noodles'
];

const DIETARY_TAGS: DietaryTag[] = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Egg-Free',
  'High-Protein'
];

const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const PLANNER_SLOTS: PlannerSlot[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

function formatScaledQuantity(qty: number | null, ratio: number): string {
  if (qty === null) return '';
  const raw = qty * ratio;
  const rounded = Math.round(raw * 4) / 4;
  if (rounded === 0) return '1/4';
  const whole = Math.floor(rounded);
  const rem = rounded - whole;
  let frac = '';
  if (Math.abs(rem - 0.25) < 0.05) frac = '¼';
  else if (Math.abs(rem - 0.5) < 0.05) frac = '½';
  else if (Math.abs(rem - 0.75) < 0.05) frac = '¾';
  return `${whole > 0 ? whole : ''}${whole > 0 && frac ? ' ' : ''}${frac}`.trim() || String(Number(raw.toFixed(1)));
}

const SafeRecipeImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => {
  const [failed, setFailed] = useState(false);
  const fallback =
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80';
  return (
    <img
      src={failed ? fallback : src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
};

export const App: React.FC = () => {
  const {
    recipes,
    savedRecipeIds,
    toggleSaveRecipe,
    collections,
    createCollection,
    deleteCollection,
    toggleRecipeInCollection,
    recipeNotes,
    saveRecipeNote,
    ingredientChecklists,
    toggleIngredientChecked,
    shoppingList,
    addShoppingItems,
    toggleShoppingItem,
    removeShoppingItem,
    clearCompletedShopping,
    clearAllShopping,
    mealPlan,
    addMealPlanEntry,
    removeMealPlanEntry,
    generateShoppingListFromWeek,
    profile,
    saveProfile,
    addCustomRecipe,
    deleteCustomRecipe,
    recentlyViewedIds,
    recordRecipeView,
    recentlyCookedIds,
    recordRecipeCooked,
    toasts,
    addToast,
    exportLocalData,
    importLocalData
  } = useCookly();

  const [route, setRoute] = useState<RouteState>({ page: 'home' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickTimeFilter, setQuickTimeFilter] = useState<number>(30);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [showSavePromptModal, setShowSavePromptModal] = useState(false);
  const [showConverterModal, setShowConverterModal] = useState(false);
  const [showAiChefDrawer, setShowAiChefDrawer] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [smartExportModalOpen, setSmartExportModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Explore & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(['Butter Chicken', 'Ramen', 'Risotto']);
  const [selectedCuisineFilter, setSelectedCuisineFilter] = useState<string>('All');
  const [selectedMealTypeFilter, setSelectedMealTypeFilter] = useState<string>('All');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>('All');
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState<DietaryTag[]>([]);
  const [maxTotalTimeFilter, setMaxTotalTimeFilter] = useState<number>(120);
  const [sortBy, setSortBy] = useState<'popular' | 'quickest' | 'prep' | 'alpha'>('popular');

  // Recipe Detail State
  const [customServings, setCustomServings] = useState<number>(4);
  const [noteDraft, setNoteDraft] = useState<string>('');

  // Cooking Mode State (Timestamp-accurate timer)
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [timerEndTime, setTimerEndTime] = useState<number | null>(null);
  const [timerPausedRemainingMs, setTimerPausedRemainingMs] = useState<number | null>(null);
  const [timerDisplaySeconds, setTimerDisplaySeconds] = useState<number>(0);
  const [wakeLockActive, setWakeLockActive] = useState(false);

  // Pantry Finder State
  const [selectedPantryItems, setSelectedPantryItems] = useState<string[]>([
    'Garlic',
    'Onion',
    'Tomatoes',
    'Butter'
  ]);
  const [pantryInput, setPantryInput] = useState('');
  const [pantryFilterMode, setPantryFilterMode] = useState<'best' | 'missing-few'>('best');

  // Meal Planner State
  const [activeWeekStart, setActiveWeekStart] = useState<'2026-10-19' | '2026-10-26'>('2026-10-19');
  const [mobileSelectedDay, setMobileSelectedDay] = useState<DayOfWeek>('Monday');
  const [pickerModalSlot, setPickerModalSlot] = useState<{
    day: DayOfWeek;
    slot: PlannerSlot;
  } | null>(null);

  // Utility Converter State
  const [celsiusInput, setCelsiusInput] = useState<string>('180');
  const [cupsInput, setCupsInput] = useState<string>('1');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [route]);

  // Accurate Timestamp Timer Loop
  useEffect(() => {
    if (!timerEndTime) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.round((timerEndTime - Date.now()) / 1000));
      setTimerDisplaySeconds(remaining);
      if (remaining <= 0) {
        setTimerEndTime(null);
        setTimerPausedRemainingMs(null);
        addToast('Timer complete! Ready for the next step.', 'success');
      }
    }, 250);
    return () => clearInterval(interval);
  }, [timerEndTime]);

  const navigateToRecipe = (recipe: Recipe) => {
    recordRecipeView(recipe.id);
    setCustomServings(recipe.servings);
    setNoteDraft(recipeNotes[recipe.id] || '');
    setRoute({ page: 'recipe', recipeId: recipe.id });
  };

  const startCookingMode = async (recipe: Recipe, servings: number) => {
    setActiveStepIdx(0);
    setTimerEndTime(null);
    setTimerPausedRemainingMs(null);
    setTimerDisplaySeconds(0);
    recordRecipeCooked(recipe.id);
    setRoute({ page: 'cooking', recipeId: recipe.id, servings });
    try {
      if ('wakeLock' in navigator) {
        await (navigator as unknown as { wakeLock: { request: (t: string) => Promise<void> } }).wakeLock.request('screen');
        setWakeLockActive(true);
      }
    } catch {
      setWakeLockActive(false);
    }
  };

  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((r) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = r.name.toLowerCase().includes(q);
          const matchCuisine = r.cuisine.toLowerCase().includes(q);
          const matchSub = r.subcategory.toLowerCase().includes(q);
          const matchDesc = r.shortDescription.toLowerCase().includes(q);
          const matchIng = r.ingredients.some((i) => i.name.toLowerCase().includes(q));
          const matchTag = r.dietaryTags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchCuisine && !matchSub && !matchDesc && !matchIng && !matchTag) {
            return false;
          }
        }
        if (selectedCuisineFilter !== 'All' && r.cuisine !== selectedCuisineFilter) return false;
        if (
          selectedMealTypeFilter !== 'All' &&
          !r.mealTypes.includes(selectedMealTypeFilter as MealType)
        ) {
          return false;
        }
        if (selectedDifficultyFilter !== 'All' && r.difficulty !== selectedDifficultyFilter) {
          return false;
        }
        if (
          selectedDietaryFilters.length > 0 &&
          !selectedDietaryFilters.every((tag) => r.dietaryTags.includes(tag))
        ) {
          return false;
        }
        if (r.prepTimeMinutes + r.cookTimeMinutes > maxTotalTimeFilter) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.rating - a.rating;
        if (sortBy === 'quickest') {
          return a.prepTimeMinutes + a.cookTimeMinutes - (b.prepTimeMinutes + b.cookTimeMinutes);
        }
        if (sortBy === 'prep') return a.prepTimeMinutes - b.prepTimeMinutes;
        return a.name.localeCompare(b.name);
      });
  }, [
    recipes,
    searchQuery,
    selectedCuisineFilter,
    selectedMealTypeFilter,
    selectedDifficultyFilter,
    selectedDietaryFilters,
    maxTotalTimeFilter,
    sortBy
  ]);

  const renderRecipeCard = (recipe: Recipe, featured = false) => {
    const isSaved = savedRecipeIds.includes(recipe.id);
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    return (
      <div
        key={recipe.id}
        onClick={() => navigateToRecipe(recipe)}
        className={`group cursor-pointer rounded-2xl bg-[#20231F] border border-[#F5F2E9]/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#B8C58A]/40 flex flex-col ${
          featured ? 'md:col-span-2 md:flex-row' : ''
        }`}
      >
        <div
          className={`relative overflow-hidden bg-[#171916] ${
            featured ? 'md:w-1/2 h-64 md:h-auto' : 'h-56'
          }`}
        >
          <SafeRecipeImage
            src={recipe.heroImage}
            alt={recipe.name}
            className="w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/80 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#10110F]/85 text-[#E9DFC7] border border-[#F5F2E9]/10 backdrop-blur-md">
              {recipe.cuisine} · {recipe.subcategory}
            </span>
            {recipe.isUserCreated && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#B8C58A] text-[#10110F]">
                Personal Recipe
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label={isSaved ? 'Remove from cookbook' : 'Save to cookbook'}
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveRecipe(recipe.id, () => setShowSavePromptModal(true));
            }}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isSaved
                ? 'bg-[#B8C58A] text-[#10110F]'
                : 'bg-[#10110F]/75 text-[#F5F2E9] hover:bg-[#282C26]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#E9DFC7]">
            <span className="flex items-center gap-1 bg-[#10110F]/75 px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5 text-[#B8C58A]" /> {totalTime} min
            </span>
            <span className="flex items-center gap-1 bg-[#10110F]/75 px-2.5 py-1 rounded-md">
              <Star className="w-3.5 h-3.5 text-[#B8C58A] fill-current" /> {recipe.rating}
            </span>
          </div>
        </div>

        <div className={`p-5 flex-1 flex flex-col justify-between ${featured ? 'md:p-7' : ''}`}>
          <div>
            <div className="flex items-center gap-2 text-xs text-[#82877B] mb-2">
              <span>{recipe.difficulty}</span>
              <span>•</span>
              <span>{recipe.servings} servings</span>
              {recipe.dietaryTags[0] && (
                <>
                  <span>•</span>
                  <span className="text-[#8EAA85]">{recipe.dietaryTags[0]}</span>
                </>
              )}
            </div>
            <h3
              className={`font-editorial text-[#F5F2E9] group-hover:text-[#B8C58A] transition-colors ${
                featured ? 'text-2xl md:text-3xl mb-3' : 'text-xl mb-2 line-clamp-1'
              }`}
            >
              {recipe.name}
            </h3>
            <p className="text-sm text-[#B3B5AA] line-clamp-2 leading-relaxed">
              {recipe.shortDescription}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F5F2E9]/10 flex items-center justify-between text-xs text-[#B3B5AA]">
            <span>{recipe.ingredients.length} ingredients</span>
            <span className="inline-flex items-center gap-1 text-[#B8C58A] font-medium group-hover:translate-x-0.5 transition-transform">
              View Recipe <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#10110F] text-[#F5F2E9]">
      {/* GLOBAL SAAS HEADER */}
      {route.page !== 'cooking' && (
        <Header
          currentPage={route.page}
          onNavigate={(page) => setRoute({ page: page as any })}
          onOpenAiChef={() => setShowAiChefDrawer(true)}
          onOpenCommandPalette={() => setShowCommandPalette(true)}
        />
      )}

      {/* MAIN PAGE CONTENT */}
      <main className="flex-1">
        {/* ================= 1. HOMEPAGE ================= */}
        {route.page === 'home' && (
          <div className="space-y-16 pb-20">
            {/* Section A: Hero */}
            <section className="relative overflow-hidden border-b border-[#F5F2E9]/10 bg-[#171916]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6 z-10">
                  <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl text-[#F5F2E9] leading-[1.06] tracking-tight">
                    Find your next <span className="italic text-[#B8C58A]">favorite.</span>
                  </h1>
                  <p className="text-base sm:text-lg text-[#B3B5AA] max-w-xl leading-relaxed">
                    Explore world-class recipes, dynamic ingredient scaling, and interactive hands-free cooking.
                  </p>

                  {/* Hero Search Bar */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setRoute({ page: 'explore' });
                    }}
                    className="flex flex-col sm:flex-row gap-3 max-w-xl"
                  >
                    <div className="relative flex-1">
                      <Search className="w-5 h-5 text-[#82877B] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search recipes, ingredients, cuisines..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#20231F] border border-[#F5F2E9]/15 text-[#F5F2E9] placeholder-[#82877B] focus:outline-none focus:border-[#B8C58A] text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-4 rounded-xl bg-[#B8C58A] hover:bg-[#8EAA85] text-[#10110F] font-bold text-sm transition-all cursor-pointer touch-manipulation active:scale-95 shadow-md"
                    >
                      Explore Recipes
                    </button>
                  </form>
                </div>

                {/* Featured Hero Card */}
                <div className="lg:col-span-5">
                  {recipes[0] && (
                    <div
                      onClick={() => navigateToRecipe(recipes[0])}
                      className="group cursor-pointer relative rounded-3xl overflow-hidden border border-[#F5F2E9]/15 bg-[#20231F] shadow-2xl"
                    >
                      <div className="h-80 sm:h-96 overflow-hidden">
                        <SafeRecipeImage
                          src={recipes[0].heroImage}
                          alt={recipes[0].name}
                          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-[#10110F]/40 to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#B8C58A] text-[#10110F]">
                            Featured Dish
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs bg-[#10110F]/80 text-[#E9DFC7]">
                            {recipes[0].prepTimeMinutes + recipes[0].cookTimeMinutes} mins
                          </span>
                        </div>
                        <h2 className="font-editorial text-2xl sm:text-3xl text-[#F5F2E9] group-hover:text-[#B8C58A] transition-colors">
                          {recipes[0].name}
                        </h2>
                        <p className="text-sm text-[#B3B5AA] line-clamp-2">
                          {recipes[0].shortDescription}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Section B: Browse by Cuisine */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B8C58A] font-semibold">
                    Global Pantry
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5F2E9] mt-1">
                    Browse by Cuisine
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setRoute({ page: 'cuisines' })}
                  className="text-sm text-[#B8C58A] hover:underline flex items-center gap-1"
                >
                  All 11 Cuisines <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {CUISINES_META.slice(0, 8).map((cuisine) => {
                  const count = recipes.filter((r) => r.cuisine === cuisine.name).length;
                  return (
                    <div
                      key={cuisine.id}
                      onClick={() =>
                        setRoute({ page: 'cuisines', selectedCuisine: cuisine.name })
                      }
                      className="group cursor-pointer relative h-64 rounded-2xl overflow-hidden border border-[#F5F2E9]/10"
                    >
                      <SafeRecipeImage
                        src={cuisine.image}
                        alt={cuisine.name}
                        className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-[#10110F]/45 to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 p-5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h3 className="font-editorial text-2xl text-[#F5F2E9] group-hover:text-[#B8C58A]">
                            {cuisine.name}
                          </h3>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#20231F]/90 text-[#E9DFC7]">
                            {count} {count === 1 ? 'dish' : 'dishes'}
                          </span>
                        </div>
                        <p className="text-xs text-[#B3B5AA] line-clamp-2">{cuisine.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section C: Browse by Food Type */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8EAA85] font-semibold">
                  Course & Category
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5F2E9] mt-1">
                  Browse by Meal & Food Type
                </h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {MEAL_TYPE_CATEGORIES.map((type) => {
                  const count = recipes.filter((r) => r.mealTypes.includes(type)).length;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedMealTypeFilter(type);
                        setRoute({ page: 'explore' });
                      }}
                      className="px-4 py-3 rounded-xl bg-[#20231F] hover:bg-[#282C26] border border-[#F5F2E9]/10 hover:border-[#B8C58A]/40 transition-all flex items-center gap-2.5"
                    >
                      <Utensils className="w-4 h-4 text-[#B8C58A]" />
                      <span className="text-sm font-medium text-[#F5F2E9]">{type}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#171916] text-[#82877B]">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Section D: Trending Recipes */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B8C58A] font-semibold">
                    Most Cooked This Week
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5F2E9] mt-1">
                    Trending Recipes
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setRoute({ page: 'explore' })}
                  className="text-sm text-[#B8C58A] hover:underline"
                >
                  Explore full library →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recipes
                  .filter((r) => r.isTrending)
                  .slice(0, 5)
                  .map((r, idx) => renderRecipeCard(r, idx === 0))}
              </div>
            </section>

            {/* Section E: Quick & Easy Segmented Filter */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#F5F2E9]/10">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#8EAA85] font-semibold">
                    Weeknight Speed
                  </span>
                  <h2 className="font-editorial text-3xl text-[#F5F2E9] mt-1">
                    Quick & Effortless
                  </h2>
                </div>
                <div className="inline-flex p-1 rounded-xl bg-[#171916] border border-[#F5F2E9]/10 self-start">
                  {[15, 30, 45].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setQuickTimeFilter(mins)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                        quickTimeFilter === mins
                          ? 'bg-[#B8C58A] text-[#10110F]'
                          : 'text-[#B3B5AA] hover:text-[#F5F2E9]'
                      }`}
                    >
                      Under {mins} Mins
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes
                  .filter((r) => r.prepTimeMinutes + r.cookTimeMinutes <= quickTimeFilter)
                  .slice(0, 3)
                  .map((r) => renderRecipeCard(r))}
              </div>
            </section>

            {/* Section F: Explore by Mood or Occasion */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B8C58A] font-semibold">
                  Curated Moods
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5F2E9] mt-1">
                  Explore by Mood & Occasion
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {EDITORIAL_COLLECTIONS.map((col) => {
                  const count = recipes.filter((r) =>
                    r.moodCollections.includes(col.id)
                  ).length;
                  return (
                    <div
                      key={col.id}
                      onClick={() =>
                        setRoute({ page: 'collections', selectedCollectionId: col.id })
                      }
                      className="group cursor-pointer rounded-2xl bg-[#20231F] border border-[#F5F2E9]/10 overflow-hidden hover:border-[#B8C58A]/40 transition-all"
                    >
                      <div className="h-44 overflow-hidden relative">
                        <SafeRecipeImage
                          src={col.coverImage}
                          alt={col.title}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#20231F] to-transparent" />
                        <span className="absolute bottom-3 left-4 text-xs px-2.5 py-1 rounded-full bg-[#10110F]/80 text-[#B8C58A]">
                          {count} recipes
                        </span>
                      </div>
                      <div className="p-5 space-y-1.5">
                        <h3 className="font-editorial text-xl text-[#F5F2E9] group-hover:text-[#B8C58A]">
                          {col.title}
                        </h3>
                        <p className="text-xs text-[#B3B5AA] line-clamp-2">{col.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section G & H: Local Cookbook Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-gradient-to-br from-[#20231F] via-[#171916] to-[#282C26] border border-[#B8C58A]/25 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl text-center lg:text-left">
                  <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5F2E9]">
                    Your Personal Digital Cookbook
                  </h2>
                  <p className="text-sm text-[#B3B5AA] leading-relaxed">
                    Save your favorite dishes locally, create custom collections, and cook offline anytime.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setRoute({ page: 'cookbook' })}
                    className="px-6 py-3.5 rounded-xl bg-[#B8C58A] text-[#10110F] font-bold text-sm hover:bg-[#8EAA85] transition-all cursor-pointer touch-manipulation active:scale-95 shadow-md"
                  >
                    Open Saved Cookbook ({savedRecipeIds.length})
                  </button>
                </div>
              </div>
            </section>

            {/* Section I: Cookly Pro & AI Sommelier Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-gradient-to-r from-[#20231F] via-[#282C26] to-[#171916] border-2 border-[#B8C58A]/40 p-8 sm:p-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8C58A]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 grid lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8C58A]/20 border border-[#B8C58A]/40 text-xs font-bold text-[#B8C58A] uppercase tracking-wider">
                      <Crown className="w-3.5 h-3.5" /> Cookly Pro
                    </div>
                    <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5F2E9] leading-tight">
                      Michelin AI Chef & Sommelier Pairings
                    </h2>
                    <p className="text-sm text-[#B3B5AA] max-w-2xl leading-relaxed">
                      Unlock unlimited conversational cooking advice, instant smart substitutions, and wine pairings.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex justify-start lg:justify-end">
                    <button
                      type="button"
                      onClick={() => setRoute({ page: 'pricing' })}
                      className="px-6 py-4 rounded-xl bg-gradient-to-r from-[#B8C58A] to-[#8EAA85] hover:brightness-110 text-[#10110F] font-bold text-sm text-center shadow-lg transition-all touch-manipulation active:scale-95 min-h-[44px]"
                    >
                      Explore Pro Plans
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= 2. EXPLORE, SEARCH & FILTERS ================= */}
        {route.page === 'explore' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="space-y-4">
              <h1 className="font-editorial text-4xl text-[#F5F2E9]">Explore Recipe Library</h1>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-[#82877B] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        setRecentSearches((prev) =>
                          [searchQuery.trim(), ...prev.filter((s) => s !== searchQuery.trim())].slice(0, 5)
                        );
                      }
                    }}
                    placeholder="Search by dish name, ingredient (e.g. cashews, halloumi), cuisine, or tag..."
                    className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/15 text-[#F5F2E9] text-sm focus:outline-none focus:border-[#B8C58A]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#82877B] hover:text-[#F5F2E9]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-4 py-3.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/15 text-sm text-[#F5F2E9]"
                >
                  <option value="popular">Sort: Highest Rated</option>
                  <option value="quickest">Sort: Shortest Total Time</option>
                  <option value="prep">Sort: Shortest Prep Time</option>
                  <option value="alpha">Sort: Alphabetical (A–Z)</option>
                </select>
              </div>

              {/* Recent Searches */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#82877B]">
                <span>Suggestions:</span>
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchQuery(term)}
                    className="px-2.5 py-1 rounded-full bg-[#171916] hover:bg-[#282C26] text-[#B3B5AA] border border-[#F5F2E9]/10"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Grid */}
            <div className="p-5 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-[#82877B] mb-1.5">Cuisine</label>
                  <select
                    value={selectedCuisineFilter}
                    onChange={(e) => setSelectedCuisineFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9]"
                  >
                    <option value="All">All Cuisines</option>
                    {CUISINES_META.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#82877B] mb-1.5">Meal Category</label>
                  <select
                    value={selectedMealTypeFilter}
                    onChange={(e) => setSelectedMealTypeFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9]"
                  >
                    <option value="All">All Meal Types</option>
                    {MEAL_TYPE_CATEGORIES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#82877B] mb-1.5">Difficulty</label>
                  <select
                    value={selectedDifficultyFilter}
                    onChange={(e) => setSelectedDifficultyFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9]"
                  >
                    <option value="All">Any Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#82877B] mb-1.5">
                    Max Total Time: {maxTotalTimeFilter} mins
                  </label>
                  <input
                    type="range"
                    min={15}
                    max={120}
                    step={5}
                    value={maxTotalTimeFilter}
                    onChange={(e) => setMaxTotalTimeFilter(Number(e.target.value))}
                    className="w-full accent-[#B8C58A] mt-2"
                  />
                </div>
              </div>

              {/* Dietary Multi-Select */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#F5F2E9]/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#82877B] mr-1">Dietary:</span>
                  {DIETARY_TAGS.map((tag) => {
                    const active = selectedDietaryFilters.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setSelectedDietaryFilters((prev) =>
                            active ? prev.filter((t) => t !== tag) : [...prev, tag]
                          )
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          active
                            ? 'bg-[#B8C58A] text-[#10110F]'
                            : 'bg-[#20231F] text-[#B3B5AA] hover:text-[#F5F2E9]'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCuisineFilter('All');
                    setSelectedMealTypeFilter('All');
                    setSelectedDifficultyFilter('All');
                    setSelectedDietaryFilters([]);
                    setMaxTotalTimeFilter(120);
                  }}
                  className="text-xs text-[#E78375] hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-[#B3B5AA]">
              <span>
                Showing <strong className="text-[#F5F2E9]">{filteredRecipes.length}</strong> matching
                recipes
              </span>
            </div>

            {filteredRecipes.length === 0 ? (
              <div className="p-12 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 text-center space-y-4">
                <Utensils className="w-10 h-10 text-[#82877B] mx-auto" />
                <h3 className="font-editorial text-2xl">No recipes match those exact filters</h3>
                <p className="text-sm text-[#B3B5AA] max-w-md mx-auto">
                  Try widening your maximum cooking time or clearing one of the dietary filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((r) => renderRecipeCard(r))}
              </div>
            )}
          </div>
        )}

        {/* ================= 3. HIERARCHICAL CUISINES ================= */}
        {route.page === 'cuisines' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            {/* Breadcrumb Level 1 -> Level 4 */}
            <nav className="flex items-center gap-2 text-xs text-[#82877B]">
              <button
                type="button"
                onClick={() => setRoute({ page: 'home' })}
                className="hover:text-[#F5F2E9]"
              >
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <button
                type="button"
                onClick={() => setRoute({ page: 'cuisines' })}
                className={!route.selectedCuisine ? 'text-[#B8C58A]' : 'hover:text-[#F5F2E9]'}
              >
                Cuisines
              </button>
              {route.selectedCuisine && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <button
                    type="button"
                    onClick={() =>
                      setRoute({ page: 'cuisines', selectedCuisine: route.selectedCuisine })
                    }
                    className={!route.selectedSubcategory ? 'text-[#B8C58A]' : 'hover:text-[#F5F2E9]'}
                  >
                    {route.selectedCuisine}
                  </button>
                </>
              )}
              {route.selectedSubcategory && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-[#B8C58A]">{route.selectedSubcategory}</span>
                </>
              )}
            </nav>

            {!route.selectedCuisine ? (
              <div className="space-y-6">
                <div>
                  <h1 className="font-editorial text-4xl sm:text-5xl text-[#F5F2E9]">
                    World Cuisines & Regional Subcategories
                  </h1>
                  <p className="text-[#B3B5AA] mt-2">
                    Select a culinary tradition to drill down into regional subcategories and dishes.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CUISINES_META.map((c) => {
                    const count = recipes.filter((r) => r.cuisine === c.name).length;
                    return (
                      <div
                        key={c.id}
                        onClick={() => setRoute({ page: 'cuisines', selectedCuisine: c.name })}
                        className="group cursor-pointer rounded-2xl bg-[#20231F] border border-[#F5F2E9]/10 overflow-hidden hover:border-[#B8C58A]/40 transition-all"
                      >
                        <div className="h-48 relative overflow-hidden">
                          <SafeRecipeImage
                            src={c.image}
                            alt={c.name}
                            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#20231F] to-transparent" />
                          <span className="absolute bottom-3 right-3 text-xs px-2.5 py-1 rounded-full bg-[#10110F]/80 text-[#B8C58A]">
                            {count} recipes
                          </span>
                        </div>
                        <div className="p-6 space-y-3">
                          <h2 className="font-editorial text-2xl text-[#F5F2E9] group-hover:text-[#B8C58A]">
                            {c.name}
                          </h2>
                          <p className="text-xs text-[#B3B5AA] leading-relaxed">{c.description}</p>
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {c.subcategories.map((sub) => (
                              <span
                                key={sub}
                                className="text-[11px] px-2.5 py-1 rounded-md bg-[#171916] text-[#E9DFC7]"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              (() => {
                const activeMeta =
                  CUISINES_META.find((c) => c.name === route.selectedCuisine) || CUISINES_META[0];
                const matching = recipes.filter(
                  (r) =>
                    r.cuisine === activeMeta.name &&
                    (!route.selectedSubcategory || r.subcategory === route.selectedSubcategory)
                );
                return (
                  <div className="space-y-8">
                    <div className="relative rounded-3xl overflow-hidden border border-[#F5F2E9]/15 h-64 flex items-end p-8">
                      <SafeRecipeImage
                        src={activeMeta.image}
                        alt={activeMeta.name}
                        className="absolute inset-0 w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-[#10110F]/60 to-transparent" />
                      <div className="relative z-10 space-y-2 max-w-2xl">
                        <span className="text-xs uppercase tracking-widest text-[#B8C58A] font-semibold">
                          Level 2 Cuisine Hierarchy
                        </span>
                        <h1 className="font-editorial text-4xl sm:text-5xl text-[#F5F2E9]">
                          {activeMeta.name} Kitchen
                        </h1>
                        <p className="text-sm text-[#B3B5AA]">{activeMeta.description}</p>
                      </div>
                    </div>

                    {/* Level 3 Subcategory Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setRoute({ page: 'cuisines', selectedCuisine: activeMeta.name })
                        }
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                          !route.selectedSubcategory
                            ? 'bg-[#B8C58A] text-[#10110F]'
                            : 'bg-[#20231F] text-[#B3B5AA] hover:text-[#F5F2E9]'
                        }`}
                      >
                        All {activeMeta.name}
                      </button>
                      {activeMeta.subcategories.map((sub) => (
                        <button
                          key={sub}
                          type="button"
                          onClick={() =>
                            setRoute({
                              page: 'cuisines',
                              selectedCuisine: activeMeta.name,
                              selectedSubcategory: sub
                            })
                          }
                          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                            route.selectedSubcategory === sub
                              ? 'bg-[#B8C58A] text-[#10110F]'
                              : 'bg-[#20231F] text-[#B3B5AA] hover:text-[#F5F2E9]'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>

                    {matching.length === 0 ? (
                      <div className="p-10 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 text-center space-y-3">
                        <p className="text-base text-[#B3B5AA]">
                          No dishes in "{route.selectedSubcategory}" yet. Add your own personal recipe or explore all {activeMeta.name} dishes!
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setRoute({ page: 'cuisines', selectedCuisine: activeMeta.name })
                          }
                          className="px-4 py-2 rounded-xl bg-[#B8C58A] text-[#10110F] text-xs font-semibold"
                        >
                          Show All {activeMeta.name} Dishes
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matching.map((r) => renderRecipeCard(r))}
                      </div>
                    )}
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* ================= 4. EDITORIAL COLLECTIONS ================= */}
        {route.page === 'collections' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#B8C58A] font-semibold">
                Curated Themes
              </span>
              <h1 className="font-editorial text-4xl sm:text-5xl text-[#F5F2E9]">
                Editorial Collections
              </h1>
            </div>

            <div className="flex flex-wrap gap-2">
              {EDITORIAL_COLLECTIONS.map((col) => {
                const active =
                  (route.selectedCollectionId || EDITORIAL_COLLECTIONS[0].id) === col.id;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() =>
                      setRoute({ page: 'collections', selectedCollectionId: col.id })
                    }
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-[#B8C58A] text-[#10110F]'
                        : 'bg-[#20231F] text-[#B3B5AA] hover:text-[#F5F2E9]'
                    }`}
                  >
                    {col.title}
                  </button>
                );
              })}
            </div>

            {(() => {
              const activeCol =
                EDITORIAL_COLLECTIONS.find(
                  (c) => c.id === (route.selectedCollectionId || EDITORIAL_COLLECTIONS[0].id)
                ) || EDITORIAL_COLLECTIONS[0];
              const list = recipes.filter((r) => r.moodCollections.includes(activeCol.id));
              return (
                <div className="space-y-8">
                  <div className="rounded-3xl bg-[#20231F] border border-[#F5F2E9]/10 overflow-hidden grid md:grid-cols-12">
                    <div className="md:col-span-5 h-60 md:h-auto">
                      <SafeRecipeImage
                        src={activeCol.coverImage}
                        alt={activeCol.title}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="md:col-span-7 p-8 flex flex-col justify-center space-y-3">
                      <span className="text-xs text-[#B8C58A] uppercase tracking-wider">
                        {activeCol.subtitle}
                      </span>
                      <h2 className="font-editorial text-3xl text-[#F5F2E9]">{activeCol.title}</h2>
                      <p className="text-sm text-[#B3B5AA] leading-relaxed">
                        {activeCol.description}
                      </p>
                      <div className="pt-2 text-xs text-[#82877B]">
                        {list.length} curated dishes in this collection
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.map((r) => renderRecipeCard(r))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================= 5. RECIPE DETAIL PAGE ================= */}
        {route.page === 'recipe' &&
          (() => {
            const recipe = recipes.find((r) => r.id === route.recipeId) || recipes[0];
            const ratio = customServings / recipe.servings;
            const isSaved = savedRecipeIds.includes(recipe.id);
            const checkedItems = ingredientChecklists[recipe.id] || [];
            const related = recipes
              .filter((r) => r.id !== recipe.id && (r.cuisine === recipe.cuisine || r.foodGroup === recipe.foodGroup))
              .slice(0, 3);

            return (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
                {/* Breadcrumb */}
                <nav className="flex flex-wrap items-center gap-2 text-xs text-[#82877B] no-print">
                  <button
                    type="button"
                    onClick={() => setRoute({ page: 'home' })}
                    className="hover:text-[#F5F2E9]"
                  >
                    Home
                  </button>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <button
                    type="button"
                    onClick={() =>
                      setRoute({ page: 'cuisines', selectedCuisine: recipe.cuisine })
                    }
                    className="hover:text-[#F5F2E9]"
                  >
                    {recipe.cuisine}
                  </button>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <button
                    type="button"
                    onClick={() =>
                      setRoute({
                        page: 'cuisines',
                        selectedCuisine: recipe.cuisine,
                        selectedSubcategory: recipe.subcategory
                      })
                    }
                    className="hover:text-[#F5F2E9]"
                  >
                    {recipe.subcategory}
                  </button>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-[#B8C58A]">{recipe.name}</span>
                </nav>

                {/* Hero Header */}
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[#F5F2E9]/15 h-80 sm:h-[420px]">
                    <SafeRecipeImage
                      src={recipe.heroImage}
                      alt={recipe.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#20231F] text-[#B8C58A] border border-[#B8C58A]/30">
                        {recipe.cuisine} • {recipe.subcategory}
                      </span>
                      {recipe.dietaryTags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full text-xs bg-[#171916] text-[#8EAA85] border border-[#F5F2E9]/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <h1 className="font-editorial text-3xl sm:text-5xl text-[#F5F2E9] leading-tight">
                      {recipe.name}
                    </h1>
                    <p className="text-base text-[#B3B5AA] leading-relaxed">
                      {recipe.shortDescription}
                    </p>

                    {/* Time & Metadata Bar */}
                    <div className="grid grid-cols-4 gap-3 p-4 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 text-center">
                      <div>
                        <span className="block text-[11px] text-[#82877B] uppercase">Prep</span>
                        <span className="font-semibold text-sm text-[#F5F2E9]">
                          {recipe.prepTimeMinutes}m
                        </span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-[#82877B] uppercase">Cook</span>
                        <span className="font-semibold text-sm text-[#F5F2E9]">
                          {recipe.cookTimeMinutes}m
                        </span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-[#82877B] uppercase">Difficulty</span>
                        <span className="font-semibold text-sm text-[#B8C58A]">
                          {recipe.difficulty}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-[#82877B] uppercase">Rating</span>
                        <span className="font-semibold text-sm text-[#E9DFC7]">
                          ★ {recipe.rating}
                        </span>
                      </div>
                    </div>

                    {/* Primary Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 no-print">
                      <button
                        type="button"
                        onClick={() => startCookingMode(recipe, customServings)}
                        className="flex-1 sm:flex-initial px-6 py-4 rounded-xl bg-[#B8C58A] hover:bg-[#8EAA85] text-[#10110F] font-bold text-sm flex items-center justify-center gap-2 transition-all touch-manipulation active:scale-95 shadow-md min-h-[44px]"
                      >
                        <Play className="w-4 h-4 fill-current" /> Start Cooking Mode
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowAiChefDrawer(true)}
                        className="px-4 py-4 rounded-xl bg-gradient-to-r from-[#B8C58A]/20 to-[#8EAA85]/20 hover:from-[#B8C58A]/30 hover:to-[#8EAA85]/35 border border-[#B8C58A]/40 text-[#B8C58A] text-sm font-semibold flex items-center gap-2 transition-all touch-manipulation active:scale-95 shadow-sm min-h-[44px]"
                      >
                        <Sparkles className="w-4 h-4 text-[#B8C58A] animate-pulse" />
                        <span>Ask AI Chef</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          toggleSaveRecipe(recipe.id, () => setShowSavePromptModal(true))
                        }
                        className={`px-4 py-4 rounded-xl border text-sm font-medium flex items-center gap-2 transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                          isSaved
                            ? 'bg-[#282C26] border-[#B8C58A] text-[#B8C58A]'
                            : 'bg-[#20231F] border-[#F5F2E9]/15 text-[#F5F2E9]'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        {isSaved ? 'Saved' : 'Save'}
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          const shareData = {
                            title: recipe.name,
                            text: recipe.shortDescription,
                            url: window.location.href
                          };
                          if (navigator.share) {
                            try {
                              await navigator.share(shareData);
                            } catch {
                              // User cancelled
                            }
                          } else {
                            await navigator.clipboard.writeText(
                              `${recipe.name} — ${recipe.shortDescription}`
                            );
                            addToast('Recipe summary copied to clipboard!');
                          }
                        }}
                        aria-label="Share recipe"
                        className="p-4 rounded-xl bg-[#20231F] hover:bg-[#282C26] border border-[#F5F2E9]/15 text-[#F5F2E9] transition-all touch-manipulation active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => window.print()}
                        aria-label="Print recipe"
                        className="p-4 rounded-xl bg-[#20231F] hover:bg-[#282C26] border border-[#F5F2E9]/15 text-[#F5F2E9] transition-all touch-manipulation active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      {recipe.isUserCreated && (
                        <button
                          type="button"
                          onClick={() => {
                            deleteCustomRecipe(recipe.id);
                            setRoute({ page: 'explore' });
                          }}
                          className="p-4 rounded-xl bg-[#E78375]/20 text-[#E78375] border border-[#E78375]/40 transition-all touch-manipulation active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ingredients & Instructions Split */}
                <div className="grid lg:grid-cols-12 gap-10">
                  {/* Left Column: Scaled Ingredients & Checklist */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="p-6 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 space-y-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="font-editorial text-2xl text-[#F5F2E9]">Ingredients</h2>
                          <p className="text-xs text-[#82877B]">
                            {checkedItems.length} of {recipe.ingredients.length} ingredients ready
                          </p>
                        </div>

                        {/* Serving Scaler */}
                        <div className="flex items-center gap-2 bg-[#20231F] p-1.5 rounded-xl border border-[#F5F2E9]/10 no-print">
                          <button
                            type="button"
                            aria-label="Decrease servings"
                            onClick={() => setCustomServings(Math.max(1, customServings - 1))}
                            className="w-9 h-9 rounded-lg bg-[#282C26] hover:bg-[#323630] flex items-center justify-center text-[#F5F2E9] transition-all touch-manipulation active:scale-90 min-h-[36px] min-w-[36px]"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-xs font-bold px-2 text-[#E9DFC7]">
                            {customServings} servings
                          </span>
                          <button
                            type="button"
                            aria-label="Increase servings"
                            onClick={() => setCustomServings(Math.min(24, customServings + 1))}
                            className="w-9 h-9 rounded-lg bg-[#282C26] hover:bg-[#323630] flex items-center justify-center text-[#F5F2E9] transition-all touch-manipulation active:scale-90 min-h-[36px] min-w-[36px]"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <ul className="space-y-2.5">
                        {recipe.ingredients.map((ing) => {
                          const checked = checkedItems.includes(ing.name);
                          const scaledQty = formatScaledQuantity(ing.quantity, ratio);
                          return (
                            <li
                              key={ing.name}
                              onClick={() => toggleIngredientChecked(recipe.id, ing.name)}
                              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                checked
                                  ? 'bg-[#10110F]/60 border-[#F5F2E9]/5 text-[#82877B] line-through'
                                  : 'bg-[#20231F] border-[#F5F2E9]/10 text-[#F5F2E9]'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                                    checked
                                      ? 'bg-[#9EC69A] border-[#9EC69A] text-[#10110F]'
                                      : 'border-[#82877B]'
                                  }`}
                                >
                                  {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                                <span className="text-sm">{ing.name}</span>
                              </div>
                              <span className="text-xs font-semibold text-[#B8C58A] shrink-0">
                                {ing.quantity !== null
                                  ? `${scaledQty} ${ing.unit}`
                                  : ing.qualitativeNote || ing.unit}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      <button
                        type="button"
                        onClick={() =>
                          addShoppingItems(
                            recipe.ingredients.map((ing) => ({
                              name: ing.name,
                              quantity:
                                ing.quantity !== null
                                  ? Number((ing.quantity * ratio).toFixed(2))
                                  : null,
                              unit: ing.unit,
                              category: ing.category,
                              sourceRecipeId: recipe.id,
                              sourceRecipeName: recipe.name
                            }))
                          )
                        }
                        className="w-full py-3 rounded-xl bg-[#20231F] hover:bg-[#282C26] text-xs font-semibold text-[#B8C58A] border border-[#B8C58A]/30 transition-colors flex items-center justify-center gap-2 no-print"
                      >
                        <ShoppingBag className="w-4 h-4" /> Add All Ingredients to Shopping List
                      </button>
                    </div>

                    {/* Estimated Nutrition & Allergens */}
                    <div className="p-6 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-editorial text-xl text-[#F5F2E9]">
                          Estimated Nutrition
                        </h3>
                        <span className="text-[11px] text-[#82877B]">Per serving (Estimate)</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="p-2.5 rounded-xl bg-[#20231F]">
                          <span className="block text-xs text-[#82877B]">Calories</span>
                          <span className="font-semibold text-sm text-[#E9DFC7]">
                            {recipe.nutrition.calories}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#20231F]">
                          <span className="block text-xs text-[#82877B]">Protein</span>
                          <span className="font-semibold text-sm text-[#E9DFC7]">
                            {recipe.nutrition.protein}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#20231F]">
                          <span className="block text-xs text-[#82877B]">Carbs</span>
                          <span className="font-semibold text-sm text-[#E9DFC7]">
                            {recipe.nutrition.carbs}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#20231F]">
                          <span className="block text-xs text-[#82877B]">Fat</span>
                          <span className="font-semibold text-sm text-[#E9DFC7]">
                            {recipe.nutrition.fat}
                          </span>
                        </div>
                      </div>
                      {recipe.allergens.length > 0 && (
                        <p className="text-xs text-[#82877B]">
                          <strong>Allergens:</strong> {recipe.allergens.join(', ')}
                        </p>
                      )}
                    </div>

                    {/* Sommelier & Beverage Pairing Card (Pro Feature) */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#20231F] to-[#171916] border border-[#B8C58A]/35 space-y-3 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-[#B8C58A]" />
                          <h3 className="font-editorial text-xl text-[#F5F2E9]">Sommelier Wine & Drink Pairing</h3>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#B8C58A]/20 text-[#B8C58A] text-[10px] font-bold uppercase tracking-wider">
                          Pro Pairing
                        </span>
                      </div>
                      <p className="text-xs text-[#B3B5AA] leading-relaxed">
                        {recipe.winePairing || 'Pair with a crisp, mineral-forward dry white or an elegant, medium-bodied red like Barbera or Pinot Noir to balance the fats and heighten aromatics.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowAiChefDrawer(true)}
                        className="text-xs text-[#B8C58A] hover:underline flex items-center gap-1.5 font-semibold touch-manipulation pt-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Ask Chef Pierre for cocktail & craft beer alternatives →
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Step-by-Step Instructions, Tips & Private Notes */}
                  <div className="lg:col-span-7 space-y-8">
                    <div className="space-y-4">
                      <h2 className="font-editorial text-3xl text-[#F5F2E9]">
                        Step-by-Step Preparation
                      </h2>
                      <div className="space-y-4">
                        {recipe.steps.map((step) => (
                          <div
                            key={step.stepNumber}
                            className="p-6 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-wider text-[#B8C58A]">
                                Step {step.stepNumber} · {step.title}
                              </span>
                              {step.durationMinutes && (
                                <span className="text-xs px-2.5 py-1 rounded-full bg-[#20231F] text-[#E9DFC7] flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-[#B8C58A]" /> {step.durationMinutes}{' '}
                                  min
                                </span>
                              )}
                            </div>
                            <p className="text-sm sm:text-base text-[#F5F2E9] leading-relaxed">
                              {step.instruction}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chef Tips & Substitutions */}
                    {recipe.tipsAndSubstitutions.length > 0 && (
                      <div className="p-6 rounded-2xl bg-[#20231F] border border-[#B8C58A]/25 space-y-3">
                        <h3 className="font-editorial text-xl text-[#E9DFC7]">
                          Chef's Tips & Substitutions
                        </h3>
                        <ul className="space-y-2 text-sm text-[#B3B5AA] list-disc list-inside">
                          {recipe.tipsAndSubstitutions.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Private Recipe Notes */}
                    <div className="p-6 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 space-y-3 no-print">
                      <h3 className="font-editorial text-xl text-[#F5F2E9]">
                        Your Private Cooking Notes
                      </h3>
                      <textarea
                        rows={3}
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Record your personal spice adjustments, oven calibration, or preferred substitutions..."
                        className="w-full p-3.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9] focus:outline-none focus:border-[#B8C58A]"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#82877B]">
                          Stored locally in this browser for this recipe.
                        </span>
                        <button
                          type="button"
                          onClick={() => saveRecipeNote(recipe.id, noteDraft)}
                          className="px-4 py-2 rounded-xl bg-[#B8C58A] text-[#10110F] text-xs font-semibold"
                        >
                          Save Note
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Recipes */}
                <div className="pt-8 border-t border-[#F5F2E9]/10 space-y-6 no-print">
                  <h2 className="font-editorial text-3xl text-[#F5F2E9]">
                    Similar Dishes You Might Love
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {related.map((r) => renderRecipeCard(r))}
                  </div>
                </div>
              </div>
            );
          })()}

        {/* ================= 6. INTERACTIVE COOKING MODE ================= */}
        {route.page === 'cooking' &&
          (() => {
            const recipe = recipes.find((r) => r.id === route.recipeId) || recipes[0];
            const step = recipe.steps[activeStepIdx] || recipe.steps[0];
            const progressPct = ((activeStepIdx + 1) / recipe.steps.length) * 100;
            const ratio = route.servings / recipe.servings;

            const formatMMSS = (sec: number) => {
              const m = Math.floor(sec / 60);
              const s = sec % 60;
              return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
            };

            return (
              <div className="min-h-screen bg-[#10110F] flex flex-col justify-between p-4 sm:p-8">
                {/* Top Bar */}
                <div className="max-w-4xl w-full mx-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#B8C58A] font-semibold">
                        Interactive Cooking Companion
                      </span>
                      <h1 className="font-editorial text-xl sm:text-2xl text-[#F5F2E9]">
                        {recipe.name} ({route.servings} servings)
                      </h1>
                    </div>
                    <div className="flex items-center gap-3">
                      {wakeLockActive && (
                        <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs bg-[#20231F] text-[#9EC69A] border border-[#9EC69A]/30">
                          Screen Wake Lock Active
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setRoute({ page: 'recipe', recipeId: recipe.id })}
                        className="px-4 py-2 rounded-xl bg-[#20231F] hover:bg-[#282C26] text-xs font-medium text-[#E9DFC7] border border-[#F5F2E9]/10"
                      >
                        Exit Cooking Mode
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-[#20231F] overflow-hidden">
                    <div
                      className="h-full bg-[#B8C58A] transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Focused Step Card */}
                <div className="max-w-3xl w-full mx-auto my-8 p-6 sm:p-12 rounded-3xl bg-[#171916] border border-[#F5F2E9]/15 space-y-8 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#B8C58A]/15 text-[#B8C58A] text-xs font-bold uppercase tracking-wider">
                      Step {activeStepIdx + 1} of {recipe.steps.length}
                    </span>
                    <span className="font-editorial text-xl text-[#E9DFC7]">{step.title}</span>
                  </div>

                  <p className="font-editorial text-2xl sm:text-4xl text-[#F5F2E9] leading-relaxed">
                    {step.instruction}
                  </p>

                  {/* Relevant Step Ingredients */}
                  <div className="p-4 rounded-2xl bg-[#20231F] border border-[#F5F2E9]/10 space-y-2">
                    <span className="text-xs uppercase tracking-wider text-[#82877B] font-semibold">
                      Scaled Ingredients for This Dish ({route.servings} servings)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {recipe.ingredients.map((ing) => (
                        <span
                          key={ing.name}
                          className="px-3 py-1.5 rounded-lg bg-[#171916] text-xs text-[#E9DFC7] border border-[#F5F2E9]/10"
                        >
                          {ing.name}:{' '}
                          <strong className="text-[#B8C58A]">
                            {ing.quantity !== null
                              ? `${formatScaledQuantity(ing.quantity, ratio)} ${ing.unit}`
                              : ing.unit}
                          </strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Integrated Timestamp Timer */}
                  {step.durationMinutes && (
                    <div className="p-5 rounded-2xl bg-[#20231F] border border-[#B8C58A]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-8 h-8 text-[#B8C58A]" />
                        <div>
                          <span className="text-xs text-[#B3B5AA] block">
                            Recommended Step Timer ({step.durationMinutes} min)
                          </span>
                          <span className="font-mono text-3xl font-bold text-[#F5F2E9]">
                            {timerEndTime || timerPausedRemainingMs
                              ? formatMMSS(timerDisplaySeconds)
                              : formatMMSS(step.durationMinutes * 60)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!timerEndTime ? (
                          <button
                            type="button"
                            onClick={() => {
                              const ms =
                                timerPausedRemainingMs ?? step.durationMinutes! * 60 * 1000;
                              setTimerEndTime(Date.now() + ms);
                              setTimerPausedRemainingMs(null);
                            }}
                            className="px-5 py-2.5 rounded-xl bg-[#B8C58A] text-[#10110F] font-semibold text-xs flex items-center gap-1.5"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />{' '}
                            {timerPausedRemainingMs ? 'Resume' : 'Start Timer'}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              const rem = Math.max(0, timerEndTime - Date.now());
                              setTimerPausedRemainingMs(rem);
                              setTimerEndTime(null);
                            }}
                            className="px-5 py-2.5 rounded-xl bg-[#E9DFC7] text-[#10110F] font-semibold text-xs flex items-center gap-1.5"
                          >
                            <Pause className="w-3.5 h-3.5" /> Pause
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setTimerEndTime(null);
                            setTimerPausedRemainingMs(null);
                            setTimerDisplaySeconds(step.durationMinutes! * 60);
                          }}
                          className="p-2.5 rounded-xl bg-[#282C26] text-[#B3B5AA] hover:text-[#F5F2E9]"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Step Navigation */}
                <div className="max-w-4xl w-full mx-auto flex items-center justify-between gap-4">
                  <button
                    type="button"
                    disabled={activeStepIdx === 0}
                    onClick={() => {
                      setActiveStepIdx((i) => Math.max(0, i - 1));
                      setTimerEndTime(null);
                      setTimerPausedRemainingMs(null);
                    }}
                    className="px-6 py-4 rounded-xl bg-[#20231F] disabled:opacity-40 text-sm font-semibold text-[#F5F2E9] flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous Step
                  </button>

                  {activeStepIdx < recipe.steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveStepIdx((i) => i + 1);
                        setTimerEndTime(null);
                        setTimerPausedRemainingMs(null);
                      }}
                      className="px-8 py-4 rounded-xl bg-[#B8C58A] text-[#10110F] text-sm font-semibold flex items-center gap-2"
                    >
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        addToast(`Finished cooking ${recipe.name}! Bon appétit!`);
                        setRoute({ page: 'recipe', recipeId: recipe.id });
                      }}
                      className="px-8 py-4 rounded-xl bg-[#9EC69A] text-[#10110F] text-sm font-bold flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" /> Complete Cooking
                    </button>
                  )}
                </div>
              </div>
            );
          })()}

        {/* ================= 7. COOK WITH WHAT YOU HAVE (PANTRY FINDER) ================= */}
        {route.page === 'pantry-finder' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-[#B8C58A] font-semibold">
                Transparent Local Ingredient Matcher
              </span>
              <h1 className="font-editorial text-4xl sm:text-5xl text-[#F5F2E9]">
                Cook With What You Have
              </h1>
              <p className="text-sm text-[#B3B5AA]">
                Select pantry items you have on hand. Cookly calculates exact ingredient overlap and lets you add any missing items straight to your shopping list.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 space-y-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (pantryInput.trim() && !selectedPantryItems.includes(pantryInput.trim())) {
                    setSelectedPantryItems((prev) => [...prev, pantryInput.trim()]);
                    setPantryInput('');
                  }
                }}
                className="flex gap-3 max-w-md"
              >
                <input
                  type="text"
                  value={pantryInput}
                  onChange={(e) => setPantryInput(e.target.value)}
                  placeholder="Add an ingredient (e.g., cashews, miso, halloumi)..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/15 text-sm text-[#F5F2E9]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#B8C58A] text-[#10110F] font-semibold text-xs"
                >
                  + Add
                </button>
              </form>

              <div className="space-y-2">
                <span className="text-xs text-[#82877B]">Common Kitchen Staples (Click to toggle):</span>
                <div className="flex flex-wrap gap-2">
                  {COMMON_PANTRY_INGREDIENTS.map((item) => {
                    const active = selectedPantryItems.some(
                      (s) => s.toLowerCase() === item.toLowerCase()
                    );
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          setSelectedPantryItems((prev) =>
                            active
                              ? prev.filter((i) => i.toLowerCase() !== item.toLowerCase())
                              : [...prev, item]
                          )
                        }
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          active
                            ? 'bg-[#B8C58A] text-[#10110F]'
                            : 'bg-[#20231F] text-[#B3B5AA] hover:text-[#F5F2E9]'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Matching Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recipes
                .map((recipe) => {
                  const matched: Ingredient[] = [];
                  const missing: Ingredient[] = [];
                  recipe.ingredients.forEach((ing) => {
                    const hasMatch = selectedPantryItems.some((p) =>
                      ing.name.toLowerCase().includes(p.toLowerCase())
                    );
                    if (hasMatch) matched.push(ing);
                    else missing.push(ing);
                  });
                  const pct = Math.round((matched.length / recipe.ingredients.length) * 100);
                  return { recipe, matched, missing, pct };
                })
                .sort((a, b) => b.pct - a.pct)
                .map(({ recipe, matched, missing, pct }) => (
                  <div
                    key={recipe.id}
                    className="p-6 rounded-2xl bg-[#20231F] border border-[#F5F2E9]/10 flex flex-col justify-between gap-4"
                  >
                    <div className="flex gap-4">
                      <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0">
                        <SafeRecipeImage
                          src={recipe.heroImage}
                          alt={recipe.name}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#B8C58A]/20 text-[#B8C58A]">
                            {pct}% Match ({matched.length}/{recipe.ingredients.length})
                          </span>
                          <span className="text-xs text-[#82877B]">
                            {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                          </span>
                        </div>
                        <h3
                          onClick={() => navigateToRecipe(recipe)}
                          className="font-editorial text-xl text-[#F5F2E9] hover:text-[#B8C58A] cursor-pointer"
                        >
                          {recipe.name}
                        </h3>
                        <p className="text-xs text-[#B3B5AA]">
                          <strong>Missing ({missing.length}):</strong>{' '}
                          {missing.map((m) => m.name).join(', ') || 'None! You have everything.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#F5F2E9]/10">
                      <button
                        type="button"
                        onClick={() => navigateToRecipe(recipe)}
                        className="text-xs font-semibold text-[#F5F2E9] hover:text-[#B8C58A]"
                      >
                        Open Recipe →
                      </button>
                      {missing.length > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            addShoppingItems(
                              missing.map((m) => ({
                                name: m.name,
                                quantity: m.quantity,
                                unit: m.unit,
                                category: m.category,
                                sourceRecipeId: recipe.id,
                                sourceRecipeName: recipe.name
                              }))
                            )
                          }
                          className="px-3.5 py-2 rounded-xl bg-[#171916] hover:bg-[#282C26] text-xs text-[#B8C58A] border border-[#B8C58A]/30"
                        >
                          + Add {missing.length} Missing to Shopping List
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ================= 8. SHOPPING LIST ================= */}
        {route.page === 'shopping-list' &&
          (() => {
            const [customItemName, setCustomItemName] = useState('');
            const [customItemQty, setCustomItemQty] = useState('1');
            const [customItemUnit, setCustomItemUnit] = useState('item');
            const [customItemCat, setCustomItemCat] =
              useState<Ingredient['category']>('Produce');

            const categories: Ingredient['category'][] = [
              'Produce',
              'Dairy & Eggs',
              'Meat & Seafood',
              'Pantry & Spices',
              'Bakery & Grains'
            ];

            return (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="font-editorial text-4xl text-[#F5F2E9]">Shopping List</h1>
                    <p className="text-sm text-[#B3B5AA]">
                      Grouped by aisle category with automatic compatible unit merging.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 no-print">
                    <button
                      type="button"
                      onClick={() => {
                        const manifest = shoppingList
                          .filter((i) => !i.checked)
                          .map((i) => `• ${i.name} (${i.quantity ?? ''} ${i.unit}) [${i.category}]`)
                          .join('\n');
                        navigator.clipboard.writeText(manifest || 'All items purchased');
                        addToast('Instacart & Store Manifest copied to clipboard! (Pro Feature)', 'success');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#B8C58A] to-[#8EAA85] text-[#10110F] font-bold text-xs flex items-center gap-1.5 transition-all touch-manipulation active:scale-95 shadow-md min-h-[44px]"
                    >
                      <Crown className="w-3.5 h-3.5" />
                      <span>Instacart Export</span>
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const text = shoppingList
                          .map(
                            (i) =>
                              `${i.checked ? '[x]' : '[ ]'} ${i.name} (${
                                i.quantity ?? ''
                              } ${i.unit})`
                          )
                          .join('\n');
                        await navigator.clipboard.writeText(text || 'Empty list');
                        addToast('Shopping list copied to clipboard');
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-[#20231F] text-xs text-[#E9DFC7] border border-[#F5F2E9]/10 flex items-center gap-1.5 transition-all touch-manipulation active:scale-95 min-h-[44px]"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-3.5 py-2.5 rounded-xl bg-[#20231F] text-xs text-[#E9DFC7] border border-[#F5F2E9]/10 flex items-center gap-1.5 transition-all touch-manipulation active:scale-95 min-h-[44px]"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print
                    </button>
                    <button
                      type="button"
                      onClick={clearCompletedShopping}
                      className="px-3.5 py-2.5 rounded-xl bg-[#20231F] text-xs text-[#B8C58A] border border-[#B8C58A]/30 transition-all touch-manipulation active:scale-95 min-h-[44px]"
                    >
                      Clear Purchased
                    </button>
                    <button
                      type="button"
                      onClick={clearAllShopping}
                      className="px-3.5 py-2.5 rounded-xl bg-[#E78375]/15 text-xs text-[#E78375] hover:bg-[#E78375]/25 transition-all touch-manipulation active:scale-95 min-h-[44px]"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Add Custom Grocery Item */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!customItemName.trim()) return;
                    addShoppingItems([
                      {
                        name: customItemName.trim(),
                        quantity: Number(customItemQty) || 1,
                        unit: customItemUnit,
                        category: customItemCat
                      }
                    ]);
                    setCustomItemName('');
                  }}
                  className="p-4 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 grid grid-cols-1 sm:grid-cols-12 gap-3 no-print"
                >
                  <input
                    type="text"
                    value={customItemName}
                    onChange={(e) => setCustomItemName(e.target.value)}
                    placeholder="Add grocery item (e.g., Sourdough loaf, Avocados)..."
                    className="sm:col-span-5 px-3.5 py-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9] focus:outline-none focus:border-[#B8C58A]"
                  />
                  <input
                    type="number"
                    step="0.25"
                    value={customItemQty}
                    onChange={(e) => setCustomItemQty(e.target.value)}
                    className="sm:col-span-2 px-3 py-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9] focus:outline-none focus:border-[#B8C58A]"
                  />
                  <input
                    type="text"
                    value={customItemUnit}
                    onChange={(e) => setCustomItemUnit(e.target.value)}
                    placeholder="Unit"
                    className="sm:col-span-2 px-3 py-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9] focus:outline-none focus:border-[#B8C58A]"
                  />
                  <select
                    value={customItemCat}
                    onChange={(e) =>
                      setCustomItemCat(e.target.value as Ingredient['category'])
                    }
                    className="sm:col-span-2 px-3 py-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-xs text-[#F5F2E9] focus:outline-none focus:border-[#B8C58A]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="sm:col-span-1 py-3 rounded-xl bg-[#B8C58A] hover:bg-[#8EAA85] text-[#10110F] font-bold text-xs transition-all touch-manipulation active:scale-95 shadow-md min-h-[44px]"
                  >
                    Add
                  </button>
                </form>

                {shoppingList.length === 0 ? (
                  <div className="p-12 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 text-center space-y-3">
                    <ShoppingBag className="w-10 h-10 text-[#82877B] mx-auto" />
                    <h3 className="font-editorial text-2xl">Your shopping list is empty</h3>
                    <p className="text-sm text-[#B3B5AA]">
                      Add ingredients from any recipe detail page or generate a full grocery list from your Weekly Meal Planner.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {categories.map((cat) => {
                      const items = shoppingList.filter((i) => i.category === cat);
                      if (items.length === 0) return null;
                      return (
                        <div
                          key={cat}
                          className="p-5 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 space-y-3"
                        >
                          <h3 className="font-editorial text-xl text-[#B8C58A]">{cat}</h3>
                          <div className="space-y-2">
                            {items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10"
                              >
                                <div
                                  onClick={() => toggleShoppingItem(item.id)}
                                  className="flex items-center gap-3 cursor-pointer flex-1"
                                >
                                  <div
                                    className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                                      item.checked
                                        ? 'bg-[#9EC69A] border-[#9EC69A] text-[#10110F]'
                                        : 'border-[#82877B]'
                                    }`}
                                  >
                                    {item.checked && <Check className="w-3.5 h-3.5" />}
                                  </div>
                                  <div>
                                    <span
                                      className={`text-sm ${
                                        item.checked ? 'line-through text-[#82877B]' : 'text-[#F5F2E9]'
                                      }`}
                                    >
                                      {item.name}
                                    </span>
                                    {item.sourceRecipeName && (
                                      <span className="block text-[11px] text-[#82877B]">
                                        For: {item.sourceRecipeName}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-semibold text-[#E9DFC7]">
                                    {item.quantity !== null ? `${item.quantity} ${item.unit}` : item.unit}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeShoppingItem(item.id)}
                                    className="text-[#82877B] hover:text-[#E78375]"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

        {/* ================= 9. WEEKLY MEAL PLANNER ================= */}
        {route.page === 'meal-planner' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B8C58A] font-semibold">
                  7-Day Culinary Schedule
                </span>
                <h1 className="font-editorial text-4xl text-[#F5F2E9]">Weekly Meal Planner</h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex p-1 rounded-xl bg-[#171916] border border-[#F5F2E9]/10">
                  <button
                    type="button"
                    onClick={() => setActiveWeekStart('2026-10-19')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold ${
                      activeWeekStart === '2026-10-19'
                        ? 'bg-[#B8C58A] text-[#10110F]'
                        : 'text-[#B3B5AA]'
                    }`}
                  >
                    This Week (Oct 19 – Oct 25)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveWeekStart('2026-10-26')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold ${
                      activeWeekStart === '2026-10-26'
                        ? 'bg-[#B8C58A] text-[#10110F]'
                        : 'text-[#B3B5AA]'
                    }`}
                  >
                    Next Week (Oct 26 – Nov 1)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => generateShoppingListFromWeek(activeWeekStart)}
                  className="px-5 py-3 rounded-xl bg-[#B8C58A] hover:bg-[#8EAA85] text-[#10110F] font-bold text-xs flex items-center gap-2 transition-all touch-manipulation active:scale-95 shadow-md min-h-[44px]"
                >
                  <ShoppingBag className="w-4 h-4" /> Generate Week's Shopping List
                </button>
              </div>
            </div>

            {/* SaaS Macro Goal Targets & Nutritional Fulfillment Widget */}
            <MacroTrackerWidget
              plannedCalories={mealPlan
                .filter((e) => e.weekStartISO === activeWeekStart)
                .reduce((sum, e) => {
                  const r = recipes.find((rec) => rec.id === e.recipeId);
                  return sum + (r ? r.nutrition.calories : 0);
                }, 0)}
              plannedProtein={mealPlan
                .filter((e) => e.weekStartISO === activeWeekStart)
                .reduce((sum, e) => {
                  const r = recipes.find((rec) => rec.id === e.recipeId);
                  return sum + (r ? parseInt(r.nutrition.protein) || 28 : 0);
                }, 0)}
              plannedCarbs={mealPlan
                .filter((e) => e.weekStartISO === activeWeekStart)
                .reduce((sum, e) => {
                  const r = recipes.find((rec) => rec.id === e.recipeId);
                  return sum + (r ? parseInt(r.nutrition.carbs) || 45 : 0);
                }, 0)}
              plannedFat={mealPlan
                .filter((e) => e.weekStartISO === activeWeekStart)
                .reduce((sum, e) => {
                  const r = recipes.find((rec) => rec.id === e.recipeId);
                  return sum + (r ? parseInt(r.nutrition.fat) || 16 : 0);
                }, 0)}
            />

            {/* Mobile Day Selector (Prevents horizontal overflow on mobile) */}
            <div className="flex lg:hidden overflow-x-auto gap-2 pb-2">
              {DAYS_OF_WEEK.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setMobileSelectedDay(day)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                    mobileSelectedDay === day
                      ? 'bg-[#B8C58A] text-[#10110F] shadow-md'
                      : 'bg-[#20231F] text-[#B3B5AA]'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Desktop 7-Day Grid / Mobile Single Day View */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {DAYS_OF_WEEK.map((day) => {
                const isVisibleOnMobile = day === mobileSelectedDay;
                return (
                  <div
                    key={day}
                    className={`${
                      isVisibleOnMobile ? 'block' : 'hidden lg:block'
                    } p-4 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 space-y-4`}
                  >
                    <h3 className="font-editorial text-xl text-[#E9DFC7] border-b border-[#F5F2E9]/10 pb-2">
                      {day}
                    </h3>
                    <div className="space-y-3">
                      {PLANNER_SLOTS.map((slot) => {
                        const entry = mealPlan.find(
                          (e) =>
                            e.weekStartISO === activeWeekStart &&
                            e.day === day &&
                            e.slot === slot
                        );
                        const plannedRecipe = entry
                          ? recipes.find((r) => r.id === entry.recipeId)
                          : null;

                        return (
                          <div
                            key={slot}
                            className="p-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 space-y-2"
                          >
                            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#82877B]">
                              <span>{slot}</span>
                              {entry && (
                                <button
                                  type="button"
                                  onClick={() => removeMealPlanEntry(entry.id)}
                                  className="text-[#E78375] hover:underline"
                                >
                                  Remove
                                </button>
                              )}
                            </div>

                            {plannedRecipe ? (
                              <div
                                onClick={() => navigateToRecipe(plannedRecipe)}
                                className="cursor-pointer group space-y-1.5"
                              >
                                <div className="h-20 rounded-lg overflow-hidden">
                                  <SafeRecipeImage
                                    src={plannedRecipe.heroImage}
                                    alt={plannedRecipe.name}
                                    className="w-full h-full group-hover:scale-105 transition-transform"
                                  />
                                </div>
                                <p className="text-xs font-medium text-[#F5F2E9] group-hover:text-[#B8C58A] line-clamp-2">
                                  {plannedRecipe.name}
                                </p>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setPickerModalSlot({ day, slot })}
                                className="w-full py-4 rounded-lg border border-dashed border-[#F5F2E9]/15 text-xs text-[#82877B] hover:text-[#B8C58A] hover:border-[#B8C58A]/40 transition-colors"
                              >
                                + Assign Dish
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recipe Picker Modal for Meal Planner */}
            {pickerModalSlot && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="max-w-lg w-full rounded-3xl bg-[#171916] border border-[#F5F2E9]/15 p-6 space-y-4 max-h-[80vh] flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-2xl text-[#F5F2E9]">
                      Select Dish for {pickerModalSlot.day} {pickerModalSlot.slot}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setPickerModalSlot(null)}
                      className="text-[#82877B] hover:text-[#F5F2E9]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="overflow-y-auto space-y-2 pr-1">
                    {recipes.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => {
                          addMealPlanEntry({
                            weekStartISO: activeWeekStart,
                            day: pickerModalSlot.day,
                            slot: pickerModalSlot.slot,
                            recipeId: r.id
                          });
                          setPickerModalSlot(null);
                        }}
                        className="w-full p-3 rounded-xl bg-[#20231F] hover:bg-[#282C26] flex items-center gap-3 text-left"
                      >
                        <SafeRecipeImage
                          src={r.heroImage}
                          alt={r.name}
                          className="w-12 h-12 rounded-lg shrink-0"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-[#F5F2E9] block">
                            {r.name}
                          </span>
                          <span className="text-xs text-[#82877B]">
                            {r.cuisine} • {r.prepTimeMinutes + r.cookTimeMinutes} mins
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 10. SAVED COOKBOOK & CUSTOM COLLECTIONS ================= */}
        {route.page === 'cookbook' &&
          (() => {
            const [newColName, setNewColName] = useState('');
            const [newColDesc, setNewColDesc] = useState('');
            const savedRecipes = recipes.filter((r) => savedRecipeIds.includes(r.id));

            return (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h1 className="font-editorial text-4xl sm:text-5xl text-[#F5F2E9]">
                      Personal Digital Cookbook
                    </h1>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRoute({ page: 'create-recipe' })}
                    className="px-5 py-3 rounded-xl bg-[#B8C58A] text-[#10110F] font-semibold text-xs self-start"
                  >
                    + Create Personal Recipe
                  </button>
                </div>

                {/* Saved Recipes Grid */}
                <div className="space-y-4">
                  <h2 className="font-editorial text-2xl text-[#F5F2E9]">
                    Bookmarked Dishes ({savedRecipes.length})
                  </h2>
                  {savedRecipes.length === 0 ? (
                    <div className="p-10 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 text-center space-y-3">
                      <Bookmark className="w-8 h-8 text-[#82877B] mx-auto" />
                      <p className="text-sm text-[#B3B5AA]">
                        No saved recipes yet. Click the bookmark icon on any dish to keep it here.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedRecipes.map((r) => renderRecipeCard(r))}
                    </div>
                  )}
                </div>

                {/* Custom User Collections */}
                <div className="space-y-6 pt-8 border-t border-[#F5F2E9]/10">
                  <h2 className="font-editorial text-2xl text-[#F5F2E9]">
                    Your Custom Collections
                  </h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newColName.trim()) return;
                      createCollection(newColName, newColDesc);
                      setNewColName('');
                      setNewColDesc('');
                    }}
                    className="p-5 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="text"
                      value={newColName}
                      onChange={(e) => setNewColName(e.target.value)}
                      placeholder="New collection title (e.g., Sunday Dinner Party)..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9]"
                    />
                    <input
                      type="text"
                      value={newColDesc}
                      onChange={(e) => setNewColDesc(e.target.value)}
                      placeholder="Short note..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#B8C58A] text-[#10110F] font-semibold text-xs"
                    >
                      Create Collection
                    </button>
                  </form>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {collections.map((col) => (
                      <div
                        key={col.id}
                        className="p-6 rounded-2xl bg-[#20231F] border border-[#F5F2E9]/10 space-y-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-editorial text-2xl text-[#F5F2E9]">{col.name}</h3>
                            <p className="text-xs text-[#B3B5AA]">{col.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteCollection(col.id)}
                            className="text-[#82877B] hover:text-[#E78375]"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {recipes.map((r) => {
                            const inCol = col.recipeIds.includes(r.id);
                            return (
                              <button
                                key={r.id}
                                type="button"
                                onClick={() => toggleRecipeInCollection(col.id, r.id)}
                                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                                  inCol
                                    ? 'bg-[#B8C58A] text-[#10110F] font-semibold'
                                    : 'bg-[#171916] text-[#82877B] hover:text-[#F5F2E9]'
                                }`}
                              >
                                {inCol ? '✓ ' : '+ '} {r.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

        {/* ================= 11. CREATE PERSONAL RECIPE ================= */}
        {route.page === 'create-recipe' &&
          (() => {
            const [title, setTitle] = useState('');
            const [desc, setDesc] = useState('');
            const [cuisine, setCuisine] = useState('Indian');
            const [subcategory, setSubcategory] = useState('North Indian');
            const [prep, setPrep] = useState(15);
            const [cook, setCook] = useState(20);
            const [servings, setServings] = useState(4);
            const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
            const [imageUrl, setImageUrl] = useState(
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80'
            );
            const [ingText, setIngText] = useState('200|g|Paneer\n2|tbsp|Butter\n1|tsp|Garam masala');
            const [stepText, setStepText] = useState(
              'Sear aromatics in butter until golden.\nSimmer with spices and fold in main ingredients.'
            );
            const [error, setError] = useState('');

            return (
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B8C58A] font-semibold">
                    Local Recipe Studio
                  </span>
                  <h1 className="font-editorial text-4xl text-[#F5F2E9]">
                    Create a Personal Recipe
                  </h1>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!title.trim() || !desc.trim()) {
                      setError('Please provide both a recipe name and a short description.');
                      return;
                    }
                    const parsedIngredients: Ingredient[] = ingText
                      .split('\n')
                      .filter(Boolean)
                      .map((line) => {
                        const [q, u, n] = line.split('|');
                        return {
                          name: (n || line).trim(),
                          quantity: Number(q) || 1,
                          unit: (u || 'unit').trim(),
                          category: 'Produce'
                        };
                      });

                    const parsedSteps = stepText
                      .split('\n')
                      .filter(Boolean)
                      .map((line, idx) => ({
                        stepNumber: idx + 1,
                        title: `Step ${idx + 1}`,
                        instruction: line.trim(),
                        durationMinutes: 5
                      }));

                    const newRecipe: Recipe = {
                      id: 'custom-' + Date.now(),
                      slug: title.toLowerCase().replace(/\s+/g, '-'),
                      name: title.trim(),
                      shortDescription: desc.trim(),
                      heroImage: imageUrl,
                      cuisine,
                      subcategory,
                      foodGroup: 'Savory',
                      mealTypes: ['Dinner', 'Main courses'],
                      dietaryTags: ['Vegetarian'],
                      moodCollections: ['Comfort food'],
                      prepTimeMinutes: Number(prep) || 15,
                      cookTimeMinutes: Number(cook) || 20,
                      servings: Number(servings) || 4,
                      difficulty,
                      rating: 5.0,
                      isUserCreated: true,
                      ingredients: parsedIngredients,
                      steps: parsedSteps,
                      tipsAndSubstitutions: ['Personal kitchen creation stored locally.'],
                      allergens: [],
                      nutrition: { calories: 420, protein: '14g', carbs: '38g', fat: '20g' }
                    };

                    addCustomRecipe(newRecipe);
                    navigateToRecipe(newRecipe);
                  }}
                  className="p-6 sm:p-8 rounded-3xl bg-[#171916] border border-[#F5F2E9]/10 space-y-5"
                >
                  {error && (
                    <div className="p-3 rounded-xl bg-[#E78375]/20 text-[#E78375] text-xs">
                      {error}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#B3B5AA]">Recipe Title *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Mom's Sunday Tadka Dal"
                      className="w-full px-4 py-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#B3B5AA]">Short Editorial Description *</label>
                    <textarea
                      rows={2}
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9]"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs text-[#B3B5AA]">Cuisine</label>
                      <select
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm"
                      >
                        {CUISINES_META.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-[#B3B5AA]">Prep (mins)</label>
                      <input
                        type="number"
                        value={prep}
                        onChange={(e) => setPrep(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#B3B5AA]">Cook (mins)</label>
                      <input
                        type="number"
                        value={cook}
                        onChange={(e) => setCook(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#B3B5AA]">Servings</label>
                      <input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#B3B5AA]">
                      Ingredients (One per line: Quantity|Unit|Ingredient Name)
                    </label>
                    <textarea
                      rows={4}
                      value={ingText}
                      onChange={(e) => setIngText(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm font-mono text-[#F5F2E9]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#B3B5AA]">
                      Step-by-Step Instructions (One step per line)
                    </label>
                    <textarea
                      rows={4}
                      value={stepText}
                      onChange={(e) => setStepText(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#B8C58A] text-[#10110F] font-semibold text-sm"
                  >
                    Save Recipe to Local Cookbook
                  </button>
                </form>
              </div>
            );
          })()}

        {/* ================= 12. OPTIONAL LOCAL PROFILE & BACKUP ================= */}
        {route.page === 'profile' &&
          (() => {
            const [nameInput, setNameInput] = useState(profile?.displayName || '');
            const [avatarInput, setAvatarInput] = useState(profile?.avatar || '👨‍🍳');
            const [importText, setImportText] = useState('');

            return (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <div className="flex items-center justify-between pb-2">
                  <h1 className="font-editorial text-3xl sm:text-4xl text-[#F5F2E9]">
                    Profile & Settings
                  </h1>
                </div>

                {/* SaaS Subscription Status & Cloud Sync Banner */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#20231F] via-[#171916] to-[#20231F] border border-[#B8C58A]/35 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#B8C58A]/20 text-[#B8C58A] border border-[#B8C58A]/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5" />
                        {subscription.tier.toUpperCase()} TIER ACTIVE
                      </span>
                      <span className="text-xs text-[#82877B]">
                        {subscription.billingCycle === 'annual' ? 'Annual Pass (35% off)' : 'Monthly'}
                      </span>
                    </div>
                    <h2 className="font-editorial text-2xl text-[#F5F2E9]">
                      Cookly Pro Member Perks Active
                    </h2>
                    <p className="text-xs text-[#B3B5AA] max-w-xl">
                      All Pro perks active: AI Chef Pierre, sommelier wine matches, macro targets, and multi-device cloud backups.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setRoute({ page: 'pricing' })}
                      className="px-5 py-3 rounded-xl bg-[#B8C58A] hover:bg-[#8EAA85] text-[#10110F] text-xs font-bold transition-all touch-manipulation active:scale-95 shadow-md text-center min-h-[44px]"
                    >
                      Manage Plan / Tiers
                    </button>
                    <button
                      type="button"
                      onClick={triggerCloudSync}
                      className="px-5 py-3 rounded-xl bg-[#20231F] hover:bg-[#282C26] text-[#E9DFC7] border border-[#F5F2E9]/15 text-xs font-semibold flex items-center justify-center gap-2 transition-all touch-manipulation active:scale-95 min-h-[44px]"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                      <span>{syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}</span>
                    </button>
                  </div>
                </div>

                {/* Macro Target Goals Widget */}
                <MacroTrackerWidget />

                <div className="grid md:grid-cols-2 gap-8">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!nameInput.trim()) return;
                      saveProfile({
                        displayName: nameInput.trim(),
                        avatar: avatarInput,
                        dietaryPreferences: [],
                        preferredSkillLevel: 'All',
                        createdAt: new Date().toISOString()
                      });
                    }}
                    className="p-6 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 space-y-4"
                  >
                    <h2 className="font-editorial text-2xl text-[#F5F2E9]">
                      Personalize Your Kitchen
                    </h2>
                    <div>
                      <label className="text-xs text-[#82877B] block mb-1">Display Name</label>
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="e.g., Chef Aman"
                        className="w-full px-4 py-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9] focus:outline-none focus:border-[#B8C58A]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#82877B] block mb-1">Select Avatar</label>
                      <div className="flex gap-2">
                        {['👨‍🍳', '👩‍🍳', '🥘', '🍜', '🥐', '🌿'].map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setAvatarInput(emoji)}
                            className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center border transition-all touch-manipulation active:scale-90 min-h-[44px] min-w-[44px] ${
                              avatarInput === emoji
                                ? 'bg-[#B8C58A]/20 border-[#B8C58A]'
                                : 'bg-[#20231F] border-[#F5F2E9]/10'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#B8C58A] text-[#10110F] font-semibold text-xs"
                      >
                        Save Local Profile
                      </button>
                      {profile && (
                        <button
                          type="button"
                          onClick={() => saveProfile(null)}
                          className="px-4 py-2.5 rounded-xl bg-[#20231F] text-xs text-[#E78375]"
                        >
                          Clear Profile
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Export / Import Backup */}
                  <div className="p-6 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 space-y-4">
                    <h2 className="font-editorial text-2xl text-[#F5F2E9]">
                      Backup & Restore Cookbook JSON
                    </h2>
                    <p className="text-xs text-[#B3B5AA]">
                      Export your saved recipes, custom collections, meal plans, and shopping lists as a JSON file, or paste a backup below.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        const data = exportLocalData();
                        const blob = new Blob([data], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'cookly-cookbook-backup.json';
                        a.click();
                        addToast('Downloaded Cookly JSON backup');
                      }}
                      className="w-full py-3 rounded-xl bg-[#20231F] hover:bg-[#282C26] border border-[#B8C58A]/30 text-xs font-semibold text-[#B8C58A] flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Export Local Data (.JSON)
                    </button>

                    <textarea
                      rows={3}
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      placeholder="Paste exported Cookly JSON here to restore..."
                      className="w-full p-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/10 text-xs font-mono text-[#F5F2E9]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (importLocalData(importText)) setImportText('');
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#282C26] text-xs font-semibold text-[#E9DFC7]"
                    >
                      Restore from JSON
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

        {/* ================= 13. FOOTER INFO PAGES ================= */}
        {route.page === 'info' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
            <h1 className="font-editorial text-4xl text-[#F5F2E9] capitalize">
              {route.section === 'pwa' ? 'Offline & PWA Capabilities' : `${route.section} Cookly`}
            </h1>
            <div className="p-6 rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 space-y-4 text-sm text-[#B3B5AA] leading-relaxed">
              {route.section === 'about' && (
                <p>
                  Cookly combines the visual richness of an editorial food magazine with a practical kitchen companion. Every recipe is structured with nested categories, dynamic fractional ingredient scaling, and an interactive step-by-step cooking mode.
                </p>
              )}
              {route.section === 'privacy' && (
                <p>
                  Cookly runs 100% in your browser. We do not use tracking cookies, cloud databases, or external analytics servers. Clearing your browser storage will remove locally saved data unless backed up via the JSON Export tool.
                </p>
              )}
              {route.section === 'terms' && (
                <p>
                  Nutritional values are approximate estimates for general informational reference only and should not be treated as clinical dietary calculations.
                </p>
              )}
              {route.section === 'pwa' && (
                <p>
                  Cookly registers a Service Worker (`sw.js`) and Web App Manifest (`manifest.json`). Once loaded over localhost or HTTPS, you can install Cookly to your home screen or desktop and browse cached recipes, shopping lists, and timers offline.
                </p>
              )}
              {route.section === 'feedback' && (
                <p>
                  Since this is a serverless frontend architecture, feedback forms do not transmit to a remote backend. Use the button below to copy a formatted feedback template to your clipboard.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ================= 14. SAAS PRICING & PRO PLANS ================= */}
        {route.page === 'pricing' && (
          <PricingPage onNavigate={(p) => setRoute({ page: p as any })} />
        )}
      </main>

      {/* KITCHEN CONVERSION UTILITY MODAL */}
      {showConverterModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-[#171916] border border-[#F5F2E9]/15 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-2xl text-[#F5F2E9]">
                Kitchen Conversion Tools
              </h3>
              <button
                type="button"
                onClick={() => setShowConverterModal(false)}
                className="text-[#82877B] hover:text-[#F5F2E9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#20231F] space-y-2">
                <label className="text-xs text-[#B8C58A] font-semibold flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4" /> Oven Temperature (°C to °F)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={celsiusInput}
                    onChange={(e) => setCelsiusInput(e.target.value)}
                    className="w-24 px-3 py-2 rounded-xl bg-[#171916] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9]"
                  />
                  <span className="text-sm text-[#B3B5AA]">
                    °C ={' '}
                    <strong className="text-[#E9DFC7]">
                      {Math.round((Number(celsiusInput) * 9) / 5 + 32)} °F
                    </strong>
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#20231F] space-y-2">
                <label className="text-xs text-[#B8C58A] font-semibold flex items-center gap-1.5">
                  <Scale className="w-4 h-4" /> Liquid Volume (US Cups to Milliliters & Tbsp)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.25"
                    value={cupsInput}
                    onChange={(e) => setCupsInput(e.target.value)}
                    className="w-24 px-3 py-2 rounded-xl bg-[#171916] border border-[#F5F2E9]/10 text-sm text-[#F5F2E9]"
                  />
                  <span className="text-sm text-[#B3B5AA]">
                    cups ={' '}
                    <strong className="text-[#E9DFC7]">
                      {Math.round(Number(cupsInput) * 240)} ml
                    </strong>{' '}
                    ({Math.round(Number(cupsInput) * 16)} tbsp)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OPTIONAL FIRST-SAVE PROMPT MODAL */}
      {showSavePromptModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-[#171916] border border-[#B8C58A]/30 p-6 space-y-4">
            <h3 className="font-editorial text-2xl text-[#F5F2E9]">
              Want to keep this recipe in your cookbook?
            </h3>
            <p className="text-xs text-[#B3B5AA] leading-relaxed">
              Your dish has already been saved locally in this browser. Would you like to set up an optional local profile to organize custom collections?
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowSavePromptModal(false);
                  setRoute({ page: 'profile' });
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#B8C58A] text-[#10110F] font-semibold text-xs"
              >
                Create Optional Local Profile
              </button>
              <button
                type="button"
                onClick={() => setShowSavePromptModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#20231F] text-[#E9DFC7] text-xs"
              >
                Continue Locally Without Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATIONS */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 no-print">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="px-4 py-3 rounded-xl bg-[#20231F] border border-[#B8C58A]/40 text-xs font-medium text-[#F5F2E9] shadow-xl flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#B8C58A]" />
            <span>{t.text}</span>
          </div>
        ))}
      </div>

      {/* GLOBAL SAAS FOOTER */}
      {route.page !== 'cooking' && (
        <Footer
          onNavigate={(page, params) => setRoute({ page, ...params } as RouteState)}
          onOpenFeedback={() => setShowFeedbackModal(true)}
        />
      )}

      {/* MOBILE BOTTOM NAVIGATION (TOUCH OPTIMIZED PWA) */}
      {route.page !== 'cooking' && (
        <MobileBottomNav
          currentPage={route.page}
          onNavigate={(page) => setRoute({ page: page as any })}
          onOpenAiChef={() => setShowAiChefDrawer(true)}
        />
      )}

      {/* MICHELIN AI CHEF ASSISTANT DRAWER */}
      <AiChefDrawer
        isOpen={showAiChefDrawer}
        onClose={() => setShowAiChefDrawer(false)}
        activeRecipe={route.page === 'recipe' ? recipes.find((r) => r.id === (route as any).recipeId) : undefined}
      />

      {/* COMMAND PALETTE SEARCH MODAL (CTRL+K) */}
      <CommandPaletteModal
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onSelectRecipe={(r) => navigateToRecipe(r)}
        onNavigate={(page, params) => setRoute({ page: page as any, ...params })}
      />

      {/* SUPPORT & FEEDBACK MODAL */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />
    </div>
  );
};