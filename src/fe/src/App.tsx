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
import { loadLeaguesData } from './api/getData';
import ApiErrorComponent from './components/apiError/apiError';

function App() {
  const userStatus = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadError, setLoadError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [leaguesData, setLeaguesData] = useState<null | LeaguesResponse>(null);

  useEffect(() => {
    // const jwt = Cookies.get('jwt');
    // if (jwt) {
    //   if (checkJWT() && !userStatus.isLoggedIn) {
    //     dispatch(LoginUser({ token: jwt }));
    //   }

    //   if (!checkJWT() && userStatus.isLoggedIn) {
    //     dispatch(logoutUser());
    //     navigate('/login');
    //   }
    // }
    if (!loadError) {
      const loadData = async () => {
        try {
          const data = await loadLeaguesData('leagues');
          setLeaguesData(data);
          setIsLoaded(true);
        } catch (err) {
          setIsLoaded(true);
          setLoadError((err as Error).message);
        }
      };
      loadData();
    }
  }, [loadError]);

  return (
    <>
      {!isLoaded && <Spinner />}
      {isLoaded && leaguesData && (
        <button className="btn">
          <BsPlusLg />
        </button>
      )}
      {!!loadError && (
        <ApiErrorComponent msg={loadError} tryAgain={setLoadError} />
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
