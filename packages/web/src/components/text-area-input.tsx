import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';

interface TextAreaInputModalProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export function TextAreaInput(props: TextAreaInputModalProps) {
  const { name } = props;

  return (
    <div className='flex flex-col gap-1.5'>
      <Label htmlFor={name} className='sr-only'>
        <span>{name}</span>
      </Label>
      <textarea
        className={cn(
          'max-w-screen flex w-[500px] items-center overflow-auto break-words rounded border border-input p-2 text-sm',
          props.className,
        )}
        {...props}
      />
    </div>
  );
}
