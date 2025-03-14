import { IconPicker } from '../sidebar/components/icon-picker';
import { FormErrorMessage } from '@/components/form/form-error-message';
import { FormModal } from '@/components/form/form-modal';
import { FormTextInput } from '@/components/form/form-text-input';
import { IconButton } from '@/components/icon-button';
import { SelectInput } from '@/components/inputs/select-input';
import { useIcons } from '@/hooks/use-icons';
import { capitalizeFirst, cn } from '@/lib/utils';
import { SmartListFiltersService } from '@/services/smart-list-filters-service';
import { CreateStepBody, StepType, createStepBodySchema, stepTypes } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import { createElement, useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

type SmartListOption = { label: string; value: string };

const options = stepTypes.map((type) => ({
  value: type,
  label: capitalizeFirst(type),
}));

const emptySmartListFilterOption = { label: 'None', value: '0' };
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

    SmartListFiltersService.getByCategoryId(props.categoryId).then((res) => {
      const smartListsFiltersOptions = res.smartListFilters.map((smartListFilter) => ({
        label: smartListFilter.title,
        value: smartListFilter.id.toString(),
      }));
      if (smartListsFiltersOptions.length === 0) {
        return;
      }

      setSmartListsOptions([emptySmartListFilterOption, ...smartListsFiltersOptions]);
    });
  }

  if (props.categoryId === 0) return null;

  return (
    <FormModal
      title='New tab'
      trigger={<IconButton variant='secondary' icon={<Plus className='text-white' />} />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={createStepBodySchema}
      onOpenChange={onOpenChange}
    >
      <FormFields smartListOptions={smartListsOptions} />
    </FormModal>
  );
}

interface FormFieldsProps {
  smartListOptions: SmartListOption[];
}

function FormFields({ smartListOptions }: FormFieldsProps) {
  const { control, setValue, watch } = useFormContext<CreateStepBody>();
  const type = useWatch({ control, name: 'type' });
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const modalIcons = useIcons();
  const selectedIcon = watch('icon');

  useEffect(() => {
    if (type !== 'CARDGRID') {
      setValue('smartListFilterId', undefined);
    }
  }, [type, setValue]);

  return (
    <div className='flex w-full flex-col'>
      <Controller
        name='type'
        control={control}
        render={({ field, formState }) => (
          <div className='mb-6 w-full'>
            <SelectInput
              name='Type'
              items={options}
              onValueChange={field.onChange}
              defaultValue={formState.defaultValues?.type}
              placeholder='Select type'
            />
          </div>
        )}
      />

      {type === 'CARDGRID' && smartListOptions.length > 0 && (
        <Controller
          name='smartListFilterId'
          control={control}
          render={({ field }) => (
            <div className='mb-8 w-full'>
              <SelectInput
                name='Smart List Filter'
                items={smartListOptions}
                onValueChange={(value) => field.onChange(Number(value))}
                placeholder='Select Smart List filter'
                itemClassName='h-[42px] w-full rounded-md border border-gray-300 px-3 text-sm focus:border-red-500 focus:ring-0'
              />
            </div>
          )}
        />
      )}

      {type === 'SMARTLIST' && (
        <Controller
          name='description'
          control={control}
          render={({ field, fieldState }) => (
            <div className='flex flex-col gap-1'>
              <FormTextInput {...field} error={fieldState.error?.message} placeholder='Write here...' />
            </div>
          )}
        />
      )}

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

        <div className='flex w-full flex-col gap-1'>
          <span className='text-xs font-medium text-gray-500'>Title</span>
          <Controller
            name='title'
            control={control}
            render={({ field, fieldState }) => <FormTextInput {...field} placeholder='Write here...' error={fieldState.error?.message} />}
          />
        </div>
      </div>

      <Controller
        name='icon'
        control={control}
        render={({ field, fieldState }) => (
          <div className='col-span-2 mt-2 flex flex-col gap-2'>
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
