import { TextInput } from '../text-input';

interface FormTextInputProps extends React.ComponentProps<typeof TextInput> {
  error?: string;
}

export function FormTextInput({ error, ...field }: FormTextInputProps) {
  return (
    <>
      <TextInput {...field} />
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </>
  );
}
