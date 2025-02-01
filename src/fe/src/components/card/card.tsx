import { Link } from 'react-router';
import { BsPencilSquare } from 'react-icons/bs';
import { SyntheticEvent } from 'react';
import styles from './card.module.css';
import defaultImg from '../../assets/img/defaultImg.png';
const url = import.meta.env.VITE_API_URL;

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
  const imageUrl = `${url}/api/image/${mediaId}?width=130&height=130`;

  const useDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target: HTMLImageElement = e.target as HTMLImageElement;
    target.src = defaultImg;
    target.className = styles.defaultImg;
  };

  return (
    <Link to={`/leagues/${leagueId}`} className={styles.card}>
      <div className={styles.imgWrapper}>
        <img src={imageUrl} alt="Team logo" onError={useDefaultImg} />
      </div>
      <div className={styles.cardTextWrapper}>
        <div className={styles.textWrapper}>
          <p className={styles.nameText}>{name}</p>
          <span className={styles.descText}>{description}</span>
        </div>

        <button className={`${styles.btnEdit} ${styles.btn}`}>
          <BsPencilSquare />
        </button>
      </div>
    </Link>
  );
}
