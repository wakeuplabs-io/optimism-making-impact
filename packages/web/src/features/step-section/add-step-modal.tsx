import { FormIconPicker } from '@/components/form/form-icon-picker';
import { FormModal } from '@/components/form/form-modal';
import { FormTextInput } from '@/components/form/form-text-input';
import { IconButton } from '@/components/icon-button';
import { SelectInput } from '@/components/inputs/select-input';
import { capitalizeFirst } from '@/lib/utils';
import { SmartListFiltersService } from '@/services/smart-list-filters-service';
import { CreateStepBody, StepType, createStepBodySchema, stepTypes } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    icon: 'Blocks',
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
  const { control, setValue } = useFormContext<CreateStepBody>();
  const type = useWatch({ control, name: 'type' });

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
                name='smartListFilterId'
                label='Smart List Filter'
                items={smartListOptions}
                onValueChange={(value) => field.onChange(Number(value))}
                placeholder='Select Smart List filter'
              />
            </div>
          )}
        />
      )}
      <div className='flex w-full gap-4'>
        <div className='flex w-full flex-row gap-1'>
          <Controller
            name='icon'
            control={control}
            render={({ field }) => (
              <FormIconPicker
                selectedIcon={field.value}
                onSelect={(icon: string) => {
                  setValue('icon', icon);
                }}
              />
            )}
          />
          <Controller
            name='title'
            control={control}
            render={({ field, fieldState }) => (
              <FormTextInput {...field} wrapperClassname='flex-grow w-full' placeholder='Write here...' error={fieldState.error?.message} />
            )}
          />
        </div>
      </div>
    </div>
  );
}
