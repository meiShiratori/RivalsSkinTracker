import styles from './SlantedCard.module.css';

function SlantedCard({ hero, skin, image }) {
  const formattedHero = hero.replaceAll('_', ' ');
  const formattedSkin = skin.replaceAll('_', ' ');

  return (
    <a href={`/hero?name=${hero}&skin=${encodeURIComponent(skin)}`} className={styles.slantedCard}>
      <div className={styles.slantedContent}>
        <img src={image} alt={`${formattedHero} Skin`} />
        <div className={styles.slantedLabel}>
          <span>{formattedHero}: {formattedSkin}</span>
        </div>
      </div>
    </a>
  );
}

export default SlantedCard;
