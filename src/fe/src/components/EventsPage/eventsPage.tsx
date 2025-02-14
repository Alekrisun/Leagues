import { useEffect, useState, SyntheticEvent } from 'react';
import { Link, useParams } from 'react-router';

import defaultImg from '../../assets/img/defaultImg.png';
import styles from '../../main.module.css';
import Spinner from '../spinner/spinner';
import ApiErrorComponent from '../apiError/apiError';
import { useGetLeagueInfoQuery } from '../../slice/apiSlice';

export default function EventsPage() {
  const { leagueId } = useParams();  
  if (leagueId == null)
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
              {(Object.keys(data.events) as Array<string>)
                  .sort((a, b) => data.events[a].startDate > data.events[b].startDate ? -1 : 1)
                  .map(eventKey => {
                    return (
                      <div className={styles.tableHalfCard}>
                        <div className={styles.nameText}>                  
                          <p>{data.events[eventKey].name}</p>
                        </div>              
                        <div>
                          {data.events[eventKey].games                            
                            .map(gameData => {
                              var gameExisted = (Object.keys(data.games) as Array<string>)
                                .find(gameKey => 
                                  data.games[gameKey].eventId == eventKey 
                                  && data.games[gameKey].homeTeamId == gameData.homeTeamId
                                  && data.games[gameKey].guestTeamId == gameData.guestTeamId);
                              if (gameExisted != null) {
                                return (
                                  <div className={styles.nameText}>
                                    <Link to={`/leagues/${leagueId}/games/${gameExisted}`} >
                                      <p>
                                        {data.teams[gameData.homeTeamId].name} - {data.teams[gameData.guestTeamId].name}
                                        {data.games[gameExisted].homeTeamScore} - {data.games[gameExisted].homeTeamScore}
                                      </p>
                                    </Link>
                                  </div>
                                )
                              } else {
                                return (
                                  <div className={styles.nameText}>                                
                                      <p>
                                        {data.teams[gameData.homeTeamId].name} - {data.teams[gameData.guestTeamId].name}                                    
                                      </p>
                                  </div>
                                )
                              }                    
                            })
                          }                          
                        </div>    
                      </div>
                    )                      
                  })
                }
            </div>
          )}
        </>        
      )}
    </main>
  );
}
