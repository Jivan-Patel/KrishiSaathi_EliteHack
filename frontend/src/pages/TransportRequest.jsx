import React, { useState } from 'react';
import axios from 'axios';
import { Truck, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../config';

const TransportRequest = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        crop: '',
        quantity: '',
        pickup: '',
        destination: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${API_BASE_URL}/transport`, { ...formData, userRole: 'farmer' })
            .then(() => {
                setSubmitted(true);
                setLoading(false);
                setFormData({ crop: '', quantity: '', pickup: '', destination: '' });
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto py-20 px-6 text-center space-y-8 animate-in zoom-in duration-500">
                <div className="flex justify-center">
                    <div className="w-24 h-24 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 size={56} />
                    </div>
                </div>
                <div>
                    <h2 className="text-5xl font-black text-gray-900 italic tracking-tight">Request Logged!</h2>
                    <p className="text-gray-500 font-bold mt-4 text-lg">Our logistics team will contact you within 2 hours to confirm verified vehicle details.</p>
                </div>
                <button
                    onClick={() => setSubmitted(false)}
                    className="btn-premium py-4 px-12"
                >
                    Book Another Vehicle
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 space-y-12 mb-20">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Form Section */}
                <div className="flex-1 space-y-8">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 italic tracking-tight uppercase">{t('logisticTitle')}</h1>
                        <p className="text-gray-500 font-bold mt-2">{t('logisticSubtitle')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="premium-card grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3 pl-2">Commodity Class</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Premium Wheat"
                                    className="w-full p-5 rounded-2xl bg-surface-200 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none font-bold text-gray-700 transition-all"
                                    value={formData.crop}
                                    onChange={e => setFormData({ ...formData, crop: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3 pl-2">Expected Volume (QT)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 150"
                                    className="w-full p-5 rounded-2xl bg-surface-200 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none font-bold text-gray-700 transition-all"
                                    value={formData.quantity}
                                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3 pl-2">Pickup Coordination</label>
                                <input
                                    type="text"
                                    placeholder="Main Farm / Village Address"
                                    className="w-full p-5 rounded-2xl bg-surface-200 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none font-bold text-gray-700 transition-all"
                                    value={formData.pickup}
                                    onChange={e => setFormData({ ...formData, pickup: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3 pl-2">Strategic Destination</label>
                                <input
                                    type="text"
                                    placeholder="Mandi / Warehouse / Buyer Hub"
                                    className="w-full p-5 rounded-2xl bg-surface-200 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none font-bold text-gray-700 transition-all"
                                    value={formData.destination}
                                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-6">
                            <button type="submit" className="w-full btn-premium py-5 flex justify-center items-center gap-3 text-lg group shadow-2xl" disabled={loading}>
                                {loading ? 'Authenticating...' : <><Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Initiate Logistics Pipeline</>}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Support Info */}
                <aside className="lg:w-96 space-y-6 sticky top-28">
                    <div className="bg-primary-50 rounded-[2.5rem] p-10 border border-primary-100 space-y-6 shadow-sm">
                        <Truck size={40} className="text-primary-600 mb-2" />
                        <h3 className="text-2xl font-black text-primary-900 italic pr-4 tracking-tight">Enterprise Logistics Standards</h3>
                        <p className="text-primary-800/70 font-bold text-sm leading-relaxed">Every transporter is background-verified and carries comprehensive cargo insurance up to ₹1,00,000.</p>

                        <div className="space-y-4 pt-4 border-t border-primary-100">
                            {['Real-time Tracking', 'Verified Drivers', 'Direct Payment'].map(f => (
                                <div key={f} className="flex items-center gap-3 text-xs font-black text-primary-900 uppercase tracking-widest">
                                    <CheckCircle2 size={16} className="text-primary-500" /> {f}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-xl">
                        <h4 className="font-black italic text-lg mb-2">Need Help Immediately?</h4>
                        <p className="text-sm font-bold opacity-80 mb-6">Our 24/7 logistics desk is available for instant coordination.</p>
                        <a href="tel:1800-KRISHI" className="block w-full text-center bg-white text-blue-600 font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-all">
                            Call Dispatch
                        </a>
                    </div>
                </aside>
            </div>
        </div>
    );
};


export default TransportRequest;
