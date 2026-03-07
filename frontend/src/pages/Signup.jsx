import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sprout, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, Briefcase } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';

const ROLE_REDIRECTS = {
    farmer: '/',
    buyer: '/dashboard/buyer',
    seller: '/dashboard/seller',
    transporter: '/dashboard/transporter',
};

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'farmer'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(ROLE_REDIRECTS[user.role] || '/');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Registration failed. Please try again.');
                return;
            }

            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch {
            setError('Cannot connect to server. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface-100 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8 entry-fade">
                    <Link to="/" className="inline-flex items-center gap-3 group">
                        <div className="bg-primary-600 p-3 rounded-2xl group-hover:rotate-6 transition-transform shadow-lg">
                            <Sprout className="text-white" size={28} />
                        </div>
                        <span className="text-3xl font-black text-primary-900 tracking-tight">KrishiSaathi</span>
                    </Link>
                    <p className="mt-3 text-gray-500 font-medium">Create your ecosystem account</p>
                </div>

                {/* Card */}
                <div className="premium-card entry-fade" style={{ animationDelay: '0.1s' }}>
                    <h1 className="text-2xl font-black text-primary-900 mb-6">Join Us 🚀</h1>

                    {success ? (
                        <div className="text-center py-8 space-y-4">
                            <div className="mx-auto w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                                <CheckCircle size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-primary-900">Account Created!</h2>
                            <p className="text-gray-500">Redirecting you to login...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none bg-surface-50 text-gray-800 font-medium transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="you@example.com"
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none bg-surface-50 text-gray-800 font-medium transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-3 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none bg-surface-50 text-gray-800 font-medium transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">I am a...</label>
                                <div className="relative">
                                    <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-primary-100 focus:border-primary-400 focus:outline-none bg-surface-50 text-gray-800 font-medium transition-colors appearance-none"
                                    >
                                        <option value="farmer">Farmer</option>
                                        <option value="buyer">Buyer</option>
                                        <option value="seller">Seller</option>
                                        <option value="transporter">Transporter</option>
                                    </select>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-2xl px-4 py-3 text-sm font-medium">
                                    <AlertCircle size={16} />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-premium w-full py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating Account…' : 'Create Account →'}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-600 font-bold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
