import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets'; // Ensure this path is correct
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [hoveredItem, setHoveredItem] = useState('livingroom'); // Set default to 'livingroom'
    const { getCartItemCount } = useContext(ShopContext);
    const cartItemCount = getCartItemCount();
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const closeDropdown = () => {
        setIsDropdownVisible(false);
    };

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem('livingroom'); // Reset to default on mouse leave
    };

    const getImageSrc = () => {
        switch (hoveredItem) {
            case 'livingroom':
                return assets.Livingroom;
            case 'bedroom':
                return assets.Bedroom;
            case 'office':
                return assets.office;
            case 'diningroom':
                return assets.Diningroom;
            default:
                return assets.Livingroom; // Default to Livingroom
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            position: 'relative',
        }}>
            {/* Logo Section */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={assets.Antro_transparent} alt="Antro Logo" style={{ height: '1.5rem' }} />
            </Link>

            {/* Navigation Links */}
            <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
                <li>
                    <Link to="/" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, textDecoration: 'none', color: 'black', transition: 'color 0.3s ease' }}
                       onMouseEnter={(e) => e.target.style.color = '#007BFF'}
                       onMouseLeave={(e) => e.target.style.color = 'black'}>
                        HOME
                    </Link>
                </li>

                {/* Categories with Dropdown */}
                <li style={{ position: 'relative' }}>
                    <button
                        onClick={toggleDropdown}
                        style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, cursor: 'pointer', textDecoration: 'none', color: 'black', transition: 'color 0.3s ease', background: 'none', border: 'none' }}
                        onMouseEnter={(e) => e.target.style.color = '#007BFF'}
                        onMouseLeave={(e) => e.target.style.color = 'black'}>
                        CATEGORIES
                    </button>
                    {isDropdownVisible && (
                        <div ref={dropdownRef} style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            backgroundColor: '#FFE296',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            listStyle: 'none',
                            margin: 0,
                            zIndex: 20,
                            padding: '0.5rem',
                            borderRadius: '4px',
                            width: '400px', // Increased width for the dropdown
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <button
                                onClick={closeDropdown}
                                style={{
                                    alignSelf: 'flex-start',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                &times;
                            </button>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none', flexGrow: 1 }}>
                                    {['livingroom', 'bedroom', 'office', 'diningroom'].map((item) => (
                                        <li
                                            key={item}
                                            style={{ padding: '0.5rem 1rem', backgroundColor: '#FFE296', position: 'relative' }}
                                            onMouseEnter={() => handleMouseEnter(item)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <Link to={`/${item}`} style={{ textDecoration: 'none', color: 'black', display: 'block', padding: '0.5rem', transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = '#FFDAB7';
                                                    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = '#FFE296';
                                                    e.target.style.boxShadow = 'none';
                                                }}>
                                                {item.charAt(0).toUpperCase() + item.slice(1)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                                    <img
                                        src={getImageSrc()}
                                        alt={hoveredItem}
                                        style={{
                                            width: '15rem', // Increased width
                                            height: '10rem', // Increased height
                                            transition: 'opacity 0.3s ease, transform 0.3s ease',
                                            opacity: 1, // Always visible
                                            transform: 'scale(1)',
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </li>

                <li>
                    <Link to="/about" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, textDecoration: 'none', color: 'black', transition: 'color 0.3s ease' }}
                       onMouseEnter={(e) => e.target.style.color = '#007BFF'}
                       onMouseLeave={(e) => e.target.style.color = 'black'}>
                        ABOUT
                    </Link>
                </li>
                <li>
                    <img src={assets.ai_gen} alt="Antro Transparent Logo" style={{ height: '2.5rem' }} />
                </li>
            </ul>

            {/* User Icons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
                <img src={assets.user} alt="User Icon" style={{ width: '1.5rem' }} />
                <img src={assets.search} alt="Search Icon" style={{ width: '1.5rem' }} />
                <div style={{ position: 'relative' }}>
                    <Link to="/cart">
                        <img src={assets.shopping_cart} alt="Shopping Cart" style={{ width: '1.5rem' }} />
                    </Link>
                    {cartItemCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            backgroundColor: '#ff0000',
                            color: '#fff',
                            borderRadius: '50%',
                            padding: '0.2rem 0.5rem',
                            fontSize: '0.8rem',
                            transform: 'translate(-50%, 50%)'
                        }}>
                            {cartItemCount}
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
