import styles from '../layout/layout.module.css';

export default function Header() {
  return (
    <header id={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.siteHeading}>diy football site</h1>
        <div className={styles.headerBtnsWrapper}>
          <button className={styles.headerBtn}>Login</button>
          <button className={styles.headerBtn}>Sign Up</button>
        </div>
      </div>
    </header>
  );
}
