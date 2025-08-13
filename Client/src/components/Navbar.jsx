import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { UserCircle } from 'lucide-react';

// Asset Imports
import BusLogo from '../assets/BusLogo.jpg';
import TrainLogo from '../assets/TrainLogo.jpg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userInfo, logout } = useAuth();
    const navigate = useNavigate();

    const closeMobileMenu = () => setIsMenuOpen(false);

    const handleLogout = async () => {
        await logout();
        closeMobileMenu();
        navigate('/login');
    };

    const getFirstName = (name) => {
        if (!name) return '';
        return name.split(' ')[0];
    };

    return (
        <nav className="bg-teal-400 p-2 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                
                {/* --- LEFT SECTION (New Logo + Links) --- */}
                <div className="flex items-center gap-x-3 md:gap-x-5">
                    {/* New Stacked Logo */}
                    <Link to="/" onClick={closeMobileMenu}>
                        <div className="bg-blue-900 text-white font-righteous py-1 px-4 rounded-lg text-center leading-none shadow-lg">
                            <span className="text-2xl font-bold text-shadow">Apna</span><br />
                            <span className="text-3xl text-orange-400 tracking-wider font-bold text-shadow">Ticket</span>
                        </div>
                    </Link>

                    {/* Bus & Train links */}
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

                {/* --- RIGHT SECTION (Buttons) --- */}
                <div>
                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center gap-x-4">
                        <Link to="/post-ticket" className="bg-purple-600 text-white font-bold uppercase text-sm px-4 py-2 rounded-full hover:bg-purple-700">
                            Post Ticket
                        </Link>
                        {userInfo ? (
                            <div className="flex items-center gap-x-4">
                                <button onClick={handleLogout} className="bg-red-500 text-white font-bold uppercase text-sm px-4 py-2 rounded-full hover:bg-red-600">
                                    Logout
                                </button>
                                <div className="flex items-center gap-2">
                                    <UserCircle size={32} className="text-white" />
                                    <span className="text-white font-semibold">{getFirstName(userInfo.name)}</span>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-white text-purple-600 font-bold uppercase text-sm px-4 py-2 rounded-full hover:bg-gray-100">
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

            {/* --- MOBILE MENU DROPDOWN --- */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-teal-500 shadow-xl">
                    {/* ... Mobile menu ka baaki ka code waisa hi rahega ... */}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
