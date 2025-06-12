// src/data/fakeApi.js

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fakeApi = {
  // Skins
  getOwnedSkins: async (user = 'me') => {
    await delay(100);
    const key = `ownedSkins-${user}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  },

  addSkin: async (skinPath, user = 'me') => {
    await delay(100);
    const key = `ownedSkins-${user}`;
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    if (!stored.includes(skinPath)) {
      stored.push(skinPath);
      localStorage.setItem(key, JSON.stringify(stored));
    }
    return stored;
  },

  // Friends
  getFriends: async () => {
    await delay(100);
    const stored = localStorage.getItem('friends');
    return stored ? JSON.parse(stored) : [];
  },

  addFriend: async (name) => {
    await delay(100);
    const stored = JSON.parse(localStorage.getItem('friends') || '[]');
    if (!stored.includes(name)) {
      stored.push(name);
      localStorage.setItem('friends', JSON.stringify(stored));
    }
    return stored;
  }
};
