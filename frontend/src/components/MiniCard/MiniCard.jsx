import styles from './MiniCard.module.css';

function MiniCard({ hero, skin }) {
  const path = `/MarvelRivalsSkins/${hero}/${hero}_${skin.replaceAll(' ', '_')}_Full.png`;
  const formattedHero = hero.replaceAll('_', ' ');
  const formattedSkin = skin.replaceAll('_', ' ');

  return (
    <a href={`/hero?name=${hero}&skin=${encodeURIComponent(skin)}`} className={styles.miniSlantedCard}>
      <div className={styles.miniSlantedContent}>
        <img src={path} alt={`${formattedHero} Skin`} />
        <p>{formattedHero}: {formattedSkin}</p>
      </div>
    </a>
  );
}

export default MiniCard;
