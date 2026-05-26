import styles from "../css/login.module.css";

export default function Login() {
  return (
    <div className={styles.loginBox}>
      <p>Login</p>

      <form>
        <div className={styles.userBox}>
          <input type="text" required />
          <label>Email</label>
        </div>

        <div className={styles.userBox}>
          <input type="password" required />
          <label>Password</label>
        </div>

        <a href="#" className={styles.submitBtn}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
      </form>
    </div>
  );
}