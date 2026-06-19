import { useState, useEffect } from 'react';
import { getImageURL } from '../data/repo';
import styles from './ImageDisplay.module.css';

export default function ImageDisplay({ imageId, emoji, size = 48, alt = '' }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!imageId) { setUrl(null); return; }
    let objectUrl;
    getImageURL(imageId).then(u => {
      objectUrl = u;
      setUrl(u);
    });
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [imageId]);

  const style = { width: size, height: size, fontSize: size * 0.7 };

  if (url) {
    return <img src={url} alt={alt} className={styles.img} style={{ width: size, height: size }} />;
  }

  return (
    <div className={styles.emoji} style={style} role="img" aria-label={alt}>
      {emoji || '⭐'}
    </div>
  );
}
