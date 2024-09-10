import { CalendarDate } from '@nextui-org/react';
import { SerializedError } from '@reduxjs/toolkit';
import { Draft } from 'immer';

export interface QueryParams {
  [key: string]: string | number | undefined;
}
interface Pagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

/**
  |============================
  | auth
  |============================
*/

export interface User {
  email: string;
  password: string;
}
export interface AuthState {
  user: CurrentUser;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: undefined;
  isRefreshing: boolean;
}

export interface SignInData {
  accessToken: string;
  refreshToken: string;
}

export interface CurrentUser {
  name?: string;
  email?: string;
}

export interface SignOutData {
  message: string;
}

/**
  |============================
  | Customers
  |============================
*/
export interface Customer {
  _id: string;
  image: string;
  name: string;
  email: string;
  spent: string;
  phone: string;
  address: string;
  register_date: string;
}

export interface CustomersData extends Pagination {
  data: Customer[];
}

export interface CustomersState {
  customers: CustomersData | null;
  filter: string;
  isLoading: boolean;
  error: SerializedError | undefined;
}
/**
  |============================
  | Transactions
  |============================
*/

export interface Transaction {
  _id: string;
  name: string;
  amount: string;
  type: string;
}

export interface TransactionsData extends Pagination {
  data: Transaction[];
}

export interface TransactionsState {
  transactions: TransactionsData | null;
  filter: string;
  isLoading: boolean;
  error: SerializedError | undefined;
}

/**
  |============================
  | Products
  |============================
*/

export interface Product {
  _id: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
  photo: string;
}

export type InitialValueProduct = Omit<Product, '_id' | 'photo'>;

export interface ProductsData extends Pagination {
  data: Product[];
}

export interface ProductsState {
  products: ProductsData | null;
  currentProduct: Product | null;
  filter: string;
  isLoading: boolean;
  error: SerializedError | undefined;
}

/**
  |============================
  | Suppliers
  |============================
*/

export interface Supplier {
  _id: string;
  name: string;
  address: string;
  suppliers: string;
  date: Draft<CalendarDate> | string;
  amount: string;
  status: string;
}

export type InitialValueSuppliers = Omit<Supplier, '_id'>;

export interface SuppliersData extends Pagination {
  data: Supplier[];
}

export interface SuppliersState {
  suppliers: Draft<SuppliersData> | null;
  currentSupplier: Draft<Supplier> | null;
  filter: string;
  isLoading: boolean;
  error: SerializedError | undefined;
}

/**
  |============================
  | Orders
  |============================
*/

export interface Order {
  _id: string;
  photo: string;
  name: string;
  address: string;
  products: string;
  order_date: string;
  price: string;
  status: string;
}

export interface OrdersData extends Pagination {
  data: Order[];
}
export interface OrdersState {
  orders: OrdersData | null;
  filter: string;
  isLoading: boolean;
  error: SerializedError | undefined;
}

/**
  |============================
  | Thunks
  |============================
*/
export interface DefaultThunkApiConfig {
  rejectValue: SerializedError;
}
