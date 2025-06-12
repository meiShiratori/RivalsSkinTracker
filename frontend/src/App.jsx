import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Friends from './pages/Friends/Friends';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Hero from './pages/Hero/Hero';
import Skins from './pages/Skins/Skins';
import Register from './pages/Register/Register';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (!savedTheme) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/skins" element={<Skins />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
