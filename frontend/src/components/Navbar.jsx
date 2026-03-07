import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Sprout, Languages, ChevronDown, LogOut, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const { user, role, logout } = useAuth();
    const navigate = useNavigate();
    const [showLangMenu, setShowLangMenu] = useState(false);

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

    const navLinkClass = ({ isActive }) =>
        `h-full flex items-center px-1 border-b-2 transition-all duration-300 ${isActive
            ? 'text-primary-600 border-primary-600 font-extrabold'
            : 'text-gray-500 border-transparent hover:text-primary-400 hover:border-primary-200 font-bold'
        }`;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-primary-100 h-20 px-6 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group shrink-0">
                    <div className="bg-primary-600 p-2.5 rounded-2xl group-hover:rotate-6 transition-transform shadow-sm">
                        <Sprout className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-black text-primary-900 tracking-tight">KrishiSaathi</span>
                </Link>

                {/* Nav Links – role-aware */}
                <div className="hidden lg:flex items-center gap-5 xl:gap-8 h-full text-sm">
                    {!user && (
                        <>
                            <NavLink to="/" className={navLinkClass}>{t('navHome')}</NavLink>
                            <NavLink to="/crops" className={navLinkClass}>{t('navCrops')}</NavLink>
                            <NavLink to="/recommendation" className={navLinkClass}>{t('navAdvice')}</NavLink>
                            <NavLink to="/fertilizers" className={navLinkClass}>{t('navInputs')}</NavLink>
                            <NavLink to="/community" className={navLinkClass}>{t('navForum')}</NavLink>
                            <NavLink to="/mandi-rates" className={navLinkClass}>{t('navMarket')}</NavLink>
                            <NavLink to="/sell" className={navLinkClass}>{t('navBuyers')}</NavLink>
                        </>
                    )}

                    {user && role === 'farmer' && (
                        <>
                            <NavLink to="/" className={navLinkClass}>{t('navHome')}</NavLink>
                            <NavLink to="/recommendation" className={navLinkClass}>{t('navAdvice')}</NavLink>
                            <NavLink to="/crops" className={navLinkClass}>{t('navCrops')}</NavLink>
                            <NavLink to="/sell" className={navLinkClass}>{t('navBuyers')}</NavLink>
                            <NavLink to="/transport" className={navLinkClass}>{t('navTransport')}</NavLink>
                            <NavLink to="/community" className={navLinkClass}>{t('navForum')}</NavLink>
                            <NavLink to="/fertilizers" className={navLinkClass}>{t('navInputs')}</NavLink>
                            <NavLink to="/mandi-rates" className={navLinkClass}>{t('navMarket')}</NavLink>
                        </>
                    )}

                    {user && role === 'buyer' && (
                        <NavLink to="/dashboard/buyer" className={navLinkClass}>Buyer Dashboard</NavLink>
                    )}

                    {user && role === 'seller' && (
                        <NavLink to="/dashboard/seller" className={navLinkClass}>Seller Dashboard</NavLink>
                    )}

                    {user && role === 'transporter' && (
                        <NavLink to="/dashboard/transporter" className={navLinkClass}>Transport Dashboard</NavLink>
                    )}
                </div>

                {/* Right side: transport btn / auth + language */}
                <div className="flex items-center gap-4 shrink-0">
                    {/* Transport CTA – only for logged-out or farmer */}
                    {(!user || role === 'farmer') && (
                        <Link to="/transport" className="hidden sm:flex btn-premium py-2.5 px-6 text-xs uppercase tracking-widest font-black shadow-lg hover:shadow-primary-200">
                            {t('navTransport')}
                        </Link>
                    )}

                    {/* Language selector */}
                    <div className="relative">
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

                    {/* Auth: Login button OR Avatar + Logout */}
                    {!user ? (
                        <Link to="/login" className="btn-premium py-2.5 px-6 text-xs uppercase tracking-widest font-black">Login</Link>
                    ) : (
                        <div className="flex items-center gap-3">
                            {/* Avatar chip */}
                            <div className="flex items-center gap-3 bg-white border-2 border-primary-100 rounded-full pl-1.5 pr-4 py-1 shadow-sm hover:border-primary-300 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-black shadow-inner">
                                    {user.username?.[0]?.toUpperCase() || <User size={14} />}
                                </div>
                                <div className="hidden lg:flex flex-col leading-tight">
                                    <span className="text-[10px] font-black text-primary-900 uppercase tracking-tighter">{user.username?.split(' ')[0]}</span>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">{role}</span>
                                </div>
                            </div>
                            {/* Logout */}
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
            </div>
        </nav>
    );
};

export default Navbar;
