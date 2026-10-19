import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ChefChatMessage,
  CustomCollection,
  LocalProfile,
  MacroTargets,
  MealPlanEntry,
  Recipe,
  ShoppingItem,
  SubscriptionState,
  SubscriptionTier,
  SupportTicket
} from '../types';
import { INITIAL_RECIPES } from '../data/recipes';

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

interface CooklyContextType {
  recipes: Recipe[];
  savedRecipeIds: string[];
  toggleSaveRecipe: (id: string, onFirstSavePrompt?: () => void) => void;
  collections: CustomCollection[];
  createCollection: (name: string, description: string) => void;
  deleteCollection: (id: string) => void;
  toggleRecipeInCollection: (collectionId: string, recipeId: string) => void;
  recipeNotes: Record<string, string>;
  saveRecipeNote: (recipeId: string, note: string) => void;
  ingredientChecklists: Record<string, string[]>;
  toggleIngredientChecked: (recipeId: string, ingredientName: string) => void;
  shoppingList: ShoppingItem[];
  addShoppingItems: (items: Omit<ShoppingItem, 'id' | 'checked'>[]) => void;
  toggleShoppingItem: (id: string) => void;
  removeShoppingItem: (id: string) => void;
  clearCompletedShopping: () => void;
  clearAllShopping: () => void;
  mealPlan: MealPlanEntry[];
  addMealPlanEntry: (entry: Omit<MealPlanEntry, 'id'>) => void;
  removeMealPlanEntry: (id: string) => void;
  generateShoppingListFromWeek: (weekStartISO: string) => void;
  profile: LocalProfile | null;
  saveProfile: (profile: LocalProfile | null) => void;
  addCustomRecipe: (recipe: Recipe) => void;
  deleteCustomRecipe: (id: string) => void;
  recentlyViewedIds: string[];
  recordRecipeView: (id: string) => void;
  recentlyCookedIds: string[];
  recordRecipeCooked: (id: string) => void;
  toasts: ToastMessage[];
  addToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  exportLocalData: () => string;
  importLocalData: (jsonString: string) => boolean;

  // SaaS Features
  subscription: SubscriptionState;
  upgradePlan: (tier: SubscriptionTier, cycle?: 'monthly' | 'annual') => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  macroTargets: MacroTargets;
  updateMacroTargets: (targets: MacroTargets) => void;
  chefChatHistory: ChefChatMessage[];
  sendChefQuery: (query: string, currentRecipe?: Recipe) => Promise<void>;
  clearChefChat: () => void;
  syncStatus: 'synced' | 'syncing' | 'offline';
  lastSyncedAt: string;
  triggerCloudSync: () => Promise<void>;
  unitSystem: 'metric' | 'imperial';
  toggleUnitSystem: () => void;
  newsletterEmail: string | null;
  subscribeNewsletter: (email: string) => boolean;
  submitFeedback: (ticket: Omit<SupportTicket, 'id' | 'createdAt'>) => void;
}

const CooklyContext = createContext<CooklyContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CUSTOM_RECIPES: 'cookly_custom_recipes_v1',
  SAVED_IDS: 'cookly_saved_ids_v1',
  COLLECTIONS: 'cookly_collections_v1',
  NOTES: 'cookly_notes_v1',
  CHECKLISTS: 'cookly_checklists_v1',
  SHOPPING: 'cookly_shopping_v1',
  MEAL_PLAN: 'cookly_meal_plan_v1',
  PROFILE: 'cookly_profile_v1',
  RECENT_VIEWED: 'cookly_recent_viewed_v1',
  RECENT_COOKED: 'cookly_recent_cooked_v1',
  HAS_SEEN_SAVE_PROMPT: 'cookly_seen_save_prompt_v1',
  SUBSCRIPTION: 'cookly_subscription_v1',
  MACROS: 'cookly_macros_v1',
  CHEF_CHAT: 'cookly_chef_chat_v1',
  UNIT_SYSTEM: 'cookly_unit_system_v1',
  NEWSLETTER: 'cookly_newsletter_v1',
  LAST_SYNC: 'cookly_last_sync_v1'
};

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const CooklyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>(() =>
    loadJSON(STORAGE_KEYS.CUSTOM_RECIPES, [])
  );
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>(() =>
    loadJSON(STORAGE_KEYS.SAVED_IDS, ['rec-butter-chicken', 'rec-truffle-cacio-e-pepe'])
  );
  const [collections, setCollections] = useState<CustomCollection[]>(() =>
    loadJSON(STORAGE_KEYS.COLLECTIONS, [
      {
        id: 'col-weeknight',
        name: 'Weeknight Rotation',
        description: 'Go-to dinners that never fail after a busy day.',
        recipeIds: ['rec-truffle-cacio-e-pepe', 'rec-dan-dan-noodles'],
        createdAt: new Date().toISOString()
      }
    ])
  );
  const [recipeNotes, setRecipeNotes] = useState<Record<string, string>>(() =>
    loadJSON(STORAGE_KEYS.NOTES, {})
  );
  const [ingredientChecklists, setIngredientChecklists] = useState<Record<string, string[]>>(() =>
    loadJSON(STORAGE_KEYS.CHECKLISTS, {})
  );
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() =>
    loadJSON(STORAGE_KEYS.SHOPPING, [
      {
        id: 'shop-1',
        name: 'Kasuri methi (dried fenugreek leaves)',
        quantity: 1,
        unit: 'tbsp',
        category: 'Pantry & Spices',
        checked: false,
        sourceRecipeId: 'rec-butter-chicken',
        sourceRecipeName: 'Old Delhi Style Murgh Makhani'
      }
    ])
  );
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>(() =>
    loadJSON(STORAGE_KEYS.MEAL_PLAN, [
      {
        id: 'mp-1',
        weekStartISO: '2026-10-19',
        day: 'Monday',
        slot: 'Dinner',
        recipeId: 'rec-truffle-cacio-e-pepe'
      },
      {
        id: 'mp-2',
        weekStartISO: '2026-10-19',
        day: 'Wednesday',
        slot: 'Dinner',
        recipeId: 'rec-butter-chicken'
      },
      {
        id: 'mp-3',
        weekStartISO: '2026-10-19',
        day: 'Saturday',
        slot: 'Breakfast',
        recipeId: 'rec-masala-dosa'
      }
    ])
  );
  const [profile, setProfile] = useState<LocalProfile | null>(() =>
    loadJSON(STORAGE_KEYS.PROFILE, {
      displayName: 'Chef Alex',
      avatar: '👨‍🍳',
      dietaryPreferences: [],
      preferredSkillLevel: 'All',
      createdAt: new Date().toISOString(),
      subscription: {
        tier: 'pro',
        billingCycle: 'annual',
        isActive: true,
        trialDaysRemaining: 14
      },
      preferredUnit: 'metric'
    })
  );
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() =>
    loadJSON(STORAGE_KEYS.RECENT_VIEWED, ['rec-butter-chicken', 'rec-spicy-miso-ramen'])
  );
  const [recentlyCookedIds, setRecentlyCookedIds] = useState<string[]>(() =>
    loadJSON(STORAGE_KEYS.RECENT_COOKED, ['rec-masala-dosa'])
  );
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // SaaS States
  const [subscription, setSubscription] = useState<SubscriptionState>(() =>
    loadJSON(STORAGE_KEYS.SUBSCRIPTION, {
      tier: 'pro',
      billingCycle: 'annual',
      isActive: true,
      trialDaysRemaining: 14
    })
  );

  const [macroTargets, setMacroTargets] = useState<MacroTargets>(() =>
    loadJSON(STORAGE_KEYS.MACROS, {
      dailyCalories: 2150,
      dailyProteinGrams: 130,
      dailyCarbsGrams: 220,
      dailyFatGrams: 65
    })
  );

  const [chefChatHistory, setChefChatHistory] = useState<ChefChatMessage[]>(() =>
    loadJSON(STORAGE_KEYS.CHEF_CHAT, [
      {
        id: 'chef-welcome',
        role: 'assistant',
        content:
          "Bonjour! I'm Pierre, your AI Culinary Sommelier & Executive Chef companion. Ask me for smart substitutions, wine pairings, technique troubleshooting, or portion scaling!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          '🍷 Suggest wine pairing',
          '🥑 Make this dairy-free',
          '⏱️ How to rescue salty sauce',
          '💪 High-protein tweak'
        ]
      }
    ])
  );

  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced');
  const [lastSyncedAt, setLastSyncedAt] = useState<string>(() =>
    loadJSON(STORAGE_KEYS.LAST_SYNC, 'Just now')
  );

  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(() =>
    loadJSON(STORAGE_KEYS.UNIT_SYSTEM, 'metric')
  );

  const [newsletterEmail, setNewsletterEmail] = useState<string | null>(() =>
    loadJSON(STORAGE_KEYS.NEWSLETTER, null)
  );

  const recipes = [...customRecipes, ...INITIAL_RECIPES];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_RECIPES, JSON.stringify(customRecipes));
      localStorage.setItem(STORAGE_KEYS.SAVED_IDS, JSON.stringify(savedRecipeIds));
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(recipeNotes));
      localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(ingredientChecklists));
      localStorage.setItem(STORAGE_KEYS.SHOPPING, JSON.stringify(shoppingList));
      localStorage.setItem(STORAGE_KEYS.MEAL_PLAN, JSON.stringify(mealPlan));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      localStorage.setItem(STORAGE_KEYS.RECENT_VIEWED, JSON.stringify(recentlyViewedIds));
      localStorage.setItem(STORAGE_KEYS.RECENT_COOKED, JSON.stringify(recentlyCookedIds));
      localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(subscription));
      localStorage.setItem(STORAGE_KEYS.MACROS, JSON.stringify(macroTargets));
      localStorage.setItem(STORAGE_KEYS.CHEF_CHAT, JSON.stringify(chefChatHistory));
      localStorage.setItem(STORAGE_KEYS.UNIT_SYSTEM, JSON.stringify(unitSystem));
      localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(newsletterEmail));
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, JSON.stringify(lastSyncedAt));
    } catch {
      // Handle quota gracefully
    }
  }, [
    customRecipes,
    savedRecipeIds,
    collections,
    recipeNotes,
    ingredientChecklists,
    shoppingList,
    mealPlan,
    profile,
    recentlyViewedIds,
    recentlyCookedIds,
    subscription,
    macroTargets,
    chefChatHistory,
    unitSystem,
    newsletterEmail,
    lastSyncedAt
  ]);

  const addToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3400);
  };

  const toggleSaveRecipe = (id: string, onFirstSavePrompt?: () => void) => {
    const isSaved = savedRecipeIds.includes(id);
    if (isSaved) {
      setSavedRecipeIds((prev) => prev.filter((item) => item !== id));
      addToast('Removed from your local cookbook', 'info');
    } else {
      setSavedRecipeIds((prev) => [id, ...prev]);
      addToast('Saved to your personal cookbook');
      const seenPrompt = localStorage.getItem(STORAGE_KEYS.HAS_SEEN_SAVE_PROMPT);
      if (!seenPrompt && !profile && onFirstSavePrompt) {
        localStorage.setItem(STORAGE_KEYS.HAS_SEEN_SAVE_PROMPT, 'true');
        onFirstSavePrompt();
      }
    }
  };

  const createCollection = (name: string, description: string) => {
    const newCol: CustomCollection = {
      id: 'col-' + Date.now(),
      name: name.trim(),
      description: description.trim() || 'Curated personal collection',
      recipeIds: [],
      createdAt: new Date().toISOString()
    };
    setCollections((prev) => [newCol, ...prev]);
    addToast(`Created collection "${newCol.name}"`);
  };

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
    addToast('Collection deleted', 'info');
  };

  const toggleRecipeInCollection = (collectionId: string, recipeId: string) => {
    setCollections((prev) =>
      prev.map((col) => {
        if (col.id !== collectionId) return col;
        const exists = col.recipeIds.includes(recipeId);
        return {
          ...col,
          recipeIds: exists
            ? col.recipeIds.filter((r) => r !== recipeId)
            : [...col.recipeIds, recipeId]
        };
      })
    );
    addToast('Updated collection');
  };

  const saveRecipeNote = (recipeId: string, note: string) => {
    setRecipeNotes((prev) => ({ ...prev, [recipeId]: note }));
    addToast('Private cooking note saved locally');
  };

  const toggleIngredientChecked = (recipeId: string, ingredientName: string) => {
    setIngredientChecklists((prev) => {
      const current = prev[recipeId] || [];
      const exists = current.includes(ingredientName);
      return {
        ...prev,
        [recipeId]: exists
          ? current.filter((i) => i !== ingredientName)
          : [...current, ingredientName]
      };
    });
  };

  const addShoppingItems = (items: Omit<ShoppingItem, 'id' | 'checked'>[]) => {
    setShoppingList((prev) => {
      const updated = [...prev];
      items.forEach((incoming) => {
        const matchIndex = updated.findIndex(
          (existing) =>
            existing.name.toLowerCase() === incoming.name.toLowerCase() &&
            existing.unit.toLowerCase() === incoming.unit.toLowerCase() &&
            !existing.checked
        );
        if (
          matchIndex > -1 &&
          updated[matchIndex].quantity !== null &&
          incoming.quantity !== null
        ) {
          updated[matchIndex] = {
            ...updated[matchIndex],
            quantity: Number((updated[matchIndex].quantity! + incoming.quantity).toFixed(2))
          };
        } else {
          updated.push({
            ...incoming,
            id: 'shop-' + Math.random().toString(36).slice(2, 9),
            checked: false
          });
        }
      });
      return updated;
    });
    addToast(`Added ${items.length} item${items.length > 1 ? 's' : ''} to Shopping List`);
  };

  const toggleShoppingItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const removeShoppingItem = (id: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompletedShopping = () => {
    setShoppingList((prev) => prev.filter((item) => !item.checked));
    addToast('Cleared purchased items', 'info');
  };

  const clearAllShopping = () => {
    setShoppingList([]);
    addToast('Shopping list cleared', 'info');
  };

  const addMealPlanEntry = (entry: Omit<MealPlanEntry, 'id'>) => {
    setMealPlan((prev) => {
      const filtered = prev.filter(
        (e) =>
          !(
            e.weekStartISO === entry.weekStartISO &&
            e.day === entry.day &&
            e.slot === entry.slot
          )
      );
      return [...filtered, { ...entry, id: 'mp-' + Date.now() }];
    });
    addToast(`Added to ${entry.day} ${entry.slot}`);
  };

  const removeMealPlanEntry = (id: string) => {
    setMealPlan((prev) => prev.filter((e) => e.id !== id));
    addToast('Removed from meal plan', 'info');
  };

  const generateShoppingListFromWeek = (weekStartISO: string) => {
    const entries = mealPlan.filter((e) => e.weekStartISO === weekStartISO);
    if (entries.length === 0) {
      addToast('No meals planned for this week yet', 'error');
      return;
    }
    const itemsToAdd: Omit<ShoppingItem, 'id' | 'checked'>[] = [];
    entries.forEach((entry) => {
      const found = recipes.find((r) => r.id === entry.recipeId);
      if (found) {
        found.ingredients.forEach((ing) => {
          itemsToAdd.push({
            name: ing.name,
            quantity: ing.quantity,
            unit: ing.unit,
            category: ing.category,
            sourceRecipeId: found.id,
            sourceRecipeName: found.name
          });
        });
      }
    });
    addShoppingItems(itemsToAdd);
  };

  const saveProfile = (newProfile: LocalProfile | null) => {
    setProfile(newProfile);
    if (newProfile) {
      addToast(`Profile saved for ${newProfile.displayName}`);
    } else {
      addToast('Local profile cleared', 'info');
    }
  };

  const addCustomRecipe = (recipe: Recipe) => {
    setCustomRecipes((prev) => [recipe, ...prev]);
    setSavedRecipeIds((prev) => [recipe.id, ...prev]);
    addToast(`Created "${recipe.name}" in your personal library`);
  };

  const deleteCustomRecipe = (id: string) => {
    setCustomRecipes((prev) => prev.filter((r) => r.id !== id));
    setSavedRecipeIds((prev) => prev.filter((rid) => rid !== id));
    addToast('Deleted personal recipe', 'info');
  };

  const recordRecipeView = (id: string) => {
    setRecentlyViewedIds((prev) => [id, ...prev.filter((item) => item !== id)].slice(0, 10));
  };

  const recordRecipeCooked = (id: string) => {
    setRecentlyCookedIds((prev) => [id, ...prev.filter((item) => item !== id)].slice(0, 10));
  };

  // SaaS methods
  const upgradePlan = (tier: SubscriptionTier, cycle: 'monthly' | 'annual' = 'annual') => {
    setSubscription({
      tier,
      billingCycle: cycle,
      isActive: true,
      trialDaysRemaining: 14,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    });
    addToast(`Plan updated to Cookly ${tier.toUpperCase()} (${cycle})!`, 'success');
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CHEF2026' || clean === 'COOKLYPRO' || clean === 'VIPCOOK') {
      setSubscription({
        tier: 'pro',
        billingCycle: 'annual',
        isActive: true,
        trialDaysRemaining: 30,
        promoCodeUsed: clean,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      });
      addToast(`Promo code "${clean}" applied! 1 Year of Cookly Pro unlocked.`, 'success');
      return { success: true, message: `Code ${clean} activated! 1 Year Free Cookly Pro.` };
    }
    addToast('Invalid promo code. Try CHEF2026 or COOKLYPRO', 'error');
    return { success: false, message: 'Invalid or expired code. Try CHEF2026.' };
  };

  const updateMacroTargets = (targets: MacroTargets) => {
    setMacroTargets(targets);
    addToast('Daily nutritional macro goals updated!');
  };

  const toggleUnitSystem = () => {
    const next = unitSystem === 'metric' ? 'imperial' : 'metric';
    setUnitSystem(next);
    addToast(`Switched units to ${next.toUpperCase()} (g/ml vs oz/cups)`);
  };

  const subscribeNewsletter = (email: string) => {
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return false;
    }
    setNewsletterEmail(email.trim());
    addToast(`Subscribed ${email.trim()} to Weekly Culinary Digest!`, 'success');
    return true;
  };

  const submitFeedback = (ticket: Omit<SupportTicket, 'id' | 'createdAt'>) => {
    addToast(`Feedback received (#${Math.random().toString(36).slice(2, 7)}). Thank you!`, 'success');
  };

  const triggerCloudSync = async () => {
    setSyncStatus('syncing');
    await new Promise((resolve) => setTimeout(resolve, 800));
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSyncedAt(`Synced at ${now}`);
    setSyncStatus('synced');
    addToast('Cookbook & meal plan backed up to cloud vault.', 'success');
  };

  // AI Chef Query Engine
  const sendChefQuery = async (query: string, currentRecipe?: Recipe) => {
    const userMsg: ChefChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recipeContextName: currentRecipe?.name
    };

    setChefChatHistory((prev) => [...prev, userMsg]);

    // Generate intelligent culinary response
    const q = query.toLowerCase();
    let reply = '';
    let quickActions: string[] | undefined = undefined;

    if (q.includes('wine') || q.includes('pair') || q.includes('drink')) {
      if (currentRecipe?.winePairing) {
        reply = `For ${currentRecipe.name}, our sommelier pairing recommendation is: ${currentRecipe.winePairing}. The acidity and structure balance the richness seamlessly!`;
      } else if (q.includes('pasta') || q.includes('cacio') || q.includes('cheese')) {
        reply = "With rich cheese and pepper pastas, uncork a crisp high-acid Italian white like Verdicchio, or an elegant Nebbiolo / Barbera with gentle tannins to cut through the Pecorino fats.";
      } else if (q.includes('chicken') || q.includes('butter chicken') || q.includes('curry')) {
        reply = "For spiced gravies like Murgh Makhani, choose an off-dry Riesling or an aromatic Gewürztraminer. The touch of residual fruit sweetness tames the warmth of fenugreek and garam masala!";
      } else {
        reply = "As a general sommelier rule: match richness with acidity, spice with gentle fruit sweetness (off-dry Riesling or fruity Pinot Noir), and earthy umami with aged medium-tannin reds like Chianti Classico.";
      }
      quickActions = ['What about a beer pairing?', 'Non-alcoholic pairing idea?', 'How about dessert wine?'];
    } else if (q.includes('substitut') || q.includes('replace') || q.includes('instead of')) {
      if (q.includes('cream') || q.includes('dairy')) {
        reply = "To replace heavy cream: use full-fat canned coconut milk (subtle coconut note), or blend soaked raw cashews with hot water until velvety smooth (1:1 ratio). For everyday cooking, Greek yogurt whisked with a splash of milk works wonders!";
      } else if (q.includes('egg')) {
        reply = "For binding in baking: 1 tbsp ground flaxseed + 3 tbsp warm water (let sit 5 mins). For moisture in cakes: 1/4 cup unsweetened applesauce or mashed ripe banana per egg.";
      } else if (q.includes('buttermilk')) {
        reply = "Instant chef buttermilk: Stir 1 tablespoon of fresh lemon juice or white vinegar into 1 cup of whole milk. Rest for 8 minutes until slightly thickened and curdled.";
      } else if (q.includes('butter')) {
        reply = "Substitute butter with extra virgin olive oil (use 3/4 the volume), ghee for higher smoke point, or refined coconut oil for dairy-free baking.";
      } else {
        reply = "Great substitution question! In culinary balance, identify the ingredient's core role: Fat (richness), Acid (brightness), Starch (binding), or Aromatics. Let me know which exact ingredient you need to swap!";
      }
      quickActions = ['Dairy-free alternative?', 'Gluten-free flour blend?', 'Low-sodium seasoning?'];
    } else if (q.includes('salty') || q.includes('too salt') || q.includes('rescue')) {
      reply = "To fix an over-salted sauce or stew: 1) Add an acid (a squeeze of fresh lemon juice or rice vinegar cuts perceived saltiness). 2) Dilute with unsalted liquid (cream, unsalted broth, or coconut milk). 3) Simmer thick potato wedges for 15 minutes to absorb sodium, then remove before serving.";
      quickActions = ['How to fix bitter food?', 'How to tone down spicy heat?', 'Sauce too watery?'];
    } else if (q.includes('protein') || q.includes('macro') || q.includes('calorie')) {
      reply = `To boost protein without increasing cooking difficulty: fold in unflavored Greek yogurt, add silken tofu to creamy sauces, top with toasted pumpkin seeds, or incorporate cooked edamame and tender shredded poultry!`;
      quickActions = ['High-protein meal ideas', 'Track daily macros', 'Low carb tweaks'];
    } else if (q.includes('scale') || q.includes('portion') || q.includes('double')) {
      reply = "When scaling up recipes: multiply base ingredients (vegetables, proteins, liquids) by 2x, but scale whole spices, pungent aromatics (cloves, chili), and salt by 1.6x–1.7x first. Season to taste near the end so flavors don't overpower!";
      quickActions = ['Does cook time double?', 'Pan size recommendations'];
    } else {
      reply = `Superb question! When preparing ${currentRecipe ? currentRecipe.name : 'gourmet meals'}, precision in heat management and ingredient moisture is paramount. Would you like a flavor-pairing recommendation, cooking step breakdown, or storage advice?`;
      quickActions = ['🍷 Wine & Drink Pairings', '⏱️ Precision Cooking Timers', '🥗 Side Dish Pairings'];
    }

    const assistantMsg: ChefChatMessage = {
      id: 'msg-' + (Date.now() + 1),
      role: 'assistant',
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions
    };

    setChefChatHistory((prev) => [...prev, assistantMsg]);
  };

  const clearChefChat = () => {
    setChefChatHistory([
      {
        id: 'chef-welcome',
        role: 'assistant',
        content:
          "Chat reset! Ask me anything about recipes, cooking techniques, wine pairings, or ingredient substitutions.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          '🍷 Suggest wine pairing',
          '🥑 Make this dairy-free',
          '⏱️ How to rescue salty sauce',
          '💪 High-protein tweak'
        ]
      }
    ]);
  };

  const exportLocalData = () => {
    const payload = {
      version: 2,
      exportedAt: new Date().toISOString(),
      customRecipes,
      savedRecipeIds,
      collections,
      recipeNotes,
      shoppingList,
      mealPlan,
      profile,
      subscription,
      macroTargets
    };
    return JSON.stringify(payload, null, 2);
  };

  const importLocalData = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.savedRecipeIds)) {
        addToast('Invalid Cookly backup file format', 'error');
        return false;
      }
      if (Array.isArray(parsed.customRecipes)) setCustomRecipes(parsed.customRecipes);
      if (Array.isArray(parsed.savedRecipeIds)) setSavedRecipeIds(parsed.savedRecipeIds);
      if (Array.isArray(parsed.collections)) setCollections(parsed.collections);
      if (parsed.recipeNotes) setRecipeNotes(parsed.recipeNotes);
      if (Array.isArray(parsed.shoppingList)) setShoppingList(parsed.shoppingList);
      if (Array.isArray(parsed.mealPlan)) setMealPlan(parsed.mealPlan);
      if (parsed.profile !== undefined) setProfile(parsed.profile);
      if (parsed.subscription) setSubscription(parsed.subscription);
      if (parsed.macroTargets) setMacroTargets(parsed.macroTargets);
      addToast('Successfully restored your Cookly data & SaaS tier!');
      return true;
    } catch {
      addToast('Could not parse JSON backup file', 'error');
      return false;
    }
  };

  return (
    <CooklyContext.Provider
      value={{
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
        importLocalData,

        // SaaS
        subscription,
        upgradePlan,
        applyPromoCode,
        macroTargets,
        updateMacroTargets,
        chefChatHistory,
        sendChefQuery,
        clearChefChat,
        syncStatus,
        lastSyncedAt,
        triggerCloudSync,
        unitSystem,
        toggleUnitSystem,
        newsletterEmail,
        subscribeNewsletter,
        submitFeedback
      }}
    >
      {children}
    </CooklyContext.Provider>
  );
};

export const useCookly = () => {
  const ctx = useContext(CooklyContext);
  if (!ctx) throw new Error('useCookly must be used inside CooklyProvider');
  return ctx;
};