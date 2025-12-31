import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Add your API call here: axios.post
            const response = await axios.post(`${backendUrl}/api/v1/signup`, {
                username,
                email,
                password
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
            setUsername("");
            setEmail("");
            setPassword("");
            navigate("/dashboard");
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0510] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#160d21] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex w-14 h-14 bg-linear-to-tr from-pink-500 to-purple-600 rounded-2xl items-center justify-center font-bold text-white text-2xl mb-4">PG</div>
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                    <p className="text-gray-400 mt-2">Join the PLYM Games network</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2 ml-1">Username</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 transition-all"
                            placeholder="Enter your username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 transition-all"
                            placeholder="enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 transition-all"
                            placeholder="enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="w-full cursor-pointer bg-linear-to-tr from-pink-500 to-purple-600 text-white font-bold py-4 rounded-2xl mt-4 hover:opacity-90 transition-opacity">
                        Create Account
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-6 text-sm">
                    Already have an account? <a href="/login" className="text-purple-400 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
};