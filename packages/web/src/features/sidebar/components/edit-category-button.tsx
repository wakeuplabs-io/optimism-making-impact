import { IconPicker } from './icon-picker';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { FormModal } from '@/components/form-modal';
import { FormErrorMessage } from '@/components/form/form-error-message';
import { FormTextInput } from '@/components/form/form-text-input';
import { EditIcon } from '@/components/icons/edit-icon';
import { useIcons } from '@/hooks/use-icons';
import { Category } from '@/types';
import { EditCategoryBody, editCategoryBodySchema } from '@optimism-making-impact/schemas';
import { Save } from 'lucide-react';
import { Trash } from 'lucide-react';
import { createElement, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useToggle } from 'usehooks-ts';

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
        submitButtonIcon={<Save />}
        submitButtonText='Save'
        secondaryButtonText='Delete'
        secondaryButtonIcon={<Trash />}
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
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-normal text-[#BEBEBE]'>Icon</label>
          <div
            className={`flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-md border border-gray-300 ${isIconPickerOpen && 'text-[#FF0420]'}`}
            onClick={() => setIsIconPickerOpen((prev) => !prev)}
          >
            {modalIcons[selectedIcon] && createElement(modalIcons[selectedIcon])}
          </div>
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
          <div className='col-span-2 mt-2 flex h-[250px] flex-col gap-2'>
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
