import { FC } from 'react';

interface BtnAddSuppliersProps {
  openModal: (type: string) => void;
}

export const BtnAddSuppliers: FC<BtnAddSuppliersProps> = ({ openModal }) => {
  return (
    <button
      type="button"
      onClick={() => openModal('add')}
      className="btnGreen mt-4 px-[30px] py-[13px] text-xs/[14px] text-main-black md:mt-0"
    >
      Add a new suppliers
    </button>
  );
};
