import { getBlogPosts } from "@/src/sanity/lib/client"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="container py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <Link href="/#blog">
            <Button variant="ghost" className="mb-4 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground mt-2">
            Insights, thoughts and industry knowledge
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-4">No blog posts found</h3>
          <p className="text-muted-foreground">
            Check back later for new articles and insights.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group block"
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <div className="relative aspect-[4/3]">
                  {post.mainImage ? (
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <p className="text-secondary-foreground">No image</p>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <p>{post.author}</p>
                <span className="mx-2">•</span>
                <p>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</p>
              </div>
              <p className="line-clamp-3 text-muted-foreground">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
} 