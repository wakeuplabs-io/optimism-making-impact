import { FormModal } from '@/components/form-modal';
import { NewButton } from '@/components/new-button';
import { Plus } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { IconPicker } from './icon-picker';
import { createElement, useState } from 'react';
import { Accessibility, AlarmClock, Archive, Bell } from 'lucide-react';

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

const hardcodedIcons: Record<string, React.ComponentType> = {
  accessibility: Accessibility,
  alarm: AlarmClock,
  archive: Archive,
  bell: Bell,
};
function FormFields(props: FormFieldsProps) {
  const { control, setValue } = useFormContext<AddCategoryFormData>();
  const [selectedIcon, setSelectedIcon] = useState<string>('Accessibility'); // Nombre de ícono por defecto

  return (
    <div className="grid grid-cols-1 gap-2 w-full">
      <div className="grid grid-cols-[50px_1fr] gap-2 items-center text-gray-500 text-sm">
        <span>Icon</span>
        <span>Title</span>
      </div>

      <div className="grid grid-cols-[50px_1fr] gap-2 items-center">
        <Controller
          name='iconUrl'
          control={control}
          defaultValue={props.defaultValues.iconUrl}
          render={({ field }) => (
            <div
              {...field}
              onClick={() => console.log("Open icon picker")}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-md border border-gray-300 cursor-pointer"
            >
              {hardcodedIcons[selectedIcon] ? (
                createElement(hardcodedIcons[selectedIcon])
              ) : (
                <Plus className="text-red-500 w-6 h-6" />
              )}
            </div>
          )}
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
              className="w-full h-[42px] rounded-md border border-gray-300 px-3 text-sm focus:border-red-500 focus:ring-0"
            />
          }
        />
      </div>

      <IconPicker 
        selectedIcon={selectedIcon} 
        onSelect={(icon) => {
          setSelectedIcon(icon);
          setValue('iconUrl', icon);
        }} 
      />
    </div>
  );
}
