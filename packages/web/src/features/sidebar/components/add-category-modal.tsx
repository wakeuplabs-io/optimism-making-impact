import { IconPicker } from './icon-picker';
import { FormModal } from '@/components/form-modal';
import { FormErrorMessage } from '@/components/form/form-error-message';
import { FormTextInput } from '@/components/form/form-text-input';
import { NewButton } from '@/components/new-button';
import { CreateCategoryBody, createCategoryBodySchema } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { createElement, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface AddCategoryModalProps {
  roundId: number;
  onSave?: (name: string, icon: string, roundId: number) => void;
}

const modalIcons: Record<string, React.ComponentType> = Object.fromEntries(
  Object.entries(LucideIcons).map(([key, value]) => [key.toLowerCase(), value as React.ComponentType]),
);

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
  console.log({selectedIcon})
  return (
    <div className='grid grid-cols-[50px_1fr] items-center gap-2'>
      <div className='flex gap-2 col-span-2'>
        <div 
          className='flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-md border border-gray-300'
          onClick={() => setIsIconPickerOpen((prev) => !prev)}
        >
          {modalIcons[selectedIcon] ? createElement(modalIcons[selectedIcon]) : <Plus className='h-6 w-6 text-black-500' />}
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
              />
              <FormErrorMessage error={fieldState.error?.message} />
            </div>
          )}
        />
      </div>
      <Controller
        name='icon'
        control={control}
        defaultValue={props.defaultValues.icon}
        render={({ field, fieldState }) => (
<>
          {isIconPickerOpen && <div className='col-span-2'>
            <IconPicker
              selectedIcon={field.value}
              modalIcons={modalIcons}
              onSelect={(icon) => {
                setValue('icon', icon);
              }}
            />
            <FormErrorMessage error={fieldState.error?.message} />
          </div>}
</>

        )}
      />
    </div>
  );
}
