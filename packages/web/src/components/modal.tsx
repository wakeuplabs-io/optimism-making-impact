import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';

type ModalProps = {
  title?: string;
  subtitle?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
};

export function Modal(props: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className='flex w-fit max-w-[95%] flex-col items-center rounded-[22px] bg-white-high px-14 py-12'>
        <DialogHeader className='pb-5'>
          {props.title && <DialogTitle className='text-center text-lg text-dark-low 2xl:text-xl'>{props.title}</DialogTitle>}
          {props.subtitle && <DialogDescription className='text-center text-secondary'>{props.subtitle}</DialogDescription>}
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
}
