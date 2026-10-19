import { Recipe } from '../types';

export interface CuisineMeta {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories: string[];
}

export const CUISINES_META: CuisineMeta[] = [
  {
    id: 'Italian',
    name: 'Italian',
    description: 'Silky handmade pastas, slow-simmered ragùs, crisp wood-fired crusts, and creamy dolce classics.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=80',
    subcategories: ['Pasta', 'Risotto', 'Pizza', 'Lasagna', 'Italian soups', 'Italian desserts']
  },
  {
    id: 'Indian',
    name: 'Indian',
    description: 'Aromatic whole spices, rich clay-oven gravies, fermented crispy dosas, and fragrant royal biryanis.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80',
    subcategories: ['North Indian', 'South Indian', 'Biryani and rice', 'Indian breads', 'Street food', 'Indian desserts']
  },
  {
    id: 'Japanese',
    name: 'Japanese',
    description: 'Umami-rich dashi broths, delicate sushi rice, crisp tempura, and soulful late-night ramen bowls.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
    subcategories: ['Ramen', 'Sushi', 'Rice bowls', 'Tempura', 'Japanese desserts']
  },
  {
    id: 'Chinese',
    name: 'Chinese',
    description: 'High-heat wok hei stir-fries, hand-pleated dumplings, silky mapo tofu, and aromatic chili oil noodles.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
    subcategories: ['Noodles', 'Fried rice', 'Dumplings', 'Stir-fries', 'Soups']
  },
  {
    id: 'Mexican',
    name: 'Mexican',
    description: 'Charred tomatillo salsas, smoky chipotle adobos, pressed corn tortillas, and vibrant street tacos.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1000&q=80',
    subcategories: ['Tacos', 'Quesadillas', 'Enchiladas', 'Burritos', 'Salsas']
  },
  {
    id: 'Thai',
    name: 'Thai',
    description: 'Harmonious balance of sweet palm sugar, tangy tamarind, aromatic galangal, and fiery bird’s eye chilies.',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1000&q=80',
    subcategories: ['Curries', 'Stir-fried noodles', 'Soups', 'Salads', 'Thai desserts']
  },
  {
    id: 'Mediterranean',
    name: 'Mediterranean',
    description: 'Sun-ripened tomatoes, cold-pressed olive oil, charred lemon, wild oregano, and coastal grains.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1000&q=80',
    subcategories: ['Mezze & dips', 'Grilled mains', 'Grain bowls', 'Fresh salads', 'Flatbreads']
  },
  {
    id: 'Korean',
    name: 'Korean',
    description: 'Fermented gochujang heat, sizzling stone-pot bibimbap, crispy glazed bites, and savory kimchi stews.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1000&q=80',
    subcategories: ['Rice bowls', 'Stews', 'Korean BBQ', 'Street snacks', 'Noodles']
  },
  {
    id: 'Middle Eastern',
    name: 'Middle Eastern',
    description: 'Silky tahini emulsions, sumac-dusted flatbreads, spiced chickpeas, and fragrant rosewater pastries.',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1000&q=80',
    subcategories: ['Mezze', 'Skillet eggs', 'Shawarma & grills', 'Pilafs', 'Sweets']
  },
  {
    id: 'French',
    name: 'French',
    description: 'Butter-basted classics, caramelized onion broths, flaky laminated pastries, and bistro elegance.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    subcategories: ['Bistro mains', 'French soups', 'Pastries', 'Custards & tarts', 'Sauces']
  },
  {
    id: 'American',
    name: 'American',
    description: 'Crispy smashed skillet classics, buttermilk stacks, smoky slow-braised comfort, and bakery cookies.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    subcategories: ['Burgers & sandwiches', 'Brunch classics', 'Mac & cheese', 'Baking', 'Skillet dinners']
  }
];

export interface EditorialCollectionMeta {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
}

export const EDITORIAL_COLLECTIONS: EditorialCollectionMeta[] = [
  {
    id: 'Comfort food',
    title: 'Comfort Food',
    subtitle: 'Warm bowls & nostalgic classics',
    description: 'Rich, velvety sauces, slow-simmered broths, and indulgent baked dishes designed for cozy evenings.',
    coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'Quick meals under 20 minutes',
    title: 'Quick Meals Under 25 Mins',
    subtitle: 'Weeknight speed, zero compromise',
    description: 'High-impact skillet pastas, crisp stir-fries, and vibrant bowls that go from prep board to plate in minutes.',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'Date-night dinners',
    title: 'Date-Night Dinners',
    subtitle: 'Restaurant elegance at your table',
    description: 'Showstopping risottos, pan-seared specialties, and decadent desserts crafted for memorable nights in.',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'One-pot cooking',
    title: 'One-Pot Wonders',
    subtitle: 'Deep flavor, minimal cleanup',
    description: 'Everything builds in a single Dutch oven, wok, or skillet so aromatics meld seamlessly.',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'Spicy cravings',
    title: 'Spicy Cravings',
    subtitle: 'Chili oil, gochujang & fiery masalas',
    description: 'Bold heat balanced with citrus, toasted sesame, and cooling herbs for true spice enthusiasts.',
    coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'Indian home cooking',
    title: 'Indian Home Cooking',
    subtitle: 'Tadka, tawa & timeless heirlooms',
    description: 'Authentic regional favorites from North and South Indian kitchens with blooming whole spices.',
    coverImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'Vegetarian favorites',
    title: 'Plant-Forward & Vibrant',
    subtitle: 'Abundant vegetables, legumes & grains',
    description: 'Satisfying vegetarian dishes where seasonal produce, paneer, tofu, and heirloom beans take center stage.',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'Sweet cravings',
    title: 'Sweet Cravings & Patisserie',
    subtitle: 'After-dinner indulgence',
    description: 'Silky tiramisu, cardamom-infused syrups, molten chocolate centers, and caramelized tarts.',
    coverImage: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=80'
  }
];

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-butter-chicken',
    slug: 'old-delhi-style-butter-chicken',
    name: 'Old Delhi Style Murgh Makhani (Butter Chicken)',
    shortDescription: 'Charred tandoori-spiced chicken simmered in a velvety, fenugreek-scented tomato and cultured butter gravy.',
    heroImage: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    subcategory: 'North Indian',
    foodGroup: 'Savory',
    mealTypes: ['Dinner', 'Main courses', 'Lunch'],
    dietaryTags: ['Gluten-Free', 'Egg-Free', 'High-Protein'],
    moodCollections: ['Comfort food', 'Indian home cooking', 'Date-night dinners', 'Weekend cooking'],
    prepTimeMinutes: 25,
    cookTimeMinutes: 30,
    restingTimeMinutes: 30,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.9,
    isTrending: true,
    isSeasonalPick: true,
    seasonalLabel: "Editor's Signature Pick",
    ingredients: [
      { name: 'Boneless chicken thighs', quantity: 700, unit: 'g', category: 'Meat & Seafood' },
      { name: 'Thick Greek yogurt', quantity: 120, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Garlic cloves, finely grated', quantity: 6, unit: 'cloves', category: 'Produce' },
      { name: 'Fresh ginger, grated', quantity: 2, unit: 'tbsp', category: 'Produce' },
      { name: 'Kashmiri red chili powder', quantity: 2, unit: 'tsp', category: 'Pantry & Spices' },
      { name: 'Garam masala', quantity: 1.5, unit: 'tsp', category: 'Pantry & Spices' },
      { name: 'Ripe plum tomatoes', quantity: 600, unit: 'g', category: 'Produce' },
      { name: 'Raw cashews', quantity: 40, unit: 'g', category: 'Pantry & Spices' },
      { name: 'Unsalted butter', quantity: 60, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Heavy cream', quantity: 80, unit: 'ml', category: 'Dairy & Eggs' },
      { name: 'Kasuri methi (dried fenugreek leaves)', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Sea salt', quantity: null, unit: 'to taste', category: 'Pantry & Spices', qualitativeNote: 'Season generously to taste' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Marinate the Chicken',
        instruction: 'Whisk yogurt, half the grated garlic and ginger, 1 tsp Kashmiri chili powder, 0.5 tsp garam masala, and salt in a bowl. Toss chicken pieces thoroughly and rest for at least 30 minutes.',
        durationMinutes: 30,
        relevantIngredients: ['Boneless chicken thighs', 'Thick Greek yogurt', 'Kashmiri red chili powder']
      },
      {
        stepNumber: 2,
        title: 'Simmer the Tomato-Cashew Base',
        instruction: 'In a Dutch oven, melt 20g butter with remaining ginger, garlic, tomatoes, cashews, remaining chili powder, and 150ml water. Simmer covered until tomatoes collapse completely.',
        durationMinutes: 15,
        relevantIngredients: ['Ripe plum tomatoes', 'Raw cashews', 'Unsalted butter']
      },
      {
        stepNumber: 3,
        title: 'Blend & Strain for Silkiness',
        instruction: 'Blend the cooked tomato-cashew mixture until completely smooth, then pass through a fine-mesh sieve back into the pan for an ultra-velvety makhani texture.',
        durationMinutes: 5
      },
      {
        stepNumber: 4,
        title: 'Sear the Spiced Chicken',
        instruction: 'In a separate cast-iron skillet over high heat, sear the marinated chicken pieces in batches until deeply blistered and charred at the edges.',
        durationMinutes: 8,
        relevantIngredients: ['Boneless chicken thighs']
      },
      {
        stepNumber: 5,
        title: 'Finish with Butter, Cream & Fenugreek',
        instruction: 'Fold the seared chicken and juices into the simmering tomato gravy. Stir in remaining 40g cold butter, heavy cream, and crushed kasuri methi between your palms.',
        durationMinutes: 7,
        relevantIngredients: ['Unsalted butter', 'Heavy cream', 'Kasuri methi (dried fenugreek leaves)']
      }
    ],
    tipsAndSubstitutions: [
      'Crush the dried fenugreek leaves lightly after toasting them in a dry pan for 15 seconds to unlock their maple-like aroma.',
      'For a dairy-free variation, substitute coconut cream and vegan plant butter.'
    ],
    allergens: ['Dairy', 'Tree Nuts (Cashews)'],
    nutrition: { calories: 540, protein: '38g', carbs: '14g', fat: '36g' }
  },
  {
    id: 'rec-paneer-butter-masala',
    slug: 'velvety-paneer-butter-masala',
    name: 'Velvety Paneer Butter Masala',
    shortDescription: 'Soft cubes of fresh cottage cheese bathed in a luscious tomato, cashew, and green cardamom makhani sauce.',
    heroImage: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    subcategory: 'North Indian',
    foodGroup: 'Savory',
    mealTypes: ['Dinner', 'Lunch', 'Main courses'],
    dietaryTags: ['Vegetarian', 'Gluten-Free', 'Egg-Free'],
    moodCollections: ['Comfort food', 'Indian home cooking', 'Vegetarian favorites', 'One-pot cooking'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.8,
    isTrending: true,
    ingredients: [
      { name: 'Fresh paneer, cubed', quantity: 400, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Ripe tomatoes, roughly chopped', quantity: 500, unit: 'g', category: 'Produce' },
      { name: 'Yellow onion, sliced', quantity: 1, unit: 'large', category: 'Produce' },
      { name: 'Raw cashews', quantity: 35, unit: 'g', category: 'Pantry & Spices' },
      { name: 'Unsalted butter', quantity: 45, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Green cardamom pods', quantity: 4, unit: 'pods', category: 'Pantry & Spices' },
      { name: 'Kashmiri chili powder', quantity: 1.5, unit: 'tsp', category: 'Pantry & Spices' },
      { name: 'Heavy cream', quantity: 60, unit: 'ml', category: 'Dairy & Eggs' },
      { name: 'Kasuri methi', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Soak Paneer for Softness',
        instruction: 'Place cubed paneer in a bowl of warm salted water for 15 minutes so it stays pillowy inside the curry.',
        durationMinutes: 15,
        relevantIngredients: ['Fresh paneer, cubed']
      },
      {
        stepNumber: 2,
        title: 'Sauté Aromatics & Tomatoes',
        instruction: 'Sauté onions, cardamom pods, tomatoes, and cashews in half the butter until soft and jammy. Cool slightly and puree smooth.',
        durationMinutes: 12,
        relevantIngredients: ['Ripe tomatoes, roughly chopped', 'Yellow onion, sliced', 'Raw cashews', 'Green cardamom pods']
      },
      {
        stepNumber: 3,
        title: 'Simmer with Spices & Paneer',
        instruction: 'Return puree to pan with remaining butter and Kashmiri chili powder. Simmer 8 minutes, fold in drained paneer, cream, and crushed kasuri methi.',
        durationMinutes: 10,
        relevantIngredients: ['Fresh paneer, cubed', 'Heavy cream', 'Kasuri methi']
      }
    ],
    tipsAndSubstitutions: [
      'Avoid over-boiling after adding paneer so the cheese stays tender rather than chewy.',
      'Replace paneer with extra-firm pressed tofu and coconut cream for a vegan rendition.'
    ],
    allergens: ['Dairy', 'Tree Nuts (Cashews)'],
    nutrition: { calories: 460, protein: '18g', carbs: '16g', fat: '35g' }
  },
  {
    id: 'rec-masala-dosa',
    slug: 'crispy-mysore-masala-dosa',
    name: 'Crispy South Indian Masala Dosa',
    shortDescription: 'Golden fermented rice and lentil crepes wrapped around a fragrant mustard-seed and curry-leaf potato masala.',
    heroImage: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    subcategory: 'South Indian',
    foodGroup: 'Savory',
    mealTypes: ['Breakfast', 'Dinner', 'Savory dishes'],
    dietaryTags: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Egg-Free'],
    moodCollections: ['Indian home cooking', 'Vegetarian favorites', 'Comfort food'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.9,
    isSeasonalPick: true,
    seasonalLabel: 'South Indian Heritage',
    ingredients: [
      { name: 'Fermented dosa batter', quantity: 800, unit: 'ml', category: 'Bakery & Grains' },
      { name: 'Boiled Yukon gold potatoes', quantity: 500, unit: 'g', category: 'Produce' },
      { name: 'Yellow onions, thinly sliced', quantity: 2, unit: 'medium', category: 'Produce' },
      { name: 'Black mustard seeds', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { name: 'Chana dal (split chickpeas)', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Fresh curry leaves', quantity: 12, unit: 'leaves', category: 'Produce' },
      { name: 'Green chilies, slit', quantity: 2, unit: 'whole', category: 'Produce' },
      { name: 'Turmeric powder', quantity: 0.5, unit: 'tsp', category: 'Pantry & Spices' },
      { name: 'Ghee or neutral oil', quantity: 3, unit: 'tbsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Temper the Tadka',
        instruction: 'Heat 1.5 tbsp oil in a skillet. Pop mustard seeds, then toast chana dal until golden. Toss in curry leaves and green chilies.',
        durationMinutes: 3,
        relevantIngredients: ['Black mustard seeds', 'Chana dal (split chickpeas)', 'Fresh curry leaves']
      },
      {
        stepNumber: 2,
        title: 'Make the Potato Palya',
        instruction: 'Sweat sliced onions with turmeric until translucent. Crumble in boiled potatoes with a splash of water, mashing lightly into a moist, cohesive filling.',
        durationMinutes: 8,
        relevantIngredients: ['Boiled Yukon gold potatoes', 'Yellow onions, thinly sliced', 'Turmeric powder']
      },
      {
        stepNumber: 3,
        title: 'Cast & Crisp the Dosas',
        instruction: 'Heat a cast-iron tawa until smoking, sprinkle water to cool slightly, then ladle batter in concentric circles from center outward. Drizzle oil around edges and cook until lacy and crisp. Fold over potato masala.',
        durationMinutes: 9,
        relevantIngredients: ['Fermented dosa batter', 'Ghee or neutral oil']
      }
    ],
    tipsAndSubstitutions: [
      'Always regulate tawa temperature with a splash of water before spreading the next dosa.',
      'Serve immediately alongside coconut chutney and piping hot lentil sambar.'
    ],
    allergens: [],
    nutrition: { calories: 380, protein: '9g', carbs: '64g', fat: '10g' }
  },
  {
    id: 'rec-truffle-cacio-e-pepe',
    slug: 'roman-cacio-e-pepe-tonnarelli',
    name: 'Roman Tonnarelli Cacio e Pepe',
    shortDescription: 'Toasted Sarawak black peppercorns and aged Pecorino Romano emulsified with starchy pasta water into a glossy coat.',
    heroImage: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    subcategory: 'Pasta',
    foodGroup: 'Savory',
    mealTypes: ['Dinner', 'Lunch', 'Pasta and noodles', 'Main courses'],
    dietaryTags: ['Vegetarian', 'Egg-Free'],
    moodCollections: ['Quick meals under 20 minutes', 'Date-night dinners', 'Comfort food', 'One-pot cooking'],
    prepTimeMinutes: 5,
    cookTimeMinutes: 15,
    servings: 2,
    difficulty: 'Medium',
    rating: 4.8,
    isTrending: true,
    ingredients: [
      { name: 'Spaghetti or Tonnarelli pasta', quantity: 250, unit: 'g', category: 'Bakery & Grains' },
      { name: 'Finely grated Pecorino Romano', quantity: 110, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Whole black peppercorns', quantity: 2, unit: 'tsp', category: 'Pantry & Spices' },
      { name: 'Kosher salt', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Crack & Toast the Peppercorns',
        instruction: 'Coarsely crush peppercorns in a mortar and toast dry in a wide skillet over medium-low heat until fragrant and smoky.',
        durationMinutes: 3,
        relevantIngredients: ['Whole black peppercorns']
      },
      {
        stepNumber: 2,
        title: 'Boil Pasta in Low Water',
        instruction: 'Cook pasta in half the usual volume of lightly salted water to concentrate starch. Transfer pasta 2 minutes before al dente into the pepper skillet with a ladle of pasta water.',
        durationMinutes: 9,
        relevantIngredients: ['Spaghetti or Tonnarelli pasta']
      },
      {
        stepNumber: 3,
        title: 'Whip Pecorino Paste & Emulsify',
        instruction: 'Whisk finely grated Pecorino with warm (not boiling) pasta water into a smooth paste. Remove skillet from heat, wait 30 seconds, then toss vigorously with the cheese paste.',
        durationMinutes: 3,
        relevantIngredients: ['Finely grated Pecorino Romano']
      }
    ],
    tipsAndSubstitutions: [
      'Use a microplane rather than a box grater so the Pecorino melts smoothly without clumping into strings.',
      'Never add the cheese while the pan is on active burner heat or the proteins will seize.'
    ],
    allergens: ['Gluten', 'Dairy'],
    nutrition: { calories: 590, protein: '26g', carbs: '78g', fat: '18g' }
  },
  {
    id: 'rec-wild-mushroom-risotto',
    slug: 'porcini-wild-mushroom-risotto',
    name: 'Charred Maitake & Porcini Risotto',
    shortDescription: 'Carnaroli rice slowly coaxed with roasted mushroom stock, dry white wine, thyme, and aged Parmigiano-Reggiano.',
    heroImage: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    subcategory: 'Risotto',
    foodGroup: 'Savory',
    mealTypes: ['Dinner', 'Main courses', 'Rice dishes'],
    dietaryTags: ['Vegetarian', 'Gluten-Free', 'Egg-Free'],
    moodCollections: ['Date-night dinners', 'Comfort food', 'Vegetarian favorites', 'Weekend cooking'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 28,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.9,
    isSeasonalPick: true,
    seasonalLabel: 'Autumn Harvest Feature',
    ingredients: [
      { name: 'Carnaroli or Arborio rice', quantity: 320, unit: 'g', category: 'Bakery & Grains' },
      { name: 'Mixed wild mushrooms (maitake, cremini)', quantity: 350, unit: 'g', category: 'Produce' },
      { name: 'Warm vegetable or mushroom stock', quantity: 1200, unit: 'ml', category: 'Pantry & Spices' },
      { name: 'Shallots, finely diced', quantity: 2, unit: 'medium', category: 'Produce' },
      { name: 'Dry white wine', quantity: 120, unit: 'ml', category: 'Pantry & Spices' },
      { name: 'Parmigiano-Reggiano, grated', quantity: 75, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Cold unsalted butter', quantity: 50, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Fresh thyme sprigs', quantity: 4, unit: 'sprigs', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sear the Wild Mushrooms',
        instruction: 'Sear mushrooms in a hot skillet with olive oil and thyme until deeply golden and crispy on edges. Season and set aside.',
        durationMinutes: 7,
        relevantIngredients: ['Mixed wild mushrooms (maitake, cremini)', 'Fresh thyme sprigs']
      },
      {
        stepNumber: 2,
        title: 'Toast the Rice (Tostatura)',
        instruction: 'Sweat shallots in 15g butter, add rice, and toast for 2 minutes until edges turn translucent. Deglaze with white wine until absorbed.',
        durationMinutes: 4,
        relevantIngredients: ['Carnaroli or Arborio rice', 'Shallots, finely diced', 'Dry white wine']
      },
      {
        stepNumber: 3,
        title: 'Ladle Stock & Mantecatura',
        instruction: 'Add simmering stock one ladle at a time, stirring gently. Once tender with a slight core, remove from heat and beat in cold butter and Parmigiano (mantecatura). Top with crispy mushrooms.',
        durationMinutes: 17,
        relevantIngredients: ['Warm vegetable or mushroom stock', 'Parmigiano-Reggiano, grated', 'Cold unsalted butter']
      }
    ],
    tipsAndSubstitutions: [
      'Keep your stock at a bare simmer in an adjacent saucepan; cold stock stalls the starch release.'
    ],
    allergens: ['Dairy'],
    nutrition: { calories: 480, protein: '14g', carbs: '66g', fat: '16g' }
  },
  {
    id: 'rec-classic-tiramisu',
    slug: 'artisanal-espresso-tiramisu',
    name: 'Artisanal Espresso & Mascarpone Tiramisu',
    shortDescription: 'Savoiardi ladyfingers soaked in dark roast espresso and whipped into clouds of velvety mascarpone zabaglione.',
    heroImage: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    subcategory: 'Italian desserts',
    foodGroup: 'Sweet',
    mealTypes: ['Desserts'],
    dietaryTags: ['Vegetarian'],
    moodCollections: ['Sweet cravings', 'Date-night dinners', 'Weekend cooking'],
    prepTimeMinutes: 30,
    cookTimeMinutes: 5,
    restingTimeMinutes: 240,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.9,
    isTrending: true,
    ingredients: [
      { name: 'Mascarpone cheese, room temp', quantity: 500, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Savoiardi ladyfinger biscuits', quantity: 24, unit: 'pieces', category: 'Bakery & Grains' },
      { name: 'Strong brewed espresso, cooled', quantity: 300, unit: 'ml', category: 'Pantry & Spices' },
      { name: 'Large egg yolks', quantity: 4, unit: 'yolks', category: 'Dairy & Eggs' },
      { name: 'Caster sugar', quantity: 100, unit: 'g', category: 'Pantry & Spices' },
      { name: 'Heavy whipping cream', quantity: 150, unit: 'ml', category: 'Dairy & Eggs' },
      { name: 'Dutch-process cocoa powder', quantity: 3, unit: 'tbsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Whip the Egg Yolk Sabayon',
        instruction: 'Whisk egg yolks and sugar over a bain-marie (simmering water bath) for 5 minutes until pale, thick, and ribbons form. Cool slightly.',
        durationMinutes: 5,
        relevantIngredients: ['Large egg yolks', 'Caster sugar']
      },
      {
        stepNumber: 2,
        title: 'Fold Mascarpone & Soft-Peak Cream',
        instruction: 'Smooth out the mascarpone, fold into the yolk mixture, then gently fold in softly whipped heavy cream.',
        durationMinutes: 10,
        relevantIngredients: ['Mascarpone cheese, room temp', 'Heavy whipping cream']
      },
      {
        stepNumber: 3,
        title: 'Dip Ladyfingers & Layer',
        instruction: 'Briefly dip each Savoiardi for 1 second per side in cooled espresso. Layer biscuits and mascarpone cream twice. Chill 4 hours and dust heavily with cocoa before serving.',
        durationMinutes: 15,
        relevantIngredients: ['Savoiardi ladyfinger biscuits', 'Strong brewed espresso, cooled', 'Dutch-process cocoa powder']
      }
    ],
    tipsAndSubstitutions: [
      'Dip ladyfingers for no more than 2 seconds total so the base stays structured rather than soggy.'
    ],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    nutrition: { calories: 490, protein: '8g', carbs: '42g', fat: '32g' }
  },
  {
    id: 'rec-spicy-miso-ramen',
    slug: 'sapporo-spicy-sesame-miso-ramen',
    name: 'Sapporo Spicy Sesame Miso Ramen',
    shortDescription: 'Rich toasted sesame and red miso tare broth topped with charred sweetcorn, jammy ajitsuke egg, and wavy noodles.',
    heroImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Japanese',
    subcategory: 'Ramen',
    foodGroup: 'Savory',
    mealTypes: ['Dinner', 'Lunch', 'Soups', 'Pasta and noodles'],
    dietaryTags: ['Dairy-Free'],
    moodCollections: ['Spicy cravings', 'Comfort food', 'Weekend cooking'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    servings: 2,
    difficulty: 'Medium',
    rating: 4.9,
    isTrending: true,
    ingredients: [
      { name: 'Fresh alkaline ramen noodles', quantity: 300, unit: 'g', category: 'Bakery & Grains' },
      { name: 'Red or Aka miso paste', quantity: 3, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Japanese sesame paste (neri goma) or tahini', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Doubanjiang (chili bean paste)', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Rich chicken or shiitake dashi stock', quantity: 900, unit: 'ml', category: 'Pantry & Spices' },
      { name: 'Soft-boiled eggs', quantity: 2, unit: 'large', category: 'Dairy & Eggs' },
      { name: 'Scallions, thinly sliced', quantity: 3, unit: 'stalks', category: 'Produce' },
      { name: 'Sweet corn kernels', quantity: 80, unit: 'g', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sauté the Spicy Miso Tare',
        instruction: 'In a deep pot, fry grated garlic, ginger, and doubanjiang in sesame oil for 1 minute. Whisk in miso paste and sesame paste.',
        durationMinutes: 4,
        relevantIngredients: ['Red or Aka miso paste', 'Japanese sesame paste (neri goma) or tahini', 'Doubanjiang (chili bean paste)']
      },
      {
        stepNumber: 2,
        title: 'Whisk in Dashi Stock',
        instruction: 'Gradually ladle in hot stock while whisking to emulsify the sesame and miso into a creamy, fiery broth. Keep warm below a boil.',
        durationMinutes: 8,
        relevantIngredients: ['Rich chicken or shiitake dashi stock']
      },
      {
        stepNumber: 3,
        title: 'Boil Noodles & Assemble Bowls',
        instruction: 'Boil ramen noodles for 2.5 minutes, drain thoroughly, divide into warmed bowls, ladle piping broth over top, and garnish with halved jammy eggs, corn, and scallions.',
        durationMinutes: 8,
        relevantIngredients: ['Fresh alkaline ramen noodles', 'Soft-boiled eggs', 'Scallions, thinly sliced', 'Sweet corn kernels']
      }
    ],
    tipsAndSubstitutions: [
      'Never boil miso broth vigorously after adding the miso paste, as high heat dulls its probiotic aroma.'
    ],
    allergens: ['Soy', 'Sesame', 'Gluten', 'Eggs'],
    nutrition: { calories: 560, protein: '24g', carbs: '68g', fat: '21g' }
  },
  {
    id: 'rec-dan-dan-noodles',
    slug: 'sichuan-chili-oil-dan-dan-noodles',
    name: 'Sichuan Chili Oil Dan Dan Noodles',
    shortDescription: 'Springy wheat noodles tossed in numbing Sichuan peppercorn chili oil, savory preserved mustard greens, and toasted sesame.',
    heroImage: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Chinese',
    subcategory: 'Noodles',
    foodGroup: 'Savory',
    mealTypes: ['Dinner', 'Lunch', 'Pasta and noodles'],
    dietaryTags: ['Vegan', 'Vegetarian', 'Dairy-Free', 'Egg-Free'],
    moodCollections: ['Quick meals under 20 minutes', 'Spicy cravings', 'Comfort food'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    servings: 2,
    difficulty: 'Easy',
    rating: 4.8,
    ingredients: [
      { name: 'Chinese wheat noodles', quantity: 250, unit: 'g', category: 'Bakery & Grains' },
      { name: 'Crispy crumbled shiitake or plant mince', quantity: 150, unit: 'g', category: 'Produce' },
      { name: 'Sichuan chili oil with sediment', quantity: 3, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Chinese sesame paste or tahini', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Light soy sauce', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Chinkiang black vinegar', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Ground roasted Sichuan peppercorns', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { name: 'Baby bok choy', quantity: 2, unit: 'heads', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Whisk the Bowl Sauce',
        instruction: 'Divide sesame paste, soy sauce, black vinegar, chili oil, Sichuan peppercorn powder, and 3 tbsp hot noodle water into the bottom of two serving bowls.',
        durationMinutes: 3,
        relevantIngredients: ['Sichuan chili oil with sediment', 'Chinese sesame paste or tahini', 'Chinkiang black vinegar']
      },
      {
        stepNumber: 2,
        title: 'Crisp the Savory Topping',
        instruction: 'Stir-fry finely diced shiitake mushrooms in a hot wok with a splash of soy until deeply browned and crispy.',
        durationMinutes: 4,
        relevantIngredients: ['Crispy crumbled shiitake or plant mince']
      },
      {
        stepNumber: 3,
        title: 'Boil Noodles & Bok Choy',
        instruction: 'Cook noodles and blanch baby bok choy in the final minute. Pile on top of the sauce, crown with crispy mushrooms, and toss at the table.',
        durationMinutes: 3,
        relevantIngredients: ['Chinese wheat noodles', 'Baby bok choy']
      }
    ],
    tipsAndSubstitutions: [
      'Toast whole Sichuan peppercorns in a dry skillet and grind fresh for maximum citrusy tingle (mala).'
    ],
    allergens: ['Gluten', 'Soy', 'Sesame'],
    nutrition: { calories: 510, protein: '16g', carbs: '62g', fat: '22g' }
  },
  {
    id: 'rec-birria-style-mushroom-tacos',
    slug: 'charred-guajillo-birria-quesatacos',
    name: 'Crisp Guajillo Birria Quesatacos with Consomé',
    shortDescription: 'Corn tortillas dipped in smoky guajillo-ancho chili oil, griddled crisp with melted Oaxaca cheese, served with rich dipping broth.',
    heroImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mexican',
    subcategory: 'Tacos',
    foodGroup: 'Savory',
    mealTypes: ['Dinner', 'Lunch', 'Main courses'],
    dietaryTags: ['Vegetarian', 'Gluten-Free', 'Egg-Free'],
    moodCollections: ['Weekend cooking', 'Spicy cravings', 'Comfort food'],
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.9,
    isTrending: true,
    ingredients: [
      { name: 'Corn tortillas', quantity: 12, unit: 'pieces', category: 'Bakery & Grains' },
      { name: 'Shredded king oyster mushrooms or jackfruit', quantity: 500, unit: 'g', category: 'Produce' },
      { name: 'Dried Guajillo chilies, seeded', quantity: 4, unit: 'whole', category: 'Pantry & Spices' },
      { name: 'Dried Ancho chilies, seeded', quantity: 2, unit: 'whole', category: 'Pantry & Spices' },
      { name: 'Oaxaca or Monterey Jack cheese, shredded', quantity: 250, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Fire-roasted tomatoes', quantity: 300, unit: 'g', category: 'Produce' },
      { name: 'White onion, finely diced', quantity: 1, unit: 'medium', category: 'Produce' },
      { name: 'Fresh cilantro, chopped', quantity: 1, unit: 'bunch', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Steep & Blend the Chili Adobo',
        instruction: 'Toast guajillo and ancho chilies for 30 seconds, steep in boiling water for 10 minutes, then blend with tomatoes, garlic, cumin, and oregano into a smooth red consomé base.',
        durationMinutes: 12,
        relevantIngredients: ['Dried Guajillo chilies, seeded', 'Dried Ancho chilies, seeded', 'Fire-roasted tomatoes']
      },
      {
        stepNumber: 2,
        title: 'Braise the Shredded Filling',
        instruction: 'Simmer shredded king oyster mushrooms in half the adobo broth for 15 minutes until deeply infused.',
        durationMinutes: 15,
        relevantIngredients: ['Shredded king oyster mushrooms or jackfruit']
      },
      {
        stepNumber: 3,
        title: 'Griddle the Crispy Quesatacos',
        instruction: 'Dip tortillas into the red oil on top of the consomé, lay on a hot cast-iron comal, layer with cheese, braised filling, onion, and cilantro, and fold until shatteringly crisp.',
        durationMinutes: 8,
        relevantIngredients: ['Corn tortillas', 'Oaxaca or Monterey Jack cheese, shredded', 'White onion, finely diced']
      }
    ],
    tipsAndSubstitutions: [
      'Remove chili seeds and membranes thoroughly so the consomé tastes fruity and smoky rather than bitter.'
    ],
    allergens: ['Dairy'],
    nutrition: { calories: 470, protein: '17g', carbs: '48g', fat: '23g' }
  },
  {
    id: 'rec-thai-green-curry',
    slug: 'aromatic-thai-emerald-green-curry',
    name: 'Aromatic Thai Emerald Green Curry',
    shortDescription: 'Fragrant lemongrass and Thai basil green curry simmered in cracked coconut cream with bamboo shoots and crisp Thai eggplant.',
    heroImage: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Thai',
    subcategory: 'Curries',
    foodGroup: 'Savory',
    mealTypes: ['Dinner', 'Lunch', 'Main courses'],
    dietaryTags: ['Gluten-Free', 'Dairy-Free', 'Egg-Free', 'Vegan', 'Vegetarian'],
    moodCollections: ['Quick meals under 20 minutes', 'Spicy cravings', 'One-pot cooking'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.8,
    ingredients: [
      { name: 'Full-fat coconut milk', quantity: 400, unit: 'ml', category: 'Pantry & Spices' },
      { name: 'Thai green curry paste', quantity: 3, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Firm tofu or chicken breast, cubed', quantity: 350, unit: 'g', category: 'Produce' },
      { name: 'Thai eggplants or zucchini, quartered', quantity: 200, unit: 'g', category: 'Produce' },
      { name: 'Makrut lime leaves, torn', quantity: 5, unit: 'leaves', category: 'Produce' },
      { name: 'Fresh Thai sweet basil', quantity: 1, unit: 'cup', category: 'Produce' },
      { name: 'Palm sugar or brown sugar', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Light soy or vegan fish sauce', quantity: 1.5, unit: 'tbsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Crack the Coconut Cream',
        instruction: 'Scoop the thick cream from the top of the coconut milk can into a wok over medium-high heat. Reduce for 3 minutes until oil droplets separate.',
        durationMinutes: 4,
        relevantIngredients: ['Full-fat coconut milk']
      },
      {
        stepNumber: 2,
        title: 'Fry the Green Curry Paste',
        instruction: 'Stir green curry paste into the hot coconut oil and fry for 2 minutes until intensely aromatic.',
        durationMinutes: 2,
        relevantIngredients: ['Thai green curry paste']
      },
      {
        stepNumber: 3,
        title: 'Simmer Vegetables & Wilt Thai Basil',
        instruction: 'Pour in remaining coconut milk, lime leaves, tofu, and eggplant. Simmer 8 minutes, balance with palm sugar and soy/fish sauce, then turn off heat and fold in Thai basil.',
        durationMinutes: 9,
        relevantIngredients: ['Firm tofu or chicken breast, cubed', 'Thai eggplants or zucchini, quartered', 'Fresh Thai sweet basil']
      }
    ],
    tipsAndSubstitutions: [
      'Bruise the makrut lime leaves by tearing them across the center vein to release their citrus essential oils.'
    ],
    allergens: ['Soy'],
    nutrition: { calories: 410, protein: '15g', carbs: '18g', fat: '31g' }
  },
  {
    id: 'rec-shakshuka-feta',
    slug: 'spiced-harissa-shakshuka-whipped-feta',
    name: 'Harissa & Roasted Pepper Shakshuka with Feta',
    shortDescription: 'Farm eggs gently poached in a smoky cumin, rose harissa, and charred red pepper tomato sauce, finished with tangy sheep feta.',
    heroImage: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Middle Eastern',
    subcategory: 'Skillet eggs',
    foodGroup: 'Savory',
    mealTypes: ['Breakfast', 'Lunch', 'Dinner', 'Main courses'],
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    moodCollections: ['One-pot cooking', 'Quick meals under 20 minutes', 'Vegetarian favorites', 'Weekend cooking'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    servings: 3,
    difficulty: 'Easy',
    rating: 4.8,
    ingredients: [
      { name: 'Large pasture-raised eggs', quantity: 6, unit: 'eggs', category: 'Dairy & Eggs' },
      { name: 'Crushed San Marzano tomatoes', quantity: 400, unit: 'g', category: 'Produce' },
      { name: 'Red bell pepper, diced', quantity: 1, unit: 'large', category: 'Produce' },
      { name: 'Rose harissa paste', quantity: 1.5, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Ground cumin', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { name: 'Greek feta cheese, crumbled', quantity: 90, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Fresh parsley & cilantro', quantity: 0.5, unit: 'cup', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Char the Peppers & Bloom Spices',
        instruction: 'Sauté diced red bell pepper in olive oil until tender. Stir in garlic, ground cumin, and rose harissa paste for 60 seconds.',
        durationMinutes: 5,
        relevantIngredients: ['Red bell pepper, diced', 'Rose harissa paste', 'Ground cumin']
      },
      {
        stepNumber: 2,
        title: 'Reduce the Tomato Base',
        instruction: 'Add crushed tomatoes and simmer for 6 minutes until thickened enough to hold indentations.',
        durationMinutes: 6,
        relevantIngredients: ['Crushed San Marzano tomatoes']
      },
      {
        stepNumber: 3,
        title: 'Poach the Eggs & Scatter Feta',
        instruction: 'Make 6 wells with a spoon, crack an egg into each, scatter feta around, cover skillet, and cook on low for 4 minutes until whites set and yolks remain runny.',
        durationMinutes: 4,
        relevantIngredients: ['Large pasture-raised eggs', 'Greek feta cheese, crumbled', 'Fresh parsley & cilantro']
      }
    ],
    tipsAndSubstitutions: [
      'Swirl a spoonful of labneh or Greek yogurt on top right before serving with charred sourdough or pita.'
    ],
    allergens: ['Eggs', 'Dairy'],
    nutrition: { calories: 340, protein: '19g', carbs: '14g', fat: '23g' }
  },
  {
    id: 'rec-korean-bibimbap',
    slug: 'sizzling-dolsot-bibimbap',
    name: 'Sizzling Stone-Pot Dolsot Bibimbap',
    shortDescription: 'Crispy sesame-toasted short-grain rice crowned with seasoned spinach, shiitake, pickled radish, crispy egg, and tangy gochujang sauce.',
    heroImage: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Korean',
    subcategory: 'Rice bowls',
    foodGroup: 'Savory',
    mealTypes: ['Dinner', 'Lunch', 'Rice dishes', 'Main courses'],
    dietaryTags: ['Vegetarian', 'Dairy-Free'],
    moodCollections: ['Spicy cravings', 'Vegetarian favorites', 'Comfort food'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 2,
    difficulty: 'Easy',
    rating: 4.9,
    ingredients: [
      { name: 'Cooked short-grain white rice', quantity: 400, unit: 'g', category: 'Bakery & Grains' },
      { name: 'Gochujang (Korean chili paste)', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Toasted sesame oil', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Baby spinach', quantity: 150, unit: 'g', category: 'Produce' },
      { name: 'Carrots, julienned', quantity: 1, unit: 'medium', category: 'Produce' },
      { name: 'Shiitake mushrooms, sliced', quantity: 120, unit: 'g', category: 'Produce' },
      { name: 'Eggs', quantity: 2, unit: 'large', category: 'Dairy & Eggs' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Prepare the Banchan Toppings',
        instruction: 'Blanch spinach for 30 seconds, squeeze dry, and toss with sesame oil. Quickly sauté carrots and shiitake mushrooms separately with a pinch of salt.',
        durationMinutes: 6,
        relevantIngredients: ['Baby spinach', 'Carrots, julienned', 'Shiitake mushrooms, sliced']
      },
      {
        stepNumber: 2,
        title: 'Crisp the Rice Crust (Nurungji)',
        instruction: 'Brush a cast-iron skillet generously with sesame oil, press in warm rice, and cook undisturbed over medium heat for 6 minutes until the bottom crackles and turns golden.',
        durationMinutes: 6,
        relevantIngredients: ['Cooked short-grain white rice', 'Toasted sesame oil']
      },
      {
        stepNumber: 3,
        title: 'Arrange & Crown with Fried Egg',
        instruction: 'Arrange vegetables in color-blocked sections over the rice, top with sunny-side-up eggs and gochujang sauce, and mix thoroughly before eating.',
        durationMinutes: 3,
        relevantIngredients: ['Gochujang (Korean chili paste)', 'Eggs']
      }
    ],
    tipsAndSubstitutions: [
      'Listening for a steady gentle crackle tells you the bottom rice crust is caramelizing without burning.'
    ],
    allergens: ['Sesame', 'Soy', 'Eggs'],
    nutrition: { calories: 520, protein: '16g', carbs: '74g', fat: '18g' }
  },
  {
    id: 'rec-mediterranean-salmon-grain-bowl',
    slug: 'charred-lemon-herb-mediterranean-bowl',
    name: 'Charred Lemon & Oregano Halloumi Farro Bowl',
    shortDescription: 'Nutty pearled farro, blistered cherry tomatoes, cucumber ribbons, Kalamata olives, and golden-seared Cypriot halloumi.',
    heroImage: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mediterranean',
    subcategory: 'Grain bowls',
    foodGroup: 'Savory',
    mealTypes: ['Lunch', 'Dinner', 'Salads'],
    dietaryTags: ['Vegetarian', 'Egg-Free', 'High-Protein'],
    moodCollections: ['Quick meals under 20 minutes', 'Vegetarian favorites'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    servings: 2,
    difficulty: 'Easy',
    rating: 4.7,
    ingredients: [
      { name: 'Halloumi cheese, sliced thick', quantity: 225, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Cooked farro or quinoa', quantity: 300, unit: 'g', category: 'Bakery & Grains' },
      { name: 'Cherry tomatoes, halved', quantity: 200, unit: 'g', category: 'Produce' },
      { name: 'Persian cucumber, diced', quantity: 2, unit: 'small', category: 'Produce' },
      { name: 'Kalamata olives, pitted', quantity: 60, unit: 'g', category: 'Pantry & Spices' },
      { name: 'Extra-virgin olive oil', quantity: 3, unit: 'tbsp', category: 'Pantry & Spices' },
      { name: 'Fresh lemon juice', quantity: 2, unit: 'tbsp', category: 'Produce' },
      { name: 'Dried wild oregano', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Whisk the Oregano-Lemon Vinaigrette',
        instruction: 'Whisk extra-virgin olive oil, fresh lemon juice, dried oregano, and a pinch of flaky salt. Toss half with warm farro.',
        durationMinutes: 3,
        relevantIngredients: ['Cooked farro or quinoa', 'Extra-virgin olive oil', 'Fresh lemon juice', 'Dried wild oregano']
      },
      {
        stepNumber: 2,
        title: 'Sear the Halloumi Golden',
        instruction: 'Sear thick halloumi slices in a dry nonstick or cast-iron skillet for 2 minutes per side until deeply caramelized.',
        durationMinutes: 5,
        relevantIngredients: ['Halloumi cheese, sliced thick']
      },
      {
        stepNumber: 3,
        title: 'Assemble & Drizzle',
        instruction: 'Top seasoned farro with cucumbers, cherry tomatoes, olives, and warm halloumi. Drizzle with remaining vinaigrette.',
        durationMinutes: 4,
        relevantIngredients: ['Cherry tomatoes, halved', 'Persian cucumber, diced', 'Kalamata olives, pitted']
      }
    ],
    tipsAndSubstitutions: [
      'Squeeze a little honey over the hot halloumi in the final 15 seconds in the pan for a sweet-salty glaze.'
    ],
    allergens: ['Dairy', 'Gluten'],
    nutrition: { calories: 530, protein: '24g', carbs: '44g', fat: '28g' }
  },
  {
    id: 'rec-french-onion-soup',
    slug: 'bistro-caramelized-french-onion-soup',
    name: 'Bistro Caramelized French Onion Soup Gratinée',
    shortDescription: 'Sweet yellow onions slowly caramelized for deep mahogany richness, simmered with thyme and broiled beneath bubbly Gruyère croûtons.',
    heroImage: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'French',
    subcategory: 'French soups',
    foodGroup: 'Savory',
    mealTypes: ['Dinner', 'Soups', 'Starters'],
    dietaryTags: ['Vegetarian', 'Egg-Free'],
    moodCollections: ['Comfort food', 'Date-night dinners', 'One-pot cooking'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 45,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.9,
    ingredients: [
      { name: 'Yellow onions, thinly sliced', quantity: 1000, unit: 'g', category: 'Produce' },
      { name: 'Unsalted butter', quantity: 45, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Rich beef or roasted mushroom stock', quantity: 1000, unit: 'ml', category: 'Pantry & Spices' },
      { name: 'Aged Gruyère cheese, grated', quantity: 180, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Baguette slices, toasted', quantity: 8, unit: 'slices', category: 'Bakery & Grains' },
      { name: 'Dry white wine or sherry', quantity: 100, unit: 'ml', category: 'Pantry & Spices' },
      { name: 'Fresh thyme sprigs', quantity: 4, unit: 'sprigs', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Slowly Caramelize the Onions',
        instruction: 'Cook sliced onions in melted butter with a pinch of salt in a heavy Dutch oven over medium-low heat for 30 minutes, scraping fond with splashes of water until jammy and mahogany.',
        durationMinutes: 30,
        relevantIngredients: ['Yellow onions, thinly sliced', 'Unsalted butter']
      },
      {
        stepNumber: 2,
        title: 'Deglaze & Simmer the Broth',
        instruction: 'Deglaze with white wine, add stock and thyme sprigs, and simmer uncovered for 12 minutes.',
        durationMinutes: 12,
        relevantIngredients: ['Rich beef or roasted mushroom stock', 'Dry white wine or sherry', 'Fresh thyme sprigs']
      },
      {
        stepNumber: 3,
        title: 'Broil the Gruyère Gratinée',
        instruction: 'Ladle soup into ovenproof crocks, float toasted baguette slices on top, mound generously with grated Gruyère, and broil 3 minutes until bubbling and golden brown.',
        durationMinutes: 3,
        relevantIngredients: ['Baguette slices, toasted', 'Aged Gruyère cheese, grated']
      }
    ],
    tipsAndSubstitutions: [
      'Rub the toasted baguette slices with a halved raw garlic clove before floating them on the soup.'
    ],
    allergens: ['Dairy', 'Gluten'],
    nutrition: { calories: 450, protein: '18g', carbs: '42g', fat: '22g' }
  },
  {
    id: 'rec-gulab-jamun',
    slug: 'cardamom-saffron-gulab-jamun',
    name: 'Warm Saffron & Rosewater Gulab Jamun',
    shortDescription: 'Melt-in-the-mouth milk-solid dumplings fried to deep amber and steeped in warm green cardamom and Kashmiri saffron syrup.',
    heroImage: 'https://images.unsplash.com/photo-1666190094762-254a9775e1c3?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    subcategory: 'Indian desserts',
    foodGroup: 'Sweet',
    mealTypes: ['Desserts'],
    dietaryTags: ['Vegetarian', 'Egg-Free'],
    moodCollections: ['Sweet cravings', 'Indian home cooking', 'Festive recipes'],
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.9,
    ingredients: [
      { name: 'Khoya (milk solids) or full-fat milk powder', quantity: 200, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'All-purpose flour', quantity: 3, unit: 'tbsp', category: 'Bakery & Grains' },
      { name: 'Granulated sugar', quantity: 300, unit: 'g', category: 'Pantry & Spices' },
      { name: 'Green cardamom pods, crushed', quantity: 6, unit: 'pods', category: 'Pantry & Spices' },
      { name: 'Saffron strands', quantity: 1, unit: 'pinch', category: 'Pantry & Spices' },
      { name: 'Rosewater', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { name: 'Ghee for frying', quantity: 300, unit: 'ml', category: 'Dairy & Eggs' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Simmer the Fragrant Sugar Syrup',
        instruction: 'Boil sugar with 300ml water, crushed cardamom pods, and saffron for 7 minutes until slightly sticky (half-thread consistency). Stir in rosewater and keep warm.',
        durationMinutes: 8,
        relevantIngredients: ['Granulated sugar', 'Green cardamom pods, crushed', 'Saffron strands', 'Rosewater']
      },
      {
        stepNumber: 2,
        title: 'Knead Smooth Crack-Free Balls',
        instruction: 'Gently knead khoya and flour with a splash of milk into a silky dough. Roll into 16 smooth, crack-free spheres.',
        durationMinutes: 6,
        relevantIngredients: ['Khoya (milk solids) or full-fat milk powder', 'All-purpose flour']
      },
      {
        stepNumber: 3,
        title: 'Slow-Fry & Steep in Warm Syrup',
        instruction: 'Fry balls in low-medium heat ghee, stirring the oil gently in circles so they brown evenly to a deep mahogany. Transfer straight into warm syrup to soak for 30 minutes.',
        durationMinutes: 6,
        relevantIngredients: ['Ghee for frying']
      }
    ],
    tipsAndSubstitutions: [
      'Ensure the ghee is on low heat; if too hot, the exterior darkens before the center cooks through.'
    ],
    allergens: ['Dairy', 'Gluten'],
    nutrition: { calories: 390, protein: '6g', carbs: '58g', fat: '15g' }
  },
  {
    id: 'rec-iced-matcha-yuzu-latte',
    slug: 'ceremonial-matcha-honey-oat-latte',
    name: 'Ceremonial Uji Matcha & Honey Oat Latte',
    shortDescription: 'Hand-whisked emerald first-harvest Uji matcha layered over velvety oat milk and wildflower honey.',
    heroImage: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Japanese',
    subcategory: 'Japanese desserts',
    foodGroup: 'Drinks',
    mealTypes: ['Beverages', 'Breakfast', 'Snacks'],
    dietaryTags: ['Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Egg-Free'],
    moodCollections: ['Quick meals under 20 minutes', 'Sweet cravings'],
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    servings: 1,
    difficulty: 'Easy',
    rating: 4.8,
    ingredients: [
      { name: 'Ceremonial grade matcha powder', quantity: 2, unit: 'tsp', category: 'Pantry & Spices' },
      { name: 'Barista oat milk', quantity: 200, unit: 'ml', category: 'Dairy & Eggs' },
      { name: 'Warm water (80°C)', quantity: 60, unit: 'ml', category: 'Pantry & Spices' },
      { name: 'Maple syrup or wildflower honey', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sift & Whisk the Matcha Shot',
        instruction: 'Sift matcha powder into a chawan bowl, pour in 80°C water, and whisk briskly in a W-motion until crowned with micro-foam.',
        durationMinutes: 2,
        relevantIngredients: ['Ceremonial grade matcha powder', 'Warm water (80°C)']
      },
      {
        stepNumber: 2,
        title: 'Layer Over Iced Oat Milk',
        instruction: 'Fill a tall glass with ice, stir sweetener into cold oat milk, and slowly pour the emerald matcha over the ice.',
        durationMinutes: 3,
        relevantIngredients: ['Barista oat milk', 'Maple syrup or wildflower honey']
      }
    ],
    tipsAndSubstitutions: [
      'Never use boiling 100°C water on matcha, as it scorches the delicate leaves and creates bitterness.'
    ],
    allergens: [],
    nutrition: { calories: 165, protein: '3g', carbs: '26g', fat: '5g' }
  },
  {
    id: 'rec-american-brown-butter-cookies',
    slug: 'salted-brown-butter-espresso-cookies',
    name: 'Salted Brown Butter & Dark Chocolate Skillet Cookies',
    shortDescription: 'Nutty toasted milk solids, dark 70% chocolate puddles, crisp caramelized edges, and flaky Maldon sea salt.',
    heroImage: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'American',
    subcategory: 'Baking',
    foodGroup: 'Sweet',
    mealTypes: ['Desserts', 'Snacks'],
    dietaryTags: ['Vegetarian'],
    moodCollections: ['Sweet cravings', 'Comfort food', 'Weekend cooking'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    servings: 8,
    difficulty: 'Easy',
    rating: 4.9,
    ingredients: [
      { name: 'Unsalted butter', quantity: 170, unit: 'g', category: 'Dairy & Eggs' },
      { name: 'Dark brown muscovado sugar', quantity: 160, unit: 'g', category: 'Pantry & Spices' },
      { name: 'All-purpose flour', quantity: 220, unit: 'g', category: 'Bakery & Grains' },
      { name: '70% Dark chocolate bar, chopped', quantity: 180, unit: 'g', category: 'Pantry & Spices' },
      { name: 'Large egg + 1 egg yolk', quantity: 2, unit: 'whole', category: 'Dairy & Eggs' },
      { name: 'Baking soda', quantity: 0.75, unit: 'tsp', category: 'Pantry & Spices' },
      { name: 'Flaky Maldon sea salt', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Brown the Butter',
        instruction: 'Melt butter in a saucepan over medium heat, swirling until it foams and brown toasted milk specks smell like roasted hazelnuts. Cool 10 minutes.',
        durationMinutes: 6,
        relevantIngredients: ['Unsalted butter']
      },
      {
        stepNumber: 2,
        title: 'Whisk Sugars & Fold Chocolate',
        instruction: 'Whisk brown butter with sugar and eggs until glossy. Fold in flour, baking soda, and hand-chopped dark chocolate chunks.',
        durationMinutes: 9,
        relevantIngredients: ['Dark brown muscovado sugar', 'All-purpose flour', '70% Dark chocolate bar, chopped']
      },
      {
        stepNumber: 3,
        title: 'Bake & Pan-Bang for Ripples',
        instruction: 'Bake at 180°C (350°F) for 11 minutes, tap baking sheet gently on rack at minute 9 to create crinkled edges, and finish with flaky sea salt.',
        durationMinutes: 12,
        relevantIngredients: ['Flaky Maldon sea salt']
      }
    ],
    tipsAndSubstitutions: [
      'Chop a chocolate bar with a serrated knife rather than using chips so thin shards create ribbons throughout the dough.'
    ],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    nutrition: { calories: 360, protein: '5g', carbs: '41g', fat: '20g' }
  }
];