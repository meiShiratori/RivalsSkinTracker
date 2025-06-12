import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2025 Marvel Rivals Fan Site. Not affiliated with Marvel or NetEase.</p>
        <div className={styles.footerLinks}>
          <a href="#">Discord</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
