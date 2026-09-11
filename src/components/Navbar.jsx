import React from 'react'
import './Navbar.css'
const Navbar = () => {
    return (
        <div>
            <nav className='navbar'>
                <a href="#home"> <li>Home</li></a>
                <a href="#about"> <li>About</li></a>
                <a href="#works"><li>Works</li></a>
                <a href="#skills"> <li>Skills</li></a>
                <a href="#contact"> <li>Contact</li></a>
            </nav>
        </div>
    )
}

export default Navbar