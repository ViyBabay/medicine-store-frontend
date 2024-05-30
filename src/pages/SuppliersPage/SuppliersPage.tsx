import { BtnAddSuppliers } from '@/modules/suppliers/components/BtnAddSuppliers/BtnAddSuppliers';
import { FormSuppliers } from '@/modules/suppliers/components/FormSuppliers/FormSuppliers';
import { TableSuppliers } from '@/modules/suppliers/components/TableSuppliers/TableSuppliers';
import { useAppDispatch } from '@/redux/hook';
import { setCurrentSupplier } from '@/redux/suppliers/suppliersSlice';
import { Modal } from '@/shared/components/Modal/Modal';
import { I18nProvider } from '@react-aria/i18n';
import { Filter } from '@/shared/components/Filter/Filter';
import { useState } from 'react';

const SuppliersPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');

    const dispatch = useAppDispatch();

    const openModal = (mode: string) => {
        setModalMode(mode);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        dispatch(setCurrentSupplier(null));
    };
    return (
        <div className="w-full pt-10">
            <div className="justify-between px-5 md:flex md:px-8 desk:px-10">
                <Filter placeholder="User Name" />
                <BtnAddSuppliers openModal={openModal} />
            </div>
            <TableSuppliers openModal={openModal} />

            <Modal isOpen={isOpen} onClose={closeModal}>
                <I18nProvider locale="en-US">
                    <FormSuppliers mode={modalMode} onClose={closeModal} />
                </I18nProvider>
            </Modal>
        </div>
    );
};

export default SuppliersPage;
