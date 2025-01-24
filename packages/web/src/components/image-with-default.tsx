import { useImageIsValid } from '@/hooks/use-is-valid-image';
import { cn } from '@/lib/utils';
import React from 'react';

interface ImageWithDefaultProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  className?: string;
  defaultImgClassname?: string;
}

export function ImageWithDefault({ defaultImgClassname, src, ...props }: ImageWithDefaultProps) {
  const { isValid } = useImageIsValid(src);

  if (isValid) {
    return <img src={src} {...props} />;
  }

  return <div className={cn('h-full w-full bg-[#d8d6d6]', defaultImgClassname)}></div>;
}
