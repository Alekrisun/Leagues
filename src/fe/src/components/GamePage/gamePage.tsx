
import { useEffect, useState, SyntheticEvent } from 'react';
import { useParams } from 'react-router';

import defaultImg from '../../assets/img/defaultImg.png';
import styles from '../../main.module.css';
import Spinner from '../spinner/spinner';
import ApiErrorComponent from '../apiError/apiError';
import { useGetLeagueInfoQuery } from '../../slice/apiSlice';

export default function GamePage() {
  const { leagueId, gameId } = useParams();  
  if (leagueId == null || gameId == null)
    return(<></>);
  const { data, error, isLoading, refetch } =
    useGetLeagueInfoQuery(leagueId);

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
          {data != null && (
            <div className={styles.leaguesWrapper}>
              <div className={styles.tableHalfCard}>
                <div className={styles.imgWrapper}>                  
                </div>              
                <div>
                  <p className={styles.nameText}>{data.teams[data.games[gameId].homeTeamId].name}</p>
                  <p className={styles.nameText}>{data.games[gameId].homeTeamScore}</p>
                </div> 
                {data.games[gameId].homeMembers
                  .map((member)=> {    
                    return <p>{data.users[member.id]} {member.score} goals, {member.help} help</p>
                  })
                }    
              </div>
              <div className={styles.tableHalfCard}>
                <div className={styles.imgWrapper}>                  
                </div>              
                <div>
                  <p className={styles.nameText}>{data.teams[data.games[gameId].guestTeamId].name}</p>
                  <p className={styles.nameText}>{data.games[gameId].guestTeamScore}</p>
                </div> 
                {data.games[gameId].guestMembers
                  .map((member)=> {    
                    return <p>{data.users[member.id]} {member.score} goals, {member.help} help</p>
                  })
                }    
              </div>
            </div>
          )}
        </>        
      )}
    </main>
  );
}
