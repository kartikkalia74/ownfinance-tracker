import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-display">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm py-4">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-slate-900">
                        <div className="size-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                        </div>
                        <span>OwnFinance<span className="text-blue-600">.</span></span>
                    </Link>
                    <Link to="/" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-xl shadow-slate-200/50">
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Privacy Policy</h1>
                    <p className="text-slate-500 mb-10">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="space-y-10 text-slate-700 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Local-First Architecture</h2>
                            <p>
                                OwnFinance is designed with a "Local-First" philosophy. This means that your financial data, usage logs, and personal information are stored <strong>exclusively on your device</strong> (using technologies like IndexedDB and LocalStorage).
                            </p>
                            <p className="mt-4">
                                We do not operate a centralized database to store your transaction history. We cannot see, sell, or lose your financial data because we simply do not have it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. AI Processing</h2>
                            <p>
                                All categorization and insights are generated using on-device AI models or stateless calls to AI providers where no personal identifiers are stored. We prioritize using local browser capabilities whenever possible.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Collection</h2>
                            <p>
                                The only data we collect is minimal, anonymous telemetry to help us identify bugs and improve performance (e.g., "App crashed on iOS"). This data is completely stripped of any personal or financial information.
                            </p>
                            <ul className="list-disc ml-6 mt-4 space-y-2">
                                <li><strong>Email Addresses:</strong> If you sign up for our newsletter/waitlist, your email is stored securely by our mailing list provider and used solely for communication.</li>
                                <li><strong>Usage Stats:</strong> Anonymous page view counts.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Services</h2>
                            <p>
                                We may use trusted third-party services for specific functionalities, such as:
                            </p>
                            <ul className="list-disc ml-6 mt-4 space-y-2">
                                <li><strong>Google Gemini / OpenAI:</strong> For advanced text parsing (if enabled). Data sent is transient and not trained upon.</li>
                                <li><strong>Email Parsing:</strong> If you connect Gmail/Outlook, the parsing happens directly between your browser and the email provider API. We do not act as a middleman server.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Rights</h2>
                            <p>
                                Since your data lives on your device, you have complete control. You can:
                            </p>
                            <ul className="list-disc ml-6 mt-4 space-y-2">
                                <li><strong>Export:</strong> Download all your data as a CSV/JSON file at any time.</li>
                                <li><strong>Delete:</strong> Clearing your browser data or deleting the app removes 100% of your data. We have no backups to restore.</li>
                            </ul>
                        </section>

                        <section>
                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mt-8">
                                <h3 className="font-bold text-blue-900 mb-2">Contact Us</h3>
                                <p className="text-blue-700 text-sm">
                                    If you have any questions about this policy, please contact us at <a href="mailto:privacy@ownfinance.app" className="underline hover:no-underline">privacy@ownfinance.app</a>.
                                </p>
                            </div>
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

export default Privacy;
