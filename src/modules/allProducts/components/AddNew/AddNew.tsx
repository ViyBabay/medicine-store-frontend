import React from 'react';
import AddIcon from '../../../../shared/icon/add-outline.svg';

export const AddNew = () => {
    return (
        <div className="flex items-center gap-2">
            <button className="w-42 h-42 rounded-full bg-green-500">
                <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="42" height="42" rx="21" fill="#59B17A" />
                    <path
                        d="M27 21H15M21 15V27V15Z"
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
