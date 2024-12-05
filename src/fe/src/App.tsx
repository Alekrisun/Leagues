import { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import Cookies from 'js-cookie';
import './App.css';
import Spinner from './components/spinner/spinner';
import { LeaguesResponse, ResponseEnum } from './types';
import MainSection from './components/mainSection/mainSection';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, logoutUser, selectUserData } from './slice/userSlice';
import { useNavigate } from 'react-router';
import checkJWT from './service/checkJwt';

function App() {
  const userStatus = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [leaguesData, setLeaguesData] = useState<null | LeaguesResponse>(null);

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (jwt) {
      if (checkJWT() && !userStatus.isLoggedIn) {
        dispatch(LoginUser({ token: jwt }));
      }

      if (!checkJWT() && userStatus.isLoggedIn) {
        dispatch(logoutUser());
        navigate('/login');
      }
    }

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
