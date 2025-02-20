import { UpdateStepBody, updateStepBodySchema } from '@optimism-making-impact/schemas';
import { Step } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { FormModal } from '@/components/form-modal';
import { Controller, useFormContext } from 'react-hook-form';
import { FormTextInput } from '@/components/form/form-text-input';

interface EditIconProps {
  step: Step;
  onSave?: (stepId: number, data: UpdateStepBody) => void;
  onDelete?: () => void;
}

export function EditStepModal(props: EditIconProps) {
  const defaultValues: UpdateStepBody = {
    title: props.step.title,
    icon: props.step.icon,
    description: props.step.description,
  };

  function handleSubmit(data: UpdateStepBody) {
    props.onSave?.(props.step.id, data);
  }

  return (
    <FormModal
      title='New category'
      trigger={<Pencil size={14} className='stroke-[#4E4E4E] hover:stroke-black' />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={updateStepBodySchema}
      onSecondaryClick={props.onDelete}
      secondaryButtonText='Delete'
      secondaryButtonIcon={<Trash />}
    >
      <FormFields defaultValues={defaultValues} step={props.step} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: UpdateStepBody;
  step: Step;
}

function FormFields({ defaultValues, step }: FormFieldsProps) {
  const { control } = useFormContext<UpdateStepBody>();

  return (
    <div className='grid gap-4 py-4'>
      <Controller
        name='title'
        control={control}
        defaultValue={defaultValues.title}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Title' />}
      />
      <Controller
        name='icon'
        control={control}
        defaultValue={defaultValues.icon}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Icon' />}
      />
      {step.type === 'ITEMS' && (
        <Controller
          name='description'
          control={control}
          defaultValue={defaultValues.description}
          render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Description' />}
        />
      )}
    </div>
  );
}
