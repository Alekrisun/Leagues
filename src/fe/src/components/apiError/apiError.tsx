import styles from './apiError.module.css'

type ApiErrorComponentType = {
  msg: string;
  tryAgain: React.Dispatch<React.SetStateAction<string>>;
};

export default function ApiErrorComponent({
  msg,
  tryAgain,
}: ApiErrorComponentType) {
  return (
    <div className={styles.errorWrapper}>
      <h2>{msg}</h2>
      <button onClick={() => tryAgain('')}>Try again</button>
    </div>
  );
}
