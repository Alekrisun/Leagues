
import { useEffect, useState, SyntheticEvent } from 'react';
import { Link, useParams } from 'react-router';

import defaultImg from '../../assets/img/defaultImg.png';
import styles from '../../main.module.css';
import Spinner from '../spinner/spinner';
import ApiErrorComponent from '../apiError/apiError';
import { useGetLeagueInfoQuery } from '../../slice/apiSlice';

export default function TeamPage() {
  const { leagueId, teamId } = useParams();  
  if (leagueId == null)
    return(<></>);
  const { data, error, isLoading, refetch } =
    useGetLeagueInfoQuery(leagueId);
  
  const teamStats: TeamStatsCardProps = { amount: 0, goals: 0, missed: 0, wins: 0, draws: 0, loses: 0, points: 0};      
  const memberTeamStats: Record<string, MemberStatsCardProps> = {};
  const memberTeamStatsSorted: MemberStatsCardProps[] = [];
  const eventTeamStatsSorted: EventStatsCardProps[] = [];

  type EventStatsCardProps = { 
    gameId: string;
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

  if (data) {
    for(var gameKey in data.games) {
      var game = data.games[gameKey];

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
            memberTeamStats[game.homeTeamBestMemberId] = { name: data.users[game.homeTeamBestMemberId], best: 1, goals: 0, help: 0 };
          }  
        }
              
        
        for(var memberStatsKey in game.homeMembers) {
          var memberStats = game.homeMembers[memberStatsKey];
          if ((Object.keys(memberTeamStats) as Array<string>).find(key => key == memberStats.id) != null) {      
            memberTeamStats[memberStats.id].goals += memberStats.score;    
            memberTeamStats[memberStats.id].help += memberStats.help;    
          } else {
            memberTeamStats[memberStats.id] = { name: data.users[memberStats.id], best: 0, goals: memberStats.score, help: memberStats.help };
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
          
            memberTeamStats[game.guestTeamBestMemberId] = { name: data.users[game.guestTeamBestMemberId], best: 1, goals: 0, help: 0 };
          }
        }   

        for(var memberStatsKey in game.guestMembers) {
          var memberStats = game.guestMembers[memberStatsKey];
          if ((Object.keys(memberTeamStats) as Array<string>).find(key => key == memberStats.id) != null) {      
            memberTeamStats[memberStats.id].goals += memberStats.score;    
            memberTeamStats[memberStats.id].help += memberStats.help;    
          } else {
            memberTeamStats[memberStats.id] = { name: data.users[memberStats.id],  best: 0, goals: memberStats.score, help: memberStats.help };
          }   
        }        
      }

      eventTeamStatsSorted.push({ 
        gameId: game.id,
        event: data.events[game.eventId].name, 
        eventDate: data.events[game.eventId].startDate,
        result: data.teams[game.homeTeamId].name + '(' + game.homeTeamScore + ') - ('+ game.guestTeamScore + ')' + data.teams[game.guestTeamId].name
      })
    }

    for(var memberTeamStatKey in memberTeamStats) {
      memberTeamStatsSorted.push(memberTeamStats[memberTeamStatKey])
    }    
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
          <div className={styles.leaguesWrapper}>
            <div className={styles.tableCard}>
              <div className={styles.imgWrapper}>                  
              </div>
              {teamId != null && data != null && (
                <p className={styles.nameText}>{data.teams[teamId].name}</p>
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
                return (
                  <Link to={`/leagues/${leagueId}/games/${item.gameId}`}>
                    <p>{item.event} {item.result}</p>
                  </Link>
                )                
              })}                
            </div>
          </div>
        </>
      )}
    </main>
  );
}
