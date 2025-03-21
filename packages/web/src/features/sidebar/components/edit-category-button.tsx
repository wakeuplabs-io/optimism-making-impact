import { EditEntityModal } from '@/components/form/edit-entity-modal';
import { FormIconPicker } from '@/components/form/form-icon-picker';
import { FormTextInput } from '@/components/form/form-text-input';
import { useIcons } from '@/hooks/use-icons';
import { Category, EditCategoryBody, editCategoryBodySchema } from '@optimism-making-impact/schemas';
import { Controller, useFormContext } from 'react-hook-form';

interface EditCategoryButtonProps {
  onSave: (name: string, icon: string) => void;
  onDelete: (category: Category) => void;
  category: Category;
}

export function EditCategoryButton(props: EditCategoryButtonProps) {
  const defaultValues: EditCategoryBody = { name: props.category.name, icon: props.category.icon };

  function handleSubmit(data: EditCategoryBody) {
    props.onSave(data.name, data.icon);
  }

  return (
    <EditEntityModal
      entity='category'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={editCategoryBodySchema}
      deleteDescription={
        <span>
          Are you sure you want to delete <b>{props.category.name}</b> category?
        </span>
      }
      onDelete={() => props.onDelete(props.category)}
    >
      <FormFields defaultValues={defaultValues} />
    </EditEntityModal>
  );
}

interface FormFieldsProps {
  defaultValues: EditCategoryBody;
}

function FormFields({ defaultValues }: FormFieldsProps) {
  const { control, setValue } = useFormContext<EditCategoryBody>();
  const modalIcons = useIcons();

  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='flex w-full gap-4'>
        <div className='flex w-full flex-row gap-1'>
          <Controller
            name='icon'
            control={control}
            render={({ field }) => (
              <FormIconPicker
                selectedIcon={field.value}
                modalIcons={modalIcons}
                onSelect={(icon: string) => {
                  setValue('icon', icon);
                }}
              />
            )}
          />
          <Controller
            name='name'
            control={control}
            defaultValue={defaultValues.name}
            render={({ field, fieldState }) => (
              <div className='w-full'>
                <FormTextInput {...field} placeholder='Write here...' error={fieldState.error?.message} />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
