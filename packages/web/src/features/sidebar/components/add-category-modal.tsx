import { Controller, useFormContext } from 'react-hook-form';
import { FormModal } from '@/components/form-modal';
import { NewButton } from '@/components/new-button';
import { Plus } from 'lucide-react';
import { IconPicker } from './icon-picker';
import { createElement, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { SidebarActionButton } from '@/components/sidebar-acion-button';
import { CreateCategoryBody, createCategoryBodySchema } from '@optimism-making-impact/schemas';
import { FormTextInput } from '@/components/form/form-text-input';

interface AddCategoryModalProps {
  roundId: number;
  onSave?: (name: string, icon: string, roundId: number) => void;
}

const modalIcons: Record<string, React.ComponentType> = Object.fromEntries(
  Object.entries(LucideIcons)
    .map(([key, value]) => [key.toLowerCase(), value as React.ComponentType])
);

export function AddCategoryModal(props: AddCategoryModalProps) {
  const defaultValues: CreateCategoryBody = { name: '', icon: 'dot', roundId: props.roundId };

  function handleSubmit(data: CreateCategoryBody) {
    props.onSave?.(data.name, data.icon, props.roundId);
  }

  return (
    <FormModal
      title='New category'
      trigger={<NewButton label='Add category' />}
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

function FormFields(props: FormFieldsProps) {
  const { control, setValue, watch } = useFormContext<CreateCategoryBody>();

  // return (
  //   <div className="grid grid-cols-1 gap-2 w-full">
  //     <div className="grid grid-cols-[50px_1fr] gap-2 items-center text-gray-500 text-sm">
  //       <span>Icon</span>
  //       <span>Title</span>
  //     </div>

  //     <div className="grid grid-cols-[50px_1fr] gap-2 items-center">
  //       <Controller
  //         name='iconUrl'
  //         control={control}
  //         defaultValue={props.defaultValues.iconUrl}
  //         render={({ field }) => (

  //         )}
  //       />

  //       <Controller
  //         name='name'
  //         control={control}
  //         defaultValue={props.defaultValues.name}
  //         render={({ field }) => 
  //           <input
  //             {...field}
  //             type="text"
  //             placeholder="Write here..."
  //             className="w-full h-[42px] rounded-md border border-gray-300 px-3 text-sm focus:border-red-500 focus:ring-0"
  //           />
  //         }
  //       />
  //     </div>
  const selectedIcon = watch('icon');
  return (
    <div className="grid grid-cols-[50px_1fr] gap-2 items-center">
      <div
          onClick={() => console.log("Open icon picker")}
          className="flex h-[42px] w-[42px] items-center justify-center rounded-md border border-gray-300 cursor-pointer"
        >
      {modalIcons[selectedIcon] ? (
        createElement(modalIcons[selectedIcon])
      ) : (
        <Plus className="text-red-500 w-6 h-6" />
      )}
      </div>
      <Controller
        name='name'
        control={control}
        defaultValue={props.defaultValues.name}
        render={({ field, fieldState }) => <FormTextInput {...field} className="w-full h-[42px] rounded-md border border-gray-300 px-3 text-sm focus:border-red-500 focus:ring-0" error={fieldState.error?.message} placeholder='Name' />}
      />
      <Controller
        name='icon'
        control={control}
        defaultValue={props.defaultValues.icon}
        render={({ field }) =>
          <IconPicker 
            selectedIcon={field.value} 
            modalIcons={modalIcons}
            onSelect={(icon) => {
              setValue('icon', icon);
            }} 
          />
        }
      />
    </div>
  );
}
