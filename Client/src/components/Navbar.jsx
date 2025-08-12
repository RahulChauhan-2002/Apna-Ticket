import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi'; // Hamburger icons
import { useAuth } from '../context/AuthContext'; // Auth logic import karein
import { UserCircle } from 'lucide-react'; // Profile icon import karein

// Asset Imports
import Logo from '../assets/Logo.jpg';
import BusLogo from '../assets/BusLogo.jpg';
import TrainLogo from '../assets/TrainLogo.jpg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userInfo, logout } = useAuth(); // Auth state aur function lein
    const navigate = useNavigate();

    const closeMobileMenu = () => setIsMenuOpen(false);

    const handleLogout = async () => {
        await logout();
        closeMobileMenu(); // Mobile menu band karein
        navigate('/login'); // Login page par bhej dein
    };

    // User ka pehla naam nikalne ke liye function
    const getFirstName = (name) => {
        if (!name) return '';
        return name.split(' ')[0];
    };

    return (
        <nav className="bg-teal-400 p-2 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                
                {/* --- LEFT SECTION --- */}
                <div className="flex items-center gap-x-3 md:gap-x-5">
                    <Link to="/" className="bg-white rounded-2xl shadow p-1 flex-shrink-0" onClick={closeMobileMenu}>
                        <img src={Logo} alt="Apna Ticket Logo" className="w-28 md:w-32" />
                    </Link>
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

                {/* --- RIGHT SECTION --- */}
                <div>
                    {/* Desktop Action Buttons (Conditional) */}
                    <div className="hidden md:flex items-center gap-x-4">
                        <Link to="/post-ticket" className="bg-purple-600 text-white font-bold uppercase text-sm px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
                            Post Ticket
                        </Link>
                        {userInfo ? (
                            <div className="flex items-center gap-x-4">
                                {/* Logout Button */}
                                <button onClick={handleLogout} className="bg-red-500 text-white font-bold uppercase text-sm px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
                                    Logout
                                </button>
                                {/* Profile Icon aur Naam */}
                                <div className="flex items-center gap-2">
                                    <UserCircle size={32} className="text-white" />
                                    <span className="text-white font-semibold">{getFirstName(userInfo.name)}</span>
                                </div>
                            </div>
                        ) : (
                            // Jab user login nahin hai, to sirf Login button dikhayein
                            <Link to="/login" className="bg-white text-purple-600 font-bold uppercase text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                            {isMenuOpen ? <HiX className="w-8 h-8" /> : <HiMenu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MOBILE MENU DROPDOWN (Conditional) --- */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-teal-500 shadow-xl">
                    <div className="flex flex-col space-y-4 p-4">
                        {/* ... baaki ke mobile links ... */}
                        
                        {userInfo ? (
                            <>
                                <button onClick={handleLogout} className="bg-red-500 text-white font-bold text-center py-2 rounded-md hover:bg-red-600">
                                    Logout
                                </button>
                                <div className="flex items-center gap-3 p-2 border-t border-teal-400 mt-2 pt-4">
                                    <UserCircle size={28} className="text-white" />
                                    <span className="text-white font-semibold">Hi, {getFirstName(userInfo.name)}</span>
                                </div>
                            </>
                        ) : (
                            // Jab user login nahin hai, to sirf Login button dikhayein
                            <Link to="/login" className="bg-white text-purple-600 font-bold text-center py-2 rounded-md hover:bg-gray-100" onClick={closeMobileMenu}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;