import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

export function TextInput(props: React.ComponentProps<'input'>) {
  return (
    <div className='flex flex-col gap-1.5'>
      {props.name && (
        <Label htmlFor={props.name} className='text-xs text-[#BEBEBE] font-normal'>
          <span className='capitalize'>{props.name}</span>
        </Label>
      )}
      <Input {...props} />
    </div>
  );
}
