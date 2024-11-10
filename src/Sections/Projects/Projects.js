import '../../App.css';
import './Projects.css';

import Project from '../../Components/Project/Project';
import projectDataJson from './Projects.json';
import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Project Content
import MuseumDatabaseDescription from './UniqueProjectContent/MuseumDatabase';
import AnimalShelterSchedulerDescription from './UniqueProjectContent/AnimalShelter';
import DSADescription from './UniqueProjectContent/DSA';
import WordleCloneDescription from './UniqueProjectContent/Wordle';
import NotesDescription from './UniqueProjectContent/Notes';
import ObituarySiteDescription from './UniqueProjectContent/ObituarySite';
import CommUNIcateDescription from './UniqueProjectContent/CommUNIcate';
import AirlineDescription from './UniqueProjectContent/Airline';

function Projects({darkMode}) {
    const [projectData] = useState(projectDataJson);
    const [isAnyProjectExpanded, setIsAnyProjectExpanded] = useState(false);
    const [slides, setSlides] = useState([]);
    const containerRef = useRef(null);
    const [glowIntensity, setGlowIntensity] = useState(0);
    const backgroundTextRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 } // Adjust threshold to control how much of the element must be visible
        );

        if (backgroundTextRef.current) {
            observer.observe(backgroundTextRef.current);
        }

        return () => {
            if (backgroundTextRef.current) {
                observer.unobserve(backgroundTextRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isInView) return;

        const handleScroll = () => {
            if (!backgroundTextRef.current) return;

            const rect = backgroundTextRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const distanceFromTop = Math.max(0, rect.top);
            const maxDistance = viewportHeight;
            const normalizedDistance = Math.min(distanceFromTop / maxDistance, 1);
            const intensity = 1 - normalizedDistance;

            setGlowIntensity(intensity);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial call to set the initial glow intensity

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isInView]); // Only run when the section is in view

    const descriptions = {
        'Museum Database': MuseumDatabaseDescription,
        'Animal Shelter Scheduler': AnimalShelterSchedulerDescription,
        'DSA': DSADescription,
        'Wordle Clone': WordleCloneDescription,
        'Notes App': NotesDescription,
        'Obituary Site': ObituarySiteDescription,
        'CommUNIcate': CommUNIcateDescription,
        'Airline Application': AirlineDescription
    };

    const handleProjectClick = (isExpanded) => {
        setIsAnyProjectExpanded(isExpanded);
    };

    useEffect(() => {
        const calculateSlides = () => {
            if (!containerRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const projectWidth = 200; // Approximate width of each project card
            const projectsPerRow = Math.floor(containerWidth / projectWidth);

            const newSlides = [];
            for (let i = 0; i < projectData.length; i += projectsPerRow) {
                newSlides.push(projectData.slice(i, i + projectsPerRow));
            }

            setSlides(newSlides);
        };

        calculateSlides();
        window.addEventListener('resize', calculateSlides);
        
        return () => window.removeEventListener('resize', calculateSlides);
    }, [projectData]);

    return (
        <section className="py-8 mx-auto w-full p-4 pb-24 transition-colors duration-300 ease-in-out" id="projects" ref={containerRef}>
            <div className="text-center mb-12">
                <div className="relative mb-2">
                    {/* <!-- Background Text --> */}
                    <h3
                        ref={backgroundTextRef}
                        className="glow-effect text-[3.3rem] non-selectable font-bold text-gray-500 dark:text-blue-800 absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                        style={{
                            filter: `brightness(${0.5 + glowIntensity * 1.5})`,
                            opacity: darkMode ? 0.2 + glowIntensity * 0.4 : 0 + glowIntensity * 0.8,
                            textShadow: darkMode ? `10px 15px 12px rgba(19, 88, 237, ${glowIntensity})` : `16px 22px 16px rgba(12, 12, 12, ${glowIntensity})`
                        }}
                    >
                        P R O J E C T S
                    </h3>
                    {/* Foreground Text */}
                    <h3 className="sectionHead text-[3.3rem] font-bold relative z-10 text-black whitespace-nowrap">P R O J E C T S</h3>
                </div>
                <p className="subtext text-lg">A collection of projects I have completed or am currently working on.</p>
                <p className="subtextSub text-sm text-gray-600">
                    Note: Only some projects are included here. View my{' '}
                    <a href="https://github.com/Domgartner" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700 transition duration-300 ease-in-out">
                        Github profile
                    </a>{' '}
                    for all my projects.
                </p>
                <hr 
                    className='mt-6 mb-4 border-blue-500 border-2 mx-auto transition-all duration-300' 
                    style={{ width: `${10 + glowIntensity * 20}%` }}
                ></hr>
            </div>
                <Carousel 
                    showThumbs={false} 
                    autoPlay 
                    interval={20000} 
                    infiniteLoop 
                    showStatus={false}
                    swipeable
                    renderIndicator={(onClickHandler, isSelected, index, label) => {
                    const defStyle = { 
                        marginLeft: 8, 
                        cursor: "pointer", 
                        color: "var(--carousel-dot-color)" 
                    };
                    const style = isSelected
                        ? { ...defStyle, color: "var(--carousel-dot-selected-color)" }
                        : defStyle;
                    return (
                        <span
                            style={style}
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            value={index}
                            key={index}
                            role="button"
                            tabIndex={0}
                            aria-label={`${label} ${index + 1}`}
                        >
                            ●
                        </span>
                    );
                    }}
                >
                {slides.map((slideProjects, slideIndex) => (
                    <div key={slideIndex} className="flex justify-center items-center gap-2 flex-wrap">
                        {slideProjects.map((project, projectIndex) => (
                            <div 
                                key={projectIndex} 
                                className="max-w-xs sm:max-w-sm lg:max-w-md p-2"
                                style={{ minWidth: '200px' }}
                            >
                                <Project 
                                    Name={project.name} 
                                    Description={descriptions[project.name] || null}
                                    Video={project.video || null} 
                                    images={project.images.map(image => require(`../../Images/${image}`).default)} 
                                    specs={project.specs}
                                    tags={project.tags || null}
                                    date={project.Date || null}
                                    link={project.link || null}
                                    isAnyProjectExpanded={isAnyProjectExpanded}
                                    onProjectClick={handleProjectClick}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </Carousel>
        </section >
    );
}

export default Projects;
