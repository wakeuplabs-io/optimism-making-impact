import { cn } from '@/lib/utils';
import Skeleton from 'react-loading-skeleton';

export function InfographicStepSkeleton() {
  return (
    <div className='flex w-full flex-col items-center bg-white px-8 py-12 lg:gap-8 lg:rounded-3xl lg:px-16 lg:pb-16 lg:pt-7'>
      <div className='flex w-full flex-col gap-y-16'>
        {[1, 2, 3].map((x) => (
          <div
            key={x}
            className={cn('flex w-full flex-col-reverse items-center justify-center gap-6 rounded-[10px] xl:flex-row xl:gap-12', {
              'xl:order-2': x % 2 === 0,
              'xl:order-1': !(x % 2 === 0),
            })}
          >
            <div className='flex w-full flex-grow flex-col xl:w-1/2'>
              <Skeleton count={1} height={64} containerClassName='w-2/3' borderRadius={10} className='my-10 w-max px-3' />
              <Skeleton count={2} height={36} containerClassName='w-full' borderRadius={10} className='my-2 w-max px-3' />
            </div>
            <Skeleton containerClassName='items-center justify-center w-full xl:w-1/2' className='aspect-video h-[274px] xl:h-[320px]' />
          </div>
        ))}
      </div>
    </div>
  );
}
