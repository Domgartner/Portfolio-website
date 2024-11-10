import './App.css';
import Nav from './Components/Navbar/Nav';
import Home from './Sections/Home/Home';
import About from './Sections/About/About';
import Skills from './Sections/Skills/Skills';
import Break from './Sections/Break/Break';
import Projects from './Sections/Projects/Projects';
import Contact from './Sections/Contact/Contact';
import ScrollToTop from './Components/ScrollToTop';


import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true' ? true : false);
  const [activeSection, setActiveSection] = useState('');
  const markerRef = useRef(null); // Marker for observing scroll position


  // Toggle dark mode
  const handleToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
    document.body.classList.toggle('dark', !darkMode);
  };

  useEffect(() => {
    if(darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToHome = () => {
    document.querySelector('.home').scrollIntoView({ behavior: 'smooth' });
    setActiveSection('Home');
  };

  return (
    <div className="App">
      <header>
        <Nav 
          darkMode={darkMode}
          handleToggle={handleToggle}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </header>

      <div className='main'>
      <div ref={markerRef} style={{ position: 'absolute', top: 100 }} />
        <div className='home'>
          <Home darkMode={darkMode} />
        </div>
        <div className='bg-base'>
          <About darkMode={darkMode} />
        </div>
        <div className='bg-base'>
          <Skills darkMode={darkMode} />
        </div>
        <div>
          <Break />
        </div>
        <div className='bg-base'>
          <Projects darkMode={darkMode} />
        </div>
        <div className='bg-base'>
          <Contact activeSection={activeSection} />
        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4 pt-4">
        <br />
        <p>Copyright ©2024 Dominic Gartner</p>
        <br />
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop scrollToHome={scrollToHome} darkMode={darkMode} markerRef={markerRef}/>
    </div>
  );
}

export default App;
