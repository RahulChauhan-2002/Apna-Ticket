import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios ko import karein

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Error message ke liye state
  const [loading, setLoading] = useState(false); // Loading state ke liye

  const navigate = useNavigate(); // Redirect karne ke liye hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Loading shuru
    setError(''); // Purana error saaf karein

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Backend API ko call karein
      const { data } = await axios.post(
        '/api/v1/signup', // Proxy ke kaaran poora URL nahin likhna padega
        { name, email, password },
        config
      );

      setLoading(false); // Loading khatm
      alert('Sign up successful! Please login.');
      navigate('/login'); // Safal hone par login page par bhej dein

    } catch (err) {
      setLoading(false); // Loading khatm
      // Server se aaye error message ko set karein
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Create a New Account</h1>
        
        {/* Error message yahan dikhayein */}
        {error && <p className="text-center text-red-500 bg-red-100 p-2 rounded-md">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-gray-600 block">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="John Doe"
              disabled={loading} // Loading ke dauraan disable karein
            />
          </div>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-gray-600 block">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-gray-600 block">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="********"
              disabled={loading}
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-colors disabled:bg-purple-400"
              disabled={loading} // Loading ke dauraan disable karein
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;