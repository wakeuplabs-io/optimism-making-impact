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
  defaultValues?: DefaultValues<z.TypeOf<TFormSchema>>;
  children: React.ReactNode;
  submitButtonText?: string;
  submitButtonIcon?: React.ReactNode;
  secondaryButtonText?: string;
  secondaryButtonIcon?: React.ReactNode;
  contentProps?: React.ComponentProps<typeof Modal>['contentProps'];
  onSubmit: SubmitHandler<z.TypeOf<TFormSchema>>;
  onSecondaryClick?: () => void;
  onOpenChange?: (open: boolean) => void;
  controlledOpen?: boolean;
}

export function FormModal<TFormSchema extends z.AnyZodObject>({
  submitButtonText = 'Save',
  secondaryButtonText = 'Cancel',
  submitButtonIcon = <Save />,
  ...props
}: FormModalProps<TFormSchema>) {
  const [open, setOpen] = useState(false);
  const formId = useId();

  const onInternalSubmit: SubmitHandler<z.infer<TFormSchema>> = async (data) => {
    await props.onSubmit(data);
    if (!props.controlledOpen) {
      setOpen(false);
      return;
    }
    props.onOpenChange?.(false);
  };

  const onOpenChange = (open: boolean) => {
    if (!props.controlledOpen) {
      setOpen(open);
    }
    props.onOpenChange?.(open);
  };

  const buttons = React.useMemo<ModalActionButtonProps[]>(
    () => [
      {
        type: 'button',
        variant: 'secondary',
        label: secondaryButtonText,
        closeOnClick: true,
        icon: props.secondaryButtonIcon,
        onClick: () => props.onSecondaryClick?.(),
      },
      { type: 'submit', variant: 'primary', label: submitButtonText, closeOnClick: false, icon: submitButtonIcon, form: formId },
    ],
    [],
  );

  const isOpen = props.controlledOpen ?? open;

  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      title={props.title}
      subtitle={props.subtitle}
      trigger={props.trigger}
      buttons={buttons}
      contentProps={props.contentProps}
    >
      {isOpen && (
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

export function InnerForm<TFormSchema extends z.AnyZodObject>(props: InnerFormProps<TFormSchema>) {
  const methods = useForm({ defaultValues: props.defaultValues, resolver: zodResolver(props.schema) });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form id={props.formId} onSubmit={handleSubmit(props.onInternalSubmit)} onError={(errors) => console.log(errors)} className='w-full'>
        {props.children}
      </form>
    </FormProvider>
  );
}
