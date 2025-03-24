"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    title: "Integrating Faith in Business Leadership",
    excerpt: "Discover practical ways to lead your business with faith-based principles that drive growth and purpose.",
    date: "March 15, 2024",
    image: "/placeholder.svg?height=300&width=500",
    author: "Tom Ledbetter",
  },
  {
    title: "Building a Kingdom Culture in Your Workplace",
    excerpt: "Learn how to create a workplace environment that honors God while fostering creativity and productivity.",
    date: "February 28, 2024",
    image: "/placeholder.svg?height=300&width=500",
    author: "Wayland Henderson",
  },
  {
    title: "The ROI of Faith-Based Business Practices",
    excerpt: "Explore how kingdom principles in business can lead to measurable returns and sustainable growth.",
    date: "January 22, 2024",
    image: "/placeholder.svg?height=300&width=500",
    author: "Tom Ledbetter",
  },
]

export default function BlogPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="blog" className="py-20 bg-secondary/20">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Thoughts and strategies on kingdom business principles.
            </p>
            <div className="w-20 h-1 bg-primary mt-4"></div>
          </div>
          <Button variant="link" className="mt-4 md:mt-0">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={post.title}
              className={`group overflow-hidden rounded-lg bg-card transition-all duration-700 delay-${index * 100} ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Button variant="link" className="p-0 h-auto font-medium">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

