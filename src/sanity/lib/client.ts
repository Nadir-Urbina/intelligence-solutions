import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
})

// Helper function for generating image URLs with the Sanity Image URL builder
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => {
  return builder.image(source)
}

// Fetch functions for each content type
export async function getTestimonials() {
  return client.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc)`
  )
}

export async function getCaseStudies() {
  return client.fetch(
    `*[_type == "caseStudy"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      client,
      excerpt,
      mainImage,
      publishedAt,
      categories
    }`
  )
}

export async function getCaseStudyBySlug(slug: string) {
  return client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug] {
      _id,
      title,
      slug,
      client,
      mainImage,
      publishedAt,
      categories,
      excerpt,
      body
    }`,
    { slug }
  )
}

export async function getBlogPosts() {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author,
      excerpt,
      mainImage,
      publishedAt,
      categories
    }`
  )
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug] {
      _id,
      title,
      slug,
      author,
      mainImage,
      publishedAt,
      categories,
      excerpt,
      body
    }`,
    { slug }
  )
}

export async function getContactInfo() {
  return client.fetch(`*[_type == "contactInfo"][0]`)
} 