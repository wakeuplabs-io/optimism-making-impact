import { FormModal } from '@/components/form-modal';
import { EditIcon } from '@/components/icons/edit-icon';
import { SelectInput } from '@/components/inputs/select-input';
import { CompleteCard, Keyword } from '@/types';
import { Save, Trash } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { nonAssignedOption, useCardFormData } from './useCardFormData';
import { UpdateCardBody, updateCardBodySchema, Attribute } from '@optimism-making-impact/schemas';
import { FormTextInput } from '@/components/form/form-text-input';
import { AttributeOption, strengthOptions } from '../utils';
import { useToggle } from 'usehooks-ts';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { MultiSelectInputV2 } from '@/components/ui/multi-select-v2';

interface EditCardModalProps {
  stepId: number;
  onSave?: (cardId: number, data: UpdateCardBody) => void;
  onDelete?: (cardId: number) => void;
  keywords: Keyword[];
  attributes?: Attribute[];
  card: CompleteCard;
}

export function EditCardModal(props: EditCardModalProps) {
  const [isConfirmDeleteModalOpen, toggleConfirmDeleteModalOpen] = useToggle();

  const defaultValues: UpdateCardBody = {
    title: props.card.title,
    markdown: props.card.markdown,
    strength: props.card.strength,
    attributeId: props.card.attributeId || nonAssignedOption.value,
    keywords: props.card.keywords,
    stepId: props.stepId,
  };

  const { attributeOptions } = useCardFormData({
    attributes: props.attributes,
  });

  function handleSubmit({ title, markdown, keywords, strength, attributeId, stepId }: UpdateCardBody) {
    const selectedKeywordsValueAndId = keywords.map(({ value }) => {
      const keyword = props.keywords.find((keyword) => keyword.value === value);
      return { value, id: keyword?.id };
    });

    const numericAttributeId = attributeId ? +attributeId : 0;

    props.onSave?.(props.card.id, {
      title,
      markdown,
      stepId,
      strength,
      keywords: selectedKeywordsValueAndId,
      attributeId: numericAttributeId === nonAssignedOption.value ? undefined : attributeId,
    });
  }

  return (
    <>
      <FormModal
        title='Edit card'
        trigger={<EditIcon />}
        onSubmit={handleSubmit}
        submitButtonText='Save'
        submitButtonIcon={<Save />}
        secondaryButtonIcon={<Trash />}
        secondaryButtonText='Delete'
        onSecondaryClick={toggleConfirmDeleteModalOpen}
        defaultValues={defaultValues}
        schema={updateCardBodySchema}
        contentProps={{
          onPointerDownOutside: (e) => {
            if (document.getElementById('multiselect-popover-content')) e.preventDefault();
          },
        }}
      >
        <FormFields attributeOptions={attributeOptions} keywords={props.keywords} defaultValues={defaultValues} />
      </FormModal>
      {isConfirmDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isConfirmDeleteModalOpen}
          title='Delete Card'
          description={
            <span>
              Are you sure you want to delete <b>{props.card.title}</b> card?
            </span>
          }
          onConfirm={() => props.onDelete?.(props.card.id)}
          onOpenChange={toggleConfirmDeleteModalOpen}
        />
      )}
    </>
  );
}

interface FormFieldsProps {
  attributeOptions: AttributeOption[];
  keywords: Keyword[];
  defaultValues: UpdateCardBody;
}

// The inner form fields use react-hook-form's context.
// We use Controller for inputs that work as controlled components.
function FormFields({ attributeOptions, keywords, defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<UpdateCardBody>();

  return (
    <div className='flex flex-col w-[320px] max-w-full gap-4 py-4'>
      <Controller
        name='title'
        control={control}
        defaultValue={defaultValues.title}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Title' />}
      />
      <Controller
        name='markdown'
        control={control}
        defaultValue={defaultValues.markdown}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Markdown' />}
      />
      <Controller
        name='strength'
        control={control}
        defaultValue={defaultValues.strength}
        render={({ field, formState }) => (
          <SelectInput
            name='type'
            items={strengthOptions}
            onValueChange={field.onChange}
            defaultValue={formState.defaultValues?.strength}
            placeholder='Select Strength'
            triggerClassName='capitalize'
            itemClassName='capitalize'
            value={field.value}
          />
        )}
      />
      <Controller
        name='attributeId'
        control={control}
        defaultValue={defaultValues.attributeId}
        render={({ field, formState }) => (
          <SelectInput
            placeholder='Select Smart List Filter'
            name='attribute'
            items={attributeOptions}
            triggerClassName='capitalize'
            itemClassName='capitalize'
            defaultValue={formState.defaultValues?.attributeId?.toString()}
            onValueChange={(value) => field.onChange(+value)}
            disabled={attributeOptions.length === 0}
            value={field.value?.toString()}
          />
        )}
      />
      <Controller
        name='keywords'
        control={control}
        defaultValue={defaultValues.keywords}
        render={({ field }) => {
          return (
            <MultiSelectInputV2
              value={field.value}
              options={keywords}
              onChange={(value) => {
                field.onChange(value);
              }}
            />
          );
        }}
      />
    </div>
  );
}
