import { useState } from 'react';
import { addCorrection } from '../data/repo';
import styles from './ConfirmCorrection.module.css';

export default function ConfirmCorrection({ childId, onDone, onCancel }) {
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState(-1);

  async function confirm() {
    if (!note.trim()) return;
    await addCorrection(childId, amount, note);
    onDone();
  }

  return (
    <div className={styles.wrap} role="dialog" aria-modal="true">
      <h2 className={styles.title}>Correct a mis-tap</h2>
      <p className={styles.desc}>
        This is for fixing an accidental tap only — not for removing stars as a consequence.
      </p>
      <label className={styles.fieldLabel}>
        Stars to correct (negative)
        <input
          type="number"
          className={styles.input}
          value={amount}
          max={0}
          onChange={e => setAmount(Number(e.target.value))}
        />
      </label>
      <label className={styles.fieldLabel}>
        Note (required)
        <input
          type="text"
          className={styles.input}
          placeholder="e.g. accidentally tapped twice"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      </label>
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onCancel}>Cancel</button>
        <button className={styles.confirm} onClick={confirm} disabled={!note.trim()}>
          Apply Correction
        </button>
      </div>
    </div>
  );
}
