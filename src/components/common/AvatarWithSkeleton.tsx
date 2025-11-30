import Image from 'next/image';
import { useState } from 'react';

interface AvatarWithSkeletonProps {
  src: string;
  alt: string;
  className?: string; // container classes: size, rounding, borders, relative, overflow-hidden
  priority?: boolean;
}

export function AvatarWithSkeleton({ src, alt, className = '', priority = false }: AvatarWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-center"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
