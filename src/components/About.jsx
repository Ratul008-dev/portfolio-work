import React from 'react'
import './About.css'
import { FaArrowUp } from 'react-icons/fa'
const About = () => {
    return (
        <section id='about'>

            <div className=' about-container'>

                <div className="left-container">
                    <h1 className="about-headline">My Journey So Far</h1>
                    <img src="/images/mypic.jpg" alt="" className="mypic" />
                </div>
                <div className="right-container">
                    <h2 className="description-heading">The Story Behind the Code</h2>
                    <p className="description">My journey as a developer has been built through continuous learning, practical experimentation,
                        and a strong desire to understand how things work. I started with the fundamentals of web development
                        and gradually developed my skills into full-stack development,
                        learning how to build both the frontend and backend of modern web applications.
                        Rather than limiting myself to tutorials, I enjoy turning ideas into real projects
                        and solving problems that require me to think beyond the usual approach.

                        I work with technologies such as React, JavaScript, Node.js, Express, and MongoDB,
                        with a focus on creating responsive, practical, and user-friendly applications.
                        Recently, I have also started exploring the world of AI and integrating AI-powered features into websites,
                        including chatbots and intelligent interactions. This has opened a new direction in my development journey,
                        where I combine traditional web technologies with modern AI capabilities. <br/>

                        For me, development is not only about writing code; it is about learning, experimenting, improving,
                        and building something meaningful from an idea. Every project gives me an opportunity to understand
                        something new and become a better problem solver. I am continuously expanding my knowledge and working
                        toward becoming a stronger full-stack developer who can build modern web experiences with thoughtful AI integration.</p>
                </div>
            </div>
            <a href="#home" className='return-arrow'><FaArrowUp/></a>
        </section>
    )
}

export default About