import { ColorDot } from '@/components/color-dot';
import { FormModal } from '@/components/form-modal';
import { SelectInput } from '@/components/inputs/select-input';
import { TextAreaInput } from '@/components/text-area-input';
import { UpdateItemBody } from '@/services/items/schemas';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteItem } from '@/types';
import { Pencil } from 'lucide-react';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface UpdateItemModalProps {
  item: CompleteItem;
  onClick: (itemId: number, data: UpdateItemBody) => void;
}

interface UpdateItemFormData {
  markdown: string;
  attributeId: number;
}

export function UpdateItemModal(props: UpdateItemModalProps) {
  const attributes = useMainSectionStore((state) => state.step?.smartList?.attributes);

  const attributeOptions = useMemo(
    () =>
      attributes
        ? attributes.map((a) => ({
            value: a.id.toString(),
            label: (
              <div className='flex items-center gap-2'>
                <ColorDot color={a.color} />
                <span>{a.value}</span>
              </div>
            ),
          }))
        : [],
    [attributes],
  );

  const defaultValues: UpdateItemFormData = {
    markdown: props.item.markdown,
    attributeId: props.item.attributeId,
  };

  function handleSubmit(data: UpdateItemFormData) {
    props.onClick(props.item.id, {
      markdown: data.markdown,
      attributeId: data.attributeId,
    });
  }

  return (
    <FormModal<UpdateItemFormData>
      title='Edit item'
      trigger={
        <button>
          <Pencil size={14} className='stroke-[#4E4E4E] hover:stroke-black' />
        </button>
      }
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    >
      <FormFields attributeOptions={attributeOptions} defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  attributeOptions: { value: string; label: React.ReactNode }[];
  defaultValues: UpdateItemFormData;
}

function FormFields({ attributeOptions, defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<UpdateItemFormData>();

  return (
    <div className='grid gap-4 py-4'>
      <Controller
        name='markdown'
        control={control}
        defaultValue={defaultValues.markdown}
        render={({ field }) => <TextAreaInput {...field} rows={5} placeholder='Content' />}
      />
      {attributeOptions.length > 0 && (
        <Controller
          name='attributeId'
          control={control}
          defaultValue={defaultValues.attributeId}
          render={({ field }) => (
            <SelectInput
              name='attributeId'
              items={attributeOptions}
              onValueChange={(val) => field.onChange(Number(val))}
              value={String(field.value)}
              placeholder='Select an attribute'
            />
          )}
        />
      )}
    </div>
  );
}
