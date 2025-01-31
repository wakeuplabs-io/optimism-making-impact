import { Select as SelectComponent, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectItem {
  value: string;
  label: string | React.ReactNode;
}

export interface SelectProps {
  items: SelectItem[];
  defaultValue?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  triggerClassName?: string;
  itemClassName?: string;
  value?: string;
}

export function Select(props: SelectProps) {
  return (
    <SelectComponent onValueChange={props.onValueChange} defaultValue={props.defaultValue} value={props.value}>
      <SelectTrigger className={cn(props.triggerClassName)}>
        <SelectValue placeholder={props.placeholder} />
        <ChevronDown size={18} className='text-input' />
      </SelectTrigger>
      <SelectContent>
        {props.items.map((item) => (
          <SelectItem key={item.value} value={item.value} className={cn('focus:bg-[#B8B8B8]', props.itemClassName)}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectComponent>
  );
}
