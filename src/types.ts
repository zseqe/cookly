export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type DietaryTag =
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-Free'
  | 'Dairy-Free'
  | 'Egg-Free'
  | 'High-Protein';

export type MealType =
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Starters'
  | 'Main courses'
  | 'Snacks'
  | 'Desserts'
  | 'Beverages'
  | 'Soups'
  | 'Salads'
  | 'Breads'
  | 'Rice dishes'
  | 'Pasta and noodles';

export interface Ingredient {
  name: string;
  quantity: number | null; // null for qualitative ("to taste", "pinch")
  unit: string;
  category: 'Produce' | 'Dairy & Eggs' | 'Meat & Seafood' | 'Pantry & Spices' | 'Bakery & Grains';
  optional?: boolean;
  qualitativeNote?: string;
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  instruction: string;
  durationMinutes?: number;
  relevantIngredients?: string[];
}

export interface NutritionEstimate {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  heroImage: string;
  cuisine: string;
  subcategory: string; // e.g., "North Indian", "Pasta", "Ramen"
  foodGroup: 'Savory' | 'Sweet' | 'Drinks';
  mealTypes: MealType[];
  dietaryTags: DietaryTag[];
  moodCollections: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  restingTimeMinutes?: number;
  servings: number;
  difficulty: Difficulty;
  rating: number;
  isTrending?: boolean;
  isSeasonalPick?: boolean;
  seasonalLabel?: string;
  isUserCreated?: boolean;
  ingredients: Ingredient[];
  steps: CookingStep[];
  tipsAndSubstitutions: string[];
  allergens: string[];
  nutrition: NutritionEstimate;
  winePairing?: string;
  chefProTip?: string;
}

export interface CustomCollection {
  id: string;
  name: string;
  description: string;
  recipeIds: string[];
  createdAt: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number | null;
  unit: string;
  category: Ingredient['category'];
  checked: boolean;
  sourceRecipeId?: string;
  sourceRecipeName?: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type PlannerSlot = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface MealPlanEntry {
  id: string;
  weekStartISO: string; // e.g. "2026-10-19"
  day: DayOfWeek;
  slot: PlannerSlot;
  recipeId: string;
}

export type SubscriptionTier = 'free' | 'pro' | 'family';
export type BillingCycle = 'monthly' | 'annual';

export interface SubscriptionState {
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  isActive: boolean;
  expiresAt?: string;
  trialDaysRemaining?: number;
  promoCodeUsed?: string;
}

export interface MacroTargets {
  dailyCalories: number;
  dailyProteinGrams: number;
  dailyCarbsGrams: number;
  dailyFatGrams: number;
}

export interface LocalProfile {
  displayName: string;
  avatar: string;
  dietaryPreferences: DietaryTag[];
  preferredSkillLevel: Difficulty | 'All';
  createdAt: string;
  subscription?: SubscriptionState;
  macroTargets?: MacroTargets;
  preferredUnit?: 'metric' | 'imperial';
}

export interface ChefChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  recipeContextName?: string;
  quickActions?: string[];
}

export interface SupportTicket {
  id: string;
  email: string;
  category: 'Question' | 'Bug' | 'Feature Request' | 'Recipe Suggestion';
  message: string;
  rating?: number;
  createdAt: string;
}