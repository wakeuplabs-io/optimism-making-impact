import { cn } from '@/lib/utils';

interface ImageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  className?: string;
}

export function ImageButton({ src, className, ...props }: ImageButtonProps) {
  return (
    <button className='' {...props}>
      <img src={src} alt='' className={cn('transition-all duration-300 hover:brightness-75', className)} />
    </button>
  );
}
