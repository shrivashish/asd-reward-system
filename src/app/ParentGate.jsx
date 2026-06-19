import { useState, useEffect } from 'react';
import { useApp } from '../state/AppContext';
import styles from './ParentGate.module.css';

const CHALLENGE = { q: 'What is 7 + 5?', a: '12' };

export default function ParentGate() {
  const { setParentUnlocked } = useApp();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = () => { setOpen(true); setInput(''); setError(''); };
    document.addEventListener('open-parent-gate', handler);
    return () => document.removeEventListener('open-parent-gate', handler);
  }, []);

  function submit() {
    if (input.trim() === CHALLENGE.a) {
      setParentUnlocked(true);
      setOpen(false);
    } else {
      setError('Not quite — try again');
      setInput('');
    }
  }

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Parent gate">
      <div className={styles.sheet}>
        <p className={styles.q}>{CHALLENGE.q}</p>
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
