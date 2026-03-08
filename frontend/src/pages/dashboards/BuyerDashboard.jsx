import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCart, Users, MessageSquare, Plus, Phone, MessageCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const overviewCards = [
    { label: 'Crops Requested', value: 8, icon: ShoppingCart, color: 'bg-primary-50 text-primary-600' },
    { label: 'Farmers Contacted', value: 14, icon: Users, color: 'bg-amber-50 text-amber-600' },
    { label: 'Active Negotiations', value: 3, icon: MessageSquare, color: 'bg-blue-50 text-blue-600' },
];

const mockLeads = [
    { id: 1, name: 'Rajan Patel', crop: 'Wheat', quantity: '500 kg', location: 'Mehsana, Gujarat', phone: '9898989898' },
    { id: 2, name: 'Haridas Verma', crop: 'Rice', quantity: '1 Ton', location: 'Patna, Bihar', phone: '9876543210' },
    { id: 3, name: 'Savita Devi', crop: 'Maize', quantity: '300 kg', location: 'Nashik, Maharashtra', phone: '9765432109' },
];

const mockDeals = [
    { id: 1, crop: 'Wheat – 500 kg', status: 'Pending', color: 'bg-amber-100 text-amber-700' },
    { id: 2, crop: 'Tomato – 200 kg', status: 'In Progress', color: 'bg-blue-100 text-blue-700' },
    { id: 3, crop: 'Rice – 1 Ton', status: 'Completed', color: 'bg-primary-100 text-primary-700' },
];

const BuyerDashboard = () => {
    const { user, logout } = useAuth();
    const [form, setForm] = useState({ crop: '', quantity: '', state: '', priceMin: '', priceMax: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 entry-fade">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-black text-primary-900">Buyer Dashboard</h1>
                    <p className="text-gray-500 font-medium mt-1">Welcome back, {user?.username} 👋</p>
                </div>
                <button onClick={logout} className="btn-premium-outline py-2 px-5 text-sm">Logout</button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {overviewCards.map(card => (
                    <div key={card.label} className="premium-card hover-lift flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${card.color}`}>
                            <card.icon size={24} />
                        </div>
                        <div>
                            <p className="text-3xl font-black text-primary-900">{card.value}</p>
                            <p className="text-sm text-gray-500 font-medium">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Post Crop Requirement Form */}
                <div className="premium-card">
                    <div className="flex items-center gap-2 mb-5">
                        <Plus size={20} className="text-primary-600" />
                        <h2 className="text-lg font-black text-primary-900">Post Crop Requirement</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Crop Name</label>
                                <input name="crop" value={form.crop} onChange={handleChange} required
                                    placeholder="e.g. Wheat"
                                    className="w-full px-4 py-2.5 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none text-sm font-medium bg-surface-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Quantity</label>
                                <input name="quantity" value={form.quantity} onChange={handleChange} required
                                    placeholder="e.g. 500 kg"
                                    className="w-full px-4 py-2.5 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none text-sm font-medium bg-surface-50" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Preferred State</label>
                            <input name="state" value={form.state} onChange={handleChange}
                                placeholder="e.g. Punjab"
                                className="w-full px-4 py-2.5 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none text-sm font-medium bg-surface-50" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Min Price (₹/kg)</label>
                                <input name="priceMin" type="number" value={form.priceMin} onChange={handleChange}
                                    placeholder="15"
                                    className="w-full px-4 py-2.5 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none text-sm font-medium bg-surface-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Max Price (₹/kg)</label>
                                <input name="priceMax" type="number" value={form.priceMax} onChange={handleChange}
                                    placeholder="25"
                                    className="w-full px-4 py-2.5 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none text-sm font-medium bg-surface-50" />
                            </div>
                        </div>
                        {submitted && (
                            <div className="flex items-center gap-2 text-primary-700 bg-primary-50 rounded-2xl px-4 py-2 text-sm font-bold">
                                <CheckCircle size={16} /> Requirement posted successfully!
                            </div>
                        )}
                        <button type="submit" className="btn-premium w-full py-2.5 text-sm">Post Requirement</button>
                    </form>
                </div>

                {/* Deal Status Panel */}
                <div className="premium-card">
                    <div className="flex items-center gap-2 mb-5">
                        <TrendingUp size={20} className="text-primary-600" />
                        <h2 className="text-lg font-black text-primary-900">Deal Status</h2>
                    </div>
                    <div className="space-y-3">
                        {mockDeals.map(deal => (
                            <div key={deal.id} className="flex items-center justify-between p-4 rounded-2xl bg-surface-200 hover-lift">
                                <div className="flex items-center gap-3">
                                    <Clock size={16} className="text-gray-400" />
                                    <span className="text-sm font-bold text-gray-700">{deal.crop}</span>
                                </div>
                                <span className={`text-xs font-black px-3 py-1 rounded-full ${deal.color}`}>{deal.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Farmer Leads */}
            <div className="premium-card">
                <div className="flex items-center gap-2 mb-5">
                    <Users size={20} className="text-primary-600" />
                    <h2 className="text-lg font-black text-primary-900">Farmer Leads</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-xs font-black text-gray-500 border-b border-primary-50">
                                <th className="pb-3 pr-4">Farmer</th>
                                <th className="pb-3 pr-4">Crop</th>
                                <th className="pb-3 pr-4">Quantity</th>
                                <th className="pb-3 pr-4">Location</th>
                                <th className="pb-3">Contact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary-50">
                            {mockLeads.map(lead => (
                                <tr key={lead.id} className="hover:bg-primary-50/50 transition-colors">
                                    <td className="py-3 pr-4 font-bold text-gray-800">{lead.name}</td>
                                    <td className="py-3 pr-4 text-gray-600">{lead.crop}</td>
                                    <td className="py-3 pr-4 text-gray-600">{lead.quantity}</td>
                                    <td className="py-3 pr-4 text-gray-500">{lead.location}</td>
                                    <td className="py-3 flex gap-2">
                                        <a href={`tel:${lead.phone}`}
                                            className="flex items-center gap-1 text-xs btn-premium py-1.5 px-3">
                                            <Phone size={12} /> Call
                                        </a>
                                        <a href={`https://wa.me/91${lead.phone}`} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-1 text-xs btn-premium-outline py-1.5 px-3">
                                            <MessageCircle size={12} /> WhatsApp
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboard;
