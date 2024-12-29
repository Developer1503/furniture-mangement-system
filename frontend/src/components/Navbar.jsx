import React, { useState } from 'react';
import { assets } from '../assets/assets'; // Ensure this path is correct

const Navbar = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [hoveredItem, setHoveredItem] = useState('livingroom'); // Set default to 'livingroom'

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
            <div style={{ display: 'flex', alignItems: 'center' }}>
                
                <img src={assets.Antro_transparent} alt="Antro Logo" style={{ height: '1.5rem' }} />
            </div>

            {/* Navigation Links */}
            <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
                <li>
                    <a href="#home" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, textDecoration: 'none', color: 'black', transition: 'color 0.3s ease' }}
                       onMouseEnter={(e) => e.target.style.color = '#007BFF'}
                       onMouseLeave={(e) => e.target.style.color = 'black'}>
                        HOME
                    </a>
                </li>

                {/* Categories with Dropdown */}
                <li style={{ position: 'relative' }}>
                    <a
                        href="#categories"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default navigation
                            toggleDropdown();
                        }}
                        style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, cursor: 'pointer', textDecoration: 'none', color: 'black', transition: 'color 0.3s ease' }}
                        onMouseEnter={(e) => e.target.style.color = '#007BFF'}
                        onMouseLeave={(e) => e.target.style.color = 'black'}>
                        CATEGORIES
                    </a>
                    {isDropdownVisible && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            listStyle: 'none',
                            margin: 0,
                            padding: '0.5rem',
                            borderRadius: '4px',
                            zIndex: 10,
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
                                    <li
                                        style={{ padding: '0.5rem 1rem' }}
                                        onMouseEnter={() => handleMouseEnter('livingroom')}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <a href="#livingroom" style={{ textDecoration: 'none', color: 'black' }}>Livingroom</a>
                                    </li>
                                    <li
                                        style={{ padding: '0.5rem 1rem' }}
                                        onMouseEnter={() => handleMouseEnter('bedroom')}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <a href="#bedroom" style={{ textDecoration: 'none', color: 'black' }}>Bedroom</a>
                                    </li>
                                    <li
                                        style={{ padding: '0.5rem 1rem' }}
                                        onMouseEnter={() => handleMouseEnter('office')}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <a href="#office" style={{ textDecoration: 'none', color: 'black' }}>Office</a>
                                    </li>
                                    <li
                                        style={{ padding: '0.5rem 1rem' }}
                                        onMouseEnter={() => handleMouseEnter('diningroom')}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <a href="#diningroom" style={{ textDecoration: 'none', color: 'black' }}>Diningroom</a>
                                    </li>
                                </ul>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                                    <img
                                        src={getImageSrc()}
                                        alt={hoveredItem}
                                        style={{
                                            width: '15rem', // Increased width
                                            height: '10rem', // Increased height
                                            transition: 'opacity 0.3s ease',
                                            opacity: 1, // Always visible
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </li>

                <li>
                    <a href="#about" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, textDecoration: 'none', color: 'black', transition: 'color 0.3s ease' }}
                       onMouseEnter={(e) => e.target.style.color = '#007BFF'}
                       onMouseLeave={(e) => e.target.style.color = 'black'}>
                        ABOUT
                    </a>
                </li>
                <li>
                    <img src={assets.ai_gen} alt="Antro Transparent Logo" style={{ height: '2.5rem' }} />
                </li>
            </ul>

            {/* User Icons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
                <img src={assets.user} alt="User  Icon" style={{ width: '1.5rem' }} />
                <img src={assets.search} alt="Search Icon" style={{ width: '1.5rem' }} />
                <img src={assets.shopping_cart} alt="Shopping Cart" style={{ width: '1.5rem' }} />
            </div>
        </nav>
    );
};

export default Navbar;