import { Select, SelectProps } from '@/components/select';
import { Label } from '@radix-ui/react-label';

interface SelectInputModalProps extends SelectProps {
  name: string;
  className?: string;
}

export function SelectInput(props: SelectInputModalProps) {
  const { name } = props;
  return (
    <div className='flex flex-col gap-1.5'>
      <Label htmlFor={name} className='sr-only'>
        <span>{name}</span>
      </Label>
      <Select {...props} itemClassName={props.itemClassName} />
    </div>
  );
}
