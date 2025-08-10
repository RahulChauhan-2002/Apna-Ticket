import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- Import your static assets and components ---
import HomeLogo1 from "../assets/HomeLogo1.png";
import TravelOptions from './TravelOptions';

// --- TicketItem Component (from previous version) ---
// Isko alag se rakha hai taaki code saaf rahe
const TicketItem = ({ ticket }) => {
    const navigate = useNavigate();

    const handleBookClick = () => {
        if (ticket.travelType === 'bus') {
            navigate('/bus-tickets');
        } else if (ticket.travelType === 'train') {
            navigate('/train-tickets');
        }
    };
    
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


// --- Main Home Component ---
const Home = () => {
    // State aur data fetching logic yahan rakha hai
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const { data } = await axios.get('/api/v1/tickets');
                setTickets(data.data);
            } catch (error) {
                console.error("Failed to fetch tickets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return (
        // Aapka purana main container
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

            {/* --- Ticket Offers Section (Ab Dynamic hai) --- */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">Recently Posted Tickets</h2>
                
                {loading ? (
                    <p className="text-center">Loading tickets...</p>
                ) : (
                    <div>
                        {tickets.length > 0 ? (
                            tickets.map(ticket => (
                                <TicketItem key={ticket._id} ticket={ticket} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No tickets posted yet.</p>
                        )}
                    </div>
                )}
            </div>
            
            {/* --- TravelOptions Section --- */}
            <TravelOptions /> 

        </div>
    );
};

export default Home;
