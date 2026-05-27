import { useState } from "react";

export const useAiChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userText) => {
    if (!userText.trim() || loading) return;

    const userMsg = { role: "user", content: userText };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

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
                "You are PharmaDash AI — a pharmaceutical assistant. Help with drug info, side effects, interactions, and dosages. Always add a disclaimer that you are not a substitute for professional medical advice.",
            },
            ...messages,
            userMsg,
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices[0].message.content;

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return { messages, loading, sendMessage, clearChat };
};
