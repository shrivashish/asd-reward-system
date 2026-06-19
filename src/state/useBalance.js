import { useState, useEffect } from 'react';
import { getBalance } from '../data/repo';

export function useBalance(childId, refreshKey) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!childId) return;
    getBalance(childId).then(setBalance);
  }, [childId, refreshKey]);

  return balance;
}
