import React from 'react';

type useType = 'landing'|'default'
const EmailSetup = (props:{useType?:useType}) => {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row justify-between gap-10 items-start mb-12">
            <div className="max-w-xl">
                <h1 className="text-4xl lg:text-5xl font-black text-text-primary tracking-tight mb-4 leading-tight">Automate Your Finances. Securely.</h1>
                <p className="text-text-secondary text-lg">Connect your email to automatically import transactions and statements. Set it up once and we'll handle the rest.</p>
            </div>
            
            <div className="flex flex-col w-full max-w-sm gap-4">
                <button className="flex items-center justify-center gap-3 w-full h-14 bg-white border border-border-color rounded-xl hover:bg-slate-50 transition-all shadow-sm font-bold text-text-primary group">
                    <div className="size-6 bg-red-500 rounded text-white flex items-center justify-center font-serif">M</div>
                    Connect with Gmail
                </button>
                 <button className="flex items-center justify-center gap-3 w-full h-14 bg-white border border-border-color rounded-xl hover:bg-slate-50 transition-all shadow-sm font-bold text-text-primary group">
                    <div className="size-6 bg-blue-600 rounded text-white flex items-center justify-center font-sans">O</div>
                    Connect with Outlook
                </button>
            </div>
        </div>

        {props.useType !=="landing" && <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border-color p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center shadow-sm">
             <div className="flex-1">
                 <div className="flex items-center gap-3 mb-4 text-primary">
                    <span className="material-symbols-outlined text-[32px]">verified_user</span>
                    <h2 className="text-2xl font-bold">Your Privacy is Our Priority</h2>
                 </div>
                <p className="text-text-secondary leading-relaxed">
                    OwnFinance Tracker requests <span className="font-bold text-text-primary">read-only</span> permission. We never store your emails. Our system only scans for financial documents from known sources (like banks and receipt emails) and securely imports the data directly to your local storage or personal cloud. We cannot send emails or access personal correspondence.
                 </p>
             </div>
             <div className="w-full md:w-1/3 aspect-square bg-blue-100 rounded-xl flex items-center justify-center">
                 <span className="material-symbols-outlined text-[80px] text-primary/40">lock</span>
             </div>
        </div>
        }
    </div>
  );
};

export default EmailSetup;
