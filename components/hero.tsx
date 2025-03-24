"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useInView } from "framer-motion"

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(245,240,229,0.8),transparent)]"></div>
      <div ref={ref} className="container grid lg:grid-cols-2 gap-12 py-16 lg:py-24">
        <div
          className={`flex flex-col justify-center space-y-6 transition-all duration-700 delay-300 ${
            isInView ? "opacity-100" : "opacity-0 translate-y-12"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Your Business on <span className="text-primary">Kingdom Mission</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            We empower marketplace leaders to build enterprise as a calling, bringing faith into the workplace in
            practical and impactful ways.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild>
              <a href="#contact">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#services">Our Services</a>
            </Button>
          </div>
        </div>
        <div
          className={`flex items-center justify-center transition-all duration-700 delay-500 ${
            isInView ? "opacity-100" : "opacity-0 translate-x-12"
          }`}
        >
          <div className="relative w-full max-w-md aspect-square">
            <Image src="/logo.png" alt="Intelligence Solutions" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </section>
  )
}

