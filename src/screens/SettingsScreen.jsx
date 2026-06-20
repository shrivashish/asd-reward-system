import { useRef, useState } from 'react';
import { useApp } from '../state/AppContext';
import { exportBundle, importBundle } from '../data/exportImport';
import { clearAllData } from '../data/repo';
import ConfirmCorrection from '../components/ConfirmCorrection';
import styles from './SettingsScreen.module.css';

// Settings grouped into calm sections. Every row pairs an emoji icon with a
// text label — emoji are Star Board's whole icon system (image-first, P8).
const GROUPS = [
  {
    title: 'Display & sound',
    toggles: [
      { key: 'calmMode', icon: '🌙', label: 'Calm mode', desc: 'Removes all animations and sounds' },
      { key: 'sound', icon: '🔊', label: 'Sound effects', desc: 'Soft audio when a star is awarded' },
      { key: 'tts', icon: '🗣️', label: 'Read aloud', desc: 'Speaks task and reward labels when tapped' },
      { key: 'highContrast', icon: '🌗', label: 'High contrast', desc: 'Stronger text and color contrast' },
    ],
  },
  {
    title: 'Access & safety',
    toggles: [
      { key: 'parentGate', icon: '🔒', label: 'Parent gate', desc: 'Ask a question before opening the parent area' },
      { key: 'capabilityCheck', icon: '✅', label: 'Capability check', desc: 'Check in before skill-mode awards (P1)' },
    ],
  },
];

const PUZZLE_TYPES = [
  { value: 'shapeMatch',     icon: '🔺', label: 'Shapes'    },
  { value: 'colorMatch',     icon: '🎨', label: 'Colors'    },
  { value: 'counting',       icon: '⭐', label: 'Counting'  },
  { value: 'emojiPair',      icon: '🐱', label: 'Emoji'     },
  { value: 'addition',       icon: '➕', label: 'Addition'  },
  { value: 'subtraction',    icon: '➖', label: 'Subtract'  },
  { value: 'multiplication', icon: '✖️', label: 'Multiply'  },
];

export default function SettingsScreen() {
  const { settings, updateSettings, currentChildId, refresh } = useApp();
  const importRef = useRef();
  const [correcting, setCorrecting] = useState(false);

  const toggle = key => updateSettings({ [key]: !settings[key] });

  function togglePuzzleType(value) {
    const current = settings.puzzleTypes || [];
    const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    if (next.length === 0) return; // keep at least one selected
    updateSettings({ puzzleTypes: next });
  }

  async function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importBundle(file);
      alert('Import successful — please reload the app.');
    } catch (err) {
      alert('Import failed: ' + err.message);
    }
    e.target.value = '';
  }

  async function handleClearData() {
    const ok = window.confirm(
      'This erases all children, tasks, rewards and earned stars on this device. ' +
      'This cannot be undone. Export a backup first if you want to keep it.\n\nClear all data?'
    );
    if (!ok) return;
    await clearAllData();
    window.location.reload();
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>Settings</h1>
      <p className={styles.intro}>
        Tune Star Board to fit your child. Nothing here ever removes a star they have earned.
      </p>

      {GROUPS.map(group => (
        <div key={group.title} className={styles.section}>
          <h2 className={styles.sectionTitle}>{group.title}</h2>
          {group.toggles.map(t => (
            <div key={t.key} className={styles.row}>
              <span className={styles.rowIcon} aria-hidden="true">{t.icon}</span>
              <div className={styles.rowInfo}>
                <span className={styles.rowLabel}>{t.label}</span>
                <span className={styles.rowDesc}>{t.desc}</span>
              </div>
              <button
                role="switch"
                aria-checked={settings[t.key]}
                className={`${styles.toggle} ${settings[t.key] ? styles.on : ''}`}
                onClick={() => toggle(t.key)}
                aria-label={t.label}
              >
                <span className={styles.thumb} />
              </button>
            </div>
          ))}
        </div>
      ))}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Puzzles</h2>
        <div className={styles.row}>
          <span className={styles.rowIcon} aria-hidden="true">🧩</span>
          <div className={styles.rowInfo}>
            <span className={styles.rowLabel}>Puzzle on done</span>
            <span className={styles.rowDesc}>Show a quick puzzle each time a task is completed</span>
          </div>
          <button
            role="switch"
            aria-checked={settings.puzzleOnTaskDone}
            className={`${styles.toggle} ${settings.puzzleOnTaskDone ? styles.on : ''}`}
            onClick={() => toggle('puzzleOnTaskDone')}
            aria-label="Puzzle on done"
          >
            <span className={styles.thumb} />
          </button>
        </div>

        {settings.puzzleOnTaskDone && (
          <>
            <p className={styles.sectionNote}>Choose which puzzle types to include — at least one must stay on.</p>
            <div className={styles.chipGrid}>
              {PUZZLE_TYPES.map(t => {
                const on = (settings.puzzleTypes || []).includes(t.value);
                return (
                  <button
                    key={t.value}
                    className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                    onClick={() => togglePuzzleType(t.value)}
                    aria-pressed={on}
                    aria-label={t.label}
                  >
                    <span aria-hidden="true">{t.icon}</span>
                    {t.label}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Data</h2>
        <p className={styles.sectionNote}>
          Everything stays on this device. A backup is the only way to move it to
          another — keep it somewhere safe.
        </p>
        <button className={styles.dataBtn} onClick={exportBundle}>
          💾 Export backup
        </button>
        <button className={styles.dataBtn} onClick={() => importRef.current && importRef.current.click()}>
          📂 Import backup
        </button>
        <input ref={importRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
        <button className={styles.dangerBtn} onClick={handleClearData}>
          🗑️ Clear all data
        </button>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Corrections</h2>
        <p className={styles.sectionNote}>
          Stars earned are permanent. The only downward move is fixing an accidental
          tap — logged as a correction, never as a punishment.
        </p>
        <button
          className={styles.dataBtn}
          onClick={() => setCorrecting(true)}
          disabled={!currentChildId}
        >
          ✎ Correct a mis-tap
        </button>
      </div>

      {correcting && (
        <ConfirmCorrection
          childId={currentChildId}
          onDone={() => { setCorrecting(false); refresh(); alert('Correction logged.'); }}
          onCancel={() => setCorrecting(false)}
        />
      )}
    </div>
  );
}
