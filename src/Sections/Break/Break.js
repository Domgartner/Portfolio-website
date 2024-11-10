import '../../App.css';
import bg from '../../Images/Misc/BreakBg.png';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faCalculator, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

function Break() {
    const [gpa, setGpa] = useState(null);
    const finalGpa = 3.89;
    const [inView, setInView] = useState(false);
    const [animationTriggered, setAnimationTriggered] = useState(false);
    const sectionRef = useRef(null);

    // GPA count-up effect
    useEffect(() => {
        if (gpa === null) return; // Skip count-up if GPA is still null (i.e., before animation)
        
        if (gpa < finalGpa) {
            const interval = setInterval(() => {
                setGpa((prevGpa) => {
                    const newGpa = Math.min(prevGpa + 0.01, finalGpa);
                    return newGpa;
                });
            }, 3);

            return () => clearInterval(interval);
        }
    }, [gpa]);

    // Intersection Observer for animation on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animationTriggered) {
                        setInView(true);
                        setAnimationTriggered(true); // Mark animation as triggered
                        setTimeout(() => {
                            setGpa(0.01); // Start the GPA count-up from 0.01
                        }, 300);
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of the section is in view
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [animationTriggered]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[500px] md:h-[300px] lg:h-[300px] bg-fixed bg-cover bg-center flex items-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mx-auto text-center text-white">
                <div
                    className={`flex flex-col items-center transform transition-transform duration-700 ${
                        inView ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <FontAwesomeIcon icon={faLaptopCode} className="text-5xl mb-2" />
                    <h3 className="text-3xl font-bold">2+</h3>
                    <h2 className="text-2xl font-semibold">YEARS OF WORK EXPERIENCE</h2>
                </div>
                <div className="flex flex-col items-center">
                    <FontAwesomeIcon icon={faCalculator} className="text-5xl mb-2" />
                    {/* Only display GPA if it's not null */}
                    <h3 className="text-3xl font-bold">{gpa !== null ? gpa.toFixed(2) : ''}</h3>
                    <h2 className="text-2xl font-semibold">CUMULATIVE GPA</h2>
                </div>
                <div
                    className={`flex flex-col items-center transform transition-transform duration-700 ${
                        inView ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <FontAwesomeIcon icon={faGraduationCap} className="text-5xl mb-2" />
                    <h3 className="text-3xl font-bold">44</h3>
                    <h2 className="text-2xl font-semibold">UNIVERSITY LEVEL CLASSES</h2>
                </div>
            </div>
        </section>
    );
}

export default Break;
