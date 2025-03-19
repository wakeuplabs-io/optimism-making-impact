import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

export interface TextInputProps extends React.ComponentProps<'input'> {
  label?: string;
}

export function TextInput(props: TextInputProps) {
  const label = props.label ?? props.name;
  return (
    <div className='flex flex-col gap-1.5'>
      {label && (
        <Label htmlFor={props.name} className='text-xs text-[#BEBEBE] font-normal'>
          <span className='capitalize'>{label}</span>
        </Label>
      )}
      <Input {...props} id={props.name} />
    </div>
  );
}
