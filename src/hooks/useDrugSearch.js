import { useState } from "react";

export const useDrugSearch = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchDrug = async (query) => {
    if (!query.trim()) return;

    setLoading(true); 
    setResult(null); 

    try {
      const response = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${query}"&limit=1`,
      );
      const data = await response.json(); 
      
      if (data.results) {
        setResult(data.results[0]); 
      } else {
        alert("Medication not found. Check the spelling!");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Connection failed. Please try again.");
    } finally {
      setLoading(false); 
    }
  };
  return { searchDrug, result, loading };
};


