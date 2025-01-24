import { useImageIsValid } from '@/hooks/use-is-valid-image';
import { cn } from '@/lib/utils';
import { Blocks } from 'lucide-react';

interface IconWithDefaultProps {
  src: string;
  className?: string;
  defaultIcon?: React.ComponentType<{ className?: string }>;
}

export function IconWithDefault({ src, className, defaultIcon: DefaultIcon = Blocks }: IconWithDefaultProps) {
  const { isValid } = useImageIsValid(src);

  if (isValid) {
    return <img src={src} className={cn('h-[22px] w-[22px]', className)} />;
  }

  return <DefaultIcon className={cn('h-[22px] w-[22px]', className)} />;
}
