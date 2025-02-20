import { TextInput } from '../text-input';

interface FormTextInputProps extends React.ComponentProps<typeof TextInput> {
  error?: string;
}

export function FormTextInput({ error, ...field }: FormTextInputProps) {
  return (
    <div className='flex flex-col gap-1'>
      <TextInput {...field} />
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </div>
  );
}
