import React, { useEffect, useRef, useState } from 'react';
import { ChefHat, RotateCcw, Send, Sparkles, X } from 'lucide-react';
import { useCookly } from '../context/CooklyContext';
import { Recipe } from '../types';

export interface AiChefDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeRecipe?: Recipe;
}

export const AiChefDrawer: React.FC<AiChefDrawerProps> = ({
  isOpen,
  onClose,
  activeRecipe
}) => {
  const { chefChatHistory, sendChefQuery, clearChefChat } = useCookly();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, chefChatHistory]);

  if (!isOpen) return null;

  const handleSend = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setInputText('');
    setLoading(true);
    await sendChefQuery(q, activeRecipe);
    setLoading(false);
  };

  const quickPrompts = activeRecipe
    ? [
        `🍷 Wine pairing for ${activeRecipe.name}`,
        `🥑 Make ${activeRecipe.name} dairy-free`,
        `⏱️ Adjust cooking time for 2x portions`,
        `🧂 How to fix salty sauce`
      ]
    : [
        '🍷 Suggest wine pairing for pasta',
        '🥑 Best dairy-free cream substitute',
        '⏱️ How to fix over-salted curry',
        '💪 High-protein dinner suggestion'
      ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn no-print">
      <div className="w-full max-w-md bg-[#171916] border-l border-[#F5F2E9]/15 flex flex-col h-full shadow-2xl relative">
        {/* DRAWER HEADER */}
        <div className="p-4 sm:p-5 border-b border-[#F5F2E9]/10 bg-[#141613] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#B8C58A]/30 to-[#8EAA85]/20 border border-[#B8C58A]/40 flex items-center justify-center text-[#B8C58A] shadow-md">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-editorial text-lg text-[#F5F2E9] leading-none">
                  Chef Pierre
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#B8C58A]/20 text-[#B8C58A] text-[9px] font-bold uppercase tracking-wider">
                  AI Sommelier
                </span>
              </div>
              <p className="text-[11px] text-[#82877B] truncate max-w-[200px]">
                {activeRecipe ? `Active: ${activeRecipe.name}` : 'Culinary & Pairing Companion'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={clearChefChat}
              title="Reset conversation"
              className="p-2 rounded-xl text-[#82877B] hover:text-[#F5F2E9] hover:bg-[#20231F] transition-colors touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#82877B] hover:text-[#F5F2E9] hover:bg-[#20231F] transition-colors touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ACTIVE RECIPE BANNER */}
        {activeRecipe && (
          <div className="px-4 py-2.5 bg-[#20231F] border-b border-[#F5F2E9]/10 text-xs text-[#E9DFC7] flex items-center justify-between gap-2">
            <span className="truncate text-[11px]">
              Context: <strong className="text-[#B8C58A]">{activeRecipe.name}</strong> ({activeRecipe.cuisine})
            </span>
            <span className="text-[10px] text-[#82877B] shrink-0">
              {activeRecipe.prepTimeMinutes + activeRecipe.cookTimeMinutes}m
            </span>
          </div>
        )}

        {/* CHAT MESSAGES CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chefChatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed shadow-md ${
                  msg.role === 'user'
                    ? 'bg-[#B8C58A] text-[#10110F] font-medium rounded-tr-none'
                    : 'bg-[#20231F] text-[#F5F2E9] border border-[#F5F2E9]/10 rounded-tl-none'
                }`}
              >
                {msg.recipeContextName && msg.role === 'user' && (
                  <span className="block text-[10px] text-[#10110F]/70 italic mb-1">
                    Regarding {msg.recipeContextName}
                  </span>
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <span
                  className={`block text-[9px] mt-1 text-right ${
                    msg.role === 'user' ? 'text-[#10110F]/60' : 'text-[#82877B]'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {/* QUICK CHIP SUGGESTIONS */}
              {msg.quickActions && msg.quickActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                  {msg.quickActions.map((action) => (
                    <button
                      key={action}
                      type="button"
                      onClick={() => handleSend(action)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#20231F] hover:bg-[#282C26] text-[#B8C58A] hover:text-[#F5F2E9] border border-[#B8C58A]/30 text-[11px] font-medium transition-all touch-manipulation active:scale-95"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#20231F] border border-[#F5F2E9]/10 text-xs text-[#B3B5AA] w-fit">
              <Sparkles className="w-4 h-4 text-[#B8C58A] animate-spin" />
              <span>Chef Pierre is thinking...</span>
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        {/* QUICK PROMPT CHIPS */}
        <div className="px-4 py-2 border-t border-[#F5F2E9]/10 bg-[#141613] overflow-x-auto">
          <div className="flex items-center gap-1.5 w-max">
            {quickPrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleSend(p)}
                className="px-3 py-1.5 rounded-full bg-[#20231F] hover:bg-[#282C26] text-[#E9DFC7] border border-[#F5F2E9]/10 text-[11px] font-medium whitespace-nowrap transition-colors touch-manipulation active:scale-95 min-h-[32px]"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* INPUT BOX */}
        <div className="p-4 border-t border-[#F5F2E9]/10 bg-[#171916]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for substitutes, wine pairings, heat fixes..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#20231F] border border-[#F5F2E9]/15 text-xs text-[#F5F2E9] placeholder-[#82877B] focus:outline-none focus:border-[#B8C58A]"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="p-3 rounded-xl bg-[#B8C58A] disabled:bg-[#20231F] text-[#10110F] disabled:text-[#82877B] transition-colors touch-manipulation active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
