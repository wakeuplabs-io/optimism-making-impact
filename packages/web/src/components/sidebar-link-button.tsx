import { FormModal } from './form/form-modal';
import { FormTextInput } from './form/form-text-input';
import { ImageButton, ImageButtonProps } from '@/components/image-button';
import { cn } from '@/lib/utils';
import { UpdateRoundLinkBody, updateRoundLinkBodySchema } from '@optimism-making-impact/schemas';
import { Save } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

interface SidebarLinkButtonProps extends Pick<ImageButtonProps, 'src'> {
  link: string;
  onSubmit: (data: UpdateRoundLinkBody) => void;
  isAdmin?: boolean;
  className?: string;
  disabled?: boolean;
}

export function SidebarLinkButton(props: SidebarLinkButtonProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col',
        {
          'h-16': props.isAdmin,
        },
        props.className,
      )}
    >
      <a href={props.link} target='_blank' rel='noreferrer'>
        <ImageButton className='h-fit' src={props.src} disabled={props.disabled} />
      </a>
      {props.isAdmin && !props.disabled && <EditLink onSubmit={props.onSubmit} link={props.link} />}
    </div>
  );
}

interface EditLinkProps {
  onSubmit: (data: UpdateRoundLinkBody) => void;
  link: string;
}

function EditLink(props: EditLinkProps) {
  return (
    <FormModal
      title='Edit link'
      trigger={
        <div
          role='button'
          className='mb-4 flex h-6 w-full items-end justify-center gap-2 rounded-b-xl bg-mi-stone-300 text-center text-sm text-slate-500 hover:underline'
        >
          edit
        </div>
      }
      onSubmit={props.onSubmit}
      defaultValues={{ link: props.link }}
      schema={updateRoundLinkBodySchema}
      submitButtonIcon={<Save />}
      submitButtonText='Save'
    >
      <EditLinkForm />
    </FormModal>
  );
}

function EditLinkForm() {
  const { control } = useFormContext<UpdateRoundLinkBody>();

  return (
    <Controller
      name='link'
      control={control}
      render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Write here...' />}
    />
  );
}
