"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SanityImage } from "@/components/ui/optimized-image"
import SearchBar from "@/components/search-bar"

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog')
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts')
        }
        
        const fetchedPosts = await response.json()
        setPosts(fetchedPosts || [])
        setFilteredPosts(fetchedPosts || [])
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setError('Unable to load blog posts. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    
    if (!query.trim()) {
      setFilteredPosts(posts)
      return
    }
    
    const lowerCaseQuery = query.toLowerCase()
    
    const filtered = posts.filter(post => {
      // Search in title
      const titleMatch = post.title?.toLowerCase().includes(lowerCaseQuery)
      
      // Search in excerpt
      const excerptMatch = post.excerpt?.toLowerCase().includes(lowerCaseQuery)
      
      // Search in categories/tags
      const categoryMatch = post.categories?.some((category: string) => 
        category.toLowerCase().includes(lowerCaseQuery)
      )
      
      // Search in body content (if available)
      // Note: This is a simplistic approach - for complex body content like PortableText,
      // you might need a more sophisticated solution
      const bodyMatch = post.body ? 
        JSON.stringify(post.body).toLowerCase().includes(lowerCaseQuery) : 
        false
      
      return titleMatch || excerptMatch || categoryMatch || bodyMatch
    })
    
    setFilteredPosts(filtered)
  }

  return (
    <main className="container pt-28 pb-12 px-4 sm:px-6">
      <div className="flex flex-col justify-between mb-12">
        <div className="mb-6">
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
        
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search by title, content, or category..." 
          className="max-w-md"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-4">Error</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        searchQuery ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-4">No results found</h3>
            <p className="text-muted-foreground">
              No blog posts match your search for "{searchQuery}". Try different keywords.
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-4">No blog posts found</h3>
            <p className="text-muted-foreground">
              Check back later for new articles and insights.
            </p>
          </div>
        )
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post: any) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group block"
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <div className="relative aspect-[4/3] h-[240px]">
                  {post.mainImage && post.mainImage.asset ? (
                    <SanityImage
                      image={post.mainImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      wrapperClassName="w-full h-full"
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
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4">
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