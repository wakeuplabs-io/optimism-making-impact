import { IconPicker } from './icon-picker';
import { SidebarModalAddTrigger } from './sidebar-modal-add-trigger';
import { FormErrorMessage } from '@/components/form/form-error-message';
import { FormModal } from '@/components/form/form-modal';
import { FormTextInput } from '@/components/form/form-text-input';
import { useIcons } from '@/hooks/use-icons';
import { cn } from '@/lib/utils';
import { CreateCategoryBody, createCategoryBodySchema } from '@optimism-making-impact/schemas';
import { createElement, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface AddCategoryModalProps {
  roundId?: number;
  onSave?: (name: string, icon: string, roundId: number) => void;
}

export function AddCategoryModal(props: AddCategoryModalProps) {
  if (!props.roundId) return;

  const defaultValues: CreateCategoryBody = { name: '', icon: 'blocks', roundId: props.roundId };

  function handleSubmit(data: CreateCategoryBody) {
    if (!props.roundId) return;

    props.onSave?.(data.name, data.icon, props.roundId);
  }

  return (
    <FormModal
      title='New category'
      trigger={<SidebarModalAddTrigger label='New Category' />}
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
    <div className='flex flex-col items-center gap-2'>
      <div className='flex w-full gap-4'>
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
        <Controller
          name='name'
          control={control}
          defaultValue={props.defaultValues.name}
          render={({ field, fieldState }) => (
            <div className='w-full'>
              <FormTextInput {...field} placeholder='Write here...' error={fieldState.error?.message} />
            </div>
          )}
        />
      </div>
      <Controller
        name='icon'
        control={control}
        defaultValue={props.defaultValues.icon}
        render={({ field, fieldState }) => (
          <div className='col-span-2 mt-2 flex w-full flex-col gap-2'>
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
