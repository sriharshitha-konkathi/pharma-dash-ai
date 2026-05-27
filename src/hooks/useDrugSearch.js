import { useState } from "react";

export const useDrugSearch = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // suggestions: an array of drug names AI recommends, e.g. ["Amoxicillin", "Amoxapine"]
  // suggestionsLoading: spinner while AI thinks
  // notFound: the wrong query the user typed (we show it in the "Did you mean?" message)
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [notFound, setNotFound] = useState("");

  const searchDrug = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);
    setSuggestions([]);
    setNotFound("");

    try {
      const response = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${query}"&limit=1`,
      );

      // 🆕 Check if FDA returned a successful response first
      if (!response.ok) {
        // FDA returned 404 or any error — go to suggestions
        setNotFound(query);
        await fetchSuggestions(query);
        return;
      }

      const data = await response.json();

      if (data.results) {
        setResult(data.results[0]);
      } else {
        setNotFound(query);
        await fetchSuggestions(query);
      }
    } catch (error) {
      console.error("API Error:", error);
      setNotFound(query);
      await fetchSuggestions(query);
    } finally {
      setLoading(false);
    }
  };

  // This function asks NVIDIA AI: "User typed X, what real drugs did they mean?"
  const fetchSuggestions = async (wrongQuery) => {
    setSuggestionsLoading(true);

    try {
      const response = await fetch("/api/nvidia/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + import.meta.env.VITE_NVIDIA_KEY,
        },
        body: JSON.stringify({
          model: "meta/llama-3.1-8b-instruct",
          max_tokens: 256,
          temperature: 0.2, // low temperature = more predictable/accurate results
          messages: [
            {
              role: "system",
              content:
                'You are a pharmaceutical drug name assistant. The user searched for a drug but got the spelling wrong or the drug was not found. Suggest 5 real, commonly known medication names that are closest to what they typed. Return ONLY a JSON array of strings — no explanation, no markdown, no extra text. Example: ["Amoxicillin","Amoxapine","Ampicillin","Azithromycin","Augmentin"]',
            },
            {
              role: "user",
              content: `The user searched for: "${wrongQuery}". What real medications did they likely mean? Return only a JSON array.`,
            },
          ],
        }),
      });

      const data = await response.json();
      const aiText = data.choices[0].message.content.trim();
      //console.log("AI returned:", aiText);

      // The AI should return a JSON array like ["Drug1", "Drug2", ...]
      // We need to parse it safely
      // Sometimes AI wraps it in ```json ... ```, so we clean that first
      const cleaned = aiText.replace(/```json\n?|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      // Make sure it's actually an array of strings
      if (Array.isArray(parsed)) {
        setSuggestions(parsed.slice(0, 5)); // max 5 suggestions
      }
    } catch (error) {
      console.error("Suggestion Error:", error);
      // If AI fails, we still show a friendly "not found" — just no suggestions
      setSuggestions([]);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const clearSearch = () => {
    setResult(null);
    setSuggestions([]);
    setNotFound("");
  };

  return {
    searchDrug,
    result,
    loading,

    suggestions,
    suggestionsLoading,
    notFound,
    clearSearch,
  };
};
