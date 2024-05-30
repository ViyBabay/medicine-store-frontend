import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getSuppliers = (state: RootState) => state.suppliers.suppliers;

const getFilter = (state: RootState) => state.suppliers.filter;

export const selectAllSuppliers = getSuppliers;
export const filterValuesuppliers = getFilter;

export const selectCurrentSupplier = (state: RootState) =>
  state.suppliers.currentSupplier;

export const selectSuppliersFilter = createSelector(
  [getSuppliers, getFilter],
  (suppliers, filter) =>
    suppliers?.data.find(supplier => supplier.name === filter)
);

export const getTotalSuppliers = (state: RootState) =>
  state.suppliers.suppliers?.total;
