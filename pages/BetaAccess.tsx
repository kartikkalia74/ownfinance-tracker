import React, { useEffect } from 'react';

const BetaAccess = () => {
    useEffect(() => {
        const isRegistered = localStorage.getItem('ownfinance_beta_access') === 'true';
        if (!isRegistered) {
            window.location.href = '/#/'; // Redirect to home hash route
            return;
        }
        // Redirect to dev.ownfinance.site
        window.location.href = 'https://dev.ownfinance.site';
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-display flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md w-full">
                <div className="inline-flex items-center justify-center size-20 bg-blue-600 shadow-xl shadow-blue-500/20 rounded-3xl text-white mb-8 animate-bounce">
                    <span className="material-symbols-outlined text-4xl">rocket_launch</span>
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-4">Redirecting to Beta...</h1>
                <p className="text-slate-500 leading-relaxed mb-8">
                    We're taking you to the latest version of OwnFinance. If you aren't redirected in a few seconds, click the button below.
                </p>
                <a
                    href="https://dev.ownfinance.site"
                    className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                >
                    Visit Beta App
                </a>
            </div>
        </div>
    );
};

export default BetaAccess;
