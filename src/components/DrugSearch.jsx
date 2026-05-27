import  { useState } from "react";
import { Search, Info, Loader2 } from "lucide-react";
import { useDrugSearch } from "../hooks/useDrugSearch";
import { SearchResult } from "./SearchResult";

export const DrugSearch = () => {
  const [query, setQuery] = useState("");
  const{searchDrug,result,loading} = useDrugSearch();
  
  return (
    /* 1. THE CONTAINER: The "Card" that holds everything */
    <div className="bg-white p-10 rounded-3xl shadow-lg shadow-slate-200 border border-slate-100 max-w-2xl mx-auto mt-8">
      {/* 2. THE HEADER: Professional Title & Icon */}
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

      {/* 3. THE INPUT: Styled with a 'Relative' wrapper for the icon */}
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

      {/* 4. THE BUTTON: Changed from 'Search Database' to 'Initialize Search' */}
      <button
        onClick={() => searchDrug(query)}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        Initialize Search
      </button>

      {/* 5--- LOADING SPINNER --- */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          <p className="mt-4 text-slate-500 font-medium tracking-wide">
            Searching FDA Intelligence Database...
          </p>
        </div>
      )}


       {/* 6---  RESULT CARD (Pass data as a prop)--- */}
      
      <SearchResult result={result}/>
      
    </div>
  );
};
