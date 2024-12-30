import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';

type ModalProps = {
  title: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
};
export function Modal(props: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="w-[600px] bg-white-high px-14 py-12">
        <DialogHeader className="pb-5">
          <DialogTitle className="text-center text-lg text-dark-low 2xl:text-xl">{props.title}</DialogTitle>
          <DialogDescription className="text-center text-secondary">Click save when you are done.</DialogDescription>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
}
