import React from 'react';
import { Link } from 'react-router-dom';

// Import your images from the assets folder
import BusTravelOption from '../assets/BusTravelOption.jpg'; 
import TrainTravelOption from '../assets/TrainTravelOption.jpg';

const TravelOptions = () => {
  return (
    // Main container with a top border, matching the image's style
    <div className="py-12 bg-gray-50 border-t-4 border-cyan-400">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Choose Your Mode of Travel
        </h2>
        
        {/* Responsive grid for the two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Bus Card */}
          <Link to="/bus-tickets" className="block group">
            <div className="relative rounded-xl overflow-hidden shadow-lg transform group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300">
              <img 
                src={BusTravelOption} 
                alt="A fleet of modern buses" 
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white">Bus Tickets</h3>
                  <p className="text-cyan-300 mt-1">Find & Book Now &rarr;</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Train Card */}
          <Link to="/train-tickets" className="block group">
            <div className="relative rounded-xl overflow-hidden shadow-lg transform group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300">
              <img 
                src={TrainTravelOption} 
                alt="A high-speed train at a station" 
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white">Train Tickets</h3>
                  <p className="text-cyan-300 mt-1">Find & Book Now &rarr;</p>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default TravelOptions;