

import { useState } from "react";
import { Search, Info, Loader2, Lightbulb, Sparkles, X } from "lucide-react";
import { useDrugSearch } from "../hooks/useDrugSearch";
import { SearchResult } from "./SearchResult";

export const DrugSearch = () => {
  // console.log("🔥 DrugSearch is rendering!");
  const [query, setQuery] = useState("");

  // 🆕 We now get suggestions, suggestionsLoading, notFound, and clearSearch from the hook
  const {
    searchDrug,
    result,
    loading,
    suggestions,
    suggestionsLoading,
    notFound,
    clearSearch,
  } = useDrugSearch();


  // 🆕 When user clicks a suggestion chip, we:
  //    1. Put that name in the search box (so they see what's being searched)
  //    2. Trigger the search automatically
  const handleSuggestionClick = (drugName) => {
    setQuery(drugName);     // fill the input with correct name
    searchDrug(drugName);   // search immediately
  };

  return (
    /* 1. THE CONTAINER */
    <div className="bg-white p-10 rounded-3xl shadow-lg shadow-slate-200 border border-slate-100 max-w-2xl mx-auto mt-8">
      {/* 2. THE HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
          <Info size={20} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Drug <span className="text-indigo-600">Intelligence</span> Portal
        </h2>
      </div>

      <p className="text-slate-500 mb-6 font-medium">
        Enter a brand or generic name to analyze clinical details and FDA
        labels.
      </p>

      {/* 3. THE INPUT */}
      <div className="relative group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
          size={20}
        />
        <input
          type="text"
          placeholder="e.g., Amoxicillin or Lisinopril..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchDrug(query)}
          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* 4. THE BUTTON */}
      <button
        onClick={() => searchDrug(query)}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        Initialize Search
      </button>

      {/* 5. LOADING SPINNER (for FDA search) */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          <p className="mt-4 text-slate-500 font-medium tracking-wide">
            Searching FDA Intelligence Database...
          </p>
        </div>
      )}

      {/* ============================================================ */}
      {/* 🆕 6. "DID YOU MEAN?" SUGGESTION SECTION                     */}
      {/* This replaces the old alert(). Shows when:                   */}
      {/*   - notFound has a value (FDA returned no results)           */}
      {/*   - AND we're not currently doing the main search            */}
      {/* ============================================================ */}
      {notFound && !loading && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* The card container */}
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 relative">
            {/* Close button to dismiss suggestions */}
            <button
              onClick={clearSearch}
              className="absolute top-4 right-4 text-amber-400 hover:text-amber-600 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 rounded-xl">
                <Lightbulb size={18} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">
                  No results for{" "}
                  <span className="text-amber-700">"{notFound}"</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Check the spelling or try one of these suggestions
                </p>
              </div>
            </div>

            {/* AI is thinking... spinner */}
            {suggestionsLoading && (
              <div className="flex items-center gap-3 py-4 px-4 mt-3 bg-white rounded-xl border border-amber-100">
                <Loader2
                  size={16}
                  className="animate-spin text-indigo-600"
                />
                <span className="text-sm text-slate-500 font-medium">
                  AI is finding similar medications...
                </span>
              </div>
            )}

            {/* Suggestion chips — clickable buttons */}
            {suggestions.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-indigo-500" />
                  Did you mean
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((name, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(name)}
                      className="px-4 py-2.5 bg-white hover:bg-indigo-50 border border-amber-200 hover:border-indigo-300 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-700 transition-all active:scale-95 shadow-sm hover:shadow-md"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Edge case: AI failed to give suggestions */}
            {!suggestionsLoading && suggestions.length === 0 && (
              <p className="mt-3 text-sm text-slate-500">
                Try searching with a different spelling or the generic drug
                name.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 7. RESULT CARD (same as before) */}
      <SearchResult result={result} />
    </div>
  );
};
