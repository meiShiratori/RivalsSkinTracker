import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { allSkins } from '../../data/skinsData';
import MiniCard from '../../components/MiniCard/MiniCard';
import styles from './Profile.module.css';

function Profile() {
  const [searchParams] = useSearchParams();
  const [ownedSkins, setOwnedSkins] = useState([]);
  const [displayName, setDisplayName] = useState('You');

  const queryUser = searchParams.get('user');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const isPublic = !!queryUser;
    const url = isPublic
      ? `http://localhost:3001/profile/public/${encodeURIComponent(queryUser)}`
      : `http://localhost:3001/profile`;

    fetch(url, {
      headers: isPublic ? {} : { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data.ownedSkins)) {
          const matched = allSkins.filter(skin => data.ownedSkins.includes(skin.path));
          setOwnedSkins(matched);
          setDisplayName(data.username || 'You');
        } else {
          console.error("Unexpected response:", data);
        }
      })
      .catch(err => {
        console.error("Failed to fetch profile:", err);
      });
  }, [queryUser, token]);

  return (
    <div className="page-wrapper">
      <div className={styles.profileMain}>
        <div className={styles.profileHeroBg}>
          <img src="/background-image.jpg" alt="Profile Banner" />
          <div className={styles.profileOverlay}></div>
        </div>
        <div className={styles.profileInfo}>
          <h1>{displayName}'s Profile</h1>
          <p>{ownedSkins.length > 0
            ? `${displayName} own${displayName === 'You' ? '' : 's'} ${ownedSkins.length} skin${ownedSkins.length !== 1 ? 's' : ''}.`
            : 'No skins owned yet.'}</p>
        </div>
      </div>

      <section className={styles.profileSkinsSection}>
        <h2>Owned Skins</h2>
        <div className={styles.carouselTrack}>
          {ownedSkins.map((skin, index) => (
            <MiniCard
              key={index}
              hero={skin.hero}
              skin={skin.skin}
              image={skin.path}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Profile;
