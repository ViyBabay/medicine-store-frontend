import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getTransactions = (state: RootState) => state.transactions.transactions;

const getFilter = (state: RootState) => state.transactions.filter;

export const selectAlltransactions = getTransactions;
export const filterValuetransactions = getFilter;

export const selecttransactionsFilter = createSelector(
    [getTransactions, getFilter],
    (transactions, filter) =>
        transactions?.data.find(transaction => transaction.name === filter),
);

export const getTotalTransactions = (state: RootState) =>
    state.transactions.transactions?.total;
