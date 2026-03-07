import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Info, Calendar, Bug, Sprout, MapPin, Layers, TrendingUp, IndianRupee, Handshake, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../config';

const CropDetailBySection = ({ title, icon, content }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary-100">
        <div className="flex items-center gap-2 mb-3 text-primary-700 font-black uppercase text-xs tracking-widest">
            {icon}
            <span>{title}</span>
        </div>
        <div className="text-gray-700 font-medium leading-relaxed">
            {content}
        </div>
    </div>
);

const CropDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [crop, setCrop] = useState(null);
    const [fertilizers, setFertilizers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCrop = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/crops/${id}?lang=${language}`);
                setCrop(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching crop:", err);
                setLoading(false);
            }
        };
        fetchCrop();
    }, [id, language]);

    useEffect(() => {
        if (crop?.name) {
            axios.get(`${API_BASE_URL}/fertilizers?crop=${crop.name}&lang=${language}`)
                .then(res => setFertilizers(res.data))
                .catch(err => console.error(err));
        }
    }, [crop?.name]);

    if (loading) return <div className="p-20 text-center font-black text-primary-600 text-2xl">{t('loadingIntelligence')}</div>;
    if (!crop) return <div className="p-20 text-center text-red-500 font-black">Crop not found</div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 space-y-10 pb-20">
            <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-primary-700 font-black transition-transform active:scale-95 group">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-premium border border-primary-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <ChevronLeft size={24} />
                </div>
                <span className="text-lg">{t('backToLibrary')}</span>
            </button>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Main Content Area */}
                <div className="flex-1 space-y-8">
                    <header className="bg-linear-to-br from-primary-600 to-primary-800 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 space-y-4">
                            <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">
                                Verified Crop Intelligence
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black leading-none italic">{crop.name}</h1>
                            <p className="text-xl md:text-2xl text-primary-100 font-bold opacity-80">{crop.season} Season Special</p>

                            <div className="flex flex-wrap gap-4 pt-6">
                                <div className="bg-white/10 px-8 py-4 rounded-2xl border border-white/10">
                                    <p className="text-[10px] text-primary-200 font-black uppercase tracking-widest mb-1">Market Value</p>
                                    <div className="flex items-center gap-1 font-black md:text-2xl">
                                        <IndianRupee size={22} /> {crop.avgMarketPricePerQuintal} <span className="text-xs opacity-50 ml-1">/ QT</span>
                                    </div>
                                </div>
                                <div className="bg-white/10 px-8 py-4 rounded-2xl border border-white/10">
                                    <p className="text-[10px] text-primary-200 font-black uppercase tracking-widest mb-1">Harvest Vol.</p>
                                    <p className="font-black md:text-2xl">{crop.expectedYield}</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute right-[-10%] bottom-[-10%] opacity-10">
                            <Sprout size={350} strokeWidth={1} />
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CropDetailBySection
                            title="Geographic Suitability"
                            icon={<MapPin size={18} />}
                            content={crop.suitableStates.join(' • ')}
                        />
                        <CropDetailBySection
                            title="Soil Quality"
                            icon={<Layers size={18} />}
                            content={crop.soilTypes.join(' • ')}
                        />
                    </div>

                    <CropDetailBySection
                        title="Operations Calendar"
                        icon={<Calendar size={18} />}
                        content={
                            <div className="flex flex-col md:flex-row md:items-center gap-12 py-4">
                                <div className="flex-1">
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3">Optimal Sowing</p>
                                    <div className="flex flex-wrap gap-2 text-primary-700 font-black">
                                        {crop.sowingMonths.join(' // ')}
                                    </div>
                                </div>
                                <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
                                <div className="flex-1">
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3">Peak Harvest</p>
                                    <div className="flex flex-wrap gap-2 text-orange-600 font-black">
                                        {crop.harvestingMonths.join(' // ')}
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    {/* Recommended Fertilizers Section */}
                    <div className="space-y-6 pt-10">
                        <div className="flex items-center gap-4">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight italic">{t('recommendedInputs')}</h2>
                            <div className="grow h-px bg-primary-100"></div>
                        </div>

                        {fertilizers.length === 0 ? (
                            <div className="bg-primary-50 rounded-[2.5rem] p-10 border border-dashed border-primary-200 text-center">
                                <p className="text-primary-700/60 font-bold">{t('noFertilizers')}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {fertilizers.slice(0, 3).map(f => (
                                    <div key={f.id} className="premium-card group hover:translate-y-[-4px]">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-xl font-black text-gray-900">{f.name}</h4>
                                            <div className="p-2 bg-primary-50 text-primary-600 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-all">
                                                <Sprout size={16} />
                                            </div>
                                        </div>
                                        <div className="space-y-3 mb-4">
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{t('nutrients')}</p>
                                                <p className="text-sm font-bold text-gray-700 line-clamp-1">{f.nutrients}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-primary-700 font-black text-lg">
                                                <IndianRupee size={16} />
                                                <span>{f.pricePerBag}</span>
                                            </div>
                                        </div>
                                        <Link to="/fertilizers" className="text-xs font-black text-primary-600 uppercase tracking-widest hover:text-primary-800 transition-colors flex items-center gap-1">
                                            View Seller Details <Layers size={12} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Action/Advice Sidebar */}
                <aside className="lg:w-96 space-y-8 sticky top-28">
                    <div className="premium-card bg-primary-50 border-primary-100 shadow-none">
                        <h3 className="text-xl font-black text-primary-900 border-b border-primary-100 pb-4 mb-6 flex items-center gap-2">
                            <Info size={20} className="text-primary-600" /> Fertilizer Plan
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] text-primary-400 font-black uppercase tracking-widest mb-1">Base App</p>
                                <p className="text-primary-900 font-bold leading-relaxed text-sm">{crop.fertilizerSchedule.baseFertilizer}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-primary-400 font-black uppercase tracking-widest mb-1">Top Dress</p>
                                <p className="text-primary-900 font-bold leading-relaxed text-sm">{crop.fertilizerSchedule.topDressing}</p>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card border-red-50">
                        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                            <Bug size={20} className="text-red-500" /> Pest Defense
                        </h3>
                        <div className="space-y-4">
                            {crop.commonPests.map((pest, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-red-50/30 border border-red-50">
                                    <p className="text-red-700 font-black text-sm mb-1">{pest.name}</p>
                                    <p className="text-gray-500 text-xs font-bold leading-relaxed">{pest.solution}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <Link to="/sell" className="btn-premium flex-1 flex justify-center items-center gap-2">
                            Sell Your {crop.name}
                        </Link>
                        <button className="btn-premium-outline flex justify-center items-center gap-2">
                            Download PDF Guide
                        </button>
                    </div>

                    {/* Ecosystem Grid */}
                    <div className="pt-8 border-t border-primary-50">
                        <h3 className="text-xs font-black text-primary-500 uppercase tracking-[0.2em] mb-6">Localized Ecosystem Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: 'Find Buyers', path: '/sell', icon: <Handshake size={20} />, sub: 'Direct Buyer Access' },
                                { title: 'Check Market Price', path: '/mandi-rates', icon: <TrendingUp size={20} />, sub: 'Live Mandi Intel' },
                                { title: 'Request Transport', path: '/transport', icon: <Truck size={20} />, sub: 'Verified Logistics' }
                            ].map((action, i) => (
                                <Link key={i} to={action.path} className="p-6 bg-white border border-primary-50 rounded-2xl hover-lift group">
                                    <div className="text-primary-600 mb-4 group-hover:scale-110 transition-transform">{action.icon}</div>
                                    <h4 className="text-sm font-black text-gray-900 mb-1">{action.title}</h4>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{action.sub}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};


export default CropDetail;
