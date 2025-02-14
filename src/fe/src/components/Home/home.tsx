import styles from './home.module.css';
import video from '../../assets/video/video.webm';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../slice/userSlice';
import { Link } from 'react-router';

export default function Home() {
  const userStatus = useSelector(selectUserData);

  return (
    <main className={styles.main}>
      <div className={styles.videoContainer}>
        <h2 className={styles.mainHeading}>diy football</h2>
        {userStatus.isLoggedIn && 'loggedIn'}
        {!userStatus.isLoggedIn && (
          <div className={styles.mainBtnWrapper}>
            <Link to="/leagues" className={styles.mainBtn}>
              Public Leagues
            </Link>
            <Link to="/tournaments" className={styles.mainBtn}>
              Public Tournaments
            </Link>
          </div>
        )}
        <video className={styles.video} autoPlay loop muted playsInline>
          <source src={video} type="video/webm" />
        </video>
      </div>
    </main>
  );
}
