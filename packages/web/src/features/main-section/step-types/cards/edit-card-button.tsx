import { FormModal } from '@/components/form-modal';
import { EditIcon } from '@/components/icons/edit-icon';
import { SelectInput } from '@/components/inputs/select-input';
import { MultiSelect } from '@/components/multi-select/multi-select';
import { CompleteCard, Keyword } from '@/types';
import { Trash } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { dontAssignOption, KeywordOption, useCardFormData } from './useCardFormData';
import { UpdateCardBody, updateCardBodySchema, Attribute } from '@optimism-making-impact/schemas';
import { FormTextInput } from '@/components/form/form-text-input';
import { AttributeOption, strengthOptions } from '../utils';
import { useToggle } from 'usehooks-ts';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';

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
    attributeId: props.card.attributeId || dontAssignOption.value,
    keywords: props.card.keywords,
    stepId: props.stepId,
  };

  const { keywordsOptions, attributeOptions } = useCardFormData({
    keywords: props.keywords,
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
      attributeId: numericAttributeId === dontAssignOption.value ? undefined : attributeId,
    });
  }

  return (
    <>
      <FormModal
        title='Edit card'
        trigger={<EditIcon />}
        onSubmit={handleSubmit}
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
        <FormFields attributeOptions={attributeOptions} keywordsOptions={keywordsOptions} defaultValues={defaultValues} />
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
  keywordsOptions: KeywordOption[];
  defaultValues: UpdateCardBody;
}

// The inner form fields use react-hook-form's context.
// We use Controller for inputs that work as controlled components.
function FormFields({ attributeOptions, keywordsOptions, defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<UpdateCardBody>();

  return (
    <div className='grid w-full gap-4 py-4'>
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
        render={({ field, formState }) => {
          return (
            <MultiSelect
              options={keywordsOptions}
              onValueChange={(keywordsValues) => {
                field.onChange(keywordsValues.map((value) => ({ value })));
              }}
              defaultValue={formState.defaultValues?.keywords ? formState.defaultValues.keywords.map((keyword) => keyword!.value!) : []}
              value={field.value.map(({ value }) => value)}
              placeholder='Keywords connected'
              maxCount={3}
            />
          );
        }}
      />
    </div>
  );
}
