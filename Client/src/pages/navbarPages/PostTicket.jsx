import React, { useState } from 'react';

const PostTicket = () => {
  const [formData, setFormData] = useState({
    travelType: 'bus',
    from: '',
    to: '',
    journeyDate: '',
    ticketNumber: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Logic to post the ticket data
    console.log('Posting ticket:', formData);
    alert('Post Ticket functionality to be implemented!');
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Post Your Unused Ticket</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Travel Type */}
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-gray-600 block mb-2">Travel Type</label>
          <div className="flex gap-x-4">
            <label className="flex items-center">
              <input type="radio" name="travelType" value="bus" checked={formData.travelType === 'bus'} onChange={handleChange} className="h-4 w-4 text-purple-600 focus:ring-purple-500" />
              <span className="ml-2 text-gray-700">Bus</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="travelType" value="train" checked={formData.travelType === 'train'} onChange={handleChange} className="h-4 w-4 text-purple-600 focus:ring-purple-500" />
              <span className="ml-2 text-gray-700">Train</span>
            </label>
          </div>
        </div>

        {/* From / To */}
        <div>
          <label htmlFor="from" className="text-sm font-semibold text-gray-600 block">From</label>
          <input type="text" name="from" id="from" value={formData.from} onChange={handleChange} required className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="e.g., Delhi" />
        </div>
        <div>
          <label htmlFor="to" className="text-sm font-semibold text-gray-600 block">To</label>
          <input type="text" name="to" id="to" value={formData.to} onChange={handleChange} required className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="e.g., Mumbai" />
        </div>

        {/* Journey Date / Ticket Number */}
        <div>
          <label htmlFor="journeyDate" className="text-sm font-semibold text-gray-600 block">Date of Journey</label>
          <input type="date" name="journeyDate" id="journeyDate" value={formData.journeyDate} onChange={handleChange} required className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
        </div>
        <div>
          <label htmlFor="ticketNumber" className="text-sm font-semibold text-gray-600 block">PNR / Ticket Number</label>
          <input type="text" name="ticketNumber" id="ticketNumber" value={formData.ticketNumber} onChange={handleChange} required className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
        </div>

        {/* Price (CORRECTED) */}
        <div className="md:col-span-2">
          <label htmlFor="price" className="text-sm font-semibold text-gray-600 block">Selling Price (₹)</label>
          <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="e.g., 500" />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors">
            Post My Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostTicket;