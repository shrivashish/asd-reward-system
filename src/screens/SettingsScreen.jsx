import { useRef, useState } from 'react';
import { useApp } from '../state/AppContext';
import { exportBundle, importBundle } from '../data/exportImport';
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

export default function SettingsScreen() {
  const { settings, updateSettings, currentChildId, refresh } = useApp();
  const importRef = useRef();
  const [correcting, setCorrecting] = useState(false);

  const toggle = key => updateSettings({ [key]: !settings[key] });

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
