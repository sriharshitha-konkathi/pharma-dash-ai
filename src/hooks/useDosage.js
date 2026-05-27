import { useState } from 'react';
import { calculateSafeDose } from '../utils/calculate';

export const useDosage = () => {
  const [weight, setWeight] = useState('');
  const [strength, setStrength] = useState('');
  
  const result = calculateSafeDose(weight, strength);

  const clear = () => {
    setWeight('');
    setStrength('');
  };

  return { weight, setWeight, strength, setStrength, result, clear };
};