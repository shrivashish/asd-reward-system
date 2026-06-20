import { guideContent } from '../guide/guideContent';
import styles from './GuideScreen.module.css';

export default function GuideScreen() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>Parent guide</h1>
      <p className={styles.intro}>
        How to use this tool well — including when not to.
      </p>
      {guideContent.map(section => (
        <div key={section.title} className={styles.card}>
          <h2 className={styles.cardTitle}>{section.title}</h2>
          <p className={styles.cardBody}>{section.body}</p>
        </div>
      ))}
    </div>
  );
}
