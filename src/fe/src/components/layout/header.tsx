import Cookies from 'js-cookie';
import { Link } from 'react-router';
import styles from '../layout/layout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUserData } from '../../slice/userSlice';

export default function Header() {
  const userStatus = useSelector(selectUserData);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(logoutUser());
    Cookies.remove('jwt');
  };

  return (
    <header id={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.siteHeading}>
          <h1 className={styles.siteHeading}>diy football site</h1>
        </Link>
        <div className={styles.headerBtnsWrapper}>
          {!userStatus.isLoggedIn && (
            <Link to="/signin" className={styles.headerBtn}>
              Sign In
            </Link>
          )}
          {!userStatus.isLoggedIn && (
            <Link to="/signup" className={styles.headerBtn}>
              Sign Up
            </Link>
          )}
          {userStatus.isLoggedIn && (
            <Link onClick={signOutUser} to="/" className={styles.signoutBtn}>
              Sign Out
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
