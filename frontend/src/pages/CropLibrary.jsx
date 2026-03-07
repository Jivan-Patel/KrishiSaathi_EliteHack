import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Droplet, IndianRupee, MapPin, ChevronRight, Search, Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../config';

const CropLibrary = () => {
    const { t, language } = useLanguage();
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/crops?lang=${language}`);
                setCrops(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching crops:", err);
                setLoading(false);
            }
        };
        fetchCrops();
    }, [language]);

    const filteredCrops = crops.filter(crop =>
        crop.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-20 text-center font-black text-primary-600 text-2xl">{t('loadingIntelligence')}</div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight italic">{t('cropLibraryTitle')}</h1>
                    <p className="text-primary-700/60 font-bold mt-1">{t('cropLibrarySubtitle')}</p>
                </div>
                <div className="relative max-w-md w-full">
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        className="w-full p-4 pl-12 rounded-2xl border border-primary-100 bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none text-lg font-medium shadow-sm transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={24} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCrops.map(crop => (
                    <Link to={`/crops/${crop.id}`} key={crop.id} className="premium-card group hover:translate-y-[-4px]">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{crop.name}</h3>
                                <p className="text-primary-600 font-black text-[10px] uppercase tracking-widest mt-1 opacity-80">{crop.season} Choice</p>
                            </div>
                            <div className="p-3 bg-primary-50 text-primary-600 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                <Sprout size={20} />
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-primary-700 font-black text-2xl mb-6">
                            <IndianRupee size={20} />
                            <span>{crop.avgMarketPricePerQuintal}</span>
                            <span className="text-xs text-gray-400 font-medium ml-1 italic">/ QT</span>
                        </div>

                        <div className="pt-4 border-t border-primary-50 flex justify-between items-center">
                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">View Intel</span>
                            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                <ChevronRight size={18} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};


export default CropLibrary;
