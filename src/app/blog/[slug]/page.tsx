import { getBlogPostBySlug } from "@/src/sanity/lib/client"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PortableText } from "@portabletext/react"
import { portableTextComponents } from "@/components/portable-text-components"
import { urlFor } from "@/src/sanity/lib/client"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Await params to access its properties (Next.js 15 requirement)
  const resolvedParams = await params;
  const post = (await getBlogPostBySlug(resolvedParams.slug))[0]
  
  if (!post) {
    notFound()
  }

  // Check if we have a valid image to display
  const hasValidImage = post.mainImage && 
                       post.mainImage.asset && 
                       (post.mainImage.asset.url || post.mainImage.asset._ref);
  
  // Get the image URL using urlFor if we have a reference
  const imageUrl = hasValidImage ? 
    (post.mainImage.asset.url || urlFor(post.mainImage).url()) : 
    null;

  return (
    <main className="container px-4 sm:px-6 max-w-4xl py-8 md:py-12">
      <Link href="/#blog">
        <Button variant="ghost" className="mb-4 md:mb-6 flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Button>
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">{post.title}</h1>
      
      <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8 text-sm md:text-base">
        <p className="text-muted-foreground">
          By {post.author}
        </p>
        <span className="text-muted-foreground">•</span>
        <p className="text-muted-foreground">
          {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
        </p>
      </div>
      
      {imageUrl ? (
        <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-lg overflow-hidden mb-6 md:mb-8">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="w-full h-64 sm:h-80 md:h-[400px] bg-secondary flex items-center justify-center rounded-lg mb-6 md:mb-8">
          <p className="text-secondary-foreground text-base md:text-lg">
            {post.categories && post.categories[0] ? post.categories[0] : "Blog Post"}
          </p>
        </div>
      )}
      
      {post.categories && post.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {post.categories.map((category: string) => (
            <span 
              key={category}
              className="px-2 md:px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm"
            >
              {category}
            </span>
          ))}
        </div>
      )}
      
      {post.body ? (
        <div className="prose prose-sm sm:prose md:prose-lg dark:prose-invert max-w-none">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      ) : (
        <p className="text-muted-foreground">No content available for this blog post.</p>
      )}
    </main>
  )
} 