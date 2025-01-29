import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

export function TextInput(props: React.ComponentProps<'input'>) {
  return (
    <div className='flex flex-col gap-1.5'>
      <Label htmlFor={props.name} className='sr-only'>
        <span>{props.name}</span>
      </Label>
      <Input {...props} />
    </div>
  );
}
