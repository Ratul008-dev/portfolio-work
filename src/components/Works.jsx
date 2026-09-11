import React, { useState, useEffect, useRef } from 'react';
import './Works.css'
import { FaArrowUp } from 'react-icons/fa';
import { nextIndex, prevIndex, updateSliderDOM } from './sliderLogic';
const projects = [

    {
        title: "Electronic Market",
        description: "A full-stack e-commerce application built to bring multiple real-world systems together in one shopping experience. It features AI-powered product discovery using Gemini, allowing users to search for products through natural language and receive relevant suggestions connected directly to the store. The application also includes category-based browsing, detailed product pages, authenticated user-specific cart management, JWT authentication with secure password hashing, and Razorpay payment integration. Built with React.js, Node.js, Express.js, MongoDB, and REST APIs, the project focuses on the challenge of making multiple frontend and backend systems work together as one complete application.",
        techStack: "React.js · Node.js · Express.js · MongoDB · REST APIs · Gemini API · Razorpay",
        images: [
            "/images/emarket1.jpg",
            "/images/emarket2.jpg",
            "/images/emarket3.jpg",
        ],
        liveLink: "https://electronic-market-nu.vercel.app/",
        githubLink: "https://github.com/Ratul008-dev/Electronic-Market"
    },
    {
        title: "Track Yourself",
        description: "A full-stack To-Do application built to strengthen my understanding of real-world backend development and deployment. The project features secure user authentication with password hashing using bcrypt and user data management through MongoDB Atlas. The backend was structured using Node.js and Express.js with modular routes to maintain a scalable and organized architecture, while EJS was used for dynamic server-side rendering. The application was deployed on Render with environment variables and cloud configuration handled as part of the deployment process. This project helped me gain practical experience in backend architecture, authentication flows, cloud databases, and the challenges involved in taking a full-stack application from development to deployment.",
        techStack: "Express.js · MongoDB Atlas · bcrypt · EJS · Render",
        images: [
            "/images/tyourself1.jpg",
            "/images/tyourself2.jpg",
            "/images/tyourself3.jpg",
        ],
        liveLink: "https://practice-23xo.onrender.com/",
        githubLink: "https://github.com/Ratul008-dev/Practice"
    },
    {
        title: "Pulse of the Engine",
        description: "A React.js-based frontend project built to strengthen my skills in creating dynamic and interactive web applications. The project integrates a custom API to fetch and display data dynamically while making use of React Hooks for state management and reusable functionality. It also includes Google Sheets integration, allowing users to submit reviews that can be received and stored through an external service. Built with a focus on clean functionality and user experience, this project helped me gain practical experience connecting React applications with APIs and third-party services while improving my understanding of modern frontend development, problem-solving, and scalable application structure.",
        techStack: "React.js · React Hooks · Custom API · Google Sheets API · CSS",
        images: [
            "/images/pulse1.jpg",
            "/images/pulse2.jpg",
            "/images/pulse3.jpg",
        ],
        liveLink: "https://pulse-gilt-two.vercel.app/",
        githubLink: "https://github.com/Ratul008-dev/pulse"
    },
    {
        title: "Graphics Work",
        description: "A collection of graphic design work created to explore visual creativity, layout composition, and digital design. These projects reflect my experience in designing visually engaging posters, social media graphics, promotional materials, and other creative assets with a focus on typography, color balance, composition, and overall visual impact. Alongside development, graphic design has helped me strengthen my creative thinking and attention to detail, allowing me to approach digital projects from both a technical and visual perspective. This collection represents my interest in transforming ideas into clear, engaging, and visually appealing designs.",
        creativeFocus: "Graphic Design · Typography · Layout Design · Color Composition · Social Media Creatives · Visual Branding",
        images: [
            "/images/gfx1.jpg",
            "/images/gfx2.jpg",
            "/images/gfx3.jpg",
        ]
    }
]
const ProjectCardImages = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const total = images.length;

    // Run DOM changes via querySelectorAll inside useEffect
    useEffect(() => {
        if (total === 0 || !containerRef.current) return;

        // Find all img elements inside this specific project container card
        const imgElements = containerRef.current.querySelectorAll('.slider-image');
        
        // Execute your JS logic script helper to handle layout display states
        updateSliderDOM(imgElements, currentIndex);
    }, [currentIndex, total]);

    // Handle automated slideshow cycles
    useEffect(() => {
        if (total <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => nextIndex(prev, total));
        }, 3000);

        return () => clearInterval(interval);
    }, [total]);

    if (total === 0) return null;

    return (
        <div className="slider-container" ref={containerRef}>
            <div className="slider-wrapper">
                {total > 1 && (
                    <button 
                        className="slider-btn prev-btn" 
                        onClick={() => setCurrentIndex((prev) => prevIndex(prev, total))}
                    >
                        ❮
                    </button>
                )}
                
                {images.map((image, imageIndex) => (
                    <img
                        src={image}
                        alt={`${title} view`}
                        key={imageIndex}
                        className="slider-image"
                        style={{ transition: 'opacity 0.3s ease' }}
                    />
                ))}
                
                {total > 1 && (
                    <button 
                        className="slider-btn next-btn" 
                        onClick={() => setCurrentIndex((prev) => nextIndex(prev, total))}
                    >
                        ❯
                    </button>
                )}
            </div>
        </div>
    );
};

const Works = () => {
    return (
        <section id='works'>
            <div>
                <h1>My Creativity</h1>
                {projects.map((project, index) => (
                    <div className="project-card" key={index}>
                        <div className="project-images">
                            <ProjectCardImages images={project.images} title={project.title} />
                        </div>
                        <div className="project-details">
                            <h2>Project-Title: {project.title}</h2>
                            <p>Description: {project.description}</p>
                            <p>Tech-Stack: {project.techStack || project.creativeFocus}</p>
                            
                            {/* Functional Action Link Buttons Container */}
                            {(project.liveLink || project.githubLink) && (
                                <div className="project-links">
                                    {project.liveLink && (
                                        <a 
                                            href={project.liveLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="action-link live-btn"
                                        >
                                            Live Demo
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a 
                                            href={project.githubLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="action-link github-btn"
                                        >
                                            GitHub Repository
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <a href="#about" className='return-arrow'><FaArrowUp /></a>
        </section>
    );
};

export default Works;