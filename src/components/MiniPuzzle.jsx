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

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const ALL_TYPES = ['shapeMatch', 'colorMatch', 'counting', 'emojiPair', 'addition', 'subtraction', 'multiplication'];

// Returns { mode:'input', question, answer, numeric }
//      or { mode:'choice', question, prompt?, choices:[{display,isAnswer}] }
function generatePuzzle(types) {
  const pool = Array.isArray(types) && types.length > 0 ? types : ALL_TYPES;
  const type = pool[Math.floor(Math.random() * pool.length)];

  // ── Text-input mode (math) ──────────────────────────────────────────────
  if (type === 'addition') {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    return { mode: 'input', question: `What is ${a} + ${b}?`, answer: String(a + b), numeric: true };
  }
  if (type === 'subtraction') {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * (a - 1)) + 1;
    return { mode: 'input', question: `What is ${a} − ${b}?`, answer: String(a - b), numeric: true };
  }
  if (type === 'multiplication') {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    return { mode: 'input', question: `What is ${a} × ${b}?`, answer: String(a * b), numeric: true };
  }

  // ── Multiple-choice mode (visual) ───────────────────────────────────────
  if (type === 'shapeMatch') {
    const three = shuffle(SHAPES).slice(0, 3);
    const answer = pick(three);
    return {
      mode: 'choice',
      question: `Tap the ${answer.label}`,
      prompt: null,
      choices: shuffle(three).map(s => ({ display: s.emoji, isAnswer: s.label === answer.label })),
    };
  }
  if (type === 'colorMatch') {
    const three = shuffle(COLORS).slice(0, 3);
    const answer = pick(three);
    return {
      mode: 'choice',
      question: `Find ${answer.label}`,
      prompt: null,
      choices: shuffle(three).map(c => ({ display: c.emoji, isAnswer: c.label === answer.label })),
    };
  }
  if (type === 'counting') {
    const count = Math.floor(Math.random() * 4) + 1;
    const others = shuffle([1, 2, 3, 4, 5].filter(n => n !== count)).slice(0, 2);
    return {
      mode: 'choice',
      question: 'How many stars?',
      prompt: '⭐'.repeat(count),
      choices: shuffle([
        { display: String(count), isAnswer: true },
        { display: String(others[0]), isAnswer: false },
        { display: String(others[1]), isAnswer: false },
      ]),
    };
  }
  // emojiPair
  const three = shuffle(ANIMALS).slice(0, 3);
  const answer = pick(three);
  return {
    mode: 'choice',
    question: 'Find the match!',
    prompt: answer.emoji,
    choices: shuffle(three).map(a => ({ display: a.emoji, isAnswer: a.label === answer.label })),
  };
}

// ── Input section (math types) ────────────────────────────────────────────
function InputSection({ puzzle, onDone, onCancel, onRefresh }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [solved, setSolved] = useState(false);
  const solvedRef = useRef(false);
  const timerRef = useRef(null);
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  function submit() {
    if (solvedRef.current) return;
    if (input.trim() === puzzle.answer) {
      solvedRef.current = true;
      setSolved(true);
      timerRef.current = setTimeout(onDone, 900);
    } else {
      setError('Not quite — try again');
      setInput('');
      onRefresh(); // new question on wrong answer
    }
  }

  if (solved) return <p className={styles.success}>⭐ Yes!</p>;

  return (
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
        {onCancel && <button className={styles.cancel} onClick={onCancel}>Cancel</button>}
        <button className={styles.confirm} onClick={submit}>Check ✓</button>
      </div>
    </>
  );
}

// ── Choice section (visual types) ─────────────────────────────────────────
function ChoiceSection({ puzzle, onDone, onCancel, onRefresh }) {
  const [answered, setAnswered] = useState(null);
  const lockedRef = useRef(false);
  const timerRef = useRef(null);
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  function handleChoice(isAnswer) {
    if (lockedRef.current) return;
    lockedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isAnswer) {
      setAnswered('correct');
      timerRef.current = setTimeout(onDone, 1100);
    } else {
      setAnswered('wrong');
      timerRef.current = setTimeout(() => {
        setAnswered(null);
        lockedRef.current = false;
        onRefresh(); // new question on wrong answer
      }, 1000);
    }
  }

  return (
    <>
      <div className={styles.choices}>
        {puzzle.choices.map((c, i) => (
          <button
            key={i}
            className={`${styles.choice} ${answered !== null ? (c.isAnswer ? styles.correct : styles.incorrect) : ''}`}
            onClick={() => handleChoice(c.isAnswer)}
            disabled={answered !== null}
            aria-label={c.display}
          >
            {c.display}
          </button>
        ))}
      </div>
      {answered && (
        <p className={styles.feedback} aria-live="polite">
          {answered === 'correct' ? '⭐ Yes!' : '👍 Good try!'}
        </p>
      )}
      {onCancel && !answered && (
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>Cancel</button>
        </div>
      )}
    </>
  );
}

// ── Main export (used by both ParentGate and TaskCard) ────────────────────
export default function MiniPuzzle({ onDone, onCancel, label = 'Answer to unlock 🔓' }) {
  const { settings } = useApp();
  const [puzzleKey, setPuzzleKey] = useState(0);
  const puzzle = useMemo(() => generatePuzzle(settings.puzzleTypes), [settings.puzzleTypes, puzzleKey]);
  function refreshPuzzle() { setPuzzleKey(k => k + 1); }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={e => e.stopPropagation()}
    >
      <div className={styles.sheet}>
        <p className={styles.gate}>{label}</p>
        <p className={styles.q}>{puzzle.question}</p>
        {puzzle.prompt && (
          <div className={styles.prompt} aria-hidden="true">{puzzle.prompt}</div>
        )}
        {puzzle.mode === 'input'
          ? <InputSection puzzle={puzzle} onDone={onDone} onCancel={onCancel} onRefresh={refreshPuzzle} />
          : <ChoiceSection puzzle={puzzle} onDone={onDone} onCancel={onCancel} onRefresh={refreshPuzzle} />
        }
      </div>
    </div>
  );
}
