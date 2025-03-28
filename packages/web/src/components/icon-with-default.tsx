import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { icons } from 'lucide-react';
import React from 'react';

type IconOption = keyof typeof icons;

function isIconOption(key: string): key is IconOption {
  return key in icons;
}

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
  defaultIcon?: IconOption;
}

export const IconWithDefault = React.memo(function IconWithDefault({ src, size, defaultIcon = 'Blocks', className }: IconWithDefaultProps) {
  const LucideIcon = isIconOption(src) ? icons[src] : icons[defaultIcon];
  return <LucideIcon className={cn(iconVariant({ size }), className)} />;
});
