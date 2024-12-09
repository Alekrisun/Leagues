import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import styles from '../auth.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ResponseUser } from '../../../types';
import { LoginUser } from '../../../slice/userSlice';
import checkJWT from '../../../service/checkJwt';

export default function SignIn() {
  const [enterIsAllowed, setEnterIsAllowed] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = Cookies.get('jwt');

    if (jwt && checkJWT()) {
      navigate('/');
      return;
    }

    setEnterIsAllowed(true);
  }, []);

  const validateInput = () => {
    let validationError = false;

    if (!loginInput.trim()) {
      setValidationErrors((prevErrors) => [...prevErrors, 'login']);
      validationError = true;
    }
    if (!passwordInput.trim()) {
      setValidationErrors((prevErrors) => [...prevErrors, 'password']);
      validationError = true;
    }

    return !validationError;
  };

  const submitRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationErrors([]);
    if (validateInput()) {
      const objToSend = {
        username: loginInput,
        password: passwordInput,
      };

      try {
        const response = await fetch(
          'https://localhost:7184/authenticate/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(objToSend),
          }
        );
        if (response.ok) {
          const data: ResponseUser = await response.json();
          if (data.token) {
            Cookies.set('jwt', data.token);

            dispatch(LoginUser({ token: data.token }));

            navigate('/');
          }

          setLoginError(data.message!);
        } else {
          throw new Error('Ошибка при регистрации');
        }
      } catch (err) {
        setLoginError((err as Error).message);
        console.log((err as Error).message);
      }
    }
  };

  return (
    <>
      {enterIsAllowed && (
        <form
          onSubmit={(event) => submitRegistration(event)}
          className={styles.signinForm}
        >
          <h2 className={styles.heading}>Вход</h2>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="login">
              Логин
              <input
                onChange={(event) => setLoginInput(event.target.value)}
                className={`${styles.input} ${validationErrors.includes('login') ? styles.invalidInput : ''}`}
                type="text"
                id="login"
                name="login"
              ></input>
              {validationErrors.includes('login') && (
                <span className={styles.error}>Обязательное поле</span>
              )}
            </label>
            <label className={styles.label} htmlFor="password">
              Пароль
              <input
                onChange={(event) => setPasswordInput(event.target.value)}
                className={`${styles.input} ${validationErrors.includes('password') ? styles.invalidInput : ''}`}
                type="password"
                id="password"
                name="password"
              ></input>
              {validationErrors.includes('password') && (
                <span className={styles.error}>Обязательное поле</span>
              )}
            </label>
          </div>
          <button className={styles.button}>Войти</button>
        </form>
      )}
      {loginError && <div className={styles.loginError}>{loginError}</div>}
    </>
  );
}
