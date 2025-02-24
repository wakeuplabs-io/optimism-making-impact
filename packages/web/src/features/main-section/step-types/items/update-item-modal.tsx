import { FormModal } from '@/components/form-modal';
import { SelectInput } from '@/components/inputs/select-input';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteItem } from '@/types';
import { UpdateItemBody, updateItemSchema } from '@optimism-making-impact/schemas';
import { Pencil } from 'lucide-react';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { attributesOptionsMapper } from '../utils';
import { FormInputWrapper } from '@/components/form/form-input';
import { TextAreaInput } from '@/components/text-area-input';

interface UpdateItemModalProps {
  item: CompleteItem;
  onClick: (itemId: number, data: UpdateItemBody) => void;
}

export function UpdateItemModal(props: UpdateItemModalProps) {
  const attributes = useMainSectionStore((state) => state.step?.smartList?.attributes);

  const attributeOptions = useMemo(() => (attributes ? attributesOptionsMapper(attributes) : []), [attributes]);

  const defaultValues: UpdateItemBody = {
    markdown: props.item.markdown,
    attributeId: props.item.attributeId,
  };

  function handleSubmit(data: UpdateItemBody) {
    props.onClick(props.item.id, data);
  }

  return (
    <FormModal
      title='Edit item'
      trigger={
        <button>
          <Pencil size={14} className='stroke-[#4E4E4E] hover:stroke-black' />
        </button>
      }
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={updateItemSchema}
    >
      <FormFields defaultValues={defaultValues} attributeOptions={attributeOptions} />
    </FormModal>
  );
}

interface FormFieldsProps {
  attributeOptions: { value: string; label: React.ReactNode }[];
  defaultValues: UpdateItemBody;
}

function FormFields({ attributeOptions, defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<UpdateItemBody>();

  return (
    <div className='grid gap-4 py-4'>
      <Controller
        name='markdown'
        control={control}
        defaultValue={defaultValues.markdown}
        render={({ field, fieldState }) => (
          <FormInputWrapper error={fieldState.error?.message}>
            <TextAreaInput {...field} rows={5} placeholder='Content' />
          </FormInputWrapper>
        )}
      />
      {attributeOptions.length > 0 && (
        <Controller
          name='attributeId'
          control={control}
          defaultValue={defaultValues.attributeId}
          render={({ field, fieldState }) => (
            <FormInputWrapper error={fieldState.error?.message}>
              <SelectInput
                name='attributeId'
                items={attributeOptions}
                onValueChange={(value) => field.onChange(+value)}
                value={field.value.toString()}
                placeholder='Select an attribute'
              />
            </FormInputWrapper>
          )}
        />
      )}
    </div>
  );
}
