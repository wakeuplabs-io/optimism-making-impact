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
import React from 'react';

type ModalProps = {
  title?: string;
  subtitle?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  buttons?: ModalActionButtonProps[];
  open?: boolean;
};

export function Modal(props: ModalProps) {
  return (
    <Dialog open={props.open}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className='flex w-fit max-w-[95%] flex-col items-center rounded-[22px]'>
        <DialogHeader className='flex w-full items-center justify-center'>
          {props.title && <DialogTitle className='text-center text-lg text-dark-low 2xl:text-xl'>{props.title}</DialogTitle>}
          {props.subtitle && <DialogDescription className='text-center text-secondary'>{props.subtitle}</DialogDescription>}
        </DialogHeader>
        <div className='w-full'>{props.children}</div>
        {props.buttons?.length && (
          <DialogFooter className='mt-5'>
            <div className='flex gap-4'>
              {props.buttons.map((button, i) => (
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

function ModalActionButton({ closeOnClick, ...props }: ModalActionButtonProps) {
  if (!closeOnClick) {
    return <ActionButton {...props} />;
  }

  return (
    <DialogClose asChild>
      <ActionButton {...props} />
    </DialogClose>
  );
}
