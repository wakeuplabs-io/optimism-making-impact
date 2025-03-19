import { AttributeOption, strengthOptions } from '../utils';
import { nonAssignedOption, useCardFormData } from './useCardFormData';
import { EditEntityModal } from '@/components/form/edit-entity-modal';
import { FormMultiSelect } from '@/components/form/form-multi-select';
import { FormSelect } from '@/components/form/form-select';
import { FormTextInput } from '@/components/form/form-text-input';
import { EditIcon } from '@/components/icons/edit-icon';
import { CompleteCard } from '@/types/cards';
import { Keyword } from '@/types/keywords';
import { Attribute, UpdateCardBody, updateCardBodySchema } from '@optimism-making-impact/schemas';
import { Controller, useFormContext } from 'react-hook-form';

interface EditCardModalProps {
  stepId: number;
  onSave?: (props: { cardId: number; data: UpdateCardBody }) => void;
  onDelete?: (cardId: number) => void;
  keywords: Keyword[];
  attributes?: Attribute[];
  card: CompleteCard;
}

export function EditCardModal(props: EditCardModalProps) {
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

    props.onSave?.({
      cardId: props.card.id,
      data: {
        title,
        markdown,
        stepId,
        strength,
        keywords: selectedKeywordsValueAndId,
        attributeId: numericAttributeId === nonAssignedOption.value ? undefined : attributeId,
      },
    });
  }

  return (
    <EditEntityModal
      entity='card'
      trigger={<EditIcon variant='lg' />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={updateCardBodySchema}
      onDelete={() => props.onDelete?.(props.card.id)}
      deleteDescription={
        <span>
          Are you sure you want to delete <b>{props.card.title}</b> card?
        </span>
      }
      contentProps={{
        onPointerDownOutside: (e) => {
          if (document.getElementById('multiselect-popover-content')) e.preventDefault();
        },
      }}
    >
      <FormFields attributeOptions={attributeOptions} keywords={props.keywords} />
    </EditEntityModal>
  );
}

interface FormFieldsProps {
  attributeOptions: AttributeOption[];
  keywords: Keyword[];
}

function FormFields({ attributeOptions, keywords }: FormFieldsProps) {
  const { control } = useFormContext<UpdateCardBody>();

  return (
    <div className='flex flex-col gap-2'>
      <Controller
        name='strength'
        control={control}
        render={({ field, fieldState, formState }) => (
          <FormSelect
            error={fieldState.error?.message}
            name={field.name}
            items={strengthOptions}
            value={field.value}
            onValueChange={field.onChange}
            defaultValue={formState.defaultValues?.strength}
            itemClassName='capitalize'
            triggerClassName='capitalize'
          />
        )}
      />
      <Controller
        name='attributeId'
        control={control}
        render={({ field, fieldState }) => (
          <FormSelect
            error={fieldState.error?.message}
            name={field.name}
            label={'Smart List Filter'}
            placeholder='Select Smart List Filter'
            items={attributeOptions}
            value={field.value?.toString()}
            onValueChange={(value) => field.onChange(+value)}
            disabled={attributeOptions.length === 0}
            triggerClassName='capitalize'
            itemClassName='capitalize'
          />
        )}
      />
      <Controller
        name='title'
        control={control}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Title' />}
      />
      <Controller
        name='markdown'
        control={control}
        render={({ field, fieldState }) => <FormTextInput label='Text' {...field} error={fieldState.error?.message} placeholder='Text' />}
      />
      <Controller
        name='keywords'
        control={control}
        render={({ field }) => (
          <FormMultiSelect
            name={field.name}
            label='Keywords connected'
            value={field.value}
            options={keywords}
            onChange={(value) => {
              field.onChange(value);
            }}
          />
        )}
      />
    </div>
  );
}
