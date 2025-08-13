import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation import karein
import axios from 'axios';
import { User, Mail, Smartphone, MapPin, Building } from 'lucide-react'; // Icons

const BookTicket = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        state: '',
        city: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); // location hook ka istemal karein
    
    // TicketItem se bheji gayi ticketId ko lein
    const ticketId = location.state?.ticketId;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check karein ki ticketId maujood hai ya nahin
        if (!ticketId) {
            setError("Could not find the ticket to book. Please go back and try again.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            // ticketId ko form data ke saath bhejein
            await axios.post('/api/v1/book-ticket', { ...formData, ticketId });
            setLoading(false);
            alert('Your booking request has been submitted successfully! The ticket owner will contact you soon.');
            navigate('/');
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };
    
    // New travel-themed background image
    const backgroundImageUrl = 'https://images.unsplash.com/photo-1533105079780-52b9be482077?q=80&w=1974&auto=format&fit=crop';

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-2xl space-y-6">
                
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                        <span role="img" aria-label="train-emoji" className="mr-3">🚆</span>
                        Confirm Your Journey
                        <span role="img" aria-label="bus-emoji" className="ml-3">🚌</span>
                    </h1>
                    <p className="text-gray-500 mt-2">Final step to lock in your travel plans!</p>
                </div>

                {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-400" placeholder="Full Name" disabled={loading} />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-400" placeholder="Email Address" disabled={loading} />
                    </div>
                    <div className="relative">
                        <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-400" placeholder="Mobile Number" disabled={loading} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-400" placeholder="State" disabled={loading} />
                        </div>
                        <div className="relative">
                            <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-400" placeholder="City" disabled={loading} />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full px-4 py-3.5 font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:scale-100" disabled={loading}>
                            {loading ? 'Submitting...' : 'Confirm & Book Now'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookTicket;
