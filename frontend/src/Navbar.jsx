import React from 'react';
import { NavLink } from 'react-router-dom';
import assets from './assets/assets.js'; // Ensure the path is correct

const Navbar = () => {
  return (
    <header className="bg-[#FAF8F5] flex justify-between items-center px-8 py-4">
      {/* Logo */}
      <div>
        <img src={assets.Antro_logo} alt="Antro Logo" className="w-[120px]" />
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="flex space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#FF5A5F] text-lg font-bold'
                  : 'text-black text-lg font-bold hover:text-[#FF5A5F]'
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#FF5A5F] text-lg font-bold'
                  : 'text-black text-lg font-bold hover:text-[#FF5A5F]'
              }
            >
              CATEGORIES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#FF5A5F] text-lg font-bold'
                  : 'text-black text-lg font-bold hover:text-[#FF5A5F]'
              }
            >
              ABOUT
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Icons Section */}
      <div className="flex items-center space-x-6">
        {/* Star Icon */}
        <NavLink to="/ai_gen">
          <span className="text-2xl text-black hover:text-[#FF5A5F]">✦</span>
        </NavLink>

        {/* User Profile Icon */}
        <NavLink to="/login">
          <img
            src={assets.user}
            alt="User"
            className="w-6 h-6 hover:opacity-80"
          />
        </NavLink>

        {/* Search Icon */}
        <NavLink to="/search">
          <img
            src={assets.search}
            alt="Search"
            className="w-6 h-6 hover:opacity-80"
          />
        </NavLink>

        {/* Shopping Cart Icon */}
        <NavLink to="/cart">
          <img
            src={assets.shopping_cart}
            alt="Cart"
            className="w-6 h-6 hover:opacity-80"
          />
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
