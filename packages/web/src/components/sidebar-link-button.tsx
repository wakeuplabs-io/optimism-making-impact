import { FormModal } from './form/form-modal';
import { FormTextInput } from './form/form-text-input';
import { ImageButton, ImageButtonProps } from '@/components/image-button';
import { cn } from '@/lib/utils';
import { UpdateRoundBody } from '@optimism-making-impact/schemas';
import { Save } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

interface SidebarLinkButtonProps extends Pick<ImageButtonProps, 'src'> {
  link: string;
  onSubmit: (data: UpdateRoundBody) => void;
  isAdmin?: boolean;
  className?: string;
  disabled?: boolean;
  linkType: 'link1' | 'link2';
}

// Create a URL schema for validation
const urlSchema = z.string().url();

export function SidebarLinkButton(props: SidebarLinkButtonProps) {
  // Use Zod to validate if the link is a valid URL
  const hasValidLink = urlSchema.safeParse(props.link).success;

  return (
    <div
      className={cn(
        'relative flex flex-col',
        {
          'h-16': props.isAdmin,
          'opacity-70': !hasValidLink && !props.disabled,
        },
        props.className,
      )}
    >
      <a href={props.link} target='_blank' rel='noreferrer'>
        <ImageButton className='h-fit' src={props.src} disabled={props.disabled} />
      </a>
      {props.isAdmin && !props.disabled && <EditLink linkType={props.linkType} onSubmit={props.onSubmit} link={props.link} />}
    </div>
  );
}

interface EditLinkProps {
  onSubmit: (data: UpdateRoundBody) => void;
  link: string;
  linkType: 'link1' | 'link2';
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
      onSubmit={(data) => props.onSubmit(props.linkType === 'link1' ? { link1: data.link } : { link2: data.link })}
      defaultValues={{ link: props.link }}
      schema={z.object({
        link: z.string().min(1, { message: 'URL is required' }).url({ message: 'Invalid URL' }),
      })}
      submitButtonIcon={<Save />}
      submitButtonText='Save'
    >
      <EditLinkForm />
    </FormModal>
  );
}

function EditLinkForm() {
  const { control, watch } = useFormContext<{ link: string }>();
  const currentLink = watch('link');

  // Custom error message based on input state
  const getErrorMessage = (fieldState: any) => {
    if (!currentLink || currentLink.trim().length === 0) {
      return 'URL is required';
    } else if (fieldState.error) {
      return 'Invalid URL';
    }
    return undefined;
  };

  return (
    <div className='space-y-2'>
      <Controller
        name='link'
        control={control}
        render={({ field, fieldState }) => (
          <FormTextInput {...field} error={getErrorMessage(fieldState)} placeholder='https://example.com' type='url' />
        )}
      />
    </div>
  );
}
