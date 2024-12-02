import { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import './App.css';
import Spinner from './components/spinner/spinner';
import { LeaguesResponse, ResponseEnum } from './types';
import MainSection from './components/mainSection/mainSection';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [leaguesData, setLeaguesData] = useState<null | LeaguesResponse>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('https://localhost:7184/api/leagues');
        if (!response.ok) {
          throw new Error(
            `Unable to fetch data. Response status: ${response.status}`
          );
        }
        const data: LeaguesResponse = await response.json();
        setLeaguesData(data);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);

  return (
    <>
      {!isLoaded && <Spinner />}
      {isLoaded && (
        <button className="btn">
          <BsPlusLg />
        </button>
      )}
      {isLoaded && leaguesData && (
        <MainSection data={leaguesData} type={ResponseEnum.LEAGUES} />
      )}
      {isLoaded && leaguesData && (
        <MainSection data={leaguesData} type={ResponseEnum.TOURNAMENTS} />
      )}
    </>
  );
}

export default App;
