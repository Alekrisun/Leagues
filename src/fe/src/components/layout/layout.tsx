import { Outlet } from 'react-router';
import styles from './Layout.module.css';
import Header from '../header/header';
import Footer from '../footer/footer';

export default function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
