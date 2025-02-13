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
import { getLeague } from '../../api/getData';
import ApiErrorComponent from '../apiError/apiError';

export default function LeagueInfoPage() {
  const { id } = useParams();
  const userStatus = useSelector(selectUserData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [leagueInfo, setLeagueInfo] = useState<LeagueInfo>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tryLoadAgain = () => {
    setLoadError('');
    setIsLoaded(false);
  };

  useEffect(() => {
    if (!loadError) {
      const loadData = async () => {
        try {
          const data = await getLeague(id!);
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

  return (
    <>
      {!isLoaded && <Spinner />}
      {!!loadError && (
        <ApiErrorComponent msg={loadError} tryAgain={tryLoadAgain} />
      )}
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
            
          </div>
        </>
      )}
    </>
  );
}
