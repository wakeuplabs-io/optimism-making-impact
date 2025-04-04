import { cn } from '@/lib/utils';

export interface ImageButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  src: string;
  className?: string;
  editIcon?: React.ReactNode;
  alt?: string;
}

export function ImageButton({ src, className, alt, ...props }: ImageButtonProps) {
  return (
    <div
      role='button'
      className='relative disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-75 disabled:grayscale'
      {...props}
    >
      <img src={src} alt={alt} className={cn('transition-all duration-300 hover:brightness-75 hover:rounded-lg', className)} />
    </div>
  );
}
