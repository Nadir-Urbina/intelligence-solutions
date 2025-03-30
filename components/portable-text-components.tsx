import Image from 'next/image'
import Link from 'next/link'
import { PortableTextComponents } from '@portabletext/react'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      
      return (
        <div className="relative w-full h-64 sm:h-80 md:h-96 my-6 md:my-8 rounded-lg overflow-hidden">
          <Image
            src={value.asset.url}
            alt={value.alt || ''}
            fill
            className="object-cover"
          />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <Link 
          href={value.href} 
          rel={rel} 
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {children}
        </Link>
      )
    },
    code: ({ children }) => <code className="bg-secondary/50 rounded px-1 py-0.5 font-mono text-sm">{children}</code>,
  },
  block: {
    h1: ({ children }) => <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-8 sm:mt-10 md:mt-12 mb-3 md:mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-6 sm:mt-8 md:mt-10 mb-3 md:mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-5 sm:mt-6 md:mt-8 mb-3 md:mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-base sm:text-lg md:text-xl font-bold mt-4 sm:mt-5 md:mt-6 mb-3 md:mb-4">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4 sm:my-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 sm:mb-6">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 sm:pl-6 my-4 sm:my-6 space-y-1 sm:space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 sm:pl-6 my-4 sm:my-6 space-y-1 sm:space-y-2">{children}</ol>,
  },
} 