import { LeaguesResponse, ResponseEnum } from '../../types';
import Card from '../card/card';
import styles from './mainSection.module.css';

type MainSectionType = { data: LeaguesResponse; type: keyof LeaguesResponse };

export default function MainSection({ data, type }: MainSectionType) {
  const leagues: JSX.Element[] = [];

  if (data[type].length) {
    data[type].forEach((el) => {
      const card = (
        <Card
          name={el.name}
          description={el.description}
          mediaId={el.mediaId}
          key={el.id}
        />
      );
      leagues.push(card);
    });
  } else {
    leagues.push(<p>Ничего не найдено</p>);
  }

  return (
    <>
      <h2 className={styles.sectionHeading}>
        {type === ResponseEnum.LEAGUES ? 'Лиги' : 'Турниры'}
      </h2>
      <div className={styles.leaguesWrapper}>{leagues}</div>
    </>
  );
}
