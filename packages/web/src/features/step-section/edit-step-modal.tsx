import { IconPicker } from '../sidebar/components/icon-picker';
import { FormModal } from '@/components/form-modal';
import { FormErrorMessage } from '@/components/form/form-error-message';
import { FormTextInput } from '@/components/form/form-text-input';
import { useIcons } from '@/hooks/use-icons';
import { Step } from '@/types/steps';
import { UpdateStepBody, updateStepBodySchema } from '@optimism-making-impact/schemas';
import { Pencil, Trash } from 'lucide-react';
import { createElement, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface EditIconProps {
  step: Step;
  onSave?: (stepId: number, data: UpdateStepBody) => void;
  onDelete?: () => void;
}

export function EditStepModal(props: EditIconProps) {
  const defaultValues: UpdateStepBody = {
    title: props.step.title,
    icon: props.step.icon,
    description: props.step.description ?? undefined,
  };

  function handleSubmit(data: UpdateStepBody) {
    props.onSave?.(props.step.id, data);
  }

  return (
    <FormModal
      title='Edit tab'
      trigger={<Pencil size={14} className='stroke-[#4E4E4E] hover:stroke-black' />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={updateStepBodySchema}
      onSecondaryClick={props.onDelete}
      submitButtonText='Save'
      secondaryButtonText='Delete'
      secondaryButtonIcon={<Trash />}
    >
      <FormFields defaultValues={defaultValues} step={props.step} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: UpdateStepBody;
  step: Step;
}

function FormFields({ defaultValues, step }: FormFieldsProps) {
  const { control, setValue, watch } = useFormContext<UpdateStepBody>();
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const modalIcons = useIcons();
  const selectedIcon = watch('icon');

  return (
    <div className='grid gap-4 py-4'>
      <div className='flex col-span-2 gap-2'>
        <div className='flex flex-col gap-1'>
          <span className='text-xs font-medium text-gray-500'>Icon</span>
          <div
            className='flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-md border border-gray-300'
            onClick={() => setIsIconPickerOpen((prev) => !prev)}
          >
            {modalIcons[selectedIcon] && createElement(modalIcons[selectedIcon])}
          </div>
        </div>

        <div className='flex flex-col w-full gap-1'>
          <span className='text-xs font-medium text-gray-500'>Title</span>
          <Controller
            name='title'
            control={control}
            defaultValue={defaultValues.title}
            render={({ field, fieldState }) => (
              <div className='w-full'>
                <FormTextInput
                  {...field}
                  className='h-[42px] w-full rounded-md border border-gray-300 px-3 text-sm focus:border-red-500 focus:ring-0'
                  placeholder='Write here...'
                  error={fieldState.error?.message}
                />
              </div>
            )}
          />
        </div>
      </div>
      {step.type === 'SMARTLIST' && (
        <div className='flex flex-col col-span-2 gap-1'>
          <span className='text-xs font-medium text-gray-500'>Description</span>
          <Controller
            name='description'
            control={control}
            defaultValue={defaultValues.description}
            render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Description' />}
          />
        </div>
      )}

      <Controller
        name='icon'
        control={control}
        defaultValue={defaultValues.icon}
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
