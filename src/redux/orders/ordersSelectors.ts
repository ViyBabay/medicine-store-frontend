import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getOrders = (state: RootState) => state.orders.orders;

const getFilter = (state: RootState) => state.orders.filter;

export const selectAllOrders = getOrders;

export const filterValueOrders = getFilter;

export const selectOrdersFilter = createSelector(
    [getOrders, getFilter],
    (orders, filter) => orders?.data.find(order => order.name === filter),
);

export const getTotalOrders = (state: RootState) => state.orders.orders?.total;
