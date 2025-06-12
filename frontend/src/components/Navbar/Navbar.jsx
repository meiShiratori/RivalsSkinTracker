import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
  };

  const toggleMobileMenu = () => {
    setMobileOpen(prev => !prev);
  };

  const closeMenu = () => setMobileOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    closeMenu();
    navigate('/'); // or navigate('/login') if preferred
  };

  return (
    <nav className={styles.nav}>
      <button
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      <div className={`${styles.navLinksWrapper} ${mobileOpen ? styles.show : ''}`}>
        <div className={`${styles.navLinks} ${styles.navLinksLeft}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/profile" onClick={closeMenu}>Profile</Link>
          <Link to="/friends" onClick={closeMenu}>Friends</Link>
          <Link to="/skins" onClick={closeMenu}>Skins</Link>
        </div>

        <div className={`${styles.navLinks} ${styles.navLinksRight}`}>
          {isLoggedIn ? (
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className={styles.loginLink}
            >
              Sign Out
            </Link>
          ) : (
            <Link to="/login" onClick={closeMenu} className={styles.loginLink}>
              Log In
            </Link>
          )}

          <button
            className={styles.darkToggleBtn}
            onClick={() => {
              toggleDarkMode();
              closeMenu();
            }}
            aria-label="Toggle Dark Mode"
          >
            🌓
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
