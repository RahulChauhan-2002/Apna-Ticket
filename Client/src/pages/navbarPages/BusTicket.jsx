import React, { useState } from 'react';

const BusTicket = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Logic to search for buses (e.g., API call)
    console.log('Searching for buses:', { from, to, date });
    alert('Bus search functionality to be implemented!');
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800">Search for Bus Tickets</h1>

      {/* Search Form */}
      <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-1">
            <label htmlFor="from" className="text-sm font-semibold text-gray-600 block">FROM</label>
            <input type="text" id="from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Ghaziabad" required className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="to" className="text-sm font-semibold text-gray-600 block">TO</label>
            <input type="text" id="to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Lucknow" required className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="date" className="text-sm font-semibold text-gray-600 block">DATE</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <div className="md:col-span-1">
            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors">
              Search Buses
            </button>
          </div>
        </form>
      </div>

      {/* Search Results Placeholder */}
      <div className="mt-10 text-center text-gray-500">
        <p>Bus search results will appear here.</p>
      </div>
    </div>
  );
};

export default BusTicket;