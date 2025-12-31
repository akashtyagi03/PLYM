import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Your login logic here
    try{
        const response = await axios.post(`${backendUrl}/api/v1/signin`, {
            email,
            password
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate('/dashboard');
    } catch (error) {
        console.error("Login failed:", error);
        return;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0510] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-[#160d21] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex w-14 h-14 bg-linear-to-tr from-pink-500 to-purple-600 rounded-2xl items-center justify-center font-bold text-white text-2xl mb-4 shadow-lg shadow-purple-500/20">PG</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Log in to manage your gaming session</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-700"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-700"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</button>
          </div>

          <button className="w-full cursor-pointer bg-linear-to-tr from-pink-500 to-purple-600 text-white font-bold py-4 rounded-2xl mt-4 hover:opacity-90 transition-opacity">
            Log In
          </button>
        </form>
        
        <p className="text-center text-gray-500 mt-8 text-sm">
          Don't have an account? <button onClick={() => navigate('/signup')} className="text-purple-400 font-bold hover:underline">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;