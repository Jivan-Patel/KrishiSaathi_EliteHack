import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, Languages, ChevronDown, LogOut, User, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const { user, role, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const drawerRef = useRef(null);

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'हिन्दी' },
        { code: 'gu', label: 'ગુજરાતી' },
        { code: 'bn', label: 'বাংলা' },
        { code: 'mr', label: 'मराठी' },
        { code: 'te', label: 'తెలుగు' },
        { code: 'ta', label: 'தமிழ்' },
        { code: 'kn', label: 'ಕನ್ನಡ' },
        { code: 'pa', label: 'ਪੰਜਾਬੀ' }
    ];

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Close mobile menu on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target)) {
                setMobileOpen(false);
            }
        };
        if (mobileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mobileOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const navLinkClass = ({ isActive }) =>
        `h-full flex items-center px-1 border-b-2 transition-all duration-300 whitespace-nowrap ${isActive
            ? 'text-primary-600 border-primary-600 font-extrabold'
            : 'text-gray-500 border-transparent hover:text-primary-400 hover:border-primary-200 font-bold'
        }`;

    const mobileNavLinkClass = ({ isActive }) =>
        `block w-full px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${isActive
            ? 'bg-primary-100 text-primary-700 font-extrabold'
            : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
        }`;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Build nav links based on auth/role
    const getNavLinks = () => {
        if (!user) {
            return [
                { to: '/', label: t('navHome') },
                { to: '/crops', label: t('navCrops') },
                { to: '/recommendation', label: t('navAdvice') },
                { to: '/fertilizers', label: t('navInputs') },
                { to: '/community', label: t('navForum') },
                { to: '/mandi-rates', label: t('navMarket') },
                { to: '/sell', label: t('navBuyers') },
            ];
        }
        if (role === 'farmer') {
            return [
                { to: '/', label: t('navHome') },
                { to: '/recommendation', label: t('navAdvice') },
                { to: '/crops', label: t('navCrops') },
                { to: '/sell', label: t('navBuyers') },
                { to: '/transport', label: t('navTransport') },
                { to: '/community', label: t('navForum') },
                { to: '/fertilizers', label: t('navInputs') },
                { to: '/mandi-rates', label: t('navMarket') },
            ];
        }
        if (role === 'buyer') return [{ to: '/dashboard/buyer', label: 'Buyer Dashboard' }];
        if (role === 'seller') return [{ to: '/dashboard/seller', label: 'Seller Dashboard' }];
        if (role === 'transporter') return [{ to: '/dashboard/transporter', label: 'Transport Dashboard' }];
        return [];
    };

    const navLinks = getNavLinks();

    return (
        <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-primary-100 h-16 lg:h-20 px-4 lg:px-6 z-50 transition-all duration-300">
            <div className="w-full mx-auto flex justify-between items-center h-full">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 lg:gap-3 group shrink-0">
                    <div className="bg-primary-600 p-2 lg:p-2.5 rounded-xl lg:rounded-2xl group-hover:rotate-6 transition-transform shadow-sm">
                        <Sprout className="text-white" size={20} />
                    </div>
                    <span className="text-xl lg:text-2xl font-black text-primary-900 tracking-tight">KrishiSaathi</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-5 xl:gap-8 h-full text-sm overflow-auto w-[45%] no-scrollbar">
                    {navLinks.map(link => (
                        <NavLink key={link.to} to={link.to} className={navLinkClass}>{link.label}</NavLink>
                    ))}
                </div>

                {/* Right side: desktop controls + hamburger */}
                <div className="flex items-center gap-2 lg:gap-4 shrink-0">
                    {/* Transport CTA – desktop only */}
                    {(!user || role === 'farmer') && (
                        <Link to="/transport" className="hidden lg:flex btn-premium py-2.5 px-6 text-xs uppercase tracking-widest font-black shadow-lg hover:shadow-primary-200">
                            {t('navTransport')}
                        </Link>
                    )}

                    {/* Language selector – desktop only */}
                    <div className="relative hidden lg:block">
                        <button
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            className="flex items-center gap-2 p-2.5 px-4 rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100 transition-all font-black text-[10px] uppercase tracking-wider border border-primary-100"
                        >
                            <Languages size={16} />
                            <span>{language}</span>
                            <ChevronDown size={14} className={`transition-transform duration-300 ${showLangMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {showLangMenu && (
                            <div
                                onMouseLeave={() => setShowLangMenu(false)}
                                className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-primary-50 py-3 overflow-hidden z-60 animate-in fade-in slide-in-from-top-2"
                            >
                                <div className="px-4 py-1 mb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Select Language</div>
                                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                    {languages.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                toggleLanguage(lang.code);
                                                setShowLangMenu(false);
                                            }}
                                            className={`w-full text-left px-5 py-2.5 hover:bg-primary-50 text-xs font-bold transition-all ${language === lang.code ? 'text-primary-600 bg-primary-50/70 border-r-4 border-primary-600' : 'text-gray-600'}`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Auth: Login button OR Avatar + Logout – desktop only */}
                    <div className="hidden lg:flex items-center gap-3">
                        {!user ? (
                            <Link to="/login" className="btn-premium py-2.5 px-6 text-xs uppercase tracking-widest font-black">Login</Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-3 bg-white border-2 border-primary-100 rounded-full pl-1.5 pr-4 py-1 shadow-sm hover:border-primary-300 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-black shadow-inner">
                                        {user.username?.[0]?.toUpperCase() || <User size={14} />}
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                        <span className="text-[10px] font-black text-primary-900 uppercase tracking-tighter">{user.username?.split(' ')[0]}</span>
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">{role}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    title="Logout"
                                    className="p-2.5 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm border border-red-100"
                                >
                                    <LogOut size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Hamburger button – mobile only */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 transition-all border border-primary-100"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile backdrop */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ top: '64px' }}
                onClick={() => setMobileOpen(false)}
            />

            {/* Mobile Drawer */}
            <div
                ref={drawerRef}
                className={`fixed left-0 right-0 bg-white z-50 lg:hidden shadow-2xl border-b border-primary-100 transition-all duration-300 ease-in-out overflow-y-auto ${mobileOpen ? 'max-h-[calc(100vh-64px)] opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ top: '64px' }}
            >
                <div className="px-4 py-4 space-y-2">
                    {/* Nav Links */}
                    {navLinks.map(link => (
                        <NavLink key={link.to} to={link.to} className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
                            {link.label}
                        </NavLink>
                    ))}

                    {/* Divider */}
                    <div className="border-t border-primary-100 my-3" />

                    {/* Transport CTA */}
                    {(!user || role === 'farmer') && (
                        <Link
                            to="/transport"
                            className="block w-full btn-premium py-3 text-center text-xs uppercase tracking-widest font-black"
                            onClick={() => setMobileOpen(false)}
                        >
                            {t('navTransport')}
                        </Link>
                    )}

                    {/* Language selector - mobile */}
                    <div className="pt-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-2">Language</p>
                        <div className="grid grid-cols-3 gap-2">
                            {languages.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        toggleLanguage(lang.code);
                                    }}
                                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${language === lang.code ? 'bg-primary-600 text-white shadow-md' : 'bg-primary-50 text-gray-600 hover:bg-primary-100'}`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-primary-100 my-3" />

                    {/* Auth in mobile drawer */}
                    {!user ? (
                        <div className="flex gap-3">
                            <Link to="/login" className="flex-1 btn-premium py-3 text-center text-xs uppercase tracking-widest font-black" onClick={() => setMobileOpen(false)}>
                                Login
                            </Link>
                            <Link to="/signup" className="flex-1 btn-premium-outline py-3 text-center text-xs uppercase tracking-widest font-black" onClick={() => setMobileOpen(false)}>
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between gap-3 p-3 bg-primary-50 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-black shadow-inner">
                                    {user.username?.[0]?.toUpperCase() || <User size={16} />}
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-sm font-black text-primary-900">{user.username?.split(' ')[0]}</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">{role}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => { handleLogout(); setMobileOpen(false); }}
                                className="p-2.5 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm border border-red-100"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
