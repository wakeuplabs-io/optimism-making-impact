import { useImageIsValid } from '@/hooks/use-is-valid-image';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

const iconMap: Record<string, LucideIcons.LucideIcon> = {
  loader: LucideIcons.LoaderCircle,
  blocks: LucideIcons.Blocks,
  circle: LucideIcons.Circle,
  dot: LucideIcons.Dot,
};

interface IconWithDefaultProps {
  src: string; // Aquí ahora pasaremos el nombre del ícono
  className?: string;
  defaultIcon?: keyof typeof iconMap; // Tipo restringido a los nombres de `iconMap`
  size?: 'md' | 'lg';
}

export function IconWithDefault({ src, className, defaultIcon = 'blocks', size = 'md' }: IconWithDefaultProps) {
  const { isValid } = useImageIsValid(src);

  const iconStyles = cn(
    {
      'h-[22px] w-[22px]': size === 'md',
      'h-[45px] w-[45px]': size === 'lg',
    },
    className
  );

  if (isValid) {
    return <img src={src} className={iconStyles} />;
  }

  // Obtener el ícono del `iconMap`, si no existe usa el `defaultIcon`
  const LucideIcon = iconMap[src] || iconMap[defaultIcon];

  return <LucideIcon className={iconStyles} />;
}
