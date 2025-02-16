import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState('livingroom');
  const { getCartItemCount, setShowSearch } = useContext(ShopContext);
  const cartItemCount = getCartItemCount();
  const dropdownRef = useRef(null);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

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
    setHoveredItem('livingroom');
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
        return assets.Livingroom;
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(true);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center relative z-50">
      <Link to="/" className="flex items-center">
        <img src={assets.Antro_transparent} alt="Antro Logo" className="h-6" />
      </Link>

      <div className="hidden md:flex space-x-4">
        <Link to="/" className="text-black hover:text-blue-500 font-bold">HOME</Link>
        <div className="relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="text-black hover:text-blue-500 font-bold">CATEGORIES</button>
          {isDropdownVisible && (
            <div className="absolute top-full left-0 bg-yellow-200 shadow-md p-4 rounded-lg w-64 z-50">
              <button onClick={closeDropdown} className="absolute top-2 right-2 text-red-500">&times;</button>
              <div className="flex space-x-4">
                <ul className="space-y-2">
                  {['livingroom', 'bedroom', 'office', 'diningroom'].map((item) => (
                    <li key={item} className="hover:bg-yellow-300 p-2 rounded-lg">
                      <Link to={`/${item}`} className="block text-black hover:text-blue-500" onMouseEnter={() => handleMouseEnter(item)} onMouseLeave={handleMouseLeave}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-center">
                  <img src={getImageSrc()} alt={hoveredItem} className="w-40 h-24 object-cover rounded-lg transition-transform transform scale-100 hover:scale-105" />
                </div>
              </div>
            </div>
          )}
        </div>
        <Link to="/about" className="text-black hover:text-blue-500 font-bold">ABOUT</Link>
        {user && user.role === 'admin' && (
          <Link to="/admin" className="text-black hover:text-blue-500 font-bold">ADMIN</Link>
        )}
      </div>

      <div className="flex space-x-4 items-center">
        {token ? (
          <img src={assets.user} alt="User Icon" className="w-6 cursor-pointer" onClick={handleProfileClick} />
        ) : (
          <Link to="/auth">
            <img src={assets.user} alt="User Icon" className="w-6" />
          </Link>
        )}
        <img src={assets.search} alt="Search Icon" className="w-6 cursor-pointer" onClick={handleSearchToggle} />
        <div className="relative">
          <Link to="/cart">
            <img src={assets.shopping_cart} alt="Shopping Cart" className="w-6" />
          </Link>
          {cartItemCount > 0 && (
            <span className="absolute -bottom-2 -left-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartItemCount}</span>
          )}
        </div>
        <button onClick={toggleMobileMenu} className="md:hidden text-2xl">&#9776;</button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md p-4 space-y-4 z-50">
          <Link to="/" className="block text-black hover:text-blue-500 font-bold">HOME</Link>
          <button onClick={toggleDropdown} className="text-black hover:text-blue-500 font-bold">CATEGORIES</button>
          {isDropdownVisible && (
            <div className="bg-yellow-200 shadow-md p-4 rounded-lg w-full space-y-2">
              <button onClick={closeDropdown} className="text-red-500">&times;</button>
              <ul className="space-y-2">
                {['livingroom', 'bedroom', 'office', 'diningroom'].map((item) => (
                  <li key={item} className="hover:bg-yellow-300 p-2 rounded-lg">
                    <Link to={`/${item}`} className="block text-black hover:text-blue-500" onMouseEnter={() => handleMouseEnter(item)} onMouseLeave={handleMouseLeave}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-center">
                <img src={getImageSrc()} alt={hoveredItem} className="w-40 h-24 object-cover rounded-lg transition-transform transform scale-100 hover:scale-105" />
              </div>
            </div>
          )}
          <Link to="/about" className="block text-black hover:text-blue-500 font-bold">ABOUT</Link>
          {user && user.role === 'admin' && (
            <Link to="/admin" className="block text-black hover:text-blue-500 font-bold">ADMIN</Link>
          )}
          {token ? (
            <img src={assets.user} alt="User Icon" className="w-6 cursor-pointer" onClick={handleProfileClick} />
          ) : (
            <Link to="/auth">
              <img src={assets.user} alt="User Icon" className="w-6" />
            </Link>
          )}
          <img src={assets.search} alt="Search Icon" className="w-6 cursor-pointer" onClick={handleSearchToggle} />
          <div className="relative">
            <Link to="/cart">
              <img src={assets.shopping_cart} alt="Shopping Cart" className="w-6" />
            </Link>
            {cartItemCount > 0 && (
              <span className="absolute -bottom-2 -left-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartItemCount}</span>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
