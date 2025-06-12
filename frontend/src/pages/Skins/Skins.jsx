import { useEffect, useState } from 'react';
import HeroCard from '../../components/HeroCard/HeroCard';
import styles from './Skins.module.css';

function Skins() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    import('../../data/skinsData.js').then(module => {
      const heroNames = [...new Set(module.allSkins.map(s => s.hero))];
      setHeroes(heroNames);
    });
  }, []);

  return (
    <div className="page-wrapper">
      <div className={styles.bannerWrapper}>
        <div className={styles.skinsBanner}></div>
      </div>

      <main className={styles.heroGalleryOverBanner}>
        <div className={styles.heroGalleryGrid}>
          {heroes.map(hero => (
            <HeroCard key={hero} hero={hero} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Skins;
