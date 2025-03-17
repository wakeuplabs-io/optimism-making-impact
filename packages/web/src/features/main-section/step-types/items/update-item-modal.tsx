import { AttributeOption, attributesOptionsMapper } from '../utils';
import { EditEntityModal } from '@/components/form/edit-entity-modal';
import { FormSelect } from '@/components/form/form-select';
import { FormTextArea } from '@/components/form/form-text-area';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteItem, Item } from '@/types/items';
import { UpdateItemBody, updateItemSchema } from '@optimism-making-impact/schemas';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface UpdateItemModalProps {
  item: CompleteItem;
  onSave: (itemId: number, data: UpdateItemBody) => void;
  onDelete: (item: Item) => void;
}

export function UpdateItemModal(props: UpdateItemModalProps) {
  const attributes = useMainSectionStore((state) => state.step?.smartListFilter?.attributes);

  const attributeOptions = useMemo(() => (attributes ? attributesOptionsMapper(attributes) : []), [attributes]);

  const defaultValues = {
    markdown: props.item.markdown,
  };

  function handleSubmit(data: UpdateItemBody) {
    props.onSave(props.item.id, data);
  }

  return (
    <EditEntityModal
      entity='item'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={updateItemSchema}
      deleteDescription={<span>Are you sure you want to delete this item?</span>}
      onDelete={() => props.onDelete(props.item)}
    >
      <FormFields attributeOptions={attributeOptions} />
    </EditEntityModal>
  );
}

interface FormFieldsProps {
  attributeOptions: AttributeOption[];
}

function FormFields({ attributeOptions }: FormFieldsProps) {
  const { control } = useFormContext<UpdateItemBody>();

  return (
    <div className='grid gap-4'>
      <Controller
        name='markdown'
        control={control}
        render={({ field, fieldState }) => (
          <FormTextArea label='Content' error={fieldState.error?.message} {...field} rows={5} placeholder='Content' />
        )}
      />
      {attributeOptions.length > 0 && (
        <Controller
          name='attributeId'
          control={control}
          render={({ field, fieldState }) => (
            <FormSelect
              label='Attribute'
              error={fieldState.error?.message}
              name='attributeId'
              items={attributeOptions}
              onValueChange={(value) => field.onChange(+value)}
              value={field.value?.toString()}
              placeholder='Select an attribute'
            />
          )}
        />
      )}
    </div>
  );
}
