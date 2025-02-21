
import * as LucideIcons from 'lucide-react';

const modalIcons: Record<string, React.ComponentType> = Object.fromEntries(
  Object.entries(LucideIcons).map(([key, value]) => [key.toLowerCase(), value as React.ComponentType]),
);

interface IconWithDefaultProps {
  src: string;
  className?: string;
  defaultIcon?: keyof typeof modalIcons;
  size?: 'md' | 'lg';
}

export function IconWithDefault({ src, defaultIcon = 'blocks' }: IconWithDefaultProps) {
  const LucideIcon = modalIcons[src] || modalIcons[defaultIcon];
  return <LucideIcon />;
}
