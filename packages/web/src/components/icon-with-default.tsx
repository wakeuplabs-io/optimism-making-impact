import { useImageIsValid } from '@/hooks/use-is-valid-image';
import { cn } from '@/lib/utils';
import { Blocks } from 'lucide-react';

interface IconWithDefaultProps {
  src: string;
  className?: string;
  defaultIcon?: React.ComponentType<{ className?: string }>;
  size?: 'md' | 'lg';
}

export function IconWithDefault({ src, className, defaultIcon: DefaultIcon = Blocks, size = 'md' }: IconWithDefaultProps) {
  const { isValid } = useImageIsValid(src);

  const iconStyles = cn(
    {
      'h-[22px] w-[22px]': size === 'md',
      'h-[45px] w-[45px]': size === 'lg',
    },
    className,
  );

  if (isValid) {
    return <img src={src} className={iconStyles} />;
  }

  return <DefaultIcon className={iconStyles} />;
}
