import React, { useId, useState } from 'react';
import { Save } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, ModalActionButtonProps } from '@/components/modal';
import { DefaultValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

interface FormModalProps<TFormSchema extends z.AnyZodObject> {
  schema: TFormSchema;
  title?: string;
  subtitle?: string;
  trigger?: React.ReactNode;
  onSubmit: SubmitHandler<z.TypeOf<TFormSchema>>;
  onCancel?: () => void;
  defaultValues?: DefaultValues<z.TypeOf<TFormSchema>>;
  children: React.ReactNode;
  submitButtonText?: string;
  submitButtonIcon?: React.ReactNode;
  cancelButtonText?: string;
  cancelButtonIcon?: React.ReactNode;
  contentProps?: React.ComponentProps<typeof Modal>['contentProps'];
}

export function FormModal<TFormSchema extends z.AnyZodObject>({
  submitButtonText = 'Save',
  cancelButtonText = 'Cancel',
  submitButtonIcon = <Save />,
  ...props
}: FormModalProps<TFormSchema>) {
  const [open, setOpen] = useState(false);
  const formId = useId();

  const onInternalSubmit: SubmitHandler<z.infer<TFormSchema>> = async (data) => {
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
        <InnerForm<TFormSchema>
          defaultValues={props.defaultValues}
          onInternalSubmit={onInternalSubmit}
          formId={formId}
          schema={props.schema}
        >
          {props.children}
        </InnerForm>
      )}
    </Modal>
  );
}

interface InnerFormProps<TFormSchema extends z.AnyZodObject> {
  formId: string;
  children: React.ReactNode;
  schema: TFormSchema;
  defaultValues?: DefaultValues<z.TypeOf<TFormSchema>>;
  onInternalSubmit: SubmitHandler<z.TypeOf<TFormSchema>>;
}

function InnerForm<TFormSchema extends z.AnyZodObject>(props: InnerFormProps<TFormSchema>) {
  const methods = useForm({ defaultValues: props.defaultValues, resolver: zodResolver(props.schema) });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form id={props.formId} onSubmit={handleSubmit(props.onInternalSubmit)} className='w-full'>
        {props.children}
      </form>
    </FormProvider>
  );
}
