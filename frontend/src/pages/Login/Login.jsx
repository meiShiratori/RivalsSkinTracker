import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        navigate('/profile');
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred. Check console.");
    }
  };

  return (
    <div className={`page-wrapper ${styles.loginPage}`}>
      <div className={styles.heroContainer}>
        <div className={styles.frostedBanner}></div>

        <section className={styles.loginContainer}>
          <h1>Log In</h1>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Enter</button>
          </form>

          <div className={styles.loginFooter}>
            <p>Don’t have an account? <Link to="/register" className={styles.registerLink}>Register here</Link>.</p>
          </div>
        </section>

        <div className={styles.bannerCredit}>Marvel Rivals Key Art © Marvel</div>
      </div>
    </div>
  );
}

export default Login;
