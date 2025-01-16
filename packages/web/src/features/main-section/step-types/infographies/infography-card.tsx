import { cn } from '@/lib/utils';
import { Infography } from '@/types/infographies';

interface InfogrpahyCardProps {
  infography: Infography;
  order: number;
}

export function InfographyCard(props: InfogrpahyCardProps) {
  return (
    <div className={cn('flex w-full flex-col justify-between gap-4 p-4 lg:flex-row', props.order % 2 === 0 && 'lg:flex-row-reverse')}>
      <div className='flex h-[345px] w-[345px] items-center justify-center'>
        <img className='h-full w-full rounded-full object-fill object-center' src={props.infography.image} alt='' />
      </div>
      <div className='flex flex-[2] items-center'>
        <span>{props.infography.markdown}</span>
      </div>
    </div>
  );
}
