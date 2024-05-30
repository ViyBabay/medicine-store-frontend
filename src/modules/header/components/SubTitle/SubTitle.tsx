import { selectUser } from '@/redux/auth/authSelectors';
import { useAppSelector } from '@/redux/hook';
import { useCurrentPageName } from '@/shared/hooks/CurrentPage';

export const SubTitle = () => {
  const currentPage = useCurrentPageName();
  const { email } = useAppSelector(selectUser);

  return (
    <div className="flex items-center gap-2 text-xs font-normal leading-[18px] text-light-grey">
      <p>{currentPage}</p>
      <span className="h-3 border-r-2 border-solid" />
      <p>{email}</p>
    </div>
  );
};
