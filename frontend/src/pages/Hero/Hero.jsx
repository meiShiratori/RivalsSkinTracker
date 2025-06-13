import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { allSkins } from '../../data/skinsData';
import styles from './Hero.module.css';

function Hero() {
  const [searchParams] = useSearchParams();
  const heroName = searchParams.get('name');
  const skinName = searchParams.get('skin');

  const heroSkins = allSkins.filter((s) => s.hero === heroName);

  const [selected, setSelected] = useState(() => {
    if (!heroSkins.length) return null;
    const match = heroSkins.find((s) => s.skin === skinName);
    return match || heroSkins[0];
  });

  useEffect(() => {
    if (heroSkins.length > 0) {
      const match = heroSkins.find((s) => s.skin === skinName);
      setSelected(match || heroSkins[0]);
    }
  }, [heroName, skinName]);

  const handleAddSkin = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in to add skins.");
      return;
    }

    try {
      const res = await fetch('/profile/me/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ path: selected.path })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Skin added to your collection!");
      } else {
        alert(data.error || "Failed to add skin");
      }
    } catch (err) {
      console.error("Add skin error:", err);
      alert("Could not add skin.");
    }
  };

  if (!heroName || heroSkins.length === 0 || !selected) {
    return <div className={styles.heroPage} style={{ padding: '4rem' }}>No hero found.</div>;
  }

  return (
    <div className={styles.heroPage}>
      <div className={styles.heroLayout}>
        <div className={styles.skinDisplay}>
          <img
            src={selected.path}
            alt={selected.skin}
            className={styles.selectedSkinImg}
          />
          <div className={styles.skinInfo}>
            <h2 className={styles.skinLabel}>
              {heroName.replaceAll('_', ' ')}: {selected.skin.replaceAll('_', ' ')}
            </h2>
            <button className={styles.addSkinButton} onClick={handleAddSkin}>
              Add to My Skins
            </button>
          </div>
        </div>

        <div className={styles.skinThumbnails}>
          <div className={styles.skinGrid}>
            {heroSkins.map((skin, index) => (
              <img
                key={index}
                src={skin.path}
                alt={skin.skin}
                onClick={() => setSelected(skin)}
                className={`${styles.skinThumb} ${selected.path === skin.path ? styles.selected : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
