import { Modal, ModalActionButtonProps } from '@/components/modal';
import { Save } from 'lucide-react';
import React, { useId, useState } from 'react';
import { DefaultValues, FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

interface FormModalProps<TFormValues extends FieldValues> {
  title?: string;
  subtitle?: string;
  trigger?: React.ReactNode;
  onSubmit: SubmitHandler<TFormValues>;
  onCancel?: () => void;
  defaultValues?: DefaultValues<TFormValues>;
  children: React.ReactNode;
  submitButtonText?: string;
  submitButtonIcon?: React.ReactNode;
  cancelButtonText?: string;
  cancelButtonIcon?: React.ReactNode;
  contentProps?: React.ComponentProps<typeof Modal>['contentProps'];
}

export function FormModal<TFormValues extends FieldValues>({
  submitButtonText = 'Save',
  cancelButtonText = 'Cancel',
  submitButtonIcon = <Save />,
  ...props
}: FormModalProps<TFormValues>) {
  const [open, setOpen] = useState(false);
  const formId = useId();

  const onInternalSubmit: SubmitHandler<TFormValues> = async (data) => {
    await props.onSubmit(data);
    setOpen(false);
  };

  const buttons = React.useMemo<ModalActionButtonProps[]>(
    () => [
      {
        type: 'button',
        variant: 'secondary',
        label: cancelButtonText,
        closeOnClick: true,
        icon: props.cancelButtonIcon,
        onClick: () => props.onCancel?.(),
      },
      { type: 'submit', variant: 'primary', label: submitButtonText, closeOnClick: false, icon: submitButtonIcon, form: formId },
    ],
    [],
  );

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title={props.title}
      subtitle={props.subtitle}
      trigger={props.trigger}
      buttons={buttons}
      contentProps={props.contentProps}
    >
      {open && (
        <InnerForm<TFormValues> defaultValues={props.defaultValues} onInternalSubmit={onInternalSubmit} formId={formId}>
          {props.children}
        </InnerForm>
      )}
    </Modal>
  );
}

interface InnerFormProps<TFormValues extends FieldValues> {
  defaultValues?: DefaultValues<TFormValues>;
  onInternalSubmit: SubmitHandler<TFormValues>;
  formId: string;
  children: React.ReactNode;
}

function InnerForm<TFormValues extends FieldValues>(props: InnerFormProps<TFormValues>) {
  const methods = useForm<TFormValues>({ defaultValues: props.defaultValues });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form id={props.formId} onSubmit={handleSubmit(props.onInternalSubmit)} className='w-full'>
        {props.children}
      </form>
    </FormProvider>
  );
}
