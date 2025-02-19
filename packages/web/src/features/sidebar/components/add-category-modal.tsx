import { FormModal } from '@/components/form-modal';
import { NewButton } from '@/components/new-button';
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
      title='New Category'
      trigger={<NewButton label='Add category' />}
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
      <div className="grid grid-cols-[auto_1fr] items-center gap-4 w-full">
      <Controller
        name='iconUrl'
        control={control}
        defaultValue={props.defaultValues.iconUrl}
        render={({ field }) => 
          <div 
            {...field}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            {/* Aquí va el ícono */}
          </div>}
      />
      <Controller
        name='name'
        control={control}
        defaultValue={props.defaultValues.name}
        render={({ field }) => 
          <input
            {...field}
            type="text"
            placeholder="Write here..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-0"
          />
        }
      />

    </div>
  );
}
