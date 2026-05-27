import {
  Search,
  Calculator,
  Activity,
  ShieldCheck,
  Globe,
  Bot,
} from "lucide-react";

export const Home = ({ setActiveTab }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* 1. HERO SECTION */}
      <div className="mb-16 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
          Clinical <span className="text-indigo-600">Intelligence</span>{" "}
          Dashboard
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">
          Access real-time FDA data and high-precision clinical tools designed
          for modern pharmacy workflows.
        </p>
      </div>

      {/* 2. ACTION CARDS GRID */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Card 1: Drug Search */}
        <button
          onClick={() => setActiveTab("search")}
          className="group p-8 bg-white rounded-4xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-indigo-100 hover:border-indigo-100 transition-all text-left relative overflow-hidden"
        >
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Search size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Drug Intelligence
          </h3>
          <p className="text-slate-500 mb-6 leading-relaxed">
            Search the OpenFDA database for clinical labels, generic names, and
            indications.
          </p>
          <div className="flex items-center text-indigo-600 font-bold text-sm">
            Launch Portal
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </button>

        {/* Card 2: Dosage Calculator */}
        <button
          onClick={() => setActiveTab("calculate")}
          className="group p-8 bg-white rounded-4xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-indigo-100 hover:border-indigo-100 transition-all text-left relative overflow-hidden"
        >
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Calculator size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Dosage Calculator
          </h3>
          <p className="text-slate-500 mb-6 leading-relaxed">
            Calculate weight-based pediatric and adult dosages with clinical
            precision.
          </p>
          <div className="flex items-center text-indigo-600 font-bold text-sm">
            Open Calculator
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </button>

         {/* Card 3: Ai Assistant */}

      <button
        onClick={() => setActiveTab("ai")}
        className="group p-8 bg-indigo-600 rounded-4xl border border-indigo-500 shadow-xl shadow-indigo-200/50 hover:bg-indigo-700 transition-all text-left relative overflow-hidden"
      >
        <div className="p-4 bg-white/20 text-white rounded-2xl w-fit mb-6 group-hover:bg-white/30 transition-colors">
          <Bot size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">AI Assistant</h3>
        <p className="text-indigo-200 mb-6 leading-relaxed">
          Ask about drug interactions, side effects, dosages, and pharmacology —
          powered by AI.
        </p>
        <div className="flex items-center text-white font-bold text-sm">
          Start Chat
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
        </button>
        
      </div>

      

      {/* 3. SYSTEM STATUS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusPill
          icon={<Globe size={16} />}
          label="FDA Database"
          value="Online"
          color="text-emerald-500"
        />
        <StatusPill
          icon={<Activity size={16} />}
          label="System Latency"
          value="12ms"
          color="text-slate-500"
        />
        <StatusPill
          icon={<ShieldCheck size={16} />}
          label="Security"
          value="Verified"
          color="text-indigo-500"
        />
      </div>
    </div>
  );
};

// Internal sub-component for the status pills
const StatusPill = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">
    <div className="text-slate-400">{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
        {label}
      </p>
      <p className={`text-sm font-bold ${color}`}>{value}</p>
    </div>
  </div>
);
