import '../../App.css';
import './Skills.css';
import { faDatabase, faC, faFire, faBox, faCloud, faBullseye, faDiagramProject, faDesktop, faMicrochip, faCube, faVialCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { faPython, faJava, faJs, faReact, faUnity, faGithub, faDocker, faFigma, faAws, faHtml5} from '@fortawesome/free-brands-svg-icons';
import Skill from '../../Components/Skill/Skill';
import SkillsDataJson from './Skills.json';
import React, { useEffect, useState, useRef } from 'react';

function Skills({darkMode}) {
    const [skillsData, setSkillsData] = useState([]);
    const [filter, setFilter] = useState(localStorage.getItem('SkillsFilter') || 'languages');
    const [isAnimating, setIsAnimating] = useState(false);
    const [glowIntensity, setGlowIntensity] = useState(0);
    const backgroundTextRef = useRef(null);

    useEffect(() => {
        setSkillsData(SkillsDataJson);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!backgroundTextRef.current) return;
    
            const rect = backgroundTextRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            // Calculate the distance from the top of the viewport
            const distanceFromTop = Math.max(0, rect.top); // Ensure it doesn't go below zero
            const maxDistance = viewportHeight;
            // Normalize the distance to a value between 0 and 1
            const normalizedDistance = Math.min(distanceFromTop / maxDistance, 1);
            // Invert it to make glow stronger when closer to the top
            const intensity = 1 - normalizedDistance;
            // Set the glow intensity based on the position
            setGlowIntensity(intensity);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial call to set the initial glow intensity
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    

    const iconMap = {
        faDatabase,
        faC,
        faPython,
        faJava,
        faJs,
        faReact,
        faUnity,
        faGithub,
        faDocker,
        faFire,
        faFigma,
        faBox,
        faCloud,
        faAws,
        faHtml5,
        faBullseye,
        faDiagramProject,
        faDesktop,
        faMicrochip,
        faCube,
        faVialCircleCheck
    };

    const filteredSkills = skillsData.filter(skill => skill.category === filter);

    const handleFilterChange = (newFilter) => {
        setIsAnimating(true); // Start animation
        setFilter(newFilter);
        setTimeout(() => setIsAnimating(false), 300); // Reset animation after duration
    };

    useEffect(() => {
        // Save filter to localStorage whenever it changes
        localStorage.setItem('SkillsFilter', filter);
    }, [filter]);

    return (
        <section className="p-4 transition-colors duration-300 ease-in-out" id='skills'>
            <div className="mb-4 text-center">
                <div className="relative mb-2">
                    {/* Background Text with Dynamic Glow */}
                    <h3
                        ref={backgroundTextRef}
                        className="glow-effect text-[3.7rem] non-selectable font-bold text-gray-500 dark:text-blue-800 absolute top-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                        style={{
                            filter: `brightness(${0.5 + glowIntensity * 1.5})`, // Adjust the brightness based on scroll
                            opacity: 0.2 + glowIntensity * 0.4, // Increase opacity as it scrolls to the top
                            textShadow: darkMode ? `10px 15px 12px rgba(19, 88, 237, ${glowIntensity})` : `16px 22px 16px rgba(12, 12, 12, ${glowIntensity})`
                        }}
                    >
                        S K I L L S
                    </h3>
                    {/* Foreground Text */}
                    <h3 className="sectionHead text-[3.7rem] font-bold relative z-10 text-black whitespace-nowrap">S K I L L S</h3>
                </div>
                <p className="subtext text-gray-600">A collection of programming languages and technologies I have experience with.</p>
                <hr className='mt-6 mb-4 border-blue-500 border-2 w-1/6 mx-auto'></hr>
                <div className="mt-4 relative inline-block">
                    <div className="flex justify-center space-x-4 sm:space-x-12">
                        <div 
                            className={`toggle px-2 sm:px-4 py-2 cursor-pointer font-bold hover:text-blue-500 ${filter === 'languages' ? 'text-blue-500' : 'text-gray-600'}`} 
                            onClick={() => handleFilterChange('languages')}
                        >
                            <p className='toggle'>Languages</p>
                        </div>
                        <div 
                            className={`toggle px-2 sm:px-4 py-2 cursor-pointer font-bold hover:text-blue-500 ${filter === 'technologies' ? 'text-blue-500' : 'text-gray-600'}`} 
                            onClick={() => handleFilterChange('technologies')}
                        >
                            <p className='toggle'>Technologies</p>
                        </div>
                        <div 
                            className={`toggle px-2 sm:px-4 py-2 cursor-pointer font-bold hover:text-blue-500 ${filter === 'other' ? 'text-blue-500' : 'text-gray-600'}`} 
                            onClick={() => handleFilterChange('other')}
                        >
                            <p className='toggle'>Other</p>
                        </div>
                    </div>
                    <div 
                        className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-transform duration-300 ease-in-out`} 
                        style={{ 
                            width: '33.33%', 
                            transform: filter === 'languages' ? 'translateX(-10%)' : filter === 'technologies' ? 'translateX(114%)' : 'translateX(222%)' 
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                {filteredSkills.map((skill, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-4 flex justify-center">
                        <Skill 
                            Name={skill.Name} 
                            Description={skill.Description} 
                            icon={iconMap[skill.icon]} 
                            color={skill.color}
                            isAnimating={isAnimating}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Skills;
