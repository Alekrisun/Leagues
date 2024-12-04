import { Link } from 'react-router';
import styles from '../layout/layout.module.css';

export default function Header() {
  return (
    <header id={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.siteHeading}>diy football site</h1>
        <div className={styles.headerBtnsWrapper}>
          <Link to="/signin" className={styles.headerBtn}>
            Sign In
          </Link>
          <Link to="/signup" className={styles.headerBtn}>
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
