import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Transactions from './Transactions';
import Upload from './Upload';
import EmailSetup from './EmailSetup';
import { FinanceContext } from '../App';
import { MOCK_TRANSACTIONS, MOCK_CATEGORIES } from '../constants';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Analytics helper function
const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

const CAROUSEL_FEATURES = [
  {
    id: 'dashboard',
    title: "Intuitive Dashboard",
    description: "See all your accounts in one place with a clean, easy-to-understand dashboard that highlights what matters most.",
  },
  {
    id: 'tracking',
    title: "Track Every Rupee",
    description: "Automatic categorization and detailed breakdown helps you understand exactly where your money goes every month.",
  },
  {
    id: 'import',
    title: "Seamless Import Options",
    description: "Connect your Gmail or Outlook to auto-sync receipts, or simply drag & drop your bank statements for instant AI parsing.",
  },
  {
    id: 'privacy',
    title: "Secure & Private",
    description: "Your data is yours. We use local-first storage so your financial details never touch our servers.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
  }
];

const Landing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % CAROUSEL_FEATURES.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    const email = emailInput?.value || '';
    
    // Track email submission
    trackEvent('email_submitted', {
      event_category: 'engagement',
      event_label: 'early_access_signup',
      value: 1
    });
    
    if(btn) {
        btn.innerText = "Verifying...";
        btn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
             btn.innerText = "Invite Sent! 🚀";
             btn.classList.remove('bg-primary', 'hover:bg-primary-dark');
             btn.classList.add('bg-green-500', 'hover:bg-green-600');
             
             // Track successful submission
             trackEvent('email_submission_success', {
               event_category: 'conversion',
               event_label: 'early_access_signup_success',
               value: 1
             });
             
             setTimeout(() => {
                 setShowRegister(false);
                //  navigate('/app');
             }, 1000);
        }, 1500);
    }
  };

  // Mock context data for the landing page previews
  const mockContextValue = {
      transactions: MOCK_TRANSACTIONS,
      categories: MOCK_CATEGORIES,
      addTransaction: () => {},
      deleteCategory: () => {}
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* Registration Modal */}
      {showRegister && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-200">
                <button 
                    onClick={() => setShowRegister(false)}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-text-secondary transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                
                <div className="p-8">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center size-12 rounded-xl bg-blue-50 text-primary mb-4">
                             <span className="material-symbols-outlined text-[28px]">mark_email_unread</span>
                        </div>
                        <h2 className="text-2xl font-black text-text-primary mb-2">Get Early Access</h2>
                        <p className="text-text-secondary text-sm">Enter your email to receive a priority invite to the private beta.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-text-primary uppercase tracking-wide">Email Address</label>
                            <input 
                                type="email" 
                                required 
                                autoFocus
                                placeholder="name@company.com"
                                className="w-full px-4 py-3.5 rounded-xl border border-border-color focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg"
                            />
                        </div>
                        
                        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
                            Request Invite
                        </button>
                    </form>

                    <div className="mt-6 flex items-center gap-4">
                        <div className="h-px bg-border-color flex-1"></div>
                        <span className="text-xs font-medium text-text-secondary">Limited spots available</span>
                        <div className="h-px bg-border-color flex-1"></div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
         <div className="flex items-center gap-2 font-bold text-xl text-text-primary">
            <div className="size-8 bg-primary text-white rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
            </div>
            OwnFinance Tracker
         </div>
         <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                <button onClick={() => scrollToSection('overview')} className="hover:text-primary transition-colors">Overview</button>
                <button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors">Features</button>
                <button onClick={() => scrollToSection('privacy')} className="hover:text-primary transition-colors">Privacy</button>
            </nav>
            <button 
              onClick={() => {
                trackEvent('button_click', {
                  event_category: 'engagement',
                  event_label: 'get_started_header',
                  button_location: 'header'
                });
                setShowRegister(true);
              }} 
              className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
            >
                Get Started
            </button>
         </div>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto w-full">
         <div className="bg-gradient-to-tr from-blue-600 to-blue-400 rounded-3xl p-8 md:p-16 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Privacy-First Personal Finance Tracking</h1>
                <p className="text-lg md:text-xl text-blue-50 mb-8 font-medium max-w-lg">Your transactions, your storage. No data stored on our servers. Analyze your spending with local-first AI.</p>
                <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        trackEvent('button_click', {
                          event_category: 'engagement',
                          event_label: 'get_started_hero',
                          button_location: 'hero'
                        });
                        setShowRegister(true);
                      }} 
                      className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg"
                    >
                        Get Started
                    </button>
                    <button 
                      onClick={() => {
                        trackEvent('button_click', {
                          event_category: 'engagement',
                          event_label: 'learn_more_hero',
                          button_location: 'hero'
                        });
                        scrollToSection('features');
                      }} 
                      className="bg-blue-700/50 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700/70 transition-colors border border-blue-400/30"
                    >
                        Learn More
                    </button>
                </div>
            </div>
            <div className="hidden md:block w-96 h-96 bg-white/10 rounded-full blur-3xl absolute -right-20 -top-20"></div>
         </div>
      </section>

      {/* Carousel Section */}
      <section id="overview" className="px-6 md:px-12 py-12 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-text-primary mb-10">Visualize Your Finances, Simply</h2>
        
        <div className="relative w-full max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-2xl bg-white aspect-[4/3] md:aspect-[16/9] relative border border-gray-100">
                {CAROUSEL_FEATURES.map((feature, index) => (
                    <div 
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                            index === activeIndex ? 'opacity-100 translate-x-0' : 
                            index < activeIndex ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                        }`}
                    >
                         <div className="h-full flex flex-col md:flex-row">
                             <div className="w-full md:w-3/5 h-1/2 md:h-full relative overflow-hidden bg-gray-50">
                                <FinanceContext.Provider value={mockContextValue}>
                                    {feature.id === 'dashboard' ? (
                                        <div className="w-full h-full relative overflow-hidden pointer-events-none select-none">
                                            <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left transform scale-[0.5] p-2">
                                                <Dashboard />
                                            </div>
                                            <div className="absolute inset-0 bg-transparent"></div>
                                        </div>
                                    ) : feature.id === 'tracking' ? (
                                        <div className="w-full h-full relative overflow-hidden pointer-events-none select-none">
                                             <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left transform scale-[0.5] p-2">
                                                <Transactions />
                                            </div>
                                            <div className="absolute inset-0 bg-transparent"></div>
                                        </div>
                                    ) : feature.id === 'import' ? (
                                        <div className="w-full h-full relative overflow-hidden pointer-events-none select-none">
                                             <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left transform scale-[0.5] flex bg-white">
                                                {/* Split View for Import Options */}
                                                <div className="w-1/2 h-full border-r border-gray-100 overflow-hidden relative">
                                                    <div className="absolute inset-0 overflow-hidden scale-90 origin-top p-4">
                                                        <Upload />
                                                    </div>
                                                </div>
                                                <div className="w-1/2 h-full bg-slate-50 overflow-hidden relative">
                                                    <div className="absolute inset-0 overflow-hidden scale-90 origin-top p-4">
                                                        <EmailSetup useType="landing" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-transparent"></div>
                                        </div>
                                    ) : (
                                        <>
                                            <img 
                                                src={feature.image} 
                                                alt={feature.title} 
                                                className="w-full h-full object-cover" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r"></div>
                                        </>
                                    )}
                                </FinanceContext.Provider>
                             </div>
                             <div className="w-full md:w-2/5 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-center bg-white z-10 relative">
                                 <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                 <p className="text-lg text-gray-500 leading-relaxed mb-8">{feature.description}</p>
                                 <div className="flex gap-2">
                                     {CAROUSEL_FEATURES.map((_, idx) => (
                                         <button 
                                            key={idx}
                                            onClick={() => setActiveIndex(idx)}
                                            className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300'}`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                         />
                                     ))}
                                 </div>
                             </div>
                         </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-6 md:px-12 py-20 max-w-7xl mx-auto w-full">
         <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">All The Tools You Need</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { icon: 'mail', title: 'Email Import', desc: 'Securely parse receipts from Gmail & Outlook.' },
                { icon: 'upload_file', title: 'File Upload', desc: 'Drag & drop PDFs and CSVs instantly.' },
                { icon: 'smart_toy', title: 'AI Advisor', desc: 'Chat with your data using Gemini AI.' },
                { icon: 'pie_chart', title: 'Visual Insights', desc: 'Beautiful charts to track spending.' },
                { icon: 'lock', title: 'Private Storage', desc: 'Your data never leaves your device.' },
                { icon: 'category', title: 'Smart Categories', desc: 'Auto-categorization of expenses.' }
            ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 transition-all group bg-white">
                    <div className="size-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">{feature.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                </div>
            ))}
         </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="px-6 md:px-12 py-20 max-w-7xl mx-auto w-full">
         <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 md:p-16 border border-gray-100">
            <div className="max-w-3xl mx-auto text-center">
               <div className="inline-flex items-center justify-center size-16 bg-blue-100 text-blue-600 rounded-2xl mb-6">
                  <span className="material-symbols-outlined text-[40px]">lock</span>
               </div>
               <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">Your Privacy is Our Priority</h2>
               <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  We believe your financial data should remain yours. OwnFinance Tracker uses local-first storage, 
                  meaning all your transactions, categories, and insights are stored directly on your device. 
                  We never send your financial information to our servers.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="p-6 bg-white rounded-xl border border-gray-100">
                     <div className="size-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <span className="material-symbols-outlined">devices</span>
                     </div>
                     <h3 className="font-bold text-text-primary mb-2">Local Storage</h3>
                     <p className="text-sm text-text-secondary">All data stays on your device</p>
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-gray-100">
                     <div className="size-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <span className="material-symbols-outlined">encrypted</span>
                     </div>
                     <h3 className="font-bold text-text-primary mb-2">Secure Processing</h3>
                     <p className="text-sm text-text-secondary">AI analysis happens locally</p>
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-gray-100">
                     <div className="size-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <span className="material-symbols-outlined">visibility_off</span>
                     </div>
                     <h3 className="font-bold text-text-primary mb-2">No Tracking</h3>
                     <p className="text-sm text-text-secondary">Zero analytics or tracking</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 px-6 md:px-12 mt-auto">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-6">
            <p className="text-gray-500 text-sm">© 2025 OwnFinance Tracker. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
};

export default Landing;