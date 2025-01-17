import { cn } from '@/lib/utils';
import { Infography } from '@/types/infographies';

interface InfogrpahyCardProps {
  infography: Infography;
  order: number;
}

export function InfographyCard(props: InfogrpahyCardProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-between gap-4 p-4 lg:flex-row lg:gap-24',
        props.order % 2 === 0 && 'lg:flex-row-reverse',
      )}
    >
      <div className='flex aspect-square max-h-[345px] w-full max-w-[345px] items-center justify-center'>
        <img className='h-full w-full rounded-full object-fill object-center' src={props.infography.image} alt='' />
      </div>
      <div className='flex max-w-[500px] flex-[2] items-center'>
        <span>{props.infography.markdown}</span>
      </div>
    </div>
  );
}
