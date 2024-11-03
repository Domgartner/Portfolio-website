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

function Projects() {
    const [projectData] = useState(projectDataJson);
    const [isAnyProjectExpanded, setIsAnyProjectExpanded] = useState(false);
    const [slides, setSlides] = useState([]);
    const containerRef = useRef(null);

    const descriptions = {
        'Museum Database': MuseumDatabaseDescription,
        'Animal Shelter Scheduler': AnimalShelterSchedulerDescription,
        'Data Structures and Algorithms': DSADescription,
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
        <section className="mx-auto w-full p-4 pb-24 transition-colors duration-300 ease-in-out" id="projects" ref={containerRef}>
            <div className="text-center mb-12">
                <h3 className="sectionHead text-4xl font-bold mb-2">Projects</h3>
                <p className="subtext text-lg">A collection of projects I have completed or am currently working on.</p>
                <p className="subtextSub text-sm text-gray-600">
                    Note: Only some projects are included here. View my{' '}
                    <a href="https://github.com/Domgartner" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700 transition duration-300 ease-in-out">
                        Github profile
                    </a>{' '}
                    for all my projects.
                </p>
            </div>
                <Carousel 
                    showThumbs={false} 
                    autoPlay 
                    interval={12000} 
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
