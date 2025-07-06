import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState('livingroom');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartItemCount, setShowSearch } = useContext(ShopContext);
  const cartItemCount = getCartItemCount();
  const dropdownRef = useRef(null);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // Categories data for better maintainability
  const categories = [
    { id: 'livingroom', name: 'Living Room', image: assets.Livingroom },
    { id: 'bedroom', name: 'Bedroom', image: assets.Bedroom },
    { id: 'office', name: 'Office', image: assets.office },
    { id: 'diningroom', name: 'Dining Room', image: assets.Diningroom }
  ];

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

  const getCurrentImage = () => {
    const category = categories.find(cat => cat.id === hoveredItem);
    return category ? category.image : assets.Livingroom;
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/${categoryId}`);
    closeDropdown();
    setIsMobileMenuOpen(false);
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

  // Enhanced dropdown with better colors and mobile optimization
  const DropdownMenu = ({ isMobile = false }) => (
    <div className={`
      ${isMobile 
        ? 'w-full mt-3' 
        : 'absolute top-full left-0 w-96 mt-2'
      } 
      bg-white border border-gray-200 shadow-xl rounded-xl p-4 z-50 
      transform transition-all duration-300 ease-in-out
      ${isDropdownVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
      ${isMobile ? 'block' : ''}
    `}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 text-lg">Shop by Category</h3>
        <button 
          onClick={closeDropdown} 
          className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          ×
        </button>
      </div>
      
      <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'space-x-4'}`}>
        <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li 
                key={category.id} 
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 p-3 rounded-lg transition-all duration-200 cursor-pointer group"
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-600 font-medium group-hover:translate-x-1 transition-transform"
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-600 transition-colors"></span>
                    {category.name}
                  </span>
                  <svg 
                    className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {!isMobile && (
          <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
            <img 
              src={getCurrentImage()} 
              alt={hoveredItem} 
              className="w-40 h-24 object-cover rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md" 
            />
          </div>
        )}
      </div>
      
      {/* Mobile image display */}
      {isMobile && (
        <div className="mt-4 flex justify-center">
          <img 
            src={getCurrentImage()} 
            alt={hoveredItem} 
            className="w-32 h-20 object-cover rounded-lg shadow-md" 
          />
        </div>
      )}
    </div>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={assets.Antro_transparent} alt="Antro Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 relative group"
            >
              HOME
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={toggleDropdown} 
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 flex items-center relative group"
              >
                CATEGORIES
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${isDropdownVisible ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <DropdownMenu />
            </div>
            
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 relative group"
            >
              ABOUT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {user && user.role === 'admin' && (
              <Link 
                to="/admin" 
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 relative group"
              >
                ADMIN
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
            
            <Link 
              to="/ai_gen" 
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 flex items-center"
            >
              <img src={assets.ai_gen} alt="AI Gen" className="h-6 w-6" />
            </Link>
          </div>

          {/* Icons and Mobile Menu Button */}
          <div className="flex space-x-4 items-center">
            {token ? (
              <button
                onClick={handleProfileClick}
                className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <img src={assets.user} alt="User Icon" className="w-5 h-5" />
              </button>
            ) : (
              <Link 
                to="/auth"
                className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <img src={assets.user} alt="User Icon" className="w-5 h-5" />
              </Link>
            )}
            
            <button
              onClick={handleSearchToggle}
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <img src={assets.search} alt="Search Icon" className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <Link 
                to="/cart"
                className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all duration-200 relative"
              >
                <img src={assets.shopping_cart} alt="Shopping Cart" className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
            
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 py-4 space-y-4">
          <Link 
            to="/" 
            className="block text-gray-700 hover:text-blue-600 font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            HOME
          </Link>
          
          <div>
            <button 
              onClick={toggleDropdown} 
              className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              <span>CATEGORIES</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownVisible ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownVisible && <DropdownMenu isMobile={true} />}
          </div>
          
          <Link 
            to="/about" 
            className="block text-gray-700 hover:text-blue-600 font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ABOUT
          </Link>
          
          {user && user.role === 'admin' && (
            <Link 
              to="/admin" 
              className="block text-gray-700 hover:text-blue-600 font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ADMIN
            </Link>
          )}
          
          <Link 
            to="/ai_gen" 
            className="flex items-center text-gray-700 hover:text-blue-600 font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img src={assets.ai_gen} alt="AI Gen" className="h-5 w-5 mr-2" />
            AI GENERATOR
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;