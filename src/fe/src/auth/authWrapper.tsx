import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import checkJWT from '../service/checkJwt';
import { LoginUser, logoutUser, selectUserData } from '../slice/userSlice';
import { Navigate } from 'react-router';
import { useParams } from 'react-router';

export default function AuthWrapper({ children }: { children: JSX.Element }) {
  const userStatus = useSelector(selectUserData);
  const dispatch = useDispatch();
  const params = useParams();

  const jwt = Cookies.get('jwt');

  if (jwt) {
    if (!checkJWT()) {
      dispatch(logoutUser());
      return <Navigate to="/signin" replace />;
    }

    if (checkJWT() && !userStatus.isLoggedIn) {
      dispatch(LoginUser({ token: jwt }));
      return children;
    }

    if (checkJWT() && userStatus.isLoggedIn) {
      return children;
    }
  }
  if (!jwt && Object.is(params, {})) {
    return <Navigate to="/signin" replace />;
  }

  dispatch(logoutUser());
  return children;
}
