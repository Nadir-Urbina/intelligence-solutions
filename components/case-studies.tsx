"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const caseStudies = [
  {
    title: "Nedderman Construction Group",
    description:
      "Helped scale from $20M to $30M annual revenue through kingdom-focused business strategies and leadership development.",
    image: "/placeholder.svg?height=400&width=600",
    tag: "Construction",
  },
  {
    title: "Lime Media",
    description:
      "Partnered to implement faith-based principles in business operations, resulting in sustainable growth and improved company culture.",
    image: "/placeholder.svg?height=400&width=600",
    tag: "Media",
  },
  {
    title: "Kingdom Enterprise",
    description:
      "Developed a comprehensive strategy for integrating faith values into business practices, leading to increased employee engagement and customer loyalty.",
    image: "/placeholder.svg?height=400&width=600",
    tag: "Retail",
  },
]

export default function CaseStudies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="case-studies" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore how we've helped businesses transform through kingdom principles.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.title}
              className={`group relative overflow-hidden rounded-lg transition-all duration-700 delay-${index * 100} ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                  {study.tag}
                </div>
              </div>
              <div className="p-6 bg-card">
                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="text-muted-foreground mb-4">{study.description}</p>
                <Button variant="link" className="p-0 h-auto font-medium">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

