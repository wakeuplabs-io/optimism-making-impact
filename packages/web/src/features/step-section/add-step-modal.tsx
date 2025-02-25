import { IconPicker } from '../sidebar/components/icon-picker';
import { FormModal } from '@/components/form-modal';
import { FormErrorMessage } from '@/components/form/form-error-message';
import { FormTextInput } from '@/components/form/form-text-input';
import { IconButton } from '@/components/icon-button';
import { SelectInput } from '@/components/inputs/select-input';
import { useIcons } from '@/hooks/use-icons';
import { capitalizeFirst } from '@/lib/utils';
import { SmartListsService } from '@/services/smart-lists/service';
import { CreateStepBody, stepTypes, StepType, createStepBodySchema } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import { createElement, useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

type SmartListOption = { label: string; value: string };

const options = stepTypes.map((type) => ({
  value: type,
  label: capitalizeFirst(type),
}));

const emptySmartListOption = { label: 'None', value: '0' };
interface AddStepModalProps {
  categoryId: number;
  onSave?: (categoryId: number, data: CreateStepBody) => void;
}

export function AddStepModal(props: AddStepModalProps) {
  const [smartListsOptions, setSmartListsOptions] = useState<SmartListOption[]>([]);
  const defaultValues = {
    title: '',
    icon: 'blocks',
    type: options[0].value as StepType,
    categoryId: props.categoryId,
    description: '',
  };

  function handleSubmit(data: CreateStepBody) {
    props.onSave?.(props.categoryId, data);
  }

  function onOpenChange(open: boolean) {
    if (!open) {
      return;
    }
    //load smart lists
    SmartListsService.getByCategoryId(props.categoryId).then((res) => {
      const smartListsOptions = res.smartLists.map((smartList) => ({ label: smartList.title, value: smartList.id.toString() }));
      if (smartListsOptions.length === 0) {
        return;
      }

      setSmartListsOptions([emptySmartListOption, ...smartListsOptions]);
    });
  }

  return (
    <FormModal
      title='New tab'
      trigger={<IconButton variant='secondary' icon={<Plus className='text-white' />} />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={createStepBodySchema}
      onOpenChange={onOpenChange}
    >
      <FormFields defaultValues={defaultValues} smartListOptions={smartListsOptions} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: CreateStepBody;
  smartListOptions: SmartListOption[];
}

function FormFields({ defaultValues, smartListOptions }: FormFieldsProps) {
  const { control, setValue, watch } = useFormContext<CreateStepBody>();
  const type = useWatch({ control, name: 'type' });
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const modalIcons = useIcons();
  const selectedIcon = watch('icon');
  useEffect(() => {
    if (type !== 'CARD') {
      setValue('smartListId', undefined);
    }
  }, [type, setValue]);

  return (
    <div className='flex flex-col w-full gap-4 py-4'>
      <Controller
        name='type'
        control={control}
        defaultValue={defaultValues.type}
        render={({ field, formState }) => (
          <div className='flex flex-col gap-1'>
            <span className='text-xs font-medium text-gray-500'>Type</span>
            <SelectInput
              name='type'
              items={options}
              onValueChange={field.onChange}
              defaultValue={formState.defaultValues?.type}
              placeholder='Select type'
              triggerClassName='h-[42px] w-full rounded-md border px-3 text-sm focus:ring-0'
            />
          </div>
        )}
      />

      {type === 'CARD' && smartListOptions.length > 0 && (
        <Controller
          name='smartListId'
          control={control}
          render={({ field }) => (
            <div className='flex flex-col gap-1'>
              <span className='text-xs font-medium text-gray-500'>Smart List</span>
              <SelectInput
                name='smartListId'
                items={smartListOptions}
                onValueChange={(value) => field.onChange(Number(value))}
                placeholder='Select Smart List'
                itemClassName='h-[42px] w-full rounded-md border border-gray-300 px-3 text-sm focus:border-red-500 focus:ring-0'
              />
            </div>
          )}
        />
      )}

      {type === 'ITEMS' && (
        <Controller
          name='description'
          control={control}
          defaultValue={defaultValues.description}
          render={({ field, fieldState }) => (
            <div className='flex flex-col gap-1'>
              <span className='text-xs font-medium text-gray-500'>Description</span>
              <FormTextInput
                {...field}
                error={fieldState.error?.message}
                placeholder='Description'
                className='h-[42px] w-full rounded-md border border-gray-300 px-3 text-sm focus:border-red-500 focus:ring-0'
              />
            </div>
          )}
        />
      )}

      <div className='col-span-2 flex gap-2'>
        <div className='flex flex-col gap-1'>
          <span className='text-xs font-medium text-gray-500'>Icon</span>
          <div
            className='flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-md border border-gray-300'
            onClick={() => setIsIconPickerOpen((prev) => !prev)}
          >
            {modalIcons[selectedIcon] && createElement(modalIcons[selectedIcon])}
          </div>
        </div>

        <div className='flex w-full flex-col gap-1'>
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
                {fieldState.error?.message && <FormErrorMessage error={fieldState.error.message} />}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}
