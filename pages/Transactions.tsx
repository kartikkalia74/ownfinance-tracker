import React, { useContext, useState } from 'react';
import { FinanceContext } from '../App';

const Transactions = () => {
  const { transactions } = useContext(FinanceContext);
  const [filter, setFilter] = useState('All');
  const [amountRange, setAmountRange] = useState(0);

  console.log(amountRange,"amountRange");
  const filteredTransactions = transactions.filter(t => {
      const matchesCategory = filter === 'All' || t.category === filter;
      const matchesAmount = Math.abs(t.amount) <= amountRange;
      console.log(matchesAmount, amountRange, t.amount,"kkkkk");
      return matchesCategory && (matchesAmount || !amountRange);
  });

  const categories = Array.from(new Set(transactions.map(t => t.category)));
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // Mock calendar days for August 2024
  const calendarDays = [
      ...Array(4).fill(null), // Empty slots for start of month
      ...Array.from({length: 31}, (_, i) => i + 1)
  ];


  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-3xl font-bold text-text-primary">Transactions</h1>
            <p className="text-text-secondary text-sm mt-1">Manage your expenses</p>
        </div>
        <div className="flex gap-2">
            <button className="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-white text-sm font-bold shadow-sm hover:bg-primary-dark transition-colors">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add
            </button>
        </div>
      </div>

      {/* Top Section: Filters and Calendar */}
      <div className="bg-card rounded-2xl border border-border-color shadow-sm p-6 mb-6 flex flex-col lg:flex-row gap-8">
        {/* Left: Filters */}
        <div className="flex-1 flex flex-col justify-between gap-6">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg text-text-primary">Filters</h2>
                    <button onClick={() => {setFilter('All'); setAmountRange(1000);}} className="text-xs text-primary font-medium hover:underline">Reset</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <button 
                        onClick={() => setFilter('All')}
                        className={`flex h-8 items-center rounded-full px-3 text-xs font-bold border transition-colors ${filter === 'All' ? 'bg-primary text-white border-primary' : 'bg-slate-50 border-border-color text-text-secondary hover:bg-slate-100'}`}
                    >
                        <span className="material-symbols-outlined text-[16px] mr-1">list</span>
                        All
                    </button>
                    {categories.slice(0, 3).map(c => (
                        <button 
                            key={c}
                            onClick={() => setFilter(c)}
                            className={`flex h-8 items-center rounded-full px-3 text-xs font-bold border transition-colors ${filter === c ? 'bg-primary text-white border-primary' : 'bg-slate-50 border-border-color text-text-secondary hover:bg-slate-100'}`}
                        >
                            {c === 'Groceries' && <span className="material-symbols-outlined text-[16px] mr-1">shopping_cart</span>}
                            {c === 'Transport' && <span className="material-symbols-outlined text-[16px] mr-1">directions_car</span>}
                            {c === 'Utilities' && <span className="material-symbols-outlined text-[16px] mr-1">bolt</span>}
                            {c}
                        </button>
                    ))}
                    <button className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-text-secondary hover:bg-slate-200">
                        <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                </div>
            </div>

            <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-text-primary">Amount Range</span>
                    <span className="text-text-secondary">0 - {amountRange === 1000 ? '1000+' : amountRange}</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    value={amountRange} 
                    onChange={(e) => setAmountRange(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                    <span>₹0</span>
                    <span>₹1000+</span>
                </div>
            </div>
        </div>

        {/* Right: Calendar (Static Mock for Visual) */}
        <div className="flex-1 lg:max-w-sm border-l border-border-color lg:pl-8 pt-4 lg:pt-0 border-t lg:border-t-0 mt-4 lg:mt-0">
            <div className="flex items-center justify-between mb-4">
                <button className="p-1 hover:bg-slate-100 rounded-full"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
                <h3 className="font-bold text-text-primary">August 2024</h3>
                <button className="p-1 hover:bg-slate-100 rounded-full"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {days.map(d => <div key={d} className="text-xs font-bold text-text-secondary h-6 flex items-center justify-center">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {calendarDays.map((d, i) => {
                    const isSelected = d && d >= 5 && d <= 10;
                    const isStart = d === 5;
                    const isEnd = d === 10;
                    return (
                        <div key={i} className="h-8 flex items-center justify-center relative">
                            {isSelected && (
                                <div className={`absolute inset-y-0 bg-blue-100 w-full ${isStart ? 'rounded-l-full left-1' : ''} ${isEnd ? 'rounded-r-full right-1' : ''}`}></div>
                            )}
                            <button className={`relative z-10 size-7 text-xs font-medium rounded-full flex items-center justify-center transition-colors ${
                                isStart || isEnd ? 'bg-primary text-white' : d ? 'text-text-primary hover:bg-slate-100' : ''
                            }`}>
                                {d}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-card rounded-xl border border-border-color shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead className="bg-white border-b border-border-color">
                <tr>
                    <th className="px-6 py-4 text-sm font-bold text-text-secondary">Date</th>
                    <th className="px-6 py-4 text-sm font-bold text-text-secondary">Payee</th>
                    <th className="px-6 py-4 text-sm font-bold text-text-secondary">Category</th>
                    <th className="px-6 py-4 text-sm font-bold text-text-secondary text-right">Amount</th>
                    <th className="px-6 py-4 text-sm font-bold text-text-secondary text-center">Status</th>
                    <th className="px-6 py-4"></th>
                </tr>
            </thead>
            <tbody>
                {filteredTransactions.map((t) => (
                    <tr key={t.id} className="border-b border-border-color hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4 font-bold text-text-primary text-sm">{t.date}</td>
                        <td className="px-6 py-4 text-text-secondary text-sm">{t.payee}</td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold ${
                                t.category === 'Groceries' ? 'bg-blue-100 text-blue-700' :
                                t.category === 'Transport' ? 'bg-orange-100 text-orange-700' :
                                t.category === 'Income' ? 'bg-green-100 text-green-700' :
                                t.category === 'Utilities' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-purple-100 text-purple-700'
                            }`}>
                                {t.category}
                            </span>
                        </td>
                        <td className={`px-6 py-4 text-right font-medium text-sm ${t.type === 'income' ? 'text-green-600' : 'text-text-primary'}`}>
                            {t.type === 'expense' ? '-' : '+'}₹{Math.abs(t.amount).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                t.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {t.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                             <button className="p-1 text-text-secondary hover:text-primary">
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                             </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {filteredTransactions.length === 0 && (
            <div className="p-10 text-center text-text-secondary">
                No transactions found.
            </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;