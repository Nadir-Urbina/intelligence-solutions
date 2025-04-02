import { MetadataRoute } from 'next'
import { getBlogPosts, getCaseStudies } from '@/src/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL for your site
  const baseUrl = 'https://intelligencesolutions.com'
  
  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/studio`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]
  
  // Get dynamic routes from Sanity
  const blogPosts = await getBlogPosts()
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  const caseStudies = await getCaseStudies()
  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug.current}`,
    lastModified: new Date(study.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes]
} 