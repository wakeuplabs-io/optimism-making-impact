import { Plus } from 'lucide-react';
import { CreateStepBody, stepTypes, StepType, createStepBodySchema } from '@optimism-making-impact/schemas';

import { IconButton } from '@/components/icon-button';
import { SelectInput } from '@/components/inputs/select-input';
import { capitalizeFirst } from '@/lib/utils';
import { SmartListsService } from '@/services/smart-lists/service';
import { FormModal } from '@/components/form-modal';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FormTextInput } from '@/components/form/form-text-input';

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
    icon: '',
    type: options[0].value as StepType,
    categoryId: props.categoryId,
    description: '',
  };

  function handleSubmit(data: CreateStepBody) {
    console.log('llego');
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
      title='New category'
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

// The inner form fields use react-hook-form's context.
// We use Controller for inputs that work as controlled components.
function FormFields(props: FormFieldsProps) {
  const { control, setValue } = useFormContext<CreateStepBody>();
  const type = useWatch({ control, name: 'type' });

  useEffect(() => {
    if (type !== 'CARD') {
      setValue('smartListId', undefined);
    }
  }, [type, setValue]);

  return (
    <div className='grid w-full gap-4 py-4'>
      <Controller
        name='title'
        control={control}
        defaultValue={props.defaultValues.title}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Title' />}
      />
      <Controller
        name='icon'
        control={control}
        defaultValue={props.defaultValues.icon}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Icon' />}
      />
      <Controller
        name='type'
        control={control}
        defaultValue={props.defaultValues.type}
        render={({ field, formState }) => (
          <SelectInput
            name='type'
            items={options}
            onValueChange={field.onChange}
            defaultValue={formState.defaultValues?.type}
            placeholder='Select Smart List'
          />
        )}
      />
      {type === 'CARD' && props.smartListOptions.length > 0 && (
        <Controller
          name='smartListId'
          control={control}
          render={({ field }) => (
            <SelectInput
              name='smartListId'
              items={props.smartListOptions}
              onValueChange={(value) => field.onChange(Number(value))}
              placeholder='Select Smart List'
            />
          )}
        />
      )}
      {type === 'ITEMS' && (
        <Controller
          name='description'
          control={control}
          defaultValue={props.defaultValues.description}
          render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Description' />}
        />
      )}
    </div>
  );
}
