import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TicketItem from '../../components/TicketItem'; // Reusable component ko import karein

const BusTicket = () => {
    // Search form ke liye state
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');

    // Ticket results aur loading ke liye state
    const [busTickets, setBusTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    // Scrolling ke liye hooks
    const location = useLocation();
    const ticketRefs = useRef({});

    // Tickets fetch karne ke liye function
    const fetchBusTickets = async (searchParams) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ travelType: 'bus', ...searchParams });
            for (const [key, value] of params.entries()) {
                if (!value) {
                    params.delete(key);
                }
            }
            const url = `/api/v1/tickets?${params.toString()}`;
            const { data } = await axios.get(url);
            setBusTickets(data.data);
        } catch (error) {
            console.error("Failed to fetch bus tickets:", error);
        } finally {
            setLoading(false);
        }
    };

    // Page load par saare bus tickets fetch karein
    useEffect(() => {
        fetchBusTickets({});
    }, []);

    // Scroll-to-ticket logic
    useEffect(() => {
        const scrollToId = location.state?.scrollToId;
        if (scrollToId && ticketRefs.current[scrollToId]) {
            setTimeout(() => {
                ticketRefs.current[scrollToId].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }, 100);
        }
    }, [busTickets, location.state]);

    // Search handle karne ke liye function
    const handleSearch = (e) => {
        e.preventDefault();
        fetchBusTickets({ from, to, journeyDate: date });
    };

    // UI ko turant update karne ke liye function
    const handleStatusChange = (ticketId, newStatus) => {
        setBusTickets(currentTickets => 
            currentTickets.map(t => 
                t._id === ticketId ? { ...t, status: newStatus } : t
            )
        );
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-10">
            <h1 className="text-4xl font-bold text-center text-gray-800">Search for Bus Tickets</h1>

            {/* Search Form */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-1">
                        <label htmlFor="from" className="text-sm font-semibold text-gray-600 block">FROM</label>
                        <input type="text" id="from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Leaving from" className="w-full px-4 py-2 mt-1 border rounded-md" />
                    </div>
                    <div className="md:col-span-1">
                        <label htmlFor="to" className="text-sm font-semibold text-gray-600 block">TO</label>
                        <input type="text" id="to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Going to" className="w-full px-4 py-2 mt-1 border rounded-md" />
                    </div>
                    <div className="md:col-span-1">
                        <label htmlFor="date" className="text-sm font-semibold text-gray-600 block">DATE</label>
                        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md" />
                    </div>
                    <div className="md:col-span-1">
                        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700">
                            Search Buses
                        </button>
                    </div>
                </form>
            </div>

            {/* Dynamic Search Results */}
            <div className="mt-10">
                {loading ? (
                    <p className="text-center text-gray-500">Searching for bus tickets...</p>
                ) : (
                    <div>
                        {busTickets.length > 0 ? (
                            busTickets.map(ticket => (
                                <TicketItem 
                                    key={ticket._id} 
                                    ticket={ticket} 
                                    ref={el => ticketRefs.current[ticket._id] = el}
                                    showOwnerControls={true}
                                    onStatusChange={handleStatusChange}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No matching bus tickets found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusTicket;