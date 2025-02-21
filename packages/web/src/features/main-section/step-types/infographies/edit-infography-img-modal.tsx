import { FormModal } from '@/components/form-modal';
import { FormTextInput } from '@/components/form/form-text-input';
import { Infography } from '@/types/infographies';
import { updateInfographyBodySchema } from '@optimism-making-impact/schemas';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

const updateInfographyImageSchema = updateInfographyBodySchema.pick({
  image: true,
});

type UpdateInfographyImageBody = z.infer<typeof updateInfographyImageSchema>;

interface EditInfographyImageModalProps {
  infography: Infography;
  onClick?: (infographyId: number, image: string) => void;
  open: boolean;
  onClose: () => void;
}

export function EditInfographyImageModal(props: EditInfographyImageModalProps) {
  const defaultValues: UpdateInfographyImageBody = {
    image: props.infography.image,
  };

  function handleSubmit(data: UpdateInfographyImageBody) {
    props.onClick?.(props.infography.id, data.image);
  }

  return (
    <FormModal
      controlledOpen={props.open}
      title='Edit image'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={updateInfographyImageSchema}
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
  defaultValues: UpdateInfographyImageBody;
}

function FormFields({ defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<UpdateInfographyImageBody>();

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
