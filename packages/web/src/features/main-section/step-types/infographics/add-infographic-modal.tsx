import { ActionButton } from '@/components/action-button';
import { FormModal } from '@/components/form/form-modal';
import { FormTextInput } from '@/components/form/form-text-input';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CreateInfographicBody, createInfographicBodySchema } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormTextArea } from '@/components/form/form-text-area';

interface AddInfographicModalProps {
  stepId: number;
  className?: string;
}

export function AddInfographicModal(props: AddInfographicModalProps) {
  const addInfographic = useMainSectionStore((state) => state.addInfographic);

  const defaultValues: CreateInfographicBody = {
    image: '',
    markdown: '',
    stepId: props.stepId,
  };

  function handleSubmit(data: CreateInfographicBody) {
    addInfographic(data);
  }

  return (
    <FormModal
      title='Add Infographic'
      trigger={
        <div className='w-full max-w-[320px] lg:w-[250px] absolute top-0 left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:-translate-x-0'>
          <ActionButton label='Create New' variant='secondary' icon={<Plus strokeWidth={3} />} className='w-full' />
        </div>
      }
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
    <div className='flex flex-col gap-4'>
      <Controller
        name='markdown'
        control={control}
        defaultValue={defaultValues.markdown}
        render={({ field, fieldState }) => <FormTextArea error={fieldState.error?.message} {...field} rows={7} placeholder='Content' />}
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
