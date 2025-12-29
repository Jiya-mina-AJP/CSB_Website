import React, { useState } from 'react';
import './MenuBar.css';

export const MenuBar = ({ items, activeItem, onItemClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleItemClick = (e, item) => {
        e.preventDefault();
        setIsMenuOpen(false);
        if (onItemClick) {
            onItemClick(item);
        }
    };

    return (
        <nav className="menubar-nav">
            {/* Mobile menu toggle button - only visible on small screens */}
            <button
                onClick={toggleMenu}
                className={`mobile-toggle ${isMenuOpen ? 'open' : ''}`}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
            </button>

            {/* Menu container - adapts to screen size */}
            <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
                <ul className="menu-list">
                    {items.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href || "#"}
                                className={`menu-link ${activeItem === item.label ? 'active' : ''}`}
                                onClick={(e) => handleItemClick(e, item)}
                            >
                                {/* Link text */}
                                <span className="link-text">
                                    {item.label}
                                </span>
                                {/* Top & bottom border animation */}
                                <span className="border-animation" />
                                {/* Background fill animation */}
                                <span className="fill-animation" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};
