import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, Info, CheckCircle, ChevronRight, Sprout, TrendingUp, IndianRupee } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../config';

const Recommendation = () => {
    const { t, language } = useLanguage();
    const [filters, setFilters] = useState({ soil: '', season: '', water: '' });
    const [recommendations, setRecommendations] = useState([]);
    const [fertilizers, setFertilizers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        const fetchFertilizers = async () => {
            if (recommendations.length > 0) {
                const cropNames = recommendations.map(c => c.name).join(',');
                try {
                    const response = await axios.get(`${API_BASE_URL}/fertilizers?crops=${cropNames}&lang=${language}`);
                    setFertilizers(response.data);
                } catch (err) {
                    console.error("Error fetching fertilizers:", err);
                }
            } else {
                setFertilizers([]);
            }
        };
        fetchFertilizers();
    }, [recommendations, language]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/crops/recommendations/filter?soil=${filters.soil}&season=${filters.season}&water=${filters.water}&lang=${language}`);
            // Enhance results with match logic
            const enhancedData = response.data.map(crop => {
                let score = 0;
                if (!filters.soil || crop.soilTypes?.includes(filters.soil)) score += 33;
                else if (crop.soilTypes?.some(s => s.includes(filters.soil) || filters.soil.includes(s))) score += 20; // Partial

                if (!filters.season || crop.season === filters.season) score += 33;
                if (!filters.water || crop.waterRequirement === filters.water) score += 34;

                return { ...crop, matchScore: score };
            }).sort((a, b) => b.matchScore - a.matchScore);

            setRecommendations(enhancedData);
            setLoading(false);
        } catch (err) {
            console.error("Error filtering crops:", err);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 space-y-12 pb-20">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Input Panel */}
                <div className="lg:w-[400px] w-full sticky top-28">
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-primary-50 space-y-8">
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 italic tracking-tight">{t('navAdvice')}</h2>
                            <p className="text-primary-600 font-bold mt-2 text-sm leading-relaxed">Based on 3 matching factors from your field profile</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Field Condition</label>
                                <select
                                    className="w-full p-5 rounded-2xl bg-surface-200 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none font-bold text-gray-700 transition-all appearance-none"
                                    onChange={e => setFilters({ ...filters, soil: e.target.value })}
                                    required
                                >
                                    <option value="">Specific Soil Type</option>
                                    {['Alluvial', 'Black', 'Red', 'Loamy', 'Sandy', 'Laterite'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>

                                <select
                                    className="w-full p-5 rounded-2xl bg-surface-200 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none font-bold text-gray-700 transition-all appearance-none"
                                    onChange={e => setFilters({ ...filters, season: e.target.value })}
                                    required
                                >
                                    <option value="">Current/Next Season</option>
                                    {['Kharif', 'Rabi', 'Zaid', 'Annual'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>

                                <select
                                    className="w-full p-5 rounded-2xl bg-surface-200 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none font-bold text-gray-700 transition-all appearance-none"
                                    onChange={e => setFilters({ ...filters, water: e.target.value })}
                                    required
                                >
                                    <option value="">Water Availability</option>
                                    {['Low', 'Medium', 'High'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <button type="submit" className="w-full btn-premium py-5 flex justify-center items-center gap-3 text-lg group">
                                <TrendingUp size={24} className="group-hover:rotate-12 transition-transform" />
                                Generate Intel
                            </button>
                        </form>

                        <div className="pt-4 flex items-center gap-3 text-gray-400 font-bold text-xs">
                            <Info size={16} /> 100% Data-Driven Recommendations
                        </div>
                    </div>
                </div>

                {/* Results Area */}
                <div className="flex-1 w-full min-h-[500px]">
                    {!searched && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-20 bg-white rounded-[3rem] border border-primary-50 shadow-sm opacity-60">
                            <Sprout size={100} className="text-primary-100 mb-8" strokeWidth={1} />
                            <h3 className="text-3xl font-black text-primary-900 tracking-tight italic">Waiting for Field Specs</h3>
                            <p className="max-w-xs font-bold text-gray-400 mt-2">Complete the form to unlock your land's full potential.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[3rem] border border-primary-50 shadow-sm">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-primary-200 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                                <Sprout size={80} className="text-primary-600 animate-bounce relative z-10" strokeWidth={1.5} />
                            </div>
                            <p className="text-2xl font-black text-primary-900 tracking-tighter uppercase italic">{t('loadingIntelligence')}</p>
                            <div className="mt-4 flex gap-1">
                                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    )}

                    {searched && !loading && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-3xl font-black text-gray-900 italic tracking-tight">{recommendations.length} Optimized Matches</h3>
                                <CheckCircle size={32} className="text-primary-500" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {recommendations.length > 0 ? (
                                    recommendations.map((crop, index) => (
                                        <Link to={`/crops/${crop.id}`} key={crop.id} className={`premium-card group hover:bg-primary-50 relative entry-fade ${index === 0 ? 'border-primary-500 ring-4 ring-primary-500/5' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                                            {index === 0 && (
                                                <div className="absolute -top-3 left-6 bg-primary-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1 uppercase tracking-widest">
                                                    <TrendingUp size={12} /> Top Recommendation
                                                </div>
                                            )}

                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h4 className="text-2xl font-black text-gray-900 group-hover:text-primary-900 transition-colors uppercase italic">{crop.name}</h4>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <div className="px-2 py-1 bg-primary-50 text-primary-600 text-[10px] font-black rounded-md uppercase tracking-tight">
                                                            {crop.matchScore === 100 ? 'High Suitability' : crop.matchScore > 60 ? 'Medium Suitability' : 'Moderate Suitability'}
                                                        </div>
                                                        <div className="text-[10px] font-black text-primary-500 uppercase tracking-widest">{crop.matchScore}% Match</div>
                                                    </div>
                                                </div>
                                                <div className="p-3 bg-white text-primary-600 rounded-xl shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all">
                                                    <ChevronRight size={20} />
                                                </div>
                                            </div>

                                            {/* Match Progress */}
                                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-6">
                                                <div
                                                    className="bg-primary-500 h-full transition-all duration-1000"
                                                    style={{ width: `${crop.matchScore}%` }}
                                                ></div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 mb-6">
                                                {[
                                                    { label: 'Soil', match: !filters.soil || crop.soilTypes?.includes(filters.soil) },
                                                    { label: 'Season', match: !filters.season || crop.season === filters.season },
                                                    { label: 'Water', match: !filters.water || crop.waterRequirement === filters.water }
                                                ].map((factor, i) => (
                                                    <div key={i} className={`p-2 rounded-xl border flex flex-col items-center gap-1 ${factor.match ? 'bg-primary-50 border-primary-100' : 'bg-gray-50 border-gray-100'}`}>
                                                        <span className="text-[8px] font-black uppercase text-gray-400">{factor.label}</span>
                                                        {factor.match ? <CheckCircle size={14} className="text-primary-500" /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="p-4 bg-primary-50/50 rounded-2xl border border-primary-100/50 text-[11px] font-bold text-gray-600 leading-relaxed italic">
                                                {`Optimum yield expected with your current ${filters.soil} soil profile.`}
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="md:col-span-2 bg-white rounded-[3rem] p-20 text-center border border-red-50 shadow-sm">
                                        <h4 className="text-3xl font-black text-red-500 italic mb-4">Incompatible Specs</h4>
                                        <p className="text-gray-500 font-bold max-w-sm mx-auto">None of our current crop models perfectly match these parameters. Try adjusting your water level or soil selection.</p>
                                    </div>
                                )}
                            </div>

                            {/* Recommended Fertilizers for Results */}
                            {recommendations.length > 0 && (
                                <div className="pt-12 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-3xl font-black text-gray-900 italic tracking-tight">{t('recommendedInputs')}</h3>
                                        <div className="grow h-px bg-primary-100"></div>
                                    </div>

                                    {fertilizers.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {fertilizers.map(f => (
                                                <div key={f.id} className="premium-card group hover:translate-y-[-4px]">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <h4 className="text-xl font-black text-gray-900">{f.name}</h4>
                                                        <div className="p-2 bg-primary-50 text-primary-600 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-all">
                                                            <Sprout size={16} />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3 mb-4 text-sm">
                                                        <p className="font-bold text-gray-600 line-clamp-1">{f.nutrients}</p>
                                                        <div className="flex items-center gap-1 text-primary-700 font-black">
                                                            <IndianRupee size={16} />
                                                            <span>{f.pricePerBag} / Bag</span>
                                                        </div>
                                                    </div>
                                                    <Link to="/fertilizers" className="text-xs font-black text-primary-600 uppercase tracking-widest flex items-center gap-2">
                                                        Contact Seller <ChevronRight size={14} />
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 font-bold italic">{t('noFertilizers')}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Recommendation;
