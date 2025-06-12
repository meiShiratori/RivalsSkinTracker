import { useRef, useMemo } from 'react';
import { allSkins } from '../../data/skinsData';
import SlantedCard from '../../components/SlantedCard/SlantedCard';
import MiniCard from '../../components/MiniCard/MiniCard';
import styles from './Home.module.css';

function Home() {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  };

  const recentSkins = [
    { hero: "Loki", skin: "Shin_Sagi-Shi" },
    { hero: "Hela", skin: "Yami_no_Karasu" },
    { hero: "Squirrel_Girl", skin: "Urban_Hunter" },
    { hero: "Peni_Parker", skin: "Yatsukahagi" },
    { hero: "Doctor_Strange", skin: "Doctor_Strange_in_the_Multiverse_of_Madness" },
  ];

  const featured = useMemo(() => {
    const shuffled = [...allSkins].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, []);

  return (
    <div className="page-wrapper">
      <div className={styles.heroContainer}>
        <div className={styles.banner}></div>

        <section className={styles.featuredSkins}>
          {featured.map((skin, i) => (
            <SlantedCard
              key={i}
              hero={skin.hero}
              skin={skin.skin}
              image={skin.path}
            />
          ))}
        </section>
      </div>

      <section className={styles.miniGalleryCarousel}>
        <h2>Recently Added</h2>
        <div className={styles.carouselWrapper}>
          <button className={`${styles.scrollBtn} ${styles.left}`} onClick={() => scroll(-1)}>&#10094;</button>
          <div className={styles.carouselTrack} ref={trackRef}>
{recentSkins.map((entry, i) => {
  const match = allSkins.find(s => s.hero === entry.hero && s.skin === entry.skin);
  if (!match) return null; 
  return (
    <MiniCard
      key={i}
      hero={match.hero}
      skin={match.skin}
      image={match.path}
    />
  );
})}

          </div>
          <button className={`${styles.scrollBtn} ${styles.right}`} onClick={() => scroll(1)}>&#10095;</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
