export const calculateSafeDose = (weight, strength) => {
  const w = parseFloat(weight);
  const s = parseFloat(strength);
  if (!w || !s || w <= 0 || s <= 0) return null;

  return (w * s).toFixed(2);
};