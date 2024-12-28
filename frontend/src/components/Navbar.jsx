import React from 'react';
import { assets } from '../assets/assets'; // Correct import syntax

const Navbar = () => {
    console.log(assets); // Debugging

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={assets.Antro_logo} alt="Antro Logo" style={{ height: '2.5rem' }} />
            </div>
            <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
                <li><a href="#home">HOME</a></li>
                <li><a href="#categories">CATEGORIES</a></li>
                <li><a href="#about">ABOUT</a></li>
                <li>
                    <img src={assets.ai_gen}alt="Antro Transparent Logo" style={{ height: '2.5rem' }} />
                </li>
            </ul>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <img src={assets.user} alt="User Icon" style={{ width: '1.5rem' }} />
                <img src={assets.search} alt="Search Icon" style={{ width: '1.5rem' }} />
                <img src={assets.shopping_cart} alt="Shopping Cart" style={{ width: '1.5rem' }} />
            </div>
        </nav>
    );
};

export default Navbar;
