"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

type OptimizedImageProps = Omit<ImageProps, "onLoad" | "className"> & {
  wrapperClassName?: string
  imageClassName?: string
  fill?: boolean
}

export function OptimizedImage({
  wrapperClassName,
  imageClassName,
  alt,
  fill,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn(
      "overflow-hidden relative", 
      fill ? "w-full h-full" : "", 
      wrapperClassName
    )}>
      <Image
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? "scale-110 blur-sm" : "scale-100 blur-0",
          imageClassName
        )}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        priority={props.priority}
        fill={fill}
        {...props}
      />
    </div>
  )
}

type SanityImageProps = {
  image: any
  alt: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  className?: string
  wrapperClassName?: string
  fill?: boolean
  objectFit?: "cover" | "contain" | "none"
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  className,
  wrapperClassName,
  fill = false,
  objectFit = "cover",
}: SanityImageProps) {
  // Check if we have a valid image
  const hasValidImage = image && 
                       image.asset && 
                       (image.asset.url || image.asset._ref);
  
  if (!hasValidImage) {
    return null;
  }
  
  // Import the urlFor function dynamically to avoid server/client mismatch
  const { urlFor } = require("@/src/sanity/lib/client");
  
  // Get the image URL
  const imageUrl = image.asset.url || urlFor(image).url();
  
  return (
    <OptimizedImage
      src={imageUrl}
      alt={alt}
      width={fill ? undefined : width || 800}
      height={fill ? undefined : height || 600}
      sizes={sizes}
      priority={priority}
      wrapperClassName={wrapperClassName}
      imageClassName={cn(
        fill ? "object-cover" : "",
        objectFit === "contain" ? "object-contain" : 
        objectFit === "none" ? "object-none" : "object-cover",
        className
      )}
      fill={fill}
    />
  )
} 