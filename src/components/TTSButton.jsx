import { useApp } from '../state/AppContext';
import styles from './TTSButton.module.css';

export default function TTSButton({ text }) {
  const { settings } = useApp();
  if (!settings.tts) return null;

  function speak(e) {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utt = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utt);
    }
  }

  return (
    <button className={styles.btn} onClick={speak} aria-label={`Read aloud: ${text}`}>
      🔊
    </button>
  );
}
