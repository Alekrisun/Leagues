import { useNavigate } from 'react-router';
import styles from './signup.module.css';
import { FormEvent, useState } from 'react';

export default function SignUp() {
  const [nameInput, setNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rPasswordInput, setRPasswordInput] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const validateInput = () => {
    let validationError = false;

    if (nameInput.trim() === '') {
      setValidationErrors((prevErrors) => [...prevErrors, 'name']);
      validationError = true;
    }
    if (!lastNameInput.trim()) {
      setValidationErrors((prevErrors) => [...prevErrors, 'lastname']);
      validationError = true;
    }
    if (!loginInput.trim()) {
      setValidationErrors((prevErrors) => [...prevErrors, 'login']);
      validationError = true;
    }
    if (passwordInput.length < 6) {
      setValidationErrors((prevErrors) => [...prevErrors, 'password']);
      validationError = true;
    }
    if (passwordInput !== rPasswordInput) {
      setValidationErrors((prevErrors) => [...prevErrors, 'r_password']);
      validationError = true;
    }
    return !validationError;
  };

  const submitRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationErrors([]);
    validateInput();
    console.log(validationErrors);
    if (validateInput()) {
      const objToSend = {
        firstname: nameInput,
        lastname: lastNameInput,
        login: loginInput,
        password: passwordInput,
      };

      const response = await fetch(
        'https://localhost:7184/authenticate/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objToSend),
        }
      );

      console.log(response);
    }
  };

  return (
    <form
      onSubmit={(event) => submitRegistration(event)}
      className={styles.signupForm}
    >
      <h2 className={styles.heading}>Регистрация</h2>
      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor="firstname">
          Имя
          <input
            onChange={(event) => setNameInput(event.target.value)}
            className={`${styles.input} ${validationErrors.includes('name') ? styles.invalidInput : ''}`}
            type="text"
            id="firstname"
            name="firstname"
          ></input>
          {validationErrors.includes('name') && (
            <span className={styles.error}>Обязательное поле</span>
          )}
        </label>
        <label className={styles.label} htmlFor="lastname">
          Фамилия
          <input
            onChange={(event) => setLastNameInput(event.target.value)}
            className={`${styles.input} ${validationErrors.includes('lastname') ? styles.invalidInput : ''}`}
            type="text"
            id="lastname"
            name="lastname"
          ></input>
          {validationErrors.includes('lastname') && (
            <span className={styles.error}>Обязательное поле</span>
          )}
        </label>
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
            <span className={styles.error}>
              Длинна пароля меньше 6 символов
            </span>
          )}
        </label>
        <label className={styles.label} htmlFor="password_repeat">
          Повтор пароля
          <input
            onChange={(event) => setRPasswordInput(event.target.value)}
            className={`${styles.input} ${validationErrors.includes('r_password') ? styles.invalidInput : ''}`}
            type="password"
            id="password_repeat"
            name="password_repeat"
          ></input>
          {validationErrors.includes('r_password') && (
            <span className={styles.error}>Пароли не совпадают</span>
          )}
        </label>
      </div>
      <button className={styles.button}>Зарегистрироваться</button>
    </form>
  );
}
