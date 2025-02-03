import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';

interface TextAreaInputModalProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export function TextAreaInput(props: TextAreaInputModalProps) {
  const { name } = props;

  function resize(event: React.FormEvent<HTMLTextAreaElement>) {
    const textarea = event.currentTarget;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height dynamically
  }

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
        onInput={resize}
        {...props}
      />
    </>
  );
}
