import { useRef, useState } from 'react';
import { useApp } from '../state/AppContext';
import { exportBundle, importBundle } from '../data/exportImport';
import ConfirmCorrection from '../components/ConfirmCorrection';
import styles from './SettingsScreen.module.css';

const TOGGLES = [
  { key: 'calmMode', label: 'Calm mode', desc: 'Removes all animations and sounds' },
  { key: 'sound', label: 'Sound effects', desc: 'Soft audio on star award' },
  { key: 'tts', label: 'Read aloud (TTS)', desc: 'Speaks task/reward labels when tapped' },
  { key: 'highContrast', label: 'High contrast', desc: 'Increases text and color contrast' },
  { key: 'parentGate', label: 'Parent gate', desc: 'Require answer to access parent area' },
  { key: 'capabilityCheck', label: 'Capability check', desc: 'Show check before skill-mode awards (P1)' },
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

      {TOGGLES.map(t => (
        <div key={t.key} className={styles.row}>
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

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Data</h2>
        <button className={styles.dataBtn} onClick={exportBundle}>
          ↓ Export backup
        </button>
        <button className={styles.dataBtn} onClick={() => importRef.current && importRef.current.click()}>
          ↑ Import backup
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
