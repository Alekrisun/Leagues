import { Outlet } from 'react-router';
import styles from './Layout.module.css';
import Header from './header';

export default function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
