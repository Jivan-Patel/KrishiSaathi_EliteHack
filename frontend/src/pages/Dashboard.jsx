import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, TrendingUp, Handshake, Users, Truck, Info, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Dashboard = () => {
    const { t } = useLanguage();

    const cards = [
        { title: t('navCrops'), desc: 'Browse 50+ detailed crop guides', icon: <Sprout size={32} />, path: '/crops' },
        { title: t('navAdvice'), desc: 'Personalized crop recommendations', icon: <TrendingUp size={32} />, path: '/recommendation' },
        { title: t('navMarket'), desc: 'Live market prices across regions', icon: <Info size={32} />, path: '/mandi-rates' },
        { title: t('navForum'), desc: 'Connect with 10k+ active farmers', icon: <Users size={32} />, path: '/community' },
        { title: t('navBuyers'), desc: 'Direct access to verified buyers', icon: <Handshake size={32} />, path: '/sell' },
        { title: t('navTransport'), desc: 'Book verified transportation', icon: <Truck size={32} />, path: '/transport' },
        { title: t('navInputs'), desc: 'Direct access to fertilizers & seeds', icon: <Handshake size={32} />, path: '/fertilizers' },
    ];

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 space-y-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-primary-600 to-primary-800 text-white p-10 md:p-16 h-auto md:h-[400px] flex items-center shadow-xl entry-fade">
                <div className="relative z-10 max-w-2xl space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-primary-100">
                        <Users size={14} /> {t('welcomeBack')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black leading-tight italic">
                        {t('heroTitle')} <br />
                        <span className="text-primary-200">{t('heroSubtitle')}</span>
                    </h1>
                    <p className="text-lg text-primary-50/80 font-medium max-w-lg">
                        {t('heroDesc')}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/recommendation" className="btn-premium">
                            {t('heroButton')}
                        </Link>
                        <Link to="/crops" className="btn-premium-outline bg-transparent! text-white! border-white/30! hover:bg-white/10!">
                            {t('navCrops')}
                        </Link>
                    </div>
                </div>

                <div className="absolute right-[5%] bottom-[5%] opacity-10 hidden lg:block">
                    <Sprout size={300} strokeWidth={1} />
                </div>
            </section>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 entry-fade" style={{ animationDelay: '0.1s' }}>
                {[
                    { title: t('trustFarmers'), sub: t('trustFarmersSub'), icon: <Users size={24} /> },
                    { title: t('trustBuyers'), sub: t('trustBuyersSub'), icon: <Handshake size={24} /> },
                    { title: t('trustMandis'), sub: t('trustMandisSub'), icon: <Info size={24} /> },
                    { title: t('trustLogistics'), sub: t('trustLogisticsSub'), icon: <Truck size={24} /> },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-primary-50 shadow-sm hover-lift group">
                        <div className="bg-primary-50 text-primary-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-all">
                            {stat.icon}
                        </div>
                        <h4 className="text-lg font-black text-gray-900 leading-tight">{stat.title}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary-500 mt-1">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                    <Link key={idx} to={card.path} className="premium-card group hover:scale-[1.02]">
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-primary-50 text-primary-600 p-4 rounded-2xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                {card.icon}
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-primary-400 transition-colors" size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">{card.title}</h3>
                        <p className="text-gray-500 font-medium text-sm leading-relaxed">{card.desc}</p>
                    </Link>
                ))}
            </div>

            {/* Quick Stats or Trust Callout */}
            <div className="bg-primary-50 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between border border-primary-100 gap-6">
                <div>
                    <h3 className="text-2xl font-black text-primary-900">{t('footerTrustTitle')}</h3>
                    <p className="text-primary-700/60 font-semibold">{t('footerTrustDesc')}</p>
                </div>
                <Link to="/sell" className="btn-premium">
                    {t('footerTrustButton')}
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;

