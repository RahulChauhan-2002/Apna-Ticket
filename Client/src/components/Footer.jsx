import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-8">
        
        {/* Column 1: About */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Apna Ticket</h2>
          <p className="text-sm">
            Your trusted platform for discovering, buying, and selling bus and train tickets across India. Seamlessly connect with travelers and never let a seat go empty.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-slate-700 rounded-full hover:bg-purple-600 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-slate-700 rounded-full hover:bg-purple-600 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-slate-700 rounded-full hover:bg-purple-600 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-slate-700 rounded-full hover:bg-purple-600 transition-colors">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/bus-tickets" className="hover:text-white hover:underline">Bus Tickets</Link></li>
            <li><Link to="/train-tickets" className="hover:text-white hover:underline">Train Tickets</Link></li>
            <li><Link to="/post-ticket" className="hover:text-white hover:underline">Post a Ticket</Link></li>
            <li><Link to="/login" className="hover:text-white hover:underline">Login</Link></li>
            <li><Link to="/signup" className="hover:text-white hover:underline">Sign Up</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Contact Info</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FiPhone className="text-purple-400" />
              <span>+91 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <FiMail className="text-purple-400" />
              <span>support@apnaticket.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FiMapPin className="text-purple-400" />
              <span>Ghaziabad, Uttar Pradesh, India</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Newsletter</h3>
          <p className="text-sm">Stay updated with our latest deals and exclusive offers.</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Your email address"
              className="w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button 
              type="submit" 
              className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-r-md hover:bg-purple-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto py-4 px-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2025 Apna Ticket. All rights reserved.</p>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white hover:underline">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;