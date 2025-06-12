import styles from './HeroCard.module.css';

function HeroCard({ hero }) {
  const formatted = hero.replaceAll('_', ' ');
  const image = `/MarvelRivalsSkins/${hero}/${hero.toLowerCase()}_default.png`;

  return (
    <a href={`/hero?name=${hero}`} className={styles.heroProfile}>
      <div className={styles.heroProfileImage}>
        <img src={image} alt={formatted} />
      </div>
      <div className={styles.heroProfileLabel}>{formatted}</div>
    </a>
  );
}

export default HeroCard;
