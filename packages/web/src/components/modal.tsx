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
} from '@/components/ui/dialog';
import { DialogProps } from '@radix-ui/react-dialog';
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
      <DialogTrigger asChild>
        <button aria-label='Open modal'>{props.trigger}</button>
      </DialogTrigger>
      <DialogContent className='flex w-fit max-w-[95%] flex-col items-center rounded-[22px] p-6' {...contentProps}>
        <DialogHeader className='flex w-full items-center justify-center'>
          {props.title && <DialogTitle className='text-center text-lg text-dark-low 2xl:text-xl'>{props.title}</DialogTitle>}
          {props.subtitle && <DialogDescription className='text-center text-secondary'>{props.subtitle}</DialogDescription>}
        </DialogHeader>
        <div className='w-full'>{props.children}</div>
        {buttons.length > 0 && (
          <DialogFooter className='w-full mt-5'>
            <div className='flex gap-4 w-full'>
              {buttons.map((button) => (
                <ModalActionButton key={button.id} {...button} className='w-full' />
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
