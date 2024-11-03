import '../../App.css';
import './About.css';
import pic from '../../Images/About/pic.jpg';
import UofC from '../../Images/About/UofC.jpg';
import resume from '../../Files/Resume.pdf';
import AboutDesc from './AboutDesc';
import AboutDataJson from './About.json';
import React, { useEffect, useState, useRef } from 'react';
import { Chrono } from "react-chrono";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function About() {
    const [filter, setFilter] = useState(localStorage.getItem('filter') || 'about');
    const [experienceData, setExperienceData] = useState([]);
    const [educationData, setEducationData] = useState([]);
    const [cer, setCer] = useState([]);

    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        // Update the width initially and on window resize
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        
        updateWidth();
        window.addEventListener('resize', updateWidth);
        
        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);


    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const InstitutionLogo = {
        'University of Calgary': UofC
    };

    useEffect(() => {
        const experience = AboutDataJson[0].experience || [];
        const education = AboutDataJson[0].education || [];
        const cer = AboutDataJson[0].certifications || [];
        setExperienceData(experience);
        setEducationData(education);
        setCer(cer);
    }, []);

    return (
        <section className="p-16 w-screen" id="about">
            <div className="text-center mb-8">
                <h3 className="sectionHead text-4xl font-bold text-gray-800">About</h3>
            </div>

            {/* /* Filters at the top */}
            <div className="mb-4 text-center">
                <div className="mt-4 relative inline-block">
                    <div className="flex justify-center space-x-2 md:space-x-4">
                        <div
                            className={`toggle px-2 py-1 cursor-pointer font-bold transition-colors duration-300 hover:text-blue-500 ${filter === 'about' ? 'text-blue-500' : 'text-gray-600'}`}
                            onClick={() => handleFilterChange('about')}
                        >
                            <p className='toggle'>About</p>
                        </div>
                        <div
                            className={`toggle px-2 py-1 cursor-pointer font-bold transition-colors duration-300 hover:text-blue-500 ${filter === 'education' ? 'text-blue-500' : 'text-gray-600'}`}
                            onClick={() => handleFilterChange('education')}
                        >
                            <p className='toggle'>Education</p>
                        </div>
                        <div
                            className={`toggle px-2 py-1 cursor-pointer font-bold transition-colors duration-300 hover:text-blue-500 ${filter === 'experience' ? 'text-blue-500' : 'text-gray-600'}`}
                            onClick={() => handleFilterChange('experience')}
                        >
                            <p className='toggle'>Experience</p>
                        </div>
                    </div>
                    <div
                        className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-transform duration-300 ease-in-out`}
                        style={{
                            width: '33.33%',
                            transform: filter === 'about' ? 'translateX(-20%)' : filter === 'education' ? 'translateX(78%)' : 'translateX(196%)',
                        }}
                    />
                </div>
            </div>

            <div ref={containerRef} className="AboutCont flex flex-col items-center justify-center w-full border border-gray-300 rounded-xl shadow-lg p-6 bg-white space-y-8">
            {/* About Section */}
            {filter === 'about' && (
                <div className="flex flex-col md:flex-row w-full items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
                    <div className="w-full md:w-1/3">
                        <img
                            src={pic}
                            alt="About"
                            className="rounded-xl shadow-lg w-full h-auto object-cover"
                        />
                    </div>
                    <div className="w-full md:w-2/3 md:pl-8 flex flex-col justify-between text-center md:text-left">
                        <div className="mb-4">
                            <div className="leading-relaxed">
                                <AboutDesc />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center md:justify-start space-x-4">
                            <a
                                href={resume}
                                download="Resume.pdf"
                                className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                            >
                                Download Resume
                            </a>
                            <a href="https://github.com/Domgartner" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faGithub} className="fa-icon text-gray-700 hover:text-purple-700 cursor-pointer text-3xl md:text-5xl transition-colors duration-300" />
                            </a>
                            <a href="https://www.linkedin.com/in/dominic-gartner/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} className="fa-icon text-gray-700 hover:text-blue-500 cursor-pointer text-3xl md:text-5xl transition-colors duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
            {/* Experience Section */}
            {filter === 'experience' && (
                <div className="w-full">
                    <Chrono
                        className="Chrono"
                        items={experienceData}
                        mode={containerWidth <= 640 ? "VERTICAL" : "HORIZONTAL"}
                        showAllCardsHorizontal={containerWidth > 640}
                        scrollable={true}
                        textOverlay
                        cardWidth={containerWidth <= 640 ? 200 : containerWidth / 5}
                        cardHeight={300}
                        itemWidth={containerWidth > 640 ? containerWidth / 2 : containerWidth * 0.9}
                        disableToolbar={true}
                        theme={{
                            primary: "var(--primary)",
                            secondary: "var(--secondary-color)",
                            cardBgColor: "var(--card-bg-color)",
                            cardForeColor: "var(--card-fore-color)",
                        }}
                    />
                </div>
            )}
                {/* Education Section */}
                {filter === 'education' && (
                    <div className="flex flex-col w-full space-y-12">
                        {/* Schooling Section */}
                        <div className="flex flex-col items-center w-full">
                            <h3 className="EducTitle text-2xl font-bold mb-6">Schooling</h3>
                            <div className="flex w-full overflow-x-auto space-x-8 justify-center">
                                {educationData.map((edu, index) => (
                                    <div
                                        key={index}
                                        className="educLogo relative min-w-[300px] bg-gray-100 p-6 rounded-xlg shadow-lg group overflow-hidden"
                                    >
                                        {/* Background Logo */}
                                        <img
                                            src={InstitutionLogo[edu.Institution]}
                                            alt={edu.Institution}
                                            className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                        {/* Content Overlay */}
                                        <div className="relative z-10">
                                            <h4 className="EducTitle InstitutionName text-xl font-semibold mb-2 transition-opacity duration-300 group-hover:opacity-0">
                                                {edu.Institution}
                                            </h4>
                                            <p className="EducTitle text-gray-600 mb-1 transition-opacity duration-300 group-hover:opacity-0">
                                                {edu.Degree}
                                            </p>
                                            <p className="EducTitle text-gray-500 mb-2 transition-opacity duration-300 group-hover:opacity-0">
                                                {edu['Start Date']} - {edu['End Date']}
                                            </p>
                                            {/* Achievements List */}
                                            <ul className="EducTitle list-disc list-inside mt-2 text-gray-600 transition-opacity duration-300 group-hover:opacity-0">
                                                {edu.Achievements.map((achievement, idx) => (
                                                    <li key={idx}>
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Certifications Section */}
                        <div className="flex flex-col items-center w-full">
                            <h3 className="EducTitle text-2xl font-bold mb-6">Certifications</h3>
                            <ul className="w-full max-w-full-md mx-auto space-y-4">
                                {cer.map((cert, index) => (
                                    <li key={index} className="certification bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md">
                                        <h4 className="EducTitle text-lg font-semibold mb-1">{cert.Title}</h4>
                                        <p className="EducTitle text-gray-600">{cert.DateIssued}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default About;
