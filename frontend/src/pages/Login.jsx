import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sprout, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';

const ROLE_REDIRECTS = {
    farmer: '/',
    buyer: '/dashboard/buyer',
    seller: '/dashboard/seller',
    transporter: '/dashboard/transporter',
};

const DEMO_USERS = [
    { role: 'Farmer', email: 'farmer@krishisaathi.com', password: 'farmer123' },
    { role: 'Buyer', email: 'buyer@krishisaathi.com', password: 'buyer123' },
    { role: 'Seller', email: 'seller@krishisaathi.com', password: 'seller123' },
    { role: 'Transporter', email: 'transporter@krishisaathi.com', password: 'transporter123' },
];

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(ROLE_REDIRECTS[user.role] || '/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(
                `${API_BASE_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            );
            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Invalid credentials. Please try again.');
                return;
            }

            login(data);
            navigate(ROLE_REDIRECTS[data.role] || '/');
        } catch {
            setError('Cannot connect to server. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const fillDemo = (demo) => {
        setEmail(demo.email);
        setPassword(demo.password);
        setError('');
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
                    <p className="mt-3 text-gray-500 font-medium">Sign in to your account</p>
                </div>

                {/* Card */}
                <div className="premium-card entry-fade" style={{ animationDelay: '0.1s' }}>
                    <h1 className="text-2xl font-black text-primary-900 mb-6">Welcome Back 👋</h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
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
                            {loading ? 'Signing in…' : 'Sign In →'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 font-medium">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary-600 font-bold hover:underline">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Demo credentials */}
                <div className="mt-6 premium-card entry-fade" style={{ animationDelay: '0.2s' }}>
                    <p className="text-sm font-black text-primary-700 mb-3">🎯 Demo Credentials</p>
                    <div className="grid grid-cols-2 gap-2">
                        {DEMO_USERS.map(demo => (
                            <button
                                key={demo.role}
                                onClick={() => fillDemo(demo)}
                                className="text-left p-3 rounded-2xl bg-primary-50 hover:bg-primary-100 transition-colors border border-primary-100 hover:border-primary-200"
                            >
                                <p className="text-xs font-black text-primary-700">{demo.role}</p>
                                <p className="text-xs text-gray-500 truncate">{demo.email}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
