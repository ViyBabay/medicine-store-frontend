import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';

interface Product {
    id: string;
    photo: string;
    name: string;
    suppliers: string;
    stock: string;
    price: string;
    category: string;
}

const rows: Product[] = [
    {
        id: '0',
        photo: 'https://i.ibb.co/bLKP624/5-15-1000x1000-min.jpg',
        name: 'Aspirin',
        suppliers: 'Square',
        stock: '12',
        price: '89.66',
        category: 'Medicine',
    },
    {
        id: '1',
        photo: 'https://i.ibb.co/Hg0zZkQ/shop-4-7-1000x1000-min.jpg',
        name: 'Paracetamol',
        suppliers: 'Acme',
        stock: '19',
        price: '34.16',
        category: 'Heart',
    },
    {
        id: '2',
        photo: 'https://i.ibb.co/02WmJdc/5-19-1000x1000-min.jpg',
        name: 'Ibuprofen',
        suppliers: 'Beximco',
        stock: '09',
        price: '53.76',
        category: 'Head',
    },
    {
        id: '3',
        photo: 'https://i.ibb.co/GxTVSVk/shop-4-9-1000x1000-min.jpg',
        name: 'Acetaminophen',
        suppliers: 'ACI',
        stock: '14',
        price: '28.57',
        category: 'Hand',
    },
    {
        id: '4',
        photo: 'https://i.ibb.co/X330FTj/shop-4-10-1000x1000-min.jpg',
        name: 'Naproxen',
        suppliers: 'Uniliver',
        stock: '10',
        price: '56.34',
        category: 'Leg',
    },
    {
        id: '5',
        photo: 'https://i.ibb.co/bLKP624/5-15-1000x1000-min.jpg',
        name: 'Amoxicillin',
        suppliers: 'Square',
        stock: '25',
        price: '45.99',
        category: 'Medicine',
    },
];

export const TableAllProducts = () => {
    const handleEdit = (id: string) => {
        console.log('Edit product with id:', id);
    };

    const handleDelete = (id: string) => {
        console.log('Delete product with id:', id);
    };

    return (
        <Table aria-label="Product table">
            <TableHeader>
                <TableColumn key="name">Product Info</TableColumn>
                <TableColumn key="category">Category</TableColumn>
                <TableColumn key="stock">Stock</TableColumn>
                <TableColumn key="suppliers">Suppliers</TableColumn>
                <TableColumn key="price">Price</TableColumn>
                <TableColumn key="action">Action</TableColumn>
            </TableHeader>
            <TableBody items={rows}>
                {item => (
                    <TableRow key={item.id}>
                        {columnKey => (
                            <TableCell>
                                {columnKey === 'action' ? (
                                    <div>
                                        <button
                                            onClick={() => handleEdit(item.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : (
                                    item[columnKey as keyof Product]
                                )}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};
