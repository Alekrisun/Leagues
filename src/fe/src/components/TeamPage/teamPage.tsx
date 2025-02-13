
import { useEffect, useState, SyntheticEvent } from 'react';
import { useParams } from 'react-router';
import styles from '../../main.module.css';

import Spinner from '../spinner/spinner';
import { LeagueInfo } from '../../types';
import { getLeague } from '../../api/getData';
import ApiErrorComponent from '../apiError/apiError';
import defaultImg from '../../assets/img/defaultImg.png';
const url = import.meta.env.VITE_API_URL;

export default function TeamPage() {
  const { leagueId, teamId } = useParams();  
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [league, setLeagueInfo] = useState<LeagueInfo>();
  
  //let eventCards: JSX.Element[] = [];
  let imageUrl;
  const teamStats: TeamStatsCardProps = { amount: 0, goals: 0, missed: 0, wins: 0, draws: 0, loses: 0, points: 0};      
  const memberTeamStats: Record<string, MemberStatsCardProps> = {};
  const memberTeamStatsSorted: MemberStatsCardProps[] = [];
  const eventTeamStatsSorted: EventStatsCardProps[] = [];

  type EventStatsCardProps = { 
    event: string; 
    eventDate: Date;
    result: string;
  };

  type TeamStatsCardProps = { 
    amount: number; 
    goals: number;
    missed: number;
    wins: number;
    draws: number;
    loses: number;
    points: number;  
  };

  type MemberStatsCardProps = { 
    name: string;
    best: number; 
    goals: number;
    help: number;    
  };

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
          const data = await getLeague(leagueId!);
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
    imageUrl = `${url}/api/image/${league.mediaId}?width=130&height=130`;

    for(var gameKey in league.games) {
      var game = league.games[gameKey];

      if (game.homeTeamId != teamId && game.guestTeamId != teamId)
        continue;

      if (game.homeTeamId == teamId) {
        teamStats.amount += 1;
        teamStats.goals += game.homeTeamScore;
        teamStats.missed += game.guestTeamScore;

        if (game.homeTeamScore > game.guestTeamScore) {          
          teamStats.wins += 1;   
          teamStats.points += 3; 
        } 
        if (game.homeTeamScore < game.guestTeamScore) {
          teamStats.loses += 1;
        }      
        if (game.homeTeamScore == game.guestTeamScore) {
          teamStats.draws += 1;
          teamStats.points += 1;
        }

        if (game.homeTeamBestMemberId != null) {
          if ((Object.keys(memberTeamStats) as Array<string>).find(key => key == game.homeTeamBestMemberId) != null) {      
            memberTeamStats[game.homeTeamBestMemberId].best += 1;    
          } else {
            memberTeamStats[game.homeTeamBestMemberId] = { name: league.users[game.homeTeamBestMemberId], best: 1, goals: 0, help: 0 };
          }  
        }
              
        
        for(var memberStatsKey in game.homeMembers) {
          var memberStats = game.homeMembers[memberStatsKey];
          if ((Object.keys(memberTeamStats) as Array<string>).find(key => key == memberStats.id) != null) {      
            memberTeamStats[memberStats.id].goals += memberStats.score;    
            memberTeamStats[memberStats.id].help += memberStats.help;    
          } else {
            memberTeamStats[memberStats.id] = { name: league.users[memberStats.id], best: 0, goals: memberStats.score, help: memberStats.help };
          }   
        }
      }

      if (game.guestTeamId == teamId) {
        teamStats.amount += 1;
        teamStats.goals += game.guestTeamScore;
        teamStats.missed += game.homeTeamScore;

        if (game.homeTeamScore < game.guestTeamScore) {          
          teamStats.wins += 1;   
          teamStats.points += 3; 
        } 
        if (game.homeTeamScore > game.guestTeamScore) {
          teamStats.loses += 1;
        }      
        if (game.homeTeamScore == game.guestTeamScore) {
          teamStats.draws += 1;
          teamStats.points += 1;
        }

        if (game.guestTeamBestMemberId != null) {
          if ((Object.keys(memberTeamStats) as Array<string>).find(key => key == game.guestTeamBestMemberId) != null) {      
            memberTeamStats[game.guestTeamBestMemberId].best += 1;    
          } else {
          
            memberTeamStats[game.guestTeamBestMemberId] = { name: league.users[game.guestTeamBestMemberId], best: 1, goals: 0, help: 0 };
          }
        }   

        for(var memberStatsKey in game.guestMembers) {
          var memberStats = game.guestMembers[memberStatsKey];
          if ((Object.keys(memberTeamStats) as Array<string>).find(key => key == memberStats.id) != null) {      
            memberTeamStats[memberStats.id].goals += memberStats.score;    
            memberTeamStats[memberStats.id].help += memberStats.help;    
          } else {
            memberTeamStats[memberStats.id] = { name: league.users[memberStats.id],  best: 0, goals: memberStats.score, help: memberStats.help };
          }   
        }        
      }

      eventTeamStatsSorted.push({ 
        event: league.events[game.eventId].name, 
        eventDate: league.events[game.eventId].startDate,
        result: league.teams[game.homeTeamId].name + '(' + game.homeTeamScore + ') - ('+ game.guestTeamScore + ')' + league.teams[game.guestTeamId].name
      })
    }

    for(var memberTeamStatKey in memberTeamStats) {
      memberTeamStatsSorted.push(memberTeamStats[memberTeamStatKey])
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
              <div className={styles.tableCard}>
                <div className={styles.imgWrapper}>                  
                </div>
                {teamId != null && league != null && (
                  <p className={styles.nameText}>{league.teams[teamId].name}</p>
                )}                
              </div>
              <div className={styles.tableCard}>
                <p>Стата команды</p>
                <p>{teamStats.amount} amount - {teamStats.wins} wins, {teamStats.draws} draws, {teamStats.loses} loses, {teamStats.goals} goals, {teamStats.missed} missed, {teamStats.points} points</p>
              </div>
              <div className={styles.tableCard}>
                <p>Стата игроков</p>
                {memberTeamStatsSorted
                  .sort((a, b) => a.goals + a.help > b.goals + a.help ? -1 : 1)
                  .map((item, index) => {    
                  return <p>{index + 1}. {item.name} {item.best} best, {item.goals} goals, {item.help} help, {item.goals + item.help} sum</p>
                })}                
              </div>
              <div className={styles.tableCard}>
                <p>Календарь</p>
                {eventTeamStatsSorted
                  .sort((a, b) => a.eventDate > b.eventDate ? -1 : 1)
                  .map((item, index) => {    
                  return <p>{item.event} {item.result}</p>
                })}                
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
