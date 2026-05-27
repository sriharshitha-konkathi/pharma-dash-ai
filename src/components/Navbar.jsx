
import { FlaskConical ,Bot } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 shadow-sm fixed top-0 w-full z-50">
      
      {/* 1. Clickable Logo  */}
      <div 
        onClick={() => setActiveTab('home')} 
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
          <FlaskConical size={24} />
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
         Pharma<span className="text-indigo-600">Dash</span> <span className="text-sm text-slate-400 font-medium">AI</span>
        </h1>
      </div>

      {/* 2. Navigation Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={() => setActiveTab('search')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'search' 
            ? 'bg-indigo-50 text-indigo-600' 
            : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Drug Search
        </button>

        <button 
          onClick={() => setActiveTab('calculate')} 
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'calculate' 
            ? 'bg-indigo-50 text-indigo-600' 
            : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Dosage Calculator
        </button>


        <button 
          onClick={() => setActiveTab('ai')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-1.5 ${
             activeTab === 'ai' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-indigo-600 hover:bg-indigo-50 border border-indigo-200'
               }`}
               >
            <Bot size={16} />
               AI Assistant
             </button>
      </div>
    </nav>
  );
};