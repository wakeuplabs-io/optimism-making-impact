import { Select as SelectComponent, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectItem {
  value: string;
  label: string;
}

interface SelectProps {
  items: SelectItem[];
  defaultValue?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  triggerClassName?: string;
  itemClassName?: string;
}

export function Select(props: SelectProps) {
  return (
    <SelectComponent onValueChange={props.onValueChange} defaultValue={props.defaultValue}>
      <SelectTrigger className={cn(props.triggerClassName)}>
        <SelectValue placeholder={props.placeholder} />
        <ChevronDown size={18} color='black' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.items.map((item) => (
            <SelectItem key={item.value} value={item.value} className={cn('focus:bg-[#B8B8B8]', props.itemClassName)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectComponent>
  );
}
