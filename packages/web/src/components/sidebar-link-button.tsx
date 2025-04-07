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
      {hasValidLink ? (
        <a href={props.link} target='_blank' rel='noreferrer'>
          <ImageButton className='h-fit' src={props.src} disabled={props.disabled} />
        </a>
      ) : (
        <div className='relative'>
          <ImageButton className='h-fit' src={props.src} disabled={props.disabled || !props.isAdmin} />
          {!props.disabled && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/10 rounded-xl'>
              {props.isAdmin && props.link && props.link.trim().length > 0 && (
                <div className='absolute bottom-0 w-full text-center text-xs text-white bg-red-500/70 py-1 rounded-b-xl'>Invalid URL</div>
              )}
              {props.isAdmin && !props.link && (
                <div className='w-full text-xs text-white bg-red-500/70 py-1 rounded-b-xl'>URL is required</div>
              )}
            </div>
          )}
        </div>
      )}
      {props.isAdmin && !props.disabled && <EditLink onSubmit={props.onSubmit} link={props.link} />}
    </div>
  );
}

interface EditLinkProps {
  onSubmit: (data: UpdateRoundBody) => void;
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
      onSubmit={(data) => props.onSubmit({ link1: data.link })}
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
