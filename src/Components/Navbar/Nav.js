import React, { useState, useEffect } from 'react';
import '../../App.css';
import './Nav.css';
import logo from '../../Images/Misc/Logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function Nav({ darkMode, handleToggle, activeSection, setActiveSection }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const nav = document.querySelector('nav');

        const handleScroll = () => {
            let currentSection = '';
            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight -50) {
                    currentSection = section.getAttribute('id');
                }
            });

            // Special case for 'contact' section when at the bottom of the page
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                currentSection = 'contact';
            }

            setActiveSection(currentSection);

            // Update navbar opacity on scroll
            if (window.scrollY > 0) {
                nav.classList.add('bg-opacity-90');
                nav.classList.remove('bg-opacity-100');
            } else {
                nav.classList.remove('bg-opacity-90');
                nav.classList.add('bg-opacity-100');
            }
        };

        const handleMouseEnter = () => {
            nav.classList.add('bg-opacity-100');
            nav.classList.remove('bg-opacity-90');
        };

        const handleMouseLeave = () => {
            if (window.scrollY > 0) {
                nav.classList.add('bg-opacity-90');
                nav.classList.remove('bg-opacity-100');
            }
        };

        window.addEventListener('scroll', handleScroll);
        nav.addEventListener('mouseenter', handleMouseEnter);
        nav.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            nav.removeEventListener('mouseenter', handleMouseEnter);
            nav.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div>
            <nav className="bg-gray-800 p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
                <div className="mr-16 ml-4">
                    <a href="#home">
                        <img src={logo} alt="logo" className="h-8 w-8" />
                    </a>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white z-10">
                        <FaBars />
                    </button>
                </div>
                {/* Sliding Menu for Small Screens */}
                <div className={`fixed top-0 right-0 h-full bg-gray-800 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-1/2 z-50`}>
                    <div className="flex justify-end p-4 mt-3 mr-2">
                        <FaTimes 
                            onClick={toggleMenu}
                            className="text-white hover:text-red-500 cursor-pointer"
                        />
                    </div>
                    <ul className="flex flex-col items-center justify-center h-full space-y-4">
                        {['about', 'skills', 'projects', 'contact'].map((section) => (
                            <li key={section} className="nav-item group">
                                <a
                                    href={`#${section}`}
                                    className={`text-white relative`}
                                    onClick={() => {
                                        toggleMenu(); // Close menu on click
                                    }}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                    <span
                                        className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transform ${
                                            (activeSection === section || activeSection === '') ? 'scale-x-0' : ''
                                        } group-hover:scale-x-100 ${activeSection === section ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-500 origin-left`} 
                                    ></span>
                                </a>
                            </li>
                        ))}
                        {/* Dark Mode Toggle in Small Screen Menu */}
                     <div className="flex items-center mt-4">
                           <button
                               className="flex items-center justify-between w-12 h-6 bg-gray-600 rounded-full p-1 cursor-pointer relative"
                               onClick={handleToggle}
                            >
                            <FontAwesomeIcon
                                icon={faSun}
                                className={`absolute right-1 transition-opacity duration-300 ${
                                    darkMode ? 'text-gray-400 opacity-100' : 'text-yellow-500 opacity-100'
                                }`}
                            />
                            <FontAwesomeIcon
                                icon={faMoon}
                                className={`absolute left-1 transition-opacity duration-300 ${
                                    darkMode ? 'text-black opacity-100' : 'text-gray-400 opacity-100'
                                }`}
                            />
                               <div
                                   className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${
                                       darkMode ? 'translate-x-6' : 'translate-x-0'
                                   }`}
                               ></div>
                           </button>
                       </div>
                    </ul>
                </div>
                {/* Main Menu */}
                <ul className={`hidden md:flex items-center space-x-24 md:flex-grow`}>
                    {['about', 'skills', 'projects', 'contact'].map((section) => (
                        <li key={section} className="nav-item group">
                            <a
                                href={`#${section}`}
                                className={`text-white relative`}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                                <span
                                    className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transform ${
                                        (activeSection === section || activeSection === '') ? 'scale-x-0' : ''
                                    } group-hover:scale-x-100 ${activeSection === section ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-500 origin-left`} 
                                ></span>
                            </a>
                        </li>
                    ))}
                </ul>
                {/* Dark Mode Toggle on Large Screens */}
               <div className="hidden md:flex items-center ml-4">
                   <button
                       className="flex items-center justify-between w-12 h-6 bg-gray-600 rounded-full p-1 cursor-pointer relative"
                       onClick={handleToggle}
                   >
                       <FontAwesomeIcon
                           icon={faSun}
                           className={`absolute right-1 transition-opacity duration-300 ${
                               darkMode ? 'text-gray-400 opacity-100' : 'text-yellow-500 opacity-100'
                           }`}
                       />
                       <FontAwesomeIcon
                           icon={faMoon}
                           className={`absolute left-1 transition-opacity duration-300 ${
                               darkMode ? 'text-black opacity-100' : 'text-gray-400 opacity-100'
                           }`}
                       />
                       <div
                           className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${
                               darkMode ? 'translate-x-6' : 'translate-x-0'
                           }`}
                       ></div>
                   </button>
               </div>

            </nav>
        </div>
    );
}

export default Nav;
