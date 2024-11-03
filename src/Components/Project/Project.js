import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import ProjectModal from './ProjectModal';
import '../../App.css';
import './Project.css';

function Project({ Name, Description, Video, images, specs, tags, link, isAnyProjectExpanded, onProjectClick }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // Manage visibility for animation

    const handleClick = () => {
        setIsExpanded(true);
        setTimeout(() => setIsVisible(true), 10); // Slight delay to trigger animation after render
    };

    const getColor = (tag) => {
        switch (tag.toLowerCase()) {
            case 'cloud':
                return { bg: 'bg-blue-100', hover: 'hover:bg-blue-300' };
            case 'auth':
                return { bg: 'bg-green-100', hover: 'hover:bg-green-300' };
            case 'database':
                return { bg: 'bg-yellow-100', hover: 'hover:bg-yellow-300' };
            case 'api':
                return { bg: 'bg-red-100', hover: 'hover:bg-red-300' };
            case 'iac':
                return { bg: 'bg-purple-100', hover: 'hover:bg-purple-300' };
            case 'gui':
                return { bg: 'bg-pink-100', hover: 'hover:bg-pink-300' };
            case 'terminal-based':
                return { bg: 'bg-cyan-100', hover: 'hover:bg-cyan-300' };
            case 'web':
                return { bg: 'bg-orange-100', hover: 'hover:bg-orange-300' };
            case 'ci/cd':
                return { bg: 'bg-indigo-100', hover: 'hover:bg-indigo-300' };
            default:
                return { bg: 'bg-gray-100', hover: 'hover:bg-gray-300' };
        }
    };
    
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto'; // Revert overflow on cleanup
        };
    }, [isExpanded]);

    const openImageInModal = (image) => {
        // open the image in a modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75';
        modal.onclick = () => document.body.removeChild(modal);

        const img = document.createElement('img');
        img.src = image;
        img.className = 'max-w-full max-h-full rounded-lg';
        img.style.maxWidth = '75vw';
        img.style.maxHeight = '75vh';
        img.onclick = (e) => e.stopPropagation(); // Prevent modal close on image click
        modal.appendChild(img);
        document.body.appendChild(modal);
    };

    const closeModal = (e) => {
        e.stopPropagation();
        setIsVisible(false); // Start close animation
        setTimeout(() => {
            setIsExpanded(false);
            onProjectClick(false);
        }, 300); // Duration of the animation
    };
    
    return (
        <>
            {/* The carousel item (small view) */}
            <div
                className="projectCont p-6 border rounded-lg shadow-xl mb-12 w-80 h-80 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
                style={{ cursor: 'pointer' }}
                onClick={!isExpanded && !isAnyProjectExpanded ? () => {
                    handleClick();
                    onProjectClick(true);
                } : undefined}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className={`projName font-semibold text-gray-800 ${Name.length > 22 ? 'text-[1.4rem]' : 'text-3xl'}`}>{Name}</h2>
                </div>
                {images && images.length > 0 && (
                    <img src={images[0]} alt={Name} className={`w-full h-40 ${tags && tags.length > 0 ? 'max-h-[58%]' : 'max-h-40'} object-cover rounded-lg mb-4`} style={{ height: '200px' }} />
                )}
               {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 overflow-hidden">
                        {tags.map((tag, index) => {
                            const { bg, hover } = getColor(tag);
                            return (
                                <span
                                    key={index}
                                    className={`${bg} text-gray-800 text-sm font-semibold px-2 py-1 rounded transition-colors duration-300 ease-in-out ${hover}`}
                                >
                                    {tag}
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>
            {/* Render modal outside the carousel */}
            {isExpanded && ReactDOM.createPortal(
                <ProjectModal 
                    Name={Name} 
                    Description={Description} 
                    Video={Video} 
                    images={images} 
                    specs={specs} 
                    link={link} 
                    isVisible={isVisible} 
                    closeModal={closeModal}
                    openImageInModal={openImageInModal}
                />, 
                document.body
            )}
        </>
    );
}

export default Project;