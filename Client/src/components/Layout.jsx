import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      {/* The main content area will grow to fill available space */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;