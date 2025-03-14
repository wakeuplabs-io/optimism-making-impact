import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { attributesOptionsMapper } from '../utils';
import { FormModal } from '@/components/form/form-modal';
import { FormInputWrapper } from '@/components/form/form-input';
import { SelectInput } from '@/components/inputs/select-input';
import { TextAreaInput } from '@/components/text-area-input';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteItem, Item } from '@/types';
import { UpdateItemBody, updateItemSchema } from '@optimism-making-impact/schemas';
import { Pencil, Save, Trash } from 'lucide-react';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useToggle } from 'usehooks-ts';

interface UpdateItemModalProps {
  item: CompleteItem;
  onSave: (itemId: number, data: UpdateItemBody) => void;
  onDelete: (item: Item) => void;
}

export function UpdateItemModal(props: UpdateItemModalProps) {
  const [isDeleteConfirmationModalOpen, toggleDeleteConfirmationModal] = useToggle();
  const attributes = useMainSectionStore((state) => state.step?.smartListFilter?.attributes);

  const attributeOptions = useMemo(() => (attributes ? attributesOptionsMapper(attributes) : []), [attributes]);

  const defaultValues: UpdateItemBody = {
    markdown: props.item.markdown,
    attributeId: props.item.attributeId,
  };

  function handleSubmit(data: UpdateItemBody) {
    props.onSave(props.item.id, data);
  }

  return (
    <>
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
        submitButtonIcon={<Save />}
        submitButtonText='Save'
        secondaryButtonText='Delete'
        secondaryButtonIcon={<Trash />}
        onSecondaryClick={toggleDeleteConfirmationModal}
      >
        <FormFields defaultValues={defaultValues} attributeOptions={attributeOptions} />
      </FormModal>
      {isDeleteConfirmationModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteConfirmationModalOpen}
          title='Delete item'
          description={
            <span>
              Are you sure you want to delete this item?
            </span>
          }
          onConfirm={() => props.onDelete(props.item)}
          onOpenChange={toggleDeleteConfirmationModal}
        />
      )}
    </>
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
