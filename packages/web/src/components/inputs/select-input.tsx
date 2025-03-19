import { Select, SelectProps } from '@/components/select';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';

interface SelectInputModalProps extends SelectProps {
  name: string;
  label?: string;
  className?: string;
}

export function SelectInput(props: SelectInputModalProps) {
  const label = props.label ?? props.name;

  return (
    <div className='flex flex-col gap-1.5'>
      {label && (
        <Label htmlFor={props.name} className='text-xs text-[#BEBEBE] font-normal'>
          <span className='capitalize'>{label}</span>
        </Label>
      )}
      <Select
        {...props}
        itemClassName={props.itemClassName}
        triggerClassName={cn('h-[42px] w-full rounded-md border px-3 text-sm focus:ring-0', props.triggerClassName)}
      />
    </div>
  );
}
