import { IconPicker } from '../sidebar/components/icon-picker';
import { EditEntityModal } from '@/components/form/edit-entity-modal';
import { FormErrorMessage } from '@/components/form/form-error-message';
import { FormTextInput } from '@/components/form/form-text-input';
import { useIcons } from '@/hooks/use-icons';
import { cn } from '@/lib/utils';
import { Step } from '@/types/steps';
import { UpdateStepBody, updateStepBodySchema } from '@optimism-making-impact/schemas';
import { createElement, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface EditStepModalProps {
  step: Step;
  onSave?: (stepId: number, data: UpdateStepBody) => void;
  onDelete: () => void;
}

export function EditStepModal(props: EditStepModalProps) {
  const defaultValues: UpdateStepBody = {
    title: props.step.title,
    icon: props.step.icon,
    description: props.step.description ?? undefined,
  };

  function handleSubmit(data: UpdateStepBody) {
    props.onSave?.(props.step.id, data);
  }

  return (
    <EditEntityModal
      entity='tab'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={updateStepBodySchema}
      deleteDescription={
        <span>
          Are you sure you want to delete <b>{props.step.title}</b> step?
        </span>
      }
      onDelete={props.onDelete}
    >
      <FormFields defaultValues={defaultValues} step={props.step} />
    </EditEntityModal>
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
    <div className='flex flex-col w-full'>
      <div className='flex gap-4'>
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-normal text-[#BEBEBE]'>Icon</label>
          <div
            className={cn('flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-md border border-gray-300', {
              'text-[#FF0420]': !!selectedIcon,
            })}
            onClick={() => setIsIconPickerOpen((prev) => !prev)}
          >
            {modalIcons[selectedIcon] && createElement(modalIcons[selectedIcon])}
          </div>
        </div>

        <div className='flex flex-col w-full gap-1'>
          <Controller
            name='title'
            control={control}
            defaultValue={defaultValues.title}
            render={({ field, fieldState }) => (
              <div className='w-full'>
                <FormTextInput {...field} placeholder='Write here...' error={fieldState.error?.message} />
              </div>
            )}
          />
        </div>
      </div>
      {step.type === 'SMARTLIST' && (
        <div className='flex flex-col gap-1'>
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
          <div className='flex flex-col gap-2 mt-2'>
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
