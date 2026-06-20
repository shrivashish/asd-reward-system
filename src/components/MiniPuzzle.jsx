import { useState, useMemo, useRef, useEffect } from 'react';
import { useApp } from '../state/AppContext';
import styles from './MiniPuzzle.module.css';

const SHAPES = [
  { label: 'circle', emoji: '⭕' },
  { label: 'triangle', emoji: '🔺' },
  { label: 'square', emoji: '🟦' },
  { label: 'star', emoji: '⭐' },
  { label: 'heart', emoji: '❤️' },
  { label: 'diamond', emoji: '💎' },
];

const COLORS = [
  { label: 'red', emoji: '🔴' },
  { label: 'blue', emoji: '🔵' },
  { label: 'green', emoji: '🟢' },
  { label: 'yellow', emoji: '🟡' },
  { label: 'purple', emoji: '🟣' },
  { label: 'orange', emoji: '🟠' },
];

const ANIMALS = [
  { label: 'cat', emoji: '🐱' },
  { label: 'dog', emoji: '🐶' },
  { label: 'bear', emoji: '🐻' },
  { label: 'rabbit', emoji: '🐰' },
  { label: 'bird', emoji: '🐦' },
  { label: 'lion', emoji: '🦁' },
  { label: 'fish', emoji: '🐟' },
  { label: 'duck', emoji: '🦆' },
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const ALL_TYPES = ['shapeMatch', 'colorMatch', 'counting', 'emojiPair', 'addition', 'subtraction', 'multiplication'];

// Returns { question, prompt, answer, numeric }
// prompt is shown as a large visual above the input (null if already in the question)
// numeric: whether to show a number keyboard on mobile
function generatePuzzle(types) {
  const pool = Array.isArray(types) && types.length > 0 ? types : ALL_TYPES;
  const type = pool[Math.floor(Math.random() * pool.length)];

  if (type === 'shapeMatch') {
    const s = pick(SHAPES);
    return { question: `What shape is ${s.emoji}?`, prompt: null, answer: s.label, numeric: false };
  }

  if (type === 'colorMatch') {
    const c = pick(COLORS);
    return { question: `What color is ${c.emoji}?`, prompt: null, answer: c.label, numeric: false };
  }

  if (type === 'counting') {
    const count = Math.floor(Math.random() * 4) + 1;
    return { question: 'How many stars?', prompt: '⭐'.repeat(count), answer: String(count), numeric: true };
  }

  if (type === 'emojiPair') {
    const a = pick(ANIMALS);
    return { question: `What animal is ${a.emoji}?`, prompt: null, answer: a.label, numeric: false };
  }

  if (type === 'addition') {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    return { question: `What is ${a} + ${b}?`, prompt: null, answer: String(a + b), numeric: true };
  }

  if (type === 'subtraction') {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * (a - 1)) + 1;
    return { question: `What is ${a} − ${b}?`, prompt: null, answer: String(a - b), numeric: true };
  }

  // multiplication
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `What is ${a} × ${b}?`, prompt: null, answer: String(a * b), numeric: true };
}

export default function MiniPuzzle({ onDone, onCancel }) {
  const { settings } = useApp();
  const puzzle = useMemo(() => generatePuzzle(settings.puzzleTypes), [settings.puzzleTypes]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [solved, setSolved] = useState(false);
  const solvedRef = useRef(false); // sync guard — prevents double-submit race
  const timerRef = useRef(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  function submit() {
    if (solvedRef.current) return;
    if (input.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      solvedRef.current = true;
      setSolved(true);
      timerRef.current = setTimeout(onDone, 900);
    } else {
      setError('Not quite — try again');
      setInput('');
    }
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Unlock check"
      onClick={e => e.stopPropagation()}
    >
      <div className={styles.sheet}>
        <p className={styles.gate}>Answer to unlock 🔓</p>
        <p className={styles.q}>{puzzle.question}</p>
        {puzzle.prompt && (
          <div className={styles.prompt} aria-hidden="true">{puzzle.prompt}</div>
        )}
        {solved ? (
          <p className={styles.success}>⭐ Yes!</p>
        ) : (
          <>
            <input
              className={styles.input}
              type={puzzle.numeric ? 'number' : 'text'}
              inputMode={puzzle.numeric ? 'numeric' : 'text'}
              value={input}
              onChange={e => { setInput(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && submit()}
              autoFocus
              aria-label="Your answer"
            />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.actions}>
              {onCancel && (
                <button className={styles.cancel} onClick={onCancel}>Cancel</button>
              )}
              <button className={styles.confirm} onClick={submit}>Check ✓</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
