
import { Code, ExternalLink, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* 1. BRAND & MISSION */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white text-[10px] font-bold">
                P
              </div>
              <span className="font-bold text-slate-800 tracking-tight">
                PharmaDash AI
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Advancing pharmaceutical workflows through real-time data
              intelligence and precision clinical tools.
            </p>
          </div>

          {/* 2. DATA CREDIT */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Data Sources
            </h4>
            <a
              href="https://open.fda.gov/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors font-medium"
            >
              OpenFDA API <ExternalLink size={14} />
            </a>
            <p className="text-[10px] text-slate-400 mt-2 max-w-[200px]">
              Content is provided for informational purposes only and does not
              constitute medical advice.
            </p>

            <a
              href="https://build.nvidia.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors font-medium mt-2"
            >
              NVIDIA AI <ExternalLink size={14} />
            </a>
          </div>

          {/* 3. DEVELOPER SIGNATURE */}
          <div className="flex flex-col items-start md:items-end">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Developer
            </h4>
            <a
              href="https://github.com/sriharshitha-konkathi"
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 transition-all border border-slate-200"
            >
              <Code size={18} />
              View on GitHub
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 font-medium">
            © 2026 PharmaDash AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
            Built with{" "}
            <Heart size={12} className="text-rose-500 fill-rose-500" /> for the
            Medical Community
          </div>
        </div>
      </div>
    </footer>
  );
};
