import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState('livingroom');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartItemCount, setShowSearch } = useContext(ShopContext);
  const cartItemCount = getCartItemCount();
  const dropdownRef = useRef(null);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();

  // Categories data — route values must match App.jsx exactly
  const categories = [
    { id: 'livingroom', route: '/LivingRoom', name: 'Living Room', image: assets.Livingroom },
    { id: 'bedroom', route: '/Bedroom', name: 'Bedroom', image: assets.Bedroom },
    { id: 'office', route: '/office', name: 'Office', image: assets.office },
    { id: 'diningroom', route: '/Diningroom', name: 'Dining Room', image: assets.Diningroom }
  ];

  // Scroll-aware sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleCategoryClick = (route) => {
    navigate(route);
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownVisible(false);
  }, [location.pathname]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if a nav link is active
  const isActive = (path) => location.pathname === path;

  // Dropdown menu component
  const DropdownMenu = ({ isMobile = false }) => (
    <div
      className={`
        ${isMobile
          ? 'w-full mt-3'
          : 'absolute top-full left-0 w-[480px] mt-3'
        } 
        bg-white border border-stone-200 rounded-2xl p-5 z-50 
        transform transition-all duration-300 ease-in-out
        ${isDropdownVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
        ${isMobile ? 'block' : ''}
      `}
      style={{
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12), 0 4px 20px rgba(0, 0, 0, 0.06)',
        ...(!isMobile ? { width: '480px', minWidth: '480px' } : {})
      }}
    >
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-stone-100">
        <h3 className="font-bold text-stone-800 text-base tracking-wide uppercase">Shop by Category</h3>
        <button
          onClick={closeDropdown}
          className="text-stone-400 hover:text-stone-700 text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-all duration-200"
        >
          ×
        </button>
      </div>

      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'gap-5'}`}>
        <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li
                key={category.id}
                className="rounded-xl transition-all duration-200 cursor-pointer group"
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleCategoryClick(category.route)}
                  className="flex items-center justify-between w-full text-left text-stone-600 hover:text-amber-800 font-medium p-3 rounded-xl hover:bg-amber-50 group-hover:translate-x-1 transition-all duration-200"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-amber-400 rounded-full group-hover:bg-amber-600 group-hover:scale-125 transition-all duration-200"></span>
                    {category.name}
                  </span>
                  <svg
                    className="w-4 h-4 text-stone-300 group-hover:text-amber-600 transition-all duration-200 group-hover:translate-x-0.5"
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
          <div className="flex items-center justify-center bg-gradient-to-br from-stone-50 to-amber-50 rounded-xl p-3 min-w-[160px]">
            <img
              src={getCurrentImage()}
              alt={hoveredItem}
              className="w-36 h-24 object-cover rounded-lg transition-all duration-500 transform hover:scale-105"
              style={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}
            />
          </div>
        )}
      </div>

      {isMobile && (
        <div className="mt-4 flex justify-center">
          <img
            src={getCurrentImage()}
            alt={hoveredItem}
            className="w-full max-w-[200px] h-28 object-cover rounded-xl"
            style={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}
          />
        </div>
      )}
    </div>
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-[#fdf5cf]'
        }`}
      style={{
        borderBottom: isScrolled ? '1px solid rgba(214, 200, 181, 0.3)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={assets.Antro_transparent}
              alt="Antro Logo"
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 relative group rounded-lg ${isActive('/')
                ? 'text-amber-800'
                : 'text-stone-600 hover:text-amber-800'
                }`}
            >
              HOME
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-amber-700 rounded-full transition-all duration-300 ${isActive('/') ? 'w-6' : 'w-0 group-hover:w-6'
                }`}></span>
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 flex items-center relative group rounded-lg ${isDropdownVisible || ['/LivingRoom', '/Bedroom', '/office', '/Diningroom'].includes(location.pathname)
                  ? 'text-amber-800'
                  : 'text-stone-600 hover:text-amber-800'
                  }`}
              >
                CATEGORIES
                <svg
                  className={`ml-1.5 w-3.5 h-3.5 transition-transform duration-300 ${isDropdownVisible ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-amber-700 rounded-full transition-all duration-300 ${['/LivingRoom', '/Bedroom', '/office', '/Diningroom'].includes(location.pathname) ? 'w-6' : 'w-0 group-hover:w-6'
                  }`}></span>
              </button>
              <DropdownMenu />
            </div>

            <Link
              to="/About"
              className={`px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 relative group rounded-lg ${isActive('/About')
                ? 'text-amber-800'
                : 'text-stone-600 hover:text-amber-800'
                }`}
            >
              ABOUT
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-amber-700 rounded-full transition-all duration-300 ${isActive('/About') ? 'w-6' : 'w-0 group-hover:w-6'
                }`}></span>
            </Link>

            {user && user.role === 'admin' && (
              <Link
                to="/admin"
                className={`px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 relative group rounded-lg ${isActive('/admin')
                  ? 'text-amber-800'
                  : 'text-stone-600 hover:text-amber-800'
                  }`}
              >
                ADMIN
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-amber-700 rounded-full transition-all duration-300 ${isActive('/admin') ? 'w-6' : 'w-0 group-hover:w-6'
                  }`}></span>
              </Link>
            )}

            <Link
              to="/ai_gen"
              className="ml-1 p-2 text-stone-500 hover:text-amber-700 transition-all duration-200 rounded-lg hover:bg-amber-50"
              title="AI Generator"
            >
              <img src={assets.ai_gen} alt="AI Gen" className="h-5 w-5" />
            </Link>
          </div>

          {/* Icons and Mobile Menu Button */}
          <div className="flex items-center space-x-1">
            {token ? (
              <button
                onClick={handleProfileClick}
                className="p-2.5 text-stone-600 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-all duration-200"
                title="Profile"
              >
                <img src={assets.user} alt="User Icon" className="w-5 h-5" />
              </button>
            ) : (
              <Link
                to="/auth"
                className="p-2.5 text-stone-600 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-all duration-200"
                title="Sign In"
              >
                <img src={assets.user} alt="User Icon" className="w-5 h-5" />
              </Link>
            )}

            <button
              onClick={handleSearchToggle}
              className="p-2.5 text-stone-600 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-all duration-200"
              title="Search"
            >
              <img src={assets.search} alt="Search Icon" className="w-5 h-5" />
            </button>

            <div className="relative">
              <Link
                to="/cart"
                className="p-2.5 text-stone-600 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-all duration-200 relative block"
                title="Cart"
              >
                <img src={assets.shopping_cart} alt="Shopping Cart" className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-amber-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-md">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2.5 text-stone-600 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-all duration-200 ml-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div
        className={`md:hidden bg-white/98 backdrop-blur-sm border-t border-stone-100 transition-all duration-400 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 py-4 space-y-1">
          <Link
            to="/"
            className={`block font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm tracking-wide ${isActive('/')
              ? 'text-amber-800 bg-amber-50'
              : 'text-stone-600 hover:text-amber-800 hover:bg-amber-50'
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            HOME
          </Link>

          <div>
            <button
              onClick={toggleDropdown}
              className={`flex items-center justify-between w-full font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm tracking-wide ${isDropdownVisible
                ? 'text-amber-800 bg-amber-50'
                : 'text-stone-600 hover:text-amber-800 hover:bg-amber-50'
                }`}
            >
              <span>CATEGORIES</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isDropdownVisible ? 'rotate-180' : ''}`}
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
            to="/About"
            className={`block font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm tracking-wide ${isActive('/About')
              ? 'text-amber-800 bg-amber-50'
              : 'text-stone-600 hover:text-amber-800 hover:bg-amber-50'
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ABOUT
          </Link>

          {user && user.role === 'admin' && (
            <Link
              to="/admin"
              className={`block font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm tracking-wide ${isActive('/admin')
                ? 'text-amber-800 bg-amber-50'
                : 'text-stone-600 hover:text-amber-800 hover:bg-amber-50'
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ADMIN
            </Link>
          )}

          <Link
            to="/ai_gen"
            className="flex items-center text-stone-600 hover:text-amber-800 font-semibold py-3 px-4 rounded-xl hover:bg-amber-50 transition-all duration-200 text-sm tracking-wide"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img src={assets.ai_gen} alt="AI Gen" className="h-5 w-5 mr-3" />
            AI GENERATOR
          </Link>

          {/* Mobile divider */}
          <div className="border-t border-stone-100 my-2"></div>

          {/* Quick links in mobile */}
          <div className="flex items-center gap-4 px-4 py-2">
            {!token && (
              <Link
                to="/auth"
                className="text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;