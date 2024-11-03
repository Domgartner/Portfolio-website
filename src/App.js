import './App.css';
import Nav from './Components/Navbar/Nav';
import Home from './Sections/Home/Home';
import About from './Sections/About/About';
import Skills from './Sections/Skills/Skills';
import Projects from './Sections/Projects/Projects';
import Contact from './Sections/Contact/Contact';

import React, { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true' ? true : false);
  const [activeSection, setActiveSection] = useState('');

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
        <div className='home'>
            <Home 
            darkMode={darkMode}
            />
        </div>
        <div className='bg-base'>
          <About />
        </div>
        <div className='bg-base'>
          <Skills />
        </div>
        <div className='bg-base'>
          <Projects />
        </div>
        <div className='bg-base'>
          <Contact 
            activeSection={activeSection}
          />
        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4 pt-8">
        <br />
        <p>Copyright ©2024 Dominic Gartner</p>
        <br />
      </footer>
    </div>
  );
}

export default App;
