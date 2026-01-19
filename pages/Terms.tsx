import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-display">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm py-4">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-slate-900">
                        <img src="/logo.gif" alt="OwnFinance" className="size-8 rounded-lg shadow-lg shadow-blue-500/20" />
                        <span>OwnFinance<span className="text-blue-600">.</span></span>
                    </Link>
                    <Link to="/" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-xl shadow-slate-200/50">
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Terms of Service</h1>
                    <p className="text-slate-500 mb-10">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="space-y-10 text-slate-700 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                            <p>
                                Welcome to OwnFinance. By accessing or using our application, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not use our service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Not Financial Advice</h2>
                            <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl mb-4">
                                <p className="text-amber-900 font-medium">
                                    <strong>IMPORTANT:</strong> OwnFinance is a tracking and visualization tool. It does not provide financial, investment, or tax advice.
                                </p>
                            </div>
                            <p>
                                The insights, budgets, and categorizations provided by the App are for informational purposes only. You are solely responsible for your financial decisions. We recommend consulting with a qualified financial advisor for professional advice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Security & Responsibility</h2>
                            <p>
                                Because OwnFinance is a local-first application, you are responsible for:
                            </p>
                            <ul className="list-disc ml-6 mt-4 space-y-2">
                                <li>Creating backups of your browser data.</li>
                                <li>Securing access to your device.</li>
                            </ul>
                            <p className="mt-4">
                                We are not liable for any data loss, corruption, or exposure resulting from your device being compromised, cleared, or lost.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. "As Is" Warranty</h2>
                            <p>
                                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h2>
                            <p>
                                In no event shall OwnFinance, its developers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify these terms at any time. Continued use of the application after such changes constitutes your acceptance of the new Terms.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <footer className="py-10 text-center text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} OwnFinance. All rights reserved.
            </footer>
        </div>
    );
};

export default Terms;
