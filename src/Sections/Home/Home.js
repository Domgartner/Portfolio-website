import '../../App.css';
import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Simulation from './Three Fiber/Simulation.js';

function Home({darkMode}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const [showArrow, setShowArrow] = useState(false);

  const words = ["Developer", "Engineer", "Designer", "Creator", "Critical Thinker", "Problem Solver", "Programmer"];

  // Typing and deleting logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 2000);
      return;
    } else if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 100 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY === 0); // Show arrow only when scrolled to top
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const blinkTimeout = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkTimeout);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative flex items-center justify-between w-full h-screen bg-homeContact dark:bg-[var(--bg-accent)] transition-colors duration-300 ease-in-out"
      id="home"
    >
      <div className="text-left xs:ml-16 lg:ml-32 z-10" style={{ width: '100vw' }}>
        <h3 className="homeIntro text-3xl font-medium text-gray-700">Hi, I am...</h3> 
        <h1 className="homeName text-7xl font-bold text-gray-900 mt-2">Dominic Gartner</h1> 
        <h2 className="typedWord text-5xl font-medium text-gray-700 mt-4"> 
          {`${words[index].substring(0, subIndex)}`}
          <span className={`cursor ${blink ? 'opacity-100' : 'opacity-0'}`}>|</span>
        </h2>
      </div>

      <div className="flex-grow hidden sm:block cursor-pointer" style={{ width: '100%', height: '100%', zIndex: 0, marginLeft: '-300px' }}>
        <Simulation 
          key={darkMode} // Add key prop to force re-render on darkMode change
          darkMode={darkMode}
        />
      </div>

      {/* Scroll Down Arrow */}
      {showArrow && (
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={scrollToAbout}
        >
          <FontAwesomeIcon icon={faArrowDown} className="downArrow text-4xl text-gray-700 hover:text-blue-500" />
        </div>
      )}
    </section>
  );
}

export default Home;
