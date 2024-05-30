import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getCustomers = (state: RootState) => state.customers.customers;

const getFilter = (state: RootState) => state.customers.filter;

export const selectAllCustomers = getCustomers;
export const filterValueCustomers = getFilter;

export const selectCustomersFilter = createSelector(
    [getCustomers, getFilter],
    (customers, filter) =>
        customers?.data.find(customer => customer.name === filter),
);

export const getTotalCustomers = (state: RootState) =>
    state.customers.customers?.total;
