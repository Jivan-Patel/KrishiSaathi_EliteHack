import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Truck, CheckCircle, Clock, Package, MapPin, Phone, DollarSign, Globe } from 'lucide-react';
import { API_BASE_URL } from '../../config';

const overviewCards = [
    { label: 'Active Jobs', value: 2, icon: Truck, color: 'bg-primary-50 text-primary-600' },
    { label: 'Completed Deliveries', value: 17, icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Pending Requests', value: 5, icon: Clock, color: 'bg-amber-50 text-amber-600' },
];

const STATUS_STYLES = {
    'Pending': 'bg-amber-100 text-amber-700',
    'In Transit': 'bg-blue-100 text-blue-700',
    'Delivered': 'bg-primary-100 text-primary-700',
};

const initialMyJobs = [];

const TransporterDashboard = () => {
    const { user, logout } = useAuth();
    const [myJobs, setMyJobs] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?._id) {
            fetchAllData();
        }
    }, [user]);

    const fetchAllData = async () => {
        setLoading(true);
        await Promise.all([fetchAvailableRequests(), fetchMyJobs()]);
        setLoading(false);
    };

    const fetchAvailableRequests = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/transport`);
            const data = await res.json();
            const farmerRequests = (Array.isArray(data) ? data : []).filter(req => req.userRole === 'farmer');
            setRequests(farmerRequests);
        } catch (err) {
            console.error('Error fetching available requests:', err);
        }
    };

    const fetchMyJobs = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/transport/my-jobs/${user._id}`);
            const data = await res.json();
            setMyJobs(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching my jobs:', err);
        }
    };

    const acceptJob = async (req) => {
        try {
            const res = await fetch(`${API_BASE_URL}/transport/accept/${req._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id })
            });

            if (res.ok) {
                fetchAllData(); // Refresh both lists
            } else {
                const data = await res.json();
                alert(data.message || 'Failed to accept job');
            }
        } catch (err) {
            console.error('Error accepting job:', err);
        }
    };

    const cycleStatus = async (job) => {
        const cycle = ['Pending', 'In Transit', 'Delivered'];
        const nextStatus = cycle[(cycle.indexOf(job.status) + 1) % cycle.length];

        try {
            const res = await fetch(`${API_BASE_URL}/transport/status/${job._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: nextStatus })
            });

            if (res.ok) {
                fetchMyJobs(); // Refresh my jobs list
            }
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const savePricing = (e) => {
        e.preventDefault();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 entry-fade">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-black text-primary-900">Transporter Dashboard</h1>
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

            {/* Available Requests */}
            <div className="premium-card">
                <div className="flex items-center gap-2 mb-5">
                    <Package size={20} className="text-primary-600" />
                    <h2 className="text-lg font-black text-primary-900">Available Transport Requests</h2>
                </div>
                {requests.length === 0 ? (
                    <p className="text-center text-gray-400 py-8 font-medium">No pending requests right now.</p>
                ) : (
                    <div className="space-y-3">
                        {requests.map(req => (
                            <div key={req._id} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-surface-200 border border-primary-50 hover:border-primary-200 hover-lift transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-primary-50">
                                        <Truck size={18} className="text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-800">{req.crop} · {req.quantity}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                            <MapPin size={11} /> {req.pickup} → {req.destination}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider ${STATUS_STYLES[req.status] || 'bg-gray-100 text-gray-600'}`}>
                                        {req.status}
                                    </span>
                                    <div className="flex gap-2">
                                        <button onClick={() => acceptJob(req)} className="btn-premium py-2 px-4 text-sm">Accept Job</button>
                                        <a href="tel:9000000000" className="btn-premium-outline py-2 px-4 text-sm flex items-center gap-1.5">
                                            <Phone size={14} /> Contact
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* My Jobs */}
            <div className="premium-card">
                <div className="flex items-center gap-2 mb-5">
                    <Truck size={20} className="text-primary-600" />
                    <h2 className="text-lg font-black text-primary-900">My Jobs</h2>
                    <span className="ml-auto text-xs text-gray-400 font-medium">Click status to advance</span>
                </div>
                {myJobs.length === 0 ? (
                    <p className="text-center text-gray-400 py-8 font-medium">No accepted jobs yet.</p>
                ) : (
                    <div className="space-y-3">
                        {myJobs.map(job => (
                            <div key={job._id} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-surface-200">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="font-black text-gray-800">{job.crop} · {job.quantity}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <MapPin size={11} /> {job.pickup} → {job.destination}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">Farmer: {job.farmer || 'Farmer (Verified)'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => cycleStatus(job)}
                                        className={`text-xs font-black px-3 py-1.5 rounded-full cursor-pointer hover:opacity-80 transition-opacity ${STATUS_STYLES[job.status] || 'bg-gray-100 text-gray-600'}`}>
                                        {job.status}
                                    </button>
                                    <a href={`tel:${job.phone}`} className="btn-premium-outline py-1.5 px-3 text-xs flex items-center gap-1.5">
                                        <Phone size={12} /> Call
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default TransporterDashboard;
