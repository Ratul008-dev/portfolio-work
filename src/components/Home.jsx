import React from 'react'
import './Home.css'
import HomeLogic from './HomeLogic'
import { useEffect } from 'react'
const Home = () => {
  useEffect(() => { HomeLogic() }, [])
  return (
    <section id='home'>
    <div className='home-decoration'>
      <div className="home-left">
        <p className='home-greeting'>Hi, I'm Ratul</p>
        <h1>Full Stack Developer</h1>
        <h2>Building modern web experiences with AI</h2>
        <p className="home-description">
          I build responsive, full-stack web applications and
          integrate modern AI solutions to create smarter,
          more engaging digital experiences.
        </p>
        <div className="home-buttons">
          <span className="tech-button">React</span>
          <span className="tech-button">Express</span>
          <span className="tech-button">AI</span>
        </div>
      </div>
      <div className="home-right">
        <div className="visual-container">
          <img src="/images/banner1.jpg" alt="" className="photo-top" />
          <img src="/images/banner2.jpg" alt="" className="photo-middle" />
          <img src="/images/banner3.jpg" alt="" className="photo-bottom" />
        </div>
      </div>
    </div>
    </section>
  )
}

export default Home