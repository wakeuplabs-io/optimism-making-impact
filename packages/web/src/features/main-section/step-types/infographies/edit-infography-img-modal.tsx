import { FormModal } from '@/components/form-modal';
import { FormTextInput } from '@/components/form/form-text-input';
import { Infographic } from '@/types/infographies';
import { updateInfographicBodySchema } from '@optimism-making-impact/schemas';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

const updateInfographicImageSchema = updateInfographicBodySchema.pick({
  image: true,
});

type UpdateInfographicImageBody = z.infer<typeof updateInfographicImageSchema>;

interface EditInfographicImageModalProps {
  infographic: Infographic;
  onClick?: (infographicId: number, image: string) => void;
  open: boolean;
  onClose: () => void;
}

export function EditInfographicImageModal(props: EditInfographicImageModalProps) {
  const defaultValues: UpdateInfographicImageBody = {
    image: props.infographic.image,
  };

  function handleSubmit(data: UpdateInfographicImageBody) {
    props.onClick?.(props.infographic.id, data.image);
  }

  return (
    <FormModal
      controlledOpen={props.open}
      title='Edit image'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={updateInfographicImageSchema}
      onOpenChange={(open) => {
        if (!open) {
          props.onClose();
        }
      }}
    >
      <FormFields defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: UpdateInfographicImageBody;
}

function FormFields({ defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<UpdateInfographicImageBody>();

  return (
    <div className='grid gap-4 py-4'>
      <Controller
        name='image'
        control={control}
        defaultValue={defaultValues.image}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Image' />}
      />
    </div>
  );
}
