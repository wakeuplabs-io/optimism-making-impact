import { FormModal } from '@/components/form-modal';
import { SidebarActionButton } from '@/components/sidebar-acion-button';
import { TextInput } from '@/components/text-input';
import { Plus } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

interface AddCategoryModalProps {
  roundId: number;
  onSave?: (name: string, icon: string, roundId: number) => void;
}

export interface AddCategoryFormData {
  name: string;
  iconUrl: string;
}

export function AddCategoryModal(props: AddCategoryModalProps) {
  const defaultValues: AddCategoryFormData = { name: '', iconUrl: '' };

  function handleSubmit(data: AddCategoryFormData) {
    props.onSave?.(data.name, data.iconUrl, props.roundId);
  }

  return (
    <FormModal<AddCategoryFormData>
      title='New category'
      trigger={<SidebarActionButton label='Add category' icon={<Plus size={12} className='font-bold text-white' />} />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    >
      <FormFields defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: AddCategoryFormData;
}

// The inner form fields use react-hook-form's context.
// We use Controller for inputs that work as controlled components.
function FormFields(props: FormFieldsProps) {
  const { control } = useFormContext<AddCategoryFormData>();

  return (
    <div className='grid w-full gap-4 py-4'>
      <Controller
        name='name'
        control={control}
        defaultValue={props.defaultValues.name}
        render={({ field }) => <TextInput {...field} placeholder='Title' />}
      />
      <Controller
        name='iconUrl'
        control={control}
        defaultValue={props.defaultValues.iconUrl}
        render={({ field }) => <TextInput {...field} placeholder='Icon URL' />}
      />
    </div>
  );
}
