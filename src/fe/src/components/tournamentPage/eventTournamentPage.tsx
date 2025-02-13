import { EventLeagueInfo, GameLeagueInfo, TeamLeagueInfo } from '../../types';
import styles from './tournamentPage.module.css';

type PlayOffCardProps = {
  eventId: string;
  event: EventLeagueInfo;
  games: GameLeagueInfo[];
  teams: Record<string, TeamLeagueInfo>;
};

function PlayOffTournamentCard({
  eventId,
  event,
  games,
  teams
}: PlayOffCardProps) {  

  return (  
    <div className={styles.tableCardHalf}>
      <p>{eventId} - {event.name} PlayOff</p>
      {games.map((game) => {        
        return <p>{teams[game.homeTeamId].name} {game.homeTeamScore} - {game.guestTeamScore} {teams[game.guestTeamId].name} </p>
      })}
    </div>  
    
  ); 
}

type GroupCardProps = {
  eventId: string;
  event: EventLeagueInfo;
  games: GameLeagueInfo[];
  teams: Record<string, TeamLeagueInfo>;
};

type StatsCardProps = { 
  name: string; 
  goals: number;
  missed: number;
  wins: number;
  draws: number;
  loses: number;
  points: number;  
};

function GroupTournamentCard({
  eventId,
  event,
  games,
  teams
}: GroupCardProps) {  

  const stats: Record<string, StatsCardProps> = {};
  const statsCard: StatsCardProps[] = [];

  games.map((game) => {
    const homeStats: StatsCardProps = { name: '', goals: game.homeTeamScore, missed: game.guestTeamScore, wins: 0, draws: 0, loses: 0, points: 0};
    const guestStats: StatsCardProps = { name: '', goals: game.guestTeamScore, missed: game.homeTeamScore, wins: 0, draws: 0, loses: 0, points: 0};

    if (game.homeTeamScore > game.guestTeamScore) {
      homeStats.wins += 1;   
      homeStats.points += 3; 
      guestStats.loses += 1;
    } 
    if (game.homeTeamScore < game.guestTeamScore) {
      guestStats.wins += 1;
      guestStats.points += 3; 
      homeStats.loses += 1;
    }      
    if (game.homeTeamScore == game.guestTeamScore) {
      homeStats.draws += 1;
      homeStats.points += 1;
      guestStats.draws += 1;
      guestStats.points += 1;
    }

    if ((Object.keys(stats) as Array<string>).find(key => key == game.homeTeamId) != null) {      
      stats[game.homeTeamId].goals += homeStats.goals;
      stats[game.homeTeamId].missed += homeStats.missed;
      stats[game.homeTeamId].wins += homeStats.wins;
      stats[game.homeTeamId].draws += homeStats.draws;
      stats[game.homeTeamId].loses += homeStats.loses;
      stats[game.homeTeamId].points += homeStats.points;  

    } else {
      stats[game.homeTeamId] = homeStats;
    }

    if ((Object.keys(stats) as Array<string>).find(key => key == game.guestTeamId) != null) {      
      stats[game.guestTeamId].goals += guestStats.goals;
      stats[game.guestTeamId].missed += guestStats.missed;
      stats[game.guestTeamId].wins += guestStats.wins;
      stats[game.guestTeamId].draws += guestStats.draws;
      stats[game.guestTeamId].loses += guestStats.loses;
      stats[game.guestTeamId].points += guestStats.points;  

    } else {
      stats[game.guestTeamId] = guestStats;
    }
  })

  for(var stat in stats) {
    stats[stat].name = teams[stat].name;
    statsCard.push(stats[stat]);
  }

  return (   
    <>
      <div className={styles.tableCardHalf}>
        <p>{eventId} - {event.name} Group</p>
        {statsCard
          .sort((a, b) => a.points > b.points ? -1 : a.points < b.points ? 1 
            : a.goals > b.goals ? -1 : a.goals < b.goals ? 1
              : a.missed > b.missed ? -1 : a.missed < b.missed ? 1 : 0)
          .map((stat) => {        
          return <p>{stat.name} - {stat.goals} goals, {stat.missed} missed, {stat.wins} wins, {stat.draws} draws, {stat.loses} loses, {stat.points} points</p>
        })}
      </div>
      <div className={styles.tableCardHalf}>
        <p>Игры</p>
        {games.map((game) => {        
          return <p>{teams[game.homeTeamId].name} {game.homeTeamScore} - {game.guestTeamScore} {teams[game.guestTeamId].name} </p>
        })}
      </div>            
    </>
  ); 
}

type CardProps = {
  eventId: string;
  event: EventLeagueInfo;  
  games: Record<string, GameLeagueInfo>;
  teams: Record<string, TeamLeagueInfo>;
};

export default function EventTournamentCard({
  eventId,
  event,
  games,
  teams
}: CardProps) {  

  const isGroup = event.games.some((game) => game.homeTeamId == null || game.guestTeamId == null);

  if (isGroup) {
    const groupGames: GameLeagueInfo[] = [];    

    for (var key in games) {      
      if (games[key].eventId != eventId)
        continue;
  
      groupGames.push(games[key]);             
    }    

    const card = (<GroupTournamentCard
        eventId={eventId}
        event={event}
        games={groupGames}
        teams={teams}
      />  
    ); 

    return (  
      <>                 
        {card}
      </>     
    ); 
  } else {
    const playOffGames: GameLeagueInfo[] = [];  

    for (var key in games) {
      if (games[key].eventId != eventId)
        continue;
  
      playOffGames.push(games[key]);             
    }    

    const card = (<PlayOffTournamentCard
        eventId={eventId}
        event={event}
        games={playOffGames}
        teams={teams}
      />  
    ); 

    return (  
      <>                 
        {card}
      </>     
    ); 
  }
}


