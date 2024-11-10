import '../../App.css';
import './Skill.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

function Skill({ Name, Description, icon, color, isAnimating }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="skill relative flex flex-col items-center justify-center p-8 mt-6 mb-6 w-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <FontAwesomeIcon
                icon={icon}
                className={`text-7xl mb-6 transition-transform duration-500 
                    ${hovered ? 'transform scale-150 opacity-10' : 'transform scale-100 opacity-100'}
                    ${isAnimating ? 'transform scale-125 transition-all duration-300' : ''} 
                    dark:text-[var(--text-accent)]`}
                style={{
                    color: hovered ? color : undefined,
                }}
            />
            {hovered && (
                <div className="absolute flex flex-col items-center text-center transition-opacity duration-300">
                    <span className="SkillName text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        <b>{Name}</b>
                    </span>
                    <span className="SkillDesc text-lg text-gray-500 dark:text-gray-400">
                        {Description}
                    </span>
                </div>
            )}
        </div>
    );
}

export default Skill;
