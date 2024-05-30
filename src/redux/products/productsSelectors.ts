import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getProducts = (state: RootState) => state.products.products;

const getFilter = (state: RootState) => state.products.filter;

export const selectAllProducts = getProducts;
export const filterValueProducts = getFilter;

export const selectIsLoading = (state: RootState) => state.products.isLoading;

export const selectCurrentProduct = (state: RootState) =>
  state.products.currentProduct;

export const selectProductsFilter = createSelector(
  [getProducts, getFilter],
  (products, filter) => products?.data.find(product => product.name === filter)
);
export const getTotalProducts = (state: RootState) =>
  state.products.products?.total;
