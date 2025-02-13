import { useEffect, useState } from 'react';
import { League } from '../../types';
import Card from '../card/card';
import { loadData } from '../../api/getData';

import styles from './leagues.module.css';
import Spinner from '../spinner/spinner';
import ApiErrorComponent from '../apiError/apiError';
import { useGetLeaguesTournamentsDataQuery } from '../../slice/apiSlice';

export default function LeaguesTournaments({
  instance,
  type,
}: {
  instance: string;
  type: number[];
}) {
  // const [loadError, setLoadError] = useState('');
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [LoadedData, setLoadedData] = useState<null | League[]>(null);
  const { data, error, isLoading, refetch } =
    useGetLeaguesTournamentsDataQuery();

  const cardsToDraw: JSX.Element[] = [];

  // const tryLoadAgain = () => {
  //   setLoadError('');
  //   setIsLoaded(false);
  // };

  // useEffect(() => {

  // if (!loadError) {
  //   const getData = async () => {
  //     try {
  //       const data = await loadData(instance);
  //       setLoadedData(data.items);
  //       setIsLoaded(true);
  //     } catch (err) {
  //       setIsLoaded(true);
  //       setLoadError((err as Error).message);
  //     }
  //   };
  //   getData();
  // }
  // }, [loadError]);

  if (data) {
    data.items.forEach((el) => {
      if (type.includes(el.type)) {
        console.log(el.name, type.includes(el.type));
        const card = (
          <Card
            name={el.name}
            type={el.type}
            description={el.description}
            mediaId={el.mediaId}
            key={el.id}
            leagueId={el.id}
          />
        );
        cardsToDraw.push(card);
      }
    });
  }

  return (
    <main className={styles.main}>
      {isLoading && <Spinner />}
      {error && (
        <ApiErrorComponent
          msg={'Something went wrong. Try again.'}
          tryAgain={refetch}
        />
      )}
      {!isLoading && !error && (
        <>
          <h2 className={styles.sectionHeading}>{instance}</h2>
          <div className={styles.leaguesWrapper}>{cardsToDraw}</div>
        </>
      )}
    </main>
  );
}
