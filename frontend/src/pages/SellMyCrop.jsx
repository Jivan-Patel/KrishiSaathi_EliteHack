import React, { useState } from 'react';
import { IndianRupee, MapPin, Phone, MessageCircle, ShoppingBag, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const buyersMock = [
    { id: 1, name: 'Green Earth Exports', location: 'Punjab', crops: ['Wheat', 'Rice'], phone: '+919876543210' },
    { id: 2, name: 'Desi Mandi Hub', location: 'Uttar Pradesh', crops: ['Potato', 'Sugarcane'], phone: '+919876543211' },
    { id: 3, name: 'AgroConnect PVT', location: 'Maharashtra', crops: ['Soybean', 'Cotton'], phone: '+919876543212' },
    { id: 4, name: 'Bharat Grain Supplies', location: 'Rajasthan', crops: ['Mustard', 'Bajra'], phone: '+919876543213' },
    { id: 5, name: 'South Spice Traders', location: 'Karnataka', crops: ['Ragi', 'Maize'], phone: '+919876543214' },
];

const SellMyCrop = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBuyers = buyersMock.filter(buyer =>
        buyer.crops.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 space-y-12 mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex-1 max-w-2xl">
                    <h1 className="text-4xl font-black text-gray-900 italic tracking-tight uppercase">{t('buyerTitle')}</h1>
                    <p className="text-gray-500 font-bold mt-2">{t('buyerSubtitle')}</p>
                </div>
                <div className="relative w-full md:w-[400px]">
                    <input
                        type="text"
                        placeholder="Search crop specific buyers..."
                        className="w-full p-5 pl-14 rounded-2xl bg-white border border-primary-100 shadow-sm focus:border-primary-500 outline-none font-bold transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-400" size={24} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredBuyers.length > 0 ? filteredBuyers.map(buyer => (
                    <div key={buyer.id} className="premium-card flex flex-col md:flex-row gap-8 items-start hover:border-primary-300">
                        <div className="flex-1 space-y-6">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 italic tracking-tight">{buyer.name}</h3>
                                <div className="flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-widest mt-1">
                                    <MapPin size={12} /> {buyer.location} // Verified Partner
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {buyer.crops.map((crop, i) => (
                                    <span key={i} className="bg-surface-200 text-gray-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary-50">
                                        {crop}
                                    </span>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <a
                                    href={`tel:${buyer.phone}`}
                                    className="btn-premium py-4 flex items-center justify-center gap-2 text-sm"
                                >
                                    <Phone size={18} /> Initiate Call
                                </a>
                                <a
                                    href={`https://wa.me/${buyer.phone.replace('+', '')}?text=Hello, I am interested in selling my ${searchTerm || 'crop'} to you.`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-[#25D366] text-white font-black py-4 rounded-xl shadow-xl active:bg-[#128C7E] flex items-center justify-center gap-2 text-sm hover:scale-[1.02] transition-transform"
                                >
                                    <MessageCircle size={18} /> Chat Secure
                                </a>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="lg:col-span-2 py-40 text-center bg-white rounded-[3rem] border-2 border-dashed border-primary-50 opacity-40">
                        <ShoppingBag size={80} className="mx-auto text-primary-100 mb-6" />
                        <h3 className="text-2xl font-black text-primary-900 italic">No Specialized Buyers Found</h3>
                        <p className="font-bold text-gray-400 mt-2">Try searching with a broader crop term.</p>
                    </div>
                )}
            </div>

            <div className="p-8 bg-surface-200 rounded-[2.5rem] border border-primary-100 text-center space-y-2">
                <p className="text-[10px] text-primary-600 font-black uppercase tracking-widest">Partner Assurance</p>
                <p className="text-gray-500 font-bold max-w-2xl mx-auto italic">Buyers on this platform undergo a mandatory 3-point verification including trade license and GST compliance checks.</p>
            </div>
        </div>
    );
};


export default SellMyCrop;
