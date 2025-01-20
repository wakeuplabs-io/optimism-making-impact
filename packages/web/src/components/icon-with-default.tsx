import { cn, isValidUrl } from '@/lib/utils';
import { Blocks } from 'lucide-react';

interface IconWithDefaultProps {
  src: string;
  className?: string;
  defaultIcon?: React.ComponentType<{ className?: string }>; // Component type
}

export function IconWithDefault({ src, className, defaultIcon: DefaultIcon = Blocks }: IconWithDefaultProps) {
  const isUrlValid = isValidUrl(src);

  if (isUrlValid) {
    return <img src={src} className={cn('h-[22px] w-[22px]', className)} />;
  }

  return <DefaultIcon className={cn('h-[22px] w-[22px]', className)} />;
}
