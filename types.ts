export interface Transaction {
  id: string;
  date: string;
  payee: string;
  category: string;
  amount: number;
  status: 'Completed' | 'Pending';
  type: 'expense' | 'income';
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface ChartData {
  name: string;
  value: number;
}
