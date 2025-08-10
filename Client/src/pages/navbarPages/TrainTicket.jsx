import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketItem from '../../components/TicketItem'; // Adjust path to your reusable component

const TrainTicket = () => {
  // State for search form
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  // State for holding ticket results and loading status
  const [trainTickets, setTrainTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // A single function to handle fetching tickets based on search criteria
  const fetchTrainTickets = async (searchParams) => {
    setLoading(true);
    try {
      // --- THE ONLY MAJOR CHANGE IS HERE: 'train' instead of 'bus' ---
      const params = new URLSearchParams({ travelType: 'train', ...searchParams });
      
      for (const [key, value] of params.entries()) {
        if (!value) {
          params.delete(key);
        }
      }

      const url = `/api/v1/tickets?${params.toString()}`;
      const { data } = await axios.get(url);
      setTrainTickets(data.data);
    } catch (error) {
      console.error("Failed to fetch train tickets:", error);
      alert("Could not fetch train tickets. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch ALL train tickets when the page first loads
  useEffect(() => {
    fetchTrainTickets({}); // Calling with empty params gets all tickets where travelType is 'train'
  }, []);

  // handleSearch now uses our fetchTrainTickets function with form data
  const handleSearch = (e) => {
    e.preventDefault();
    fetchTrainTickets({ from, to, journeyDate: date });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800">Search for Train Tickets</h1>

      {/* Search Form */}
      <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* FROM input */}
          <div className="md:col-span-1">
            <label htmlFor="from" className="text-sm font-semibold text-gray-600 block">FROM</label>
            <input type="text" id="from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="New Delhi (NDLS)" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          {/* TO input */}
          <div className="md:col-span-1">
            <label htmlFor="to" className="text-sm font-semibold text-gray-600 block">TO</label>
            <input type="text" id="to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Mumbai Central (MMCT)" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          {/* DATE input */}
          <div className="md:col-span-1">
            <label htmlFor="date" className="text-sm font-semibold text-gray-600 block">DATE</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          {/* SUBMIT button */}
          <div className="md:col-span-1">
            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-md hover:bg-gray-900 transition-colors">
              Search Trains
            </button>
          </div>
        </form>
      </div>

      {/* --- DYNAMIC SEARCH RESULTS --- */}
      <div className="mt-10">
        {loading ? (
          <p className="text-center text-gray-500">Searching for train tickets...</p>
        ) : (
          <div>
            {trainTickets.length > 0 ? (
              trainTickets.map(ticket => (
                <TicketItem key={ticket._id} ticket={ticket} />
              ))
            ) : (
              <p className="text-center text-gray-500">No matching train tickets found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainTicket;