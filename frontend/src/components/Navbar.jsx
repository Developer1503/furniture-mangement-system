import React from 'react';
import assets from '../assets/assets'; // Adjust the path if assets.js is in the src directory

const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={assets.Antro_logo} alt="Antro_logo" style={{ height: '2.5rem' }} />
            </div>
            <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
                <li style={{ fontSize: '1.25rem', fontFamily: 'Roboto, sans-serif', fontWeight: 700, color: 'black' }}>
                    <a href="#home" style={{ textDecoration: 'none', color: 'inherit' }}>HOME</a>
                </li>
                <li style={{ fontSize: '1.25rem', fontFamily: 'Roboto, sans-serif', fontWeight: 700, color: 'black' }}>
                    <a href="#categories" style={{ textDecoration: 'none', color: 'inherit' }}>CATEGORIES</a>
                </li>
                <li style={{ fontSize: '1.25rem', fontFamily: 'Roboto, sans-serif', fontWeight: 700, color: 'black' }}>
                    <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>ABOUT</a>
                </li>
            </ul>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.2rem' }}>
                    <img src={assets.user} alt="User" style={{ width: '1.55rem', height: '1.55rem', border: '2px solid black' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.2rem' }}>
                    <img src={assets.search} alt="Search" style={{ width: '1.55rem', height: '1.55rem', border: '2px solid black' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.2rem' }}>
                    <img src={assets.shopping_cart} alt="Cart" style={{ width: '1.55rem', height: '1.55rem', border: '2px solid black' }} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
