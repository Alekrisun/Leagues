import { useEffect, useState } from 'react';
import { League, LeaguesResponse, ResponseEnum } from '../../types';
import Card from '../card/card';
import { loadLeaguesData } from '../../api/getData';

import styles from './leagues.module.css';

export default function Leagues() {
  const [loadError, setLoadError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [leaguesData, setLeaguesData] = useState<null | League[]>(null);
  const leagues: JSX.Element[] = [];

  useEffect(() => {
    if (!loadError) {
      const loadData = async () => {
        try {
          const data = await loadLeaguesData('leagues');
          setLeaguesData(data.leagues);
          setIsLoaded(true);
        } catch (err) {
          setIsLoaded(true);
          setLoadError((err as Error).message);
        }
      };
      loadData();
    }
  }, [loadError]);

  if (leaguesData) {
    leaguesData.forEach((el) => {
      const card = (
        <Card
          name={el.name}
          description={el.description}
          mediaId={el.mediaId}
          key={el.id}
          leagueId={el.id}
        />
      );
      leagues.push(card);
    });
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.sectionHeading}>Leagues</h2>
      <div className={styles.leaguesWrapper}>{leagues}</div>
    </main>
  );
}
