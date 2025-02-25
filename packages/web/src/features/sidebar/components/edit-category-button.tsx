import { Controller, useFormContext } from 'react-hook-form';
import { FormModal } from '@/components/form-modal';
import { EditIcon } from '@/components/icons/edit-icon';
import { Category } from '@/types';
import { EditCategoryBody, editCategoryBodySchema } from '@optimism-making-impact/schemas';
import { FormTextInput } from '@/components/form/form-text-input';
import { createElement, useState } from 'react';
import { FormErrorMessage } from '@/components/form/form-error-message';
import { IconPicker } from './icon-picker';
import { useIcons } from '@/hooks/use-icons';

interface EditCategoryButtonProps {
  onSave: (name: string, icon: string) => void;
  category: Category;
}

export function EditCategoryButton(props: EditCategoryButtonProps) {
  const defaultValues: EditCategoryBody = { name: props.category.name, icon: props.category.icon };

  function handleSubmit(data: EditCategoryBody) {
    props.onSave(data.name, data.icon);
  }

  return (
    <FormModal
      title='Edit category'
      trigger={<EditIcon />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={editCategoryBodySchema}
      submitButtonText='Save'
      secondaryButtonText='Delete'
    >
      <FormFields defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: EditCategoryBody;
}

function FormFields({ defaultValues }: FormFieldsProps) {
  const { control, setValue, watch } = useFormContext<EditCategoryBody>();
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const modalIcons = useIcons();
  const selectedIcon = watch('icon');

  return (
    <div className='grid grid-cols-[50px_1fr] items-center gap-2'>
      <div className='col-span-2 flex gap-2'>
        <div
          className='flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-md border border-gray-300'
          onClick={() => setIsIconPickerOpen((prev) => !prev)}
        >
          {modalIcons[selectedIcon] && createElement(modalIcons[selectedIcon])}
        </div>
        <Controller
          name='name'
          control={control}
          defaultValue={defaultValues.name}
          render={({ field, fieldState }) => (
            <div className='w-full'>
              <FormTextInput
                {...field}
                className='h-[42px] w-full rounded-md border border-gray-300 px-3 text-sm focus:border-red-500 focus:ring-0'
                placeholder='Name'
                error={fieldState.error?.message}
              />
            </div>
          )}
        />
      </div>
      <Controller
        name='icon'
        control={control}
        defaultValue={defaultValues.icon}
        render={({ field, fieldState }) => (
          <>
            {isIconPickerOpen && (
              <div className='col-span-2'>
                <IconPicker
                  selectedIcon={field.value}
                  modalIcons={modalIcons}
                  onSelect={(icon) => {
                    setValue('icon', icon);
                  }}
                />
                <FormErrorMessage error={fieldState.error?.message} />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}
