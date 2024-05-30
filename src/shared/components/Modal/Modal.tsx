import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import icon from '@/shared/icon/sprite.svg';

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
    const [modalContainer, setModalContainer] = useState<Element | null>(null);

    useEffect(() => {
        setModalContainer(document.getElementById('modal-root'));
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [onClose]);

    if (!isOpen || !modalContainer) return null;

    return createPortal(
        <div
            onClick={onClose}
            className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div
                onClick={e => e.stopPropagation()}
                className="relative w-[335px] rounded-xl bg-white px-5 py-10 md:w-[536px] md:p-10"
            >
                <button
                    type="button"
                    className="absolute right-3.5 top-3.5 transition-transform duration-300 hover:scale-110"
                    aria-label="close modal"
                    onClick={onClose}
                >
                    <svg
                        width={24}
                        height={24}
                        className="stroke-black"
                        style={{
                            fill: 'none',
                        }}
                    >
                        <use href={icon + '#icon-close'}></use>
                    </svg>
                </button>
                {children}
            </div>
        </div>,
        modalContainer,
    );
};
