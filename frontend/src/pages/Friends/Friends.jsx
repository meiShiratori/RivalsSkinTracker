import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Friends.module.css';

function Friends() {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:3001/friends', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.friends) {
          setFriends(data.friends.map(f => f.username));
        }
      })
      .catch(err => console.error('Failed to load friends:', err));
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:3001/auth/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllUsers(data.map(u => u.username));
        }
      })
      .catch(err => console.error('Failed to load users:', err));
  }, [token]);

  const handleAdd = (name) => {
    fetch('http://localhost:3001/friends/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ friendUsername: name })
    })
      .then(res => res.json())
      .then(() => {
        if (!friends.includes(name)) {
          setFriends(prev => [...prev, name]);
        }
      })
      .catch(err => console.error('Failed to add friend:', err));
  };

  const filteredResults = allUsers
    .filter(name => !friends.includes(name))
    .filter(name => name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-wrapper">
      <div className={styles.profileMain}>
        <div className={styles.profileHeroBg}>
          <img src="/background-image.jpg" alt="Friends Banner" />
          <div className={styles.profileOverlay}></div>
        </div>
        <div className={styles.profileInfo}>
          <h1>Friends</h1>
          <p>Manage your connections and explore their skin collections.</p>
        </div>
      </div>

      <section className={styles.profileSkinsSection}>
        <h2>Search Users</h2>
        <input
          className={styles.friendSearch}
          type="text"
          placeholder="Search by username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.friendList}>
          {filteredResults.map(name => (
            <div key={name} className={styles.friendCard}>
              <div className={styles.friendName}>{name}</div>
              <div className={styles.friendButtons}>
                <button className={styles.friendBtn} onClick={() => handleAdd(name)}>Add</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.profileSkinsSection}>
        <h2>Your Friends</h2>
        <div className={styles.friendList}>
          {friends.map(friend => (
            <div key={friend} className={styles.friendCard}>
              <div className={styles.friendName}>{friend}</div>
              <div className={styles.friendButtons}>
                <Link
                  to={`/profile?user=${encodeURIComponent(friend)}`}
                  className={styles.friendBtn}
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Friends;
