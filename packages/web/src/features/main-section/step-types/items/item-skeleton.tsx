import { useIsMobile } from '@/hooks/use-tresholds';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

export function ItemsStepSekeleton() {
  const isMobile = useIsMobile();

  return (
    <div className={'flex flex-col gap-4'}>
      <div className='flex h-full flex-col gap-6 lg:flex-row'>
        {isMobile && <div className='h-14'></div>}
        {!isMobile && (
          <div className='flex h-fit w-[250px] rounded-[22px] bg-white px-8 py-6'>
            <div className='flex w-full flex-col justify-start'>
              <div className='flex h-[24px] items-center'>
                <span className='text-base font-semibold'>Filters</span>
              </div>
              <hr className='my-6 border-[#D9D9D9]' />
              <Skeleton height={26} count={5} width={186} containerClassName='flex flex-col' />
            </div>
          </div>
        )}

        <div className='w-full pb-8'>
          <div className='flex h-fit flex-1 flex-col rounded-[22px] bg-white p-8'>
            <div className='mb-6 flex gap-4 border-b border-[#D9D9D9] pb-3'>
              <Skeleton height={30} className='mb-5' containerClassName='w-[70%]' />
            </div>
            <div className='flex flex-col gap-5'>
              {[1, 2, 3, 4, 5, 6, 7].map((x) => (
                <React.Fragment key={x}>
                  <Skeleton height={24} width={'80%'} />
                  <hr className='border-t border-[#D9D9D9]' />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
