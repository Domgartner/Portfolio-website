import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Project.css'

function ProjectModal({ isVisible, closeModal, Name, images, specs, Description, link, Video, openImageInModal }) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768); // Tailwind's md breakpoint (768px)
        };
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Check on initial render
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`} 
            onClick={closeModal} 
        >
                <div
                    className={`projModalbg relative bg-gray-100 ${isSmallScreen ? 'w-[96%]' : 'lg:w-4/5'} max-h-[95vh] shadow-lg p-6 border rounded-lg overflow-y-scroll transition-transform duration-300 ease-in-out transform ${
                        isVisible ? 'scale-100' : 'scale-95'
                    }`}
                    onClick={(e) => e.stopPropagation()} 
                >
                <div className="flex justify-center items-center mb-4">
                    <h2 className="projName text-3xl font-semibold text-gray-800 mb-4">{Name}</h2>
                    <button
                        className="fa-icon absolute right-4 text-2xl font-bold text-gray-600 hover:text-red-600"
                        onClick={closeModal}
                    >
                        &times;
                    </button>
                </div>
                <div className="flex">
                    <div className="mr-8 w-full">
                        <Swiper
                            direction={'horizontal'}
                            slidesPerView={1}
                            spaceBetween={30}
                            pagination={{
                                clickable: true
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                            style={{ paddingBottom: '5px'}}
                        >
                            {/* Conditionally render slides based on screen size */}
                            {isSmallScreen ? (
                                <>
                                    {/* Slide 1: Images and Specs */}
                                    <SwiperSlide>
                                        <div className="flex flex-col items-center mb-2">
                                            {/* Images */}
                                            <div className="flex justify-center">
                                                {images && images.length > 0 && (
                                                    <Swiper
                                                        direction={'horizontal'}
                                                        slidesPerView={1}
                                                        spaceBetween={30}
                                                        mousewheel={true}
                                                        pagination={{
                                                            clickable: true,
                                                        }}
                                                        modules={[Mousewheel, Pagination]}
                                                        className="mySwiper"
                                                        style={{ width: '400px', height: '320px', flexShrink: '0' }}
                                                    >
                                                        {images.map((image, index) => (
                                                            <SwiperSlide key={index}>
                                                                <img
                                                                    src={image}
                                                                    alt={`${Name} ${index + 1}`}
                                                                    className="w-[98%] h-full rounded-lg cursor-pointer"
                                                                    onClick={() => openImageInModal(image)}
                                                                />
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                )}
                                            </div>
                                            {/* Specs */}
                                            <div className="specsCont mt-4 bg-gray-200 p-4 rounded-lg shadow-md w-full">
                                                <h3 className="specsTitle font-semibold text-xl text-center">Specs:</h3>
                                                <div className="flex mb-2">
                                                    <div className="flex-1">
                                                        <h4 className="specsSemiTitle font-semibold">Technologies:</h4>
                                                        <ul className="list-disc ml-4">
                                                            {specs.technologies.map((tech, index) => (
                                                                <li key={index}>{tech}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    {specs.dependencies.length > 0 && (
                                                        <div className="flex-1">
                                                            <h4 className="specsSemiTitle font-semibold">Dependencies:</h4>
                                                            <ul className="list-disc ml-4">
                                                                {specs.dependencies.map((dep, index) => (
                                                                    <li key={index}>{dep}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                                <ul className="list-none ml-4">
                                                    <li className="mb-2">
                                                        <strong>GitHub Repo:</strong>
                                                        <a href={specs.githubRepo} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">
                                                            <FontAwesomeIcon
                                                                icon={faGithub}
                                                                className="text-black hover:text-purple-600"
                                                                style={{ fontSize: '1.6em' }}
                                                            />
                                                        </a>
                                                    </li>
                                                    {link && (
                                                        <li className="mb-4">
                                                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                                                <strong>Live Link</strong>
                                                            </a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                    {/* Slide 2: Description */}
                                    <SwiperSlide>
                                        <div className='overflow-y-auto max-h-[70vh] p-4 mb-10'>
                                            {Description && <Description/>}
                                        </div>
                                    </SwiperSlide>
                                </>
                            ) : (
                                <>
                                    {/* Larger screens: Images, Specs, and Description in one slide */}
                                    <SwiperSlide>
                                        <div className="flex">
                                            <div className="mr-8 mb-12">
                                                {images && images.length > 0 && (
                                                    <Swiper
                                                        direction={'horizontal'}
                                                        slidesPerView={1}
                                                        spaceBetween={12}
                                                        mousewheel={true}
                                                        pagination={{
                                                            clickable: true,
                                                        }}
                                                        modules={[Mousewheel, Pagination]}
                                                        className="mySwiper"
                                                        style={{ width: '500px', height: '400px', flexShrink: '0' }}
                                                    >
                                                        {images.map((image, index) => (
                                                            <SwiperSlide key={index}>
                                                                <img
                                                                    src={image}
                                                                    alt={`${Name} ${index + 1}`}
                                                                    className="w-full h-full rounded-lg cursor-pointer"
                                                                    onClick={() => openImageInModal(image)}
                                                                />
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                )}

                                                <div className="specsCont mt-4 bg-gray-200 p-4 rounded-lg shadow-md min-h-[268px]">
                                                    <h3 className="specsTitle font-semibold text-xl mb-4 text-center">Specs:</h3>
                                                    <div className="flex mb-4">
                                                        <div className="flex-1">
                                                            <h4 className="specsSemiTitle font-semibold">Technologies:</h4>
                                                            <ul className="list-disc ml-4">
                                                                {specs.technologies.map((tech, index) => (
                                                                    <li key={index}>{tech}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        {specs.dependencies.length > 0 && (
                                                            <div className="flex-1">
                                                                <h4 className="specsSemiTitle font-semibold">Dependencies:</h4>
                                                                <ul className="list-disc ml-4">
                                                                    {specs.dependencies.map((dep, index) => (
                                                                        <li key={index}>{dep}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <ul className="list-none ml-4">
                                                        <li className="mb-4">
                                                            <strong>GitHub Repo:</strong>
                                                            <a href={specs.githubRepo} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">
                                                                <FontAwesomeIcon
                                                                    icon={faGithub}
                                                                    className="fa-icon text-black hover:text-purple-600"
                                                                    style={{ fontSize: '1.6em' }}
                                                                />
                                                            </a>
                                                        </li>
                                                        {link && (
                                                            <li className="mb-4">
                                                                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                                                    <strong>Live Link</strong>
                                                                </a>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="flex-grow">
                                                <hr className="my-4 border-2" />
                                                <div className='overflow-y-auto max-h-[70vh] mb-4'>
                                                    {Description && <Description />}
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </>
                            )}

                            {/* Slide 3: Video */}
                            {Video && (
                                <SwiperSlide>
                                      <div className="flex justify-center items-center w-full h-[74vh]">
                                        <iframe
                                            src={Video}
                                            title="YouTube Video"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{
                                                width: '100%',
                                                height: '95%',
                                            }}
                                        ></iframe>
                                    </div>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectModal;
