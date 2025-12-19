import React, { useContext } from 'react';
import { FinanceContext } from '../App';

const Categories = () => {
  const { categories, deleteCategory } = useContext(FinanceContext);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black text-text-primary tracking-tight">Categories</h1>
            <p className="text-text-secondary">Manage your expense and income categories.</p>
        </div>
        <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-white text-sm font-bold hover:bg-primary-dark transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Add New
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border-color shadow-sm">
        {categories.map((c, index) => (
            <div key={c.id}>
                <div className="flex items-center justify-between p-4 group hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c.color}20` }}>
                            <div className="size-3 rounded-full" style={{ backgroundColor: c.color }}></div>
                        </div>
                        <p className="text-text-primary font-medium">{c.name}</p>
                    </div>
                    
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 text-text-secondary hover:text-primary rounded-lg hover:bg-slate-200">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                         </button>
                         <button 
                            onClick={() => deleteCategory(c.id)}
                            className="p-2 text-text-secondary hover:text-red-500 rounded-lg hover:bg-red-50"
                         >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                         </button>
                    </div>
                </div>
                {index < categories.length - 1 && <hr className="border-border-color" />}
            </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
