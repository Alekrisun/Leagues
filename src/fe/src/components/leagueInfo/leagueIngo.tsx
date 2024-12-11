import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import checkJWT from '../../service/checkJwt';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, selectUserData } from '../../slice/userSlice';
import { useParams } from 'react-router';
import Spinner from '../spinner/spinner';
import { LeagueInfo } from '../../types';
import banner from '../../assets/img/leagueInfo_banner.jpg';
import styles from './leagueInfo.module.css';
import TeamTable from '../tables/teamTable/teamTable';

export default function LeagueInfoPage() {
  const { id } = useParams();
  const userStatus = useSelector(selectUserData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [leagueInfo, setLeagueInfo] = useState<LeagueInfo>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // const jwt = Cookies.get('jwt');

    // if (!checkJWT()) {
    //   navigate('/signin');
    // } else if (checkJWT() && !userStatus.isLoggedIn && jwt) {
    //   dispatch(LoginUser({ token: jwt }));
    // }

    const getLeagueInfo = async () => {
      try {
        // if (jwt) {
        const response = await fetch(
          `https://localhost:7184/api/leagues/${id}/info`,
          {
            headers: {
              Authorization: userStatus.token,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Unable to fetch data. Response status: ${response.status}`
          );
        }
        const data: LeagueInfo = await response.json();

        setLeagueInfo(data);
        setIsLoaded(true);
        // }
      } catch (err) {
        console.log(err);
      }
    };

    getLeagueInfo();
  }, []);

  return (
    <>
      {!isLoaded && <Spinner />}
      {isLoaded && (
        <>
          <div className={styles.headingWrapper}>
            <div className={styles.leagueHeadingWrapper}>
              <div className={styles.logoWrapper}>
                <img />
              </div>
              <div className={styles.textWrapper}>
                <h2 className={styles.leagueHeading}>{leagueInfo!.name}</h2>
                <span className={styles.subName}>{leagueInfo!.subName}</span>
              </div>
            </div>
            <div className={styles.bannerWrapper}>
              <img src={banner} className={styles.banner} />
            </div>
          </div>
          <div className={styles.tablesWrapper}>
            <TeamTable data={leagueInfo!.teams} />
          </div>
        </>
      )}
    </>
  );
}
