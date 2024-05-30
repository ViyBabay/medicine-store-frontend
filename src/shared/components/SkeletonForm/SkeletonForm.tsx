import { Skeleton } from '@nextui-org/react';
import inputs from '../../../modules/allProducts/components/modalInput.json';

export const SkeletonFormProduct = () => {
  return (
    <div className=" w-full flex flex-col items-center gap-[14px]  md:flex-row flex-wrap md:gap-x-2">
      {inputs.map(input => (
        <Skeleton
          key={input.name}
          className=" h-[44px] w-full rounded-full md:w-[224px]"
        >
          <div className=" h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      ))}
    </div>
  );
};
