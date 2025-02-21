import { FormModal } from '@/components/form-modal';
import { FormInputWrapper } from '@/components/form/form-input';
import { FormTextInput } from '@/components/form/form-text-input';
import { IconButton } from '@/components/icon-button';
import { TextAreaInput } from '@/components/text-area-input';
import { CreateInfographyBody, createInfographyBodySchema } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

interface AddInfographyModalProps {
  stepId: number;
  className?: string;
  onClick?: (data: CreateInfographyBody) => void;
}

export function AddInfographyModal(props: AddInfographyModalProps) {
  const defaultValues: CreateInfographyBody = {
    image: '',
    markdown: '',
    stepId: props.stepId,
  };

  function handleSubmit(data: CreateInfographyBody) {
    props.onClick?.(data);
  }

  return (
    <FormModal
      title='Add Infography'
      trigger={<IconButton variant='secondary' icon={<Plus strokeWidth={3} />} />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={createInfographyBodySchema}
    >
      <FormFields defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: CreateInfographyBody;
}

function FormFields({ defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<CreateInfographyBody>();

  return (
    <div className='grid gap-4 py-4'>
      <Controller
        name='markdown'
        control={control}
        defaultValue={defaultValues.markdown}
        render={({ field, fieldState }) => (
          <FormInputWrapper error={fieldState.error?.message}>
            <TextAreaInput {...field} rows={7} placeholder='Content' />
          </FormInputWrapper>
        )}
      />
      <Controller
        name='image'
        control={control}
        defaultValue={defaultValues.image}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Image' />}
      />
    </div>
  );
}

// import { IconButton } from '@/components/icon-button';
// import { Modal } from '@/components/modal';
// import { TextAreaInput } from '@/components/text-area-input';
// import { TextInput } from '@/components/text-input';
// import { CreateInfographyBody } from '@optimism-making-impact/schemas';
// import { Plus, Save } from 'lucide-react';
// import { useState } from 'react';

// interface AddInfogrpahyButtonProps {
//   stepId: number;
//   className?: string;
//   onClick?: (data: CreateInfographyBody) => void;
// }

// export function AddInfogrpahyButton({ className, ...props }: AddInfogrpahyButtonProps) {
//   return <AddInfogrpahyModal {...props} buttonClassName={className} onClick={props.onClick} />;
// }

// interface AddInfogrpahyModalProps {
//   stepId: number;
//   buttonClassName?: string;
//   onClick?: (data: CreateInfographyBody) => void;
// }

// function AddInfogrpahyModal(props: AddInfogrpahyModalProps) {
//   const [image, setImage] = useState('');
//   const [markdown, setMarkdown] = useState('');

//   function handleMarkdownChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
//     setMarkdown(event.target.value);
//   }

//   function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setImage(event.target.value);
//   }

//   function handleSubmit() {
//     props.onClick?.({ image, markdown, stepId: props.stepId });
//     setImage('');
//     setMarkdown('');
//   }

//   return (
//     <Modal
//       title='Add Infography'
//       trigger={<IconButton variant='secondary' icon={<Plus strokeWidth={3} />} />}
//       buttons={[
//         { label: 'Cancel', variant: 'secondary', closeOnClick: true },
//         { label: 'Save', variant: 'primary', disabled: false, closeOnClick: true, icon: <Save />, onClick: handleSubmit },
//       ]}
//     >
//       <div className='grid gap-4 py-4'>
//         <TextAreaInput name='markdown' rows={7} value={markdown} onChange={handleMarkdownChange} placeholder='Content' />
//         <TextInput name='image' value={image} onChange={handleImageChange} placeholder='Image' />
//       </div>
//     </Modal>
//   );
// }
