import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeLogo1 from "../assets/HomeLogo1.png";
import TravelOptions from './TravelOptions';
// Make sure you have created and are importing the reusable TicketItem component
import TicketItem from './TicketItem'; 

const Home = () => {
    const [allTickets, setAllTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllTickets = async () => {
            try {
                setLoading(true);
                // This URL fetches ALL tickets, with no filters.
                const { data } = await axios.get('/api/v1/tickets');
                setAllTickets(data.data);
            } catch (error) {
                console.error("Failed to fetch all tickets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllTickets();
    }, []);

    return (
        <div className="flex flex-col gap-y-12"> 
            
            {/* --- Hero Banner (No change) --- */}
            <div
                className="relative w-full h-64 md:h-80 rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${HomeLogo1})` }}
            >
                <div className="absolute inset-0 bg-black/50 rounded-xl flex flex-col justify-center items-center text-center p-4">
                    <h1 className="text-white text-3xl md:text-5xl font-bold">Apna Ticket</h1>
                    <p className="text-white text-lg md:text-xl mt-2">Your one-stop platform for buying and selling tickets.</p>
                </div>
            </div>

            {/* --- All Posted Tickets Section --- */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">All Available Tickets</h2>
                
                {loading ? (
                    <p className="text-center text-gray-500">Loading tickets...</p>
                ) : (
                    <div>
                        {allTickets.length > 0 ? (
                            allTickets.map(ticket => (
                                <TicketItem key={ticket._id} ticket={ticket} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No tickets posted yet. Be the first!</p>
                        )}
                    </div>
                )}
            </div>
            
            {/* --- TravelOptions Section (No change) --- */}
            <TravelOptions /> 

        </div>
    );
};

// --- THIS LINE IS NOW CORRECTED ---
export default Home;