import { useNavigate } from 'react-router';
import styles from './signup.module.css';

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className={styles.bg} onClick={() => navigate(-1)}>
      <form>asdasdasd</form>
      <button>Close</button>
    </div>
  );
}
