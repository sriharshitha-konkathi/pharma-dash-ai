import { useState } from "react";

export const useAiAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeDrug = async (result) => {
    if (!result || analyzing) return;
    setAnalyzing(true);
    setAnalysis(null);

    const brandName = result.openfda?.brand_name?.[0] || "Unknown";
    const genericName = result.openfda?.generic_name?.[0] || "Unknown";
    const indications =
      result.indications_and_usage?.[0]?.substring(0, 800) || "Not available";

    const prompt = `Analyze this drug and give a concise clinical summary:
Brand: ${brandName}
Generic: ${genericName}
Indications: ${indications}

Provide: 1) Overview 2) Key clinical points 3) Common side effects 4) Drug interactions 5) Patient counseling tips. Keep it concise.`;

    try {
      const response = await fetch("/api/nvidia/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + import.meta.env.VITE_NVIDIA_KEY,
        },
        body: JSON.stringify({
          model: "meta/llama-3.1-8b-instruct",
          max_tokens: 1024,
          messages: [
            {
              role: "system",
              content:
                "You are a pharmaceutical assistant. Give concise, clinically useful drug analysis.",
            },
            { role: "user", content: prompt },
          ],
        }),
      });

      const data = await response.json();
      setAnalysis(data.choices[0].message.content);
    } catch (error) {
      console.error("Analysis Error:", error);
      setAnalysis("⚠️ Could not analyze this drug. Try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return { analysis, analyzing, analyzeDrug };
};
