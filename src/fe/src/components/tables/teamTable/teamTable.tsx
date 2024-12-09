import { Team } from '../../../types';
import styles from '../tables.module.css';

export default function TeamTable({ data }: { data: Team[] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th colSpan={4} className={styles.tableHeadingMainRow}>
            <h2 className={styles.tableHeading}>Таблица</h2>
          </th>
        </tr>
        <tr className={styles.tableHead}>
          <th></th>
          <th>Команда</th>
          <th>Игры</th>
          <th>Очки</th>
        </tr>
      </thead>
      <tbody>
        {data.map((el: Team, index: number) => (
          <tr key={el.id}>
            <th>{index + 1}.</th>
            <td>{el.name}</td>
            <td>{el.games}</td>
            <td>{el.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
