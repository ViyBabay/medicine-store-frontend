import {
  DefaultThunkApiConfig,
  InitialValueProduct,
  Product,
  ProductsData,
  QueryParams,
} from './../../shared/utils/difinitions';
import {
  addProducts,
  deleteProductsId,
  editProductsId,
  getProducts,
  getProductsId,
} from '@/services/api/api';
import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchAllProductsThunk = createAsyncThunk<
  ProductsData,
  QueryParams | undefined,
  DefaultThunkApiConfig
>('products/fetchAllProducts', async (params, { rejectWithValue }) => {
  try {
    const data: ProductsData = await getProducts(params);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serializedError: SerializedError = {
        message: error?.response?.data.message,
      };
      return rejectWithValue(serializedError);
    }
    return rejectWithValue({
      message: 'An unknown error has occurred',
    } as SerializedError);
  }
});

export const fetchAddProductsThunk = createAsyncThunk<
  Product,
  InitialValueProduct,
  DefaultThunkApiConfig
>(
  'products/fetchAddProducts',
  async (product, { rejectWithValue, dispatch }) => {
    try {
      const data: Product = await addProducts(product);
      dispatch(fetchAllProductsThunk());
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serializedError: SerializedError = {
          message: error?.response?.data.message,
        };
        return rejectWithValue(serializedError);
      }
      return rejectWithValue({
        message: 'An unknown error has occurred',
      } as SerializedError);
    }
  }
);

export const fetchCurrentProductThunk = createAsyncThunk<
  Product,
  string,
  DefaultThunkApiConfig
>('products/fetchCurrentProduct', async (productId, { rejectWithValue }) => {
  try {
    const data: Product = await getProductsId(productId);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serializedError: SerializedError = {
        message: error?.response?.data.message,
      };
      return rejectWithValue(serializedError);
    }
    return rejectWithValue({
      message: 'An unknown error has occurred',
    } as SerializedError);
  }
});

export const fetchDeleteProductThunk = createAsyncThunk<
  void,
  string,
  DefaultThunkApiConfig
>(
  'products/fetchDeleteProduct',
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      await deleteProductsId(productId);
      dispatch(fetchAllProductsThunk());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serializedError: SerializedError = {
          message: error?.response?.data.message,
        };
        return rejectWithValue(serializedError);
      }
      return rejectWithValue({
        message: 'An unknown error has occurred',
      } as SerializedError);
    }
  },
  {
    condition: (_, { getState }) => {
      const loading = (getState() as RootState).products.isLoading;
      if (loading) {
        console.log(
          'Aborting fetchDeleteProductThunk because the system is already loading.'
        );
        return false;
      }
    },
  }
);

export const fetchEditProductThunk = createAsyncThunk<
  Product,
  { id: string; product: InitialValueProduct },
  DefaultThunkApiConfig
>(
  'products/fetchEditProduct',
  async ({ id, product }, { rejectWithValue, dispatch }) => {
    try {
      const data = await editProductsId({ id, product });
      dispatch(fetchAllProductsThunk());
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serializedError: SerializedError = {
          message: error?.response?.data.message,
        };
        return rejectWithValue(serializedError);
      }
      return rejectWithValue({
        message: 'An unknown error has occurred',
      } as SerializedError);
    }
  }
);
