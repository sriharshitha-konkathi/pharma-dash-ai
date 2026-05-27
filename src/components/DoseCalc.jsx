import React from 'react';
import { Calculator, AlertCircle, RotateCcw } from 'lucide-react';
import { useDosage } from '../hooks/useDosage';

export const DoseCalc = () => {
  const { weight, setWeight, strength, setStrength, result, clear } = useDosage();

  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 max-w-2xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Calculator className="text-indigo-600" /> Dosage Calculator
        </h2>
        <button onClick={clear} className="text-slate-400 hover:text-indigo-600 transition-colors">
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="space-y-6">
        <InputField label="Patient Weight (kg)" value={weight} onChange={setWeight} />
        <InputField label="Dosage Strength (mg/kg)" value={strength} onChange={setStrength} />

        {result && (
          <div className="mt-8 p-6 bg-indigo-600 rounded-2xl text-white animate-in zoom-in">
            <span className="text-[10px] font-bold uppercase opacity-80">Total Dose</span>
            <div className="text-4xl font-black">{result} mg</div>
            <p className="mt-4 text-[10px] flex gap-1 items-start opacity-80">
              <AlertCircle size={12} /> Verify with a pharmacist before use.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</label>
    <input 
      type="number" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg text-slate-700"
    />
  </div>
);