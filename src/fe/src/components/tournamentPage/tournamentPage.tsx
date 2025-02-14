
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Spinner from '../spinner/spinner';
import { LeagueInfo } from '../../types';
import { getLeague } from '../../api/getData';
import ApiErrorComponent from '../apiError/apiError';

import styles from './tournamentPage.module.css';
import EventTournamentCard from './eventTournamentPage';

export default function TournamentPage() {
  const { id } = useParams();  
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [league, setLeagueInfo] = useState<LeagueInfo>();
  let eventCards: JSX.Element[] = [];

  const tryLoadAgain = () => {
    setLoadError('');
    setIsLoaded(false);
  };

  useEffect(() => {
    if (!loadError) {
      const loadData = async () => {
        try {
          const data = await getLeague(id!);
          setLeagueInfo(data);
          setIsLoaded(true);
        } catch (err) {
          setIsLoaded(true);
          setLoadError((err as Error).message);
        }
      };
      loadData();
    }
  }, [loadError]);

  if (league) {  
    eventCards = [];  
    for (var key in league.events) {   
      var event = league.events[key];
      const card = (<EventTournamentCard
          eventId={key}
          event={event}
          games={league.games}
          teams={league.teams}
        />  
      ); 
      eventCards.push(card);
    }    
  }  
  return (
    <>
      <main className={styles.main}>
        {!isLoaded && <Spinner />}
        {!!loadError && (
          <ApiErrorComponent msg={loadError} tryAgain={tryLoadAgain} />
        )}
        {isLoaded && !loadError && (
          <>
            <div className={styles.leaguesWrapper}>
              <div className={styles.tableCardHalf}>
              <p className={styles.nameText}>{league!.name}</p>
              </div> 
              <div className={styles.tableCardHalf}>
              <p className={styles.nameText}>картинка</p>
              </div> 
            </div>
            <div className={styles.leaguesWrapper}>{eventCards}</div>
          </>
        )}
      </main>
    </>
  );
}
