import React from 'react';
import { useNavigate } from 'react-router-dom';

const TicketItem = ({ ticket }) => {
    const navigate = useNavigate();

    // In the future, you might want to navigate to a detailed page
    // like `/tickets/${ticket._id}`
    const handleBookClick = () => {
        if (ticket.travelType === 'bus') {
            navigate('/book-ticket'); // Or a specific booking page
        } else if (ticket.travelType === 'train') {
            navigate('/book-ticket');
        }
    };
    
    // Format the date to dd/mm/yyyy
    const formattedDate = new Date(ticket.journeyDate).toLocaleDateString('en-GB');

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <h3 className="text-xl font-semibold text-teal-600 mb-4 uppercase">
                {ticket.travelType}
            </h3>
            <div className="flex items-center justify-center md:justify-between flex-wrap gap-4">
                <div className="flex items-center gap-x-4">
                    <span className="bg-lime-500 text-white font-bold text-lg py-2 px-4 rounded-md">
                        {ticket.from}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    <span className="bg-lime-500 text-white font-bold text-lg py-2 px-4 rounded-md">
                        {ticket.to}
                    </span>
                </div>
                <span className="bg-cyan-200 text-cyan-800 font-semibold py-2 px-4 rounded-md">
                    {formattedDate}
                </span>
                <div className="w-full md:w-auto flex justify-center">
                    <button 
                        onClick={handleBookClick}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors"
                    >
                        BOOK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketItem;