"use client"

import { Article, Organization, WebSite, WithContext } from "schema-dts"

interface JsonLdProps {
  type: "organization" | "website" | "article"
  data: any
}

export default function JsonLd({ type, data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd({
  name = "Intelligence Solutions",
  url = "https://intelligencesolutions.com",
  logo = "https://intelligencesolutions.com/logo.png",
  description = "Business strategy, marketing, and leadership development solutions with biblical principles.",
  contactPoint = {
    telephone: "(555) 123-4567",
    contactType: "customer service",
    email: "info@intelligencesolutions.com",
    areaServed: "US",
  },
}) {
  const data: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    contactPoint: {
      "@type": "ContactPoint",
      ...contactPoint,
    },
    sameAs: [
      "https://www.facebook.com/intelligencesolutions",
      "https://www.linkedin.com/company/intelligence-solutions",
      "https://twitter.com/intel_solutions",
    ],
  }

  return <JsonLd type="organization" data={data} />
}

export function WebsiteJsonLd({
  name = "Intelligence Solutions",
  url = "https://intelligencesolutions.com",
  description = "Business strategy, marketing, and leadership development solutions with biblical principles.",
}) {
  const data: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    potentialAction: {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://intelligencesolutions.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return <JsonLd type="website" data={data} />
}

export function ArticleJsonLd({
  title,
  description,
  publishedTime,
  modifiedTime,
  imageUrl,
  authorName,
  url,
}: {
  title: string
  description: string
  publishedTime: string
  modifiedTime?: string
  imageUrl?: string
  authorName: string
  url: string
}) {
  const data: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    image: imageUrl ? [imageUrl] : undefined,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Intelligence Solutions",
      logo: {
        "@type": "ImageObject",
        url: "https://intelligencesolutions.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return <JsonLd type="article" data={data} />
} 