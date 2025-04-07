import { SidebarModalAddTrigger } from './sidebar-modal-add-trigger';
import { FormIconPicker } from '@/components/form/form-icon-picker';
import { FormModal } from '@/components/form/form-modal';
import { FormTextInput } from '@/components/form/form-text-input';
import { CreateCategoryBody, createCategoryBodySchema } from '@optimism-making-impact/schemas';
import { Controller, useFormContext } from 'react-hook-form';
import { useToggle } from 'usehooks-ts';

interface AddCategoryModalProps {
  roundId?: number;
  onSave?: (name: string, icon: string, roundId: number) => void;
}

export function AddCategoryModal(props: AddCategoryModalProps) {
  const [isFormOpen, toggleFormOpen] = useToggle(false);

  if (props.roundId === undefined) return;

  const defaultValues: CreateCategoryBody = { name: '', icon: 'Blocks', roundId: props.roundId };

  function handleSubmit(data: CreateCategoryBody) {
    if (props.roundId === undefined) return;

    props.onSave?.(data.name, data.icon, props.roundId);
  }

  return (
    <>
      <SidebarModalAddTrigger label='New Category' onClick={toggleFormOpen} />
      <FormModal
        title='New category'
        controlledOpen={isFormOpen}
        onOpenChange={toggleFormOpen}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        schema={createCategoryBodySchema}
      >
        <FormFields defaultValues={defaultValues} />
      </FormModal>
    </>
  );
}

interface FormFieldsProps {
  defaultValues: CreateCategoryBody;
}

function FormFields(props: FormFieldsProps) {
  const { control, setValue, watch } = useFormContext<CreateCategoryBody>();

  const selectedIcon = watch('icon');
  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='flex w-full gap-4'>
        <div className='flex w-full flex-row gap-1'>
          <Controller
            name='icon'
            control={control}
            render={() => (
              <FormIconPicker
                selectedIcon={selectedIcon}
                onSelect={(icon: string) => {
                  setValue('icon', icon);
                }}
              />
            )}
          />
          <Controller
            name='name'
            control={control}
            defaultValue={props.defaultValues.name}
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
