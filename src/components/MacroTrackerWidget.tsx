import React, { useState } from 'react';
import { Award, Check, Flame, Sliders, Sparkles } from 'lucide-react';
import { useCookly } from '../context/CooklyContext';

export interface MacroTrackerWidgetProps {
  plannedCalories?: number;
  plannedProtein?: number;
  plannedCarbs?: number;
  plannedFat?: number;
}

export const MacroTrackerWidget: React.FC<MacroTrackerWidgetProps> = ({
  plannedCalories = 1850,
  plannedProtein = 115,
  plannedCarbs = 190,
  plannedFat = 60
}) => {
  const { macroTargets, updateMacroTargets, subscription } = useCookly();
  const [editing, setEditing] = useState(false);
  const [calInput, setCalInput] = useState(macroTargets.dailyCalories.toString());
  const [proInput, setProInput] = useState(macroTargets.dailyProteinGrams.toString());
  const [carbInput, setCarbInput] = useState(macroTargets.dailyCarbsGrams.toString());
  const [fatInput, setFatInput] = useState(macroTargets.dailyFatGrams.toString());

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMacroTargets({
      dailyCalories: Number(calInput) || 2000,
      dailyProteinGrams: Number(proInput) || 120,
      dailyCarbsGrams: Number(carbInput) || 200,
      dailyFatGrams: Number(fatInput) || 65
    });
    setEditing(false);
  };

  const calPct = Math.min(100, Math.round((plannedCalories / macroTargets.dailyCalories) * 100));
  const proPct = Math.min(100, Math.round((plannedProtein / macroTargets.dailyProteinGrams) * 100));
  const carbPct = Math.min(100, Math.round((plannedCarbs / macroTargets.dailyCarbsGrams) * 100));
  const fatPct = Math.min(100, Math.round((plannedFat / macroTargets.dailyFatGrams) * 100));

  return (
    <div className="rounded-3xl bg-[#171916] border border-[#F5F2E9]/10 p-6 space-y-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#B8C58A]/15 border border-[#B8C58A]/30 flex items-center justify-center text-[#B8C58A]">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#F5F2E9]">Daily Nutritional Macro Target</h4>
            <p className="text-[11px] text-[#82877B]">
              Calculated against your active meal plan
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setEditing(!editing)}
          className="text-xs font-semibold text-[#B8C58A] hover:text-[#F5F2E9] flex items-center gap-1 touch-manipulation min-h-[36px] px-2.5 rounded-lg bg-[#20231F] border border-[#F5F2E9]/5"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{editing ? 'Close' : 'Adjust Targets'}</span>
        </button>
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#82877B]">Calories (kcal)</label>
            <input
              type="number"
              value={calInput}
              onChange={(e) => setCalInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#20231F] border border-[#F5F2E9]/15 text-xs text-[#F5F2E9] focus:outline-none focus:border-[#B8C58A]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#82877B]">Protein (g)</label>
            <input
              type="number"
              value={proInput}
              onChange={(e) => setProInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#20231F] border border-[#F5F2E9]/15 text-xs text-[#F5F2E9] focus:outline-none focus:border-[#B8C58A]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#82877B]">Carbs (g)</label>
            <input
              type="number"
              value={carbInput}
              onChange={(e) => setCarbInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#20231F] border border-[#F5F2E9]/15 text-xs text-[#F5F2E9] focus:outline-none focus:border-[#B8C58A]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#82877B]">Fat (g)</label>
            <input
              type="number"
              value={fatInput}
              onChange={(e) => setFatInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#20231F] border border-[#F5F2E9]/15 text-xs text-[#F5F2E9] focus:outline-none focus:border-[#B8C58A]"
            />
          </div>
          <div className="col-span-2 sm:col-span-4 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#B8C58A] text-[#10110F] text-xs font-bold transition-all touch-manipulation active:scale-95 shadow-md"
            >
              Save Daily Targets
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* CALORIES */}
          <div className="p-3.5 rounded-2xl bg-[#20231F] border border-[#F5F2E9]/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#82877B]">Calories</span>
              <span className="font-bold text-[#F5F2E9]">{plannedCalories} / {macroTargets.dailyCalories}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#10110F] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#B8C58A] to-[#8EAA85] transition-all duration-500 rounded-full"
                style={{ width: `${calPct}%` }}
              />
            </div>
            <span className="text-[10px] text-[#B8C58A] font-semibold">{calPct}% of target</span>
          </div>

          {/* PROTEIN */}
          <div className="p-3.5 rounded-2xl bg-[#20231F] border border-[#F5F2E9]/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#82877B]">Protein</span>
              <span className="font-bold text-[#F5F2E9]">{plannedProtein}g / {macroTargets.dailyProteinGrams}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#10110F] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-[#8EAA85] transition-all duration-500 rounded-full"
                style={{ width: `${proPct}%` }}
              />
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">{proPct}% of target</span>
          </div>

          {/* CARBS */}
          <div className="p-3.5 rounded-2xl bg-[#20231F] border border-[#F5F2E9]/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#82877B]">Carbs</span>
              <span className="font-bold text-[#F5F2E9]">{plannedCarbs}g / {macroTargets.dailyCarbsGrams}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#10110F] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-[#E9DFC7] transition-all duration-500 rounded-full"
                style={{ width: `${carbPct}%` }}
              />
            </div>
            <span className="text-[10px] text-amber-300 font-semibold">{carbPct}% of target</span>
          </div>

          {/* FAT */}
          <div className="p-3.5 rounded-2xl bg-[#20231F] border border-[#F5F2E9]/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#82877B]">Healthy Fats</span>
              <span className="font-bold text-[#F5F2E9]">{plannedFat}g / {macroTargets.dailyFatGrams}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#10110F] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-[#E78375] transition-all duration-500 rounded-full"
                style={{ width: `${fatPct}%` }}
              />
            </div>
            <span className="text-[10px] text-rose-300 font-semibold">{fatPct}% of target</span>
          </div>
        </div>
      )}
    </div>
  );
};
