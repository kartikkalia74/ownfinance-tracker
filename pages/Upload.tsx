import React, { useState } from 'react';
import { parseReceipt } from '../services/geminiService';
import { Transaction } from '../types';

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsedData, setParsedData] = useState<Partial<Transaction>[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processFile = async () => {
    if (!file) return;
    setParsing(true);
    
    // Simulate reading file text (In real app, use FileReader)
    // Here we pass a dummy string for the demo if user uploads anything
    const dummyContent = `
    Date: 2023-10-25, Store: Starbucks, Amount: -5.75, Category: Food
    Date: 2023-10-24, Store: Spotify, Amount: -10.99, Category: Entertainment
    Date: 2023-10-23, Store: Salary Acme, Amount: 2500, Category: Income
    `;

    // Attempt AI parsing
    const results = await parseReceipt(dummyContent);
    // If AI fails or returns empty (e.g. no API key), fallback to mock
    if (results.length > 0) {
        setParsedData(results);
    } else {
        setParsedData([
            { date: '2023-10-25', payee: 'Starbucks', amount: -5.75, category: 'Food & Drink', status: 'Completed' },
            { date: '2023-10-24', payee: 'Spotify', amount: -10.99, category: 'Entertainment', status: 'Completed' },
            { date: '2023-10-23', payee: 'Salary - Acme Inc', amount: 2500, category: 'Income', status: 'Completed' },
        ]);
    }
    setParsing(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-text-primary tracking-tight mb-2">Upload Statement</h1>
        <p className="text-text-secondary">Drag and drop your PDF, CSV, or Excel file here, or click to browse.</p>
      </div>

      {/* Upload Zone */}
      <div 
        className={`flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed px-6 py-14 transition-colors mb-8 ${isDragging ? 'border-primary bg-primary/5' : 'border-border-color bg-white'}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="text-primary-light p-4 bg-primary/10 rounded-full">
          <span className="material-symbols-outlined text-[48px] text-primary">upload_file</span>
        </div>
        
        <div className="text-center max-w-md">
           {file ? (
               <p className="text-text-primary font-bold text-lg">{file.name}</p>
           ) : (
               <>
                <p className="text-text-primary text-lg font-bold">Drag & Drop File Here</p>
                <p className="text-text-secondary text-sm mt-2">Supported formats: PDF, CSV, Excel</p>
               </>
           )}
        </div>

        <div className="flex gap-4">
             <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept=".csv,.pdf,.xlsx" />
             <label htmlFor="file-upload" className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-text-primary font-bold py-2 px-6 rounded-lg transition-colors">
                {file ? 'Change File' : 'Browse files'}
             </label>
             {file && (
                 <button 
                    onClick={processFile}
                    disabled={parsing}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                 >
                    {parsing ? 'Processing...' : 'Upload & Parse'}
                 </button>
             )}
        </div>
      </div>

      {parsing && (
        <div className="mb-8">
            <div className="flex justify-between mb-2 text-sm font-medium text-text-primary">
                <span>AI Parsing in progress...</span>
                <span>75%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-3/4 animate-pulse"></div>
            </div>
        </div>
      )}

      {/* Review Section */}
      {parsedData.length > 0 && (
          <div className="bg-card rounded-xl border border-border-color shadow-sm overflow-hidden animate-fade-in">
            <div className="p-5 border-b border-border-color flex justify-between items-center">
                <h2 className="text-xl font-bold text-text-primary">Review Extracted Transactions</h2>
                <div className="text-sm text-text-secondary bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full border border-yellow-200">
                    <span className="font-bold">AI Note:</span> Please verify categories.
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-border-color">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-text-secondary">Date</th>
                            <th className="p-4 text-sm font-semibold text-text-secondary">Description</th>
                            <th className="p-4 text-sm font-semibold text-text-secondary text-right">Amount</th>
                            <th className="p-4 text-sm font-semibold text-text-secondary">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parsedData.map((t, idx) => (
                            <tr key={idx} className="border-b border-border-color">
                                <td className="p-4 text-sm text-text-primary whitespace-nowrap">{t.date}</td>
                                <td className="p-4 text-sm text-text-primary">{t.payee}</td>
                                <td className={`p-4 text-sm text-right whitespace-nowrap font-semibold ${Number(t.amount) > 0 ? 'text-green-600' : 'text-text-primary'}`}>
                                    {Number(t.amount) > 0 ? '+' : ''}${Math.abs(Number(t.amount))}
                                </td>
                                <td className="p-4 text-sm">
                                    <select 
                                        defaultValue={t.category} 
                                        className="w-full max-w-[180px] bg-slate-50 text-text-primary border border-border-color rounded-md py-1 px-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                    >
                                        <option>Food & Drink</option>
                                        <option>Entertainment</option>
                                        <option>Groceries</option>
                                        <option>Utilities</option>
                                        <option>Income</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-border-color flex justify-end gap-3">
                <button 
                    onClick={() => { setParsedData([]); setFile(null); }}
                    className="px-6 py-2 rounded-lg bg-white border border-border-color text-text-primary font-bold hover:bg-slate-50"
                >
                    Cancel
                </button>
                <button className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark shadow-sm">
                    Save Transactions
                </button>
            </div>
          </div>
      )}
    </div>
  );
};

export default Upload;
