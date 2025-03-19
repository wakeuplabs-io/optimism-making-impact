import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface SheetWrapperProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right' | null | undefined;
  className?: string;
  description?: string;
  triggerAsChild?: boolean;
}

export function SideMenu({ description = 'side-menu', ...props }: SheetWrapperProps) {
  return (
    <Sheet>
      <SheetTrigger asChild={props.triggerAsChild}>{props.trigger}</SheetTrigger>
      <SheetContent side={props.side} className={cn('pt-12', props.className)}>
        {props.children}
        <SheetTitle className='sr-only'>{description}</SheetTitle>
        <SheetDescription className='sr-only'>{description}</SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
