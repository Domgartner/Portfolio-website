import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

function ScrollToTop({ scrollToHome, darkMode, markerRef }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!markerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(!entry.isIntersecting),
            { threshold: 0 }
        );

        observer.observe(markerRef.current);
        return () => observer.disconnect();
    }, [markerRef]);

    return (
        <div
            className={`fixed bottom-8 right-8 w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center transition transform hover:bg-blue-500 hover:text-white ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
                color: 'blue',
                transition: 'opacity 0.3s ease-in-out',
                pointerEvents: isVisible ? 'auto' : 'none'
            }}
        >
            <button
                onClick={scrollToHome}
                className="w-full h-full flex items-center justify-center"
            >
                <FontAwesomeIcon icon={faArrowUp} className="text-xl" style={{ color: darkMode ? 'white' : 'blue' }}/>
            </button>
        </div>
    );
}

export default ScrollToTop;
