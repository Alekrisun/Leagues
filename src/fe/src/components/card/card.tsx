import { Link } from 'react-router';
import { BsPencilSquare } from 'react-icons/bs';
import styles from './card.module.css';

type CardProps = {
  name: string;
  description: string;
  mediaId: string;
  leagueId: string;
};

export default function Card({
  name,
  description,
  mediaId,
  leagueId,
}: CardProps) {
  // const imageUrl = `http://localhost:5037/api/image/${mediaId}`;
  return (
    <Link to={`/leagues/${leagueId}`} className={styles.card}>
      <div className={styles.imgWrapper}>
        <img src="/" alt="Team logo" />
      </div>
      <div className={styles.cardTextWrapper}>
        <div className={styles.textWrapper}>
          <p className={styles.nameText}>{name}</p>
          <span className={styles.descText}>{description}</span>
        </div>

        <button className={`btn ${styles.btnEdit}`}>
          <BsPencilSquare />
        </button>
      </div>
    </Link>
  );
}
