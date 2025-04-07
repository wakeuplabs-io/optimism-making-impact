import { ActionButton, ActionButtonProps } from '@/components/action-button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog-full-screen-mobile';
import { DialogProps } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import React from 'react';

interface ModalProps extends DialogProps {
  title?: string;
  subtitle?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  buttons?: ModalActionButtonProps[];
  contentProps?: React.ComponentProps<typeof DialogContent>;
}

/**
 * A reusable modal component with a title, subtitle, trigger, and action buttons.
 *
 * @param {ModalProps} props - The props for the Modal component.
 * @returns {JSX.Element} The rendered Modal component.
 */
export function Modal({ buttons = [], contentProps = {}, ...props }: ModalProps) {
  return (
    <Dialog {...props}>
      {props.trigger && <DialogTrigger asChild>{props.trigger}</DialogTrigger>}
      <DialogContent
        className='flex flex-col gap-0 lg:max-w-[550px] rounded-[22px] p-6 sm:p-12'
        hideCloseButton={true}
        aria-describedby={undefined}
        {...contentProps}
      >
        <DialogHeader className='flex flex-row items-start justify-between mb-8'>
          <div className='flex flex-col items-start justify-between'>
            {props.title && <DialogTitle className='text-xl text-dark-high font-medium'>{props.title}</DialogTitle>}
            {props.subtitle && <DialogDescription className='text-secondary'>{props.subtitle}</DialogDescription>}
          </div>
          <DialogClose>
            <X className='h-6 w-6' />
            <span className='sr-only'>Close</span>
          </DialogClose>
        </DialogHeader>
        <div className='w-full'>{props.children}</div>
        {buttons.length > 0 && (
          <DialogFooter className='w-full h-full self-end sm:mt-16'>
            <div className='flex w-full gap-2'>
              {buttons.map((button, index) => (
                <ModalActionButton key={index} {...button} className='w-full' />
              ))}
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export interface ModalActionButtonProps extends ActionButtonProps {
  closeOnClick?: boolean;
}

const ModalActionButton = React.memo(function ModalActionButton({ closeOnClick = true, ...props }: ModalActionButtonProps) {
  if (!closeOnClick) {
    return <ActionButton {...props} />;
  }

  return (
    <DialogClose asChild>
      <ActionButton aria-label='Close modal' {...props} />
    </DialogClose>
  );
});
