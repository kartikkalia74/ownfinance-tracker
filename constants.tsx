import { Transaction, Category } from './types';

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2023-10-26', payee: 'Spotify Subscription', category: 'Entertainment', amount: -10.99, status: 'Completed', type: 'expense' },
  { id: '2', date: '2023-10-25', payee: 'Salary Deposit', category: 'Income', amount: 2900.00, status: 'Completed', type: 'income' },
  { id: '3', date: '2023-10-24', payee: 'Grocery Shopping', category: 'Groceries', amount: -85.40, status: 'Completed', type: 'expense' },
  { id: '4', date: '2023-10-23', payee: 'Gas Bill', category: 'Utilities', amount: -45.50, status: 'Completed', type: 'expense' },
  { id: '5', date: '2023-10-22', payee: 'Dinner with Friends', category: 'Food & Dining', amount: -112.00, status: 'Completed', type: 'expense' },
  { id: '6', date: '2023-10-20', payee: 'Uber Ride', category: 'Transport', amount: -24.50, status: 'Completed', type: 'expense' },
  { id: '7', date: '2023-10-18', payee: 'Freelance Work', category: 'Income', amount: 500.00, status: 'Completed', type: 'income' },
];

export const MOCK_CATEGORIES: Category[] = [
    { id: '1', name: 'Groceries', color: '#FF6B6B' },
    { id: '2', name: 'Rent', color: '#4ECDC4' },
    { id: '3', name: 'Utilities', color: '#45B7D1' },
    { id: '4', name: 'Transport', color: '#F9D423' },
    { id: '5', name: 'Entertainment', color: '#9B59B6' },
];
