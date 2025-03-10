import { FormModal } from '@/components/form-modal';
import { FormInputWrapper } from '@/components/form/form-input';
import { FormTextInput } from '@/components/form/form-text-input';
import { IconButton } from '@/components/icon-button';
import { TextAreaInput } from '@/components/text-area-input';
import { CreateInfographicBody, createInfographicBodySchema } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

interface AddInfographicModalProps {
  stepId: number;
  className?: string;
  onClick?: (data: CreateInfographicBody) => void;
}

export function AddInfographicModal(props: AddInfographicModalProps) {
  const defaultValues: CreateInfographicBody = {
    image: '',
    markdown: '',
    stepId: props.stepId,
  };

  function handleSubmit(data: CreateInfographicBody) {
    props.onClick?.(data);
  }

  return (
    <FormModal
      title='Add Infographic'
      trigger={<IconButton variant='secondary' icon={<Plus strokeWidth={3} />} />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={createInfographicBodySchema}
    >
      <FormFields defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: CreateInfographicBody;
}

function FormFields({ defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<CreateInfographicBody>();

  return (
    <div className='grid gap-4 py-4'>
      <Controller
        name='markdown'
        control={control}
        defaultValue={defaultValues.markdown}
        render={({ field, fieldState }) => (
          <FormInputWrapper error={fieldState.error?.message}>
            <TextAreaInput {...field} rows={7} placeholder='Content' />
          </FormInputWrapper>
        )}
      />
      <Controller
        name='image'
        control={control}
        defaultValue={defaultValues.image}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Image' />}
      />
    </div>
  );
}
