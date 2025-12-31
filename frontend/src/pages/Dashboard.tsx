import axios from 'axios';
import { useEffect, useState } from 'react';
const backendUrl = import.meta.env.VITE_BACKEND_URL

const Dashboard = () => {
    const [features, setFeatures] = useState<any[]>([]);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/features`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.response) {
                setFeatures(response.data.response);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    }
    useEffect(() => {
        // Fetch dashboard data here if needed
        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0510] flex text-white">
            {/* Sidebar */}
            <div className="w-64 border-r border-white/5 bg-[#0d0716] p-6 hidden md:block">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 bg-linear-to-tr from-pink-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xs">PG</div>
                    <span className="font-bold tracking-tight">PLYM Dashboard</span>
                </div>
                <nav className="space-y-2">
                    {['Overview', 'Bookings', 'Café Map', 'Wallet', 'Settings'].map((item) => (
                        <div key={item} className="px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer text-gray-400 hover:text-white transition-colors">
                            {item}
                        </div>
                    ))}
                </nav>
                <button
                    onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
                    className="mt-10 text-red-400 text-sm hover:underline cursor-pointer"
                >
                    Sign Out
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome back, Gamer!</h1>
                        <p className="text-gray-400 text-sm">Ready for your next session?</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-medium">Player_One</p>
                            <p className="text-xs text-green-400">● Online</p>
                        </div>
                        <div className="w-10 h-10 bg-white/10 rounded-full border border-white/10"></div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { label: 'Active Sessions', value: '2', color: 'text-purple-400' },
                        { label: 'Wallet Balance', value: '₹1,240.00', color: 'text-green-400' },
                        { label: 'Upcoming Bookings', value: '1', color: 'text-blue-400' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6">
                            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Live Status Section (Reflecting the Reference Image) */}
                <div className="space-y-4">
                    <div className="grid grid-cols-4 text-xs font-bold text-gray-500 uppercase px-4">
                        <span>Feature Name</span>
                        <span>Target Audience</span>
                        <span>Status</span>
                        <span>Action</span>
                    </div>

                    {features.length > 0 ? (
                        features.map((feature) => (
                            <div key={feature._id} className="grid grid-cols-4 items-center bg-white/5 border border-white/5 p-4 rounded-2xl hover:border-purple-500/30 transition-colors">
                                <span className="font-medium text-sm">{feature.name}</span>
                                <span className="text-gray-400 text-sm uppercase">{feature.audience}</span>
                                <span className={`text-sm ${feature.state === 'live' ? 'text-green-400' : 'text-blue-400'}`}>
                                    {feature.state}
                                </span>
                                <button className="bg-purple-600/20 text-purple-400 border border-purple-500/30 px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-600 hover:text-white transition-all cursor-pointer">
                                    Manage
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No features found. Seed your database!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;