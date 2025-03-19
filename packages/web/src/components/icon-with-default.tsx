import { useIcons } from '@/hooks/use-icons';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const iconVariant = cva('', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      base: 'h-5 w-5',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-10 w-10',
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

type IconVariantProps = VariantProps<typeof iconVariant>;

interface IconWithDefaultProps extends IconVariantProps {
  src: string;
  className?: string;
  defaultIcon?: string;
}

export function IconWithDefault({ src, size, defaultIcon = 'blocks', className }: IconWithDefaultProps) {
  const modalIcons = useIcons();

  const LucideIcon = modalIcons[src] || modalIcons[defaultIcon];
  return <LucideIcon className={cn(iconVariant({ size }), className)} />;
}
