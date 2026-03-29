import React, { createContext, useReducer, useEffect } from 'react';
import { TransactionReducer, initialState } from './TransactionReducer';
import { loadTransactions, saveTransactions } from '../utils/storage';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransactionReducer, initialState);

  useEffect(() => {
    const fetchTransactions = async () => {
      const storedTransactions = await loadTransactions();
      dispatch({ type: 'SET_TRANSACTIONS', payload: storedTransactions });
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    saveTransactions(state.transactions);
  }, [state.transactions]);

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const clearAllTransactions = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  return (
    <TransactionContext.Provider value={{ state, addTransaction, deleteTransaction, clearAllTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
