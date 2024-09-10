import {
  Customer,
  CustomersData,
  InitialValueProduct,
  InitialValueSuppliers,
  Order,
  OrdersData,
  Product,
  ProductsData,
  QueryParams,
  Supplier,
  SuppliersData,
  Transaction,
  TransactionsData,
  User,
} from '@/shared/utils/difinitions';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://medicaldashboard-backend.onrender.com',
});

/**git
  |============================
  | Set token
  |============================
*/
export const setAuthToken = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  instance.defaults.headers.common.Authorization = ``;
};

instance.interceptors.response.use(
  res => res,
  async error => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      const { data } = await instance.post('/api/auth/user/refresh', {
        refreshToken,
      });

      error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
      localStorage.setItem('token', data.accessToken);
      return instance(error.config);
    }
  }
);

/**
  |============================
  | auth
  |============================
*/
//Signin
export const signin = async (user: User) => {
  const { data } = await instance.post('/api/auth/user/signin', user);

  setAuthToken(data.accessToken);
  localStorage.setItem('token', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
};
//Signout
export const signout = async () => {
  const { data } = await instance.post('/api/auth/user/signout');
  clearAuthToken();
  localStorage.clear();
  return data;
};

//Current
export const getCurrentUser = async () => {
  const { data } = await instance.get('/api/auth/user/current');

  return data;
};

/**
  |============================
  | Customers
  |============================
*/
export const getCustomers = async (
  params?: QueryParams
): Promise<CustomersData> => {
  const { data } = await instance.get('/api/customers', { params });

  return data;
};

export const addCustomers = async (user: Customer): Promise<Customer> => {
  const { data } = await instance.post('/api/customers', user);
  return data;
};

export const getCustomersId = async (id: string): Promise<Customer> => {
  const { data } = await instance.get(`/api/customers/${id}`);
  return data;
};

export const editCustomersId = async (id: string): Promise<Customer> => {
  const { data } = await instance.put(`/api/customers/${id}`);
  return data;
};

export const deleteCustomersId = async (id: string) => {
  await instance.delete(`/api/customers/${id}`);
};

/**
  |============================
  | Transactions
  |============================
*/
export const getTransactions = async (
  params?: QueryParams
): Promise<TransactionsData> => {
  const { data } = await instance.get('/api/transactions', { params });

  return data;
};

export const addTransactions = async (
  user: Transaction
): Promise<Transaction> => {
  const { data } = await instance.post('/api/transactions', user);
  return data;
};

export const getTransactionsId = async (id: string): Promise<Transaction> => {
  const { data } = await instance.get(`/api/transactions/${id}`);
  return data;
};

export const editTransactionsId = async (id: string): Promise<Transaction> => {
  const { data } = await instance.put(`/api/transactions/${id}`);
  return data;
};

export const deleteTransactionsId = async (id: string) => {
  await instance.delete(`/api/transactions/${id}`);
};

/**
  |============================
  | Products
  |============================
*/

export const getProducts = async (
  params?: QueryParams
): Promise<ProductsData> => {
  const { data } = await instance.get('/api/products', { params });

  return data;
};

export const addProducts = async (
  user: InitialValueProduct
): Promise<Product> => {
  const { data } = await instance.post('/api/products', user);
  return data;
};

export const getProductsId = async (id: string): Promise<Product> => {
  const { data } = await instance.get(`/api/products/${id}`);
  return data;
};

export const editProductsId = async ({
  id,
  product,
}: {
  id: string;
  product: InitialValueProduct;
}): Promise<Product> => {
  const { data } = await instance.put(`/api/products/${id}`, product);
  return data;
};

export const deleteProductsId = async (id: string) => {
  await instance.delete(`/api/products/${id}`);
};

/**
  |============================
  | Suppliers
  |============================
*/

export const getSuppliers = async (
  params?: QueryParams
): Promise<SuppliersData> => {
  const { data } = await instance.get('/api/suppliers', { params });

  return data;
};

export const addSuppliers = async (
  user: InitialValueSuppliers
): Promise<Supplier> => {
  const { data } = await instance.post('/api/suppliers', user);
  return data;
};

export const getSuppliersId = async (id: string): Promise<Supplier> => {
  const { data } = await instance.get(`/api/suppliers/${id}`);
  return data;
};

export const editSuppliersId = async ({
  id,
  supplier,
}: {
  id: string;
  supplier: InitialValueSuppliers;
}): Promise<Supplier> => {
  const { data } = await instance.put(`/api/suppliers/${id}`, supplier);
  return data;
};

export const deleteSuppliersId = async (id: string) => {
  await instance.delete(`/api/suppliers/${id}`);
};

/**
  |============================
  | Orders
  |============================
*/

export const getOrders = async (params?: QueryParams): Promise<OrdersData> => {
  const { data } = await instance.get('/api/orders', { params });

  return data;
};

export const addOrders = async (user: Order): Promise<Order> => {
  const { data } = await instance.post('/api/orders', user);
  return data;
};

export const getOrdersId = async (id: string): Promise<Order> => {
  const { data } = await instance.get(`/api/orders/${id}`);
  return data;
};

export const editOrdersId = async (id: string): Promise<Order> => {
  const { data } = await instance.put(`/api/orders/${id}`);
  return data;
};

export const deleteOrdersId = async (id: string) => {
  await instance.delete(`/api/orders/${id}`);
};
