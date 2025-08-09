import React from 'react';
import { Link } from 'react-router-dom';
import HomeLogo1 from "../assets/HomeLogo1.png";
import TravelOptions from './TravelOptions';

const Home = () => {
  return (
    // The main container manages the spacing between sections
    <div className="flex flex-col gap-y-12"> 
      
      {/* --- Hero Banner --- */}
      <div
        className="relative w-full h-64 md:h-80 rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${HomeLogo1})` }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-xl flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold">Apna Ticket</h1>
          <p className="text-white text-lg md:text-xl mt-2">Your one-stop platform for buying and selling tickets.</p>
        </div>
      </div>

      {/* --- Ticket Offers Section --- */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Recently Posted Tickets</h2>

        {/* Train Ticket Offer */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-teal-600 mb-4 uppercase">
            TRAIN
          </h3>
          {/* CORRECTED DIV BELOW */}
          <div className="flex items-center justify-center md:justify-between flex-wrap gap-4">
            <div className="flex items-center gap-x-4">
              <span className="bg-lime-500 text-white font-bold text-lg py-2 px-4 rounded-md">
                GKP
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <span className="bg-lime-500 text-white font-bold text-lg py-2 px-4 rounded-md">
                DELHI
              </span>
            </div>
            <span className="bg-cyan-200 text-cyan-800 font-semibold py-2 px-4 rounded-md">
              20/01/2026
            </span>
            {/* Wrapper div added for button centering */}
            <div className="w-full md:w-auto flex justify-center">
              <Link to="/book-ticket">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                  BOOK
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bus Ticket Offer */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-teal-600 mb-4 uppercase">
            BUS
          </h3>
          {/* CORRECTED DIV BELOW */}
          <div className="flex items-center justify-center md:justify-between flex-wrap gap-4">
            <div className="flex items-center gap-x-4">
              <span className="bg-lime-500 text-white font-bold text-lg py-2 px-4 rounded-md">
                GKP
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <span className="bg-lime-500 text-white font-bold text-lg py-2 px-4 rounded-md">
                DELHI
              </span>
            </div>
            <span className="bg-cyan-200 text-cyan-800 font-semibold py-2 px-4 rounded-md">
              16/01/2026
            </span>
            {/* Wrapper div added for button centering */}
            <div className="w-full md:w-auto flex justify-center">
              <Link to="/book-ticket">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                  BOOK
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- TravelOptions Section --- */}
      <TravelOptions /> 

    </div>
  );
};

export default Home;