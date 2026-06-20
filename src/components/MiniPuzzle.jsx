import { useState, useMemo } from 'react';
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

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generatePuzzle(type) {
  const types = ['shapeMatch', 'colorMatch', 'counting', 'emojiPair'];
  const effectiveType = type === 'random'
    ? types[Math.floor(Math.random() * types.length)]
    : type;

  if (effectiveType === 'shapeMatch') {
    const three = shuffle(SHAPES).slice(0, 3);
    const answer = three[Math.floor(Math.random() * 3)];
    return {
      question: `Tap the ${answer.label}`,
      prompt: null,
      choices: shuffle(three).map(s => ({ display: s.emoji, isAnswer: s.label === answer.label })),
    };
  }

  if (effectiveType === 'colorMatch') {
    const three = shuffle(COLORS).slice(0, 3);
    const answer = three[Math.floor(Math.random() * 3)];
    return {
      question: `Find ${answer.label}`,
      prompt: null,
      choices: shuffle(three).map(c => ({ display: c.emoji, isAnswer: c.label === answer.label })),
    };
  }

  if (effectiveType === 'counting') {
    const count = Math.floor(Math.random() * 4) + 1;
    const others = shuffle([1, 2, 3, 4, 5].filter(n => n !== count)).slice(0, 2);
    return {
      question: 'How many stars?',
      prompt: '⭐'.repeat(count),
      choices: shuffle([
        { display: String(count), isAnswer: true },
        { display: String(others[0]), isAnswer: false },
        { display: String(others[1]), isAnswer: false },
      ]),
    };
  }

  // emojiPair — show a target and find it among 3 choices
  const three = shuffle(ANIMALS).slice(0, 3);
  const answer = three[Math.floor(Math.random() * 3)];
  return {
    question: 'Find the match!',
    prompt: answer.emoji,
    choices: shuffle(three).map(a => ({ display: a.emoji, isAnswer: a.label === answer.label })),
  };
}

export default function MiniPuzzle({ onDone }) {
  const { settings } = useApp();
  const [answered, setAnswered] = useState(null); // null | 'correct' | 'wrong'
  const puzzle = useMemo(() => generatePuzzle(settings.puzzleType || 'random'), [settings.puzzleType]);

  function handleChoice(isAnswer) {
    if (answered) return;
    setAnswered(isAnswer ? 'correct' : 'wrong');
    setTimeout(onDone, 1100);
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Mini puzzle">
      <div className={`${styles.card} ${settings.calmMode ? styles.calm : ''}`}>
        <p className={styles.question}>{puzzle.question}</p>
        {puzzle.prompt && (
          <div className={styles.prompt} aria-hidden="true">{puzzle.prompt}</div>
        )}
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
        {!answered && (
          <button className={styles.skip} onClick={onDone}>Skip</button>
        )}
      </div>
    </div>
  );
}
