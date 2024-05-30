import { FC } from 'react';

interface AddNewProps {
  openModal: (type: string) => void;
}

export const AddNew: FC<AddNewProps> = ({ openModal }) => {
  return (
    <div className="mt-[18px] flex items-center gap-2 md:mt-0">
      <button
        type="button"
        className="btn w-42 h-42 rounded-full "
        onClick={() => openModal('add')}
      >
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="42" height="42" rx="21" fill="#59B17A" />
          <path
            d="M27 21H15M21 15V27"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className="text-base font-medium leading-5 text-gray-900">
        Add a new product
      </p>
    </div>
  );
};
