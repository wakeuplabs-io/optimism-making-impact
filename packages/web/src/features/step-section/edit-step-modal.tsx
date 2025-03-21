import { EditEntityModal } from '@/components/form/edit-entity-modal';
import { FormIconPicker } from '@/components/form/form-icon-picker';
import { FormTextInput } from '@/components/form/form-text-input';
import { useIcons } from '@/hooks/use-icons';
import { Step } from '@/types/steps';
import { UpdateStepBody, updateStepBodySchema } from '@optimism-making-impact/schemas';
import { Controller, useFormContext } from 'react-hook-form';

interface EditStepModalProps {
  step: Step;
  onSave?: (stepId: number, data: UpdateStepBody) => void;
  onDelete: () => void;
}

export function EditStepModal(props: EditStepModalProps) {
  const defaultValues: UpdateStepBody = {
    title: props.step.title,
    icon: props.step.icon,
    description: props.step.description ?? undefined,
  };

  function handleSubmit(data: UpdateStepBody) {
    props.onSave?.(props.step.id, data);
  }

  return (
    <EditEntityModal
      entity='tab'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={updateStepBodySchema}
      deleteDescription={
        <span>
          Are you sure you want to delete <b>{props.step.title}</b> step?
        </span>
      }
      onDelete={props.onDelete}
    >
      <FormFields defaultValues={defaultValues} step={props.step} />
    </EditEntityModal>
  );
}

interface FormFieldsProps {
  defaultValues: UpdateStepBody;
  step: Step;
}

function FormFields({ defaultValues, step }: FormFieldsProps) {
  const { control, setValue } = useFormContext<UpdateStepBody>();
  const modalIcons = useIcons();

  return (
    <div className='flex w-full flex-col'>
      <div className='flex gap-4'>
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

          <div className='flex w-full flex-col gap-1'>
            <Controller
              name='title'
              control={control}
              defaultValue={defaultValues.title}
              render={({ field, fieldState }) => (
                <div className='w-full'>
                  <FormTextInput {...field} placeholder='Write here...' error={fieldState.error?.message} />
                </div>
              )}
            />
          </div>
        </div>
      </div>
      {step.type === 'SMARTLIST' && (
        <div className='flex flex-col gap-1'>
          <Controller
            name='description'
            control={control}
            defaultValue={defaultValues.description}
            render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Description' />}
          />
        </div>
      )}
    </div>
  );
}
