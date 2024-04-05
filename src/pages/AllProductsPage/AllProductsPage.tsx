import React from 'react';
import { TableAllProducts } from '../../modules/allProducts/components/TableAllProducts/TableAllProducts';
import { AddNew } from '../../modules/allProducts/components/AddNew/AddNew';
import { Filter } from '../../modules/allProducts/components/Filter/Filter';

export const AllProductsPage = () => {
    return (
        <div>
            <Filter />
            <AddNew />
            <TableAllProducts />
        </div>
    );
};
