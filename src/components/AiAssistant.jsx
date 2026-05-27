// Step 1 — Imports (same pattern as your DrugSearch.jsx)
import { useState, useRef, useEffect } from "react";
import { Bot, Send, Trash2, Sparkles, Loader2, User } from "lucide-react";
import { useAiChat } from "../hooks/useAiChat";

// Step 2 — Suggestion chips (shown when chat is empty)
const SUGGESTIONS = [
  "What are the side effects of Metformin?",
  "Can I take Ibuprofen with Aspirin?",
  "Explain how ACE inhibitors work",
  "What is the difference between Omeprazole and Pantoprazole?",
];

export const AiAssistant = () => {
  // Step 3 — Hook + local state for input field
  const { messages, loading, sendMessage, clearChat } = useAiChat();
  const [input, setInput] = useState("");

  // Step 4 — Auto-scroll to bottom when new message arrives
  // useRef gives us a reference to a DOM element
  // useEffect runs every time messages change → scrolls to bottom
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Step 5 — Send handler (called on button click or Enter key)
  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput(""); // clear input after sending
  };

  // Step 6 — JSX Layout
  return (
    <div
      className="bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 max-w-3xl mx-auto mt-8 flex flex-col overflow-hidden"
      style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}
    >
      {/* ======= HEADER ======= */}
      {/* Same pattern as your DrugSearch header — icon + title */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 rounded-xl text-white">
            <Bot size={22} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">
              AI Pharma <span className="text-indigo-600">Assistant</span>
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              Powered by NVIDIA AI
            </p>
          </div>
        </div>

        {/* Show clear button only when there are messages */}
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="text-slate-400 hover:text-rose-500 transition-colors p-2 rounded-lg hover:bg-rose-50"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* ======= CHAT AREA ======= */}
      {/* This is the scrollable middle section */}
      <div className="grow overflow-y-auto px-6 py-6 space-y-4">
        {/* When no messages — show suggestions */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5">
              <Sparkles size={28} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Ask me anything about pharmaceuticals
            </h3>
            <p className="text-sm text-slate-500 mb-8">
              Drug info, interactions, side effects, and dosage guidance.
            </p>

            {/* Suggestion buttons — onClick sends the text directly */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {SUGGESTIONS.map((text, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(text)}
                  className="text-left px-4 py-3 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 rounded-xl text-sm text-slate-600 hover:text-indigo-700 transition-all font-medium"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* When messages exist — map over them */
          /* Same concept as mapping movies in StreamFlix */
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar icon — user gets dark, AI gets indigo */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-slate-800" : "bg-indigo-100"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={16} className="text-white" />
                ) : (
                  <Bot size={16} className="text-indigo-600" />
                )}
              </div>

              {/* Message bubble — user gets dark bg, AI gets light bg */}
              <div
                className={`max-w-[75%] px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-slate-800 text-white rounded-2xl rounded-tr-md"
                    : "bg-slate-50 text-slate-700 rounded-2xl rounded-tl-md"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}

        {/* Loading spinner — same Loader2 from your DrugSearch */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Bot size={16} className="text-indigo-600" />
            </div>
            <div className="bg-slate-50 rounded-2xl rounded-tl-md px-5 py-3.5">
              <Loader2 size={14} className="animate-spin text-slate-500" />
            </div>
          </div>
        )}

        {/* Invisible div at the bottom — scrollIntoView targets this */}
        <div ref={chatEndRef} />
      </div>

      {/* ======= DISCLAIMER ======= */}
      <div className="px-6">
        <p className="text-[10px] text-amber-700 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 font-medium">
          ⚠️ AI assistant for informational purposes only. Always verify with a
          licensed pharmacist.
        </p>
      </div>

      {/* ======= INPUT AREA ======= */}
      {/* Same input pattern as your DrugSearch — input + button */}
      <div className="px-6 py-4 border-t border-slate-100">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about any drug, interaction, or dosage..."
            className="grow px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm text-slate-700 placeholder:text-slate-400"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-2xl transition-all active:scale-95 font-bold text-sm shadow-lg shadow-indigo-100"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};