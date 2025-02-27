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
import { useToggle } from 'usehooks-ts';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';

interface EditCategoryButtonProps {
  onSave: (name: string, icon: string) => void;
  onDelete: (category: Category) => void;
  category: Category;
}

export function EditCategoryButton(props: EditCategoryButtonProps) {
  const [isDeleteConfirmationModalOpen, toggleDeleteConfirmationModal] = useToggle();
  const defaultValues: EditCategoryBody = { name: props.category.name, icon: props.category.icon };

  function handleSubmit(data: EditCategoryBody) {
    props.onSave(data.name, data.icon);
  }

  return (
    <>
      <FormModal
        title='Edit category'
        trigger={<EditIcon />}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        schema={editCategoryBodySchema}
        submitButtonText='Save'
        secondaryButtonText='Delete'
        onSecondaryClick={toggleDeleteConfirmationModal}
      >
        <FormFields defaultValues={defaultValues} />
      </FormModal>
      {isDeleteConfirmationModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteConfirmationModalOpen}
          title='Delete category'
          description={
            <span>
              Are you sure you want to delete <b>{props.category.name}</b> category?
            </span>
          }
          onConfirm={() => props.onDelete(props.category)}
          onOpenChange={toggleDeleteConfirmationModal}
        />
      )}
    </>
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
          <div className='flex flex-col col-span-2 gap-2 w-[450px] h-[250px] mt-2'>
            {isIconPickerOpen && (
              <>
                <IconPicker
                  selectedIcon={field.value}
                  modalIcons={modalIcons}
                  onSelect={(icon) => {
                    setValue('icon', icon);
                  }}
                />
                {fieldState.error?.message && <FormErrorMessage error={fieldState.error.message} />}
              </>
            )}
          </div>
        )}
      />
    </div>
  );
}
