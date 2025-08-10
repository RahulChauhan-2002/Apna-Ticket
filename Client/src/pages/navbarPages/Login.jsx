import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Backend API ko call karein
      const { data } = await axios.post(
        '/api/v1/login',
        { email, password },
        config
      );

      setLoading(false);
      // Yahan aap user data ko global state (Context/Redux) mein save kar sakte hain
      alert('Login successful!');
      navigate('/'); // Safal hone par home page par bhej dein

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login to Your Account</h1>
        
        {error && <p className="text-center text-red-500 bg-red-100 p-2 rounded-md">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-purple-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
