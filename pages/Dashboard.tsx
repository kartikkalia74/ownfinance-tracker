import React, { useContext } from 'react';
import { FinanceContext } from '../App';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { transactions } = useContext(FinanceContext);

  // Calculate stats
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];

  const pieData = [
    { name: 'Groceries', value: 400 },
    { name: 'Rent', value: 1200 },
    { name: 'Utilities', value: 300 },
    { name: 'Other', value: 200 },
  ];
  const COLORS = ['#2563eb', '#e11d48', '#10b981', '#f59e0b'];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <div className="flex gap-3">
          <button className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-white text-sm font-medium hover:bg-primary-dark transition-colors">
            This Month <span className="material-symbols-outlined text-[20px]">expand_more</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-xl border border-border-color bg-card shadow-sm">
          <p className="text-text-secondary font-medium mb-2">Monthly Spending</p>
          <p className="text-3xl font-bold text-text-primary">₹{totalExpense.toFixed(2)}</p>
          <p className="text-green-500 text-sm font-medium mt-1">+5.2% vs last month</p>
        </div>
        <div className="p-6 rounded-xl border border-border-color bg-card shadow-sm">
          <p className="text-text-secondary font-medium mb-2">Monthly Income</p>
          <p className="text-3xl font-bold text-text-primary">₹{totalIncome.toFixed(2)}</p>
          <p className="text-red-500 text-sm font-medium mt-1">-1.8% vs last month</p>
        </div>
        <div className="p-6 rounded-xl border border-border-color bg-card shadow-sm">
          <p className="text-text-secondary font-medium mb-2">Net Balance</p>
          <p className="text-3xl font-bold text-text-primary">₹{netBalance.toFixed(2)}</p>
          <p className="text-green-500 text-sm font-medium mt-1">+8.1% vs last month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-6 rounded-xl border border-border-color bg-card shadow-sm">
          <div className="mb-6">
            <p className="text-text-primary font-bold text-lg">Income vs. Expense</p>
            <p className="text-text-secondary text-sm">Last 6 months trend</p>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="p-6 rounded-xl border border-border-color bg-card shadow-sm flex flex-col">
          <div className="mb-4">
            <p className="text-text-primary font-bold text-lg">Category Breakdown</p>
            <p className="text-text-secondary text-sm">Where your money went</p>
          </div>
          <div className="h-[200px] w-full flex-1 relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <p className="text-2xl font-bold text-text-primary">₹2.4k</p>
                    <p className="text-xs text-text-secondary">Total</p>
                </div>
             </div>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-xs text-text-secondary">
             {pieData.map((entry, index) => (
                 <div key={index} className="flex items-center gap-1">
                     <div className="size-2 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                     {entry.name}
                 </div>
             ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="p-6 rounded-xl border border-border-color bg-card shadow-sm">
        <h3 className="text-lg font-bold text-text-primary mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-border-color">
                        <th className="p-4 text-sm font-semibold text-text-secondary">Date</th>
                        <th className="p-4 text-sm font-semibold text-text-secondary">Description</th>
                        <th className="p-4 text-sm font-semibold text-text-secondary">Category</th>
                        <th className="p-4 text-sm font-semibold text-text-secondary text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.slice(0, 5).map((t) => (
                        <tr key={t.id} className="border-b border-border-color hover:bg-slate-50 transition-colors">
                            <td className="p-4 text-sm text-text-secondary">{t.date}</td>
                            <td className="p-4 text-sm text-text-primary font-medium">{t.payee}</td>
                            <td className="p-4 text-sm text-text-secondary">
                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                    t.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {t.category}
                                </span>
                            </td>
                            <td className={`p-4 text-sm text-right font-medium ${t.type === 'income' ? 'text-green-600' : 'text-text-primary'}`}>
                                {t.type === 'expense' ? '-' : '+'}₹{Math.abs(t.amount).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
