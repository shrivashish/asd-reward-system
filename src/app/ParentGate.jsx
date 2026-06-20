import { useState, useEffect } from 'react';
import { useApp } from '../state/AppContext';
import styles from './ParentGate.module.css';

function newChallenge() {
  const a = 1 + Math.floor(Math.random() * 9); // 1–9
  const b = 1 + Math.floor(Math.random() * 9); // 1–9
  return { q: `What is ${a} + ${b}?`, a: String(a + b) };
}

export default function ParentGate() {
  const { setParentUnlocked, setView } = useApp();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [challenge, setChallenge] = useState(newChallenge);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setInput('');
      setError('');
      setChallenge(newChallenge());
    };
    document.addEventListener('open-parent-gate', handler);
    return () => document.removeEventListener('open-parent-gate', handler);
  }, []);

  function submit() {
    if (input.trim() === challenge.a) {
      setParentUnlocked(true);
      setView('tasks');
      setOpen(false);
    } else {
      setError('Not quite — try again');
      setInput('');
      setChallenge(newChallenge());
    }
  }

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Parent gate">
      <div className={styles.sheet}>
        <p className={styles.q}>{challenge.q}</p>
        <input
          className={styles.input}
          type="number"
          inputMode="numeric"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          autoFocus
          aria-label="Answer"
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={() => setOpen(false)}>Cancel</button>
          <button className={styles.confirm} onClick={submit}>Enter</button>
        </div>
      </div>
    </div>
  );
}
