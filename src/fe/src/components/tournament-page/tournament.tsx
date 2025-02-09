import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Spinner from '../spinner/spinner';
import { LeagueInfo } from '../../types';
import styles from './tournament.module.css';
import { getLeague } from '../../api/getData';
import ApiErrorComponent from '../apiError/apiError';

export default function TournamentPage() {
  const { id } = useParams();  
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [leagueInfo, setLeagueInfo] = useState<LeagueInfo>();

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

  return (
    <>
      {!isLoaded && <Spinner />}
      {!!loadError && (
        <ApiErrorComponent msg={loadError} tryAgain={tryLoadAgain} />
      )}
      {isLoaded && (
        <>
          <div className={styles.headingWrapper}>
            TEST
          </div>
        </>
      )}
    </>
  );
}
