import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, IndianRupee, Phone, MessageCircle, FlaskConical, Sprout, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const FertilizerListing = () => {
    const { t, language } = useLanguage();
    const [fertilizers, setFertilizers] = useState([]);
    const [filteredFertilizers, setFilteredFertilizers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchFertilizers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/fertilizers?lang=${language}`);
                setFertilizers(response.data);
                setFilteredFertilizers(response.data); // Initialize filtered list with all fertilizers
                setLoading(false);
            } catch (err) {
                console.error("Error fetching fertilizers:", err);
                setLoading(false);
            }
        };
        fetchFertilizers();
    }, [language]); // Re-fetch when language changes

    useEffect(() => {
        // Filter fertilizers whenever searchTerm or fertilizers list changes
        const results = fertilizers.filter(f =>
            f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.suitableCrops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredFertilizers(results);
    }, [searchTerm, fertilizers]);


    if (loading) return <div className="p-20 text-center font-black text-primary-600 text-2xl">{t('loadingIntelligence')}</div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <Link to="/" className="inline-flex items-center gap-2 text-primary-600 font-bold mb-4 hover:gap-3 transition-all">
                        <ChevronLeft size={20} />
                        {t('navHome')}
                    </Link>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight italic">{t('buyInputsTitle')}</h1>
                    <p className="text-primary-700/60 font-bold mt-1">{t('buyInputsSubtitle')}</p>
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

            {filteredFertilizers.length === 0 ? (
                <div className="text-center py-20 bg-primary-50 rounded-[2.5rem] border border-dashed border-primary-200">
                    <p className="text-primary-700/60 font-bold text-xl">{t('noFertilizers')}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredFertilizers.map(fertilizer => (
                        <div key={fertilizer.id} className="premium-card group hover:translate-y-[-4px] flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">{fertilizer.name}</h3>
                                    <p className="text-primary-600 font-black text-[10px] uppercase tracking-widest mt-1 opacity-80">{t('fertilizerName')}</p>
                                </div>
                                <div className="p-3 bg-primary-50 text-primary-600 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                    <FlaskConical size={20} />
                                </div>
                            </div>

                            <div className="space-y-4 mb-6 grow">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{t('nutrients')}</p>
                                    <p className="text-sm font-bold text-gray-700">{fertilizer.nutrients}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{t('suitableCrops')}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {fertilizer.suitableCrops.map(crop => (
                                            <span key={crop} className="px-2 py-1 bg-primary-50 text-primary-700 text-[10px] font-black rounded-md">{crop}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                                    <MapPin size={16} />
                                    <span>{fertilizer.location} • {fertilizer.seller}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 text-primary-700 font-black text-2xl mb-6">
                                <IndianRupee size={20} />
                                <span>{fertilizer.pricePerBag}</span>
                                <span className="text-xs text-gray-400 font-medium ml-1 italic">/ {t('pricePerBag').split(' ').pop()}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-primary-50">
                                <a
                                    href={`tel:${fertilizer.contact}`}
                                    className="flex items-center justify-center gap-2 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                                >
                                    <Phone size={18} />
                                    <span>{t('callNow')}</span>
                                </a>
                                <a
                                    href={`https://wa.me/91${fertilizer.contact}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
                                >
                                    <MessageCircle size={18} />
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FertilizerListing;
