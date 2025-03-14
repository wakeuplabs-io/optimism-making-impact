import { Select, SelectProps } from '@/components/select';
import { Label } from '@radix-ui/react-label';

interface SelectInputModalProps extends SelectProps {
  name: string;
  className?: string;
}

export function SelectInput(props: SelectInputModalProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      {props.name && (
        <Label htmlFor={props.name} className='text-xs text-[#BEBEBE] font-normal'>
          <span className='capitalize'>{props.name}</span>
        </Label>
      )}
      <Select
        {...props}
        itemClassName={props.itemClassName}
        triggerClassName='h-[42px] w-full rounded-md border px-3 text-sm focus:ring-0'
      />
    </div>
  );
}
