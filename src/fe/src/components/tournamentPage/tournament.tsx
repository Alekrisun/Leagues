
import { useEffect, useState, SyntheticEvent } from 'react';
import { useParams } from 'react-router';

import Spinner from '../spinner/spinner';
import { LeagueInfo, EventLeagueInfo } from '../../types';
import { getLeague } from '../../api/getData';
import ApiErrorComponent from '../apiError/apiError';
import defaultImg from '../../assets/img/defaultImg.png';
const url = import.meta.env.VITE_API_URL;

import styles from './tournament.module.css';
import EventTournamentCard from './eventTournamentPage';

export default function TournamentPage() {
  const { id } = useParams();  
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [league, setLeagueInfo] = useState<LeagueInfo>();
  const eventCards: JSX.Element[] = [];

  const useDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target: HTMLImageElement = e.target as HTMLImageElement;
    target.src = defaultImg;
    target.className = styles.defaultImg;
  };

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
    for (var key in league.events) {
      
      var value = league.events[key];

      console.log(value);
      //TODO: map entity

      const card = (<EventTournamentCard
          id={key}
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
