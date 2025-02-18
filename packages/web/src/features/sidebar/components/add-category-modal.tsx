import { Controller, useFormContext } from 'react-hook-form';
import { FormModal } from '@/components/form-modal';
import { SidebarActionButton } from '@/components/sidebar-acion-button';
import { Plus } from 'lucide-react';
import { CreateCategoryBody, createCategoryBodySchema } from '@optimism-making-impact/schemas';
import { FormTextInput } from '@/components/form/form-text-input';

interface AddCategoryModalProps {
  roundId: number;
  onSave?: (name: string, icon: string, roundId: number) => void;
}

export function AddCategoryModal(props: AddCategoryModalProps) {
  const defaultValues: CreateCategoryBody = { name: '', icon: '', roundId: props.roundId };

  function handleSubmit(data: CreateCategoryBody) {
    props.onSave?.(data.name, data.icon, props.roundId);
  }

  return (
    <FormModal
      title='New category'
      trigger={<SidebarActionButton label='Add category' icon={<Plus size={12} className='font-bold text-white' />} />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={createCategoryBodySchema}
    >
      <FormFields defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: CreateCategoryBody;
}

// The inner form fields use react-hook-form's context.
// We use Controller for inputs that work as controlled components.
function FormFields(props: FormFieldsProps) {
  const { control } = useFormContext<CreateCategoryBody>();

  return (
    <div className='grid w-full gap-4 py-4'>
      <Controller
        name='name'
        control={control}
        defaultValue={props.defaultValues.name}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Name' />}
      />
      <Controller
        name='icon'
        control={control}
        defaultValue={props.defaultValues.icon}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Icon' />}
      />
    </div>
  );
}
