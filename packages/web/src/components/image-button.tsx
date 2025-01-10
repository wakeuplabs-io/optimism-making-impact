import { cn } from '@/lib/utils';

interface ImageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  className?: string;
  isAdmin?: boolean;
  editIcon?: React.ReactNode;
  alt?: string;
}

export function ImageButton({ src, className, alt, ...props }: ImageButtonProps) {
  return (
    <button className='relative' {...props}>
      <img src={src} alt={alt} className={cn('transition-all duration-300 hover:brightness-75', className)} />
    </button>
  );
}
