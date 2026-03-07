import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, Send, ThumbsUp, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../config';

const Community = () => {
    const { t } = useLanguage();
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [replyText, setReplyText] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchQuestions = () => {
        axios.get(`${API_BASE_URL}/community/questions`)
            .then(res => {
                setQuestions(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handlePostQuestion = (e) => {
        e.preventDefault();
        if (!newQuestion.trim()) return;
        axios.post(`${API_BASE_URL}/community/questions`, { question: newQuestion })
            .then(() => {
                setNewQuestion('');
                fetchQuestions();
            });
    };

    const handlePostReply = (id) => {
        if (!replyText[id]?.trim()) return;
        axios.post(`${API_BASE_URL}/community/questions/${id}/reply`, { text: replyText[id] })
            .then(() => {
                setReplyText({ ...replyText, [id]: '' });
                fetchQuestions();
            });
    };

    const handleUpvote = (id) => {
        axios.post(`${API_BASE_URL}/community/questions/${id}/upvote`)
            .then(() => fetchQuestions());
    };

    if (loading) return <div className="p-20 text-center font-black text-primary-600 text-2xl italic">{t('loadingIntelligence')}</div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 mb-20">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Discussion Panel */}
                <div className="flex-1 space-y-8 min-w-0">
                    <div className="flex items-center justify-between px-2">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 italic tracking-tight uppercase">{t('forumTitle')}</h1>
                            <p className="text-gray-500 font-bold mt-2">{questions.length} {t('forumSubtitle')}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {questions.map(q => (
                            <article key={q._id} className="premium-card hover:translate-y-0 hover:border-primary-200">
                                <div className="flex justify-between items-start gap-6 mb-8">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-black text-xl border-2 border-white shadow-sm shrink-0">
                                            {q.question.charAt(1).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-[8px] font-black rounded uppercase tracking-widest border border-primary-100">Verified Farmer</span>
                                                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[8px] font-black rounded uppercase tracking-widest">{['Pest Control', 'Irrigation', 'Market Intel'][q.upvotes % 3]}</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-primary-900 leading-tight italic pr-4">"{q.question}"</h3>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">{new Date().toLocaleDateString()} • {q.replies.length} replies</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleUpvote(q._id)}
                                        className="bg-primary-50 text-primary-700 p-4 rounded-2xl flex flex-col items-center gap-1 group/vote active:scale-95 transition-all shadow-sm border border-primary-100 min-w-[70px]"
                                    >
                                        <ThumbsUp size={24} className="group-hover/vote:rotate-[-10deg] transition-transform" />
                                        <span className="text-sm font-black italic">{q.upvotes}</span>
                                    </button>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {q.replies.length > 0 ? q.replies.map((reply, i) => (
                                        <div key={i} className="bg-surface-200 p-6 rounded-4xl border border-primary-50 relative group">
                                            <div className="absolute left-0 top-6 w-1 h-8 bg-primary-200 rounded-r-full"></div>
                                            <p className="text-gray-700 font-bold text-sm leading-relaxed">{reply.text}</p>
                                            <p className="text-[10px] text-primary-400 mt-2 font-black uppercase tracking-widest">{new Date(reply.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    )) : (
                                        <p className="text-gray-400 font-bold italic text-sm p-4 text-center">No contributions yet. Be the first to share intel.</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 bg-surface-100 p-2 rounded-2xl border border-primary-50">
                                    <input
                                        type="text"
                                        placeholder="Contribute to discussion..."
                                        className="flex-1 bg-transparent px-4 py-3 outline-none font-bold text-gray-700 placeholder:text-gray-300 text-sm"
                                        value={replyText[q._id] || ''}
                                        onChange={e => setReplyText({ ...replyText, [q._id]: e.target.value })}
                                    />
                                    <button
                                        onClick={() => handlePostReply(q._id)}
                                        className="bg-primary-600 text-white p-3 rounded-xl hover:bg-primary-700 transition-colors shadow-lg active:scale-95"
                                    >
                                        <MessageSquare size={20} />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Action Panel */}
                <aside className="lg:w-[400px] w-full sticky top-28 space-y-6">
                    <div className="bg-primary-600 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-3xl font-black italic tracking-tight">Post Your Intel</h2>
                            <p className="text-primary-100 font-bold opacity-80 leading-relaxed">Share questions with our community of 10,000+ localized farming experts.</p>

                            <form onSubmit={handlePostQuestion} className="space-y-4">
                                <textarea
                                    placeholder="Describe your situation..."
                                    className="w-full p-6 rounded-3xl bg-white/10 border-2 border-white/20 text-white font-bold outline-none focus:border-white focus:bg-white/20 transition-all h-32 placeholder:text-white/40"
                                    value={newQuestion}
                                    onChange={e => setNewQuestion(e.target.value)}
                                />
                                <button type="submit" className="w-full bg-white text-primary-700 font-black py-4 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Send size={24} /> Broadcast Question
                                </button>
                            </form>
                        </div>
                        <div className="absolute right-[-20%] top-[-20%] opacity-10">
                            <HelpCircle size={250} strokeWidth={1} />
                        </div>
                    </div>

                    <div className="premium-card bg-primary-50 border-primary-100 shadow-none">
                        <h4 className="text-xs font-black text-primary-600 uppercase tracking-[0.2em] mb-4">Forum Guidelines</h4>
                        <ul className="space-y-3 text-xs font-bold text-primary-800 opacity-80">
                            <li className="flex gap-2"><span>1.</span> Be respectful to fellow farmers.</li>
                            <li className="flex gap-2"><span>2.</span> Share localized insights.</li>
                            <li className="flex gap-2"><span>3.</span> Upvote helpful contributions.</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};


export default Community;
