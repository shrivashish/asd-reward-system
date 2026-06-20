import { useState, useEffect } from 'react';
import { useApp } from '../state/AppContext';
import MiniPuzzle from '../components/MiniPuzzle';

export default function ParentGate() {
  const { setParentUnlocked, setView } = useApp();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    document.addEventListener('open-parent-gate', handler);
    return () => document.removeEventListener('open-parent-gate', handler);
  }, []);

  function handleSuccess() {
    setParentUnlocked(true);
    setView('tasks');
    setOpen(false);
  }

  if (!open) return null;

  return (
    <MiniPuzzle
      onDone={handleSuccess}
      onCancel={() => setOpen(false)}
      label="Parent area 🔒"
    />
  );
}
