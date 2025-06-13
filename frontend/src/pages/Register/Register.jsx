import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
        navigate('/login');
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("An error occurred. Check console.");
    }
  };

  return (
    <div className={`page-wrapper ${styles.registerPage}`}>
      <div className={styles.heroContainer}>
        <div className={styles.frostedBanner}></div>

        <section className={styles.registerContainer}>
          <h1>Register</h1>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <button type="submit">Create Account</button>
          </form>

          <div className={styles.registerFooter}>
            <p>Already have an account? <Link to="/login" className={styles.loginLink}>Log in here</Link>.</p>
          </div>
        </section>

        <div className={styles.bannerCredit}>Marvel Rivals Key Art © Marvel</div>
      </div>
    </div>
  );
}

export default Register;
