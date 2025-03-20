import { FormModal } from '@/components/form/form-modal';
import { FormTextInput } from '@/components/form/form-text-input';
import { useStepQueries } from '@/hooks/use-step-queries';
import { Infographic, updateInfographicBodySchema } from '@optimism-making-impact/schemas';
import { Save } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

const updateInfographicImageSchema = updateInfographicBodySchema.pick({
  image: true,
});

type UpdateInfographicImageBody = z.infer<typeof updateInfographicImageSchema>;

interface EditInfographicImageModalProps {
  infographic: Infographic;
  open: boolean;
  onClose: () => void;
}

export function EditInfographicImageModal(props: EditInfographicImageModalProps) {
  const { editInfographic } = useStepQueries();

  const defaultValues: UpdateInfographicImageBody = {
    image: props.infographic.image,
  };

  function handleSubmit(data: UpdateInfographicImageBody) {
    editInfographic({ infographicId: props.infographic.id, data: { markdown: props.infographic.markdown, image: data.image } });
  }

  return (
    <FormModal
      controlledOpen={props.open}
      title='Edit image'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={updateInfographicImageSchema}
      submitButtonText='Save'
      submitButtonIcon={<Save />}
      onOpenChange={(open) => {
        if (!open) {
          props.onClose();
        }
      }}
    >
      <FormFields />
    </FormModal>
  );
}

function FormFields() {
  const { control } = useFormContext<UpdateInfographicImageBody>();

  return (
    <div className='flex flex-col gap-4'>
      <Controller
        name='image'
        control={control}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Image' />}
      />
    </div>
  );
}
