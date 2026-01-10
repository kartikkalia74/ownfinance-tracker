import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate, Link, NavLink, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Upload from './pages/Upload';
import EmailSetup from './pages/EmailSetup';
import Landing from './pages/Landing';
import AIChat from './components/AIChat';
import { MOCK_TRANSACTIONS, MOCK_CATEGORIES } from './constants';
import { Transaction, Category } from './types';

// Simple Context for State Management across pages
export const FinanceContext = React.createContext<{
  transactions: Transaction[];
  categories: Category[];
  addTransaction: (t: Transaction) => void;
  deleteCategory: (id: string) => void;
}>({
  transactions: [],
  categories: [],
  addTransaction: () => { },
  deleteCategory: () => { },
});

const SidebarLink = ({ to, icon, label }: { to: string; icon: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
        ? 'bg-primary/10 text-primary'
        : 'text-text-secondary hover:bg-slate-100 dark:hover:bg-slate-800'
      }`
    }
  >
    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
    <p className="text-sm font-medium leading-normal">{label}</p>
  </NavLink>
);

const AppLayout = () => {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-slate-900 border-r border-border-color p-4">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-3 px-2">
            <div className="size-8 text-primary rounded-full bg-primary/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-bold text-lg text-text-primary">OwnFinance</span>
          </div>
          <div className="flex items-center gap-3 mt-4 bg-slate-50 p-2 rounded-xl">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://picsum.photos/100/100")' }}></div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-text-primary text-sm font-bold truncate">Alex Johnson</h1>
              <p className="text-text-secondary text-xs truncate">alex@example.com</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <SidebarLink to="/app/dashboard" icon="dashboard" label="Dashboard" />
          <SidebarLink to="/app/transactions" icon="receipt_long" label="Transactions" />
          <SidebarLink to="/app/categories" icon="sell" label="Categories" />
          <SidebarLink to="/app/upload" icon="upload_file" label="Upload Statement" />
          <SidebarLink to="/app/email-setup" icon="mail" label="Email Import" />
        </div>

        <div className="flex flex-col gap-4 mt-auto">
          <Link to="/" className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-colors">
            Log out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background relative">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border-color bg-white z-20">
          <div className="flex items-center gap-2 font-bold text-primary">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            OwnFinance
          </div>
          <button className="p-2 text-text-secondary">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

        <AIChat />
      </main>
    </div>
  );
};

import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// ... imports remain the same

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);

  const addTransaction = (t: Transaction) => setTransactions(prev => [t, ...prev]);
  const deleteCategory = (id: string) => setCategories(prev => prev.filter(c => c.id !== id));

  return (
    <FinanceContext.Provider value={{ transactions, categories, addTransaction, deleteCategory }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="categories" element={<Categories />} />
            <Route path="upload" element={<Upload />} />
            <Route path="email-setup" element={<EmailSetup useType="default" />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </FinanceContext.Provider>
  );
}