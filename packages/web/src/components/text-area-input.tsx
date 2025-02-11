import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';

interface TextAreaInputModalProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export function TextAreaInput(props: TextAreaInputModalProps) {
  const { name } = props;

  return (
    <>
      <Label htmlFor={name} className='sr-only'>
        <span>{name}</span>
      </Label>
      <textarea
        className={cn(
          'max-w-screen w-full items-center overflow-auto break-words rounded border border-input bg-inherit p-2 text-sm',
          props.className,
        )}
        {...props}
      />
    </>
  );
}
