import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getBlogPosts } from "@/src/sanity/lib/client"
import { format } from "date-fns"
import { SanityImage } from "@/components/ui/optimized-image"

// Fallback blog posts when none are available from Sanity
const fallbackPosts = [
  {
    _id: "fallback1",
    title: "Integrating Faith in Business Leadership",
    slug: { current: "#" },
    author: "Tom Ledbetter",
    excerpt: "Discover practical ways to lead your business with faith-based principles that drive growth and purpose.",
    mainImage: null,
    publishedAt: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString(),
    categories: ["Leadership", "Faith"]
  },
  {
    _id: "fallback2",
    title: "Building a Kingdom Culture in Your Workplace",
    slug: { current: "#" },
    author: "Wayland Henderson",
    excerpt: "Learn how to create a workplace environment that honors God while fostering creativity and productivity.",
    mainImage: null,
    publishedAt: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    categories: ["Culture", "Workplace"]
  },
  {
    _id: "fallback3",
    title: "The ROI of Faith-Based Business Practices",
    slug: { current: "#" },
    author: "Tom Ledbetter",
    excerpt: "Explore how kingdom principles in business can lead to measurable returns and sustainable growth.",
    mainImage: null,
    publishedAt: new Date(new Date().setDate(new Date().getDate() - 45)).toISOString(),
    categories: ["Business", "ROI"]
  }
]

export default async function BlogPreview() {
  let posts = []
  
  try {
    posts = await getBlogPosts()
  } catch (error) {
    console.error("Error fetching blog posts:", error)
  }
  
  // Use fallback data if no posts are available from Sanity
  if (!posts || posts.length === 0) {
    posts = fallbackPosts
  }
  
  // Only display up to 3 blog posts on the homepage
  const displayedPosts = posts.slice(0, 3)

  return (
    <section id="blog" className="py-16 md:py-24 bg-secondary/10">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Latest Insights
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
              Expert perspectives, industry trends, and thought leadership from our team.
            </p>
          </div>
          <Link href="/blog" className="mt-6 md:mt-0">
            <Button variant="outline" className="group w-full sm:w-auto text-sm">
              View all posts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedPosts.map((post: any) => {
            return (
              <Link
                key={post._id}
                href={post.slug.current !== "#" ? `/blog/${post.slug.current}` : "#"}
                className="group flex flex-col h-full"
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <div className="relative aspect-[4/3] w-full h-[240px]">
                    {post.mainImage && post.mainImage.asset ? (
                      <SanityImage
                        image={post.mainImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="transition-transform duration-300 group-hover:scale-105 object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center relative">
                        <Image
                          src="/placeholder.jpg"
                          alt={post.title}
                          fill
                          className="object-cover opacity-30"
                        />
                        <p className="text-secondary-foreground absolute z-10">
                          {post.categories && post.categories[0] || "Blog"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  <p>{post.author}</p>
                  <span className="mx-2">•</span>
                  <p>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</p>
                </div>
                <p className="text-sm sm:text-base line-clamp-3 text-muted-foreground mt-auto">
                  {post.excerpt}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  )
}

