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
}

export function Modal({ title, subtitle, trigger, buttons, children, ...props }: ModalProps) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='flex w-fit max-w-[95%] flex-col items-center rounded-[22px]'>
        <DialogHeader className='flex items-center justify-center w-full'>
          {title && <DialogTitle className='text-lg text-center text-dark-low 2xl:text-xl'>{title}</DialogTitle>}
          {subtitle && <DialogDescription className='text-center text-secondary'>{subtitle}</DialogDescription>}
        </DialogHeader>
        <div className='w-full'>{children}</div>
        {buttons?.length && (
          <DialogFooter className='mt-5'>
            <div className='flex gap-4'>
              {buttons.map((button, i) => (
                <ModalActionButton key={i} {...button} />
              ))}
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface ModalActionButtonProps extends ActionButtonProps {
  closeOnClick?: boolean;
}

function ModalActionButton({ closeOnClick = true, ...props }: ModalActionButtonProps) {
  if (!closeOnClick) {
    return <ActionButton {...props} />;
  }

  return (
    <DialogClose asChild>
      <ActionButton {...props} />
    </DialogClose>
  );
}
