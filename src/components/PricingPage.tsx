import React, { useState } from 'react';
import {
  Award,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Crown,
  Heart,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap
} from 'lucide-react';
import { useCookly } from '../context/CooklyContext';
import { BillingCycle, SubscriptionTier } from '../types';

export interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { subscription, upgradePlan, applyPromoCode, addToast } = useCookly();

  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage(res.message);
    if (res.success) {
      setPromoInput('');
    }
  };

  const isCurrentTier = (tier: SubscriptionTier) => {
    return subscription.tier === tier;
  };

  const faqs = [
    {
      q: 'Can I cancel anytime or switch billing cycles?',
      a: 'Yes, absolutely. There is zero lock-in. You can upgrade, downgrade, or cancel your subscription at any moment with one click. Your locally saved recipes and personal collections are always yours to keep.'
    },
    {
      q: 'Does Cookly Pro work when I am offline?',
      a: 'Yes! Cookly is built with an offline-first PWA architecture. Your saved recipes, weekly meal plans, and precision cooking timers function 100% without an internet connection.'
    },
    {
      q: 'How does the AI Chef Assistant work?',
      a: 'Chef Pierre is trained on classical culinary techniques, flavor affinities, and sommelier beverage pairings. Ask for ingredient swaps (dairy-free, nut-free, vegan), over-salted soup rescues, or custom wine pairings in real time.'
    },
    {
      q: 'What is included in the Family & Team Tier?',
      a: 'The Family Tier allows up to 5 individual cook profiles, a synchronized real-time grocery list so multiple family members can shop together, and shared weekly dinner calendars.'
    },
    {
      q: 'Is my credit card charged during the 14-day free trial?',
      a: 'No. You get full access to Cookly Pro instantly with zero upfront charges. You can explore all pro perks before deciding.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* HEADER HERO */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#B8C58A]/20 to-[#8EAA85]/20 border border-[#B8C58A]/35 text-xs font-bold text-[#B8C58A] uppercase tracking-wider">
          <Crown className="w-3.5 h-3.5" />
          <span>Cookly Pro & Kitchen Pass</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F5F2E9] tracking-tight">
          Cook better, plan faster, <span className="italic text-[#B8C58A]">eat deliciously.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#B3B5AA] leading-relaxed">
          Unlock unlimited Michelin AI Chef assistance, sommelier wine pairings, daily macro targets, multi-device cloud sync, and collaborative family meal planning.
        </p>

        {/* BILLING TOGGLE */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span
            className={`text-xs font-semibold ${
              billingCycle === 'monthly' ? 'text-[#F5F2E9]' : 'text-[#82877B]'
            }`}
          >
            Monthly Billing
          </span>
          <button
            type="button"
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-14 h-8 rounded-full bg-[#20231F] border border-[#F5F2E9]/15 p-1 transition-colors relative touch-manipulation min-h-[32px]"
            aria-label="Toggle Billing Cycle"
          >
            <div
              className={`w-6 h-6 rounded-full bg-[#B8C58A] shadow-md transition-transform duration-300 ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xs font-semibold ${
                billingCycle === 'annual' ? 'text-[#F5F2E9]' : 'text-[#82877B]'
              }`}
            >
              Annual Billing
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#B8C58A]/25 border border-[#B8C58A]/40 text-[#B8C58A] text-[10px] font-bold uppercase tracking-wider">
              Save 35%
            </span>
          </div>
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* PLAN 1: STARTER FREE */}
        <div className="rounded-3xl bg-[#171916] border border-[#F5F2E9]/10 p-8 flex flex-col justify-between space-y-8 relative hover:border-[#F5F2E9]/20 transition-all shadow-xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#F5F2E9]">Cookly Starter</h3>
              <p className="text-xs text-[#82877B] leading-relaxed">
                Essential recipe discovery, serving scaling, and private local cookbook storage.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-[#F5F2E9]">$0</span>
              <span className="text-xs text-[#82877B]">/ forever</span>
            </div>

            <ul className="space-y-3 text-xs text-[#B3B5AA] pt-4 border-t border-[#F5F2E9]/10">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#B8C58A] shrink-0" />
                <span>100+ Chef-curated global recipes</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#B8C58A] shrink-0" />
                <span>Dynamic serving scaler (1 to 12 servings)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#B8C58A] shrink-0" />
                <span>1 Active weekly meal planner slot</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#B8C58A] shrink-0" />
                <span>Interactive cooking mode with step timers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#B8C58A] shrink-0" />
                <span>100% Offline browser storage</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => upgradePlan('free', billingCycle)}
            className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
              isCurrentTier('free')
                ? 'bg-[#20231F] text-[#82877B] cursor-default border border-[#F5F2E9]/10'
                : 'bg-[#20231F] hover:bg-[#282C26] text-[#F5F2E9] border border-[#F5F2E9]/15'
            }`}
          >
            {isCurrentTier('free') ? 'Current Active Plan' : 'Downgrade to Starter'}
          </button>
        </div>

        {/* PLAN 2: COOKLY PRO (FEATURED) */}
        <div className="rounded-3xl bg-gradient-to-b from-[#20231F] via-[#171916] to-[#20231F] border-2 border-[#B8C58A] p-8 flex flex-col justify-between space-y-8 relative shadow-2xl scale-[1.02] shadow-[#B8C58A]/10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#B8C58A] to-[#8EAA85] text-[#10110F] text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 fill-current" /> Most Popular
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#F5F2E9]">Cookly Pro</h3>
                <Crown className="w-4 h-4 text-[#B8C58A]" />
              </div>
              <p className="text-xs text-[#82877B] leading-relaxed">
                For passionate home chefs who want culinary intelligence, macro precision, and zero limits.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-[#F5F2E9]">
                {billingCycle === 'annual' ? '$5.20' : '$7.99'}
              </span>
              <span className="text-xs text-[#82877B]">/ month</span>
              {billingCycle === 'annual' && (
                <span className="text-[11px] text-[#B8C58A] ml-2 font-medium">($62 billed/yr)</span>
              )}
            </div>

            <ul className="space-y-3 text-xs text-[#F5F2E9] pt-4 border-t border-[#F5F2E9]/10">
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#B8C58A] shrink-0" />
                <span>Unlimited Michelin AI Chef queries & rescue</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#B8C58A] shrink-0" />
                <span>Sommelier Wine & Cocktail Pairings</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#B8C58A] shrink-0" />
                <span>Daily & Weekly Nutritional Macro Targets</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#B8C58A] shrink-0" />
                <span>1-Click Instacart & consolidated grocery list</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#B8C58A] shrink-0" />
                <span>Unlimited weekly meal plans & custom collections</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#B8C58A] shrink-0" />
                <span>Multi-Device Encrypted Cloud Sync</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => upgradePlan('pro', billingCycle)}
            className={`w-full py-4 rounded-xl text-xs font-bold tracking-wide transition-all touch-manipulation active:scale-95 shadow-lg min-h-[44px] ${
              isCurrentTier('pro')
                ? 'bg-[#B8C58A]/30 text-[#B8C58A] border border-[#B8C58A]'
                : 'bg-gradient-to-r from-[#B8C58A] to-[#8EAA85] text-[#10110F] hover:brightness-110'
            }`}
          >
            {isCurrentTier('pro') ? 'Active Pro Tier (14-Day Trial)' : 'Start 14-Day Free Pro Trial'}
          </button>
        </div>

        {/* PLAN 3: FAMILY & TEAM PASS */}
        <div className="rounded-3xl bg-[#171916] border border-[#F5F2E9]/10 p-8 flex flex-col justify-between space-y-8 relative hover:border-[#F5F2E9]/20 transition-all shadow-xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#F5F2E9]">Family Kitchen Pass</h3>
                <Users className="w-4 h-4 text-[#8EAA85]" />
              </div>
              <p className="text-xs text-[#82877B] leading-relaxed">
                Coordinate dinners, sync pantries, and collaborate across up to 5 family members.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-[#F5F2E9]">
                {billingCycle === 'annual' ? '$9.90' : '$14.99'}
              </span>
              <span className="text-xs text-[#82877B]">/ month</span>
              {billingCycle === 'annual' && (
                <span className="text-[11px] text-[#8EAA85] ml-2 font-medium">($118 billed/yr)</span>
              )}
            </div>

            <ul className="space-y-3 text-xs text-[#B3B5AA] pt-4 border-t border-[#F5F2E9]/10">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8EAA85] shrink-0" />
                <span>Everything included in Cookly Pro</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8EAA85] shrink-0" />
                <span>Up to 5 Individual Family Member Profiles</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8EAA85] shrink-0" />
                <span>Live Synchronized Shared Shopping List</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8EAA85] shrink-0" />
                <span>Kid-friendly & allergy portion scaling modes</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8EAA85] shrink-0" />
                <span>Priority VIP Concierge & Chef Support</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => upgradePlan('family', billingCycle)}
            className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
              isCurrentTier('family')
                ? 'bg-[#20231F] text-[#8EAA85] border border-[#8EAA85]'
                : 'bg-[#20231F] hover:bg-[#282C26] text-[#F5F2E9] border border-[#F5F2E9]/15'
            }`}
          >
            {isCurrentTier('family') ? 'Active Family Tier' : 'Upgrade to Family Kitchen'}
          </button>
        </div>
      </div>

      {/* PROMO CODE REDEMPTION BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-[#20231F] via-[#171916] to-[#20231F] border border-[#B8C58A]/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-[#B8C58A]" />
            <h4 className="text-sm font-bold text-[#F5F2E9]">Have an Exclusive Chef Pass or Promo Code?</h4>
          </div>
          <p className="text-xs text-[#82877B]">
            Enter codes like <span className="font-mono text-[#B8C58A] font-bold">CHEF2026</span> or <span className="font-mono text-[#B8C58A] font-bold">COOKLYPRO</span> to instantly unlock 1 Full Year of Cookly Pro free!
          </p>
          {promoMessage && (
            <p className="text-xs font-semibold text-[#9EC69A] pt-1">{promoMessage}</p>
          )}
        </div>

        <form onSubmit={handleApplyPromo} className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            placeholder="e.g. CHEF2026"
            className="px-4 py-3 rounded-xl bg-[#141613] border border-[#F5F2E9]/15 text-[#F5F2E9] text-xs font-mono uppercase placeholder-[#82877B] focus:outline-none focus:border-[#B8C58A] w-full sm:w-48"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-[#B8C58A] hover:bg-[#8EAA85] text-[#10110F] text-xs font-bold transition-all touch-manipulation active:scale-95 shrink-0 min-h-[44px]"
          >
            Apply Code
          </button>
        </form>
      </div>

      {/* FEATURE COMPARISON MATRIX TABLE */}
      <div className="space-y-6 pt-6">
        <div className="text-center space-y-2">
          <h2 className="font-editorial text-3xl text-[#F5F2E9]">Feature Comparison</h2>
          <p className="text-xs text-[#82877B]">Compare all capabilities side-by-side</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#F5F2E9]/10 bg-[#171916]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#F5F2E9]/10 bg-[#20231F]">
                <th className="py-4 px-6 text-[#E9DFC7] font-bold uppercase tracking-wider">Feature</th>
                <th className="py-4 px-6 text-[#B3B5AA] font-semibold text-center">Starter</th>
                <th className="py-4 px-6 text-[#B8C58A] font-bold text-center">Pro</th>
                <th className="py-4 px-6 text-[#8EAA85] font-semibold text-center">Family</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2E9]/5 text-[#B3B5AA]">
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#F5F2E9]">Curated Recipe Discovery</td>
                <td className="py-3.5 px-6 text-center">100+</td>
                <td className="py-3.5 px-6 text-center text-[#B8C58A] font-bold">Full Library + Pro</td>
                <td className="py-3.5 px-6 text-center text-[#8EAA85] font-bold">Full Library + Pro</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#F5F2E9]">Michelin AI Culinary Sommelier</td>
                <td className="py-3.5 px-6 text-center text-[#82877B]">3 queries/mo</td>
                <td className="py-3.5 px-6 text-center text-[#B8C58A] font-bold">Unlimited</td>
                <td className="py-3.5 px-6 text-center text-[#8EAA85] font-bold">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#F5F2E9]">Wine & Cocktail Pairings</td>
                <td className="py-3.5 px-6 text-center text-[#82877B]">—</td>
                <td className="py-3.5 px-6 text-center text-[#B8C58A]"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3.5 px-6 text-center text-[#8EAA85]"><Check className="w-4 h-4 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#F5F2E9]">Macro Goal Targets & Tracker</td>
                <td className="py-3.5 px-6 text-center text-[#82877B]">Basic Calories</td>
                <td className="py-3.5 px-6 text-center text-[#B8C58A]"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3.5 px-6 text-center text-[#8EAA85]"><Check className="w-4 h-4 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#F5F2E9]">Weekly Meal Plans</td>
                <td className="py-3.5 px-6 text-center">1 week</td>
                <td className="py-3.5 px-6 text-center text-[#B8C58A] font-bold">Unlimited Weeks</td>
                <td className="py-3.5 px-6 text-center text-[#8EAA85] font-bold">Unlimited Weeks</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#F5F2E9]">1-Click Instacart Grocery Export</td>
                <td className="py-3.5 px-6 text-center text-[#82877B]">—</td>
                <td className="py-3.5 px-6 text-center text-[#B8C58A]"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3.5 px-6 text-center text-[#8EAA85]"><Check className="w-4 h-4 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#F5F2E9]">Family Collaboration Profiles</td>
                <td className="py-3.5 px-6 text-center">1</td>
                <td className="py-3.5 px-6 text-center">1</td>
                <td className="py-3.5 px-6 text-center text-[#8EAA85] font-bold">5 Profiles</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#F5F2E9]">Multi-Device Cloud Backup</td>
                <td className="py-3.5 px-6 text-center">Local Only</td>
                <td className="py-3.5 px-6 text-center text-[#B8C58A]"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3.5 px-6 text-center text-[#8EAA85]"><Check className="w-4 h-4 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ ACCORDION */}
      <div className="space-y-6 max-w-3xl mx-auto pt-6">
        <div className="text-center space-y-2">
          <h2 className="font-editorial text-3xl text-[#F5F2E9]">Frequently Asked Questions</h2>
          <p className="text-xs text-[#82877B]">Everything you need to know about Cookly subscriptions</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-[#171916] border border-[#F5F2E9]/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 touch-manipulation min-h-[44px]"
                >
                  <span className="text-sm font-semibold text-[#F5F2E9]">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#B8C58A] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#82877B] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#B3B5AA] leading-relaxed border-t border-[#F5F2E9]/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
