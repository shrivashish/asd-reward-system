import { useRef, useState } from 'react';
import { putImage } from '../data/repo';
import styles from './ImagePicker.module.css';

const EMOJI_SET = [
  // Daily routine & self-care
  '⏰','🛏️','😴','🦷','🪥','🛁','🚿','🧼','🧴','🧻',
  '🚽','🧺','🧹','🧽','👕','👖','🧦','👟','🧥','🎒',
  '💊','🪮','🍽️','💧',
  // Daily needs & around the home
  '🏠','🚪','🔑','🛒','🚗','🚌','🚲','🪑','💡','📱',
  '💻','📚','☂️','👓','⌚','🧸',
  // Food & treats kids like
  '🍎','🍌','🍇','🍓','🍊','🍉','🥕','🥦','🌽','🥗',
  '🍞','🥪','🧀','🥚','🥛','🧃','🍕','🍔','🍟','🌮',
  '🍝','🍜','🍚','🍗','🍤','🥞','🧇','🍪','🍩','🍫',
  '🍬','🍭','🧁','🎂','🍦','🥤','🍿',
  // Play, activities & rewards
  '🎬','🎮','🎨','⚽','🏀','🏊','🚴','🏃','🎵','🎤',
  '🎸','🥁','🧩','🎲','🪁','🐕','🐈','🐠','🌳','🌈',
  '🌟','⭐','💪','🎁','✈️','🎪','🎯',
];

export default function ImagePicker({ value, emoji: currentEmoji, onImage, onEmoji }) {
  const [tab, setTab] = useState('emoji');
  const fileRef = useRef();

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageId = await putImage(file);
    onImage(imageId);
    e.target.value = '';
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        {['emoji', 'photo', 'upload'].map(t => (
          <button key={t} className={`${styles.tab} ${tab === t ? styles.active : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'emoji' && (
        <div className={styles.emojiGrid}>
          {EMOJI_SET.map(em => (
            <button
              key={em}
              className={`${styles.emojiBtn} ${currentEmoji === em ? styles.selected : ''}`}
              onClick={() => onEmoji(em)}
              aria-label={em}
              aria-pressed={currentEmoji === em}
            >
              {em}
            </button>
          ))}
        </div>
      )}

      {tab === 'photo' && (
        <div className={styles.photoWrap}>
          <button className={styles.captureBtn} onClick={() => fileRef.current && fileRef.current.click()}>
            📷 Take Photo
          </button>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFile} style={{ display: 'none' }} />
        </div>
      )}

      {tab === 'upload' && (
        <div className={styles.photoWrap}>
          <button className={styles.captureBtn} onClick={() => fileRef.current && fileRef.current.click()}>
            📁 Choose Image
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        </div>
      )}
    </div>
  );
}
