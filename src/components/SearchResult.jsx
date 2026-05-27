import { Sparkles, Loader2, Bot, AlertTriangle } from "lucide-react";
import { useAiAnalysis } from "../hooks/useAiAnalysis";

export const SearchResult = ({ result }) => {
  const { analysis, analyzing, analyzeDrug } = useAiAnalysis();

  if (!result) return null;

  return (
    <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Original FDA Result Card — same as before */}
      <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-indigo-600 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
              {result.openfda?.brand_name?.[0] || "Unknown Brand"}
            </h3>
            <p className="text-indigo-600 font-semibold text-sm">
              {result.openfda?.generic_name?.[0] || "Generic information unavailable"}
            </p>
          </div>
          <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded uppercase">
            Clinical Label
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Indications & Usage
          </span>
          <p className="text-slate-700 text-sm mt-1 leading-relaxed">
            {result.indications_and_usage?.[0]?.substring(0, 400)}...
          </p>
        </div>
      </div>

      {/* Analyze Button — shows only when no analysis yet */}
      {!analysis && !analyzing && (
        <button
          onClick={() => analyzeDrug(result)}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
        >
          <Sparkles size={18} />
          Analyze with AI
        </button>
      )}

      {/* Loading State */}
      {analyzing && (
        <div className="flex flex-col items-center justify-center py-10 bg-indigo-50 rounded-2xl border border-indigo-100">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="mt-3 text-indigo-700 font-semibold text-sm">
            AI is analyzing this drug...
          </p>
        </div>
      )}

      {/* AI Analysis Result */}
      {analysis && (
        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
          <div className="flex items-center gap-2 mb-4">
            <Bot size={18} className="text-indigo-600" />
            <h4 className="font-bold text-indigo-800 text-sm uppercase tracking-wider">
              AI Clinical Analysis
            </h4>
          </div>
          <div className="bg-white p-5 rounded-xl text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {analysis}
          </div>
          <div className="flex items-center gap-2 mt-4 px-3 py-2 bg-amber-50 rounded-lg border border-amber-100">
            <AlertTriangle size={12} className="text-amber-500" />
            <p className="text-[10px] text-amber-700 font-medium">
              AI-generated analysis. Always verify with a licensed pharmacist.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};