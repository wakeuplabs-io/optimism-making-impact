import { useIsMobile } from '@/hooks/use-tresholds';
import Skeleton from 'react-loading-skeleton';

export function CardsStepSkeleton() {
  const isMobile = useIsMobile();
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex h-full w-full flex-col lg:flex-row lg:gap-8'>
        <div className='mb-6 flex w-full flex-col-reverse items-center lg:flex-1 lg:flex-col'>
          {!isMobile && (
            <div className='flex h-fit w-[250px] rounded-[22px] bg-white px-8 py-6'>
              <div className='flex w-full flex-col justify-start'>
                <div className='flex h-[24px] items-center'>
                  <span className='text-base font-semibold'>Filters</span>
                </div>
                <hr className='my-4 border-[#D9D9D9]' />
                {/* filters */}
                <Skeleton height={26} count={5} width={186} containerClassName='flex flex-col' />
              </div>
            </div>
          )}
          {isMobile && <div className='h-6'></div>}
        </div>
        <div className='w-full pt-0'>
          <div className='flex w-full flex-1 flex-col flex-wrap items-center gap-6 md:flex-row md:justify-between md:gap-8 lg:items-start lg:justify-start'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={`skeleton-${i}`}
                style={{ borderLeftColor: '#D9D9D9' }}
                className='group flex min-h-[320px] w-full flex-col gap-6 rounded-2xl border-l-[3px] bg-white p-8 md:w-[45%] lg:w-[320px]'
              >
                <div className='flex max-w-full flex-col gap-6'>
                  <Skeleton height={26} containerClassName='w-[90%]' />
                  <Skeleton count={5} />
                  <Skeleton count={2} containerClassName='flex flex-row gap-2' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
