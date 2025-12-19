import React, { useState, useContext, useRef, useEffect } from 'react';
import { FinanceContext } from '../App';
import { getFinancialAdvice } from '../services/geminiService';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Hello! I am your AI financial assistant. Ask me anything about your spending.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { transactions } = useContext(FinanceContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await getFinancialAdvice(userMsg, transactions);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div className={`pointer-events-auto bg-white dark:bg-slate-800 shadow-2xl rounded-2xl w-80 sm:w-96 flex flex-col transition-all duration-300 origin-bottom-right mb-4 border border-border-color overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 h-0'}`}>
        <div className="bg-primary p-4 flex justify-between items-center">
            <h3 className="text-white font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                Financial Advisor
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
        
        <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50 dark:bg-slate-900">
            {messages.map((msg, i) => (
                <div key={i} className={`max-w-[85%] p-3 text-sm rounded-xl ${
                    msg.role === 'user' 
                    ? 'bg-primary text-white self-end rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 text-text-primary border border-border-color self-start rounded-bl-none shadow-sm'
                }`}>
                    {msg.text}
                </div>
            ))}
            {loading && (
                <div className="self-start bg-white dark:bg-slate-800 p-3 rounded-xl rounded-bl-none shadow-sm border border-border-color">
                    <div className="flex gap-1">
                        <div className="size-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="size-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                        <div className="size-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <div className="p-3 bg-white dark:bg-slate-800 border-t border-border-color flex gap-2">
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your spending..."
                className="flex-1 bg-slate-100 dark:bg-slate-700 border-none rounded-lg text-sm px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
            />
            <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
            >
                <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto h-14 w-14 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        <span className="material-symbols-outlined text-[28px]">{isOpen ? 'close' : 'chat_bubble'}</span>
      </button>
    </div>
  );
}
