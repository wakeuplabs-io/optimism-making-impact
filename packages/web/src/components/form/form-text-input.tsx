import { TextInput } from '../text-input';
import { FormInputWrapper } from './form-input';

interface FormTextInputProps extends React.ComponentProps<typeof TextInput> {
  error?: string;
}

export function FormTextInput({ error, ...field }: FormTextInputProps) {
  return (
    <FormInputWrapper error={error}>
      <TextInput {...field} />
    </FormInputWrapper>
  );
}
