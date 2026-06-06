'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  fill = false, 
  className = "", 
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setImgSrc('/images/placeholder.svg');
      setError(true);
    }
  };

  if (fill) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={imgSrc}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain"
          onError={handleError}
          priority={priority}
        />
      </div>
    );
  }

  const imgWidth = width || 100;
  const imgHeight = height || 100;
  
  if (imgWidth && imgHeight) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        width={imgWidth}
        height={imgHeight}
        className={`object-contain ${className}`}
        onError={handleError}
        priority={priority}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={imgSrc} alt={alt} className={className} onError={handleError} />
  );
}