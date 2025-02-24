import { useIcons } from "@/hooks/use-icons";

interface IconWithDefaultProps {
  src: string;
  className?: string;
  defaultIcon?: string;
  size?: 'md' | 'lg';
}

export function IconWithDefault({ src, defaultIcon = 'blocks' }: IconWithDefaultProps) {
  const modalIcons = useIcons();
  
  const LucideIcon = modalIcons[src] || modalIcons[defaultIcon];
  return <LucideIcon />;
}
