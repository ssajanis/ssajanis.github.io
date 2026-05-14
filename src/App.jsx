import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import TheWork from './components/TheWork.jsx';
import TheRecommendations from './components/TheRecommendations.jsx';
import ThePerson from './components/ThePerson.jsx';
import Certifications from './components/Certifications.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const [theme, setTheme] = useState('vercel-minimal');

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  const toggleTheme = () =>
    setTheme(t => (t === 'vercel-minimal' ? 'linear-dark' : 'vercel-minimal'));

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <TheWork />
        <TheRecommendations />
        <ThePerson />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
