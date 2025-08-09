import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi'; // Import hamburger and close icons

// Asset Imports
import Logo from '../assets/Logo.jpg';
import BusLogo from '../assets/BusLogo.jpg';
import TrainLogo from '../assets/TrainLogo.jpg';

const Navbar = () => {
  // State to manage whether the mobile menu is open or not
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to close the mobile menu, useful for link clicks
  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    // Added 'relative' positioning to be the anchor for the absolute dropdown
    <nav className="bg-teal-400 p-2 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* --- LEFT SECTION (Logo + Bus/Train Links for Desktop) --- */}
        <div className="flex items-center gap-x-3 md:gap-x-5">
          {/* Main Logo (always visible) */}
          <Link to="/" className="bg-white rounded-2xl shadow p-1 flex-shrink-0" onClick={closeMobileMenu}>
            <img
              src={Logo}
              alt="Apna Ticket Logo"
              className="w-28 md:w-32"
            />
          </Link>

          {/* Bus & Train links - Visible on desktop only */}
          <div className="hidden md:flex items-center gap-x-3 md:gap-x-5">
            <Link to="/bus-tickets" className="text-center">
              <div className="bg-white rounded-xl shadow p-2">
                <img src={BusLogo} alt="Bus tickets" className="w-14 h-8 object-contain" />
              </div>
              <span className="text-xs font-semibold text-red-700 mt-1">Bus tickets</span>
            </Link>
            <Link to="/train-tickets" className="text-center">
              <div className="bg-white rounded-xl shadow p-2">
                <img src={TrainLogo} alt="Train tickets" className="w-14 h-8 object-contain" />
              </div>
              <span className="text-xs font-semibold text-black mt-1">Train tickets</span>
            </Link>
          </div>
        </div>

        {/* --- RIGHT SECTION (Action Buttons for Desktop + Hamburger for Mobile) --- */}
        <div>
          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-x-2 md:gap-x-4">
            <Link to="/post-ticket" className="bg-purple-600 text-white font-bold uppercase text-sm px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
              Post Ticket
            </Link>
            <Link to="/login" className="bg-white text-purple-600 font-bold uppercase text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-purple-600 text-white font-bold uppercase text-sm px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              {isMenuOpen ? (
                <HiX className="w-8 h-8" /> // Close Icon
              ) : (
                <HiMenu className="w-8 h-8" /> // Hamburger Icon
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-teal-500 shadow-xl">
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/bus-tickets" className="text-white font-semibold hover:bg-teal-600 p-2 rounded" onClick={closeMobileMenu}>
              Bus Tickets
            </Link>
            <Link to="/train-tickets" className="text-white font-semibold hover:bg-teal-600 p-2 rounded" onClick={closeMobileMenu}>
              Train Tickets
            </Link>
            <hr className="border-teal-400"/>
            <Link to="/post-ticket" className="text-white font-semibold hover:bg-teal-600 p-2 rounded" onClick={closeMobileMenu}>
              Post Ticket
            </Link>
            <Link to="/login" className="text-white font-semibold hover:bg-teal-600 p-2 rounded" onClick={closeMobileMenu}>
              Login
            </Link>
            <Link to="/signup" className="bg-purple-600 text-white font-bold text-center py-2 rounded-md hover:bg-purple-700" onClick={closeMobileMenu}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;