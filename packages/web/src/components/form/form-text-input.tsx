import { TextInput } from '../text-input';
import { FormInputWrapper } from './form-input';

interface FormTextInputProps extends React.ComponentProps<typeof TextInput> {
  error?: string;
  wrapperClassname?: string;
}

export function FormTextInput({ error, wrapperClassname, ...field }: FormTextInputProps) {
  return (
    <FormInputWrapper error={error} className={wrapperClassname}>
      <TextInput {...field} />
    </FormInputWrapper>
  );
}
