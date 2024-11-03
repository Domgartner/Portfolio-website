import '../../App.css';
import './Skills.css';
import { faDatabase, faC, faFire, faBox, faCloud, faBullseye, faDiagramProject, faDesktop, faMicrochip, faCube, faVialCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { faPython, faJava, faJs, faReact, faUnity, faGithub, faDocker, faFigma, faAws, faHtml5} from '@fortawesome/free-brands-svg-icons';
import Skill from '../../Components/Skill/Skill';
import SkillsDataJson from './Skills.json';
import React, { useEffect, useState } from 'react';

function Skills() {
    const [skillsData, setSkillsData] = useState([]);
    const [filter, setFilter] = useState(localStorage.getItem('SkillsFilter') || 'languages');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setSkillsData(SkillsDataJson);
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
                <h3 className="sectionHead text-4xl font-bold">Skills</h3>
                <p className="subtext text-gray-600">A collection of programming languages and technologies I have experience with.</p>
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
                    <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-4 flex justify-center">
                        <Skill 
                            Name={skill.Name} 
                            Description={skill.Description} 
                            icon={iconMap[skill.icon]} 
                            color={skill.color}
                            isAnimating={isAnimating} // Pass the animation state
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Skills;
