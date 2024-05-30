import { Modal } from '@/shared/components/Modal/Modal';
import { AddNew } from '../AddNew/AddNew';
import { TableAllProducts } from '../TableAllProducts/TableAllProducts';
import { Filter } from '@/shared/components/Filter/Filter';
import { FormAllProducts } from '../FormAllProducts/FormAllProducts';
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hook';

import { setCurrentProduct } from '@/redux/products/productsSlice';

export const AllProducts = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');

    const openModal = (mode: string) => {
        setModalMode(mode);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        dispatch(setCurrentProduct(null));
    };

    return (
        <div className="w-full pt-10">
            <div className="justify-between px-5 md:flex md:px-8 desk:px-10">
                <Filter placeholder="Product Name" />
                <AddNew openModal={openModal} />
            </div>
            <TableAllProducts openModal={openModal} />
            <Modal isOpen={isOpen} onClose={closeModal}>
                <FormAllProducts mode={modalMode} onClose={closeModal} />
            </Modal>
        </div>
    );
};
