import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

export const useWallet = () => {
  const { state } = useContext(TransactionContext);
  const transactions = state.transactions;

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return { totalBalance, totalIncome, totalExpense };
};
