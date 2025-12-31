import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URL

const LandingPage = () => {
  const navigate = useNavigate();
  const [buildData, setBuildData] = useState({ frontend_progress: 0, status: 'Loading...' });
  const [roadmap, setRoadmap] = useState({ now: '', next: '' });

  const fetchData = async () => {
    try {
      // fetch build status
      const buildRes = await axios.get(`${backendUrl}/api/v1/build-status`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (buildRes.data.response && buildRes.data.response.length > 0) {
        setBuildData(buildRes.data.response[0]);
      }

      // fetch roadmap
      const roadmapRes = await axios.get(`${backendUrl}/api/v1/roadmap`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setRoadmap(roadmapRes.data);
    } catch (error) {
      console.error("Error fetching build status:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0510] text-white p-6 md:p-12 font-sans flex items-center justify-center">
      <div className="w-full h-full border-none rounded-none lg:rounded-[3rem] lg:w-[95%] lg:h-[90%] bg-linear-to-br from-[#1a1025] to-[#0a0510] flex flex-col lg:flex-row p-8 md:p-16 gap-12 items-center justify-center">

        <div className="flex-1 space-y-8">
          <div className="flex flex-wrap gap-3">
            <span className="bg-black/40 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> LIVE BUILD IN PROGRESS
            </span>
            <span className="bg-black/40 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-2">
              ⚡ OPTIMIZED FOR GAMING CAFÉS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center font-bold">PG</div>
            <h2 className="text-xl font-semibold italic">PLYM Games <span className="text-gray-500 font-normal">· Gaming Café OS</span></h2>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white">
            Something powerful <br />
            <span className="text-gray-500">is loading behind </span> <br />
            this screen.
          </h1>

          {/* // here we fetch data from backend */}
          <div className="space-y-2 py-4">
             <p className="text-sm font-bold text-purple-400 uppercase tracking-widest">Now: {roadmap.now || "Loading..."}</p>
             <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Next: {roadmap.next || "Upcoming features"}</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => navigate('/signup')}
              className="bg-linear-to-r from-pink-500 to-purple-600 px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-purple-500/20"
            >
              Get launch update
            </button>
            <button className="bg-white/5 border border-white/10 px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
              View roadmap
            </button>
          </div>
        </div>

        <div className="w-full lg:w-100 bg-[#120b1e] border border-white/10 rounded-[2.5rem] p-8 space-y-8 flex flex-col justify-center">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400 font-medium">Build status · PLYM Games</span>
            <span className="bg-yellow-500/10 text-yellow-500 text-[10px] px-3 py-1 rounded-full border border-yellow-500/20 font-bold uppercase">
              ● {buildData.status}
            </span>
          </div>

          {/* // here also we make backend request to get build status */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-bold">
              <span>Frontend experience</span>
              <span className="text-purple-400">{buildData.frontend_progress}%</span>
            </div>
            <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-linear-to-r from-pink-500 to-purple-500 h-full transition-all duration-1000" 
                style={{ width: `${buildData.frontend_progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              <span>Design polish</span>
              <span>Real-time dashboards</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] text-gray-500 font-bold uppercase">Café owners</p>
              <p className="text-xs font-bold mt-1 text-white">Live insights & revenue</p>
              <p className="text-[10px] text-green-400 font-bold mt-3">Launching soon</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] text-gray-500 font-bold uppercase">Players</p>
              <p className="text-xs font-bold mt-1 text-white">Discover & book cafés</p>
              <p className="text-[10px] text-blue-400 font-bold mt-3">Beta queue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;