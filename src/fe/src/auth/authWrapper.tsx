import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import checkJWT from '../service/checkJwt';
import { LoginUser, logoutUser, selectUserData } from '../slice/userSlice';
import { Navigate } from 'react-router';
import { useParams } from 'react-router';
import { useLocation } from 'react-router';

export default function AuthWrapper({ children }: { children: JSX.Element }) {
  const PARTIALLY_PROTECTED_ROUTES = [
    'leagues',
    'tournaments',
    'signin',
    'signup',
  ];
  const userStatus = useSelector(selectUserData);
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const path = location.pathname.split('/');

  const jwt = Cookies.get('jwt');
  // console.log(params);

  if (!jwt) {
    if (location.pathname === '/') {
      return children;
    }
    if (PARTIALLY_PROTECTED_ROUTES.includes(path[1]) && !params.id) {
      return children;
    }
    //return <Navigate to="/signin" replace />;
    return children;
  }

  if (jwt) {
    if (!checkJWT()) {
      Cookies.remove('jwt');
      dispatch(logoutUser());

      if (location.pathname === '/') {
        return children;
      }
      if (PARTIALLY_PROTECTED_ROUTES.includes(path[1]) && !params.id) {
        return children;
      }

      return <Navigate to="/signin" replace />;
    }

    if (checkJWT() && !userStatus.isLoggedIn) {
      dispatch(LoginUser({ token: jwt }));
      return children;
    }

    return children;
  }
}
