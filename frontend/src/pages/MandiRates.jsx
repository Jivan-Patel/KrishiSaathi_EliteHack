import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IndianRupee, TrendingUp, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../config';

const MandiRates = () => {
    const { t, language } = useLanguage();
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [districtFilter, setDistrictFilter] = useState('');
    const [sortBy, setSortBy] = useState('none');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/crops?lang=${language}`)
            .then(res => {
                setCrops(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [language]);

    const filteredCrops = crops
        .filter(crop => crop.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'high') return b.avgMarketPricePerQuintal - a.avgMarketPricePerQuintal;
            if (sortBy === 'low') return a.avgMarketPricePerQuintal - b.avgMarketPricePerQuintal;
            return 0;
        });

    const getTrend = (id) => {
        const hash = id % 3;
        if (hash === 0) return { icon: <TrendingUp size={16} className="text-green-500" />, label: '▲' };
        if (hash === 1) return { icon: <TrendingUp size={16} className="text-red-500 rotate-180" />, label: '▼' };
        return { icon: <div className="w-4 h-0.5 bg-gray-300 rounded-full"></div>, label: '▬' };
    };

    if (loading) return <div className="p-20 text-center font-black text-primary-600 text-2xl italic">{t('loadingIntelligence')}</div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 italic tracking-tight uppercase">{t('mandiRatesTitle')}</h1>
                    <p className="text-gray-500 font-bold mt-2">{t('mandiRatesSubtitle')}</p>
                </div>
                <div className="flex flex-col md:items-end gap-3">
                    <div className="bg-primary-50 text-primary-700 px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-widest border border-primary-100 flex items-center gap-2">
                        <TrendingUp size={16} /> Market Active // {new Date().toLocaleDateString()}
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <select
                            className="p-4 rounded-2xl border border-primary-100 bg-white outline-none font-bold text-xs uppercase tracking-widest text-primary-600 appearance-none min-w-[140px]"
                            onChange={(e) => setStateFilter(e.target.value)}
                        >
                            <option value="">Specific State</option>
                            {['Punjab', 'Haryana', 'UP', 'Gujarat', 'Maharashtra'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <select
                            className="p-4 rounded-2xl border border-primary-100 bg-white outline-none font-bold text-xs uppercase tracking-widest text-primary-600 appearance-none min-w-[140px]"
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="none">Sort By Intelligence</option>
                            <option value="high">Highest Market Price</option>
                            <option value="low">Lowest Market Price</option>
                        </select>
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder') || "Search crop..."}
                                className="w-full p-4 pl-12 rounded-2xl border border-primary-100 bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none text-sm font-medium shadow-sm transition-all"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-premium border border-primary-50 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-surface-200 border-b border-primary-50">
                        <tr>
                            <th className="px-10 py-6 font-black uppercase text-xs tracking-widest text-primary-900">Crop Intellectual Name</th>
                            <th className="px-10 py-6 font-black uppercase text-xs tracking-widest text-primary-900 text-right">Avg Market Rate</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary-50">
                        {filteredCrops.map(crop => (
                            <tr key={crop.id} className="hover:bg-primary-50 transition-colors group cursor-pointer">
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-3">
                                        <span className="font-black text-xl text-gray-900 italic group-hover:translate-x-1 transition-transform">{crop.name}</span>
                                        {getTrend(crop.id).icon}
                                    </div>
                                </td>
                                <td className="px-10 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2 text-primary-700 font-black text-2xl">
                                        <IndianRupee size={22} className="opacity-50" />
                                        {crop.avgMarketPricePerQuintal}
                                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest ml-1">/ Quintal</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredCrops.length === 0 && (
                            <tr>
                                <td colSpan="2" className="px-10 py-12 text-center text-gray-400 font-bold italic">
                                    No crops match your search intelligence.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-10 bg-primary-600 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2">
                    <h4 className="text-2xl font-black italic">Price Transparency Policy</h4>
                    <p className="text-primary-100 font-bold opacity-80">{t('mandiUpdateNote')}</p>
                </div>
                <button className="bg-white text-primary-700 font-black py-4 px-10 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                    Report Price Anomaly
                </button>
            </div>
        </div>
    );
};


export default MandiRates;
