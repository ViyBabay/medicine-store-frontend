import { logoutThunk } from '@/redux/auth/authOperations';
import { useAppDispatch } from '@/redux/hook';
import icon from '@/shared/icon/sprite.svg';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoutBtnProps {
    close: () => void;
}

export const LogoutBtn: FC<LogoutBtnProps> = ({ close }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        close();
        dispatch(logoutThunk())
            .unwrap()
            .then(() => {
                navigate('/');
            })
            .catch(error => console.log(error));
    };
    return (
        <button
            onClick={handleSignOut}
            type="button"
            className="btn rounded-full p-[14px] md:size-11"
        >
            <svg width={16} height={16} className="fill-white stroke-white">
                <use href={icon + '#icon-logout'}></use>
            </svg>
        </button>
    );
};
