import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Package, Eye, Bell, Plus, Edit2, CheckCircle, ToggleLeft, ToggleRight } from 'lucide-react';

const overviewCards = [
    { label: 'Products Listed', value: 6, icon: Package, color: 'bg-primary-50 text-primary-600' },
    { label: 'Farmer Inquiries', value: 21, icon: Bell, color: 'bg-amber-50 text-amber-600' },
    { label: 'Total Views', value: 348, icon: Eye, color: 'bg-blue-50 text-blue-600' },
];

const initialProducts = [
    { id: 1, name: 'NPK 14-35-14', nutrients: 'N:14% P:35% K:14%', price: 850, suitable: 'Wheat, Maize', available: true },
    { id: 2, name: 'Urea – 46%', nutrients: 'Nitrogen: 46%', price: 490, suitable: 'Rice, Sugarcane', available: true },
    { id: 3, name: 'DAP Fertilizer', nutrients: 'N:18% P:46%', price: 1350, suitable: 'All Crops', available: false },
];

const mockInquiries = [
    { id: 1, farmer: 'Gopal Singh', product: 'NPK 14-35-14', quantity: '5 bags', time: '2h ago' },
    { id: 2, farmer: 'Meena Kumari', product: 'Urea – 46%', quantity: '10 bags', time: '5h ago' },
    { id: 3, farmer: 'Arjun Reddy', product: 'DAP Fertilizer', quantity: '3 bags', time: '1d ago' },
];

const SellerDashboard = () => {
    const { user, logout } = useAuth();
    const [products, setProducts] = useState(initialProducts);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', nutrients: '', price: '', suitable: '' });

    const toggleAvailability = (id) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, available: !p.available } : p));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const product = { ...newProduct, id: Date.now(), price: Number(newProduct.price), available: true };
        setProducts(prev => [...prev, product]);
        setNewProduct({ name: '', nutrients: '', price: '', suitable: '' });
        setShowAddForm(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 entry-fade">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-black text-primary-900">Seller Dashboard</h1>
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

            {/* Product Listings */}
            <div className="premium-card">
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <Package size={20} className="text-primary-600" />
                        <h2 className="text-lg font-black text-primary-900">Product Listings</h2>
                    </div>
                    <button onClick={() => setShowAddForm(!showAddForm)} className="btn-premium py-2 px-5 text-sm flex items-center gap-2">
                        <Plus size={16} /> Add Product
                    </button>
                </div>

                {/* Add Product Form */}
                {showAddForm && (
                    <form onSubmit={handleAddProduct} className="mb-6 p-5 rounded-2xl bg-primary-50 border border-primary-100 space-y-3">
                        <p className="text-sm font-black text-primary-800">New Product</p>
                        <div className="grid grid-cols-2 gap-3">
                            <input required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                placeholder="Product name" className="px-4 py-2 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none text-sm font-medium" />
                            <input required value={newProduct.nutrients} onChange={e => setNewProduct({ ...newProduct, nutrients: e.target.value })}
                                placeholder="Nutrient composition" className="px-4 py-2 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none text-sm font-medium" />
                            <input required type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                placeholder="Price per bag (₹)" className="px-4 py-2 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none text-sm font-medium" />
                            <input value={newProduct.suitable} onChange={e => setNewProduct({ ...newProduct, suitable: e.target.value })}
                                placeholder="Suitable crops" className="px-4 py-2 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none text-sm font-medium" />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="btn-premium py-2 px-5 text-sm">Add</button>
                            <button type="button" onClick={() => setShowAddForm(false)} className="btn-premium-outline py-2 px-5 text-sm">Cancel</button>
                        </div>
                    </form>
                )}

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(product => (
                        <div key={product.id} className="p-5 rounded-2xl border-2 border-primary-50 bg-surface-50 hover:border-primary-200 transition-all hover-lift">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="font-black text-gray-800">{product.name}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{product.nutrients}</p>
                                </div>
                                <button onClick={() => toggleAvailability(product.id)}
                                    className={`text-xs font-black px-2.5 py-1 rounded-full transition-colors ${product.available ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {product.available ? 'Live' : 'Paused'}
                                </button>
                            </div>
                            <p className="text-2xl font-black text-primary-700">₹{product.price}<span className="text-sm font-medium text-gray-400">/bag</span></p>
                            <p className="text-xs text-gray-500 mt-1">✅ {product.suitable}</p>
                            <div className="flex gap-2 mt-4">
                                <button className="btn-premium py-1.5 px-3 text-xs flex items-center gap-1"><Edit2 size={12} /> Edit</button>
                                <button onClick={() => toggleAvailability(product.id)}
                                    className="btn-premium-outline py-1.5 px-3 text-xs flex items-center gap-1">
                                    {product.available ? <ToggleRight size={12} /> : <ToggleLeft size={12} />}
                                    {product.available ? 'Pause' : 'Activate'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Inquiry Notifications */}
            <div className="premium-card">
                <div className="flex items-center gap-2 mb-5">
                    <Bell size={20} className="text-primary-600" />
                    <h2 className="text-lg font-black text-primary-900">Inquiry Notifications</h2>
                </div>
                <div className="space-y-3">
                    {mockInquiries.map(inq => (
                        <div key={inq.id} className="flex items-center justify-between p-4 rounded-2xl bg-surface-200 hover-lift flex-wrap gap-2">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-black text-sm">
                                    {inq.farmer[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{inq.farmer}</p>
                                    <p className="text-xs text-gray-500">{inq.product} · {inq.quantity}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-400">{inq.time}</span>
                                <button className="btn-premium py-1.5 px-4 text-xs">Reply</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
