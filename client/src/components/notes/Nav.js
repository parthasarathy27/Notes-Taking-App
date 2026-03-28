import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, LogOut, Menu, X, BookOpen } from 'lucide-react';
import gsap from 'gsap';

export default function Nav({ setIsLogin }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navRef = useRef(null);

    useEffect(() => {
        // Slide down animation on mount
        gsap.fromTo(navRef.current, 
            { y: -100, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const logoutSubmit = () => {
        localStorage.clear();
        setIsLogin(false);
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    // Close menu when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <header className="header-nav glass" ref={navRef}>
            <div className="logo">
                <h1>
                    <Link to="/">
                        <BookOpen className="text-accent" size={28} color="#3b82f6" /> 
                        Notes App
                    </Link>
                </h1>
            </div>
            
            <button className="mobile-menu-btn" onClick={toggleMenu}>
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <ul className={menuOpen ? "mobile-active" : ""}>
                <li>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                        <Home size={20} /> Home
                    </Link>
                </li>
                <li>
                    <Link to="/create" className={location.pathname === '/create' ? 'active' : ''}>
                        <PlusCircle size={20} /> Create Note
                    </Link>
                </li>
                <li className="logout-btn" onClick={logoutSubmit}>
                    <a>
                        <LogOut size={20} /> Logout
                    </a>
                </li>
            </ul>
        </header>
    );
}