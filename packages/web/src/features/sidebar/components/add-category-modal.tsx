import { IconPicker } from './icon-picker';
import { FormModal } from '@/components/form-modal';
import { FormErrorMessage } from '@/components/form/form-error-message';
import { FormTextInput } from '@/components/form/form-text-input';
import { NewButton } from '@/components/new-button';
import { useIcons } from '@/hooks/use-icons';
import { CreateCategoryBody, createCategoryBodySchema } from '@optimism-making-impact/schemas';
import { createElement, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface AddCategoryModalProps {
  roundId: number;
  onSave?: (name: string, icon: string, roundId: number) => void;
}

export function AddCategoryModal(props: AddCategoryModalProps) {
  const defaultValues: CreateCategoryBody = { name: '', icon: 'blocks', roundId: props.roundId };

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
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const selectedIcon = watch('icon');
  const modalIcons = useIcons();

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
          defaultValue={props.defaultValues.name}
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
        defaultValue={props.defaultValues.icon}
        render={({ field, fieldState }) => (
          <div className='col-span-2 mt-2 flex h-[250px] w-[450px] flex-col gap-2'>
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
