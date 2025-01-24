import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

interface TextInputModalProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function TextInput(props: TextInputModalProps) {
  const { name, value, onChange, placeholder = 'Enter text' } = props;

  return (
    <div className='flex flex-col gap-1.5'>
      <Label htmlFor={name} className='sr-only'>
        <span>{name}</span>
      </Label>
      <Input type='text' id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
