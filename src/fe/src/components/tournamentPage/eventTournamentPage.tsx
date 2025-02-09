import { EventLeagueInfo } from '../../types';
import styles from './tournament.module.css';

type CardProps = {
  id: string;
  data: Record<string, EventLeagueInfo>;  
};

export default function FinalTournamentCard({
  id,
  data
}: CardProps) {  

  var value = data as EventLeagueInfo;
  console.log(value);

  return (   
    <div className={styles.tableCardHalf}>
      {id} - {value.name}
    </div>            
  ); 
}
