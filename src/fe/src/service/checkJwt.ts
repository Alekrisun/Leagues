import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const checkJWT = () => {
  const jwt = Cookies.get('jwt');
  if (jwt) {
    const decodedToken = jwtDecode(jwt);
    if (decodedToken.exp) {
      if (Date.now() / 1000 < decodedToken.exp) {
        return true;
      }
    }
  }
  return false;
};

export default checkJWT;
