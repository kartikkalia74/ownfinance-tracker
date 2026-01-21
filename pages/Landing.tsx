import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerEmail, checkEmailExists } from '../services/emailService';

// Declare gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

const CAROUSEL_FEATURES = [
  {
    id: 'dashboard',
    title: "Crystal Clear Overview",
    description: "Experience financial clarity with a dashboard that transforms complex data into intuitive, actionable insights at a glance.",
  },
  {
    id: 'tracking',
    title: "Precision Tracking",
    description: "Every rupee accounted for. Our intelligent system categorizes your spending automatically, giving you the power to optimize your budget.",
  },
  {
    id: 'import',
    title: "Effortless Integration",
    description: "Connect seamlessly. Drag & drop statements or sync with your email. We handle the heavy lifting of data entry for you.",
  },
  {
    id: 'privacy',
    title: "Uncompromising Privacy",
    description: "Your data stays with you. We value your financial secrecy with a strict local-first architecture. Zero server-side storage.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
  }
];

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// --- DATA & VISUALS ---
const CHART_DATA = [
  { name: 'Mon', spend: 4000 },
  { name: 'Tue', spend: 3000 },
  { name: 'Wed', spend: 2000 },
  { name: 'Thu', spend: 2780 },
  { name: 'Fri', spend: 1890 },
  { name: 'Sat', spend: 6390 },
  { name: 'Sun', spend: 3490 },
];

const RECENT_TRANSACTIONS = [
  { id: 1, name: 'Netflix Subscription', date: 'Today, 9:41 AM', amount: -649, icon: 'movie', color: 'bg-red-100 text-red-600' },
  { id: 2, name: 'Salary Credit', date: 'Yesterday, 5:00 PM', amount: 85000, icon: 'account_balance', color: 'bg-green-100 text-green-600' },
  { id: 3, name: 'Grocery Store', date: 'Yesterday, 2:30 PM', amount: -2450, icon: 'shopping_cart', color: 'bg-orange-100 text-orange-600' },
];

const MockDashboard = () => (
  <div className="w-full h-full bg-slate-50 p-4 md:p-6 flex flex-col gap-6 overflow-hidden rounded-3xl border border-slate-200 shadow-inner">
    {/* Header Stats */}
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-2 text-slate-500 text-xs font-bold uppercase tracking-wide">
          <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
          Total Balance
        </div>
        <div className="text-3xl font-black text-slate-900">₹1,24,500</div>
        <div className="text-xs font-medium text-green-600 mt-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          +12.5% vs last month
        </div>
      </div>
      <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-2 text-slate-500 text-xs font-bold uppercase tracking-wide">
          <span className="material-symbols-outlined text-lg">credit_card</span>
          Monthly Spend
        </div>
        <div className="text-3xl font-black text-slate-900">₹42,390</div>
        <div className="text-xs font-medium text-slate-400 mt-1">
          45% of budget used
        </div>
      </div>
    </div>

    {/* Chart */}
    <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-800">Weekly Activity</h4>
        <select className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium px-2 py-1 text-slate-600 outline-none">
          <option>This Week</option>
        </select>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={CHART_DATA}>
            <defs>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }}
            />
            <Area type="monotone" dataKey="spend" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const MockTransactions = () => (
  <div className="w-full h-full bg-slate-50 p-4 md:p-6 overflow-hidden rounded-3xl border border-slate-200 shadow-inner flex flex-col">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-xl text-slate-900">Recent Transactions</h3>
      <button className="text-blue-600 text-sm font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">See All</button>
    </div>

    <div className="space-y-3 overflow-hidden relative">
      {/* Fade overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-10"></div>

      {[...RECENT_TRANSACTIONS, ...RECENT_TRANSACTIONS].map((tx, i) => (
        <div key={`${tx.id}-${i}`} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-4">
            <div className={`size-12 rounded-full ${tx.color} flex items-center justify-center`}>
              <span className="material-symbols-outlined">{tx.icon}</span>
            </div>
            <div>
              <div className="font-bold text-slate-800">{tx.name}</div>
              <div className="text-xs font-medium text-slate-400">{tx.date}</div>
            </div>
          </div>
          <div className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
            {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MockImport = () => (
  <div className="w-full h-full flex flex-col md:flex-row bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-inner font-display">
    {/* Upload Side */}
    <div className="w-full md:w-1/2 p-8 bg-white border-b md:border-b-0 md:border-r border-slate-100 flex flex-col items-center justify-center text-center relative group">
      <div className="absolute inset-4 border-2 border-dashed border-slate-200 rounded-2xl group-hover:border-blue-400 group-hover:bg-blue-50/50 transition-all duration-300 pointer-events-none"></div>

      <div className="size-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-300">
        <span className="material-symbols-outlined text-4xl">upload_file</span>
      </div>
      <h3 className="font-bold text-lg text-slate-900 mb-2">Drop Statements Here</h3>
      <p className="text-sm text-slate-500 max-w-[200px] leading-relaxed">
        Support for HDFC, SBI, ICICI, and standard CSV formats.
      </p>
      <button className="mt-6 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg shadow-lg hover:bg-slate-800 transition-all">Browse Files</button>
    </div>

    {/* Email Side */}
    <div className="w-full md:w-1/2 p-8 bg-slate-50 flex flex-col items-center justify-center text-center">
      <div className="size-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-100">
        <span className="material-symbols-outlined text-4xl">mark_email_unread</span>
      </div>
      <h3 className="font-bold text-lg text-slate-900 mb-2">Sync with Email</h3>
      <p className="text-sm text-slate-500 max-w-[200px] leading-relaxed">
        Connect Gmail or Outlook to auto-parse receipts and bills.
      </p>
      <div className="flex gap-3 mt-6">
        <div className="h-10 w-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-red-500 font-bold text-lg cursor-pointer hover:scale-110 transition-transform">G</div>
        <div className="h-10 w-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-blue-500 font-bold text-lg cursor-pointer hover:scale-110 transition-transform">O</div>
      </div>
    </div>
  </div>
);

const Landing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  // Check registration status on mount
  useEffect(() => {
    const registered = localStorage.getItem('ownfinance_beta_access') === 'true';
    setIsRegistered(registered);
  }, []);

  // Handle Scroll Effect for Header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_FEATURES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

    if (!SCRIPT_URL) {
      console.warn("VITE_GOOGLE_SHEET_URL not set. Email storage will not work.");
      // Fallback for visual feedback if URL is missing
      setStatus('loading');
      setTimeout(() => {
        setStatus('success');
        trackEvent('email_submission_success', { event_category: 'conversion', event_label: 'success', value: 1 });
        localStorage.setItem('ownfinance_beta_access', 'true');
        setIsRegistered(true);
        setTimeout(() => setShowRegister(false), 4000);
      }, 1500);
      return;
    }

    setStatus('loading');
    trackEvent('email_submitted', { event_category: 'engagement', event_label: 'early_access_signup', value: 1 });

    try {
      const result = await registerEmail(email);

      if (result.status === 'success') {
        setStatus('success');
        trackEvent('email_submission_success', { event_category: 'conversion', event_label: 'success', value: 1 });
        localStorage.setItem('ownfinance_beta_access', 'true');
        setIsRegistered(true);
        setTimeout(() => {
          setShowRegister(false);
          setStatus('idle');
          setEmail('');
        }, 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-display selection:bg-blue-100 selection:text-blue-900">

      {/* Registration Modal Overlay */}
      {showRegister && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowRegister(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 animate-in zoom-in-95 duration-300 border border-white/20 ring-1 ring-black/5">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="p-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30 text-white mb-6 transform -rotate-3">
                  <span className="material-symbols-outlined text-3xl">mark_email_unread</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Join the Future</h2>
                <p className="text-slate-500 leading-relaxed">Secure your spot for early access. We're building the last finance tracker you'll ever need.</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-lg font-medium text-slate-800 placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full font-bold py-4 rounded-xl shadow-xl transition-all transform active:scale-[0.98] ${status === 'success'
                    ? 'bg-green-500 text-white shadow-green-500/30'
                    : status === 'error'
                      ? 'bg-red-500 text-white shadow-red-500/30'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:shadow-blue-600/40'
                    }`}
                >
                  {status === 'loading' ? 'Verifying...' : status === 'success' ? 'Welcome! Click Beta Access in Header 🚀' : status === 'error' ? 'Oops! Try Again' : 'Request Access'}
                </button>
              </form>
              <p className="mt-6 text-center text-xs font-medium text-slate-400">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3 font-extrabold text-xl tracking-tight text-slate-900 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.gif" alt="OwnFinance" className="size-10 rounded-xl shadow-lg shadow-blue-500/20" />
            <span>OwnFinance</span>
          </div>

          <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
              {['Overview', 'Features', 'Privacy'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-blue-600 transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </button>
              ))}
              {isRegistered && (
                <Link to="/beta-access" className="hover:text-blue-600 transition-colors relative group">
                  Beta Access
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </Link>
              )}
            </nav>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowRegister(true)}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 hover:shadow-lg transition-all active:scale-95"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 inset-x-0 h-screen bg-white pointer-events-none -z-10"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wide mb-8 hover:bg-blue-100 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Now in Private Beta
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
            Master Your Money <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Without the Spyware</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
            The modern, local-first finance tracker that utilizes device-side AI to analyze your spending. Your data never leaves your machine.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              onClick={() => setShowRegister(true)}
              className="h-14 px-8 rounded-full bg-blue-600 text-white text-lg font-bold shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Start Tracking Free
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button
              onClick={() => scrollToSection('overview')}
              className="h-14 px-8 rounded-full bg-white text-slate-700 text-lg font-bold border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">play_circle</span>
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Feature Showcase (Carousel) */}
      <section id="overview" className="px-6 pb-32 max-w-7xl mx-auto w-full">
        <div className="bg-slate-900 rounded-[2.5rem] p-4 md:p-6 shadow-2xl relative overflow-hidden group">
          {/* Glossy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10"></div>

          <div className="flex flex-col lg:flex-row gap-8 h-[700px] lg:h-[600px]">
            {/* Visual Side */}
            <div className="w-full lg:w-2/3 h-1/2 lg:h-full relative rounded-3xl overflow-hidden bg-slate-800 border border-white/5 shadow-inner">
              {CAROUSEL_FEATURES.map((feature, idx) => (
                <div
                  key={feature.id}
                  className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${idx === activeIndex ? 'translate-x-0 opacity-100' :
                    idx < activeIndex ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
                    }`}
                >
                  {feature.id === 'dashboard' ? (
                    <div className="w-full h-full p-8 md:p-12 pointer-events-none select-none">
                      <MockDashboard />
                    </div>
                  ) : feature.id === 'tracking' ? (
                    <div className="w-full h-full p-8 md:p-12 pointer-events-none select-none">
                      <MockTransactions />
                    </div>
                  ) : feature.id === 'import' ? (
                    <div className="w-full h-full p-8 md:p-12 pointer-events-none select-none">
                      <MockImport />
                    </div>
                  ) : (
                    <div className="w-full h-full">
                      <img src={feature.image} className="w-full h-full object-cover opacity-80" alt={feature.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-800 to-transparent lg:hidden"></div>
                </div>
              ))}
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/3 p-6 md:p-12 flex flex-col justify-center relative z-20">
              <div className="space-y-12">
                {CAROUSEL_FEATURES.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`cursor-pointer transition-all duration-300 group/item ${idx === activeIndex ? 'opacity-100 translate-x-4' : 'opacity-40 hover:opacity-70'}`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`h-1 rounded-full transition-all duration-500 ${idx === activeIndex ? 'w-12 bg-blue-500' : 'w-4 bg-slate-600 group-hover/item:bg-slate-500'}`}></div>
                      <h3 className={`text-xl font-bold transition-colors ${idx === activeIndex ? 'text-white' : 'text-slate-400'}`}>{feature.title}</h3>
                    </div>
                    <p className={`ml-16 text-sm leading-relaxed transition-all duration-500 ${idx === activeIndex ? 'text-slate-300 max-h-40 opacity-100' : 'text-slate-500 max-h-0 opacity-0 overflow-hidden'}`}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Everything You Need.</h2>
            <p className="text-xl text-slate-500">Powerful tools packed into a beautiful, lightweight interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'event_repeat', title: 'Subscription Manager', desc: 'Never miss a payment. Track recurring bills and cancel unwanted subscriptions.' },
              { icon: 'category', title: 'Smart Categorization', desc: 'Clean & categorize messy bank statements automatically for accurate tracking.' },
              { icon: 'cloud_upload', title: 'Universal Import', desc: 'Supports PDF statements from HDFC, SBI, ICICI, and more. Plus CSV and email-based parsing.' },

              { icon: 'smart_toy', title: 'AI Assistant', desc: 'Chat with your finances. Ask "How much did I spend on coffee?" and get instant answers powered by local AI.', comingSoon: true },
              { icon: 'lock_person', title: 'Local Encryption', desc: 'Bank-grade encryption on your device. We maximize security by minimizing data exposure.' },
              { icon: 'handshake', title: 'Lend & Borrow', desc: 'Track loans and debts. Keep tabs on shared expenses and know exactly who owes you what.' },

              { icon: 'calendar_month', title: 'Smart Budgeting', desc: 'Auto-generated budgets based on your spending habits. Stay on track effortlessly.', comingSoon: true },
              { icon: 'insights', title: 'Visual Analytics', desc: 'Stunning charts and graphs that make it fun to explore your spending patterns.' },

            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden">
                <div className="size-14 bg-white rounded-2xl border border-slate-100 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  {item.title}
                  {item.comingSoon && (
                    <span className="bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full">Soon</span>
                  )}
                </h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Callout */}
      <section id="privacy" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-[3rem] p-8 md:p-24 text-center relative overflow-hidden">
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center size-20 bg-white/10 backdrop-blur-md rounded-2xl text-white mb-8 border border-white/10 shadow-2xl">
              <span className="material-symbols-outlined text-4xl">security</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Your Financial Data <br /> Is None of Our Business.</h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              We built OwnFinance because we were tired of finance apps collecting and selling user data.
              Our code is transparent, our storage is local, and our commitment to your privacy is absolute.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-3 text-white">
                <span className="material-symbols-outlined text-green-400">check_circle</span>
                <span>Offline First</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-3 text-white">
                <span className="material-symbols-outlined text-green-400">check_circle</span>
                <span>No Tracking Pixels</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-3 text-white">
                <span className="material-symbols-outlined text-green-400">check_circle</span>
                <span>Open Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 font-black text-2xl text-slate-900 mb-6">
                <img src="/logo.gif" alt="OwnFinance" className="size-8 rounded-lg" />
                OwnFinance.
              </div>
              <p className="text-slate-500 max-w-xs">Restoring privacy and simplicity to personal finance tracking.</p>
            </div>
            <div className="flex gap-16">
              <div>
                <h4 className="font-bold text-slate-900 mb-6">Product</h4>
                <ul className="space-y-4 text-slate-500">
                  <li><button onClick={() => scrollToSection('features')} className="hover:text-blue-600 transition-colors">Features</button></li>
                  <li><button onClick={() => setShowRegister(true)} className="hover:text-blue-600 transition-colors">Pricing</button></li>
                  <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link></li>
                  <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                  {isRegistered && (
                    <li><Link to="/beta-access" className="hover:text-blue-600 transition-colors">Beta Access</Link></li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                <ul className="space-y-4 text-slate-500">
                  <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 gap-4">
            <p className="text-slate-400 text-sm">© 2025 OwnFinance. Made with ❤️ for privacy.</p>
            <div className="flex gap-6 text-slate-400">
              <a href="#" className="hover:text-blue-600 transition-colors"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="hover:text-blue-600 transition-colors"><i className="fa-brands fa-github"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;